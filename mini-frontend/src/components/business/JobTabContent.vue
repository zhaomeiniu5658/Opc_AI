<template>
  <view class="app-page job-page">
    <scroll-view class="job-scroll" scroll-y :show-scrollbar="false">
      <view class="job-header">
        <text class="job-header-kicker">AI 智能招聘</text>
        <text class="job-header-title">岗位</text>
        <text class="job-header-desc">浏览公开岗位，筛选行业方向和地点。</text>
      </view>

      <view class="search-panel fade-in">
        <view class="search-box">
          <text class="search-icon">⌕</text>
          <input
            v-model.trim="keyword"
            class="search-input"
            confirm-type="search"
            placeholder="搜索岗位、公司、地点或标签"
            placeholder-class="search-placeholder"
            @confirm="handleSearch"
          />
          <text v-if="keyword" class="clear-search" @tap="clearSearch">×</text>
        </view>

        <view class="sort-tabs">
          <view
            v-for="item in sortOptions"
            :key="item.value"
            class="sort-tab"
            :class="{ active: sortType === item.value }"
            @tap="setSort(item.value)"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>

        <scroll-view class="tag-scroll" scroll-x :show-scrollbar="false">
          <view class="tag-row">
            <text
              v-for="tag in allTags"
              :key="tag"
              class="filter-tag"
              :class="{ active: selectedTag === tag }"
              @tap="toggleTag(tag)"
            >
              {{ tag }}
            </text>
          </view>
        </scroll-view>
      </view>

      <view class="result-summary">
        <text class="result-count">共 {{ filteredJobs.length }} 个岗位</text>
        <text class="result-rule">{{ sortLabel }}</text>
      </view>

      <Loading v-if="loading" />
      <ErrorState v-else-if="error" />
      <EmptyState
        v-else-if="filteredJobs.length === 0"
        title="没有找到匹配岗位"
        description="换个岗位、公司或标签关键字再试试"
      />

      <view v-else class="job-list">
        <view
          v-for="job in filteredJobs"
          :key="job.id"
          class="job-card"
          @tap="toggleExpanded(job.id)"
        >
          <view class="job-head">
            <text class="job-title">{{ job.title }}</text>
            <view class="job-badges">
              <text class="match-badge">匹配度{{ job.matchText }}</text>
              <text v-if="job.isFavorite" class="favorite-heart">❤</text>
            </view>
          </view>

          <text class="job-meta">
            {{ job.companyName }} · {{ job.city }} · {{ job.salaryText }}
          </text>

          <view class="job-tags">
            <text v-for="tag in job.tags" :key="job.id + tag" class="job-tag">{{ tag }}</text>
          </view>

          <text class="job-intro" :class="{ expanded: expandedIds.includes(job.id) }">
            {{ job.description }}
          </text>

          <view class="job-actions" @tap.stop>
            <button class="action-button primary" hover-class="button-hover" @tap="applyJob(job)">
              可投递
            </button>
            <button class="action-button ghost" hover-class="button-hover" @tap="viewMatch(job)">
              匹配情况
            </button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import EmptyState from '@/components/common/EmptyState.vue'
import ErrorState from '@/components/common/ErrorState.vue'
import Loading from '@/components/common/Loading.vue'
import { useJob } from '@/composables/useJob.js'
import { navigateTo } from '@/utils/navigation.js'

const { jobs, loading, error, loadPublicJobs } = useJob()

const keyword = ref('')
const sortType = ref('match')
const selectedTag = ref('全部')
const expandedIds = ref([])

const sortOptions = [
  { label: '匹配度', value: 'match' },
  { label: '薪资排序', value: 'salary' },
  { label: '岗位标签', value: 'tag' },
]

const jobDescriptions = {
  'job-1001':
    '负责临床试验中心监察、研究者沟通、受试者入组进度追踪和项目质量管理，推动肿瘤方向多中心项目按计划交付。',
  'job-1002':
    '协助研究团队完成受试者筛选、随访安排、资料归档和伦理递交流程，适合熟悉临床现场协调工作的候选人。',
  'job-1003':
    '参与临床数据统计分析、SAS 程序开发、CDISC 标准数据集制作和统计报告输出，支持新药注册申报项目。',
}

const favoriteIds = ['job-1001']

const enrichedJobs = computed(() =>
  jobs.value.map((job) => ({
    ...job,
    description:
      job.description ||
      jobDescriptions[job.id] ||
      '岗位职责覆盖项目执行、跨团队协作和结果交付，详情可进入岗位页继续查看。',
    isFavorite: Boolean(job.isFavorite || favoriteIds.includes(job.id)),
  }))
)

const allTags = computed(() => {
  const tags = enrichedJobs.value.flatMap((job) => job.tags || [])
  return ['全部', ...Array.from(new Set(tags))]
})

const filteredJobs = computed(() => {
  const query = keyword.value.trim().toLowerCase()
  const tag = selectedTag.value
  const matched = enrichedJobs.value.filter((job) => {
    const inTag = tag === '全部' || (job.tags || []).includes(tag)
    const searchText = [
      job.title,
      job.companyName,
      job.city,
      job.salaryText,
      job.description,
      ...(job.tags || []),
    ]
      .join(' ')
      .toLowerCase()

    return inTag && (!query || searchText.includes(query))
  })

  return [...matched].sort((a, b) => {
    if (sortType.value === 'salary') {
      return getSalaryValue(b) - getSalaryValue(a)
    }

    if (sortType.value === 'tag') {
      return getPrimaryTag(a).localeCompare(getPrimaryTag(b), 'zh-Hans-CN')
    }

    return Number(b.matchScore || 0) - Number(a.matchScore || 0)
  })
})

const sortLabel = computed(() => {
  const current = sortOptions.find((item) => item.value === sortType.value)
  const tagText = selectedTag.value === '全部' ? '全部标签' : selectedTag.value
  return `${current?.label || '匹配度'} · ${tagText}`
})

onMounted(() => {
  loadPublicJobs()
})

function handleSearch() {
  loadPublicJobs({ keyword: keyword.value })
}

function clearSearch() {
  keyword.value = ''
  loadPublicJobs()
}

function setSort(value) {
  sortType.value = value
}

function toggleTag(tag) {
  selectedTag.value = selectedTag.value === tag ? '全部' : tag
  if (tag !== '全部') {
    sortType.value = 'tag'
  }
}

function toggleExpanded(jobId) {
  if (expandedIds.value.includes(jobId)) {
    expandedIds.value = expandedIds.value.filter((id) => id !== jobId)
    return
  }

  expandedIds.value = [...expandedIds.value, jobId]
}

function applyJob(job) {
  navigateTo(`/pages/job/detail?id=${job.id}`)
}

function viewMatch(job) {
  navigateTo(`/pages/recommendation/report?jobId=${job.id}`)
}

function getSalaryValue(job) {
  return Number(job.salaryMax || job.salaryMin || 0)
}

function getPrimaryTag(job) {
  return selectedTag.value !== '全部' ? selectedTag.value : job.tags?.[0] || ''
}
</script>

<style lang="scss" scoped>
.job-page {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  padding: calc(121rpx + var(--status-bar-height, 0px)) 28rpx 0;
  box-sizing: border-box;
  background:
    linear-gradient(130deg, rgba(117, 92, 255, 0.12) 0%, rgba(4, 10, 24, 0) 32%),
    linear-gradient(180deg, #020816 0%, #06152a 48%, #020817 100%);
}

.job-page::before {
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

.job-scroll {
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  padding-bottom: calc(188rpx + env(safe-area-inset-bottom));
}

.job-header,
.search-panel,
.result-summary,
.job-list {
  position: relative;
  z-index: 1;
}

.job-header-kicker,
.job-header-title,
.job-header-desc {
  display: block;
}

.job-header-kicker {
  color: #8f7cff;
  font-size: 22rpx;
  font-weight: 900;
}

.job-header-title {
  margin-top: 10rpx;
  color: #ffffff;
  font-size: 44rpx;
  font-weight: 900;
  line-height: 1.15;
}

.job-header-desc {
  margin-top: 12rpx;
  color: #c8d2ef;
  font-size: 24rpx;
  line-height: 1.5;
}

.search-panel {
  margin-top: 30rpx;
  padding: 22rpx;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18rpx;
  background:
    linear-gradient(180deg, rgba(18, 30, 60, 0.78), rgba(8, 15, 31, 0.88)), rgba(8, 15, 31, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 14rpx;
  min-height: 78rpx;
  padding: 0 22rpx;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 14rpx;
  background: rgba(4, 10, 24, 0.72);
}

.search-icon {
  flex: 0 0 auto;
  color: #8f7cff;
  font-size: 34rpx;
  font-weight: 900;
}

.search-input {
  flex: 1;
  min-width: 0;
  height: 78rpx;
  color: var(--text);
  font-size: 26rpx;
}

.search-placeholder {
  color: rgba(174, 184, 208, 0.72);
}

.clear-search {
  flex: 0 0 40rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.16);
  color: #dbeafe;
  font-size: 30rpx;
  line-height: 36rpx;
  text-align: center;
}

.sort-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12rpx;
  margin-top: 18rpx;
}

.sort-tab {
  min-width: 0;
  min-height: 62rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14rpx;
  background: rgba(15, 23, 42, 0.68);
  color: #b8c2da;
  font-size: 24rpx;
  font-weight: 800;
}

.sort-tab.active {
  border-color: rgba(124, 92, 255, 0.52);
  background: rgba(124, 92, 255, 0.18);
  color: #e7e1ff;
}

.tag-scroll {
  width: 100%;
  margin-top: 18rpx;
  white-space: nowrap;
}

.tag-row {
  display: flex;
  gap: 12rpx;
  min-width: 100%;
}

.filter-tag {
  flex: 0 0 auto;
  padding: 12rpx 20rpx;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 10rpx;
  background: rgba(6, 17, 34, 0.72);
  color: #aeb8d0;
  font-size: 22rpx;
  font-weight: 800;
}

.filter-tag.active {
  border-color: rgba(143, 124, 255, 0.5);
  background: rgba(124, 92, 255, 0.2);
  color: #e7e1ff;
}

.result-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  padding: 26rpx 4rpx 18rpx;
}

.result-count,
.result-rule {
  font-size: 23rpx;
  line-height: 1.4;
}

.result-count {
  color: var(--text);
  font-weight: 900;
}

.result-rule {
  color: var(--muted);
}

.job-list {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
}

.job-card {
  padding: 26rpx;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18rpx;
  background:
    linear-gradient(180deg, rgba(18, 30, 60, 0.78), rgba(8, 15, 31, 0.88)), rgba(8, 15, 31, 0.78);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 22rpx 54rpx rgba(0, 0, 0, 0.24);
}

.job-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
}

.job-title {
  min-width: 0;
  color: #ffffff;
  font-size: 34rpx;
  font-weight: 900;
  line-height: 1.35;
}

.job-badges {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.match-badge {
  padding: 8rpx 14rpx;
  border-radius: 9rpx;
  background: rgba(94, 231, 168, 0.15);
  color: #86efac;
  font-size: 20rpx;
  font-weight: 900;
  line-height: 1.2;
}

.favorite-heart {
  color: #fb7185;
  font-size: 30rpx;
  line-height: 1;
}

.job-meta {
  display: block;
  margin-top: 14rpx;
  color: #cbd5e1;
  font-size: 25rpx;
  font-weight: 700;
  line-height: 1.45;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 18rpx;
}

.job-tag {
  padding: 8rpx 14rpx;
  border-radius: 8rpx;
  background: rgba(124, 92, 255, 0.22);
  color: #c7bcff;
  font-size: 21rpx;
  font-weight: 800;
}

.job-intro {
  display: -webkit-box;
  overflow: hidden;
  margin-top: 18rpx;
  color: #aeb8d0;
  font-size: 24rpx;
  line-height: 1.65;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.job-intro.expanded {
  display: block;
  overflow: visible;
  text-overflow: initial;
  -webkit-line-clamp: unset;
}

.job-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 22rpx;
}

.action-button {
  min-height: 72rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 18rpx;
  border: 0;
  border-radius: 14rpx;
  font-size: 25rpx;
  font-weight: 900;
  line-height: 1;
}

.action-button::after {
  border: 0;
}

.action-button.primary {
  background: linear-gradient(135deg, #9b7cff 0%, #5b2eff 100%);
  color: #ffffff;
  box-shadow: 0 18rpx 34rpx rgba(91, 46, 255, 0.34);
}

.action-button.ghost {
  border: 1px solid rgba(143, 124, 255, 0.36);
  background: rgba(12, 22, 43, 0.84);
  color: #e7e1ff;
}

.button-hover {
  opacity: 0.86;
}
</style>
