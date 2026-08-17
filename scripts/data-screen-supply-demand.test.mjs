import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('运营大屏以本地循环供求播报替换平台运行状态', async () => {
  const page = await readFile(new URL('src/pages/DataScreenPage.jsx', root), 'utf8')
  const styles = await readFile(new URL('src/styles/data-screen-v2.css', root), 'utf8')

  assert.doesNotMatch(page, /平台运行状态|ds-status/)
  assert.match(page, /title="实时供求信息" extra="演示数据 · 模拟实时更新"/)
  assert.match(page, /const supplyDemandMessages = \[/)
  assert.match(page, /type: '供'/)
  assert.match(page, /type: '求'/)
  assert.match(page, /locationLabel: '产地'/)
  assert.match(page, /locationLabel: '目的地'/)
  assert.match(page, /window\.setInterval\([\s\S]*setSupplyDemandFeed[\s\S]*\), 2800\)/)
  assert.match(page, /window\.clearInterval\(supplyDemandTimer\)/)
  assert.match(page, /className="ds-demand-product"><strong>\{item\.product\}<\/strong><span>\{item\.locationLabel\}：\{item\.location\}<\/span>/)
  assert.doesNotMatch(page, /ds-demand-place/)

  assert.match(styles, /\.ds-demand-feed\s*\{[\s\S]*grid-template-rows:\s*repeat\(3,/)
  assert.match(styles, /\.ds-demand-row\s*\{[\s\S]*grid-template-columns:[^;]*minmax\(0, 1fr\)[^;]*auto auto;/)
  assert.match(styles, /\.ds-demand-row > b\s*\{[\s\S]*font-size:\s*clamp\(18px,/)
  assert.match(styles, /\.ds-demand-product\s*\{[\s\S]*font-size:\s*clamp\(16px,/)
  assert.match(styles, /\.ds-demand-row > em\s*\{[^}]*font-size:\s*clamp\(17px,/)
  assert.match(styles, /\.ds-demand-row > time\s*\{[^}]*font-size:\s*clamp\(16px,/)
  assert.match(styles, /@keyframes ds-demand-refresh/)
  assert.match(styles, /prefers-reduced-motion:\s*reduce[\s\S]*\.ds-demand-feed\s*\{\s*animation:\s*none/s)
})
