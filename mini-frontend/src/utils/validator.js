const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx']
const MAX_RESUME_SIZE = 10 * 1024 * 1024

export function isPhone(value) {
  return /^1[3-9]\d{9}$/.test(String(value || ''))
}

export function isRequired(value) {
  return String(value ?? '').trim().length > 0
}

export function isSupportedResumeFile(file) {
  if (!file || !file.name || !Number.isFinite(file.size)) {
    return false
  }

  const ext = file.name.split('.').pop().toLowerCase()
  return RESUME_EXTENSIONS.includes(ext) && file.size <= MAX_RESUME_SIZE
}
