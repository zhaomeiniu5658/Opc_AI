import { defineStore } from 'pinia'

export const useResumeStore = defineStore('resume', {
  state: () => ({
    resumes: [],
  }),
  actions: {
    setResumes(items) {
      this.resumes = Array.isArray(items) ? items : []
    },
  },
})
