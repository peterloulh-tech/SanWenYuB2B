import { industryProducts } from './industryProducts.js'

export const homeFeaturedProductIds = [
  'fresh-whole-salmon',
  'salmon-fillet',
  'salmon-slices',
  'salmon-byproducts',
  'rainbow-trout-whole',
  'smoked-salmon',
  'salmon-cakes',
  'salmon-prepared-meal',
]

const productsById = new Map(industryProducts.map((product) => [product.id, product]))

export const homeFeaturedProducts = homeFeaturedProductIds
  .map((id) => productsById.get(id))
  .filter(Boolean)
