import { enterpriseProductSections, industryProducts } from './industryProducts.js'

const supplierIds = new Map()

industryProducts.forEach((product) => {
  if (!supplierIds.has(product.supplier)) supplierIds.set(product.supplier, supplierIds.size + 1)
})

export const supplierDirectory = enterpriseProductSections.flatMap((section) => {
  const sectionSuppliers = new Map()

  industryProducts
    .filter((product) => product.section === section.id)
    .forEach((product) => {
      const supplier = sectionSuppliers.get(product.supplier) || {
        id: supplierIds.get(product.supplier),
        name: product.supplier,
        region: product.region,
        section: section.id,
        categories: [],
        productNames: [],
      }

      if (!supplier.categories.includes(product.category)) supplier.categories.push(product.category)
      supplier.productNames.push(product.name)
      sectionSuppliers.set(product.supplier, supplier)
    })

  return [...sectionSuppliers.values()].map((supplier) => ({
    ...supplier,
    productCount: supplier.productNames.length,
  }))
})

export const supplierCounts = Object.fromEntries(
  enterpriseProductSections.map((section) => [
    section.id,
    supplierDirectory.filter((supplier) => supplier.section === section.id).length,
  ]),
)

export function filterSupplierDirectory({ section = 'fresh', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()

  return supplierDirectory.filter((supplier) => {
    if (supplier.section !== section) return false
    if (!normalizedKeyword) return true

    const searchable = [
      supplier.name,
      supplier.region,
      ...supplier.categories,
      ...supplier.productNames,
    ].join(' ').toLowerCase()

    return searchable.includes(normalizedKeyword)
  })
}
