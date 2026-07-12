<template>
  <view class="app-page home-page">
    <scroll-view class="home-scroll" scroll-y :show-scrollbar="false">
      <view class="phone-status">
        <text class="status-time">9:41</text>
        <view class="status-icons">
          <view class="signal-bars">
            <view class="signal-bar short"></view>
            <view class="signal-bar mid"></view>
            <view class="signal-bar tall"></view>
          </view>
          <view class="wifi-mark">
            <view class="wifi-arc arc-one"></view>
            <view class="wifi-arc arc-two"></view>
            <view class="wifi-dot"></view>
          </view>
          <view class="battery">
            <view class="battery-level"></view>
          </view>
        </view>
      </view>

      <view class="top-bar">
        <view class="brand">
          <view class="cube-logo">
            <view class="cube-face top"></view>
            <view class="cube-face left"></view>
            <view class="cube-face right"></view>
          </view>
          <text class="brand-name">AI数字人求职助手</text>
        </view>
        <view class="resume-button" @tap="go('/pages/resume/upload')">
          <view class="resume-button-icon">
            <view class="icon-doc-line long"></view>
            <view class="icon-doc-line"></view>
            <view class="icon-user-dot"></view>
          </view>
          <text>我的简历</text>
        </view>
      </view>

      <view class="ai-hero">
        <view class="hero-copy">
          <text class="hero-greeting">您好，我是您的</text>
          <view class="hero-title-row">
            <text class="hero-title">AI求职助手</text>
            <text class="hero-spark">✨</text>
          </view>
          <text class="hero-subtitle">我可以帮您优化简历，提升求职竞争力。</text>
          <view class="online-pill">
            <view class="online-dot"></view>
            <text>在线</text>
          </view>
        </view>

        <view class="home-avatar-stage">
          <DigitalHumanAvatar width="392rpx" height="572rpx" />
        </view>
      </view>

      <view class="assistant-message">
        <view class="message-avatar">
          <view class="mini-cube">
            <view class="mini-cube-face top"></view>
            <view class="mini-cube-face left"></view>
            <view class="mini-cube-face right"></view>
          </view>
        </view>
        <view class="message-bubble glass-panel">
          <text>您好！我可以帮您优化简历，请上传或直接在右侧编辑区修改。</text>
        </view>
      </view>

      <view class="assistant-tools glass-panel">
        <view
          v-for="item in quickActions"
          :key="item.title"
          class="tool-item"
          @tap="go(item.path)"
        >
          <view :class="['tool-icon', item.iconClass]">
            <view class="tool-glyph"></view>
          </view>
          <text class="tool-title">{{ item.title }}</text>
          <text class="tool-desc">{{ item.desc }}</text>
        </view>
      </view>

      <view class="resume-preview-card glass-panel">
        <view class="section-header">
          <text class="section-title">简历预览</text>
          <text class="section-link" @tap="go('/pages/resume/detail')">查看完整简历 →</text>
        </view>
        <view class="resume-preview-body">
          <view class="resume-paper">
            <view class="paper-header">
              <view>
                <view class="paper-name"></view>
                <view class="paper-subtitle"></view>
              </view>
              <view class="paper-avatar"></view>
            </view>
            <view class="paper-section-title"></view>
            <view v-for="line in 5" :key="'a' + line" class="paper-row"></view>
            <view class="paper-section-title second"></view>
            <view v-for="line in 4" :key="'b' + line" class="paper-row short"></view>
          </view>
          <view class="resume-info">
            <view class="resume-title-row">
              <text class="resume-name">{{ resumePreview.name }}</text>
              <text class="resume-role">{{ resumePreview.role }}</text>
            </view>
            <view class="contact-grid">
              <text class="resume-contact">☎ {{ resumePreview.phone }}</text>
              <text class="resume-contact">✉ {{ resumePreview.email }}</text>
            </view>
            <text class="resume-location">📍 {{ resumePreview.location }}</text>
            <text class="resume-summary">{{ resumePreview.summary }}</text>
            <view class="skill-tags">
              <text v-for="skill in resumePreview.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="optimization-card" @tap="go('/pages/resume/optimize')">
        <view class="magic-icon">
          <view class="magic-stick"></view>
          <view class="magic-star one"></view>
          <view class="magic-star two"></view>
          <view class="magic-star three"></view>
        </view>
        <view class="optimization-copy">
          <text class="optimization-title">智能优化简历</text>
          <text class="optimization-desc">AI深度分析，提供个性化优化建议</text>
        </view>
        <view class="optimization-button">
          <text>开始优化</text>
          <text class="button-arrow">→</text>
        </view>
      </view>

      <view class="recent-card glass-panel">
        <view class="section-header">
          <text class="section-title">最近优化记录</text>
          <text class="section-link" @tap="go('/pages/resume/history')">全部记录 →</text>
        </view>
        <view class="recent-item">
          <view class="doc-icon">
            <view class="doc-fold"></view>
            <text>W</text>
          </view>
          <view class="recent-copy">
            <text class="recent-title">产品经理_张小雅_优化版.docx</text>
            <text class="recent-meta">2024-05-20 14:30 · 优化得分 92分</text>
          </view>
          <view class="recent-score-wrap">
            <text class="recent-score">92分</text>
            <text class="recent-arrow">→</text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { onMounted } from 'vue'

import DigitalHumanAvatar from '@/components/digital-human/DigitalHumanAvatar.vue'
import { useJob } from '@/composables/useJob.js'
import { useAppStore } from '@/store/app.js'
import { navigateTo } from '@/utils/navigation.js'

const quickActions = [
  {
    title: '优化建议',
    desc: '提升简历质量',
    iconClass: 'icon-note',
    path: '/pages/resume/analysis',
  },
  {
    title: '岗位匹配',
    desc: '精准匹配岗位',
    iconClass: 'icon-target',
    path: '/pages/recommendation/index',
  },
  {
    title: '面试辅导',
    desc: '提升面试表现',
    iconClass: 'icon-chart',
    path: '/pages/interview/mock',
  },
  {
    title: '求职攻略',
    desc: '获取求职技巧',
    iconClass: 'icon-shield',
    path: '/pages/career/roadmap',
  },
]

const resumePreview = {
  name: '张小明',
  role: '产品经理',
  phone: '138-8888-8888',
  email: 'xiaoya.zhang@email.com',
  location: '上海市浦东新区',
  summary:
    '5年互联网产品经验，擅长用户研究、需求分析和产品设计，主导多个百万级产品项目，具备良好的数据分析能力和跨团队协作经验。',
  skills: ['产品设计', '用户研究', '数据分析', '项目管理', 'Axure', '需求分析'],
}

const appStore = useAppStore()
const { loadRecommendedJobs } = useJob()

function go(path) {
  navigateTo(path)
}

onMounted(() => {
  appStore.fetchRemoteConfig()
  loadRecommendedJobs({ userId: 'u-1001' })
})
</script>
<style lang="scss" scoped>
.home-page {
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

.home-scroll {
  flex: 1;
  min-height: 0;
  padding-bottom: calc(188rpx + env(safe-area-inset-bottom));
  box-sizing: border-box;
}

.home-page::before {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: '';
  pointer-events: none;
  background-image:
    linear-gradient(rgba(124, 92, 255, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 92, 255, 0.05) 1px, transparent 1px);
  background-size: 96rpx 96rpx;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0));
}

.phone-status,
.top-bar,
.ai-hero,
.assistant-message,
.assistant-tools,
.resume-preview-card,
.optimization-card,
.recent-card {
  position: relative;
  z-index: 1;
}

.phone-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56rpx;
  padding: 0 18rpx;
  color: #ffffff;
}

.status-time {
  font-size: 30rpx;
  font-weight: 800;
}

.status-icons {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.signal-bars {
  display: flex;
  align-items: flex-end;
  gap: 5rpx;
  height: 24rpx;
}

.signal-bar {
  width: 7rpx;
  border-radius: 999px;
  background: #ffffff;
}

.signal-bar.short {
  height: 10rpx;
}

.signal-bar.mid {
  height: 16rpx;
}

.signal-bar.tall {
  height: 22rpx;
}

.wifi-mark {
  position: relative;
  width: 34rpx;
  height: 24rpx;
}

.wifi-arc {
  position: absolute;
  left: 50%;
  border: 5rpx solid #ffffff;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-radius: 50%;
  transform: translateX(-50%);
}

.wifi-arc.arc-one {
  top: 0;
  width: 34rpx;
  height: 26rpx;
}

.wifi-arc.arc-two {
  top: 8rpx;
  width: 22rpx;
  height: 16rpx;
}

.wifi-dot {
  position: absolute;
  bottom: 1rpx;
  left: 50%;
  width: 7rpx;
  height: 7rpx;
  border-radius: 50%;
  background: #ffffff;
  transform: translateX(-50%);
}

.battery {
  position: relative;
  width: 42rpx;
  height: 22rpx;
  padding: 3rpx;
  border: 3rpx solid rgba(255, 255, 255, 0.88);
  border-radius: 6rpx;
}

.battery::after {
  position: absolute;
  top: 5rpx;
  right: -7rpx;
  width: 4rpx;
  height: 10rpx;
  border-radius: 0 4rpx 4rpx 0;
  background: rgba(255, 255, 255, 0.88);
  content: '';
}

.battery-level {
  width: 100%;
  height: 100%;
  border-radius: 3rpx;
  background: #ffffff;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 32rpx;
}

.brand {
  flex: 1;
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 18rpx;
}

.cube-logo,
.message-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #7d61ff 0%, #4d2bdf 100%);
  box-shadow: 0 16rpx 32rpx rgba(91, 46, 255, 0.34);
}

.cube-logo {
  position: relative;
  flex: 0 0 54rpx;
  width: 54rpx;
  height: 54rpx;
  border-radius: 12rpx;
  transform: rotate(30deg);
}

.cube-face {
  position: absolute;
  width: 23rpx;
  height: 23rpx;
  background: #b8abff;
}

.cube-face.top {
  top: 7rpx;
  left: 16rpx;
  transform: skewX(-28deg);
}

.cube-face.left {
  bottom: 10rpx;
  left: 8rpx;
  background: #4b2bdf;
  transform: skewY(28deg);
}

.cube-face.right {
  right: 8rpx;
  bottom: 10rpx;
  background: #8f7cff;
  transform: skewY(-28deg);
}

.brand-name {
  min-width: 0;
  overflow: hidden;
  color: #ffffff;
  font-size: 30rpx;
  font-weight: 900;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-button {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  min-height: 58rpx;
  padding: 0 18rpx;
  border: 1px solid rgba(148, 163, 255, 0.34);
  border-radius: 18rpx;
  background: rgba(20, 30, 58, 0.78);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #eef2ff;
  font-size: 22rpx;
  font-weight: 800;
}

.resume-button-icon {
  position: relative;
  width: 26rpx;
  height: 28rpx;
  border: 3rpx solid #a99cff;
  border-radius: 5rpx;
}

.icon-doc-line {
  position: absolute;
  left: 5rpx;
  width: 12rpx;
  height: 3rpx;
  border-radius: 999px;
  background: #a99cff;
}

.icon-doc-line.long {
  top: 6rpx;
  width: 14rpx;
}

.icon-doc-line:not(.long) {
  top: 14rpx;
}

.icon-user-dot {
  position: absolute;
  right: -9rpx;
  bottom: -6rpx;
  width: 12rpx;
  height: 12rpx;
  border: 3rpx solid #a99cff;
  border-radius: 50%;
  background: #172344;
}

.ai-hero {
  min-height: 482rpx;
  margin-top: 58rpx;
}

.hero-copy {
  position: relative;
  z-index: 2;
  width: 57%;
}

.hero-greeting,
.hero-title,
.hero-subtitle {
  display: block;
}

.hero-greeting {
  color: #ffffff;
  font-size: 36rpx;
  font-weight: 900;
  line-height: 1.28;
}

.hero-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 20rpx;
}

.hero-title {
  color: #8f7cff;
  font-size: 52rpx;
  font-weight: 900;
  line-height: 1.1;
  text-shadow: 0 0 34rpx rgba(124, 92, 255, 0.66);
}

.hero-spark {
  color: #8f7cff;
  font-size: 28rpx;
  text-shadow: 0 0 22rpx rgba(143, 124, 255, 0.72);
}

.hero-subtitle {
  margin-top: 24rpx;
  color: #c8d2ef;
  font-size: 24rpx;
  line-height: 1.55;
}

.online-pill {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  margin-top: 28rpx;
  padding: 12rpx 18rpx;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14rpx;
  background: rgba(12, 22, 43, 0.84);
  color: #d7fbe8;
  font-size: 24rpx;
}

.online-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 50%;
  background: #5ee7a8;
  box-shadow: 0 0 20rpx rgba(94, 231, 168, 0.82);
}

.home-avatar-stage {
  position: absolute;
  right: -28rpx;
  bottom: -10rpx;
  width: 392rpx;
  height: 572rpx;
}

.assistant-message {
  display: flex;
  align-items: flex-start;
  gap: 14rpx;
  margin-top: -18rpx;
}

.message-avatar {
  flex: 0 0 58rpx;
  width: 58rpx;
  height: 58rpx;
  border-radius: 14rpx;
}

.mini-cube {
  position: relative;
  width: 30rpx;
  height: 30rpx;
  transform: rotate(30deg);
}

.mini-cube-face {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  background: #ffffff;
}

.mini-cube-face.top {
  top: 2rpx;
  left: 8rpx;
  transform: skewX(-28deg);
}

.mini-cube-face.left {
  bottom: 4rpx;
  left: 2rpx;
  background: #dcd7ff;
  transform: skewY(28deg);
}

.mini-cube-face.right {
  right: 2rpx;
  bottom: 4rpx;
  background: #b9adff;
  transform: skewY(-28deg);
}

.message-bubble {
  max-width: 520rpx;
  padding: 22rpx 26rpx;
  color: #f8fafc;
  font-size: 28rpx;
  line-height: 1.65;
}

.assistant-tools {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-top: 30rpx;
  padding: 30rpx 10rpx;
  overflow: hidden;
}

.tool-item {
  min-width: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 8rpx 4rpx;
  border-right: 1px solid rgba(148, 163, 184, 0.14);
}

.tool-item:last-child {
  border-right: 0;
}

.tool-icon {
  position: relative;
  width: 66rpx;
  height: 66rpx;
  border-radius: 12rpx;
  background: linear-gradient(145deg, #7e64ff 0%, #5830f1 100%);
  box-shadow: 0 16rpx 30rpx rgba(91, 46, 255, 0.34);
}

.tool-glyph {
  position: absolute;
  inset: 14rpx;
}

.icon-note .tool-glyph {
  border-top: 7rpx solid #ffffff;
  border-bottom: 7rpx solid #ffffff;
}

.icon-note .tool-glyph::after {
  position: absolute;
  top: 13rpx;
  left: 0;
  width: 100%;
  height: 7rpx;
  border-radius: 999px;
  background: #ffffff;
  content: '';
}

.icon-note::after {
  position: absolute;
  right: -5rpx;
  bottom: -5rpx;
  width: 18rpx;
  height: 18rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.32);
  border-radius: 50%;
  background: #5ee7a8;
  content: '';
}

.icon-target {
  border-radius: 50%;
}

.icon-target .tool-glyph {
  border: 7rpx solid #ffffff;
  border-radius: 50%;
}

.icon-target .tool-glyph::before {
  position: absolute;
  top: 9rpx;
  left: 9rpx;
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #ffffff;
  content: '';
}

.icon-target .tool-glyph::after {
  position: absolute;
  top: -12rpx;
  right: -12rpx;
  width: 24rpx;
  height: 6rpx;
  border-radius: 999px;
  background: #ffffff;
  transform: rotate(-42deg);
  content: '';
}

.icon-chart .tool-glyph {
  border-left: 6rpx solid #ffffff;
  border-bottom: 6rpx solid #ffffff;
}

.icon-chart .tool-glyph::before {
  position: absolute;
  left: 7rpx;
  bottom: 8rpx;
  width: 28rpx;
  height: 22rpx;
  border-top: 7rpx solid #ffffff;
  border-right: 7rpx solid #ffffff;
  transform: skew(-18deg);
  content: '';
}

.icon-shield {
  border-radius: 14rpx 14rpx 24rpx 24rpx;
}

.icon-shield .tool-glyph {
  border-right: 8rpx solid #ffffff;
  border-bottom: 8rpx solid #ffffff;
  transform: rotate(38deg) scale(0.8);
}

.tool-title,
.tool-desc {
  display: block;
  max-width: 100%;
  text-align: center;
}

.tool-title {
  margin-top: 18rpx;
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 900;
}

.tool-desc {
  margin-top: 7rpx;
  color: #b8c2da;
  font-size: 22rpx;
  line-height: 1.25;
}

.resume-preview-card,
.recent-card {
  margin-top: 26rpx;
  padding: 24rpx;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.section-title {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
}

.section-link {
  flex: 0 0 auto;
  color: #b7a8ff;
  font-size: 24rpx;
}

.resume-preview-body {
  display: grid;
  grid-template-columns: 214rpx minmax(0, 1fr);
  gap: 24rpx;
  margin-top: 26rpx;
}

.resume-paper {
  position: relative;
  min-height: 300rpx;
  padding: 18rpx;
  border-radius: 10rpx;
  background: linear-gradient(180deg, #fbfdff 0%, #eaf2ff 100%);
  box-shadow: 0 20rpx 42rpx rgba(7, 13, 29, 0.36);
}

.paper-header {
  display: flex;
  justify-content: space-between;
  gap: 12rpx;
}

.paper-name,
.paper-subtitle,
.paper-section-title,
.paper-row {
  border-radius: 999px;
}

.paper-name {
  width: 92rpx;
  height: 10rpx;
  background: #8f7cff;
}

.paper-subtitle {
  width: 116rpx;
  height: 7rpx;
  margin-top: 12rpx;
  background: rgba(91, 46, 255, 0.22);
}

.paper-avatar {
  flex: 0 0 42rpx;
  width: 42rpx;
  height: 52rpx;
  border-radius: 8rpx;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0) 58%, #75a7ff 59%),
    linear-gradient(180deg, #1e293b 0%, #4f46e5 100%);
}

.paper-section-title {
  width: 56rpx;
  height: 8rpx;
  margin-top: 18rpx;
  background: rgba(124, 92, 255, 0.34);
}

.paper-section-title.second {
  margin-top: 22rpx;
}

.paper-row {
  width: 100%;
  height: 7rpx;
  margin-top: 12rpx;
  background: rgba(51, 65, 85, 0.16);
}

.paper-row.short:nth-child(odd) {
  width: 78%;
}

.resume-info {
  min-width: 0;
}

.resume-title-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
  flex-wrap: wrap;
}

.resume-name {
  color: #ffffff;
  font-size: 34rpx;
  font-weight: 900;
}

.resume-role {
  padding: 8rpx 18rpx;
  border-radius: 9rpx;
  background: rgba(91, 46, 255, 0.22);
  color: #a78bfa;
  font-size: 22rpx;
  font-weight: 800;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8rpx 18rpx;
  margin-top: 18rpx;
}

.resume-contact,
.resume-location,
.resume-summary {
  display: block;
  color: #cbd5e1;
  font-size: 23rpx;
  line-height: 1.55;
}

.resume-contact {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.resume-location {
  margin-top: 6rpx;
}

.resume-summary {
  margin-top: 14rpx;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 18rpx;
}

.skill-tag {
  padding: 8rpx 18rpx;
  border-radius: 8rpx;
  background: rgba(124, 92, 255, 0.22);
  color: #b5a7ff;
  font-size: 22rpx;
  font-weight: 800;
}

.optimization-card {
  display: grid;
  grid-template-columns: 86rpx minmax(0, 1fr) 180rpx;
  align-items: center;
  gap: 18rpx;
  margin-top: 28rpx;
  padding: 30rpx 24rpx;
  border: 1px solid rgba(124, 92, 255, 0.44);
  border-radius: 18rpx;
  background:
    linear-gradient(
      90deg,
      rgba(105, 77, 255, 0.72) 0%,
      rgba(45, 31, 115, 0.62) 38%,
      rgba(10, 17, 35, 0.94) 100%
    ),
    #111b37;
  box-shadow: 0 24rpx 50rpx rgba(0, 0, 0, 0.32);
}

.magic-icon {
  position: relative;
  width: 74rpx;
  height: 74rpx;
}

.magic-stick {
  position: absolute;
  left: 12rpx;
  bottom: 9rpx;
  width: 58rpx;
  height: 14rpx;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 24rpx rgba(255, 255, 255, 0.36);
  transform: rotate(-45deg);
}

.magic-star {
  position: absolute;
  width: 14rpx;
  height: 14rpx;
  background: #ffffff;
  transform: rotate(45deg);
}

.magic-star.one {
  top: 5rpx;
  left: 4rpx;
}

.magic-star.two {
  top: 3rpx;
  right: 12rpx;
  width: 18rpx;
  height: 18rpx;
}

.magic-star.three {
  left: 32rpx;
  top: 22rpx;
  width: 10rpx;
  height: 10rpx;
}

.optimization-title,
.optimization-desc {
  display: block;
}

.optimization-title {
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
}

.optimization-desc {
  margin-top: 8rpx;
  color: #d8d3ff;
  font-size: 24rpx;
  line-height: 1.35;
}

.optimization-button {
  min-height: 76rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  border-radius: 18rpx;
  background: linear-gradient(135deg, #9b7cff 0%, #5b2eff 100%);
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 900;
  box-shadow: 0 18rpx 34rpx rgba(91, 46, 255, 0.34);
}

.button-arrow {
  font-size: 32rpx;
}

.recent-item {
  display: grid;
  grid-template-columns: 72rpx minmax(0, 1fr) auto;
  align-items: center;
  gap: 18rpx;
  margin-top: 24rpx;
}

.doc-icon {
  position: relative;
  width: 72rpx;
  height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #7fb3ff 0%, #4b70c9 100%);
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
  overflow: hidden;
}

.doc-fold {
  position: absolute;
  top: 0;
  right: 0;
  width: 22rpx;
  height: 22rpx;
  background: rgba(255, 255, 255, 0.45);
  clip-path: polygon(0 0, 100% 100%, 100% 0);
}

.recent-title,
.recent-meta {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.recent-title {
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 900;
}

.recent-meta {
  margin-top: 8rpx;
  color: #aeb8d0;
  font-size: 22rpx;
}

.recent-score-wrap {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.recent-score {
  color: #8f7cff;
  font-size: 34rpx;
  font-weight: 900;
}

.recent-arrow {
  color: #94a3b8;
  font-size: 34rpx;
}

.glass-panel {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18rpx;
  background:
    linear-gradient(180deg, rgba(18, 30, 60, 0.78), rgba(8, 15, 31, 0.88)), rgba(8, 15, 31, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

@media (max-width: 360px) {
  .brand-name {
    font-size: 26rpx;
  }

  .hero-title {
    font-size: 46rpx;
  }

  .resume-preview-body {
    grid-template-columns: 190rpx minmax(0, 1fr);
    gap: 18rpx;
  }

  .optimization-card {
    grid-template-columns: 70rpx minmax(0, 1fr);
  }

  .optimization-button {
    grid-column: 1 / -1;
  }
}
</style>
