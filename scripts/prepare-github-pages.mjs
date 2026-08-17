import { copyFile, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDirectory = path.resolve('dist')
const pagesBase = '/SanWenYuB2B'
const textExtensions = new Set(['.css', '.html', '.js'])

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectTextFiles(filePath))
    else if (textExtensions.has(path.extname(entry.name))) files.push(filePath)
  }

  return files
}

for (const filePath of await collectTextFiles(distDirectory)) {
  const content = await readFile(filePath, 'utf8')
  const patched = content.replace(/(?<!\/SanWenYuB2B)\/assets\//g, `${pagesBase}/assets/`)
  if (patched !== content) await writeFile(filePath, patched)
}

await copyFile(path.join(distDirectory, 'index.html'), path.join(distDirectory, '404.html'))
await writeFile(path.join(distDirectory, '.nojekyll'), '')

console.log(`GitHub Pages 构建已准备：${pagesBase}/`)
