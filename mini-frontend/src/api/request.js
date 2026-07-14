import Request from 'luch-request'

import { apiConfig, envConfig } from '@/config/index.js'
import { getToken, getUserIdentity } from '@/utils/auth.js'
import { mockRequest } from './mock/index.js'

const http = new Request(apiConfig)

http.interceptors.request.use((config) => {
  const token = getToken()
  const identity = getUserIdentity()
  const header = config.header || {}

  if (token) {
    header.Authorization = 'Bearer ' + token
  }

  header['X-User-Role'] = identity.role || 'guest'
  config.header = header
  return config
})

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error?.statusCode === 401 && typeof uni !== 'undefined') {
      uni.navigateTo({ url: '/pages/login/login' })
    }

    return Promise.reject(error)
  }
)

function call(method, url, data = {}) {
  if (envConfig.useMock) {
    return mockRequest(method, url, data)
  }

  if (method === 'GET') {
    return http.get(url, { params: data })
  }

  return http.post(url, data)
}

export const request = {
  get(url, params) {
    return call('GET', url, params)
  },
  post(url, data) {
    return call('POST', url, data)
  },
}
