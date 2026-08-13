import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Boxes, Factory, FlaskConical, PackageCheck, Search, Ship, Snowflake, Warehouse } from 'lucide-react'
import { filterIndustryServices, getIndustryServiceCardFacts, industryServiceCategories, industryServices } from '../data/industryServices'
import '../styles/industry-services.css'

const categoryIcons = {
  processing: Factory,
  packaging: PackageCheck,
  inspection: FlaskConical,
  warehousing: Warehouse,
  'cold-chain': Snowflake,
  shipping: Ship,
}

export default function IndustryServicesPage() {
  const navigate = useNavigate()
  const [category, setCategory] = useState('all')
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const services = useMemo(() => filterIndustryServices(industryServices, { category, keyword }), [category, keyword])

  return <main className="industry-services-page">
    <section className="industry-services-hero">
      <div className="page-container industry-services-hero-inner">
        <div><p>首页　›　产业服务</p><h1>产业服务大厅</h1><span>汇集加工、包装、检测、仓储与运输服务，帮助企业快速找到服务商</span></div>
        <div className="industry-hero-actions">
          <label><Search/><input value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && setKeyword(keywordInput)} placeholder="搜索服务名称、服务商或地区"/></label>
          <button type="button" onClick={() => setKeyword(keywordInput)}>搜索</button>
          <button type="button" onClick={() => navigate('/services/cold-chain-transport#request')}>发布服务需求</button>
        </div>
      </div>
    </section>

    <div className="page-container industry-services-body">
      <section className="industry-category-grid">
        {industryServiceCategories.map((item) => { const Icon = categoryIcons[item.id]; return <button className={category === item.id ? 'active' : ''} onClick={() => setCategory(category === item.id ? 'all' : item.id)} key={item.id}><span><Icon/></span><b>{item.name}</b><small>{item.description}</small></button> })}
      </section>

      <section className="industry-service-list-heading"><div><Boxes/><h2>推荐产业服务</h2><span>以下均为静态演示数据</span></div><button onClick={() => navigate('/services/orders')}>订单履约中心 <ArrowRight/></button></section>
      <section className="industry-service-grid">
        {services.map((service) => <article key={service.id}>
          <header><span><BadgeCheck/>平台认证</span><em>{industryServiceCategories.find((item) => item.id === service.category)?.name}</em></header>
          <h2>{service.name}</h2><p className="industry-provider">{service.provider}</p>
          <dl>{getIndustryServiceCardFacts(service).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>
          <footer><button onClick={() => navigate(`/services/${service.id}`)}>查看服务</button><button onClick={() => navigate(`/services/${service.id}#request`)}>立即咨询</button></footer>
        </article>)}
      </section>
      {services.length === 0 && <div className="industry-empty">没有找到匹配服务，请更换关键词或分类。</div>}
    </div>
  </main>
}
