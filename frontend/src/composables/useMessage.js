import { ref } from 'vue'

import { MessageService } from '@/services/MessageService.js'

export function useMessage() {
  const messages = ref([])

  async function loadMessages(params = {}) {
    const result = await MessageService.fetchList(params)
    messages.value = result.items || []
    return result
  }

  return {
    messages,
    loadMessages,
  }
}
