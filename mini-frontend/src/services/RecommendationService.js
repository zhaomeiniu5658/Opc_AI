import { recommendationApi } from '@/api/recommendation.js'

export const RecommendationService = {
  fetchList(params) {
    return recommendationApi.list(params)
  },
  fetchReport(params) {
    return recommendationApi.report(params)
  },
}
