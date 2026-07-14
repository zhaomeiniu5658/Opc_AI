export const FEATURE_ACCESS = {
  JOB_BROWSE: 'job:browse',
  COMPANY_VIEW: 'company:view',
  RESUME_UPLOAD: 'resume:upload',
  RESUME_ANALYSIS: 'resume:analysis',
  CAREER_PROFILE: 'career:profile',
  JOB_RECOMMENDATION: 'job:recommendation',
  AI_INTERVIEW: 'ai:interview',
  CAREER_ROADMAP: 'career:roadmap',
  RELATION_GRAPH: 'graph:relationship',
  AI_ADVISOR: 'ai:advisor',
  MEMBERSHIP_SERVICE: 'membership:service',
}

const publicFeatures = [FEATURE_ACCESS.JOB_BROWSE, FEATURE_ACCESS.COMPANY_VIEW]

const userFeatures = [
  ...publicFeatures,
  FEATURE_ACCESS.RESUME_UPLOAD,
  FEATURE_ACCESS.RESUME_ANALYSIS,
  FEATURE_ACCESS.CAREER_PROFILE,
  FEATURE_ACCESS.JOB_RECOMMENDATION,
  FEATURE_ACCESS.AI_ADVISOR,
]

const memberFeatures = [
  ...userFeatures,
  FEATURE_ACCESS.AI_INTERVIEW,
  FEATURE_ACCESS.CAREER_ROADMAP,
  FEATURE_ACCESS.RELATION_GRAPH,
  FEATURE_ACCESS.MEMBERSHIP_SERVICE,
]

export function buildUserPermissions(user = {}) {
  if (user.role === 'member' && user.membershipStatus === 'active') {
    return [...new Set(memberFeatures)]
  }

  if (user.role === 'user' || user.role === 'member') {
    return [...new Set(userFeatures)]
  }

  return [...publicFeatures]
}

export function hasFeatureAccess(permissions, feature) {
  return Array.isArray(permissions) && permissions.includes(feature)
}

export function getAccessDecision(user = {}, feature) {
  const permissions = buildUserPermissions(user)

  if (hasFeatureAccess(permissions, feature)) {
    return {
      allowed: true,
      reason: 'allowed',
      redirect: '',
    }
  }

  const isGuest = !user.role || user.role === 'guest'
  const reason = isGuest ? 'login_required' : 'membership_required'

  return {
    allowed: false,
    reason,
    redirect: isGuest ? '/pages/login/login' : '/pages/membership/index',
  }
}

export const permissionConfig = {
  publicFeatures,
  userFeatures,
  memberFeatures,
}
