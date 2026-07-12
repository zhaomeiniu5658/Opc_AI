export function normalizeRemoteConfig(config = {}) {
  return {
    dhEnabled: config.dhEnabled === true || config.dhEnabled === 'true',
  }
}

export function getInitialDhEnabled(env = import.meta.env || {}) {
  return env.VITE_DH_ENABLED === true || env.VITE_DH_ENABLED === 'true'
}
