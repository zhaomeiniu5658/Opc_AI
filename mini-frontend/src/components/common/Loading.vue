<template>
  <view class="loading">
    <view class="loading-dot" />
    <text>{{ text }}</text>
  </view>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: '加载中',
  },
})
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  gap: 16rpx;
  color: var(--muted);
  font-size: 26rpx;
}

.loading-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 50%;
  background: var(--primary);
  animation: pulse 900ms ease-in-out infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}
</style>
