import { ref } from 'vue'

import { ResumeService } from '@/services/ResumeService.js'

export function useResume() {
  const resume = ref(null)
  const loading = ref(false)

  async function loadAnalysis(resumeId) {
    loading.value = true
    try {
      resume.value = await ResumeService.fetchAnalysis(resumeId)
      return resume.value
    } finally {
      loading.value = false
    }
  }

  return {
    resume,
    loading,
    loadAnalysis,
  }
}
