import { describe, expect, it } from 'vitest'

import { buildUserPermissions, getAccessDecision, hasFeatureAccess, FEATURE_ACCESS } from './permission.js'

describe('permission config', () => {
  it('keeps public access for guests', () => {
    const permissions = buildUserPermissions({ role: 'guest', membershipStatus: 'none' })

    expect(permissions).toContain(FEATURE_ACCESS.JOB_BROWSE)
    expect(permissions).not.toContain(FEATURE_ACCESS.RESUME_UPLOAD)
    expect(hasFeatureAccess(permissions, FEATURE_ACCESS.RESUME_UPLOAD)).toBe(false)
  })

  it('routes members to protected features', () => {
    const decision = getAccessDecision({ role: 'guest' }, FEATURE_ACCESS.RESUME_UPLOAD)

    expect(decision.allowed).toBe(false)
    expect(decision.redirect).toBe('/pages/login/login')
  })
})
