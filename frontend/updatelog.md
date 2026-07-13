## 导航统一修复

- 2026-07-13: Enlarged the digital-human call control's circular background by about 20% while offsetting it upward to preserve its original visual center alignment.
- 2026-07-13: Enlarged the approved local phone icon by about 20% and replaced the CSS triangle send control with a centered local filled-paper-plane asset using the same purple button treatment as the microphone control.
- 2026-07-13: Reworked the digital-human call control as a telephone handset with two outgoing call-wave marks to match the approved call-icon type.
- 2026-07-13: Updated the digital-human voice input icon to use a filled microphone capsule, U-shaped support, and base matching the approved microphone type.
- 2026-07-13: Simplified the digital-human call control to the approved gray linear telephone receiver without call-wave marks.
- 2026-07-13: Replaced the CSS-drawn telephone and microphone with centered local transparent icon assets derived from the approved references, preserving the phone's approved angle.
- 2026-07-13: Increased the local telephone and microphone icon display boxes to keep their visible strokes optically centered at mini-program scale.
- 2026-07-12: Renamed the home brand to 数字人求职顾问 and moved the home digital-human stage upward so its top aligns with the brand text top.
- 2026-07-12: Aligned the first visible control in the digital-human, job, growth, and profile tabs to `calc(121rpx + var(--status-bar-height))` from the page top.
- 2026-07-12: Replaced the digital-human page's call, voice-input, and send labels with static phone, microphone, and send-arrow icons without adding icon-font loading.
- 2026-07-12: Removed the home header's 我的简历 action and aligned the home digital-human stage top with the left-side hero copy without moving the rest of the content.
- 2026-07-12: Replaced the digital-human header's call text with a same-position telephone icon, removed the 求职数字人 eyebrow and composer input hint, and retained all call, text, and voice interactions.
- 2026-07-12: Removed the home page's mock time, signal, Wi-Fi, and battery chrome while retaining its 56rpx layout space so the brand and all lower content keep their original positions.
- 2026-07-12: Replaced the profile tab's generic summary with a user card, 88% profile-completion display, anonymous-job-search switch, new-user 60-point trial quota, and personal-resume summary while preserving the shared navigation shell.
- 2026-07-12: Added a minimal page-level `page` stylesheet to each primary shell entry route so uni-app emits the required `.wxss` files for WeChat DevTools; this fixes the runtime `ENOENT` for `pages/digital-human/index.wxss` without changing the persistent-shell navigation behavior.
- 2026-07-12: Replaced five primary-menu page-stack transitions with one persistent `DefaultLayout` shell. `AppTabBar` now emits only the selected key, while the shell selects one content view through a `v-if` branch; no primary-menu interaction calls `navigateTo`, `navigateBack`, or `reLaunch`.
- 2026-07-12: Moved the existing home, digital-human, and job business content into `components/business/*TabContent.vue`; retained the five direct page entry routes as thin shell wrappers for deep-entry compatibility.
- 2026-07-12: Added `TabSummaryContent.vue` for the existing growth and profile metadata views, removed the obsolete `components/business/.keep` placeholder, and updated README navigation ownership and regression tests.
- 2026-07-12: Replaced custom-tab `reLaunch` navigation with stack-aware `navigateBack` reuse and first-visit `navigateTo`, eliminating full-page teardown during normal menu switching.
- 2026-07-12: Routed `pages/job/list.vue` through `DefaultLayout shell` so it receives the single shared bottom navigation, and aligned its search, cards, filters, and actions with the home page's dark-purple glass visual system.
- 2026-07-12: Added an explicit `#07111f` native background to every registered page so custom-tab `reLaunch` transitions do not initialize on the Mini Program default white background.
- 2026-07-12: Normalized all five custom bottom-navigation items to direct page routes, removed the virtual home-shell tab state, and deleted 21 unreachable placeholder pages plus their route and metadata entries. README now documents the exact navigation and style ownership.
- 2026-07-12: Removed the page-to-layout import of `pages/job/list.vue`, which produced duplicate Mini Program page wrappers and the `require('../list.js')` runtime failure. The custom 岗位 navigation now opens the registered job page directly with `reLaunch`.
- 2026-07-12: Increased the home digital-human presentation height from `520rpx` to `572rpx`, removed its decorative border rings and temporary debug output, and updated the UI specification and regression coverage.
- 2026-07-12: Synced `spec/ui` with the implemented home-page visual system, including the dark gradient canvas, glass panels, spacing, typography, content order, shared digital-human presentation, and fixed five-item custom navigation.
- 2026-07-12: Extracted the shared visual-only `DigitalHumanAvatar.vue`. The existing home page and the existing `pages/digital-human/index.vue` page each render their own content while reusing this one avatar component.
- 2026-07-12: Kept the existing bottom-navigation structure. 首页 and 数字人 have independent page content; 数字人 uses its existing dedicated route, while 岗位、成长、我的 retain the existing home-shell switching behavior.
- 2026-07-12: Removed the abandoned inlined digital-human styles from the home page and corrected the custom navigation labels' source encoding.
- 2026-07-12: Disabled WeChat DevTools hot reload for this project so deleting a component forces a fresh component-dependency parse instead of retaining a removed WXML/WXSS path.
- 2026-07-12: Made `DigitalHumanAvatar` fill its caller's stage so the shared avatar renders correctly in the home, digital-human, and call views.
- 2026-07-12: Added a regression test for the shared avatar integration and removal of the retired `DigitalHumanChat` reference.
- 2026-07-12: Applied the home page's dark-purple glass-panel visual system to the digital-human page and set explicit custom-component host dimensions for the shared avatar.
- 2026-07-12: Reserved the Mini Program status-bar height above the home content so the top status and branding text are no longer obscured by the device safe area.
- 2026-07-12: The custom bottom navigation retains its existing shell behavior and uses `reLaunch` for cross-page returns; a repeated tap on the current destination is ignored.
- 2026-07-12: Read the current Mini Program route through the native `getCurrentPages()` global so the custom tab bar keeps the correct active item.
- 2026-07-12: Corrected the five custom bottom-navigation labels and aligned the global, app-root, and layout backgrounds to `#07111f`.
- 2026-07-11: Replaced `components/common/ModulePage.vue` with `layouts/DefaultLayout.vue`; registered it through `pages.json` easycom so pages no longer import layout or navigation components directly.
- 2026-07-11: Added the shared `ErrorState.vue` and made `DefaultLayout` the only source reference to `AppTabBar.vue` and `NavBar.vue`.
- 2026-07-11: Restored a minimal App.vue root template so mp-weixin consistently emits App.wxml without reintroducing an AppTabBar mount.
- 2026-07-11: Kept the single AppTabBar mount in `layouts/DefaultLayout.vue`; shell pages render their own layout slot.
- 统一底部导航为 `src/components/common/AppTabBar.vue`，不再保留官方 `tabBar` 配置。
- `src/utils/navigation.js` 仅保留 `navigateTo`、`reLaunch`。
- `src/pages/index/index.vue`、`src/pages/digital-human/index.vue` 与 `src/layouts/DefaultLayout.vue` 使用 `scroll-view` 容器，并预留底部安全区，避免内容被导航栏遮挡。
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
