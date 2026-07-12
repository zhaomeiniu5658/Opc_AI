<template>
  <default-layout :meta="pageMeta" />
</template>

<script setup>
import { usePageMeta } from '@/composables/usePageMeta.js'

const { pageMeta } = usePageMeta('digitalHuman')
</script>
