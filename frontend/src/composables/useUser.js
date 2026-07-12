import { ref } from 'vue'

import { UserService } from '@/services/UserService.js'

export function useUser() {
  const user = ref(null)
  const loading = ref(false)

  async function loadUser() {
    loading.value = true
    try {
      user.value = await UserService.fetchProfile()
      return user.value
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    loadUser,
  }
}
