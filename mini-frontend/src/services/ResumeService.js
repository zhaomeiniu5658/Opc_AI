import { resumeApi } from '@/api/resume.js'

export const ResumeService = {
  uploadResume(file) {
    return resumeApi.upload({ file })
  },
  fetchAnalysis(resumeId) {
    return resumeApi.getAnalysis(resumeId)
  },
  fetchHistory(params) {
    return resumeApi.getHistory(params)
  },
}
