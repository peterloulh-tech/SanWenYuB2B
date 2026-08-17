import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Fish, Gift, Search, Shell, ShieldCheck, Snowflake, Sparkles, Utensils } from 'lucide-react'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import { filterRetailProducts, retailCategories, retailProducts } from '../data/retailData'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
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
  [Sparkles, '国企平台'],
  [ShieldCheck, '售后保障'],
]

export default function RetailHomePage() {
  const navigate = useNavigate()
  const productsRef = useRef(null)
  const [productPrompt, setProductPrompt] = useState(null)
  const [category, setCategory] = useState('all')
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const products = useMemo(() => filterRetailProducts(retailProducts, { category, keyword }), [category, keyword])
  const focusProducts = () => productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  function executeSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    setKeyword(normalizedKeyword)
    setCategory('all')
    window.requestAnimationFrame(focusProducts)
  }

  return <main className="retail-home">
    <section className="retail-hero">
      <div className="page-container retail-hero-inner">
        <div className="retail-hero-copy">
          <h1>鲜从日照来，新鲜送到家</h1>
          <p>家庭餐桌的品质三文鱼与海鲜优选</p>
          <form className="retail-search platform-search" onSubmit={(event) => { event.preventDefault(); executeSearch() }}>
            <Search />
            <input aria-label="搜索零售商品" value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="搜索商品、品类、规格" />
            <button type="submit">搜索</button>
          </form>
          <div className="retail-trust-row">
            {trustItems.map(([Icon, label]) => <span key={label}><Icon />{label}</span>)}
          </div>
        </div>
      </div>
    </section>

    <section className="retail-categories page-container" aria-label="商品分类">
      {retailCategories.map(item => {
        const Icon = categoryIcons[item.icon]
        const selected = item.id === category
        return <button type="button" className={`retail-category-card ${selected ? 'active' : ''}`} aria-pressed={selected} id={item.id} key={item.id} onClick={() => { setCategory(selected ? 'all' : item.id); focusProducts() }}>
          <span><Icon /></span>
          <span><b>{item.name}</b><small>{item.description}</small></span>
          <ChevronRight />
        </button>
      })}
    </section>

    <section className="retail-products page-container" ref={productsRef}>
      <header>
        <div><h2>{keyword || category !== 'all' ? '商品搜索结果' : '热门推荐'}</h2><span>共 {products.length} 件</span></div>
        <button type="button" onClick={focusProducts}>查看更多 <ChevronRight /></button>
      </header>
      <div className="retail-product-grid">
        {products.map(product => <article className="retail-product-card" key={product.id}>
          <div className="retail-product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="retail-product-info">
            <span className="retail-product-badge">{product.badge}</span>
            <h3>{product.name}</h3>
            <p>规格：{product.spec}</p>
            <div><em>零售价</em><strong>¥{product.price.toFixed(2)}</strong><small>/{product.unit}</small></div>
            <div className="retail-product-actions">
              <button type="button" onClick={() => navigate(product.detailPath)}>查看详情</button>
              <button className="buy" type="button" onClick={() => setProductPrompt({ type: 'buy', product })}>立即购买</button>
            </div>
          </div>
        </article>)}
      </div>
      {products.length === 0 && <div className="retail-products-empty"><Search/><h3>没有找到匹配商品</h3><p>请更换关键词或取消当前商品分类。</p></div>}
    </section>
    {productPrompt && <div className="retail-preview-backdrop" role="presentation">
      <section className="retail-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="retail-preview-title">
        <img src={productPrompt.product.image} alt="" />
        <div>
          <span>购买提示</span>
          <h2 id="retail-preview-title">{productPrompt.product.name}</h2>
          <p>当前为游客浏览状态，登录或注册后即可继续购买。</p>
          <button type="button" onClick={() => navigate('/login')}>登录/注册</button>
        </div>
      </section>
    </div>}
    <SiliconAssistant onSearch={executeSearch}/>
  </main>
}
