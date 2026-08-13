import { Link, useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, CircleCheckBig, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { parseRetailOrderSuccess } from '../features/retail/retailCheckout'
import '../styles/retail-pages.css'

const orderSteps = ['购物车', '确认订单', '下单完成']

export default function RetailOrderSuccessPage() {
  const [searchParams] = useSearchParams()
  const order = parseRetailOrderSuccess(searchParams)

  return <main className="retail-cart-page retail-order-success-page">
    <div className="page-container">
      <nav className="retail-detail-breadcrumb" aria-label="面包屑">
        <Link to="/retail">个人消费首页</Link><ChevronRight /><b>下单完成</b>
      </nav>

      <section className="retail-cart-heading">
        <div><span><PackageCheck /></span><div><h1>下单完成</h1><p>订单信息均为静态演示数据</p></div></div>
        <ol>{orderSteps.map((step, index) => <li className={index === 2 ? 'active' : 'completed'} key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
      </section>

      <section className="retail-success-panel">
        <div className="retail-success-status">
          <span><CircleCheckBig /></span>
          <h2>订单提交成功（演示）</h2>
          <p>我们已生成本地演示订单，感谢你选购家庭海鲜。</p>
        </div>

        <dl className="retail-success-summary">
          <div><dt>演示订单号</dt><dd>{order.orderNumber}</dd></div>
          <div><dt>商品数量</dt><dd>{order.selectedKinds} 种 / {order.selectedQuantity} 件</dd></div>
          <div><dt>应付金额</dt><dd className="amount">¥{order.payableAmount.toFixed(2)}</dd></div>
          <div><dt>收货人</dt><dd>{order.recipient}</dd></div>
          <div><dt>配送方式</dt><dd><Truck />全程冷链配送</dd></div>
          <div><dt>预计送达</dt><dd>{order.estimatedArrival}</dd></div>
        </dl>

        <div className="retail-success-notice"><ShieldCheck /><div><b>静态演示说明</b><p>本次操作未支付、未扣减库存，也不会保存真实订单或收货信息。</p></div></div>

        <div className="retail-success-actions">
          <Link className="primary" to="/retail"><Check />继续购物</Link>
          <Link className="secondary" to="/retail/cart">返回购物车</Link>
        </div>
      </section>
    </div>
  </main>
}
