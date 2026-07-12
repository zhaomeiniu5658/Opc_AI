import { defineStore } from 'pinia'

export const useRecommendationStore = defineStore('recommendation', {
  state: () => ({
    recommendations: [],
  }),
  actions: {
    setRecommendations(items) {
      this.recommendations = Array.isArray(items) ? items : []
    },
  },
})
