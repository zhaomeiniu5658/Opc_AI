import { request } from './request.js'

export const configApi = {
  getDigitalHumanConfig() {
    return request.get('/v1/digital-human/config')
  },
}
