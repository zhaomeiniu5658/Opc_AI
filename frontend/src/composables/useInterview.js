import { ref } from 'vue'

import { InterviewService } from '@/services/InterviewService.js'

export function useInterview() {
  const result = ref(null)

  async function createMock(data = {}) {
    result.value = await InterviewService.createMock(data)
    return result.value
  }

  return {
    result,
    createMock,
  }
}
