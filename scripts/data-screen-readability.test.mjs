import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('运营大屏统一提升可读性并使用完整趋势图与履约状态', async () => {
  const page = await readFile(new URL('src/pages/DataScreenPage.jsx', root), 'utf8')
  const chart = await readFile(new URL('src/components/data-screen/DataScreenTrendChart.jsx', root), 'utf8')
  const styles = await readFile(new URL('src/styles/data-screen-v2.css', root), 'utf8')
  const rankBars = page.slice(page.indexOf('function RankBars'), page.indexOf('function ChinaMap'))

  assert.doesNotMatch(page, /styles\/admin-mobile\.css/)
  assert.doesNotMatch(page, /平台演示数据/)
  assert.match(page, /const baseOrigins = \[\['挪威',[\s\S]*\['加拿大',/)
  assert.doesNotMatch(page, /const baseOrigins = \[\['冰鲜三文鱼'/)
  assert.match(page, /title="近30日价格趋势"[\s\S]*type="line"/)
  assert.match(page, /title="近30日交易额趋势"[\s\S]*type="bar"/)
  assert.match(page, /title="订单履约状态"[\s\S]*className="ds-order-donut"/)
  assert.match(page, /className="ds-order-donut"[\s\S]*\{metrics\.orders\.toLocaleString\(\)\}/)
  assert.match(page, /成交额（万元）/)
  assert.match(page, /className=\{delta \? 'is-today' : 'is-cumulative'\}/)
  assert.match(page, /className="ds-kpi-placeholder" aria-hidden="true"/)
  assert.match(page, /title="热门产地TOP5" extra="单位：吨" className="ds-unit-panel"/)
  assert.match(page, /title="热门规格需求TOP5" extra="单位：吨" className="ds-unit-panel"/)
  assert.doesNotMatch(page, /<RankBars[^>]*unit="吨"/)
  assert.doesNotMatch(rankBars, /unit|<small>/)

  assert.match(chart, /import \{ BarChart, LineChart \} from 'echarts\/charts'/)
  assert.match(chart, /TooltipComponent/)
  assert.match(chart, /new ResizeObserver\(\(\) => chart\.resize\(\)\)/)
  assert.match(chart, /formatter:\s*\(params\) => tooltipFormatter/)
  assert.match(chart, /axisLabelIndexes = new Set\(\[0, 7, 14, 21, dates\.length - 1\]\)/)

  assert.match(styles, /--ds-text-primary:\s*#eaf2fa/)
  assert.match(styles, /\.ds-kpis span\s*\{[^}]*font-size:\s*clamp\(15px,/)
  assert.match(styles, /\.ds-kpis article\s*\{[^}]*grid-template-columns:\s*clamp\(28px, 2\.2vw, 42px\) minmax\(0, 1fr\)[^}]*padding:\s*5px 12%/s)
  assert.match(styles, /\.ds-kpi-placeholder\s*\{[^}]*visibility:\s*hidden/)
  assert.match(styles, /\.ds-kpis \.is-today strong\s*\{[^}]*color:\s*#ffc267/)
  assert.match(styles, /\.ds-kpis strong small\s*\{[^}]*color:\s*#bfd0df[^}]*font-size:\s*clamp\(14px,/)
  assert.match(styles, /\.ds-kpis em\s*\{[^}]*font-size:\s*clamp\(14px,/)
  assert.match(styles, /\.ds-panel h2\s*\{[^}]*font-size:\s*clamp\(16px,/s)
  assert.match(styles, /\.ds-unit-panel h2 small\s*\{[^}]*font-size:\s*clamp\(14px,/)
  assert.match(styles, /\.ds-panel table\s*\{[^}]*font-size:\s*clamp\(14px,/)
  assert.match(styles, /\.ds-order-status\s*\{[^}]*grid-template-columns:/s)
  assert.match(styles, /\.ds-spec-head\s*\{[^}]*justify-content:\s*space-between/)
  assert.doesNotMatch(styles, /\.mini-line|\.column-chart/)
})
