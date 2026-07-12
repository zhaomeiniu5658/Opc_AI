function hasUniStorage() {
  return typeof uni !== 'undefined' && typeof uni.getStorageSync === 'function'
}

export function getStorage(key, fallback = null) {
  if (hasUniStorage()) {
    const value = uni.getStorageSync(key)
    return value === '' || value === undefined ? fallback : value
  }

  return fallback
}

export function setStorage(key, value) {
  if (hasUniStorage()) {
    uni.setStorageSync(key, value)
  }
}

export function removeStorage(key) {
  if (hasUniStorage()) {
    uni.removeStorageSync(key)
  }
}
