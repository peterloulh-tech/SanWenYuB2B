import assert from 'node:assert/strict'
import test from 'node:test'

import {
  ACCOUNT_STATES,
  IDENTITIES,
  getIdentitySwitchResult,
} from '../src/features/identity/identityPolicy.js'

test('游客可以自由切换浏览身份', () => {
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.GUEST, IDENTITIES.PERSONAL),
    { action: 'switch', targetIdentity: IDENTITIES.PERSONAL },
  )
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.GUEST, IDENTITIES.ENTERPRISE),
    { action: 'switch', targetIdentity: IDENTITIES.ENTERPRISE },
  )
})

test('仅个人身份切换企业交易时提示申请企业入驻', () => {
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.PERSONAL_ONLY, IDENTITIES.ENTERPRISE),
    { action: 'apply-enterprise', targetIdentity: IDENTITIES.ENTERPRISE },
  )
})

test('仅企业身份切换个人消费时提示开通个人身份', () => {
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.ENTERPRISE_ONLY, IDENTITIES.PERSONAL),
    { action: 'open-personal', targetIdentity: IDENTITIES.PERSONAL },
  )
})

test('双身份账号可以自由切换', () => {
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.BOTH, IDENTITIES.PERSONAL),
    { action: 'switch', targetIdentity: IDENTITIES.PERSONAL },
  )
  assert.deepEqual(
    getIdentitySwitchResult(ACCOUNT_STATES.BOTH, IDENTITIES.ENTERPRISE),
    { action: 'switch', targetIdentity: IDENTITIES.ENTERPRISE },
  )
})

test('非法账号状态或目标身份会被拒绝', () => {
  assert.throws(() => getIdentitySwitchResult('unknown', IDENTITIES.PERSONAL), /未知账号状态/)
  assert.throws(() => getIdentitySwitchResult(ACCOUNT_STATES.GUEST, 'unknown'), /未知目标身份/)
})
