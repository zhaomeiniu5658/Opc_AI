import { defineStore } from 'pinia'

import { buildUserPermissions } from '@/config/permission.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    role: 'guest',
    membershipStatus: 'none',
    permissions: buildUserPermissions({ role: 'guest', membershipStatus: 'none' }),
  }),
  actions: {
    setUser(user) {
      this.userId = user.userId || ''
      this.role = user.role || 'guest'
      this.membershipStatus = user.membershipStatus || 'none'
      this.permissions = buildUserPermissions(this.$state)
    },
    logout() {
      this.userId = ''
      this.role = 'guest'
      this.membershipStatus = 'none'
      this.permissions = buildUserPermissions(this.$state)
    },
  },
})
