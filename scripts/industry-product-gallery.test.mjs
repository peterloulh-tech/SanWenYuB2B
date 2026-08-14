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
  test(`${section.name}的每个当前商品卡片都展示对应商品图片`, () => {
    const products = industryProducts.filter((product) => product.section === section.id)
    const entry = section.id === 'fresh' ? '/products' : `/products?section=${section.id}`
    const html = renderToStaticMarkup(
      createElement(MemoryRouter, { initialEntries: [entry] }, createElement(IndustryProductsPage)),
    )

    for (const product of products) {
      assert.match(
        html,
        new RegExp(`<img[^>]+src="${product.image}"[^>]+alt="${product.name}"`),
        `${product.name}需要显示商品图片`,
      )
    }
  })
}
