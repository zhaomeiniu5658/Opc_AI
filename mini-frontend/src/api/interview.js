import { request } from './request.js'

export const interviewApi = {
  createMock(data) {
    return request.post('/v1/interview/mock', data)
  },
  history(params) {
    return request.get('/v1/interview/history', params)
  },
}
