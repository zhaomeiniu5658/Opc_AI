<template>
  <view class="nav-bar">
    <view>
      <text class="nav-title">{{ title }}</text>
      <text class="nav-subtitle">{{ subtitle }}</text>
    </view>
    <slot name="actions" />
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'AI智能招聘',
  },
  subtitle: {
    type: String,
    default: 'Clinical Talent Intelligence',
  },
})
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 104rpx;
  padding: 0 8rpx;
}

.nav-title,
.nav-subtitle {
  display: block;
}

.nav-title {
  color: var(--text);
  font-size: 36rpx;
  font-weight: 900;
}

.nav-subtitle {
  margin-top: 8rpx;
  color: var(--muted);
  font-size: 22rpx;
  font-weight: 700;
}
</style>
