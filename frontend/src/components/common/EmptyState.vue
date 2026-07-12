<template>
  <view class="empty-state">
    <image class="empty-image" src="/static/default/empty.png" mode="aspectFit" />
    <text class="empty-title">{{ title }}</text>
    <text class="empty-desc">{{ description }}</text>
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '暂无数据',
  },
  description: {
    type: String,
    default: '稍后再试或调整筛选条件',
  },
})
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14rpx;
  padding: 48rpx 24rpx;
  color: var(--muted);
  text-align: center;
}

.empty-image {
  width: 144rpx;
  height: 144rpx;
}

.empty-title {
  color: var(--text);
  font-size: 30rpx;
  font-weight: 900;
}

.empty-desc {
  max-width: 480rpx;
  font-size: 24rpx;
  line-height: 1.5;
}
</style>
