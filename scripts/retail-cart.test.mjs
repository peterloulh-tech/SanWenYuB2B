import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildDemoCart,
  calculateRetailCart,
  clampRetailQuantity,
} from '../src/features/retail/retailCart.js'

test('直接进入购物车时提供两件互不重复的演示商品', () => {
  const cart = buildDemoCart()

  assert.equal(cart.length, 2)
  assert.equal(new Set(cart.map(({ product }) => product.id)).size, 2)
  assert.deepEqual(cart.map(({ quantity, selected }) => ({ quantity, selected })), [
    { quantity: 1, selected: true },
    { quantity: 2, selected: true },
  ])
})

test('详情页商品和数量成为购物车第一项并限制在一到九件', () => {
  const cart = buildDemoCart('swimming-crab', 20)

  assert.equal(cart[0].product.id, 'swimming-crab')
  assert.equal(cart[0].quantity, 9)
  assert.notEqual(cart[1].product.id, 'swimming-crab')
  assert.equal(clampRetailQuantity(-2), 1)
  assert.equal(clampRetailQuantity(4), 4)
  assert.equal(clampRetailQuantity(12), 9)
})

test('金额汇总只计算勾选商品并在有选中商品时加入演示运费', () => {
  const summary = calculateRetailCart([
    { product: { price: 49.9 }, quantity: 2, selected: true },
    { product: { price: 39.9 }, quantity: 3, selected: false },
  ])

  assert.deepEqual(summary, {
    selectedKinds: 1,
    selectedQuantity: 2,
    goodsAmount: 99.8,
    shippingFee: 8,
    payableAmount: 107.8,
  })

  assert.deepEqual(calculateRetailCart([]), {
    selectedKinds: 0,
    selectedQuantity: 0,
    goodsAmount: 0,
    shippingFee: 0,
    payableAmount: 0,
  })
})
