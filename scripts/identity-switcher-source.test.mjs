import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('公共页头接入企业交易与个人消费常驻双频道切换', async () => {
  const switcherUrl = new URL('src/components/layout/IdentitySwitcher.jsx', root)
  await access(switcherUrl)

  const header = await readFile(new URL('src/components/layout/SiteHeader.jsx', root), 'utf8')
  const switcher = await readFile(switcherUrl, 'utf8')
  const styles = await readFile(new URL('src/index.css', root), 'utf8')

  assert.match(header, /import IdentitySwitcher/)
  assert.match(header, /<IdentitySwitcher\s*\/>/)
  assert.match(switcher, /企业交易/)
  assert.match(switcher, /个人消费/)
  assert.match(switcher, /role="group" aria-label="业务频道"/)
  assert.match(switcher, /aria-pressed=\{selected\}/)
  assert.match(switcher, /if \(targetIdentity === identity\) return/)
  assert.match(styles, /grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/)
  assert.match(styles, /\.identity-channel\.selected\{background:#075df5;color:#fff/)
  assert.match(styles, /\.active>\.nav-active-line\{opacity:1\}/)
  assert.doesNotMatch(switcher, /当前：/)
  assert.doesNotMatch(switcher, /ChevronDown/)
  assert.doesNotMatch(switcher, /identity-menu/)
  assert.doesNotMatch(switcher, /<header>/)
  assert.doesNotMatch(switcher, /游客可自由浏览/)
  assert.doesNotMatch(switcher, /<footer>/)
  assert.doesNotMatch(switcher, /未登录状态仅可查看/)
  assert.doesNotMatch(header, /\["\/retail",\s*"消费零售"\]/)
})
