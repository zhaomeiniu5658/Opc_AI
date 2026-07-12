## 导航统一修复

- 2026-07-12: Kept the five custom bottom-navigation destinations inside the existing home layout shell, so switching tabs does not recreate a WeChat page. Direct business-page navigation still returns to the shell with `reLaunch`; repeated tab taps are ignored during that return.
- 2026-07-12: Read the current Mini Program route through the native `getCurrentPages()` global, preventing the custom tab bar from treating every business page as the home shell.
- 2026-07-12: Corrected the five custom bottom-navigation labels and aligned the global, app-root, and layout backgrounds to `#07111f`.
- 2026-07-11: Replaced `components/common/ModulePage.vue` with `layouts/DefaultLayout.vue`; registered it through `pages.json` easycom so pages no longer import layout or navigation components directly.
- 2026-07-11: Added the shared `ErrorState.vue` and made `DefaultLayout` the only source reference to `AppTabBar.vue` and `NavBar.vue`.
- 2026-07-11: Restored a minimal App.vue root template so mp-weixin consistently emits App.wxml without reintroducing an AppTabBar mount.
- 2026-07-11: Fixed the mp-weixin App.vue component mount by moving the single AppTabBar mount to the existing ModulePage layout; the home page now uses that layout slot.
- 统一底部导航为 `src/components/common/AppTabBar.vue`，不再保留官方 `tabBar` 配置。
- `src/utils/navigation.js` 仅保留 `navigateTo`、`reLaunch`、`navigateWithPermission`。
- `src/pages/index/index.vue` 与 `src/components/common/ModulePage.vue` 已改为 `scroll-view` 容器，并预留底部安全区，避免内容被导航栏遮挡。
- 修复首页与公共模块页的损坏 `text` 标签，恢复可编译状态。

# 目录精简记录

## 本次校准

- 恢复了统一导出入口 `src/api/index.js` 与 `src/constants/index.js`。
- 保留所有 `*.test.js` 文件，并修正了 `JobService` 单测的 mock 方式。
- 保留 `src/components/business`、`src/components/charts`、`src/components/graph`、`src/components/digital-human`、`src/models` 以及 `src/static/icons`、`src/static/fonts`、`src/static/dh` 的目录骨架，作为后续规划预留能力。
- 保留 `src/components/common/AppTabBar.vue` 作为当前底部导航唯一实现。
- 保留 `src/static/default/empty.png` 与 `src/static/images/ai-assistant-reference.png`，它们仍被页面直接引用。

## 说明

本次仅做精简校准，不再移除测试、预留目录或统一出口。
