import { computed } from 'vue'

import { pageRegistry } from '@/data/pageRegistry.js'

export function usePageMeta(key) {
  const pageMeta = computed(() => pageRegistry[key] || {
    title: '功能页面',
    description: '该页面遵循统一三态展示与分层架构。',
    stats: ['Ready'],
  })

  return {
    pageMeta,
  }
}
