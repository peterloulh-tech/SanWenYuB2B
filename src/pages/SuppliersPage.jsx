import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Building2, MapPin, Search } from 'lucide-react'
import EnterpriseSectionCards from '../components/business/EnterpriseSectionCards'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import PageHero from '../components/ui/PageHero'
import { filterSupplierDirectory, supplierCounts } from '../data/supplierDirectory'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
import '../styles/suppliers-page.css'

export default function SuppliersPage() {
  const navigate = useNavigate()
  const [section, setSection] = useState('all')
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const filteredSuppliers = useMemo(() => {
    return filterSupplierDirectory({ section, keyword })
  }, [keyword, section])

  function executeSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    setKeyword(normalizedKeyword)
    setSection('all')
  }

  function submitSearch(event) {
    event.preventDefault()
    executeSearch()
  }

  const searchAction = <form className="supplier-hero-search platform-search" onSubmit={submitSearch}>
    <Search />
    <input
      aria-label="搜索供应商"
      value={keywordInput}
      onChange={(event) => setKeywordInput(event.target.value)}
      placeholder="搜索企业、地区、主营品类或代表商品"
    />
    <button type="submit">搜索</button>
  </form>

  return <div className="suppliers-page">
    <PageHero
      eyebrow=""
      title="优质供应商"
      description="严选认证企业，连接稳定可靠的三文鱼货源"
      action={searchAction}
    />

    <main className="page-container suppliers-body">
      <EnterpriseSectionCards
        selectedSection={section}
        counts={supplierCounts}
        countUnit="家"
        onSelect={(nextSection) => setSection(section === nextSection ? 'all' : nextSection)}
        ariaLabel="供应商分类筛选"
      />

      <section className="supplier-enterprise-grid" aria-live="polite">
        {filteredSuppliers.map((supplier) => <article className="supplier-enterprise-card" key={supplier.id}>
          <header>
            <div className={`supplier-logo s${(supplier.id - 1) % 4}`}><Building2 /></div>
            <div>
              <h2>{supplier.name}</h2>
              <p className="supplier-card-meta">
                <span><BadgeCheck />平台认证供应商</span>
                <span><MapPin />{supplier.region}</span>
              </p>
            </div>
          </header>

          <div className="supplier-products">
            <div className="supplier-products-heading">
              <h3>主营品类</h3>
              <span>{supplier.productCount} 项演示商品</span>
            </div>
            <div className="supplier-product-tags">
              {supplier.categories.map((category) => <span key={category}>{category}</span>)}
            </div>
            <p>代表商品：{supplier.productNames.join('、')}</p>
          </div>

          <footer>
            <button type="button" onClick={() => navigate(`/suppliers/${supplier.id}`)}>查看企业主页</button>
          </footer>
        </article>)}
      </section>

      {filteredSuppliers.length === 0 && <div className="supplier-empty">
        <Search />
        <h2>未找到匹配供应商</h2>
        <p>请更换关键词或切换供应商分类。</p>
      </div>}
    </main>
    <SiliconAssistant onSearch={executeSearch}/>
  </div>
}
