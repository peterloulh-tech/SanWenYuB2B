import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { defaultMarketFilters, getMarketSnapshot, getMarketTrend, marketDemoDateRange, marketDemoDates, marketFilterOptions, marketPeriodOptions, marketProcurementTicker } from '../src/data/marketData.js'

test('行情筛选提供三个业务维度、90天日期和三个走势周期', () => {
  assert.deepEqual(marketFilterOptions.species.map((option) => option.label), ['全部三文鱼', '大西洋鲑', '银鲑', '虹鳟', '帝王鲑'])
  assert.deepEqual(marketFilterOptions.origin.map((option) => option.label), ['全部产地', '挪威', '智利', '法罗群岛', '冰岛', '加拿大', '美国', '中国'])
  assert.deepEqual(marketFilterOptions.productForm.map((option) => option.label), ['全部形态', '冰鲜整鱼', '冷冻整鱼', '鱼柳', '鱼排/中段', '切片', '鱼骨鱼头等副产物'])
  assert.deepEqual(marketPeriodOptions, [7, 30, 90])
  assert.equal(marketDemoDates.length, 90)
  assert.equal(marketDemoDates[0], marketDemoDateRange.min)
  assert.equal(marketDemoDates.at(-1), marketDemoDateRange.max)
})

test('数据日期只改变当日市场，走势图始终由业务筛选和周期决定', () => {
  const latest = getMarketSnapshot(defaultMarketFilters, marketDemoDateRange.max)
  const earlier = getMarketSnapshot(defaultMarketFilters, marketDemoDateRange.min)
  assert.notEqual(latest.price, earlier.price)

  const sevenDays = getMarketTrend(defaultMarketFilters, 7)
  const thirtyDays = getMarketTrend(defaultMarketFilters, 30)
  const ninetyDays = getMarketTrend(defaultMarketFilters, 90)
  assert.equal(sevenDays.points.length, 7)
  assert.equal(thirtyDays.points.length, 30)
  assert.equal(ninetyDays.points.length, 90)
  assert.equal(sevenDays.points.at(-1).date, marketDemoDateRange.max)
})

test('品种、产地和产品形态同时联动当日市场与走势图', () => {
  const filtered = { species: 'king', origin: 'norway', productForm: 'fillet' }
  assert.notEqual(getMarketSnapshot(filtered, marketDemoDateRange.max).price, getMarketSnapshot(defaultMarketFilters, marketDemoDateRange.max).price)
  assert.notEqual(getMarketTrend(filtered, 30).currentPrice, getMarketTrend(defaultMarketFilters, 30).currentPrice)
})

test('虹鳟和银鲑是两个独立的行情品种', () => {
  const rainbowTrout = { ...defaultMarketFilters, species: 'rainbow-trout' }
  const coho = { ...defaultMarketFilters, species: 'coho' }
  assert.notEqual(getMarketSnapshot(rainbowTrout, marketDemoDateRange.max).price, getMarketSnapshot(coho, marketDemoDateRange.max).price)
  assert.notEqual(getMarketTrend(rainbowTrout, 30).currentPrice, getMarketTrend(coho, 30).currentPrice)
})

test('行情页复用采购页下拉控件并移除两个热门模块', async () => {
  const [marketPage, procurementPage, chartComponent] = await Promise.all([
    readFile(new URL('../src/pages/MarketPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/ProcurementPublishPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/market/PriceTrendChart.jsx', import.meta.url), 'utf8'),
  ])
  assert.match(marketPage, /<LinkedSelect/)
  assert.match(procurementPage, /<LinkedSelect/)
  assert.match(marketPage, /type="date"/)
  assert.match(marketPage, /marketPeriodOptions\.map/)
  assert.match(marketPage, /<PriceTrendChart/)
  assert.match(chartComponent, /from 'echarts\/core'/)
  assert.doesNotMatch(marketPage, /<svg viewBox=/)
  assert.doesNotMatch(marketPage, /热门需求方向|热门采购地区/)
})

test('行情页提供轻量重置、清晰字号和平台演示采购需求滚动区', async () => {
  const [marketPage, marketStyles] = await Promise.all([
    readFile(new URL('../src/pages/MarketPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/service-pages.css', import.meta.url), 'utf8'),
  ])
  assert.equal(marketProcurementTicker.length, 4)
  assert.match(marketPage, /className="market-reset"/)
  assert.match(marketPage, /className="market-ticker-track"/)
  assert.match(marketPage, /演示数据/)
  assert.match(marketPage, /采购需求总量：/)
  assert.match(marketStyles, /market-ticker-group\{[^}]*font-size:16px/)
  assert.match(marketStyles, /market-tip p\{[^}]*font-size:16px/)
  assert.match(marketStyles, /market-supply-values p>b\{[^}]*font-size:18px/)
  assert.doesNotMatch(marketPage, /<footer>/)
  assert.doesNotMatch(marketPage, /当前状态：/)
})
