import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Check, ChevronRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { buildDemoCart, calculateRetailCart, clampRetailQuantity } from '../features/retail/retailCart'
import { serializeRetailCheckoutItems } from '../features/retail/retailCheckout'
import '../styles/retail-pages.css'

const cartSteps = ['购物车', '确认订单', '下单完成']

export default function RetailCartPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [items, setItems] = useState(() => buildDemoCart(searchParams.get('product'), searchParams.get('quantity')))
  const summary = useMemo(() => calculateRetailCart(items), [items])
  const allSelected = items.length > 0 && items.every(item => item.selected)

  const updateItem = (productId, updates) => setItems(current => current.map(item => (
    item.product.id === productId ? { ...item, ...updates } : item
  )))
  const changeQuantity = (productId, quantity) => updateItem(productId, { quantity: clampRetailQuantity(quantity) })
  const removeItem = productId => setItems(current => current.filter(item => item.product.id !== productId))
  const toggleAll = () => setItems(current => current.map(item => ({ ...item, selected: !allSelected })))
  const removeSelected = () => setItems(current => current.filter(item => !item.selected))

  return <main className="retail-cart-page">
    <div className="page-container">
      <nav className="retail-detail-breadcrumb" aria-label="面包屑">
        <Link to="/retail">个人消费首页</Link><ChevronRight /><b>我的购物车</b>
      </nav>

      <section className="retail-cart-heading">
        <div><span><ShoppingCart /></span><div><h1>我的购物车</h1><p>价格、库存与运费均为演示数据</p></div></div>
        <ol>{cartSteps.map((step, index) => <li className={index === 0 ? 'active' : ''} key={step}><b>{index + 1}</b><span>{step}</span></li>)}</ol>
      </section>

      {items.length ? <div className="retail-cart-layout">
        <section className="retail-cart-list">
          <header>
            <label><input type="checkbox" checked={allSelected} onChange={toggleAll} />全选</label>
            <span>商品信息</span><span>零售价</span><span>数量</span><span>小计</span><span>操作</span>
          </header>

          {items.map(item => <article key={item.product.id}>
            <input aria-label={`选择${item.product.name}`} type="checkbox" checked={item.selected} onChange={event => updateItem(item.product.id, { selected: event.target.checked })} />
            <Link className="retail-cart-product" to={item.product.detailPath}>
              <img src={item.product.image} alt={item.product.name} />
              <span><b>{item.product.name}</b><small>规格：{item.product.spec}</small><em>{item.product.badge}</em></span>
            </Link>
            <strong>¥{item.product.price.toFixed(2)}</strong>
            <div className="retail-cart-quantity">
              <button aria-label={`减少${item.product.name}数量`} type="button" disabled={item.quantity === 1} onClick={() => changeQuantity(item.product.id, item.quantity - 1)}><Minus /></button>
              <b>{item.quantity}</b>
              <button aria-label={`增加${item.product.name}数量`} type="button" disabled={item.quantity === 9} onClick={() => changeQuantity(item.product.id, item.quantity + 1)}><Plus /></button>
            </div>
            <strong className="retail-cart-subtotal">¥{(item.product.price * item.quantity).toFixed(2)}</strong>
            <button className="retail-cart-remove" type="button" onClick={() => removeItem(item.product.id)}><Trash2 />删除</button>
          </article>)}

          <footer>
            <button type="button" onClick={toggleAll}>{allSelected ? '取消全选' : '全选商品'}</button>
            <button type="button" disabled={!summary.selectedKinds} onClick={removeSelected}>删除已选</button>
            <Link to="/retail">继续购物</Link>
          </footer>
        </section>

        <aside className="retail-cart-summary">
          <h2>金额汇总</h2>
          <p><span>已选商品</span><b>{summary.selectedKinds} 种 / {summary.selectedQuantity} 件</b></p>
          <p><span>商品金额</span><b>¥{summary.goodsAmount.toFixed(2)}</b></p>
          <p><span>演示运费</span><b>¥{summary.shippingFee.toFixed(2)}</b></p>
          <div><span>应付合计</span><strong>¥{summary.payableAmount.toFixed(2)}</strong></div>
          <small><Check />当前金额仅用于静态页面展示</small>
          <button type="button" disabled={!summary.selectedKinds} onClick={() => navigate(`/retail/checkout?items=${encodeURIComponent(serializeRetailCheckoutItems(items))}`)}>去结算</button>
        </aside>
      </div> : <section className="retail-cart-empty">
        <span><ShoppingCart /></span><h1>购物车暂无商品</h1>
        <p>去个人消费首页挑选适合家庭餐桌的三文鱼与海鲜。</p>
        <Link to="/retail">去逛逛</Link>
      </section>}
    </div>

  </main>
}
