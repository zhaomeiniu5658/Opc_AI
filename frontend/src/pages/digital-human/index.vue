<template>
  <default-layout shell>
    <view class="digital-page">
      <scroll-view class="digital-scroll" scroll-y :show-scrollbar="false">
        <view class="digital-header">
          <view>
            <text class="digital-eyebrow">求职数字人</text>
            <view class="digital-title-row">
              <text class="digital-title">小澜</text>
              <view class="digital-online">
                <view class="digital-online-dot"></view>
                <text>在线</text>
              </view>
            </view>
            <text class="digital-subtitle">你的专属求职顾问</text>
          </view>
          <view class="digital-call-trigger" @tap="startCall">
            <view class="digital-call-icon"></view>
            <text>拨打电话</text>
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
              <text>语音</text>
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
              <text>发送</text>
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
          <text class="composer-hint">
            {{ inputMode === 'text' ? '支持文字输入和语音输入' : '松开后将语音消息发送给小澜' }}
          </text>
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
  </default-layout>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref } from 'vue'

import DigitalHumanAvatar from '@/components/digital-human/DigitalHumanAvatar.vue'
import { useAppStore } from '@/store/app.js'

const appStore = useAppStore()
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

onLoad(() => {
  appStore.setActiveTab('advisor')
})

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
  padding: calc(24rpx + var(--status-bar-height, 0px)) 24rpx 0;
  background:
    linear-gradient(145deg, rgba(45, 212, 191, 0.1) 0%, rgba(6, 17, 31, 0) 35%),
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

.digital-eyebrow,
.digital-subtitle,
.digital-hero-label,
.digital-hero-title,
.composer-hint,
.call-status {
  display: block;
}

.digital-eyebrow {
  color: #7dd3fc;
  font-size: 22rpx;
  font-weight: 800;
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
  border: 1px solid rgba(94, 234, 212, 0.32);
  border-radius: 999px;
  background: rgba(15, 118, 110, 0.18);
  color: #b8f3e5;
  font-size: 20rpx;
}

.digital-online-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
  background: #5eead4;
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
  gap: 8rpx;
  min-height: 58rpx;
  margin-top: 18rpx;
  padding: 0 16rpx;
  border: 1px solid rgba(125, 211, 252, 0.38);
  border-radius: 12rpx;
  background: rgba(9, 38, 61, 0.76);
  color: #dff5ff;
  font-size: 21rpx;
  font-weight: 800;
}

.digital-call-icon {
  width: 18rpx;
  height: 28rpx;
  border: 4rpx solid currentColor;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 9rpx;
  transform: rotate(-42deg);
}

.digital-hero {
  position: relative;
  min-height: 390rpx;
  margin-top: 30rpx;
  overflow: hidden;
  padding: 28rpx 0 0 28rpx;
  border: 1px solid rgba(125, 211, 252, 0.22);
  border-radius: 12rpx;
  background:
    linear-gradient(112deg, rgba(14, 116, 144, 0.32) 0%, rgba(22, 36, 69, 0.86) 52%, rgba(10, 22, 42, 0.96) 100%),
    #0a1830;
}

.digital-hero-copy {
  position: relative;
  z-index: 2;
  width: 56%;
}

.digital-hero-label {
  color: #b8e8ff;
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
  border: 1px solid rgba(191, 219, 254, 0.2);
  border-radius: 999px;
  background: rgba(7, 17, 31, 0.34);
  color: #d8ecff;
  font-size: 18rpx;
}

.digital-avatar-stage {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 390rpx;
  height: 400rpx;
}

.conversation-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  color: #eef6ff;
  font-size: 30rpx;
  font-weight: 900;
}

.conversation-head text:last-child {
  color: #8296b4;
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
  border-radius: 10rpx;
  background: rgba(19, 35, 59, 0.9);
  color: #eaf2ff;
  font-size: 25rpx;
  line-height: 1.58;
}

.conversation-message-user .conversation-bubble {
  border-color: rgba(103, 232, 249, 0.22);
  background: linear-gradient(135deg, #155e75, #2850a6);
  color: #ffffff;
}

.conversation-bubble-voice {
  min-width: 200rpx;
}

.conversation-composer {
  margin-top: 12rpx;
  padding: 10rpx;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 12rpx;
  background: rgba(10, 21, 39, 0.96);
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
  background: rgba(30, 50, 78, 0.88);
  color: #9ddfff;
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

.composer-send-ready {
  background: #0e7490;
  color: #ffffff;
}

.hold-to-talk {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64rpx;
  border-radius: 9rpx;
  background: rgba(19, 40, 67, 0.82);
  color: #d9efff;
  font-size: 24rpx;
  font-weight: 800;
}

.hold-to-talk-recording {
  background: rgba(15, 118, 110, 0.56);
  color: #e4fff8;
}

.composer-hint {
  margin-top: 10rpx;
  padding-left: 8rpx;
  color: #8ca2be;
  font-size: 19rpx;
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
    linear-gradient(160deg, rgba(88, 67, 192, 0.38) 0%, rgba(5, 12, 28, 0) 46%),
    #061120;
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
