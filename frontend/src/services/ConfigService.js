import { configApi } from '@/api/config.js'
import { normalizeRemoteConfig } from '@/utils/remoteConfig.js'

export const ConfigService = {
  async fetchRemoteConfig() {
    const config = await configApi.getDigitalHumanConfig()
    return normalizeRemoteConfig(config)
  },
}
