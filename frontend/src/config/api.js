import { envConfig } from './env.js'

export const apiConfig = {
  baseURL: envConfig.apiBaseUrl,
  timeout: 10000,
}
