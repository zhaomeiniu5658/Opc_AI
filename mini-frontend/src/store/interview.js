import { defineStore } from 'pinia'

export const useInterviewStore = defineStore('interview', {
  state: () => ({
    records: [],
  }),
  actions: {
    setRecords(items) {
      this.records = Array.isArray(items) ? items : []
    },
  },
})
