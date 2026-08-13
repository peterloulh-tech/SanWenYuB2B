import assert from 'node:assert/strict'
import test from 'node:test'

const industryProductData = await import('../src/data/industryProducts.js').catch(() => null)

test('商品大厅按上中下游提供完整分类', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  assert.deepEqual(
    industryProductData.industryProductStages.map(({ id, name }) => ({ id, name })),
    [
      { id: 'all', name: '全部商品' },
      { id: 'upstream', name: '上游供应' },
      { id: 'midstream', name: '中游产品' },
      { id: 'downstream', name: '下游产品' },
    ],
  )
})

test('商品数据覆盖已确认的十一类产业链商品', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { industryProducts } = industryProductData
  assert.deepEqual(
    ['upstream', 'midstream', 'downstream'].map((stage) => industryProducts.filter((product) => product.stage === stage).length),
    [4, 4, 3],
  )
  assert.deepEqual(
    industryProducts.map(({ category }) => category),
    ['鱼卵鱼苗', '鱼药疫苗', '饲料', '养殖设备', '整鱼', '鱼柳', '切片', '副产物', '烟熏产品', '鱼饼', '预制菜'],
  )
})

test('每项商品具备企业采购浏览所需的信息', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  for (const product of industryProductData.industryProducts) {
    assert.ok(product.id)
    assert.ok(product.name)
    assert.ok(product.supplier)
    assert.ok(product.region)
    assert.ok(product.spec)
    assert.ok(product.price)
    assert.ok(product.minOrder)
    assert.ok(product.supply)
  }
})

test('统一大厅同时支持产业环节预筛选和关键词搜索', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { filterIndustryProducts, industryProducts } = industryProductData
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { stage: 'upstream', keyword: '' }).map(({ category }) => category),
    ['鱼卵鱼苗', '鱼药疫苗', '饲料', '养殖设备'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { stage: 'all', keyword: '青岛' }).map(({ id }) => id),
    ['salmon-fry', 'salmon-fillet', 'smoked-salmon'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { stage: 'downstream', keyword: '预制菜' }).map(({ id }) => id),
    ['salmon-prepared-meal'],
  )
})
