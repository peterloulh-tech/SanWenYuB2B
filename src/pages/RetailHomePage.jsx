import { useRef, useState } from 'react'
import { ChevronRight, Fish, Gift, Search, Shell, ShieldCheck, Snowflake, Sparkles, Utensils } from 'lucide-react'
import { retailCategories, retailProducts } from '../data/retailData'
import '../styles/retail-pages.css'

const categoryIcons = {
  fish: Fish,
  utensils: Utensils,
  shell: Shell,
  gift: Gift,
}

const trustItems = [
  [Snowflake, '冷链配送'],
  [ShieldCheck, '来源可追溯'],
  [Sparkles, '平台优选'],
  [ShieldCheck, '售后保障'],
]

export default function RetailHomePage() {
  const productsRef = useRef(null)
  const [previewProduct, setPreviewProduct] = useState(null)
  const focusProducts = () => productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return <main className="retail-home">
    <section className="retail-hero">
      <div className="page-container retail-hero-inner">
        <div className="retail-hero-copy">
          <span className="retail-kicker">日照鲜达家</span>
          <h1>鲜从日照来，新鲜送到家</h1>
          <p>家庭餐桌的品质三文鱼与海鲜优选</p>
          <div className="retail-search">
            <Search />
            <input aria-label="搜索零售商品" placeholder="搜索商品、品类、规格" />
            <button type="button" onClick={focusProducts}>搜索</button>
          </div>
          <div className="retail-trust-row">
            {trustItems.map(([Icon, label]) => <span key={label}><Icon />{label}</span>)}
          </div>
        </div>
        <div className="retail-hero-slogan">
          <small>日照好海味</small>
          <strong>家庭鲜享<br />冷链直达</strong>
        </div>
      </div>
    </section>

    <section className="retail-categories page-container" aria-label="商品分类">
      {retailCategories.map(category => {
        const Icon = categoryIcons[category.icon]
        return <button type="button" className="retail-category-card" id={category.id} key={category.id} onClick={focusProducts}>
          <span><Icon /></span>
          <span><b>{category.name}</b><small>{category.description}</small></span>
          <ChevronRight />
        </button>
      })}
    </section>

    <section className="retail-products page-container" ref={productsRef}>
      <header>
        <div><span>家庭严选</span><h2>热门推荐</h2></div>
        <button type="button" onClick={focusProducts}>查看更多 <ChevronRight /></button>
      </header>
      <div className="retail-product-grid">
        {retailProducts.map(product => <article className="retail-product-card" key={product.id}>
          <div className="retail-product-image">
            <img src={product.image} alt={product.name} />
            <span>{product.badge}</span>
          </div>
          <div className="retail-product-info">
            <h3>{product.name}</h3>
            <p>规格：{product.spec}</p>
            <div><em>零售价</em><strong>¥{product.price.toFixed(2)}</strong><small>/{product.unit}</small></div>
            <button type="button" onClick={() => setPreviewProduct(product)} data-detail-path={product.detailPath}>查看详情</button>
          </div>
        </article>)}
      </div>
      <p className="retail-demo-note">页面商品、价格及配送信息均为静态演示数据</p>
    </section>
    {previewProduct && <div className="retail-preview-backdrop" role="presentation">
      <section className="retail-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="retail-preview-title">
        <img src={previewProduct.image} alt="" />
        <div>
          <span>详情页预告</span>
          <h2 id="retail-preview-title">{previewProduct.name}</h2>
          <p>商品详情页将在下一阶段按文字草图确认后实现。</p>
          <button type="button" onClick={() => setPreviewProduct(null)}>知道了</button>
        </div>
      </section>
    </div>}
  </main>
}
