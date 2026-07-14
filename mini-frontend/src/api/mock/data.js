export const mockUser = {
  userId: 'u-1001',
  role: 'user',
  membershipStatus: 'none',
  permissions: [],
  nickname: '临研候选人',
  phone: '13800138000',
}

export const mockMember = {
  ...mockUser,
  role: 'member',
  membershipStatus: 'active',
  nickname: '会员候选人',
}

export const mockJobs = [
  {
    id: 'job-1001',
    title: '资深 CRA 临床监察员',
    companyName: '和瑞医药',
    city: '上海',
    salaryMin: 18,
    salaryMax: 28,
    tags: ['肿瘤', 'III期', 'GCP'],
    matchScore: 96,
    public: true,
  },
  {
    id: 'job-1002',
    title: 'CRC 项目协调专员',
    companyName: '新桥临研',
    city: '杭州',
    salaryMin: 10,
    salaryMax: 16,
    tags: ['中心协调', '受试者管理'],
    matchScore: 88,
    public: true,
  },
  {
    id: 'job-1003',
    title: '生物统计 SAS Programmer',
    companyName: '博泽生物',
    city: '苏州',
    salaryMin: 22,
    salaryMax: 35,
    tags: ['SAS', 'CDISC', '统计分析'],
    matchScore: 91,
    public: true,
  },
]

export const mockResume = {
  id: 'resume-1001',
  fileName: 'clinical-research-resume.pdf',
  score: 86,
  strengths: ['GCP 合规经验', '多中心项目管理', '医学沟通能力'],
  suggestions: ['补充量化项目规模', '强化英文医学写作经历', '增加数据工具关键词'],
}

export const mockRecommendationReport = {
  id: 'report-1001',
  summary: '候选人与临床监察、项目协调和生物统计方向匹配度较高。',
  gaps: ['英文文档案例不足', '统计工具证明材料偏少'],
  actions: ['完善项目成果数据', '补充证书和培训记录', '优先投递肿瘤方向岗位'],
}

export const mockInterview = {
  id: 'interview-1001',
  jobTitle: '资深 CRA 临床监察员',
  score: 82,
  feedback: '回答结构清晰，需加强异常事件处理案例。',
}

export const mockMembership = {
  status: 'none',
  plan: 'career-pro',
  benefits: ['深度简历分析', 'AI 模拟面试', '精准岗位推荐', '关系图谱查询'],
}

export const mockMessages = [
  {
    id: 'msg-1001',
    title: '推荐岗位已更新',
    content: '基于你的简历画像，新增 3 个高匹配岗位。',
    createdAt: '2026-07-10 09:00:00',
  },
]

export const mockRemoteConfig = {
  dhEnabled: false,
}
