import { describe, expect, it } from 'vitest'

import { pageRegistry } from '@/data/pageRegistry.js'

describe('home page registry', () => {
  it('keeps key entry metadata', () => {
    expect(pageRegistry.recommendation.title).toBeTruthy()
    expect(pageRegistry.resumeUpload.description).toBeTruthy()
  })
})
