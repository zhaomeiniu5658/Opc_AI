export function debounce(fn, wait = 300) {
  let timer = null

  return function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), wait)
  }
}

export function throttle(fn, wait = 300) {
  let lastRun = 0

  return function throttled(...args) {
    const now = Date.now()
    if (now - lastRun >= wait) {
      lastRun = now
      fn.apply(this, args)
    }
  }
}
