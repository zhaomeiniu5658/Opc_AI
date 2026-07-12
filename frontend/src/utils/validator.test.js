import { describe, expect, it } from 'vitest'

import { isPhone, isRequired, isSupportedResumeFile } from './validator.js'

describe('validator utils', () => {
  it('validates required values', () => {
    expect(isRequired('hello')).toBe(true)
    expect(isRequired('  ')).toBe(false)
  })

  it('validates phone numbers', () => {
    expect(isPhone('13800138000')).toBe(true)
    expect(isPhone('123')).toBe(false)
  })

  it('checks resume file support', () => {
    expect(isSupportedResumeFile({ name: 'resume.pdf', size: 1024 })).toBe(true)
    expect(isSupportedResumeFile({ name: 'resume.exe', size: 1024 })).toBe(false)
  })
})
