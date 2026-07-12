import { request } from './request.js'

export const userApi = {
  getProfile() {
    return request.get('/v1/user/profile')
  },
}
