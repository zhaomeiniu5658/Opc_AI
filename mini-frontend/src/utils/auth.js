import { CACHE_KEYS } from '@/constants/cache.js'
import { getStorage, removeStorage, setStorage } from './storage.js'

export function getToken() {
  return getStorage(CACHE_KEYS.TOKEN, '')
}

export function setToken(token) {
  setStorage(CACHE_KEYS.TOKEN, token)
}

export function clearToken() {
  removeStorage(CACHE_KEYS.TOKEN)
}

export function getUserIdentity() {
  return getStorage(CACHE_KEYS.USER, {
    userId: '',
    role: 'guest',
    membershipStatus: 'none',
    permissions: [],
  })
}
