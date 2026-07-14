import { defineStore } from 'pinia'

import { getAccessDecision } from '@/config/permission.js'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    lastDecision: null,
  }),
  actions: {
    check(user, feature) {
      this.lastDecision = getAccessDecision(user, feature)
      return this.lastDecision
    },
  },
})
