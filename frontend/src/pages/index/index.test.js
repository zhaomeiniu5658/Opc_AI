import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { pageRegistry } from '@/data/pageRegistry.js'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const homeContentSource = readFileSync(
  resolve(currentDirectory, '../../components/business/HomeTabContent.vue'),
  'utf8'
)

describe('home page registry', () => {
  it('keeps key entry metadata', () => {
    expect(pageRegistry.recommendation.title).toBeTruthy()
    expect(pageRegistry.resumeUpload.description).toBeTruthy()
  })

  it('removes mock device chrome without shifting home content', () => {
    expect(homeContentSource).not.toContain('phone-status')
    expect(homeContentSource).not.toContain('status-time')
    expect(homeContentSource).not.toContain('battery-level')
    expect(homeContentSource).toContain('class="home-top-spacer"')
    expect(homeContentSource).toContain('min-height: 56rpx')
  })

  it('uses the digital-human consultant brand and aligns the avatar with it', () => {
    expect(homeContentSource).not.toContain('resume-button')
    expect(homeContentSource).not.toContain('我的简历')
    expect(homeContentSource).not.toContain('AI数字人求职助手')
    expect(homeContentSource).toContain('数字人求职顾问')
    expect(homeContentSource).toContain('bottom: 13rpx')
  })
})
