import { ref } from 'vue'

import { AuthService } from '@/services/AuthService.js'

export function useAuth() {
  const loading = ref(false)
  const error = ref('')

  async function login(data) {
    loading.value = true
    error.value = ''

    try {
      return await AuthService.login(data)
    } catch (err) {
      error.value = err?.message || '登录失败'
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    login,
  }
}
