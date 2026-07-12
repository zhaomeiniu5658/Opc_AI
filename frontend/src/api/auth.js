import { request } from './request.js'

export const authApi = {
  login(data) {
    return request.post('/v1/auth/login', data)
  },
}
