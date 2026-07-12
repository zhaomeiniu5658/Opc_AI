import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const avatarSource = readFileSync(resolve(currentDirectory, 'DigitalHumanAvatar.vue'), 'utf8')
const homeContentSource = readFileSync(
  resolve(currentDirectory, '../business/HomeTabContent.vue'),
  'utf8'
)
const digitalHumanContentSource = readFileSync(
  resolve(currentDirectory, '../business/DigitalHumanTabContent.vue'),
  'utf8'
)

describe('digital human avatar integration', () => {
  it('is shared by the home and digital-human content views', () => {
    expect(avatarSource).toContain('width: 100%')
    expect(avatarSource).toContain('height: 100%')
    expect(avatarSource).not.toContain('defineProps')
    expect(avatarSource).not.toContain(':style=')
    expect(avatarSource).not.toContain('avatar-ring')
    expect(avatarSource).not.toContain('#ff006e')
    expect(avatarSource).not.toContain('console.')
    expect(homeContentSource).toContain('class="home-avatar-stage"')
    expect(homeContentSource).toContain('<DigitalHumanAvatar />')
    expect(homeContentSource).toContain('min-height: 482rpx')
    expect(homeContentSource).toContain('height: 572rpx')
    expect(digitalHumanContentSource.match(/<DigitalHumanAvatar \/>/g)).toHaveLength(2)
    expect(digitalHumanContentSource).toContain('width: 350rpx')
    expect(digitalHumanContentSource).toContain('height: 520rpx')
    expect(digitalHumanContentSource).toContain('width: 300rpx')
    expect(digitalHumanContentSource).toContain('height: 300rpx')
    expect(homeContentSource).not.toContain('DigitalHumanChat')
    expect(digitalHumanContentSource).not.toContain('DigitalHumanChat')
  })

  it('keeps the digital-human controls icon-only and removes redundant copy', () => {
    expect(digitalHumanContentSource).toContain('class="digital-call-trigger"')
    expect(digitalHumanContentSource).toContain('class="digital-call-icon"')
    expect(digitalHumanContentSource).toContain('class="digital-call-receiver"')
    expect(digitalHumanContentSource).toContain('class="composer-mic-icon"')
    expect(digitalHumanContentSource).toContain('class="composer-send-icon"')
    expect(digitalHumanContentSource).toContain('border-left: 28rpx solid currentColor')
    expect(digitalHumanContentSource).not.toContain('拨打电话')
    expect(digitalHumanContentSource).not.toContain('求职数字人')
    expect(digitalHumanContentSource).not.toContain('支持文字输入和语音输入')
    expect(digitalHumanContentSource).not.toContain('composer-hint')
  })
})
