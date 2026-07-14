import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const source = readFileSync(resolve(currentDirectory, 'TabSummaryContent.vue'), 'utf8')

describe('profile tab content', () => {
  it('shows the requested user profile, membership quota, and resume details', () => {
    expect(source).toContain("props.meta.kind === 'profile'")
    expect(source).toContain('普通用户')
    expect(source).toContain('产品经理 · 上海 · 在职')
    expect(source).toContain('画像完善度')
    expect(source).toContain('88%')
    expect(source).toContain('匿名求职')
    expect(source).toContain('会员额度')
    expect(source).toContain('未开通会员')
    expect(source).toContain('60')
    expect(source).toContain('个人简历')
  })
})
