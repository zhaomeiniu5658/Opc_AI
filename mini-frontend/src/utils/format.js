import dayjs from 'dayjs'

export function formatDate(value, pattern = 'YYYY-MM-DD') {
  if (!value) {
    return ''
  }

  return dayjs(value).format(pattern)
}

export function formatSalary(min, max) {
  if (!min && !max) {
    return '面议'
  }

  return String(min) + 'k-' + String(max) + 'k'
}

export function formatPercent(value) {
  return Math.round(Number(value || 0)) + '%'
}
