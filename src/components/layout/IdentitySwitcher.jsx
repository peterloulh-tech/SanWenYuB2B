import { useEffect, useRef, useState } from 'react'
import { Building2, Check, ChevronDown, ShoppingBag, UserRound } from 'lucide-react'
import {
  ACCOUNT_STATES,
  IDENTITIES,
  getIdentitySwitchResult,
} from '../../features/identity/identityPolicy'

const identityMeta = {
  [IDENTITIES.ENTERPRISE]: {
    label: '企业交易',
    description: '批量采购、供应报价、发布需求',
    Icon: Building2,
  },
  [IDENTITIES.PERSONAL]: {
    label: '个人消费',
    description: '家庭购买、小包装、购物车',
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
  const [identity, setIdentity] = useState(IDENTITIES.ENTERPRISE)
  const [open, setOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState(null)
  const rootRef = useRef(null)
  const identityLabel = identityMeta[identity].label

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  const chooseIdentity = (targetIdentity) => {
    const result = getIdentitySwitchResult(accountState, targetIdentity)
    if (result.action === 'switch') {
      setIdentity(result.targetIdentity)
      setOpen(false)
      return
    }
    setPendingAction(result)
    setOpen(false)
  }

  const confirmPendingAction = () => {
    if (pendingAction?.action === 'open-personal') setIdentity(IDENTITIES.PERSONAL)
    setPendingAction(null)
  }

  return <div className="identity-switcher" ref={rootRef}>
    <button
      type="button"
      className={`identity-switcher-trigger ${open ? 'open' : ''}`}
      aria-expanded={open}
      aria-haspopup="menu"
      onClick={() => setOpen(value => !value)}
    >
      <UserRound />
      <span>当前：{identityLabel}</span>
      <ChevronDown />
    </button>

    {open && <div className="identity-menu" role="menu">
      {Object.entries(identityMeta).map(([value, meta]) => {
        const selected = identity === value
        const Icon = meta.Icon
        return <button
          type="button"
          role="menuitem"
          className={selected ? 'selected' : ''}
          key={value}
          onClick={() => chooseIdentity(value)}
        >
          <span className="identity-menu-icon"><Icon /></span>
          <span><b>{meta.label}</b><small>{meta.description}</small></span>
          {selected && <Check className="identity-menu-check" />}
        </button>
      })}
    </div>}

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
  </div>
}
