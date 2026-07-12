import { request } from './request.js'

export const recommendationApi = {
  list(params) {
    return request.get('/v1/recommendation/list', params)
  },
  report(params) {
    return request.get('/v1/recommendation/report', params)
  },
}
