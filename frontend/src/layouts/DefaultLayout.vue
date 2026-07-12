<template>
  <view class="default-layout">
    <slot>
      <view class="app-page default-layout-page">
        <scroll-view class="default-layout-scroll" scroll-y :show-scrollbar="false">
          <NavBar :title="meta.title" :subtitle="meta.description" />
          <view class="layout-panel panel fade-in">
            <view class="layout-head">
              <view>
                <text class="layout-title">{{ meta.title }}</text>
                <text class="layout-desc">{{ meta.description }}</text>
              </view>
              <text class="layout-badge">Mock</text>
            </view>

            <Loading v-if="state === 'loading'" />
            <EmptyState
              v-else-if="state === 'empty'"
              title="当前暂无数据"
              :description="meta.description"
            />
            <ErrorState v-else-if="state === 'error'" />
            <view v-else class="layout-body">
              <view v-for="item in meta.stats" :key="item" class="stat-item">
                <text>{{ item }}</text>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </slot>
    <AppTabBar />
  </view>
</template>

<script setup>
import { ref } from 'vue'

import AppTabBar from '@/components/common/AppTabBar.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import Loading from '@/components/common/Loading.vue'
import NavBar from '@/components/common/NavBar.vue'

defineProps({
  meta: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      stats: [],
    }),
  },
})

const state = ref('ready')
</script>
<style lang="scss" scoped>
.default-layout {
  width: 100%;
  min-height: 100vh;
  background: #07111f;
}

.default-layout-page {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  min-height: 100vh;
  padding: 24rpx 24rpx 0;
}

.default-layout-scroll {
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding-bottom: calc(188rpx + env(safe-area-inset-bottom));
}

.layout-panel {
  overflow: hidden;
}

.layout-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  min-height: 120rpx;
  padding: 24rpx 28rpx;
  border-bottom: 1px solid var(--line);
}

.layout-title,
.layout-desc {
  display: block;
}

.layout-title {
  color: var(--text);
  font-size: 34rpx;
  font-weight: 900;
}

.layout-desc {
  margin-top: 8rpx;
  color: var(--muted);
  font-size: 24rpx;
  line-height: 1.5;
}

.layout-badge {
  flex: 0 0 auto;
  padding: 8rpx 16rpx;
  border-radius: 999px;
  background: rgba(96, 165, 250, 0.14);
  color: #93c5fd;
  font-size: 20rpx;
  font-weight: 900;
}

.layout-body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
  padding: 28rpx;
}

.stat-item {
  min-height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--panel-2);
  color: var(--text);
  font-size: 24rpx;
  font-weight: 800;
  text-align: center;
}
</style>
