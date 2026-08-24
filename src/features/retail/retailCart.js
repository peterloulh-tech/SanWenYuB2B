import { findRetailProduct } from '../../data/retailData.js'

const DEFAULT_CART = [
  { productId: 'fresh-salmon-center', quantity: 1 },
  { productId: 'pan-seared-salmon-steak', quantity: 2 },
]

export function clampRetailQuantity(quantity) {
  const number = Number.parseInt(quantity, 10)
  if (!Number.isFinite(number)) return 1
  return Math.min(9, Math.max(1, number))
}

export function buildDemoCart(productId, quantity = 1) {
  const requestedProduct = findRetailProduct(productId)
  const candidates = requestedProduct
    ? [{ productId: requestedProduct.id, quantity }, ...DEFAULT_CART]
    : DEFAULT_CART
  const uniqueItems = []

  for (const item of candidates) {
    if (uniqueItems.some(({ product }) => product.id === item.productId)) continue
    const product = findRetailProduct(item.productId)
    if (product) uniqueItems.push({ product, quantity: clampRetailQuantity(item.quantity), selected: true })
    if (uniqueItems.length === 2) break
  }

  return uniqueItems
}

export function calculateRetailCart(items) {
  const selectedItems = items.filter(item => item.selected)
  const goodsAmount = selectedItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const roundedGoodsAmount = Math.round(goodsAmount * 100) / 100
  const shippingFee = selectedItems.length ? 8 : 0

  return {
    selectedKinds: selectedItems.length,
    selectedQuantity: selectedItems.reduce((total, item) => total + item.quantity, 0),
    goodsAmount: roundedGoodsAmount,
    shippingFee,
    payableAmount: Math.round((roundedGoodsAmount + shippingFee) * 100) / 100,
  }
}
