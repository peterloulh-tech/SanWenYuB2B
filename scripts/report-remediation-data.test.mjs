import assert from 'node:assert/strict'
import test from 'node:test'

const [industryData, retailData, traceabilityData, kitchenData, patentData, entityData] = await Promise.all([
  import('../src/data/industryProducts.js').catch(() => null),
  import('../src/data/retailData.js').catch(() => null),
  import('../src/data/traceability.js').catch(() => null),
  import('../src/data/salmonKitchen.js').catch(() => null),
  import('../src/data/patents.js').catch(() => null),
  import('../src/data/platformEntities.js').catch(() => null),
])

test('企业前台只保留三文鱼全产业链三类可见商品', () => {
  assert.ok(industryData)
  assert.deepEqual(industryData.enterpriseProductSections.map(({ id }) => id), ['fresh', 'aquaculture', 'processed'])
  assert.equal(industryData.industryProducts.some(({ section }) => section === 'seafood'), false)
  assert.equal(industryData.findIndustryProduct('sea-prawns'), null)

  const traceableProducts = industryData.industryProducts.filter(({ traceBatchCode }) => traceBatchCode)
  assert.deepEqual(traceableProducts.map(({ name }) => name), [
    '日照深海三文鱼整鱼',
    '日照深海三文鱼鱼柳',
    '日照深海三文鱼切片',
  ])
})

test('个人消费目录为四类七件纯三文鱼演示商品', () => {
  assert.ok(retailData)
  assert.deepEqual(retailData.retailCategories.map(({ name }) => name), [
    '冰鲜三文鱼',
    '三文鱼加工品',
    '三文鱼预制菜',
    '三文鱼礼盒',
  ])
  assert.equal(retailData.retailProducts.length, 7)
  assert.deepEqual(
    retailData.retailCategories.map(({ id }) => retailData.retailProducts.filter(({ category }) => category === id).length),
    [1, 2, 2, 2],
  )
  assert.ok(retailData.retailProducts.every(({ demo }) => demo === true))
  assert.equal(retailData.findRetailProduct('garlic-scallops'), null)
})

test('溯源查询只返回三条独立演示批次的基础字段', () => {
  assert.ok(traceabilityData, '需要提供简单批次溯源数据模块')
  assert.equal(traceabilityData.traceabilityBatches.length, 3)
  const batch = traceabilityData.findTraceabilityBatch('RZ-SALMON-202608-001')
  assert.equal(batch?.productName, '日照深海三文鱼整鱼')
  assert.equal(batch?.producer, '山东万泽丰海洋开发集团有限公司')
  assert.deepEqual(Object.keys(batch), [
    'batchCode', 'productName', 'species', 'producer', 'farmLocation', 'harvestDate', 'qualityStatus', 'dataSource', 'updatedAt',
  ])
  assert.equal(traceabilityData.findTraceabilityBatch('UNKNOWN'), null)
})

test('厨房提供六道菜、详情查找与商品关联', () => {
  assert.ok(kitchenData, '需要提供三文鱼厨房数据模块')
  assert.deepEqual(kitchenData.salmonRecipes.map(({ name }) => name), [
    '香煎三文鱼', '空气炸锅三文鱼', '烤箱三文鱼', '三文鱼沙拉', '三文鱼炒饭', '三文鱼粥',
  ])
  const recipe = kitchenData.findSalmonRecipe('pan-seared-salmon')
  assert.ok(recipe.steps.length >= 3 && recipe.steps.length <= 5)
  assert.match(recipe.productPath, /^\/retail\/products\//)
  assert.equal(kitchenData.findSalmonRecipe('missing'), null)
})

test('专利演示数据支持方向筛选、详情与合作意向校验', () => {
  assert.ok(patentData, '需要提供专利成果演示数据模块')
  assert.equal(patentData.patentCategories.length, 5)
  assert.ok(patentData.demoPatents.length >= 5)
  assert.ok(patentData.demoPatents.every(({ demo, applicationNumber, owner, legalStatus }) => demo && !applicationNumber && !owner && !legalStatus))
  assert.deepEqual(
    patentData.filterPatents(patentData.demoPatents, { category: 'cold-chain', keyword: '' }).map(({ category }) => category),
    ['cold-chain'],
  )
  assert.equal(patentData.findPatent('missing'), null)
  assert.deepEqual(patentData.validatePatentInquiry({}), {
    contactName: '请填写联系人',
    phone: '请填写联系电话',
    cooperationMode: '请选择合作方式',
    intention: '请填写合作需求',
  })
  assert.deepEqual(patentData.validatePatentInquiry({ contactName: '张先生', phone: '13800138000', cooperationMode: '合作开发', intention: '希望了解技术适用范围' }), {})
})

test('平台承担主体只使用三家已确认完整名称', () => {
  assert.ok(entityData, '需要提供平台承担主体数据模块')
  assert.deepEqual(entityData.platformEntities.map(({ name }) => name), [
    '山东万泽丰海洋开发集团有限公司',
    '山东旭丰渔业有限公司',
    '日照深海三文鱼产业协会',
  ])
  assert.equal(entityData.findPlatformEntity('rizhao-salmon-association')?.type, '行业协会')
})
