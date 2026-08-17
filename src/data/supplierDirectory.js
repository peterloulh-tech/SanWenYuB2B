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

export function mergeSupplierDirectory(entries = supplierDirectory) {
  const merged = new Map()

  entries.forEach((supplier) => {
    const current = merged.get(supplier.id) || {
      ...supplier,
      section: 'all',
      categories: [],
      productNames: [],
    }

    supplier.categories.forEach((category) => {
      if (!current.categories.includes(category)) current.categories.push(category)
    })
    supplier.productNames.forEach((productName) => {
      if (!current.productNames.includes(productName)) current.productNames.push(productName)
    })
    current.productCount = current.productNames.length
    merged.set(supplier.id, current)
  })

  return [...merged.values()]
}

export function filterSupplierDirectory({ section = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  const directory = section === 'all'
    ? mergeSupplierDirectory()
    : supplierDirectory.filter((supplier) => supplier.section === section)

  return directory.filter((supplier) => {
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
