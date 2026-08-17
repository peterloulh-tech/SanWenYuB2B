import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { filterSupplierDirectory, mergeSupplierDirectory, supplierCounts, supplierDirectory } from '../src/data/supplierDirectory.js'

test('供应商目录从统一商品库生成四类十九家企业', () => {
  assert.deepEqual(supplierCounts, { fresh: 5, aquaculture: 6, processed: 3, seafood: 6 })
  assert.equal(supplierDirectory.length, 20)
  assert.equal(new Set(supplierDirectory.map((supplier) => supplier.name)).size, 19)

  const crossSectionSupplier = supplierDirectory.filter((supplier) => supplier.name === '日照鲜港水产有限公司')
  assert.deepEqual(crossSectionSupplier.map((supplier) => supplier.section), ['fresh', 'seafood'])
  assert.equal(filterSupplierDirectory({ section: 'aquaculture', keyword: '鱼苗' }).length, 2)
  assert.equal(filterSupplierDirectory({ section: 'processed', keyword: '威海' }).length, 0)

  const mergedDirectory = mergeSupplierDirectory()
  assert.equal(mergedDirectory.length, 19)
  const mergedCrossSectionSupplier = mergedDirectory.find((supplier) => supplier.name === '日照鲜港水产有限公司')
  assert.equal(mergedCrossSectionSupplier.productCount, 2)
  assert.deepEqual(mergedCrossSectionSupplier.productNames, ['三文鱼骨及鱼头原料', '鲜活梭子蟹'])
  assert.equal(filterSupplierDirectory({ section: 'all', keyword: '日照鲜港' }).length, 1)
})

test('供应商大厅使用横幅搜索和三列两排紧凑企业卡片', async () => {
  const [page, productPage, styles, sectionCards] = await Promise.all([
    readFile(new URL('../src/pages/SuppliersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/IndustryProductsPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/suppliers-page.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/business/EnterpriseSectionCards.jsx', import.meta.url), 'utf8'),
  ])

  assert.match(page, /action=\{searchAction\}/)
  assert.match(page, /className="supplier-hero-search platform-search"/)
  assert.match(page, /const \[section, setSection\] = useState\('all'\)/)
  assert.match(page, /setSection\('all'\)/)
  assert.match(page, /value=\{keywordInput\}/)
  assert.match(page, /<EnterpriseSectionCards/)
  assert.match(productPage, /<EnterpriseSectionCards/)
  assert.match(page, /countUnit="家"/)
  assert.match(productPage, /countUnit="类"/)
  assert.match(page, /filterSupplierDirectory\(\{ section, keyword \}\)/)
  assert.match(page, /section === nextSection \? 'all' : nextSection/)
  assert.match(page, /<SiliconAssistant onSearch=\{executeSearch\}\/>/)
  assert.match(page, /className="supplier-enterprise-grid"/)
  assert.match(page, /未找到匹配供应商/)
  assert.match(sectionCards, /enterpriseProductSections\.map/)
  assert.match(sectionCards, /className="industry-stage-grid"/)
  assert.match(sectionCards, /aria-pressed=\{selected\}/)
  assert.match(styles, /\.suppliers-page \.sub-hero \{\s*height: 112px;/)
  assert.match(styles, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(styles, /height: 220px;/)
  assert.doesNotMatch(page, /mockData|filter-card|list-search/)
})
