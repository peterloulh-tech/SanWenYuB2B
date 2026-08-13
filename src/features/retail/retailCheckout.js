import { findRetailProduct } from '../../data/retailData.js'
import { buildDemoCart, clampRetailQuantity } from './retailCart.js'

export function serializeRetailCheckoutItems(items) {
  return items
    .filter(item => item.selected)
    .map(item => `${item.product.id}:${clampRetailQuantity(item.quantity)}`)
    .join(',')
}

export function parseRetailCheckoutItems(serializedItems) {
  if (!serializedItems) return buildDemoCart()

  const items = []
  for (const entry of serializedItems.split(',')) {
    const [productId, quantity] = entry.split(':')
    const product = findRetailProduct(productId)
    if (!product || items.some(item => item.product.id === product.id)) continue
    items.push({ product, quantity: clampRetailQuantity(quantity), selected: true })
  }

  return items.length ? items : buildDemoCart()
}

export function validateRetailCheckoutAddress(address) {
  const errors = {}
  if (!address.name.trim()) errors.name = '请输入收货人姓名'
  if (!address.phone.trim()) {
    errors.phone = '请输入手机号码'
  } else if (!/^1\d{10}$/.test(address.phone.replace(/[\s-]/g, ''))) {
    errors.phone = '请输入正确的 11 位手机号码'
  }
  if (!address.region.trim()) errors.region = '请选择所在地区'
  if (!address.address.trim()) errors.address = '请输入详细地址'
  return errors
}
