import { defineStore } from 'pinia'

export const useJobStore = defineStore('job', {
  state: () => ({
    jobs: [],
  }),
  actions: {
    setJobs(items) {
      this.jobs = Array.isArray(items) ? items : []
    },
  },
})
