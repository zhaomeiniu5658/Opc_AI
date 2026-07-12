export function navigateTo(url) {
  if (typeof uni !== 'undefined' && typeof uni.navigateTo === 'function') {
    uni.navigateTo({ url })
  }
}

export function reLaunch(url) {
  if (typeof uni !== 'undefined' && typeof uni.reLaunch === 'function') {
    uni.reLaunch({ url })
  }
}
