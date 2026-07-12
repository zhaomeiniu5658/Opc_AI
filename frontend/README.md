# AI 智能招聘平台小程序

基于 uni-app Vue 3 + Vite 的 AI 智能招聘前端项目，面向临床试验、医药、生物科技等行业，支持微信小程序优先发布，并兼容 H5 与 App。

## 技术栈

- uni-app Vue 3 + Vite
- uView Plus
- Pinia
- luch-request
- SCSS
- Vitest、ESLint、Prettier

## 启动

安装依赖：

```bash
pnpm install
```

运行 H5：

```bash
pnpm dev:h5
```

构建 H5：

```bash
pnpm build:h5
```

构建微信小程序：

```bash
pnpm build:mp-weixin
```

## 环境变量

- VITE_API_BASE_URL：接口基础路径，默认 /api
- VITE_USE_MOCK：是否使用 Mock 数据，默认 true
- VITE_DH_ENABLED：数字人入口默认开关，默认 false

## 底部导航

底部导航只由 `src/components/common/AppTabBar.vue` 实现，并仅在 `src/layouts/DefaultLayout.vue` 挂载。五个一级菜单由同一个 `DefaultLayout` 页面壳承载；点击菜单仅派发 `change` 事件，布局通过条件分支替换当前内容视图并更新选中态，不执行 `navigateTo`、`navigateBack` 或 `reLaunch`。

| 菜单 | 直接入口路由 | 内容视图 | 页面样式来源 |
| --- | --- | --- | --- |
| 首页 | `/pages/index/index` | `src/components/business/HomeTabContent.vue` | 首页内容视图的 scoped 样式；数字人形象来自 `components/digital-human/DigitalHumanAvatar.vue` |
| 数字人 | `/pages/digital-human/index` | `src/components/business/DigitalHumanTabContent.vue` | 数字人内容视图的 scoped 样式与共享数字人组件 |
| 岗位 | `/pages/job/list` | `src/components/business/JobTabContent.vue` | 岗位内容视图的 scoped 样式 |
| 成长 | `/pages/career/roadmap` | `src/components/business/TabSummaryContent.vue` | `TabSummaryContent.vue` 与 `pageRegistry.careerRoadmap` |
| 我的 | `/pages/profile/index` | `src/components/business/TabSummaryContent.vue` | `TabSummaryContent.vue` 与 `pageRegistry.profile` |

导航按钮、图标、选中态与固定底栏样式全部位于 `src/components/common/AppTabBar.vue`；一级内容由壳内条件分支替换，切换时不会重建底栏或原生页面。

## 项目目录

目录结构由 `pnpm docs:tree` 自动生成。新增、删除或移动目录/关键文件后，先运行该命令再提交 README。

<!-- PROJECT_TREE_START -->

```text
frontend/
    |-- scripts/
    |   `-- update-readme-tree.mjs - README 目录树生成器
    |-- spec/
    |   |-- requirements/
    |   |   |-- changelog.md - 需求文档
    |   |   |-- flow.md - 需求文档
    |   |   |-- functional.md - 需求文档
    |   |   |-- overview.md - 需求文档
    |   |   `-- user-stories.md - 需求文档
    |   |-- tech/
    |   |   |-- api.md - 技术文档
    |   |   |-- architecture.md - 技术文档
    |   |   |-- deployment.md - 技术文档
    |   |   |-- framework.md - 技术文档
    |   |   |-- git.md - 技术文档
    |   |   |-- openapi.yaml - 接口定义文档
    |   |   `-- state.md - 技术文档
    |   |-- testing/
    |   |   |-- cases/
    |   |   |   |-- login.md - 测试用例
    |   |   |   |-- membership.md - 测试用例
    |   |   |   |-- recommendation.md - 测试用例
    |   |   |   `-- resume.md - 测试用例
    |   |   |-- checklist.md - 测试规范文档
    |   |   |-- e2e.md - 测试规范文档
    |   |   `-- plan.md - 测试规范文档
    |   `-- ui/
    |       |-- colors.md - UI 规范文档
    |       |-- components.md - UI 规范文档
    |       |-- pages.md - UI 规范文档
    |       |-- spacing.md - UI 规范文档
    |       `-- typography.md - UI 规范文档
    |-- src/
    |   |-- api/
    |   |   |-- mock/
    |   |   |   |-- data.js - 文件
    |   |   |   `-- index.js - 文件
    |   |   |-- auth.js - 文件
    |   |   |-- config.js - 文件
    |   |   |-- index.js - 文件
    |   |   |-- interview.js - 文件
    |   |   |-- job.js - 文件
    |   |   |-- membership.js - 文件
    |   |   |-- message.js - 文件
    |   |   |-- recommendation.js - 文件
    |   |   |-- request.js - 文件
    |   |   |-- resume.js - 文件
    |   |   |-- upload.js - 文件
    |   |   `-- user.js - 文件
    |   |-- components/
    |   |   |-- business/
    |   |   |   |-- DigitalHumanTabContent.vue - 数字人一级菜单内容视图
    |   |   |   |-- HomeTabContent.vue - 首页一级菜单内容视图
    |   |   |   |-- JobTabContent.vue - 岗位一级菜单内容视图
    |   |   |   |-- TabSummaryContent.test.js - 测试文件
    |   |   |   `-- TabSummaryContent.vue - 成长与我的一级菜单摘要视图
    |   |   |-- charts/
    |   |   |   `-- .keep - 占位文件
    |   |   |-- common/
    |   |   |   |-- AppTabBar.vue - 自定义底部导航
    |   |   |   |-- EmptyState.vue - 空状态组件
    |   |   |   |-- ErrorState.vue - Error state component
    |   |   |   |-- Loading.vue - 加载中组件
    |   |   |   `-- NavBar.vue - 通用顶部导航
    |   |   |-- digital-human/
    |   |   |   |-- .keep - 占位文件
    |   |   |   |-- DigitalHumanAvatar.test.js - 测试文件
    |   |   |   `-- DigitalHumanAvatar.vue - 数字人组件
    |   |   `-- graph/
    |   |       `-- .keep - 占位文件
    |   |-- composables/
    |   |   |-- useAuth.js - 认证逻辑组合函数
    |   |   |-- useInterview.js - 面试逻辑组合函数
    |   |   |-- useJob.js - 岗位逻辑组合函数
    |   |   |-- useMembership.js - 会员逻辑组合函数
    |   |   |-- useMessage.js - 消息逻辑组合函数
    |   |   |-- usePageMeta.js - 页面元数据组合函数
    |   |   |-- useRecommendation.js - 推荐逻辑组合函数
    |   |   |-- useResume.js - 简历逻辑组合函数
    |   |   |-- useUpload.js - 上传逻辑组合函数
    |   |   `-- useUser.js - 用户逻辑组合函数
    |   |-- config/
    |   |   |-- api.js - 接口基础配置
    |   |   |-- env.js - 环境变量封装
    |   |   |-- index.js - 配置聚合入口
    |   |   |-- permission.js - 权限规则
    |   |   |-- permission.test.js - 权限规则单测
    |   |   `-- theme.js - 主题配置
    |   |-- constants/
    |   |   |-- app.js - 应用常量
    |   |   |-- cache.js - 缓存常量
    |   |   |-- index.js - 常量聚合入口
    |   |   `-- status.js - 状态常量
    |   |-- data/
    |   |   `-- pageRegistry.js - 页面元数据注册表
    |   |-- layouts/
    |   |   |-- DefaultLayout.test.js - 测试文件
    |   |   `-- DefaultLayout.vue - 唯一页面公共布局
    |   |-- models/
    |   |   `-- .keep - 占位文件
    |   |-- pages/
    |   |   |-- career/
    |   |   |   `-- roadmap.vue - 职业路线页
    |   |   |-- digital-human/
    |   |   |   `-- index.vue - AI 数字人页
    |   |   |-- index/
    |   |   |   |-- index.test.js - 首页测试文件
    |   |   |   `-- index.vue - 首页主界面
    |   |   |-- interview/
    |   |   |   `-- mock.vue - 面试模拟面试页
    |   |   |-- job/
    |   |   |   |-- detail.vue - 岗位详情页
    |   |   |   `-- list.vue - 岗位列表页
    |   |   |-- login/
    |   |   |   `-- login.vue - 登录登录页页
    |   |   |-- membership/
    |   |   |   `-- index.vue - 会员主界面页
    |   |   |-- profile/
    |   |   |   `-- index.vue - 我的主界面页
    |   |   |-- recommendation/
    |   |   |   |-- index.vue - AI 推荐页
    |   |   |   `-- report.vue - 推荐报告页
    |   |   `-- resume/
    |   |       |-- analysis.vue - 简历分析页
    |   |       |-- detail.vue - 简历详情页
    |   |       |-- history.vue - 简历历史页
    |   |       |-- optimize.vue - 简历优化页
    |   |       `-- upload.vue - 简历上传页
    |   |-- services/
    |   |   |-- AuthService.js - Service 服务封装
    |   |   |-- ConfigService.js - Service 服务封装
    |   |   |-- InterviewService.js - Service 服务封装
    |   |   |-- JobService.js - Service 服务封装
    |   |   |-- JobService.test.js - 岗位服务单测
    |   |   |-- MembershipService.js - Service 服务封装
    |   |   |-- MessageService.js - Service 服务封装
    |   |   |-- RecommendationService.js - Service 服务封装
    |   |   |-- ResumeService.js - Service 服务封装
    |   |   |-- UploadService.js - Service 服务封装
    |   |   `-- UserService.js - Service 服务封装
    |   |-- static/
    |   |   |-- default/
    |   |   |   |-- avatar.png - 默认头像
    |   |   |   |-- company.png - 默认企业图
    |   |   |   `-- empty.png - 空状态插图
    |   |   |-- dh/
    |   |   |   `-- .keep - 占位文件
    |   |   |-- fonts/
    |   |   |   `-- .keep - 占位文件
    |   |   |-- icons/
    |   |   |   `-- .keep - 占位文件
    |   |   |-- images/
    |   |   |   `-- ai-assistant-reference.png - AI 助手参考图
    |   |   `-- logo.png - 文件
    |   |-- store/
    |   |   |-- app.js - 状态管理模块
    |   |   |-- index.js - Pinia 入口
    |   |   |-- interview.js - 状态管理模块
    |   |   |-- job.js - 状态管理模块
    |   |   |-- membership.js - 状态管理模块
    |   |   |-- message.js - 状态管理模块
    |   |   |-- permission.js - 状态管理模块
    |   |   |-- recommendation.js - 状态管理模块
    |   |   |-- resume.js - 状态管理模块
    |   |   `-- user.js - 状态管理模块
    |   |-- styles/
    |   |   |-- animation.scss - 动画样式
    |   |   |-- common.scss - 全局通用样式
    |   |   |-- mixins.scss - 样式混入
    |   |   |-- reset.scss - 样式重置
    |   |   |-- transition.scss - 过渡样式
    |   |   `-- variables.scss - 样式变量
    |   |-- utils/
    |   |   |-- auth.js - 鉴权工具
    |   |   |-- debounce.js - 防抖工具
    |   |   |-- format.js - 格式化工具
    |   |   |-- navigation.js - 页面导航工具
    |   |   |-- remoteConfig.js - 远程配置工具
    |   |   |-- remoteConfig.test.js - 远程配置单测
    |   |   |-- storage.js - 本地存储工具
    |   |   |-- validator.js - 校验工具
    |   |   |-- validator.test.js - 校验工具单测
    |   |   `-- websocket.js - WebSocket 工具
    |   |-- App.vue - 应用根组件
    |   |-- main.js - 应用入口
    |   |-- manifest.json - uni-app 应用清单
    |   |-- pages.json - 页面与路由配置
    |   `-- uni.scss - uni 全局样式入口
    |-- .env.development - 开发环境变量
    |-- .env.production - 生产环境变量
    |-- .gitignore - Git 忽略规则
    |-- .npmrc - pnpm/npm 配置
    |-- .prettierrc.js - Prettier 格式配置
    |-- AGENTS.md - 项目协作说明
    |-- eslint.config.js - ESLint 规则配置
    |-- index.html - H5 入口模板
    |-- package.json - 项目脚本与依赖清单
    |-- pnpm-workspace.yaml - pnpm 工作区配置
    |-- project.config.json - 微信开发者工具项目配置
    |-- README.md - 项目说明与目录索引
    |-- shims-uni.d.ts - uni-app 类型声明
    |-- updatelog.md - 文件
    |-- vite.config.js - Vite 构建配置
    `-- vitest.config.js - Vitest 测试配置
```

<!-- PROJECT_TREE_END -->

## 开发规范

页面只调用 Composable，Composable 调用 Service，Service 调用 API。API 只负责请求入口，接口适配统一在 Service 层完成。新增页面需要同步更新 src/pages.json，新增接口需要同步更新 spec/tech/openapi.yaml。

## 发布流程

发布微信小程序前，在 src/manifest.json 与 project.config.json 中填写真实 AppID，然后执行 pnpm build:mp-weixin 并用微信开发者工具导入 dist/build/mp-weixin。
