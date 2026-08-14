import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

test('运营大屏地图从日照沿静态连线发出循环光点', async () => {
  const page = await readFile(new URL('src/pages/DataScreenPage.jsx', root), 'utf8')
  const styles = await readFile(new URL('src/styles/data-screen-v2.css', root), 'utf8')

  const routeCount = (page.match(/name:\s*'[^']+',\s*path:/g) ?? []).length
  const rizhaoStarts = (page.match(/path:\s*'M 768 294/g) ?? []).length

  assert.equal(routeCount >= 18, true)
  assert.equal(rizhaoStarts, routeCount)
  assert.match(page, /<svg className="china-map-flow"[^>]*aria-hidden="true"/)
  assert.match(page, /mapFlows\.map/)
  assert.match(page, /mapFlowTailOffsets\.map/)
  assert.match(page, /<animateMotion[\s\S]*repeatCount="indefinite"/)
  assert.match(page, /attributeName="opacity"[\s\S]*repeatCount="indefinite"/)

  assert.match(styles, /background-image:\s*url\('\/assets\/data-screen-map-source\.png'\)/)
  assert.match(styles, /\.china-map-flow\s*\{[^}]*position:\s*absolute[^}]*pointer-events:\s*none/s)
  assert.match(styles, /\.map-flow-particle\s*\{[^}]*drop-shadow/s)
  assert.match(styles, /prefers-reduced-motion:\s*reduce[\s\S]*\.china-map-flow\s*\{\s*display:\s*none/s)
})
