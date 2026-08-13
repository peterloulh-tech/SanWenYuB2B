import assert from 'node:assert/strict'
import test from 'node:test'

const industryProductData = await import('../src/data/industryProducts.js').catch(() => null)

test('统一企业商品大厅提供四类直观商品分区', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  assert.deepEqual(
    industryProductData.enterpriseProductSections.map(({ id, name }) => ({ id, name })),
    [
      { id: 'fresh', name: '鲜鱼产品' },
      { id: 'aquaculture', name: '养殖供应' },
      { id: 'processed', name: '深加工品' },
      { id: 'seafood', name: '其他海产' },
    ],
  )
})

test('商品数据覆盖鲜鱼、养殖、深加工与其他海产十五类商品', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { industryProducts } = industryProductData
  assert.deepEqual(
    ['fresh', 'aquaculture', 'processed', 'seafood'].map((section) => industryProducts.filter((product) => product.section === section).length),
    [4, 4, 3, 4],
  )
  assert.deepEqual(
    industryProducts.map(({ category }) => category),
    ['整鱼', '鱼柳', '切片', '副产物', '鱼卵鱼苗', '鱼药疫苗', '饲料', '养殖设备', '烟熏产品', '鱼饼', '预制菜', '虾类', '蟹类', '扇贝', '生蚝'],
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
    assert.ok(product.image)
    assert.equal(industryProductData.findIndustryProduct(product.id), product)
  }
  assert.equal(industryProductData.findIndustryProduct('not-found'), null)
})

test('统一大厅同时支持商品分区预筛选和关键词搜索', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { filterIndustryProducts, industryProducts } = industryProductData
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'aquaculture', keyword: '' }).map(({ category }) => category),
    ['鱼卵鱼苗', '鱼药疫苗', '饲料', '养殖设备'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'all', keyword: '青岛' }).map(({ id }) => id),
    ['salmon-fillet', 'salmon-fry', 'smoked-salmon', 'sea-scallops'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'processed', keyword: '预制菜' }).map(({ id }) => id),
    ['salmon-prepared-meal'],
  )
})

test('旧全产业链链接映射到合并后的商品分区', () => {
  assert.equal(industryProductData.mapLegacyProductStage('upstream'), 'aquaculture')
  assert.equal(industryProductData.mapLegacyProductStage('midstream'), 'fresh')
  assert.equal(industryProductData.mapLegacyProductStage('downstream'), 'processed')
  assert.equal(industryProductData.mapLegacyProductStage('unknown'), 'fresh')
})
