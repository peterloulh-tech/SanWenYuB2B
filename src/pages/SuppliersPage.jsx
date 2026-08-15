import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BadgeCheck, Building2, MapPin, Search } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { suppliers } from '../data/mockData'
import '../styles/suppliers-page.css'

const supplierCities = ['日照', '威海', '青岛', '大连', '日照', '烟台']
const supplierProducts = ['冰鲜整鱼', '冷冻整鱼', '三文鱼柳', '精加工切片']
const supplierProfiles = suppliers.map((name, index) => ({
  id: index + 1,
  name,
  region: `山东省 · ${supplierCities[index]}`,
  products: supplierProducts,
}))

export default function SuppliersPage() {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const filteredSuppliers = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    if (!normalizedKeyword) return supplierProfiles

    return supplierProfiles.filter((supplier) => (
      [supplier.name, supplier.region, ...supplier.products]
        .join(' ')
        .toLowerCase()
        .includes(normalizedKeyword)
    ))
  }, [keyword])

  function submitSearch(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setKeyword(String(formData.get('keyword') || ''))
  }

  const searchAction = <form className="supplier-hero-search" onSubmit={submitSearch}>
    <label>
      <Search />
      <input
        aria-label="搜索供应商"
        name="keyword"
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return
          event.preventDefault()
          setKeyword(event.currentTarget.value)
        }}
        placeholder="搜索供应商名称、地区或主营产品"
      />
    </label>
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
            <h3>主营产品</h3>
            <div>{supplier.products.map((product) => <span key={product}>{product}</span>)}</div>
          </div>

          <footer>
            <button type="button" onClick={() => navigate(`/suppliers/${supplier.id}`)}>查看企业主页</button>
          </footer>
        </article>)}
      </section>

      {filteredSuppliers.length === 0 && <div className="supplier-empty">
        <Search />
        <h2>未找到匹配供应商</h2>
        <p>请更换企业名称、地区或主营产品关键词。</p>
      </div>}
    </main>
  </div>
}
