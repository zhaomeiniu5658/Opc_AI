export const envConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  useMock: (import.meta.env.VITE_USE_MOCK || 'true') !== 'false',
  dhEnabled: import.meta.env.VITE_DH_ENABLED || 'false',
}
