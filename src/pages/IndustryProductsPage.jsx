import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import EnterpriseSectionCards from '../components/business/EnterpriseSectionCards'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import { enterpriseProductSections, filterIndustryProducts, industryProducts } from '../data/industryProducts'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
import '../styles/industry-products.css'

const validSections = new Set(['all', ...enterpriseProductSections.map(({ id }) => id)])
const productsPerPage = 8
const productCounts = Object.fromEntries(
  enterpriseProductSections.map(({ id }) => [
    id,
    industryProducts.filter((product) => product.section === id).length,
  ]),
)

export default function IndustryProductsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const requestedSection = searchParams.get('section') || 'all'
  const section = validSections.has(requestedSection) ? requestedSection : 'all'
  const keyword = searchParams.get('keyword') || ''
  const [keywordInput, setKeywordInput] = useState(keyword)
  const products = useMemo(() => filterIndustryProducts(industryProducts, { section, keyword }), [section, keyword])
  const requestedPage = Number.parseInt(searchParams.get('page') || '1', 10)
  const totalPages = Math.max(1, Math.ceil(products.length / productsPerPage))
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0
    ? Math.min(requestedPage, totalPages)
    : 1
  const visibleProducts = products.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)

  useEffect(() => setKeywordInput(keyword), [keyword])

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (!pageParam || String(currentPage) === pageParam) return
    const params = new URLSearchParams(searchParams)
    if (currentPage === 1) params.delete('page')
    else params.set('page', String(currentPage))
    setSearchParams(params, { replace: true })
  }, [currentPage, searchParams, setSearchParams])

  function updateSearch(nextSection, nextKeyword) {
    const params = new URLSearchParams(searchParams)
    params.set('section', nextSection)
    if (nextKeyword) params.set('keyword', nextKeyword)
    else params.delete('keyword')
    params.delete('page')
    setSearchParams(params)
  }

  function selectPage(nextPage) {
    const params = new URLSearchParams(searchParams)
    if (nextPage === 1) params.delete('page')
    else params.set('page', String(nextPage))
    setSearchParams(params)
  }

  const selectSection = (nextSection) => updateSearch(section === nextSection ? 'all' : nextSection, keyword)

  function submitSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    updateSearch('all', normalizedKeyword)
  }

  function handleVoiceSearch(keywordValue) {
    setKeywordInput(keywordValue)
    submitSearch(keywordValue)
  }

  return <main className="industry-products-page">
    <section className="industry-products-hero">
      <div className="page-container industry-products-hero-inner">
        <div><p>首页　›　企业商品大厅</p><h1>企业商品大厅</h1><span>鲜鱼、养殖物资、深加工品与其他海产统一查询，支持企业批量采购</span></div>
        <div className="industry-products-search">
          <form className="platform-search" onSubmit={(event) => { event.preventDefault(); submitSearch() }}>
            <Search/><input aria-label="搜索企业商品" value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="搜索商品、品种、产地或供应商"/><button type="submit">搜索</button>
          </form>
          <button className="hall-primary-action" type="button" onClick={() => navigate('/procurement/new')}>发布采购需求</button>
        </div>
      </div>
    </section>
    <div className="page-container industry-products-body">
      <EnterpriseSectionCards
        selectedSection={section}
        counts={productCounts}
        countUnit="类"
        onSelect={selectSection}
        ariaLabel="商品分区筛选"
      />
      <section className="industry-products-grid" aria-live="polite">
        {visibleProducts.map((product) => <article key={product.id}>
          <div className="industry-product-image"><img src={product.image} alt={product.name}/></div>
          <div className="industry-product-content">
            <div className="industry-product-title"><h2>{product.name}</h2><span>{product.category}</span></div>
            <div className="industry-product-identity">
              <span title={`品种：${product.species}`}>品种：{product.species}</span>
              <span title={`产品产地：${product.origin}`}>产品产地：{product.origin}</span>
            </div>
            <p title={`${product.supplier}，${product.region}`}>{product.supplier}<small>{product.region}</small></p>
            <dl>
              <div><dt>规格</dt><dd title={product.spec}>：<strong>{product.spec}</strong></dd></div>
              <div><dt>起订量</dt><dd title={product.minOrder}>：<strong>{product.minOrder}</strong></dd></div>
              <div><dt>参考价</dt><dd title={product.price}>：<strong className="price">{product.price}</strong></dd></div>
              <div><dt>供应能力</dt><dd title={product.supply}>：<strong>{product.supply}</strong></dd></div>
            </dl>
            <footer><button type="button" onClick={() => navigate(`/products/${product.id}`)}>查看商品</button><button type="button" onClick={() => navigate(`/procurement/${product.id}/quote`)}>立即询价 <ChevronRight/></button></footer>
          </div>
        </article>)}
      </section>
      {products.length === 0 && <div className="industry-products-empty">没有找到匹配商品，请更换关键词或商品分区。</div>}
      {products.length > 0 && <section className="industry-products-pagination-bar">
        <p>企业采购价仅作展示，实际价格以询价为准</p>
        {totalPages > 1 && <nav className="industry-products-pagination" aria-label="商品分页">
          <button type="button" disabled={currentPage === 1} onClick={() => selectPage(currentPage - 1)}><ChevronLeft/>上一页</button>
          <div>{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => <button type="button" className={page === currentPage ? 'active' : ''} aria-current={page === currentPage ? 'page' : undefined} onClick={() => selectPage(page)} key={page}>{page}</button>)}</div>
          <button type="button" disabled={currentPage === totalPages} onClick={() => selectPage(currentPage + 1)}>下一页<ChevronRight/></button>
        </nav>}
      </section>}
    </div>
    <SiliconAssistant onSearch={handleVoiceSearch}/>
  </main>
}
