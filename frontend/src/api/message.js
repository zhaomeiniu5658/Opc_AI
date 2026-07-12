import { request } from './request.js'

export const messageApi = {
  list(params) {
    return request.get('/v1/message/list', params)
  },
}
