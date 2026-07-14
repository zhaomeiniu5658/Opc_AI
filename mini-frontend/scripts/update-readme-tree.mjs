import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')
const readmePath = path.join(rootDir, 'README.md')

const START = '<!-- PROJECT_TREE_START -->'
const END = '<!-- PROJECT_TREE_END -->'
const MAX_DEPTH = 4

const ignoredNames = new Set([
  '.git',
  '.idea',
  '.DS_Store',
  'coverage',
  'dist',
  'logs',
  'node_modules',
  'pnpm-lock.yaml',
  'project.private.config.json',
])

const ignoredSuffixes = ['.log', '.local']

function normalizePath(inputPath) {
  return inputPath.split(path.sep).join('/')
}

function shouldIgnore(entryName) {
  return ignoredNames.has(entryName) || ignoredSuffixes.some((suffix) => entryName.endsWith(suffix))
}

function sortEntries(entries) {
  return entries.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) {
      return a.isDirectory() ? -1 : 1
    }

    return a.name.localeCompare(b.name, 'zh-Hans-CN')
  })
}

function describePageFile(filePath) {
  const normalized = normalizePath(filePath)
  const [, section = '', fileName = ''] =
    normalized.match(/^src\/pages\/([^/]+)\/([^/]+)\.(vue|js|ts)$/) || []

  const sectionLabels = {
    career: '职业',
    common: '通用',
    'digital-human': '数字人',
    graph: '图谱',
    interview: '面试',
    job: '岗位',
    login: '登录',
    membership: '会员',
    message: '消息',
    profile: '我的',
    recommendation: '推荐',
    resume: '简历',
    index: '首页',
  }

  const pageLabels = {
    about: '关于',
    agreement: '协议',
    analysis: '分析',
    company: '企业详情',
    detail: '详情',
    empty: '空状态页',
    error: '错误页',
    feedback: '反馈',
    history: '历史',
    index: '主界面',
    list: '列表',
    login: '登录页',
    mock: '模拟面试',
    network: '行业网络',
    optimize: '优化',
    order: '订单',
    profile: '画像',
    report: '报告',
    result: '结果',
    roadmap: '路线',
    search: '搜索',
    security: '安全',
    settings: '设置',
    upload: '上传',
    webview: 'WebView',
  }

  const sectionLabel = sectionLabels[section] || section
  const pageLabel = pageLabels[fileName] || fileName

  if (normalized === 'src/pages/index/index.vue') return '首页主界面'
  if (normalized === 'src/pages/index/index.test.js') return '首页内容与布局测试'
  if (section === 'common') return `通用${pageLabel}`
  if (section === 'resume' && fileName === 'detail') return '简历详情页'
  if (section === 'recommendation' && fileName === 'index') return 'AI 推荐页'
  if (section === 'digital-human' && fileName === 'index') return 'AI 数字人页'

  return `${sectionLabel}${pageLabel}页`
}

function describeFile(relativePath) {
  const normalized = normalizePath(relativePath)
  const fileName = path.basename(normalized)

  const exactDescriptions = {
    'AGENTS.md': '项目协作说明',
    '.env.development': '开发环境变量',
    '.env.production': '生产环境变量',
    '.gitignore': 'Git 忽略规则',
    '.npmrc': 'pnpm/npm 配置',
    '.prettierrc.js': 'Prettier 格式配置',
    'eslint.config.js': 'ESLint 规则配置',
    'index.html': 'H5 入口模板',
    'package.json': '项目脚本与依赖清单',
    'pnpm-workspace.yaml': 'pnpm 工作区配置',
    'project.config.json': '微信开发者工具项目配置',
    'project.private.config.json': '微信开发者工具私有配置',
    'README.md': '项目说明与目录索引',
    'shims-uni.d.ts': 'uni-app 类型声明',
    'vite.config.js': 'Vite 构建配置',
    'vitest.config.js': 'Vitest 测试配置',
    'src/App.vue': '应用根组件',
    'src/main.js': '应用入口',
    'src/manifest.json': 'uni-app 应用清单',
    'src/pages.json': '页面与路由配置',
    'src/uni.scss': 'uni 全局样式入口',
    'scripts/update-readme-tree.mjs': 'README 目录树生成器',
  }

  if (exactDescriptions[normalized]) {
    return exactDescriptions[normalized]
  }

  if (fileName === '.keep' || fileName === '.gitkeep') {
    return '占位文件'
  }

  if (normalized.endsWith('.test.js')) {
    if (normalized === 'src/pages/index/index.test.js') return '首页测试文件'
    if (normalized === 'src/config/permission.test.js') return '权限规则单测'
    if (normalized === 'src/services/JobService.test.js') return '岗位服务单测'
    if (normalized === 'src/utils/remoteConfig.test.js') return '远程配置单测'
    if (normalized === 'src/utils/validator.test.js') return '校验工具单测'
    return '测试文件'
  }

  if (normalized.startsWith('spec/requirements/')) {
    return '需求文档'
  }

  if (normalized.startsWith('spec/tech/')) {
    return normalized.endsWith('openapi.yaml') ? '接口定义文档' : '技术文档'
  }

  if (normalized.startsWith('spec/testing/cases/')) {
    return '测试用例'
  }

  if (normalized.startsWith('spec/testing/')) {
    return '测试规范文档'
  }

  if (normalized.startsWith('spec/ui/')) {
    return 'UI 规范文档'
  }

  if (normalized.startsWith('src/layouts/')) {
    const descriptions = {
      'DefaultLayout.vue': '唯一页面公共布局',
    }
    return descriptions[fileName] || 'Page layout'
  }

  if (normalized.startsWith('src/pages/')) return describePageFile(normalized)

  if (normalized.startsWith('src/components/business/')) {
    const descriptions = {
      'DigitalHumanTabContent.vue': '数字人一级菜单内容视图',
      'HomeTabContent.vue': '首页一级菜单内容视图',
      'JobTabContent.vue': '岗位一级菜单内容视图',
      'TabSummaryContent.vue': '成长与我的一级菜单摘要视图',
      'CareerTag.vue': '职业标签组件',
      'JobCard.vue': '岗位卡片组件',
      'MatchScore.vue': '匹配得分组件',
      'ResumeCard.vue': '简历卡片组件',
    }
    return descriptions[fileName] || '业务组件'
  }

  if (normalized.startsWith('src/components/charts/')) {
    const descriptions = {
      'LineChart.vue': '折线图组件',
      'RadarChart.vue': '雷达图组件',
    }
    return descriptions[fileName] || '图表组件'
  }

  if (normalized.startsWith('src/components/common/')) {
    const descriptions = {
      'AppTabBar.vue': '自定义底部导航',
      'EmptyState.vue': '空状态组件',
      'ErrorState.vue': 'Error state component',
      'Loading.vue': '加载中组件',
      'NavBar.vue': '通用顶部导航',
    }
    return descriptions[fileName] || '通用组件'
  }

  if (normalized.startsWith('src/components/digital-human/')) {
    const descriptions = {
      'FloatEntry.vue': '数字人浮窗入口',
      'Panel.vue': '数字人面板',
      'config.js': '数字人配置',
    }
    return descriptions[fileName] || '数字人组件'
  }

  if (normalized.startsWith('src/components/graph/')) {
    const descriptions = {
      'NodeCard.vue': '图谱节点卡片',
      'RelationGraph.vue': '关系图谱组件',
    }
    return descriptions[fileName] || '图谱组件'
  }

  if (normalized.startsWith('src/composables/')) {
    const descriptions = {
      'useAuth.js': '认证逻辑组合函数',
      'useInterview.js': '面试逻辑组合函数',
      'useJob.js': '岗位逻辑组合函数',
      'useMembership.js': '会员逻辑组合函数',
      'useMessage.js': '消息逻辑组合函数',
      'usePageMeta.js': '页面元数据组合函数',
      'usePagination.js': '分页逻辑组合函数',
      'useRecommendation.js': '推荐逻辑组合函数',
      'useResume.js': '简历逻辑组合函数',
      'useUpload.js': '上传逻辑组合函数',
      'useUser.js': '用户逻辑组合函数',
      'useWebsocket.js': 'WebSocket 逻辑组合函数',
    }
    return descriptions[fileName] || 'Composable 逻辑'
  }

  if (normalized.startsWith('src/config/')) {
    const descriptions = {
      'api.js': '接口基础配置',
      'env.js': '环境变量封装',
      'index.js': '配置聚合入口',
      'permission.js': '权限规则',
      'permission.test.js': '权限规则单测',
      'theme.js': '主题配置',
    }
    return descriptions[fileName] || '配置文件'
  }

  if (normalized.startsWith('src/constants/')) {
    const descriptions = {
      'app.js': '应用常量',
      'cache.js': '缓存常量',
      'index.js': '常量聚合入口',
      'routes.js': '路由常量',
      'status.js': '状态常量',
    }
    return descriptions[fileName] || '常量文件'
  }

  if (normalized.startsWith('src/data/')) {
    return '页面元数据注册表'
  }

  if (normalized.startsWith('src/services/')) {
    if (normalized.endsWith('.test.js')) return '服务层单测'
    return 'Service 服务封装'
  }

  if (normalized.startsWith('src/store/')) {
    if (fileName === 'index.js') return 'Pinia 入口'
    return '状态管理模块'
  }

  if (normalized.startsWith('src/styles/')) {
    const descriptions = {
      'animation.scss': '动画样式',
      'common.scss': '全局通用样式',
      'mixins.scss': '样式混入',
      'reset.scss': '样式重置',
      'transition.scss': '过渡样式',
      'variables.scss': '样式变量',
    }
    return descriptions[fileName] || '样式文件'
  }

  if (normalized.startsWith('src/utils/')) {
    const descriptions = {
      'auth.js': '鉴权工具',
      'debounce.js': '防抖工具',
      'format.js': '格式化工具',
      'navigation.js': '页面导航工具',
      'remoteConfig.js': '远程配置工具',
      'remoteConfig.test.js': '远程配置单测',
      'storage.js': '本地存储工具',
      'validator.js': '校验工具',
      'validator.test.js': '校验工具单测',
      'websocket.js': 'WebSocket 工具',
    }
    return descriptions[fileName] || '工具函数'
  }

  if (normalized.startsWith('src/static/default/')) {
    const descriptions = {
      'avatar.png': '默认头像',
      'company.png': '默认企业图',
      'empty.png': '空状态插图',
    }
    return descriptions[fileName] || '默认素材'
  }

  if (normalized.startsWith('src/static/dh/')) return '数字人素材占位'
  if (normalized.startsWith('src/static/fonts/')) return '字体资源占位'
  if (normalized.startsWith('src/static/icons/')) return '图标资源占位'
  if (normalized.startsWith('src/static/images/')) {
    const descriptions = {
      'ai-assistant-reference.png': 'AI 助手参考图',
      'logo.png': '应用 Logo',
    }
    return descriptions[fileName] || '图片素材'
  }

  return '文件'
}

function walkTree(dir, prefix = '', depth = 0) {
  if (depth >= MAX_DEPTH) {
    return []
  }

  const entries = sortEntries(
    readdirSync(dir, { withFileTypes: true }).filter((entry) => !shouldIgnore(entry.name))
  )

  return entries.flatMap((entry, index) => {
    const isLast = index === entries.length - 1
    const connector = isLast ? '`-- ' : '|-- '
    const childPrefix = `${prefix}${isLast ? '    ' : '|   '}`
    const entryPath = path.join(dir, entry.name)
    const displayName = entry.isDirectory() ? `${entry.name}/` : entry.name
    const lines = [
      entry.isDirectory()
        ? `${prefix}${connector}${displayName}`
        : `${prefix}${connector}${displayName} - ${describeFile(path.relative(rootDir, entryPath))}`,
    ]

    if (entry.isDirectory() && statSync(entryPath).isDirectory()) {
      lines.push(...walkTree(entryPath, childPrefix, depth + 1))
    }

    return lines
  })
}

function buildSection() {
  const rootName = `${path.basename(rootDir)}/`
  const tree = [rootName, ...walkTree(rootDir).map((line) => `    ${line}`)].join('\n')

  return `## 项目目录

目录结构由 \`pnpm docs:tree\` 自动生成。新增、删除或移动目录/关键文件后，先运行该命令再提交 README。

${START}

\`\`\`text
${tree}
\`\`\`

${END}`
}

function updateReadme() {
  if (!existsSync(readmePath)) {
    throw new Error(`README.md not found: ${readmePath}`)
  }

  const readme = readFileSync(readmePath, 'utf8')
  const section = buildSection()
  const markedSection = new RegExp(`## 项目目录[\\s\\S]*?${END}`)

  let nextReadme
  if (markedSection.test(readme)) {
    nextReadme = readme.replace(markedSection, section)
  } else if (readme.includes('\n## 开发规范')) {
    nextReadme = readme.replace('\n## 开发规范', `\n${section}\n\n## 开发规范`)
  } else {
    nextReadme = `${readme.trimEnd()}\n\n${section}\n`
  }

  writeFileSync(readmePath, nextReadme, 'utf8')
  console.log('README project tree updated.')
}

updateReadme()
