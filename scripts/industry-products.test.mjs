import assert from 'node:assert/strict'
import { access } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const industryProductData = await import('../src/data/industryProducts.js').catch(() => null)

test('统一企业商品大厅提供三类三文鱼全产业链商品分区', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  assert.deepEqual(
    industryProductData.enterpriseProductSections.map(({ id, name }) => ({ id, name })),
    [
      { id: 'fresh', name: '鲜鱼产品' },
      { id: 'aquaculture', name: '养殖供应' },
      { id: 'processed', name: '深加工品' },
    ],
  )
})

test('可见商品覆盖鲜鱼、拆分后的鱼卵鱼苗与深加工品', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { industryProducts } = industryProductData
  assert.deepEqual(
    ['fresh', 'aquaculture', 'processed'].map((section) => industryProducts.filter((product) => product.section === section).length),
    [5, 7, 3],
  )
  assert.deepEqual(
    industryProducts.map(({ category }) => category),
    ['整鱼', '鱼柳', '切片', '副产物', '鳟鱼', '鱼卵', '鱼卵', '鱼苗', '鱼苗', '鱼药疫苗', '饲料', '养殖设备', '烟熏产品', '鱼饼', '预制菜'],
  )
})

test('鱼卵和鱼苗为独立商品并按枚和尾计价', () => {
  const eggs = industryProductData.industryProducts.filter(({ category }) => category === '鱼卵')
  const fry = industryProductData.industryProducts.filter(({ category }) => category === '鱼苗')

  assert.equal(eggs.length, 2)
  assert.equal(fry.length, 2)
  assert.ok(eggs.every(({ unit, price, productForm }) => unit === '枚' && price.includes('/枚') && productForm === '发眼卵'))
  assert.ok(fry.every(({ unit, price, productForm }) => unit === '尾' && price.includes('/尾') && productForm === '鱼苗'))
  assert.deepEqual(new Set(eggs.map(({ origin }) => origin)), new Set(['挪威', '美国']))
  assert.deepEqual(new Set(fry.map(({ origin }) => origin)), new Set(['挪威', '美国']))
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
    assert.ok(product.species)
    assert.ok(product.origin)
    assert.ok(product.productForm)
    assert.ok(product.unit)
    assert.ok(product.sourceType)
    assert.equal(industryProductData.findIndustryProduct(product.id), product)
  }
  assert.equal(industryProductData.findIndustryProduct('not-found'), null)
})

test('所有三文鱼商品都分别提供产品产地和供应商所在地', () => {
  const salmonProducts = industryProductData.industryProducts.filter(({ species, name }) => species === '大西洋鲑' || name.includes('三文鱼'))
  assert.ok(salmonProducts.length >= 9)
  for (const product of salmonProducts) {
    assert.ok(product.origin, `${product.name}需要产品产地`)
    assert.ok(product.region, `${product.name}需要供应商所在地`)
    assert.notEqual(product.origin, product.region, `${product.name}的产品产地不能复用供应商所在地`)
  }
})

test('鳟鱼保留，海马和西施舌按整改不可从旧链接访问', () => {
  const trout = industryProductData.findIndustryProduct('rainbow-trout-whole')
  const seahorse = industryProductData.findIndustryProduct('farmed-dried-seahorse')
  const clam = industryProductData.findIndustryProduct('rizhao-xishishe-clam')

  assert.equal(trout?.section, 'fresh')
  assert.equal(trout?.species, '虹鳟')
  assert.equal(seahorse, null)
  assert.equal(clam, null)
})

test('复核不匹配的七类商品后使用各自专用图片', () => {
  const expectedImages = {
    'salmon-byproducts': '/assets/products/salmon-byproducts.jpg',
    'norway-salmon-fry': '/assets/products/salmon-fry.jpg',
    'salmon-vaccine': '/assets/products/salmon-vaccine.jpg',
    'salmon-feed': '/assets/products/salmon-feed.jpg',
    'aquaculture-cage': '/assets/products/aquaculture-cage.jpg',
    'salmon-cakes': '/assets/products/salmon-cakes.jpg',
    'salmon-prepared-meal': '/assets/products/salmon-prepared-meal.jpg',
  }

  for (const [id, image] of Object.entries(expectedImages)) {
    assert.equal(industryProductData.findIndustryProduct(id)?.image, image)
  }
})

test('新增商品引用的本地图片均存在', async () => {
  const newProductIds = [
    'rainbow-trout-whole',
    'norway-salmon-eggs',
    'us-rainbow-trout-eggs',
    'us-rainbow-trout-fry',
  ]

  for (const id of newProductIds) {
    const product = industryProductData.findIndustryProduct(id)
    assert.ok(product, `${id}需要商品数据`)
    await access(path.join(process.cwd(), 'public', product.image.slice(1)))
  }
})

test('统一大厅同时支持商品分区预筛选和关键词搜索', () => {
  assert.ok(industryProductData, '需要提供全产业链商品数据模块')
  const { filterIndustryProducts, industryProducts } = industryProductData
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'aquaculture', keyword: '' }).map(({ category }) => category),
    ['鱼卵', '鱼卵', '鱼苗', '鱼苗', '鱼药疫苗', '饲料', '养殖设备'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'all', keyword: '青岛' }).map(({ id }) => id),
    ['norway-salmon-eggs', 'norway-salmon-fry', 'smoked-salmon'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'processed', keyword: '预制菜' }).map(({ id }) => id),
    ['salmon-prepared-meal'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'all', keyword: '美国' }).map(({ id }) => id),
    ['us-rainbow-trout-eggs', 'us-rainbow-trout-fry'],
  )
  assert.deepEqual(
    filterIndustryProducts(industryProducts, { section: 'all', keyword: '虹鳟' }).map(({ id }) => id),
    ['rainbow-trout-whole', 'us-rainbow-trout-eggs', 'us-rainbow-trout-fry'],
  )
})

test('旧全产业链链接映射到合并后的商品分区', () => {
  assert.equal(industryProductData.mapLegacyProductStage('upstream'), 'aquaculture')
  assert.equal(industryProductData.mapLegacyProductStage('midstream'), 'fresh')
  assert.equal(industryProductData.mapLegacyProductStage('downstream'), 'processed')
  assert.equal(industryProductData.mapLegacyProductStage('unknown'), 'fresh')
})
