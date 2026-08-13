import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function readSource(path) {
  return readFile(new URL(path, root), 'utf8')
}

test('已知的演示页列表项都使用稳定且唯一的 key', async () => {
  const productDetail = await readSource('src/pages/ProductDetailPage.jsx')
  const procurement = await readSource('src/pages/ProcurementPage.jsx')
  const procurementDetail = await readSource('src/pages/ProcurementDetailPage.jsx')
  const help = await readSource('src/pages/HelpPage.jsx')

  assert.match(productDetail, /photos\.map\(\(x,i\)=><img[^>]+key=\{`\$\{x\}-\$\{i\}`\}/)
  assert.match(productDetail, /map\(\(\[t,img\]\)=><figure key=\{t\}>/)
  assert.match(productDetail, /map\(\(\[n,p,s,img\],i\)=><article key=\{n\}>/)
  assert.match(procurement, /\[1,2,3,4\]\.map\(n=><button className=\{[^}]+\} key=\{n\}>/)
  assert.match(procurementDetail, /map\(\(\[k,v\],i\)=><div key=\{k\}>/)
  assert.match(help, /map\(\(\[I,t\]\)=><div className="help-card" key=\{t\}>/)
})
