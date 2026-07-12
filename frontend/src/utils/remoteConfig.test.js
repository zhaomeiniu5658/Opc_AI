import { describe, expect, it } from 'vitest'

import { getInitialDhEnabled, normalizeRemoteConfig } from './remoteConfig.js'

describe('remoteConfig utils', () => {
  it('normalizes dh flag', () => {
    expect(normalizeRemoteConfig({ dhEnabled: 'true' }).dhEnabled).toBe(true)
    expect(normalizeRemoteConfig({ dhEnabled: false }).dhEnabled).toBe(false)
  })

  it('reads initial flag from env', () => {
    expect(getInitialDhEnabled({ VITE_DH_ENABLED: 'true' })).toBe(true)
  })
})
