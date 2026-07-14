import { request } from './request.js'

export const resumeApi = {
  upload(data) {
    return request.post('/v1/resume/upload', data)
  },
  getAnalysis(resumeId) {
    return request.get('/v1/resume/analysis/' + resumeId)
  },
  getHistory(params) {
    return request.get('/v1/resume/history', params)
  },
}
