import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { filterIndustryServices, industryServices } from '../src/data/industryServices.js'
import { filterRetailProducts, retailProducts } from '../src/data/retailData.js'

test('零售商品支持跨分类搜索和分类收窄', () => {
  assert.deepEqual(
    filterRetailProducts(retailProducts, { category: 'all', keyword: '三文鱼' }).map(({ id }) => id),
    ['fresh-salmon-center', 'salmon-sashimi', 'smoked-salmon', 'pan-seared-salmon-steak', 'teriyaki-salmon-meal', 'salmon-family-gift-box', 'salmon-festival-gift-box'],
  )
  assert.deepEqual(
    filterRetailProducts(retailProducts, { category: 'salmon-meals', keyword: '' }).map(({ id }) => id),
    ['pan-seared-salmon-steak', 'teriyaki-salmon-meal'],
  )
})

test('产业服务关键词可跨六类搜索', () => {
  assert.deepEqual(
    filterIndustryServices(industryServices, { category: 'all', keyword: '日照' }).map(({ id }) => id),
    ['salmon-processing', 'quality-inspection', 'frozen-warehousing', 'cold-chain-transport', 'coastal-shipping'],
  )
})

test('采购、订单和零售页的手动与语音搜索共用综合范围', async () => {
  const [procurement, orders, retail] = await Promise.all([
    readFile(new URL('../src/pages/ProcurementPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/OrdersPage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/RetailHomePage.jsx', import.meta.url), 'utf8'),
  ])

  assert.match(procurement, /setProductType\('全部产品'\)/)
  assert.match(procurement, /setDeliveryCity\('全部地区'\)/)
  assert.match(procurement, /setStatus\('全部状态'\)/)
  assert.match(procurement, /filteredDemands\.length === 0/)
  assert.match(orders, /setStatus\('全部订单'\)/)
  assert.match(orders, /filteredOrders\.length === 0/)
  assert.match(retail, /setCategory\('all'\)/)
  assert.match(retail, /products\.length === 0/)
})

test('七个 PC 搜索入口共用首页连体搜索样式', async () => {
  const pagePaths = [
    '../src/pages/HomePage.jsx',
    '../src/pages/IndustryProductsPage.jsx',
    '../src/pages/SuppliersPage.jsx',
    '../src/pages/IndustryServicesPage.jsx',
    '../src/pages/ProcurementPage.jsx',
    '../src/pages/OrdersPage.jsx',
    '../src/pages/RetailHomePage.jsx',
  ]
  const [pages, styles] = await Promise.all([
    Promise.all(pagePaths.map((pagePath) => readFile(new URL(pagePath, import.meta.url), 'utf8'))),
    readFile(new URL('../src/styles/refinement-overrides.css', import.meta.url), 'utf8'),
  ])

  pages.forEach((page) => assert.match(page, /platform-search/))
  assert.match(pages[0], /className="hero-search-stack"/)
  assert.match(pages[4], /<button type="submit">搜索<\/button>/)
  assert.match(styles, /\.platform-search\s*\{[^}]*border: 1\.5px solid var\(--platform-search-border\)/s)
  assert.match(styles, /\.platform-search > button\s*\{[^}]*border-left: 1px solid var\(--platform-search-border\)/s)
  assert.match(styles, /\.platform-search > button\s*\{[^}]*justify-content: center/s)
  assert.match(styles, /\.hero-search-stack > \.hero-search\s*\{[^}]*width: clamp\(460px, 30vw, 580px\)[^}]*grid-column: 1/s)
})
