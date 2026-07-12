<template>
  <view class="app-root"></view>
</template>

<script>
import { useAppStore } from './store/app.js'

export default {
  onLaunch() {
    const appStore = useAppStore()
    appStore.fetchRemoteConfig()
  },
}
</script>

<style lang="scss">
@import 'uview-plus/index.scss';
@import './styles/reset.scss';
@import './styles/animation.scss';
@import './styles/transition.scss';

.app-root {
  min-height: 100vh;
  background: #07111f;
}
</style>
