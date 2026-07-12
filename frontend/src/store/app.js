import { defineStore } from 'pinia'

import { ConfigService } from '@/services/ConfigService.js'
import { getInitialDhEnabled } from '@/utils/remoteConfig.js'

const TAB_KEYS = new Set(['home', 'advisor', 'job', 'growth', 'profile'])

export const useAppStore = defineStore('app', {
  state: () => ({
    activeTab: 'home',
    dhEnabled: getInitialDhEnabled(),
    initialized: false,
  }),
  actions: {
    setActiveTab(tab) {
      if (TAB_KEYS.has(tab)) {
        this.activeTab = tab
      }
    },
    async fetchRemoteConfig() {
      const config = await ConfigService.fetchRemoteConfig()
      this.dhEnabled = config.dhEnabled
      this.initialized = true
      return config
    },
  },
})
