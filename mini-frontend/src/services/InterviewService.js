import { interviewApi } from '@/api/interview.js'

export const InterviewService = {
  createMock(data) {
    return interviewApi.createMock(data)
  },
  fetchHistory(params) {
    return interviewApi.history(params)
  },
}
