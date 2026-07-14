<template>
  <view class="digital-human-avatar">
    <image
      class="avatar-image"
      src="/static/images/ai-assistant-reference.png"
      mode="aspectFill"
    />
  </view>
</template>

<style lang="scss" scoped>
.digital-human-avatar {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
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

.avatar-image {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
