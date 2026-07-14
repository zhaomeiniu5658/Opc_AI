<template>
  <view class="tab-summary-root">
    <view v-if="isProfile" class="app-page profile-page">
      <scroll-view class="profile-scroll" scroll-y :show-scrollbar="false">
        <view class="profile-grid"></view>

        <view class="profile-card">
          <view class="profile-card-main">
            <view class="profile-photo">
              <text>张</text>
              <view class="profile-photo-status"></view>
            </view>
            <view class="profile-identity">
              <view class="profile-name-row">
                <text class="profile-name">张小明</text>
                <text class="profile-tier">普通用户</text>
              </view>
              <text class="profile-job">产品经理 · 上海 · 在职</text>
            </view>
          </view>

          <view class="profile-divider"></view>

          <view class="profile-completion">
            <view class="completion-copy">
              <text class="completion-label">画像完善度</text>
              <text class="completion-value">{{ profileCompletion }}%</text>
            </view>
            <view class="completion-track">
              <view class="completion-progress"></view>
            </view>
          </view>

          <view class="profile-privacy">
            <view class="privacy-copy">
              <text class="privacy-title">匿名求职</text>
              <text class="privacy-desc">
                {{ isAnonymous ? '已开启，企业不会看到联系方式' : '已关闭，企业可查看公开资料' }}
              </text>
            </view>
            <switch
              class="privacy-switch"
              :checked="isAnonymous"
              color="#7c5cff"
              @change="updateAnonymous"
            />
          </view>
        </view>

        <view class="membership-panel">
          <view class="section-head">
            <text class="section-title">会员额度</text>
            <text class="membership-status">未开通会员</text>
          </view>
          <view class="membership-body">
            <view class="membership-quota">
              <text class="quota-number">60</text>
              <text class="quota-unit">积点</text>
            </view>
            <view class="membership-copy">
              <text class="membership-title">新用户免费赠送</text>
              <text class="membership-desc">可使用积点免费试用 AI 求职服务</text>
            </view>
            <view class="membership-trial">
              <text>免费试用</text>
            </view>
          </view>
        </view>

        <view class="resume-panel">
          <view class="section-head">
            <text class="section-title">个人简历</text>
            <text class="resume-status">已上传</text>
          </view>
          <view class="resume-body">
            <view class="resume-paper">
              <view class="resume-paper-line strong"></view>
              <view class="resume-paper-line"></view>
              <view class="resume-paper-line"></view>
              <view class="resume-paper-line short"></view>
            </view>
            <view class="resume-copy">
              <text class="resume-name">产品经理_张小明.pdf</text>
              <text class="resume-meta">最近更新 今天 10:24</text>
              <text class="resume-completion">简历完整度 {{ profileCompletion }}%</text>
            </view>
            <view class="resume-arrow">
              <view class="resume-arrow-line"></view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view v-else class="app-page tab-summary-page">
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
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
})

const profileCompletion = 88
const isAnonymous = ref(true)
const isProfile = computed(() => props.meta.kind === 'profile')

function updateAnonymous(event) {
  isAnonymous.value = Boolean(event.detail.value)
}
</script>

<style lang="scss" scoped>
.tab-summary-root {
  width: 100%;
  min-height: 100vh;
}

.profile-page,
.tab-summary-page {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: calc(121rpx + var(--status-bar-height, 0px)) 28rpx 0;
  background:
    linear-gradient(130deg, rgba(117, 92, 255, 0.12) 0%, rgba(4, 10, 24, 0) 32%),
    linear-gradient(180deg, #020816 0%, #06152a 48%, #020817 100%);
}

.profile-scroll,
.tab-summary-scroll {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding-bottom: calc(188rpx + env(safe-area-inset-bottom));
}

.profile-grid,
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

.profile-card,
.membership-panel,
.resume-panel,
.summary-header,
.summary-panel {
  position: relative;
  z-index: 1;
}

.profile-card,
.membership-panel,
.resume-panel,
.summary-panel {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18rpx;
  background:
    linear-gradient(180deg, rgba(18, 30, 60, 0.78), rgba(8, 15, 31, 0.88)), rgba(8, 15, 31, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

.profile-card {
  padding: 30rpx;
}

.profile-card-main,
.profile-name-row,
.profile-privacy,
.completion-copy,
.section-head,
.membership-body,
.resume-body {
  display: flex;
  align-items: center;
}

.profile-card-main {
  gap: 22rpx;
}

.profile-photo {
  position: relative;
  flex: 0 0 116rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 116rpx;
  height: 116rpx;
  overflow: hidden;
  border: 3rpx solid rgba(196, 181, 253, 0.56);
  border-radius: 50%;
  background: linear-gradient(145deg, #9b7cff 0%, #4d2bdf 100%);
  box-shadow: 0 14rpx 32rpx rgba(91, 46, 255, 0.32);
  color: #ffffff;
  font-size: 46rpx;
  font-weight: 900;
}

.profile-photo-status {
  position: absolute;
  right: 3rpx;
  bottom: 5rpx;
  width: 20rpx;
  height: 20rpx;
  border: 4rpx solid #0d1930;
  border-radius: 50%;
  background: #5ee7a8;
}

.profile-identity,
.privacy-copy,
.membership-copy,
.resume-copy {
  min-width: 0;
}

.profile-name-row {
  gap: 14rpx;
}

.profile-name,
.profile-job,
.completion-label,
.completion-value,
.privacy-title,
.privacy-desc,
.section-title,
.quota-number,
.quota-unit,
.membership-title,
.membership-desc,
.resume-name,
.resume-meta,
.resume-completion {
  display: block;
}

.profile-name {
  color: #ffffff;
  font-size: 38rpx;
  font-weight: 900;
  line-height: 1.2;
}

.profile-tier,
.membership-status,
.resume-status {
  flex: 0 0 auto;
  padding: 7rpx 13rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  font-weight: 800;
  line-height: 1.2;
}

.profile-tier {
  border: 1px solid rgba(125, 211, 252, 0.32);
  background: rgba(125, 211, 252, 0.12);
  color: #bae6fd;
}

.profile-job {
  margin-top: 12rpx;
  overflow: hidden;
  color: #c8d2ef;
  font-size: 24rpx;
  font-weight: 700;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.profile-divider {
  height: 1px;
  margin: 26rpx 0;
  background: rgba(148, 163, 184, 0.16);
}

.completion-copy {
  justify-content: space-between;
}

.completion-label,
.privacy-title {
  color: #f8fafc;
  font-size: 25rpx;
  font-weight: 800;
}

.completion-value {
  color: #a99cff;
  font-size: 27rpx;
  font-weight: 900;
}

.completion-track {
  height: 12rpx;
  overflow: hidden;
  margin-top: 16rpx;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.16);
}

.completion-progress {
  width: 88%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #7c5cff 0%, #a99cff 100%);
  box-shadow: 0 0 18rpx rgba(143, 124, 255, 0.72);
}

.profile-privacy {
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 28rpx;
}

.privacy-desc {
  margin-top: 7rpx;
  color: #aeb8d0;
  font-size: 21rpx;
  line-height: 1.45;
}

.privacy-switch {
  flex: 0 0 auto;
  transform: scale(0.82);
  transform-origin: right center;
}

.membership-panel,
.resume-panel,
.summary-panel {
  margin-top: 24rpx;
  padding: 28rpx;
}

.section-head {
  justify-content: space-between;
  gap: 18rpx;
}

.section-title,
.summary-panel-title {
  color: #f8fafc;
  font-size: 30rpx;
  font-weight: 900;
}

.membership-status {
  border: 1px solid rgba(245, 158, 11, 0.34);
  background: rgba(245, 158, 11, 0.12);
  color: #fcd34d;
}

.resume-status {
  border: 1px solid rgba(94, 231, 168, 0.32);
  background: rgba(94, 231, 168, 0.12);
  color: #86efac;
}

.membership-body {
  gap: 18rpx;
  margin-top: 26rpx;
}

.membership-quota {
  flex: 0 0 116rpx;
  min-height: 104rpx;
  padding-top: 10rpx;
  border-right: 1px solid rgba(148, 163, 184, 0.16);
}

.quota-number {
  color: #ffffff;
  font-size: 52rpx;
  font-weight: 900;
  line-height: 0.95;
}

.quota-unit {
  margin-top: 10rpx;
  color: #c7bcff;
  font-size: 22rpx;
  font-weight: 800;
}

.membership-copy {
  flex: 1;
}

.membership-title {
  color: #f8fafc;
  font-size: 25rpx;
  font-weight: 800;
  line-height: 1.35;
}

.membership-desc {
  margin-top: 8rpx;
  color: #aeb8d0;
  font-size: 21rpx;
  line-height: 1.45;
}

.membership-trial {
  flex: 0 0 auto;
  padding: 10rpx 13rpx;
  border: 1px solid rgba(143, 124, 255, 0.42);
  border-radius: 8rpx;
  background: rgba(124, 92, 255, 0.18);
  color: #e7e1ff;
  font-size: 20rpx;
  font-weight: 800;
  line-height: 1.2;
  white-space: nowrap;
}

.resume-body {
  gap: 20rpx;
  margin-top: 26rpx;
}

.resume-paper {
  flex: 0 0 96rpx;
  box-sizing: border-box;
  width: 96rpx;
  height: 122rpx;
  padding: 18rpx 14rpx;
  border-radius: 7rpx;
  background: #f8fafc;
  box-shadow: 0 10rpx 22rpx rgba(0, 0, 0, 0.18);
}

.resume-paper-line {
  height: 6rpx;
  margin-top: 12rpx;
  border-radius: 999px;
  background: #cbd5e1;
}

.resume-paper-line:first-child {
  margin-top: 0;
}

.resume-paper-line.strong {
  background: #8f7cff;
}

.resume-paper-line.short {
  width: 64%;
}

.resume-copy {
  flex: 1;
}

.resume-name {
  overflow: hidden;
  color: #f8fafc;
  font-size: 27rpx;
  font-weight: 900;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-meta,
.resume-completion {
  color: #aeb8d0;
  font-size: 21rpx;
  line-height: 1.45;
}

.resume-meta {
  margin-top: 10rpx;
}

.resume-completion {
  margin-top: 4rpx;
  color: #c7bcff;
  font-weight: 800;
}

.resume-arrow {
  flex: 0 0 22rpx;
  position: relative;
  width: 22rpx;
  height: 22rpx;
}

.resume-arrow-line {
  position: absolute;
  top: 6rpx;
  left: 2rpx;
  width: 12rpx;
  height: 12rpx;
  border-top: 3rpx solid #a99cff;
  border-right: 3rpx solid #a99cff;
  transform: rotate(45deg);
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
