import { ref } from 'vue'

import { UploadService } from '@/services/UploadService.js'

export function useUpload() {
  const loading = ref(false)

  async function uploadResume(file) {
    loading.value = true
    try {
      return await UploadService.uploadResume(file)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    uploadResume,
  }
}
