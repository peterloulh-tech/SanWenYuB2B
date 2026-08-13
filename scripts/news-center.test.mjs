import assert from 'node:assert/strict'
import test from 'node:test'

const newsCenterData = await import('../src/data/newsCenter.js').catch(() => null)
const marketData = await import('../src/data/marketData.js').catch(() => null)

test('资讯中心预留需求中的五类内容', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  assert.deepEqual(
    newsCenterData.newsCategories.map(({ id, name }) => ({ id, name })),
    [
      { id: 'all', name: '综合' },
      { id: 'state-owned', name: '国企新闻' },
      { id: 'local-policy', name: '日照/青岛政策' },
      { id: 'national-policy', name: '国家政策' },
      { id: 'project-progress', name: '项目进展' },
    ],
  )
})

test('未引入真实资料前保持空列表并返回明确空状态', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  assert.deepEqual(newsCenterData.newsItems, [])
  assert.deepEqual(newsCenterData.filterNewsItems('all'), [])
  assert.deepEqual(newsCenterData.filterNewsItems('local-policy'), [])
  assert.equal(newsCenterData.findNewsItem('not-found'), null)
})

test('行情页的静态数据明确标注演示性质和完整口径', () => {
  assert.ok(marketData, '需要提供独立行情数据模块')
  assert.deepEqual(marketData.marketDemoMeta, {
    label: '平台演示数据',
    region: '全国演示市场',
    category: '三文鱼',
    specification: '冰鲜整鱼 3~4kg',
    unit: '元/kg',
    dataDate: '2026-08-13',
  })
  assert.deepEqual(marketData.marketDemoChartDates, [
    '07-15', '07-19', '07-23', '07-27', '07-31', '08-03', '08-07', '08-10', '08-13',
  ])
})

test('详情结构为真实资料预留发布信息、文号和原文链接', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  assert.deepEqual(newsCenterData.getNewsItemDetail({
    id: 'verified-policy',
    category: 'local-policy',
    title: '已核验政策',
    publisher: '演示发布机关',
    publishedAt: '2026-08-13',
    documentNumber: '演示文号',
    summary: '已核验摘要',
    sourceUrl: 'https://example.gov.cn/policy',
  }), {
    title: '已核验政策',
    publisher: '演示发布机关',
    publishedAt: '2026-08-13',
    documentNumber: '演示文号',
    summary: '已核验摘要',
    sourceUrl: 'https://example.gov.cn/policy',
  })
  assert.equal(newsCenterData.getNewsItemDetail(null), null)
})
