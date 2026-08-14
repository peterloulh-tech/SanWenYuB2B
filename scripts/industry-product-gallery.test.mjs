import assert from 'node:assert/strict'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { enterpriseProductSections, industryProducts } from '../src/data/industryProducts.js'

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const { default: IndustryProductsPage } = await vite.ssrLoadModule('/src/pages/IndustryProductsPage.jsx')

test.after(async () => {
  await vite.close()
})

for (const section of enterpriseProductSections) {
  test(`${section.name}的每个当前商品卡片都使用顶部图片和细分类角标`, () => {
    const products = industryProducts.filter((product) => product.section === section.id)
    const entry = section.id === 'fresh' ? '/products' : `/products?section=${section.id}`
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: [entry] }, createElement(IndustryProductsPage)),
    )

    for (const product of products) {
      assert.match(
        html,
        new RegExp(`<div class="industry-product-image"><img[^>]+src="${product.image}"[^>]+alt="${product.name}"/><span>${product.category}</span></div>`),
        `${product.name}需要在顶部图片中显示${product.category}细分类角标`,
      )
    }

    assert.doesNotMatch(html, /平台认证/, '商品图片不再显示平台认证角标')
  })
}
