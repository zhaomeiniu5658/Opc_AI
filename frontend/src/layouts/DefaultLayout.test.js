import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const layoutSource = readFileSync(resolve(currentDirectory, 'DefaultLayout.vue'), 'utf8')
const tabBarSource = readFileSync(
  resolve(currentDirectory, '../components/common/AppTabBar.vue'),
  'utf8'
)
const jobContentSource = readFileSync(
  resolve(currentDirectory, '../components/business/JobTabContent.vue'),
  'utf8'
)
const pagesConfig = JSON.parse(readFileSync(resolve(currentDirectory, '../pages.json'), 'utf8'))
const primaryEntrySources = [
  '../pages/index/index.vue',
  '../pages/digital-human/index.vue',
  '../pages/job/list.vue',
  '../pages/career/roadmap.vue',
  '../pages/profile/index.vue',
].map((pagePath) => readFileSync(resolve(currentDirectory, pagePath), 'utf8'))

describe('persistent bottom navigation', () => {
  it('keeps the five primary views in one layout shell', () => {
    expect(layoutSource.match(/<AppTabBar/g)).toHaveLength(1)
    expect(layoutSource).toContain('<HomeTabContent v-if="activeTab === \'home\'" />')
    expect(layoutSource).toContain('<DigitalHumanTabContent v-else-if="activeTab === \'advisor\'" />')
    expect(layoutSource).toContain('<JobTabContent v-else-if="activeTab === \'job\'" />')
    expect(layoutSource).toContain('<TabSummaryContent v-else-if="activeTab === \'growth\'"')
    expect(layoutSource).toContain('<TabSummaryContent v-else :meta="profileMeta" />')
    expect(layoutSource).toContain('@change="selectTab"')
    expect(layoutSource).not.toContain('v-show')
  })

  it('changes active state without using native page navigation', () => {
    expect(tabBarSource).toContain("const emit = defineEmits(['change'])")
    expect(tabBarSource).toContain("emit('change', key)")
    expect(tabBarSource).not.toContain('navigateTo')
    expect(tabBarSource).not.toContain('navigateBack')
    expect(tabBarSource).not.toContain('reLaunch')
    expect(tabBarSource).not.toContain('getCurrentPages')
    expect(tabBarSource).not.toContain('setInterval')
    expect(tabBarSource).not.toContain('app-tabbar-item-active')
    expect(tabBarSource).toContain(':class="{ active: activeKey === \'home\' }"')
  })

  it('sets a dark native page background for every route transition', () => {
    for (const page of pagesConfig.pages) {
      expect(page.style.backgroundColor).toBe('#07111f')
      expect(page.style.backgroundColorTop).toBe('#07111f')
      expect(page.style.backgroundColorBottom).toBe('#07111f')
      expect(page.style.backgroundTextStyle).toBe('light')
    }
  })

  it('keeps a page-level stylesheet for every primary entry route', () => {
    for (const pageSource of primaryEntrySources) {
      expect(pageSource).toContain('<style lang="scss">')
      expect(pageSource).toContain('page {')
      expect(pageSource).toContain('background: #07111f')
    }
  })

  it('keeps the job business view independent from the shared shell', () => {
    expect(jobContentSource).not.toContain('default-layout')
    expect(jobContentSource).not.toContain('AppTabBar')
    expect(jobContentSource).not.toContain('NavBar')
    expect(jobContentSource).not.toContain('#2dd4bf')
    expect(jobContentSource).toContain('#8f7cff')
    expect(jobContentSource).toContain('#9b7cff')
  })
})
