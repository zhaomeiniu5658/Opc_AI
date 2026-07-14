<template>
  <view class="error-state">
    <text>{{ message }}</text>
  </view>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: '服务暂不可用',
  },
})
</script>

<style lang="scss" scoped>
.error-state {
  padding: 40rpx 28rpx;
  color: #fecaca;
}
</style>
