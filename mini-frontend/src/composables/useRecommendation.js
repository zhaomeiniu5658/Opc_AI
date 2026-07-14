import { ref } from 'vue'

import { RecommendationService } from '@/services/RecommendationService.js'

export function useRecommendation() {
  const report = ref(null)

  async function loadReport(params = {}) {
    report.value = await RecommendationService.fetchReport(params)
    return report.value
  }

  return {
    report,
    loadReport,
  }
}
