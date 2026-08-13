import test from 'node:test'
import assert from 'node:assert/strict'
import { retailCategories, retailProducts } from '../src/data/retailData.js'
import { IDENTITIES, getIdentityLandingPath } from '../src/features/identity/identityPolicy.js'

test('消费零售首页提供四个清晰分类', () => {
  assert.deepEqual(
    retailCategories.map(({ name }) => name),
    ['冰鲜三文鱼', '鱼类加工品', '其他海产', '海鲜礼盒'],
  )
})

test('热门推荐展示七件图文规格和价格完整的商品', () => {
  assert.deepEqual(
    retailProducts.map(({ name, spec, price, unit, detailPath }) => ({ name, spec, price, unit, detailPath })),
    [
      { name: '冰鲜三文鱼中段', spec: '300g/盒', price: 49.9, unit: '盒', detailPath: '/retail/products/fresh-salmon-center' },
      { name: '三文鱼刺身切片', spec: '200g/盒', price: 39.9, unit: '盒', detailPath: '/retail/products/salmon-sashimi' },
      { name: '低温烟熏三文鱼', spec: '100g/袋', price: 29.9, unit: '袋', detailPath: '/retail/products/smoked-salmon' },
      { name: '蒜蓉粉丝扇贝', spec: '200g/盒', price: 32.9, unit: '盒', detailPath: '/retail/products/garlic-scallops' },
      { name: '日照海鲜家庭礼盒', spec: '2.5kg/箱', price: 199, unit: '箱', detailPath: '/retail/products/seafood-family-gift-box' },
      { name: '日照海捕大虾', spec: '500g/盒', price: 59.9, unit: '盒', detailPath: '/retail/products/rizhao-prawns' },
      { name: '鲜活梭子蟹', spec: '500g/盒', price: 79.9, unit: '盒', detailPath: '/retail/products/swimming-crab' },
    ],
  )

  for (const product of retailProducts) {
    assert.ok(product.name)
    assert.ok(product.spec)
    assert.ok(product.price > 0)
    assert.ok(product.unit)
    assert.match(product.image, /^\/assets\/retail\/.+\.png$/)
  }
})

test('身份切换进入对应交易首页', () => {
  assert.equal(getIdentityLandingPath(IDENTITIES.ENTERPRISE), '/')
  assert.equal(getIdentityLandingPath(IDENTITIES.PERSONAL), '/retail')
})
