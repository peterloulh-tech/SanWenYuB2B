import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('公共页头接入单个当前身份切换组件', async () => {
  const switcherUrl = new URL('src/components/layout/IdentitySwitcher.jsx', root)
  await access(switcherUrl)

  const header = await readFile(new URL('src/components/layout/SiteHeader.jsx', root), 'utf8')
  const switcher = await readFile(switcherUrl, 'utf8')

  assert.match(header, /import IdentitySwitcher/)
  assert.match(header, /<IdentitySwitcher\s*\/>/)
  assert.match(switcher, /当前：\{identityLabel\}/)
  assert.match(switcher, /企业交易/)
  assert.match(switcher, /个人消费/)
  assert.doesNotMatch(switcher, /<header>/)
  assert.doesNotMatch(switcher, /游客可自由浏览/)
  assert.doesNotMatch(switcher, /<footer>/)
  assert.doesNotMatch(switcher, /未登录状态仅可查看/)
  assert.doesNotMatch(header, /\["\/retail",\s*"消费零售"\]/)
})
