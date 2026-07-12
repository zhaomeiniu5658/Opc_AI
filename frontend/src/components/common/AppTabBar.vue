<template>
  <view v-if="visible" class="app-tabbar">
    <view class="app-tabbar-item" :class="{ active: homeActive }" @tap="goHome">
      <view class="tabbar-icon tab-home"></view>
      <text>首页</text>
    </view>
    <view class="app-tabbar-item" :class="{ active: advisorActive }" @tap="goAdvisor">
      <view class="tabbar-icon tab-advisor"></view>
      <text>AI顾问</text>
    </view>
    <view class="app-tabbar-item" :class="{ active: jobActive }" @tap="goJob">
      <view class="tabbar-icon tab-job"></view>
      <text>岗位</text>
    </view>
    <view class="app-tabbar-item" :class="{ active: growthActive }" @tap="goGrowth">
      <view class="tabbar-icon tab-growth"></view>
      <text>成长</text>
    </view>
    <view class="app-tabbar-item" :class="{ active: profileActive }" @tap="goProfile">
      <view class="tabbar-icon tab-profile"></view>
      <text>我的</text>
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { navigateTo } from '@/utils/navigation.js'

const currentRoute = ref('')
let routeTimer = null

const hiddenRoutePrefixes = ['pages/login', 'pages/common']

const visible = computed(
  () => !hiddenRoutePrefixes.some((prefix) => currentRoute.value.startsWith(prefix))
)

const activeKey = computed(() => {
  const route = currentRoute.value
  if (route.startsWith('pages/job')) return 'job'
  if (route.startsWith('pages/career') || route.startsWith('pages/graph')) return 'growth'
  if (
    route.startsWith('pages/resume') ||
    route.startsWith('pages/recommendation') ||
    route.startsWith('pages/interview') ||
    route.startsWith('pages/digital-human')
  ) {
    return 'advisor'
  }
  if (
    route.startsWith('pages/profile') ||
    route.startsWith('pages/membership') ||
    route.startsWith('pages/message')
  )
    return 'profile'

  return 'home'
})

const homeActive = computed(() => activeKey.value === 'home')
const advisorActive = computed(() => activeKey.value === 'advisor')
const jobActive = computed(() => activeKey.value === 'job')
const growthActive = computed(() => activeKey.value === 'growth')
const profileActive = computed(() => activeKey.value === 'profile')

function readCurrentRoute() {
  if (typeof globalThis.getCurrentPages !== 'function') return 'pages/index/index'

  const pages = globalThis.getCurrentPages()
  return pages[pages.length - 1]?.route || 'pages/index/index'
}

function syncCurrentRoute() {
  const route = readCurrentRoute()
  if (route !== currentRoute.value) {
    currentRoute.value = route
  }
}

function goRoute(key, path) {
  if (activeKey.value === key) return
  navigateTo(path)
}

function goHome() {
  goRoute('home', '/pages/index/index')
}

function goAdvisor() {
  goRoute('advisor', '/pages/digital-human/index')
}

function goJob() {
  goRoute('job', '/pages/job/list')
}

function goGrowth() {
  goRoute('growth', '/pages/career/roadmap')
}

function goProfile() {
  goRoute('profile', '/pages/profile/index')
}

syncCurrentRoute()

onMounted(() => {
  syncCurrentRoute()
  routeTimer = globalThis.setInterval(syncCurrentRoute, 200)
})

onUnmounted(() => {
  if (routeTimer) {
    globalThis.clearInterval(routeTimer)
    routeTimer = null
  }
})
</script>

<style lang="scss">
.app-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 18rpx 18rpx calc(18rpx + env(safe-area-inset-bottom));
  border: 1px solid rgba(99, 102, 241, 0.24);
  border-radius: 28rpx 28rpx 0 0;
  background: rgba(5, 13, 31, 0.94);
  box-shadow: 0 -18rpx 48rpx rgba(0, 0, 0, 0.38);
}

.app-tabbar-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8rpx;
  min-height: 76rpx;
  color: #94a3b8;
  font-size: 21rpx;
  white-space: nowrap;
}

.app-tabbar-item.active {
  color: #8f7cff;
}

.tabbar-icon {
  position: relative;
  width: 36rpx;
  height: 36rpx;
}

.tab-home::before {
  position: absolute;
  left: 5rpx;
  top: 11rpx;
  width: 26rpx;
  height: 22rpx;
  border-radius: 6rpx 6rpx 4rpx 4rpx;
  background: currentColor;
  content: '';
}

.tab-home::after {
  position: absolute;
  left: 7rpx;
  top: 1rpx;
  width: 22rpx;
  height: 22rpx;
  background: currentColor;
  transform: rotate(45deg);
  content: '';
}

.tab-advisor {
  border: 4rpx solid currentColor;
  border-radius: 50%;
}

.tab-advisor::before {
  position: absolute;
  left: 8rpx;
  top: 7rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}

.tab-advisor::after {
  position: absolute;
  right: -3rpx;
  bottom: 2rpx;
  width: 12rpx;
  height: 10rpx;
  border-left: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  transform: skew(-20deg);
  content: '';
}

.tab-job {
  border: 4rpx solid currentColor;
  border-radius: 5rpx;
}

.tab-job::before,
.tab-job::after {
  position: absolute;
  left: 7rpx;
  width: 16rpx;
  height: 4rpx;
  border-radius: 999px;
  background: currentColor;
  content: '';
}

.tab-job::before {
  top: 9rpx;
}

.tab-job::after {
  top: 19rpx;
}

.tab-growth {
  border-left: 4rpx solid currentColor;
  border-bottom: 4rpx solid currentColor;
  border-radius: 0 0 0 5rpx;
}

.tab-growth::before {
  position: absolute;
  left: 7rpx;
  bottom: 8rpx;
  width: 24rpx;
  height: 18rpx;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  transform: skew(-18deg);
  content: '';
}

.tab-growth::after {
  position: absolute;
  top: 3rpx;
  right: 0;
  width: 12rpx;
  height: 12rpx;
  border-top: 5rpx solid currentColor;
  border-right: 5rpx solid currentColor;
  background: currentColor;
  transform: rotate(45deg);
  content: '';
}

.tab-profile {
  border: 4rpx solid currentColor;
  border-top-color: transparent;
  border-radius: 50% 50% 42% 42%;
}

.tab-profile::before {
  position: absolute;
  top: -16rpx;
  left: 7rpx;
  width: 14rpx;
  height: 14rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
  content: '';
}
</style>
