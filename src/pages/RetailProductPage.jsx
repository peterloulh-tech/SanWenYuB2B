import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Minus, Plus, ShieldCheck, Snowflake, Truck } from 'lucide-react'
import { findRetailCategory, findRetailProduct } from '../data/retailData'
import '../styles/retail-pages.css'

export default function RetailProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = findRetailProduct(id)
  const [quantity, setQuantity] = useState(1)
  const [prompt, setPrompt] = useState(null)

  if (!product) {
    return <main className="retail-product-detail-page">
      <section className="retail-product-missing page-container">
        <span>商品提示</span>
        <h1>未找到该商品或商品已下架（演示）</h1>
        <p>当前地址没有对应的个人消费商品，请返回首页继续浏览。</p>
        <Link to="/retail"><ChevronLeft />返回个人消费首页</Link>
      </section>
    </main>
  }

  const category = findRetailCategory(product.category)

  return <main className="retail-product-detail-page">
    <nav className="retail-detail-breadcrumb page-container" aria-label="面包屑">
      <Link to="/retail">个人消费首页</Link><ChevronRight />
      <span>{category?.name ?? '零售商品'}</span><ChevronRight />
      <b>{product.name}</b>
    </nav>

    <section className="retail-detail-main page-container">
      <div className="retail-detail-image">
        <img src={product.image} alt={product.name} />
        <span>{product.badge}</span>
      </div>

      <div className="retail-detail-summary">
        <div className="retail-detail-title-row"><span>演示数据</span><small>商品信息仅用于页面展示</small></div>
        <h1>{product.name}</h1>
        <p className="retail-detail-lead">{product.shortDescription}</p>

        <div className="retail-detail-price"><span>零售价</span><strong>¥{product.price.toFixed(2)}</strong><small>/{product.unit}</small></div>

        <dl className="retail-detail-facts">
          <div><dt>包装规格</dt><dd>{product.spec}</dd></div>
          <div><dt>来源</dt><dd><MapPin />{product.origin}</dd></div>
        </dl>

        <div className="retail-detail-delivery">
          <span><Truck /><b>{product.delivery}</b><small>{product.arrival}</small></span>
          <span><Snowflake /><b>冷链保障</b><small>{product.coldChain}</small></span>
          <span><ShieldCheck /><b>售后说明</b><small>签收异常可申请演示售后</small></span>
        </div>

        <div className="retail-detail-order-row">
          <label>购买数量</label>
          <div className="retail-detail-quantity">
            <button type="button" aria-label="减少数量" disabled={quantity === 1} onClick={() => setQuantity(value => Math.max(1, value - 1))}><Minus /></button>
            <b>{quantity}</b>
            <button type="button" aria-label="增加数量" disabled={quantity === 9} onClick={() => setQuantity(value => Math.min(9, value + 1))}><Plus /></button>
          </div>
          <small>演示数量 1～9</small>
        </div>

        <div className="retail-detail-actions">
          <button className="secondary" type="button" onClick={() => navigate(`/retail/cart?product=${product.id}&quantity=${quantity}`)}>加入购物车</button>
          <button className="primary" type="button" onClick={() => setPrompt('立即购买')}>立即购买</button>
        </div>
      </div>
    </section>

    <section className="retail-detail-description page-container">
      <article><h2>商品介绍</h2><p>{product.description}</p></article>
      <article><h2>食用与保存</h2><p>{product.servingAdvice}</p><small>{product.storageAdvice}</small></article>
      <article><h2>配送与售后</h2><p>{product.afterSales}</p><small>本页面商品、价格、库存和配送信息均为演示数据。</small></article>
    </section>

    {prompt && <div className="retail-preview-backdrop" role="presentation">
      <section className="retail-action-dialog" role="dialog" aria-modal="true" aria-labelledby="retail-action-title">
        <span>{prompt}</span>
        <h2 id="retail-action-title">购买链路将在下一阶段开放</h2>
        <p>购物车与结算页面需按文字草图确认后开发，本次操作不会产生真实订单。</p>
        <button type="button" onClick={() => setPrompt(null)}>继续浏览</button>
      </section>
    </div>}
  </main>
}
