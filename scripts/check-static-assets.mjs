import { access, readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const sourceExtensions = new Set(['.css', '.html', '.js', '.jsx', '.mjs', '.ts', '.tsx'])
const assetPattern = /['"`]\/(?!\/)([^'"`?#]+\.(?:avif|gif|jpe?g|png|svg|webp))(?:[?#][^'"`]*)?['"`]/gi

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectSourceFiles(fullPath))
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(fullPath)
  }

  return files
}

export async function findMissingAssets(projectRoot = process.cwd()) {
  const sourceRoot = path.join(projectRoot, 'src')
  const publicRoot = path.join(projectRoot, 'public')
  const referencedAssets = new Set()

  for (const file of await collectSourceFiles(sourceRoot)) {
    const content = await readFile(file, 'utf8')
    for (const match of content.matchAll(assetPattern)) referencedAssets.add(`/${match[1]}`)
  }

  const missing = []
  for (const asset of [...referencedAssets].sort()) {
    try {
      await access(path.join(publicRoot, asset.slice(1)))
    } catch {
      missing.push(asset)
    }
  }
  return missing
}

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isDirectRun) {
  const missing = await findMissingAssets()
  if (missing.length) {
    console.error(`缺少 ${missing.length} 个本地静态资源：`)
    for (const asset of missing) console.error(`- ${asset}`)
    process.exitCode = 1
  } else {
    console.log('静态资源检查通过。')
  }
}

