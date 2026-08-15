import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('供应商大厅使用横幅搜索和三列两排紧凑企业卡片', async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL('../src/pages/SuppliersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/suppliers-page.css', import.meta.url), 'utf8'),
  ])

  assert.match(page, /action=\{searchAction\}/)
  assert.match(page, /className="supplier-hero-search"/)
  assert.match(page, /new FormData\(event\.currentTarget\)/)
  assert.match(page, /event\.key !== 'Enter'/)
  assert.match(page, /supplier\.name, supplier\.region, \.\.\.supplier\.products/)
  assert.match(page, /className="supplier-enterprise-grid"/)
  assert.match(page, /未找到匹配供应商/)
  assert.match(styles, /\.suppliers-page \.sub-hero \{\s*height: 112px;/)
  assert.match(styles, /grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(styles, /height: 220px;/)
  assert.doesNotMatch(page, /filter-card|list-search/)
})
