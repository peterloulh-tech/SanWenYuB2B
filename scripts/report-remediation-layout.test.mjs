import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { after, test } from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { createServer } from 'vite'

const vite = await createServer({
  appType: 'custom',
  server: { hmr: false, middlewareMode: true },
})

const industryStyles = readFileSync(new URL('../src/styles/industry-services.css', import.meta.url), 'utf8')
const remediationStyles = readFileSync(new URL('../src/styles/report-remediation.css', import.meta.url), 'utf8')

after(async () => {
  await vite.close()
})

const [
  { default: HomePage },
  { default: IndustryServicesPage },
  { default: PatentsPage },
  { default: ProcurementPage },
  { default: SiteHeader },
] = await Promise.all([
  vite.ssrLoadModule('/src/pages/HomePage.jsx'),
  vite.ssrLoadModule('/src/pages/IndustryServicesPage.jsx'),
  vite.ssrLoadModule('/src/pages/PatentsPage.jsx'),
  vite.ssrLoadModule('/src/pages/ProcurementPage.jsx'),
  vite.ssrLoadModule('/src/components/layout/SiteHeader.jsx'),
])

function render(Component, path = '/') {
  return renderToStaticMarkup(
    React.createElement(
      MemoryRouter,
      { initialEntries: [path] },
      React.createElement(Component),
    ),
  )
}

function region(html, startMarker, endMarker = '</section>') {
  const start = html.indexOf(startMarker)
  assert.notEqual(start, -1, `缺少布局区域：${startMarker}`)
  const end = html.indexOf(endMarker, start)
  assert.notEqual(end, -1, `布局区域未闭合：${startMarker}`)
  return html.slice(start, end + endMarker.length)
}

test('企业首页按口号、无图标官方渠道、搜索框的顺序渲染', () => {
  const html = render(HomePage)
  const slogan = html.indexOf('端稳中国海洋饭碗·挺起国产三文鱼脊梁')
  const official = html.indexOf('<div class="official-channel-mark">')
  const search = html.indexOf('<form class="hero-search platform-search"')

  assert.ok(slogan < official && official < search)
  const officialMarkup = html.slice(official, html.indexOf('</div>', official) + 6)
  assert.doesNotMatch(officialMarkup, /<svg/)
})

test('产业服务快捷入口按六张单卡加末尾双宽专利卡进入同一网格', () => {
  const html = render(IndustryServicesPage, '/services')
  const shortcuts = region(html, '<section class="industry-shortcut-grid"')
  const labels = ['加工', '包装', '检测', '仓储', '冷链运输', '船运', '专利成果']
  const positions = labels.map((label) => shortcuts.indexOf(`>${label}<`))

  assert.ok(positions.every((position) => position >= 0))
  assert.deepEqual([...positions].sort((a, b) => a - b), positions)
  assert.match(shortcuts, /class="patent-service-entry"/)
  assert.match(industryStyles, /\.industry-shortcut-grid\{[^}]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/)
  assert.match(industryStyles, /\.industry-shortcut-grid \.patent-service-entry\{[^}]*grid-column:span 2/)
})

test('专利成果搜索栏位于顶部横幅右侧区域', () => {
  const html = render(PatentsPage, '/patents')
  const hero = region(html, '<section class="remediation-hero patents-hero">')

  assert.match(hero, /class="patent-search platform-search"/)
  assert.match(hero, /aria-label="搜索专利成果"/)
})

test('采购搜索位于标题操作区且下方筛选区只保留三个下拉框', () => {
  const html = render(ProcurementPage, '/procurement')
  const title = region(html, '<section class="tp-title-row">')
  const filters = region(html, '<section class="tp-demand-filters">')

  assert.match(title, /class="tp-title-search platform-search"/)
  assert.ok(title.indexOf('tp-title-search') < title.indexOf('<button class="tp-primary"'))
  assert.doesNotMatch(filters, /<form/)
  assert.equal((filters.match(/<select/g) || []).length, 3)
})

test('公共页头为品牌、导航和账户操作提供独立自适应布局区域', () => {
  const html = render(SiteHeader)

  assert.match(html, /class="page-container site-header-inner"/)
  assert.match(html, /class="site-header-actions"/)
  assert.match(remediationStyles, /\.site-header-inner\{[^}]*grid-template-columns:auto minmax\(0,1fr\) auto/)
  assert.match(remediationStyles, /\.site-header \.site-main-nav\{[^}]*gap:clamp\(10px,1\.2vw,24px\)/)
})
