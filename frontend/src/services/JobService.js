import { jobApi } from '@/api/job.js'
import { formatPercent, formatSalary } from '@/utils/format.js'

function normalizeJob(job) {
  return {
    ...job,
    salaryText: formatSalary(job.salaryMin, job.salaryMax),
    matchText: formatPercent(job.matchScore),
  }
}

function normalizeJobList(result) {
  const items = (result.items || []).map(normalizeJob)
  return {
    total: result.total ?? items.length,
    items,
  }
}

export const JobService = {
  async fetchPublicJobs(params = {}) {
    const result = await jobApi.getPublicJobs(params)
    return normalizeJobList(result)
  },

  async fetchRecommendedJobs(params = {}) {
    const result = await jobApi.getRecommendedJobs(params)
    const normalized = normalizeJobList(result)
    return {
      ...normalized,
      items: normalized.items.sort((a, b) => b.matchScore - a.matchScore),
    }
  },
}
