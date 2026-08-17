import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { homeFeaturedProductIds, homeFeaturedProducts } from '../src/data/homeFeaturedProducts.js'
import { findIndustryProduct } from '../src/data/industryProducts.js'

test('首页热门现货复用八项统一企业商品数据', () => {
  assert.equal(homeFeaturedProductIds.length, 8)
  assert.equal(new Set(homeFeaturedProductIds).size, 8)
  assert.equal(homeFeaturedProducts.length, 8)

  for (const product of homeFeaturedProducts) {
    assert.equal(product, findIndustryProduct(product.id))
    assert.ok(product.name)
    assert.ok(product.origin)
    assert.ok(product.productForm)
    assert.ok(product.spec)
    assert.ok(product.price)
  }
})

test('首页热门现货提供无缝滚动、暂停和减少动态效果', async () => {
  const [page, service, styles] = await Promise.all([
    readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/services/homeService.js', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/home-page.css', import.meta.url), 'utf8'),
  ])

  assert.match(service, /products: homeFeaturedProducts/)
  assert.doesNotMatch(service, /products\.slice\(0, 4\)/)
  assert.match(page, /className="home-product-track"/)
  assert.match(page, /\[false,true\]\.map/)
  assert.match(page, /aria-hidden=\{duplicate\}/)
  assert.match(page, /tabIndex=\{duplicate \? -1 : undefined\}/)
  assert.match(page, /产地：\{product\.origin\}/)
  assert.match(page, /形态：\{product\.productForm\}/)
  assert.doesNotMatch(page, /<small>\/kg<\/small>/)
  assert.match(styles, /animation: homeProductScroll 32s linear infinite/)
  assert.match(styles, /home-product-marquee:hover[\s\S]*home-product-marquee:focus-within[\s\S]*animation-play-state: paused/)
  assert.match(styles, /prefers-reduced-motion: reduce[\s\S]*home-product-track \{ animation: none; \}[\s\S]*aria-hidden="true"/)
})

test('首页核心信息区与第二排快捷入口使用相同四列边界', async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/home-page.css', import.meta.url), 'utf8'),
  ])

  assert.doesNotMatch(page, /className="home-panel market-panel"/)
  assert.match(styles, /\.home-dashboard\{[^}]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/)
  assert.match(styles, /\.hot-panel\{grid-column:span 2\}/)
  assert.match(styles, /\.home-panel>header a\{[^}]*font-size:14px/)
})

test('首页采购需求和供应商记录使用两行大字信息布局', async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL('../src/pages/HomePage.jsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/home-page.css', import.meta.url), 'utf8'),
  ])

  assert.match(page, /<span className="home-row-meta"><p>\{d\.amount\} · \{d\.city\}<\/p><small>截止 \{d\.deadline\}<\/small><\/span>/)
  assert.match(page, /<span className="home-row-meta"><p>整鱼\/鱼柳\/切片<\/p><small>\{\['日照市'/)
  assert.doesNotMatch(page, /截止时间：/)
  assert.doesNotMatch(page, /主营：整鱼、鱼柳、切片/)
  assert.match(styles, /\.home-demand-row b,[\s\S]*\.home-supplier-row b \{[\s\S]*font-size: 15px;/)
  assert.match(styles, /\.home-row-meta p,[\s\S]*\.home-row-meta small \{[\s\S]*font-size: 12px;/)
  assert.match(styles, /\.home-demand-row > span \{[\s\S]*font-size: 12px;/)
  assert.match(styles, /\.home-supplier-row > em \{[\s\S]*font-size: 12px;/)
})
