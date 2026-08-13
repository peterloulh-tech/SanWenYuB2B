import assert from 'node:assert/strict'
import test from 'node:test'

import { calculateRetailCart } from '../src/features/retail/retailCart.js'
import {
  buildRetailOrderSuccessSearch,
  parseRetailCheckoutItems,
  parseRetailOrderSuccess,
  serializeRetailCheckoutItems,
  validateRetailCheckoutAddress,
} from '../src/features/retail/retailCheckout.js'

test('结算参数只保留已勾选商品及其数量', () => {
  const serialized = serializeRetailCheckoutItems([
    { product: { id: 'fresh-salmon-center' }, quantity: 2, selected: true },
    { product: { id: 'rizhao-prawns' }, quantity: 4, selected: false },
  ])

  assert.equal(serialized, 'fresh-salmon-center:2')
})

test('结算页还原商品后与购物车使用相同金额规则', () => {
  const items = parseRetailCheckoutItems('swimming-crab:3,fresh-salmon-center:1')

  assert.deepEqual(items.map(item => [item.product.id, item.quantity, item.selected]), [
    ['swimming-crab', 3, true],
    ['fresh-salmon-center', 1, true],
  ])
  assert.deepEqual(calculateRetailCart(items), {
    selectedKinds: 2,
    selectedQuantity: 4,
    goodsAmount: 289.6,
    shippingFee: 8,
    payableAmount: 297.6,
  })
})

test('结算地址为空或手机号不正确时返回明确中文提示', () => {
  assert.deepEqual(validateRetailCheckoutAddress({ name: '', phone: '', region: '', address: '' }), {
    name: '请输入收货人姓名',
    phone: '请输入手机号码',
    region: '请选择所在地区',
    address: '请输入详细地址',
  })

  assert.equal(validateRetailCheckoutAddress({
    name: '张海燕',
    phone: '1234',
    region: '山东省 日照市 东港区',
    address: '海曲东路 88 号',
  }).phone, '请输入正确的 11 位手机号码')
})

test('下单完成页从结算参数还原收货人、数量和应付金额', () => {
  const search = buildRetailOrderSuccessSearch([
    { product: { id: 'fresh-salmon-center' }, quantity: 1, selected: true },
    { product: { id: 'rizhao-prawns' }, quantity: 2, selected: true },
  ], '张海燕')

  assert.equal(search, 'items=fresh-salmon-center%3A1%2Crizhao-prawns%3A2&recipient=%E5%BC%A0%E6%B5%B7%E7%87%95')
  assert.deepEqual(parseRetailOrderSuccess(new URLSearchParams(search)), {
    orderNumber: 'LS202608130018',
    recipient: '张海燕',
    selectedKinds: 2,
    selectedQuantity: 3,
    payableAmount: 177.7,
    estimatedArrival: '预计明日 18:00 前送达',
  })
})
