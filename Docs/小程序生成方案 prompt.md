# AI 智能招聘平台 — 前端项目初始化指令（uni-app + Vue 3 + Vite）

## 一、项目架构原则
所有代码必须遵循以下原则：
### （一）、分层架构
1. Page（页面）只负责页面展示和用户交互，不允许直接请求 API。
2. Composable 负责页面业务逻辑，可组合多个 Service。
3. Service 负责业务编排，可调用多个 API，不负责页面状态。
4. API 只负责 HTTP 请求，不处理业务逻辑。
5. Pinia 仅负责共享状态管理，不处理复杂业务逻辑。

### （二）、调用规范
6. Page 只能调用 Composable。
7. Composable 只能调用 Service。
8. Service 只能调用 API。
9. API 不允许调用 Page、Composable、Store。
10. 页面之间禁止相互调用。
11. 禁止跨层引用。

### （三）、开发规范

#### ① 分层规范
12. 公共业务逻辑必须抽离到 Composable。
13. 公共 UI 必须封装到 Components。
14. 所有 HTTP 请求统一进入 api/。
15. 所有项目配置统一进入 config/。
16. 所有业务常量统一进入 constants/。
17. 所有共享状态统一进入 store/。
18. 所有业务组件必须可复用。
19. 不允许出现重复代码（DRY）。
20. 单一职责，一个模块只负责一件事情。

#### ② 编码规范

21. 使用 ESLint + Prettier 统一代码风格。
22. Vue 组件统一使用 `<script setup>`。
23. 样式统一使用 SCSS，颜色、字体、间距等变量统一管理。
24. 命名规范统一如下：
    - 页面：目录/index.vue 或 xxx.vue
    - 组件：PascalCase.vue
    - Composable：useXxx.js
    - Service：XxxService.js
    - API：xxx.js
    - Store：xxx.js
25. import 顺序统一：
    Vue → 第三方库 → Components → Composables → Services → API → Store → Utils → Styles。
26. 单文件原则上不超过 400 行，超过必须拆分组件或业务模块。
27. 所有异步请求统一使用 async/await，禁止使用 then() 链式调用。
28. 所有新增页面必须支持 Loading、Empty、Error 三种状态。
29. 注释遵循"说明为什么"，避免解释代码本身。

#### ③ AI Coding 约束

30. 所有代码必须保证可以直接运行。
31. 不允许生成 TODO、FIXME、占位代码或伪代码。
32. 不允许引用不存在的组件、API、工具函数或资源文件。
33. 不允许遗漏 import 或导出。
34. 不允许出现重复实现，相同逻辑必须复用。
35. 每完成一个模块必须保证可以正常编译。
36. 每新增页面必须同步更新 pages.json。
37. 每新增 API 必须同步更新 spec/tech/openapi.yaml。
38. 每新增功能必须同步补充对应测试用例。
39. 不允许直接修改已有公共组件，必须保持向下兼容。
40. 不允许修改接口返回结构适配业务，接口适配统一在 Service 层完成。
41. 所有阶段完成后必须执行 Lint 与 Build，确保项目可以正常运行后再进入下一阶段。
42. 每完成一个阶段必须输出《阶段完成报告》，内容包括：
    - 已完成内容
    - 新增文件清单
    - 修改文件清单
    - 当前遗留问题
    - 下一阶段计划

###（四）、开发流程（Development Workflow）
PRD
→ 页面设计（UI）
→ OpenAPI 接口设计
→ Mock 数据
→ API
→ Service
→ 公共 Component
→ Composable
→ Page
→ 测试（Test）
→ Lint
→ Build
→ 阶段报告

## 二、项目概述

请帮我创建一个 uni-app（Vue 3 + Vite）前端项目，用于 AI 智能招聘平台。
### 1. 技术栈要求
| 项目 | 选型 | 说明 |
|------|------|------|
| 核心框架 | uni-app（Vue 3 + Vite） | 一套代码，发布到小程序、H5、App |
| UI 组件库 | uView Plus | 移动端组件库，兼容小程序 |
| 状态管理 | Pinia | Vue 3 官方推荐 |
| 网络请求 | luch-request | 基于 Promise 的 HTTP 请求封装 |
| WebSocket | uni.connectSocket | 用于数字人实时对话（预留） |
| 样式预处理 | SCSS | 全局样式变量 |
| 代码规范 | ESLint + Prettier | 统一代码风格 |
| 目标平台 | 微信小程序优先，兼容 H5、App |


### 2. 用户角色与权限体系

平台支持三类用户角色：游客用户 → 注册用户 → 会员用户

---

#### (1) 游客用户（未登录）

用户无需注册即可访问基础内容。

权限范围：

- 浏览首页
- 浏览公开岗位信息
- 查看平台介绍
- 查看部分职业资讯
- 查看会员权益介绍
- 使用基础 AI 能力体验（限制次数）

限制：

- 不保存完整职业画像
- 不支持简历长期管理
- 不支持完整岗位推荐
- 不支持 AI 面试
- 不支持人才关系图谱
- 不支持会员权益服务

---

#### (2) 注册用户（普通用户）

完成手机号/微信注册后的用户。

权限范围：

- 创建个人账号
- 上传个人简历
- AI 简历解析
- 生成基础职业画像
- 收藏岗位
- 查看岗位详情
- 接收基础岗位推荐
- 使用基础 AI 职业顾问
- 保存职业数据


用户数据：

User
→ Resume
→ Career Profile
→ Job Preference


限制：

- AI 高级分析次数有限
- 高级职业报告受限
- 模拟面试次数受限
- 高级推荐能力受限


---

#### (3) 会员用户（付费用户）

购买会员服务后的用户。

权限范围：

- 无限 AI 职业顾问服务
- 深度简历分析
- 高级职业画像
- 职业发展路线规划
- AI 模拟面试
- Offer 分析
- 精准岗位推荐
- 人才关系图谱查询
- 企业信息分析
- 优先获取岗位机会


会员数据：

User
→ Membership
→ Career Profile
→ Recommendation
→ Career Service


---

### 3.用户权限控制原则

用户权限统一由用户身份 + 权益状态控制：

User Role
→ Permission
→ Feature Access
→ API Access


权限类型：

| 权限 | 游客 | 注册用户 | 会员用户 |
|----|----|----|----|
| 浏览岗位 | ✓ | ✓ | ✓ |
| 查看企业信息 | ✓ | ✓ | ✓ |
| 上传简历 | × | ✓ | ✓ |
| AI简历分析 | 体验 | 基础 | 高级 |
| 职业画像 | × | 基础 | 深度 |
| 岗位推荐 | × | 基础 | 精准 |
| AI面试 | × | 限制 | 无限 |
| 职业规划 | × | 基础 | 专业 |
| 关系图谱 | × | × | ✓ |
| 专属AI顾问 | × | 限制 | ✓ |


---

### 4. 用户状态模型

用户状态：

游客（Guest）
→ 注册用户（User）
→ 会员用户（Member）


用户核心字段：
```javascript
{
  userId: "",
  role: "guest | user | member",
  membershipStatus: "none | active | expired",
  permissions: []
}
```

## 三、项目初始化

### 1. 创建项目

###2. 安装依赖

pnpm add pinia uview-plus luch-request dayjs
pnpm add -D sass sass-loader @dcloudio/types

###3. 配置 vite.config.js
配置别名 @ 指向 src
配置代理，开发环境转发 /api 到 http://localhost:8000
配置按需加载

## 四、目录结构
请按照以下目录结构创建所有文件夹和文件，并备注说明：
```text
frontend/
├── spec/                                      # 📋 项目规范文档
│   ├── ui/                                    # UI设计规范
│   │   ├── colors.md                          # 颜色规范（主色、辅助色、状态色）
│   │   ├── typography.md                      # 字体规范（字号、字重、行高）
│   │   ├── spacing.md                         # 间距规范（页面间距、组件间距）
│   │   ├── components.md                      # 公共组件规范
│   │   └── pages.md                           # 页面布局规范
│   │
│   ├── tech/                                  # 技术规范
│   │   ├── architecture.md                    # 前端整体架构说明
│   │   ├── framework.md                       # 技术选型说明
│   │   ├── api.md                             # API调用规范
│   │   ├── state.md                           # Pinia状态管理规范
│   │   ├── git.md                             # Git提交规范
│   │   ├── deployment.md                      # 构建部署说明
│   │   └── openapi.yaml                       # OpenAPI接口定义
│   │
│   ├── requirements/                          # 产品需求文档
│   │   ├── overview.md                        # 项目需求总览
│   │   ├── functional.md                      # 功能需求说明
│   │   ├── user-stories.md                    # 用户故事
│   │   ├── flow.md                            # 业务流程
│   │   └── changelog.md                       # 需求变更记录
│   │
│   └── testing/                               # 测试规范
│       ├── plan.md                            # 测试计划
│       ├── cases/                             # 测试用例
│       │   ├── login.md                       # 登录测试
│       │   ├── resume.md                      # 简历测试
│       │   ├── recommendation.md              # 推荐测试
│       │   └── membership.md                  # 会员测试
│       ├── e2e.md                             # E2E测试说明
│       └── checklist.md                       # 上线检查清单
│
├── src/
│   ├── pages/                                 # 页面层：只负责页面展示和用户交互
│   │
│   │   ├── index/                             # 首页
│   │   │   └── index.vue                      # 平台首页
│   │   │
│   │   ├── login/                             # 登录注册
│   │   │   ├── login.vue                      # 登录页面
│   │   │   └── agreement.vue                  # 用户协议页面
│   │   │
│   │   ├── resume/                            # 简历模块
│   │   │   ├── upload.vue                     # 简历上传页面
│   │   │   ├── analysis.vue                   # AI简历分析页面
│   │   │   ├── optimize.vue                   # AI简历优化页面
│   │   │   ├── history.vue                    # 历史简历页面
│   │   │   └── detail.vue                     # 简历详情页面
│   │   │
│   │   ├── job/                               # 岗位模块
│   │   │   ├── list.vue                       # 岗位列表页面
│   │   │   ├── detail.vue                     # 岗位详情页面
│   │   │   ├── search.vue                     # 岗位搜索页面
│   │   │   └── company.vue                    # 企业详情页面
│   │   │
│   │   ├── recommendation/                    # AI推荐模块
│   │   │   ├── index.vue                      # 推荐岗位列表
│   │   │   └── report.vue                     # 推荐分析报告
│   │   │
│   │   ├── interview/                         # AI面试模块
│   │   │   ├── mock.vue                      # AI模拟面试
│   │   │   ├── result.vue                    # 面试结果
│   │   │   └── history.vue                   # 面试记录
│   │   │
│   │   ├── career/                            # 职业画像模块
│   │   │   ├── profile.vue                    # 职业画像
│   │   │   ├── roadmap.vue                    # 职业发展路线
│   │   │   └── report.vue                     # 职业报告
│   │   │
│   │   ├── graph/                             # 智能关系图谱
│   │   │   ├── relationship.vue               # 人才关系图谱
│   │   │   ├── company.vue                    # 企业关系图谱
│   │   │   └── network.vue                    # 行业关系网络
│   │   │
│   │   ├── membership/                        # 会员模块
│   │   │   ├── index.vue                      # 会员首页
│   │   │   ├── order.vue                      # 订单页面
│   │   │   └── benefit.vue                    # 权益页面
│   │   │
│   │   ├── profile/                           # 用户中心
│   │   │   ├── index.vue                      # 用户主页
│   │   │   ├── settings.vue                   # 用户设置
│   │   │   ├── security.vue                   # 账号安全
│   │   │   ├── feedback.vue                   # 用户反馈
│   │   │   └── about.vue                      # 关于平台
│   │   │
│   │   ├── message/                           # 消息模块
│   │   │   ├── index.vue                      # 消息列表
│   │   │   └── detail.vue                     # 消息详情
│   │   │
│   │   ├── digital-human/                    # AI数字人模块（预留）
│   │   │   └── index.vue                      # 数字人交互页面
│   │   │
│   │   └── common/                            # 通用页面
│   │       ├── webview.vue                    # WebView页面
│   │       ├── error.vue                      # 错误页面
│   │       └── empty.vue                      # 空数据页面
│   │
│   ├── components/                            # 公共组件层
│   │   ├── business/                          # 业务组件
│   │   │   ├── ResumeCard.vue                 # 简历卡片
│   │   │   ├── JobCard.vue                    # 岗位卡片
│   │   │   ├── MatchScore.vue                 # 匹配度展示
│   │   │   └── CareerTag.vue                  # 职业标签
│   │   │
│   │   ├── common/                            # 基础组件
│   │   │   ├── NavBar.vue                     # 顶部导航
│   │   │   ├── TabBar.vue                     # 底部导航
│   │   │   ├── Loading.vue                    # 加载组件
│   │   │   └── EmptyState.vue                 # 空状态组件
│   │   │
│   │   ├── charts/                            # 图表组件
│   │   │   ├── RadarChart.vue                 # 雷达图
│   │   │   └── LineChart.vue                  # 趋势图
│   │   │
│   │   ├── graph/                             # 图谱组件
│   │   │   ├── RelationGraph.vue              # 关系图谱
│   │   │   └── NodeCard.vue                   # 节点卡片
│   │   │
│   │   └── digital-human/                     # 数字人组件
│   │       ├── FloatEntry.vue                 # 悬浮入口
│   │       ├── Panel.vue                      # 对话面板
│   │       └── config.js                      # 数字人配置
│   │
│   ├── composables/                           # Vue业务逻辑层
│   │   ├── useUser.js                         # 用户逻辑
│   │   ├── useResume.js                       # 简历逻辑
│   │   ├── useJob.js                          # 岗位逻辑
│   │   ├── useProfile.js
│   │   ├── useAuth.js
│   │   ├── useRecommendation.js               # 推荐逻辑
│   │   ├── useInterview.js                    # 面试逻辑
│   │   ├── useMembership.js                   # 会员逻辑
│   │   ├── useMessage.js                      # 消息逻辑
│   │   ├── useUpload.js                       # 上传逻辑
│   │   ├── usePagination.js                   # 分页逻辑
│   │   └── useWebsocket.js                    # WebSocket逻辑
│   │
│   ├── services/                              # 业务服务层
│   │   ├── UserService.js                     # 用户业务编排
│   │   ├── ResumeService.js                   # 简历业务编排
│   │   ├── JobService.js                      # 岗位业务编排
│   │   ├── RecommendationService.js            # 推荐业务编排
│   │   ├── InterviewService.js                # 面试业务编排
│   │   ├── MembershipService.js               # 会员业务编排
│   │   ├── AuthService.js
│   │   ├── UploadService.js                   # 上传业务编排
│   │   ├── MessageService.js                  # 消息业务编排
│   │
│   ├── api/                                   # HTTP接口层
│   │   ├── request.js                         # 请求封装
│   │   ├── index.js                           # API出口
│   │   ├── auth.js                            # 登录接口
│   │   ├── user.js                            # 用户接口
│   │   ├── resume.js                          # 简历接口
│   │   ├── job.js                             # 岗位接口
│   │   ├── recommendation.js                  # 推荐接口
│   │   ├── interview.js                       # 面试接口
│   │   ├── membership.js                      # 会员接口
│   │   ├── message.js                         # 消息接口
│   │   ├── upload.js                          # 上传接口
│   │   ├── config.js                           # 配置接口
│   │   └── mock/                              # Mock数据
│   │
│   ├── store/                                 # Pinia状态管理
│   │   ├── index.js                           # Store入口
│   │   ├── app.js                             # 全局状态
│   │   ├── job.js                             # 工作状态
│   │   ├── user.js                            # 用户状态
│   │   ├── membership.js       # 会员状态
│   │   ├── permission.js        # 权限状态
│   │   ├── interview.js                        # 面试状态
│   │   ├── resume.js                          # 简历状态
│   │   ├── recommendation.js                  # 推荐状态
│   │   ├── membership.js                      # 会员状态
│   │   └── message.js                         # 消息状态
│   │
│   ├── constants/                             # 全局常量
│   │   ├── app.js                             # 应用常量
│   │   ├── cache.js                           # 缓存Key
│   │   ├── status.js                          # 状态常量
│   │   ├── routes.js                           # 路由配置
│   │   └── index.js                           # 常量出口
│   │
│   ├── config/                                # 配置管理
│   │   ├── index.js                           # 配置入口
│   │   ├── api.js                             # API配置
│   │   ├── env.js                             # 环境配置
│   │   ├── permission.js                       # 权限配置
│   │   └── theme.js                            # 主题配置
│   │
│   ├── utils/                                 # 工具函数
│   │   ├── format.js                          # 格式化
│   │   ├── validator.js                       # 校验工具
│   │   ├── storage.js                         # 本地缓存
│   │   ├── auth.js                            # 登录认证
│   │   ├── navigation.js                      # 页面跳转
│   │   ├── debounce.js                        # 防抖节流
│   │   ├── websocket.js                       # WebSocket工具
│   │   └── remoteConfig.js                    # 远程配置
│   │
│   ├── models/                                 # 数据类型定义
│   │   ├── api.js                             # API类型
│   │   ├── common.js                          # 公共类型
│   │   ├── user.js                            # 用户类型
│   │   ├── resume.js                          # 简历类型
│   │   ├── job.js                             # 岗位类型
│   │   ├── recommendation.js                  # 推荐类型
│   │   ├── interview.js                       # 面试类型
│   │   └── membership.js                      # 会员类型
│   │
│   ├── static/                                # 静态资源
│   │   ├── images/                            # 图片
│   │   ├── icons/                             # 图标
│   │   ├── fonts/                             # 字体
│   │   ├── default/                           # 默认资源
│   │   │   ├── avatar.png                     # 默认头像
│   │   │   ├── company.png                    # 默认企业图
│   │   │   └── empty.png                      # 空状态图
│   │   └── dh/                                # 数字人资源
│   │
│   ├── styles/                                # 全局样式
│   │   ├── variables.scss                     # 全局变量
│   │   ├── mixins.scss                        # SCSS混入
│   │   ├── reset.scss                         # 样式重置
│   │   ├── animation.scss                     # 动画
│   │   ├── transition.scss                    # 页面过渡
│   │   └── common.scss                        # 公共样式
│   │
│   ├── pages.json                             # uni-app页面配置
│   ├── manifest.json                          # 应用配置
│   ├── App.vue                               # 根组件
│   ├── main.js                               # 项目入口
│   └── uni.scss                              # uni全局变量
│
├── package.json                              # 项目依赖
├── pnpm-lock.yaml                            # 依赖锁定
├── vite.config.js                            # Vite配置
├── .env.development                          # 开发环境变量
├── .env.production                           # 生产环境变量
├── .eslintrc.js                              # ESLint配置
├── .prettierrc.js                            # Prettier配置
├── project.config.json                       # 微信小程序配置
└── README.md                                 # 项目说明
```


## 五、Spec 文件夹说明
子文件夹	用途	核心文件
spec/ui/	UI 样式说明	colors.md 颜色规范、typography.md 字体规范、components.md 组件样式规范
spec/tech/	技术说明	architecture.md 技术架构、api.md API 调用规范、git.md Git 提交规范
spec/requirements/	需求说明	overview.md 项目总览、functional.md 功能需求、user-stories.md 用户故事、flow.md 业务流程图
spec/testing/	测试说明	plan.md 测试计划、cases/ 测试用例目录、checklist.md 上线自测清单

### 4.1 UI样式
参考【系统UI样式标准规范.md】

### 4.2 spec/tech/architecture.md 内容模板
  技术架构说明

  整体架构

### 4.3 spec/tech/openapi.yaml

**必须生成符合 OpenAPI 3.0 规范的 YAML 文件**，内容需包含所有核心接口的路径、请求/响应格式，便于 Apifox 一键导入。

```yaml
openapi: 3.0.0
info:
  title: AI智能招聘平台 API
  version: 1.0.0
servers:
  - url: /api
    description: 开发环境
paths:
  /v1/auth/login:
    post:
      summary: 用户登录
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                phone:
                  type: string
                code:
                  type: string
      responses:
        '200':
          description: 成功
  /v1/resume/upload:
    post:
      summary: 上传简历
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                file:
                  type: string
                  format: binary
      responses:
        '200':
          description: 返回task_id
  /v1/resume/analysis/{resume_id}:
    get:
      summary: 获取简历分析结果
      parameters:
        - name: resume_id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: 分析结果
  /v1/recommendation/list:
    get:
      summary: 获取推荐岗位列表
      responses:
        '200':
          description: 岗位列表
  /v1/order/create:
    post:
      summary: 创建会员订单
      responses:
        '200':
          description: 订单信息
  /v1/digital-human/config:
    get:
      summary: 获取数字人配置（含开关）
      responses:
        '200':
          description: 配置信息
```

### 4.4 spec/requirements/overview.md 内容模板

 项目需求总览

  项目背景
面向临床试验、医药、生物科技等行业的 AI 智能招聘平台。

  核心功能模块
1. **简历分析**：上传 → 解析 → 诊断 → 优化建议
2. **岗位推荐**：基于简历和画像的精准匹配
3. **知识图谱**：人脉关系发现与内推线索
4. **会员服务**：面试指导 + 求职攻略
5. **数字人交互**（预留）：悬浮入口 + 对话面板

  用户角色
- 游客
- 注册用户
- 会员


### 4.5 spec/testing/checklist.md 内容模板
  上线前自测清单

  功能测试
- [ ] 首页加载正常
- [ ] 简历上传成功（PDF/Word）
- [ ] 简历分析结果展示（评分、建议、优化）
- [ ] 岗位推荐列表加载
- [ ] 岗位详情页展示
- [ ] 个人中心信息展示
- [ ] 会员中心页面展示
- [ ] 数字人入口显隐控制（dhEnabled = false / true）

  兼容性测试
- [ ] 微信小程序（iOS）
- [ ] 微信小程序（Android）
- [ ] H5（Chrome）
- [ ] H5（Safari）

  性能测试
- [ ] 首屏加载时间 < 2s
- [ ] 页面切换流畅
- [ ] 列表滚动无卡顿

  异常测试
- [ ] 网络断开时友好提示
- [ ] API 超时处理
- [ ] 401 跳转登录
- [ ] 空状态展示

## 五、核心代码生成要求
### 5.1 API 请求封装（api/request.js）
  基于 luch-request
  自动携带 Token
  统一错误处理（401 跳登录，500 提示）
  环境切换

### 5.2 数字人开关（store/app.js）
  包含 dhEnabled 状态（默认 false）
  提供 fetchRemoteConfig() 方法
  用于远程控制数字人功能

### 5.3 数字人悬浮入口（components/digital-human/FloatEntry.vue）
固定右下角
仅当 dhEnabled = true 时显示
点击跳转 /pages/digital-human/index

### 5.4 首页（pages/index/index.vue）
导航栏、搜索框、功能入口（简历/推荐/面试）
推荐岗位横向滚动
引用数字人悬浮入口

### 5.5 环境变量
.env.development 和 .env.production
必须包含 VITE_API_BASE_URL 和 VITE_DH_ENABLED
### 5.6 用户权限管理

实现游客、注册用户、会员用户三级权限控制。
要求：

1. 登录状态统一由 user store 管理。
2. 会员状态统一由 membership store 管理。
3. 页面访问权限通过 permission 控制。
4. API 请求自动携带用户身份信息。
5. 未登录用户访问限制页面跳转登录。
6. 非会员访问会员功能展示会员引导。

### 5.7 README 规范

项目介绍
技术栈
目录
启动
开发
构建
部署
环境变量
开发规范
Git规范
发布流程

## 六、重要约束
数字人功能：所有代码保留，但通过 dhEnabled 开关控制，默认 false。
首包体积：数字人组件懒加载（v-if），通过 v-if="dhEnabled" 懒加载 FloatEntry 组件。不影响首屏。
API Mock：开发阶段使用 api/mock/ 数据，不依赖后端。
OpenAPI 规范：必须生成 spec/tech/openapi.yaml，符合 OpenAPI 3.0，用于 Apifox 导入。
spec 文件夹完整性：所有子文件夹及模板文件必须生成，内容不能为空。

