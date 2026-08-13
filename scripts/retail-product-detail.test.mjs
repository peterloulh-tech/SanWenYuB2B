import assert from 'node:assert/strict'
import test from 'node:test'

import * as retailData from '../src/data/retailData.js'

test('七件零售商品都具备详情页需要的演示信息', () => {
  assert.equal(retailData.retailProducts.length, 7)

  for (const product of retailData.retailProducts) {
    assert.ok(product.shortDescription)
    assert.ok(product.origin)
    assert.ok(product.delivery)
    assert.ok(product.arrival)
    assert.ok(product.coldChain)
    assert.ok(product.description)
    assert.ok(product.servingAdvice)
    assert.ok(product.storageAdvice)
    assert.ok(product.afterSales)
  }
})

test('商品详情按编号返回对应商品，未知编号返回空结果', () => {
  assert.equal(typeof retailData.findRetailProduct, 'function')
  assert.equal(retailData.findRetailProduct('salmon-sashimi')?.name, '三文鱼刺身切片')
  assert.equal(retailData.findRetailProduct('not-found'), null)
})

test('商品详情可以获得对应的中文分类名称', () => {
  assert.equal(typeof retailData.findRetailCategory, 'function')
  assert.equal(retailData.findRetailCategory('other-seafood')?.name, '其他海产')
  assert.equal(retailData.findRetailCategory('not-found'), null)
})
