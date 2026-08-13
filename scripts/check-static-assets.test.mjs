import assert from 'node:assert/strict'
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import test from 'node:test'

import { findMissingAssets } from './check-static-assets.mjs'

test('findMissingAssets reports missing absolute public asset paths', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'salmon-assets-'))

  try {
    await mkdir(path.join(root, 'src'), { recursive: true })
    await mkdir(path.join(root, 'public', 'assets'), { recursive: true })
    await writeFile(
      path.join(root, 'src', 'styles.css'),
      ".hero{background:url('/assets/existing.png')} .logo{background:url('/assets/missing.png')}",
    )
    await writeFile(path.join(root, 'public', 'assets', 'existing.png'), 'fixture')

    const missing = await findMissingAssets(root)

    assert.deepEqual(missing, ['/assets/missing.png'])
  } finally {
    await rm(root, { recursive: true, force: true })
  }
})

