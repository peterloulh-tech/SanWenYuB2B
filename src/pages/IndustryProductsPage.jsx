import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Beef, Boxes, ChevronRight, Factory, Fish, PackageOpen, Search, ShoppingBasket, Sprout, Store, Syringe, Waves } from 'lucide-react'
import { filterIndustryProducts, industryProducts, industryProductStages } from '../data/industryProducts'
import '../styles/industry-products.css'

const stageIcons = { all: Boxes, upstream: Sprout, midstream: Factory, downstream: Store }
const categoryIcons = {
  鱼卵鱼苗: Waves,
  鱼药疫苗: Syringe,
  饲料: Sprout,
  养殖设备: Boxes,
  整鱼: Fish,
  鱼柳: Fish,
  切片: Beef,
  副产物: PackageOpen,
  烟熏产品: Fish,
  鱼饼: Beef,
  预制菜: ShoppingBasket,
}

const validStages = new Set(industryProductStages.map(({ id }) => id))

export default function IndustryProductsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedStage = searchParams.get('stage') || 'all'
  const stage = validStages.has(requestedStage) ? requestedStage : 'all'
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const products = useMemo(() => filterIndustryProducts(industryProducts, { stage, keyword }), [stage, keyword])

  const selectStage = (nextStage) => {
    setSearchParams(nextStage === 'all' ? {} : { stage: nextStage })
  }

  const submitSearch = () => setKeyword(keywordInput)
  const showNextStage = () => window.alert('商品详情与询价链路将在大厅验收后继续开发')

  return <main className="industry-products-page">
    <section className="industry-products-hero">
      <div className="page-container industry-products-hero-inner">
        <div>
          <p>首页　›　全产业链商品</p>
          <h1>全产业链商品大厅</h1>
          <span>一个大厅汇集上游供应、中游产品和下游成品，按产业环节快速找货</span>
        </div>
        <div className="industry-products-search">
          <label><Search/><input value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitSearch()} placeholder="搜索商品、品类、供应商或地区"/></label>
          <button type="button" onClick={submitSearch}>搜索</button>
          <button type="button" onClick={() => navigate('/procurement/new')}>发布采购需求</button>
        </div>
      </div>
    </section>

    <div className="page-container industry-products-body">
      <section className="industry-stage-grid" aria-label="产业环节筛选">
        {industryProductStages.map((item) => { const Icon = stageIcons[item.id]; const count = item.id === 'all' ? industryProducts.length : industryProducts.filter((product) => product.stage === item.id).length; return <button type="button" className={stage === item.id ? 'active' : ''} onClick={() => selectStage(item.id)} key={item.id}><span><Icon/></span><div><b>{item.name}</b><small>{item.description}</small></div><em>{count} 类</em></button> })}
      </section>

      <section className="industry-products-heading">
        <div><h2>{industryProductStages.find((item) => item.id === stage)?.name}</h2><span>共 {products.length} 项静态演示商品</span></div>
        <p>企业采购价仅作展示，实际价格以询价为准</p>
      </section>

      <section className="industry-products-grid">
        {products.map((product) => { const Icon = categoryIcons[product.category] || Boxes; return <article key={product.id}>
          <header><span><Icon/></span><div><em>{industryProductStages.find((item) => item.id === product.stage)?.name}</em><b>{product.category}</b></div></header>
          <h2>{product.name}</h2>
          <p>{product.supplier}<small>{product.region}</small></p>
          <dl>
            <div><dt>规格</dt><dd>{product.spec}</dd></div>
            <div><dt>起订量</dt><dd>{product.minOrder}</dd></div>
            <div><dt>参考价</dt><dd className="price">{product.price}</dd></div>
            <div><dt>供应能力</dt><dd>{product.supply}</dd></div>
          </dl>
          <footer><button type="button" onClick={showNextStage}>查看商品</button><button type="button" onClick={showNextStage}>立即询价 <ChevronRight/></button></footer>
        </article> })}
      </section>
      {products.length === 0 && <div className="industry-products-empty">没有找到匹配商品，请更换关键词或产业环节。</div>}
    </div>
  </main>
}
