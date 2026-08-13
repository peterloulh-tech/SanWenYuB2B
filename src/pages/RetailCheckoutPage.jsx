import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, MapPin, PackageCheck, Truck } from 'lucide-react'
import { calculateRetailCart } from '../features/retail/retailCart'
import { parseRetailCheckoutItems, validateRetailCheckoutAddress } from '../features/retail/retailCheckout'
import '../styles/retail-pages.css'

const checkoutSteps = ['购物车', '确认订单', '下单完成']
const defaultAddress = {
  name: '张海燕',
  phone: '138 0000 2026',
  region: '山东省 日照市 东港区',
  address: '海曲东路 88 号 2 单元 502 室',
}

export default function RetailCheckoutPage() {
  const [searchParams] = useSearchParams()
  const items = useMemo(() => parseRetailCheckoutItems(searchParams.get('items')), [searchParams])
  const summary = useMemo(() => calculateRetailCart(items), [items])
  const [address, setAddress] = useState(defaultAddress)
  const [errors, setErrors] = useState({})
  const [orderPrompt, setOrderPrompt] = useState(false)

  const updateAddress = (field, value) => {
    setAddress(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: undefined }))
  }

  const submitOrder = event => {
    event.preventDefault()
    const nextErrors = validateRetailCheckoutAddress(address)
    setErrors(nextErrors)
    if (!Object.keys(nextErrors).length) setOrderPrompt(true)
  }

  return <main className="retail-cart-page retail-checkout-page">
    <div className="page-container">
      <nav className="retail-detail-breadcrumb" aria-label="面包屑">
        <Link to="/retail">个人消费首页</Link><ChevronRight /><Link to="/retail/cart">购物车</Link><ChevronRight /><b>确认订单</b>
      </nav>

      <section className="retail-cart-heading">
        <div><span><PackageCheck /></span><div><h1>确认订单</h1><p>请核对收货信息和商品，所有内容均为演示数据</p></div></div>
        <ol>{checkoutSteps.map((step, index) => <li className={index === 1 ? 'active' : index === 0 ? 'completed' : ''} key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
      </section>

      <form className="retail-checkout-layout" onSubmit={submitOrder} noValidate>
        <div className="retail-checkout-main">
          <section className="retail-checkout-card retail-address-card">
            <header><span><MapPin /></span><div><h2>收货信息</h2><p>已填入演示信息，可直接修改</p></div></header>
            <div className="retail-address-fields">
              <label className={errors.name ? 'has-error' : ''}><span>收货人</span><input aria-label="收货人" value={address.name} onChange={event => updateAddress('name', event.target.value)} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
              <label className={errors.phone ? 'has-error' : ''}><span>手机号码</span><input aria-label="手机号码" type="tel" value={address.phone} onChange={event => updateAddress('phone', event.target.value)} aria-invalid={Boolean(errors.phone)} />{errors.phone && <small>{errors.phone}</small>}</label>
              <label className={errors.region ? 'has-error' : ''}><span>所在地区</span><input aria-label="所在地区" value={address.region} onChange={event => updateAddress('region', event.target.value)} aria-invalid={Boolean(errors.region)} />{errors.region && <small>{errors.region}</small>}</label>
              <label className={errors.address ? 'has-error' : ''}><span>详细地址</span><input aria-label="详细地址" value={address.address} onChange={event => updateAddress('address', event.target.value)} aria-invalid={Boolean(errors.address)} />{errors.address && <small>{errors.address}</small>}</label>
            </div>
          </section>

          <section className="retail-checkout-card retail-delivery-card">
            <header><span><Truck /></span><div><h2>配送方式</h2><p>默认冷链配送</p></div></header>
            <div><b>全程冷链配送</b><span>由平台演示承运方配送</span><strong>预计明日 18:00 前送达</strong></div>
          </section>

          <section className="retail-checkout-card retail-order-card">
            <header><span><PackageCheck /></span><div><h2>商品清单</h2><p>共 {summary.selectedKinds} 种商品</p></div></header>
            {items.map(item => <article key={item.product.id}>
              <img src={item.product.image} alt={item.product.name} />
              <div><b>{item.product.name}</b><span>规格：{item.product.spec}</span></div>
              <span>× {item.quantity}</span>
              <strong>¥{(item.product.price * item.quantity).toFixed(2)}</strong>
            </article>)}
          </section>

          <label className="retail-checkout-note"><span>订单备注</span><input placeholder="选填，例如配送前请电话联系" maxLength="80" /></label>
        </div>

        <aside className="retail-cart-summary retail-checkout-summary">
          <h2>订单金额</h2>
          <p><span>商品数量</span><b>{summary.selectedKinds} 种 / {summary.selectedQuantity} 件</b></p>
          <p><span>商品金额</span><b>¥{summary.goodsAmount.toFixed(2)}</b></p>
          <p><span>演示运费</span><b>¥{summary.shippingFee.toFixed(2)}</b></p>
          <div><span>应付合计</span><strong>¥{summary.payableAmount.toFixed(2)}</strong></div>
          <small><Check />金额与配送信息仅用于静态演示</small>
          <button type="submit">提交订单</button>
          <Link to="/retail/cart">返回购物车修改</Link>
        </aside>
      </form>
    </div>

    {orderPrompt && <div className="retail-preview-backdrop" role="presentation">
      <section className="retail-action-dialog" role="dialog" aria-modal="true" aria-labelledby="retail-order-title">
        <span>演示提交成功</span><h2 id="retail-order-title">下单完成页面将在下一阶段开放</h2>
        <p>当前仅验证确认订单页面的交互，不会创建真实订单、扣减库存或发起支付。</p>
        <button type="button" onClick={() => setOrderPrompt(false)}>继续查看订单</button>
      </section>
    </div>}
  </main>
}
