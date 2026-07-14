import { defineStore } from 'pinia'

export const useMembershipStore = defineStore('membership', {
  state: () => ({
    status: 'none',
    plan: '',
    benefits: [],
  }),
  actions: {
    setMembership(membership) {
      this.status = membership.status || 'none'
      this.plan = membership.plan || ''
      this.benefits = membership.benefits || []
    },
  },
})
