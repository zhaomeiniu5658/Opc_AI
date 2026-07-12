import { request } from './request.js'

export const membershipApi = {
  profile() {
    return request.get('/v1/membership/profile')
  },
  createOrder(data) {
    return request.post('/v1/order/create', data)
  },
}
