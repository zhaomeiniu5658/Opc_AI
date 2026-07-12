import { request } from './request.js'

export const jobApi = {
  getPublicJobs(params) {
    return request.get('/v1/job/list', params)
  },
  getRecommendedJobs(params) {
    return request.get('/v1/recommendation/list', params)
  },
}
