export const IDENTITIES = Object.freeze({
  ENTERPRISE: 'enterprise',
  PERSONAL: 'personal',
})

export const ACCOUNT_STATES = Object.freeze({
  GUEST: 'guest',
  PERSONAL_ONLY: 'personal-only',
  ENTERPRISE_ONLY: 'enterprise-only',
  BOTH: 'both',
})

const accountStateValues = new Set(Object.values(ACCOUNT_STATES))
const identityValues = new Set(Object.values(IDENTITIES))

export function getIdentitySwitchResult(accountState, targetIdentity) {
  if (!accountStateValues.has(accountState)) throw new Error(`未知账号状态：${accountState}`)
  if (!identityValues.has(targetIdentity)) throw new Error(`未知目标身份：${targetIdentity}`)

  if (accountState === ACCOUNT_STATES.PERSONAL_ONLY && targetIdentity === IDENTITIES.ENTERPRISE) {
    return { action: 'apply-enterprise', targetIdentity }
  }

  if (accountState === ACCOUNT_STATES.ENTERPRISE_ONLY && targetIdentity === IDENTITIES.PERSONAL) {
    return { action: 'open-personal', targetIdentity }
  }

  return { action: 'switch', targetIdentity }
}
