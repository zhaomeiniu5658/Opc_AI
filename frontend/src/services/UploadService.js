import { uploadApi } from '@/api/upload.js'

export const UploadService = {
  uploadResume(file) {
    return uploadApi.resume({ file })
  },
}
