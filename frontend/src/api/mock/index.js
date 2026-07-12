import {
  mockInterview,
  mockJobs,
  mockMember,
  mockMembership,
  mockMessages,
  mockRecommendationReport,
  mockRemoteConfig,
  mockResume,
  mockUser,
} from './data.js'

function ok(data) {
  return Promise.resolve(data)
}

function filterJobs(params = {}) {
  const keyword = String(params.keyword || '').trim().toLowerCase()
  const items = mockJobs.filter((job) => {
    if (!job.public) {
      return false
    }

    if (!keyword) {
      return true
    }

    return [job.title, job.companyName, job.city, ...job.tags].join(' ').toLowerCase().includes(keyword)
  })

  return {
    total: items.length,
    items,
  }
}

export function mockRequest(method, url, payload = {}) {
  const params = payload || {}

  if (url === '/v1/auth/login' && method === 'POST') {
    return ok({
      token: 'mock-token-1001',
      user: params.member ? mockMember : mockUser,
    })
  }

  if (url === '/v1/user/profile') {
    return ok(mockUser)
  }

  if (url === '/v1/job/list') {
    return ok(filterJobs(params))
  }

  if (url === '/v1/recommendation/list') {
    return ok({
      total: mockJobs.length,
      items: [...mockJobs].sort((a, b) => b.matchScore - a.matchScore),
    })
  }

  if (url === '/v1/recommendation/report') {
    return ok(mockRecommendationReport)
  }

  if (url === '/v1/resume/upload') {
    return ok({ taskId: 'task-1001', resumeId: mockResume.id })
  }

  if (url.startsWith('/v1/resume/analysis')) {
    return ok(mockResume)
  }

  if (url === '/v1/resume/history') {
    return ok({ total: 1, items: [mockResume] })
  }

  if (url === '/v1/interview/mock') {
    return ok(mockInterview)
  }

  if (url === '/v1/interview/history') {
    return ok({ total: 1, items: [mockInterview] })
  }

  if (url === '/v1/order/create') {
    return ok({ orderId: 'order-1001', amount: 199, status: 'created' })
  }

  if (url === '/v1/membership/profile') {
    return ok(mockMembership)
  }

  if (url === '/v1/message/list') {
    return ok({ total: mockMessages.length, items: mockMessages })
  }

  if (url === '/v1/digital-human/config') {
    return ok(mockRemoteConfig)
  }

  return ok({ total: 0, items: [] })
}
