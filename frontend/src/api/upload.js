import { resumeApi } from './resume.js'

export const uploadApi = {
  resume(data) {
    return resumeApi.upload(data)
  },
}
