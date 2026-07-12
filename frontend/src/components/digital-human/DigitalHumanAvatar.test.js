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
    expect(avatarSource).not.toContain('avatar-ring')
    expect(avatarSource).not.toContain('#ff006e')
    expect(avatarSource).not.toContain('console.')
    expect(homeContentSource).toContain('class="home-avatar-stage"')
    expect(homeContentSource).toContain('<DigitalHumanAvatar width="392rpx" height="572rpx" />')
    expect(homeContentSource).toContain('min-height: 482rpx')
    expect(homeContentSource).toContain('height: 572rpx')
    expect(digitalHumanContentSource.match(/<DigitalHumanAvatar width=/g)).toHaveLength(2)
    expect(digitalHumanContentSource).toContain('<DigitalHumanAvatar width="350rpx" height="520rpx" />')
    expect(digitalHumanContentSource).toContain('<DigitalHumanAvatar width="300rpx" height="300rpx" />')
    expect(homeContentSource).not.toContain('DigitalHumanChat')
    expect(digitalHumanContentSource).not.toContain('DigitalHumanChat')
  })
})
