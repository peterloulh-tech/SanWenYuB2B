import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Beef, Boxes, ChevronRight, CookingPot, Fish, PackageOpen, Search, Shell, ShoppingBasket, Sprout, Syringe, Waves } from 'lucide-react'
import { enterpriseProductSections, filterIndustryProducts, industryProducts } from '../data/industryProducts'
import '../styles/industry-products.css'

const sectionIcons = { fresh: Fish, aquaculture: Sprout, processed: CookingPot, seafood: Shell }
const categoryIcons = {
  鱼卵鱼苗: Waves, 鱼药疫苗: Syringe, 饲料: Sprout, 养殖设备: Boxes,
  整鱼: Fish, 鱼柳: Fish, 切片: Beef, 副产物: PackageOpen,
  烟熏产品: Fish, 鱼饼: Beef, 预制菜: ShoppingBasket,
  虾类: Waves, 蟹类: Shell, 扇贝: Shell, 生蚝: Shell,
}
const validSections = new Set(enterpriseProductSections.map(({ id }) => id))

export default function IndustryProductsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedSection = searchParams.get('section') || 'fresh'
  const section = validSections.has(requestedSection) ? requestedSection : 'fresh'
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const products = useMemo(() => filterIndustryProducts(industryProducts, { section, keyword }), [section, keyword])
  const selectedSection = enterpriseProductSections.find((item) => item.id === section)

  const selectSection = (nextSection) => setSearchParams(nextSection === 'fresh' ? {} : { section: nextSection })
  const submitSearch = () => setKeyword(keywordInput)

  return <main className="industry-products-page">
    <section className="industry-products-hero">
      <div className="page-container industry-products-hero-inner">
        <div><p>首页　›　企业商品大厅</p><h1>企业商品大厅</h1><span>鲜鱼、养殖物资、深加工品与其他海产统一查询，支持企业批量采购</span></div>
        <div className="industry-products-search">
          <label><Search/><input value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && submitSearch()} placeholder="搜索商品、品类、供应商或地区"/></label>
          <button type="button" onClick={submitSearch}>搜索</button><button type="button" onClick={() => navigate('/procurement/new')}>发布采购需求</button>
        </div>
      </div>
    </section>
    <div className="page-container industry-products-body">
      <section className="industry-stage-grid" aria-label="商品分区筛选">
        {enterpriseProductSections.map((item) => { const Icon = sectionIcons[item.id]; const count = industryProducts.filter((product) => product.section === item.id).length; return <button type="button" className={section === item.id ? 'active' : ''} onClick={() => selectSection(item.id)} key={item.id}><span><Icon/></span><div><b>{item.name}</b><small>{item.description}</small></div><em>{count} 类</em></button> })}
      </section>
      <section className="industry-products-heading"><div><h2>{selectedSection?.name}</h2><span>共 {products.length} 项静态演示商品</span></div><p>企业采购价仅作展示，实际价格以询价为准</p></section>
      <section className="industry-products-grid">
        {products.map((product) => { const Icon = categoryIcons[product.category] || Boxes; return <article key={product.id}>
          <header><span><Icon/></span><div><em>{selectedSection?.name}</em><b>{product.category}</b></div></header><h2>{product.name}</h2><p>{product.supplier}<small>{product.region}</small></p>
          <dl><div><dt>规格</dt><dd>{product.spec}</dd></div><div><dt>起订量</dt><dd>{product.minOrder}</dd></div><div><dt>参考价</dt><dd className="price">{product.price}</dd></div><div><dt>供应能力</dt><dd>{product.supply}</dd></div></dl>
          <footer><button type="button" onClick={() => navigate(`/products/${product.id}`)}>查看商品</button><button type="button" onClick={() => navigate(`/procurement/${product.id}/quote`)}>立即询价 <ChevronRight/></button></footer>
        </article> })}
      </section>
      {products.length === 0 && <div className="industry-products-empty">没有找到匹配商品，请更换关键词或商品分区。</div>}
    </div>
  </main>
}
