<template>
  <view class="digital-human-avatar">
    <view class="avatar-rings">
      <view class="avatar-ring avatar-ring-outer"></view>
      <view class="avatar-ring avatar-ring-inner"></view>
    </view>
    <image
      class="avatar-image"
      src="/static/images/ai-assistant-reference.png"
      mode="aspectFill"
    />
  </view>
</template>

<style lang="scss" scoped>
.digital-human-avatar {
  position: absolute;
  right: -28rpx;
  bottom: -10rpx;
  width: 392rpx;
  height: 520rpx;
  overflow: hidden;
}

.digital-human-avatar::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  height: 150rpx;
  background: linear-gradient(180deg, rgba(2, 8, 22, 0), #031025 72%);
  content: '';
}

.avatar-rings {
  position: absolute;
  right: 12rpx;
  bottom: 90rpx;
  width: 320rpx;
  height: 320rpx;
}

.avatar-ring {
  position: absolute;
  border: 2rpx solid rgba(124, 92, 255, 0.34);
  border-radius: 50%;
}

.avatar-ring-outer {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.avatar-ring-inner {
  top: 54rpx;
  right: 54rpx;
  bottom: 54rpx;
  left: 54rpx;
  border-color: rgba(124, 92, 255, 0.18);
}

.avatar-image {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 350rpx;
  height: 520rpx;
}
</style>
