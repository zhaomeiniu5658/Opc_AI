<template>
  <view class="app-page tab-summary-page">
    <scroll-view class="tab-summary-scroll" scroll-y :show-scrollbar="false">
      <view class="summary-grid"></view>
      <view class="summary-header">
        <text class="summary-kicker">AI 智能求职</text>
        <text class="summary-title">{{ meta.title }}</text>
        <text class="summary-description">{{ meta.description }}</text>
      </view>

      <view class="summary-panel">
        <text class="summary-panel-title">服务概览</text>
        <view class="summary-stats">
          <view v-for="item in meta.stats" :key="item" class="summary-stat">
            <text>{{ item }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
defineProps({
  meta: {
    type: Object,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.tab-summary-page {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: calc(24rpx + var(--status-bar-height, 0px)) 28rpx 0;
  background:
    linear-gradient(130deg, rgba(117, 92, 255, 0.12) 0%, rgba(4, 10, 24, 0) 32%),
    linear-gradient(180deg, #020816 0%, #06152a 48%, #020817 100%);
}

.tab-summary-scroll {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding-bottom: calc(188rpx + env(safe-area-inset-bottom));
}

.summary-grid {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 600rpx;
  opacity: 0.54;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(124, 92, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 92, 255, 0.05) 1px, transparent 1px);
  background-size: 96rpx 96rpx;
}

.summary-header,
.summary-panel {
  position: relative;
  z-index: 1;
}

.summary-kicker,
.summary-title,
.summary-description,
.summary-panel-title {
  display: block;
}

.summary-kicker {
  color: #8f7cff;
  font-size: 22rpx;
  font-weight: 900;
}

.summary-title {
  margin-top: 12rpx;
  color: #ffffff;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1.2;
}

.summary-description {
  margin-top: 14rpx;
  color: #c8d2ef;
  font-size: 25rpx;
  line-height: 1.6;
}

.summary-panel {
  margin-top: 40rpx;
  padding: 28rpx;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18rpx;
  background:
    linear-gradient(180deg, rgba(18, 30, 60, 0.78), rgba(8, 15, 31, 0.88)), rgba(8, 15, 31, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

.summary-panel-title {
  color: #f8fafc;
  font-size: 30rpx;
  font-weight: 900;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 24rpx;
}

.summary-stat {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 112rpx;
  padding: 14rpx;
  border: 1px solid rgba(143, 124, 255, 0.24);
  border-radius: 12rpx;
  background: rgba(11, 25, 48, 0.72);
  color: #d7d1ff;
  font-size: 21rpx;
  font-weight: 800;
  line-height: 1.45;
  text-align: center;
}
</style>
