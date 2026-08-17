import { useState } from 'react'
import { Building2, ShoppingBag } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ACCOUNT_STATES,
  IDENTITIES,
  getIdentityLandingPath,
  getIdentitySwitchResult,
} from '../../features/identity/identityPolicy'

const identityMeta = {
  [IDENTITIES.ENTERPRISE]: {
    label: '企业交易',
    Icon: Building2,
  },
  [IDENTITIES.PERSONAL]: {
    label: '个人消费',
    Icon: ShoppingBag,
  },
}

const actionCopy = {
  'open-personal': {
    title: '开通个人消费身份',
    description: '将使用当前账号的手机号和基础信息开通个人消费功能，无需重新注册。',
    confirm: '确认开通并切换',
  },
  'apply-enterprise': {
    title: '申请企业入驻',
    description: '当前账号尚未绑定入驻企业。完成企业认证后，可进行批量采购、报价和发布需求。',
    confirm: '前往申请企业入驻',
  },
}

export default function IdentitySwitcher({ accountState = ACCOUNT_STATES.GUEST }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const identity = pathname.startsWith('/retail') ? IDENTITIES.PERSONAL : IDENTITIES.ENTERPRISE
  const [pendingAction, setPendingAction] = useState(null)

  const chooseIdentity = (targetIdentity) => {
    if (targetIdentity === identity) return

    const result = getIdentitySwitchResult(accountState, targetIdentity)
    if (result.action === 'switch') {
      navigate(getIdentityLandingPath(result.targetIdentity))
      return
    }
    setPendingAction(result)
  }

  const confirmPendingAction = () => {
    if (pendingAction?.action === 'open-personal') {
      navigate(getIdentityLandingPath(IDENTITIES.PERSONAL))
    }
    setPendingAction(null)
  }

  return <>
    <div className="identity-switcher" role="group" aria-label="业务频道">
      {Object.entries(identityMeta).map(([value, meta]) => {
        const selected = identity === value
        const Icon = meta.Icon
        return <button
          type="button"
          className={`identity-channel ${selected ? 'selected' : ''}`}
          key={value}
          aria-pressed={selected}
          aria-label={`${meta.label}${selected ? '，当前频道' : ''}`}
          onClick={() => chooseIdentity(value)}
        >
          <Icon />
          <span>{meta.label}</span>
        </button>
      })}
    </div>

    {pendingAction && <div className="identity-dialog-backdrop" role="presentation">
      <section className="identity-dialog" role="dialog" aria-modal="true" aria-labelledby="identity-dialog-title">
        <h2 id="identity-dialog-title">{actionCopy[pendingAction.action].title}</h2>
        <p>{actionCopy[pendingAction.action].description}</p>
        <div>
          <button type="button" onClick={() => setPendingAction(null)}>取消</button>
          <button type="button" className="primary" onClick={confirmPendingAction}>{actionCopy[pendingAction.action].confirm}</button>
        </div>
      </section>
    </div>}
  </>
}
