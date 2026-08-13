import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('页面链路文档记录已完成的消费零售路由和主链路', async () => {
  const pagesAndFlows = await readFile(new URL('docs/PAGES_AND_FLOWS.md', root), 'utf8')
  const currentPages = pagesAndFlows.match(/## 当前已有页面([\s\S]*?)## 当前主要业务链路/)?.[1] ?? ''
  const currentFlows = pagesAndFlows.match(/## 当前主要业务链路([\s\S]*?)## (?:待建设|计划新增)链路/)?.[1] ?? ''
  const pendingFlows = pagesAndFlows.match(/## (?:待建设|计划新增)链路([\s\S]*)/)?.[1] ?? ''

  for (const route of ['/retail', '/retail/products/:id', '/retail/cart', '/retail/checkout', '/retail/order-success']) {
    assert.equal(currentPages.includes(`\`${route}\``), true, `当前页面清单缺少 ${route}`)
  }

  assert.match(currentFlows, /### 消费零售/)
  assert.doesNotMatch(pendingFlows, /B2C 消费零售|全产业链供应与采购后续链路/)
})
