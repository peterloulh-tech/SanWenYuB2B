import assert from 'node:assert/strict'
import test from 'node:test'

const newsCenterData = await import('../src/data/newsCenter.js').catch(() => null)
const marketData = await import('../src/data/marketData.js').catch(() => null)

test('资讯中心提供综合、国家政策、时事新闻和行业资讯四类内容', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  assert.deepEqual(
    newsCenterData.newsCategories.map(({ id, name }) => ({ id, name })),
    [
      { id: 'all', name: '综合' },
      { id: 'national-policy', name: '国家政策' },
      { id: 'current-affairs', name: '时事新闻' },
      { id: 'industry-news', name: '行业资讯' },
    ],
  )
})

test('行业资讯收录壹渔业最近二十篇并按发布日期倒序排列', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  const industryItems = newsCenterData.filterNewsItems('industry-news')

  assert.equal(industryItems.length, 20)
  assert.equal(newsCenterData.filterNewsItems('all').length, 20)
  assert.equal(industryItems[0].title, '17家船厂竞标，最终花落中国！两艘活鱼运输船敲定')
  assert.equal(industryItems[0].publishedAt, '2026-08-12')
  assert.equal(industryItems.at(-1).title, '回血1600万，国联水产出售湖北加工厂盘活资产')
  assert.equal(industryItems.at(-1).publishedAt, '2026-06-05')
  assert.ok(industryItems.every(item => item.category === 'industry-news'))
  assert.ok(industryItems.every(item => item.publisher === '壹渔业'))
  assert.ok(industryItems.every(item => item.sourceAccountId === 'gh_a596d1e68331'))
  assert.ok(industryItems.every(item => item.summary.length > 10))
  assert.ok(industryItems.every(item => item.tags.length >= 2))
  assert.deepEqual(
    industryItems.map(item => item.publishedAt),
    [...industryItems].map(item => item.publishedAt).sort().reverse(),
  )
  assert.deepEqual(newsCenterData.filterNewsItems('local-policy'), [])
  assert.equal(newsCenterData.findNewsItem('not-found'), null)
})

test('资讯列表按每页六篇分页并正确处理最后一页', () => {
  assert.ok(newsCenterData, '需要提供资讯中心数据模块')
  const firstPage = newsCenterData.paginateNewsItems('industry-news', 1, 6)
  const lastPage = newsCenterData.paginateNewsItems('industry-news', 4, 6)

  assert.deepEqual({
    page: firstPage.page,
    totalItems: firstPage.totalItems,
    totalPages: firstPage.totalPages,
    itemCount: firstPage.items.length,
  }, {
    page: 1,
    totalItems: 20,
    totalPages: 4,
    itemCount: 6,
  })
  assert.deepEqual({
    page: lastPage.page,
    totalItems: lastPage.totalItems,
    totalPages: lastPage.totalPages,
    itemCount: lastPage.items.length,
  }, {
    page: 4,
    totalItems: 20,
    totalPages: 4,
    itemCount: 2,
  })
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

test('详情结构同时支持政策文号和微信公众号来源说明', () => {
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
    contentType: '国家政策',
    tags: ['政策'],
    sourcePlatform: '政府网站',
    sourceAccountId: '',
    sourceMethod: '访问原文链接',
  }), {
    title: '已核验政策',
    publisher: '演示发布机关',
    publishedAt: '2026-08-13',
    documentNumber: '演示文号',
    summary: '已核验摘要',
    sourceUrl: 'https://example.gov.cn/policy',
    contentType: '国家政策',
    tags: ['政策'],
    sourcePlatform: '政府网站',
    sourceAccountId: '',
    sourceMethod: '访问原文链接',
  })
  assert.equal(newsCenterData.getNewsItemDetail(null), null)
})
