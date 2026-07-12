import { ref } from 'vue'

import { JobService } from '@/services/JobService.js'

export function useJob() {
  const jobs = ref([])
  const loading = ref(false)
  const error = ref('')

  async function loadPublicJobs(params = {}) {
    loading.value = true
    error.value = ''

    try {
      const result = await JobService.fetchPublicJobs(params)
      jobs.value = result.items
      return result
    } catch (err) {
      error.value = err?.message || '岗位加载失败'
      return { total: 0, items: [] }
    } finally {
      loading.value = false
    }
  }

  async function loadRecommendedJobs(params = {}) {
    loading.value = true
    error.value = ''

    try {
      const result = await JobService.fetchRecommendedJobs(params)
      jobs.value = result.items
      return result
    } catch (err) {
      error.value = err?.message || '推荐加载失败'
      return { total: 0, items: [] }
    } finally {
      loading.value = false
    }
  }

  return {
    jobs,
    loading,
    error,
    loadPublicJobs,
    loadRecommendedJobs,
  }
}
