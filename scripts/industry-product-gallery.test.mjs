import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { createServer } from 'vite'
import { enterpriseProductSections, industryProducts } from '../src/data/industryProducts.js'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const { default: IndustryProductsPage } = await vite.ssrLoadModule('/src/pages/IndustryProductsPage.jsx')
const { default: ProductDetailPage } = await vite.ssrLoadModule('/src/pages/ProductDetailPage.jsx')

const renderProductDetail = (path) => renderToStaticMarkup(
  createElement(MemoryRouter, { initialEntries: [path] },
    createElement(Routes, null, createElement(Route, { path: '/products/:id', element: createElement(ProductDetailPage) })),
  ),
)

test.after(async () => {
  await vite.close()
})

for (const section of enterpriseProductSections) {
  test(`${section.name}的每个当前商品卡片都使用顶部图片和名称行细分类标签`, () => {
    const products = industryProducts.filter((product) => product.section === section.id)
    const entry = `/products?section=${section.id}`
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: [entry] }, createElement(IndustryProductsPage)),
    )

    for (const product of products) {
      assert.match(
        html,
        new RegExp(`<div class="industry-product-image"><img[^>]+src="${product.image}"[^>]+alt="${product.name}"/></div>`),
        `${product.name}需要继续使用顶部整幅商品图片`,
      )
      assert.match(
        html,
        new RegExp(`<div class="industry-product-title"><h2>${product.name}</h2><span>${product.category}</span></div>`),
        `${product.name}需要在名称行右端显示${product.category}细分类标签`,
      )
    }

    assert.doesNotMatch(html, /平台认证/, '商品图片不再显示平台认证角标')
  })
}

test('商品大厅卡片分别展示品种、产品产地和供应商所在地', () => {
  const product = industryProducts.find(({ id }) => id === 'fresh-whole-salmon')
  const html = renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: ['/products'] }, createElement(IndustryProductsPage)),
  )

  assert.match(html, new RegExp(`品种：${product.species}`))
  assert.match(html, new RegExp(`产品产地：${product.origin}`))
  assert.match(html, new RegExp(product.region))
})

test('商品大厅默认每页最多显示八项并提供三页分页', () => {
  const firstPageHtml = renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: ['/products'] }, createElement(IndustryProductsPage)),
  )
  const secondPageHtml = renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: ['/products?page=2'] }, createElement(IndustryProductsPage)),
  )

  for (const product of industryProducts.slice(0, 8)) assert.match(firstPageHtml, new RegExp(product.name))
  assert.doesNotMatch(firstPageHtml, new RegExp(industryProducts[8].name))
  for (const product of industryProducts.slice(8, 16)) assert.match(secondPageHtml, new RegExp(product.name))
  assert.doesNotMatch(secondPageHtml, new RegExp(industryProducts[0].name))
  assert.match(firstPageHtml, /aria-label="商品分页"/)
  assert.match(firstPageHtml, /aria-current="page"[^>]*>1</)
  assert.match(firstPageHtml, />2<\/button>/)
  assert.match(firstPageHtml, />3<\/button>/)
  assert.doesNotMatch(firstPageHtml, /共 21 项静态演示商品/)
})

test('商品详情字段使用成对并排的字段和值结构', () => {
  const product = industryProducts[0]
  const html = renderToStaticMarkup(
    createElement(MemoryRouter, { initialEntries: ['/products'] }, createElement(IndustryProductsPage)),
  )

  assert.match(html, new RegExp(`<dt>规格</dt><dd title="${product.spec}">：<strong>${product.spec}</strong></dd>`))
  assert.match(html, new RegExp(`<dt>起订量</dt><dd title="${product.minOrder}">：<strong>${product.minOrder}</strong></dd>`))
  assert.match(html, new RegExp(`<dt>参考价</dt><dd title="${product.price}">：<strong class="price">${product.price}</strong></dd>`))
  assert.match(html, new RegExp(`<dt>供应能力</dt><dd title="${product.supply}">：<strong>${product.supply}</strong></dd>`))
})

test('鱼卵详情展示种源国家、发育阶段和枚计价单位', () => {
  const html = renderProductDetail('/products/norway-salmon-eggs')

  assert.match(html, /种源国家：　挪威/)
  assert.match(html, /发育阶段：　发眼期/)
  assert.match(html, /计价单位：　枚/)
  assert.match(html, /供应商所在地：　山东青岛/)
})

test('海马详情醒目展示资质审核和合法来源提示', () => {
  const html = renderProductDetail('/products/farmed-dried-seahorse')

  assert.match(html, /资质审核/)
  assert.match(html, /合法来源/)
  assert.match(html, /提交询价/)
})
