import test from 'node:test'
import assert from 'node:assert/strict'
import { getRetailNavActive } from '../src/features/identity/identityPolicy.js'

test('零售首页只有首页导航处于选中状态', () => {
  assert.equal(getRetailNavActive('/retail', '/retail'), true)
  assert.equal(getRetailNavActive('/retail#fresh-salmon', '/retail'), false)
  assert.equal(getRetailNavActive('/retail#fish-products', '/retail'), false)
  assert.equal(getRetailNavActive('/retail#other-seafood', '/retail'), false)
  assert.equal(getRetailNavActive('/retail#seafood-gifts', '/retail'), false)
})

