import { ArrowLeft, Building2, Film, Landmark, PackageSearch } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { findIndustryProduct, industryProducts } from '../data/industryProducts'
import { findPlatformEntity } from '../data/platformEntities'
import { filterSupplierDirectory } from '../data/supplierDirectory'
import '../styles/report-remediation.css'

export default function SupplierDetailPage() {
  const { id } = useParams()
  const entity = findPlatformEntity(id)
  const supplier = filterSupplierDirectory({ section: 'all' }).find((item) => String(item.id) === String(id))

  if (!entity && !supplier) return <main className="remediation-page"><div className="page-container remediation-empty"><PackageSearch/><h1>未找到该主体或供应商</h1><Link to="/suppliers">返回供应商大厅</Link></div></main>

  const name = entity?.name || supplier.name
  const type = entity?.type || '企业'
  const products = entity ? entity.productIds.map(findIndustryProduct).filter(Boolean) : industryProducts.filter((product) => product.supplier === supplier.name)
  const TypeIcon = type === '行业协会' ? Landmark : Building2

  return <main className="remediation-page supplier-detail-page">
    <div className="page-container remediation-body">
      <Link className="remediation-back" to="/suppliers"><ArrowLeft/>返回供应商大厅</Link>
      <section className="supplier-profile-hero"><div className="supplier-profile-logo">{entity?.logo ? <img src={entity.logo} alt={`${name} Logo`}/> : <><TypeIcon/><small>{entity?.logoStatus || 'Logo 资料待补充'}</small></>}</div><div><span>{type}</span><h1>{name}</h1><p>{entity?.region || supplier.region}</p><em>平台承担主体相关资料按已提供内容展示；缺失资料不编造。</em></div></section>
      <section className="supplier-profile-grid">
        <article><h2>简介</h2><p>{entity?.introduction || '企业简介资料待补充'}</p></article>
        <article><h2>公开信息</h2><p>{entity?.publicInfo || '公开联系方式与职责资料待补充'}</p></article>
        <article><h2>品牌</h2><p>{entity?.brands || '品牌资料待补充'}</p></article>
        <article><h2>商标</h2><p>{entity?.trademarks || '商标资料待补充'}</p></article>
        <article><h2>专利成果</h2><p>{entity?.patents || '专利成果资料待补充'}</p></article>
      </section>
      <section className="supplier-profile-products"><header><h2>产品</h2><span>{products.length ? `${products.length} 项演示商品` : '资料待补充'}</span></header>{products.length ? <div>{products.map((product) => <article key={product.id}><img src={product.image} alt={product.name}/><div><h3>{product.name}</h3><p>{product.spec} · {product.productForm}</p><span>演示数据</span></div><footer><Link to={`/products/${product.id}`}>查看商品</Link>{product.traceBatchCode&&<Link to={`/traceability?batch=${product.traceBatchCode}`}>查看溯源</Link>}</footer></article>)}</div> : <p className="inline-placeholder">产品资料待补充</p>}</section>
      <section className="supplier-videos"><header><div><Film/><span><h2>企业影像</h2><p>企业宣传、新闻报道、专题纪录、直播回放</p></span></div></header><div className="video-placeholder"><Film/><h3>视频资料待补充</h3><p>收到企业原始视频、标题、日期、来源与公开使用口径后本地接入；当前不抓取微信视频号。</p></div></section>
    </div>
  </main>
}
