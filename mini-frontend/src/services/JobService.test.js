import { beforeEach, describe, expect, it, vi } from 'vitest'

const apiMocks = vi.hoisted(() => ({
  getPublicJobs: vi.fn(),
  getRecommendedJobs: vi.fn(),
}))

vi.mock('@/api/job.js', () => ({
  jobApi: apiMocks,
}))

import { JobService } from './JobService.js'

describe('JobService', () => {
  beforeEach(() => {
    apiMocks.getPublicJobs.mockReset()
    apiMocks.getRecommendedJobs.mockReset()
  })

  it('normalizes public job list', async () => {
    apiMocks.getPublicJobs.mockResolvedValue({
      total: 1,
      items: [{ id: 'job-1', salaryMin: 10, salaryMax: 20, matchScore: 88 }],
    })

    const result = await JobService.fetchPublicJobs()

    expect(result.total).toBe(1)
    expect(result.items[0].salaryText).toContain('10')
    expect(result.items[0].matchText).toContain('%')
  })

  it('sorts recommended jobs by match score', async () => {
    apiMocks.getRecommendedJobs.mockResolvedValue({
      items: [
        { id: 'job-1', salaryMin: 10, salaryMax: 20, matchScore: 80 },
        { id: 'job-2', salaryMin: 20, salaryMax: 30, matchScore: 95 },
      ],
    })

    const result = await JobService.fetchRecommendedJobs()

    expect(result.items[0].id).toBe('job-2')
    expect(result.items[1].id).toBe('job-1')
  })
})
