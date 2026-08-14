import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('企业页头提供运营大屏入口并将帮助中心移入公共页脚', async () => {
  const header = await readFile(new URL('src/components/layout/SiteHeader.jsx', root), 'utf8')
  const footer = await readFile(new URL('src/components/layout/SiteFooter.jsx', root), 'utf8')
  const app = await readFile(new URL('src/App.jsx', root), 'utf8')

  assert.match(header, /!isRetail && <button[\s\S]*navigate\("\/data-screen"\)[\s\S]*<Monitor[^>]*\/>运营大屏/)
  assert.doesNotMatch(header, /to="\/help"[\s\S]{0,160}帮助中心/)
  assert.match(app, /path="data-screen" element=\{<DataScreenPage\s*\/>\}/)

  const footerLabels = ['关于平台', '帮助中心', '服务说明', '运营后台', '隐私政策']
  const positions = footerLabels.map(label => footer.indexOf(`>${label}</Link>`))
  assert.equal(positions.every(position => position >= 0), true)
  assert.deepEqual(positions, [...positions].sort((left, right) => left - right))
  assert.match(footer, /<Link to="\/help">帮助中心<\/Link>/)
})
