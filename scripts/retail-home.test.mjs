import test from 'node:test'
import assert from 'node:assert/strict'
import { retailCategories, retailProducts } from '../src/data/retailData.js'
import { IDENTITIES, getIdentityLandingPath } from '../src/features/identity/identityPolicy.js'

test('消费零售首页提供四个清晰分类', () => {
  assert.deepEqual(
    retailCategories.map(({ name }) => name),
    ['冰鲜三文鱼', '三文鱼加工品', '三文鱼预制菜', '三文鱼礼盒'],
  )
})

test('热门推荐展示七件图文规格和价格完整的商品', () => {
  assert.deepEqual(
    retailProducts.map(({ name, spec, price, unit, detailPath }) => ({ name, spec, price, unit, detailPath })),
    [
      { name: '冰鲜三文鱼中段', spec: '300g/盒', price: 49.9, unit: '盒', detailPath: '/retail/products/fresh-salmon-center' },
      { name: '三文鱼刺身切片', spec: '200g/盒', price: 39.9, unit: '盒', detailPath: '/retail/products/salmon-sashimi' },
      { name: '低温烟熏三文鱼', spec: '100g/袋', price: 29.9, unit: '袋', detailPath: '/retail/products/smoked-salmon' },
      { name: '三文鱼香煎鱼排', spec: '250g/盒', price: 45.9, unit: '盒', detailPath: '/retail/products/pan-seared-salmon-steak' },
      { name: '三文鱼照烧料理包', spec: '300g/盒', price: 39.9, unit: '盒', detailPath: '/retail/products/teriyaki-salmon-meal' },
      { name: '三文鱼家庭分享礼盒', spec: '1.2kg/箱', price: 199, unit: '箱', detailPath: '/retail/products/salmon-family-gift-box' },
      { name: '三文鱼节庆臻选礼盒', spec: '2kg/箱', price: 299, unit: '箱', detailPath: '/retail/products/salmon-festival-gift-box' },
    ],
  )

  for (const product of retailProducts) {
    assert.ok(product.name)
    assert.ok(product.spec)
    assert.ok(product.price > 0)
    assert.ok(product.unit)
    assert.match(product.image, /^\/assets\/(?:retail|products)\/.+\.(?:png|jpg)$/)
  }
})

test('身份切换进入对应交易首页', () => {
  assert.equal(getIdentityLandingPath(IDENTITIES.ENTERPRISE), '/')
  assert.equal(getIdentityLandingPath(IDENTITIES.PERSONAL), '/retail')
})
