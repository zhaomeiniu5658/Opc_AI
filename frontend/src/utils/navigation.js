export function navigateTo(url) {
  if (typeof uni !== 'undefined' && typeof uni.navigateTo === 'function') {
    uni.navigateTo({ url })
  }
}

export function reLaunch(url) {
  if (typeof uni !== 'undefined' && typeof uni.reLaunch === 'function') {
    if (typeof uni.setBackgroundColor === 'function') {
      uni.setBackgroundColor({
        backgroundColor: '#07111f',
        backgroundColorTop: '#07111f',
        backgroundColorBottom: '#07111f',
      })
    }

    uni.reLaunch({ url })
  }
}
