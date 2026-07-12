import { defineStore } from 'pinia'

import { ConfigService } from '@/services/ConfigService.js'
import { getInitialDhEnabled } from '@/utils/remoteConfig.js'

export const useAppStore = defineStore('app', {
  state: () => ({
    dhEnabled: getInitialDhEnabled(),
    initialized: false,
  }),
  actions: {
    async fetchRemoteConfig() {
      const config = await ConfigService.fetchRemoteConfig()
      this.dhEnabled = config.dhEnabled
      this.initialized = true
      return config
    },
  },
})
