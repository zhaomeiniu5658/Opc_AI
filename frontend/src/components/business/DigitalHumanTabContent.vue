<template>
  <view class="digital-page">
    <scroll-view class="digital-scroll" scroll-y :show-scrollbar="false">
      <view class="digital-header">
        <view>
          <view class="digital-title-row">
            <text class="digital-title">小澜</text>
            <view class="digital-online">
              <view class="digital-online-dot"></view>
              <text>在线</text>
            </view>
          </view>
          <text class="digital-subtitle">你的专属求职顾问</text>
        </view>
        <view class="digital-call-trigger" hover-class="digital-call-trigger-hover" @tap="startCall">
          <view class="digital-call-icon">
            <view class="digital-call-receiver"></view>
          </view>
        </view>
      </view>

      <view class="digital-hero">
        <view class="digital-hero-copy">
          <text class="digital-hero-label">随时陪你准备下一次机会</text>
          <text class="digital-hero-title">从简历到面试，和我聊聊</text>
          <view class="digital-tags">
            <text>简历优化</text>
            <text>面试练习</text>
            <text>岗位分析</text>
          </view>
        </view>
        <view class="digital-avatar-stage">
          <DigitalHumanAvatar />
        </view>
      </view>

      <view class="conversation-head">
        <text>对话记录</text>
        <text>本次会话</text>
      </view>

      <view class="conversation-list">
        <view
          v-for="message in messages"
          :key="message.id"
          class="conversation-message"
          :class="{ 'conversation-message-user': message.role === 'user' }"
        >
          <view class="conversation-bubble" :class="{ 'conversation-bubble-voice': message.type === 'voice' }">
            <text v-if="message.type === 'voice'">语音消息 - {{ message.duration }} 秒</text>
            <text v-else>{{ message.content }}</text>
          </view>
        </view>
      </view>

      <view class="conversation-composer">
        <view v-if="inputMode === 'text'" class="composer-row">
          <view class="composer-mode" @tap="toggleInputMode">
            <view class="composer-mic-icon">
              <view class="composer-mic-stand"></view>
            </view>
          </view>
          <input
            v-model="draft"
            class="composer-input"
            maxlength="300"
            confirm-type="send"
            placeholder="和小澜说点什么..."
            @confirm="sendMessage"
          />
          <view class="composer-send" :class="{ 'composer-send-ready': canSend }" @tap="sendMessage">
            <view class="composer-send-icon"></view>
          </view>
        </view>
        <view v-else class="composer-row">
          <view class="composer-mode" @tap="toggleInputMode">
            <text>键盘</text>
          </view>
          <view
            class="hold-to-talk"
            :class="{ 'hold-to-talk-recording': isRecording }"
            @touchstart="startVoice"
            @touchend="stopVoice"
            @touchcancel="stopVoice"
          >
            <text>{{ isRecording ? '正在录音，松开发送' : '按住说话' }}</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <view v-if="callActive" class="call-overlay">
      <view class="call-close" @tap="endCall">
        <text>结束通话</text>
      </view>
      <view class="call-content">
        <view class="call-avatar-stage">
          <DigitalHumanAvatar />
        </view>
        <text class="call-name">小澜</text>
        <text class="call-status">正在与数字人通话</text>
      </view>
      <view class="call-hangup" @tap="endCall">
        <text>挂断</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'

import DigitalHumanAvatar from '@/components/digital-human/DigitalHumanAvatar.vue'

const messages = ref([
  {
    id: 'welcome',
    role: 'assistant',
    type: 'text',
    content: '你好，我是小澜。今天想先优化简历，准备面试，还是看看岗位机会？',
  },
  {
    id: 'goal',
    role: 'user',
    type: 'text',
    content: '我想准备产品经理岗位的面试。',
  },
  {
    id: 'reply',
    role: 'assistant',
    type: 'text',
    content: '好的，我们可以从自我介绍和一个代表项目开始，我会逐步给你反馈。',
  },
])
const draft = ref('')
const inputMode = ref('text')
const isRecording = ref(false)
const callActive = ref(false)

let recorderManager = null
let recordingStartedAt = 0

const canSend = computed(() => draft.value.trim().length > 0)

function appendMessage(message) {
  messages.value.push({
    id: `message-${Date.now()}-${messages.value.length}`,
    ...message,
  })
}

function createReply(content) {
  if (/简历|经历|项目/.test(content)) {
    return '把目标岗位和一个最有代表性的项目告诉我，我会帮你整理出更有说服力的表达。'
  }
  if (/面试|自我介绍/.test(content)) {
    return '我们先练一段一分钟自我介绍。你说完后，我会从结构、重点和表达三个方面给你建议。'
  }

  return '收到。我会结合你的求职目标继续帮你梳理，先告诉我最想优先解决的问题。'
}

function queueReply(content) {
  globalThis.setTimeout(() => {
    appendMessage({ role: 'assistant', type: 'text', content: createReply(content) })
  }, 450)
}

function sendMessage() {
  const content = draft.value.trim()
  if (!content) return

  appendMessage({ role: 'user', type: 'text', content })
  draft.value = ''
  queueReply(content)
}

function toggleInputMode() {
  if (isRecording.value) return
  inputMode.value = inputMode.value === 'text' ? 'voice' : 'text'
}

function getRecorder() {
  if (recorderManager) return recorderManager
  if (typeof uni === 'undefined' || typeof uni.getRecorderManager !== 'function') return null

  recorderManager = uni.getRecorderManager()
  recorderManager.onStop((result) => {
    const duration = Math.max(
      1,
      Math.round((result?.duration || Date.now() - recordingStartedAt) / 1000)
    )
    recordingStartedAt = 0
    isRecording.value = false
    appendMessage({ role: 'user', type: 'voice', duration })
    queueReply('语音消息')
  })
  recorderManager.onError(() => {
    recordingStartedAt = 0
    isRecording.value = false
    showToast('语音录制未完成，请重试')
  })

  return recorderManager
}

function startVoice() {
  const recorder = getRecorder()
  if (!recorder) {
    showToast('当前环境暂不支持语音输入')
    return
  }
  if (isRecording.value) return

  recordingStartedAt = Date.now()
  isRecording.value = true
  recorder.start({
    duration: 60000,
    format: 'mp3',
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 96000,
  })
}

function stopVoice() {
  if (isRecording.value && recorderManager) {
    recorderManager.stop()
  }
}

function startCall() {
  callActive.value = true
}

function endCall() {
  callActive.value = false
}

function showToast(title) {
  if (typeof uni !== 'undefined' && typeof uni.showToast === 'function') {
    uni.showToast({ title, icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
.digital-page {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: calc(117rpx + var(--status-bar-height, 0px)) 24rpx 0;
  background:
    linear-gradient(130deg, rgba(117, 92, 255, 0.12) 0%, rgba(4, 10, 24, 0) 32%),
    linear-gradient(180deg, #020816 0%, #06152a 48%, #020817 100%);
}

.digital-scroll {
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding-bottom: calc(196rpx + env(safe-area-inset-bottom));
}

.digital-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
}

.digital-subtitle,
.digital-hero-label,
.digital-hero-title,
.call-status {
  display: block;
}

.digital-title-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
  margin-top: 4rpx;
}

.digital-title {
  color: #f8fbff;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1.2;
}

.digital-online {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  padding: 6rpx 12rpx;
  border: 1px solid rgba(94, 231, 168, 0.3);
  border-radius: 999px;
  background: rgba(27, 98, 76, 0.24);
  color: #d7fbe8;
  font-size: 20rpx;
}

.digital-online-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #5ee7a8;
  box-shadow: 0 0 16rpx rgba(94, 231, 168, 0.72);
}

.digital-subtitle {
  margin-top: 8rpx;
  color: #a7b8cf;
  font-size: 22rpx;
}

.digital-call-trigger {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 58rpx;
  height: 58rpx;
  margin-top: 18rpx;
  border: 1px solid rgba(169, 156, 255, 0.38);
  border-radius: 50%;
  background: rgba(20, 30, 58, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  color: #eef2ff;
}

.digital-call-trigger-hover {
  opacity: 0.78;
}

.digital-call-icon {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  color: currentColor;
  transform: rotate(-42deg);
}

.digital-call-receiver {
  position: absolute;
  top: 6rpx;
  left: 10rpx;
  width: 12rpx;
  height: 20rpx;
  border-right: 5rpx solid currentColor;
  border-left: 5rpx solid currentColor;
  border-radius: 10rpx;
}

.digital-call-receiver::before,
.digital-call-receiver::after {
  position: absolute;
  width: 15rpx;
  height: 8rpx;
  border-radius: 4rpx;
  background: currentColor;
  content: '';
}

.digital-call-receiver::before {
  top: -5rpx;
  left: -7rpx;
}

.digital-call-receiver::after {
  right: -7rpx;
  bottom: -5rpx;
}

.digital-hero {
  position: relative;
  min-height: 410rpx;
  margin-top: 30rpx;
  overflow: hidden;
  padding: 30rpx 0 0 30rpx;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18rpx;
  background:
    linear-gradient(112deg, rgba(91, 46, 255, 0.24) 0%, rgba(18, 30, 60, 0.9) 54%, rgba(8, 15, 31, 0.96) 100%),
    rgba(8, 15, 31, 0.88);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

.digital-hero-copy {
  position: relative;
  z-index: 2;
  width: 54%;
}

.digital-hero-label {
  color: #d5ceff;
  font-size: 21rpx;
  font-weight: 800;
}

.digital-hero-title {
  margin-top: 12rpx;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: 900;
  line-height: 1.35;
}

.digital-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 20rpx;
}

.digital-tags text {
  padding: 7rpx 10rpx;
  border: 1px solid rgba(169, 156, 255, 0.24);
  border-radius: 999px;
  background: rgba(12, 22, 43, 0.74);
  color: #ddd8ff;
  font-size: 18rpx;
}

.digital-avatar-stage {
  position: absolute;
  right: -8rpx;
  bottom: -84rpx;
  width: 350rpx;
  height: 520rpx;
}

.conversation-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  color: #f8fafc;
  font-size: 30rpx;
  font-weight: 900;
}

.conversation-head text:last-child {
  color: #aeb8d0;
  font-size: 21rpx;
  font-weight: 500;
}

.conversation-list {
  padding: 12rpx 0;
}

.conversation-message {
  display: flex;
  margin-top: 14rpx;
}

.conversation-message-user {
  justify-content: flex-end;
}

.conversation-bubble {
  max-width: 520rpx;
  padding: 17rpx 20rpx;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14rpx;
  background: rgba(18, 30, 60, 0.78);
  color: #eaf2ff;
  font-size: 25rpx;
  line-height: 1.58;
}

.conversation-message-user .conversation-bubble {
  border-color: rgba(169, 156, 255, 0.44);
  background: linear-gradient(135deg, #7c5cff, #5b2eff);
  color: #ffffff;
}

.conversation-bubble-voice {
  min-width: 200rpx;
}

.conversation-composer {
  margin-top: 12rpx;
  padding: 10rpx;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18rpx;
  background: rgba(8, 15, 31, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.composer-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  min-height: 64rpx;
}

.composer-mode,
.composer-send {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64rpx;
  border-radius: 9rpx;
  font-size: 21rpx;
  font-weight: 800;
}

.composer-mode {
  width: 72rpx;
  background: rgba(91, 46, 255, 0.22);
  color: #d9d3ff;
}

.composer-mic-icon {
  position: relative;
  width: 30rpx;
  height: 34rpx;
}

.composer-mic-icon::before {
  position: absolute;
  top: 1rpx;
  left: 8rpx;
  width: 10rpx;
  height: 18rpx;
  border: 3rpx solid currentColor;
  border-radius: 10rpx;
  content: '';
}

.composer-mic-icon::after {
  position: absolute;
  top: 10rpx;
  left: 4rpx;
  width: 18rpx;
  height: 12rpx;
  border: 3rpx solid currentColor;
  border-top: 0;
  border-radius: 0 0 12rpx 12rpx;
  content: '';
}

.composer-mic-stand {
  position: absolute;
  bottom: 1rpx;
  left: 14rpx;
  width: 3rpx;
  height: 8rpx;
  border-radius: 999px;
  background: currentColor;
}

.composer-mic-stand::after {
  position: absolute;
  bottom: 0;
  left: -5rpx;
  width: 13rpx;
  height: 3rpx;
  border-radius: 999px;
  background: currentColor;
  content: '';
}

.composer-input {
  flex: 1;
  min-width: 0;
  height: 64rpx;
  color: #eff7ff;
  font-size: 25rpx;
}

.composer-send {
  min-width: 82rpx;
  padding: 0 14rpx;
  background: rgba(65, 82, 116, 0.74);
  color: #9fb1c8;
}

.composer-send-icon {
  width: 0;
  height: 0;
  border-top: 13rpx solid transparent;
  border-bottom: 13rpx solid transparent;
  border-left: 28rpx solid currentColor;
  transform: rotate(-34deg);
}

.composer-send-ready {
  background: #6d4ce6;
  color: #ffffff;
}

.hold-to-talk {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64rpx;
  border-radius: 9rpx;
  background: rgba(30, 39, 73, 0.9);
  color: #ece9ff;
  font-size: 24rpx;
  font-weight: 800;
}

.hold-to-talk-recording {
  background: rgba(15, 118, 110, 0.56);
  color: #e4fff8;
}

.call-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: calc(32rpx + var(--status-bar-height, 0px)) 34rpx calc(46rpx + env(safe-area-inset-bottom));
  background:
    linear-gradient(160deg, rgba(91, 46, 255, 0.42) 0%, rgba(5, 12, 28, 0) 46%),
    #020817;
}

.call-close {
  position: absolute;
  top: calc(28rpx + var(--status-bar-height, 0px));
  right: 34rpx;
  color: #c7d8ee;
  font-size: 24rpx;
}

.call-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.call-avatar-stage {
  position: relative;
  width: 300rpx;
  height: 300rpx;
  overflow: hidden;
  border: 3rpx solid rgba(167, 139, 250, 0.58);
  border-radius: 50%;
  background: #0b1e38;
  box-shadow: 0 0 0 18rpx rgba(109, 76, 230, 0.12);
}

.call-name {
  margin-top: 38rpx;
  color: #ffffff;
  font-size: 42rpx;
  font-weight: 900;
}

.call-status {
  margin-top: 12rpx;
  color: #c6d5ed;
  font-size: 25rpx;
}

.call-hangup {
  margin-top: 110rpx;
  padding: 22rpx 58rpx;
  border-radius: 12rpx;
  background: #d8394b;
  color: #ffffff;
  font-size: 25rpx;
  font-weight: 900;
}
</style>
