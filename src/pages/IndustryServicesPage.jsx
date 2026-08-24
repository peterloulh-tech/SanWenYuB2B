import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Boxes, Factory, FlaskConical, Lightbulb, PackageCheck, Search, Ship, Snowflake, Warehouse } from 'lucide-react'
import { filterIndustryServices, getIndustryServiceCardFacts, industryServiceCategories, industryServices } from '../data/industryServices'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
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

  function executeSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    setKeyword(normalizedKeyword)
    setCategory('all')
  }

  return <main className="industry-services-page">
    <section className="industry-services-hero">
      <div className="page-container industry-services-hero-inner">
        <div><p>首页　›　产业服务</p><h1>产业服务大厅</h1><span>汇集加工、包装、检测、仓储与运输服务，帮助企业快速找到服务商</span></div>
        <div className="industry-hero-actions">
          <form className="platform-search" onSubmit={(event) => { event.preventDefault(); executeSearch() }}>
            <Search/><input aria-label="搜索产业服务" value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="搜索服务名称、服务商或地区"/><button type="submit">搜索</button>
          </form>
          <button className="hall-primary-action" type="button" onClick={() => navigate('/services/cold-chain-transport#request')}>发布服务需求</button>
        </div>
      </div>
    </section>

    <div className="page-container industry-services-body">
      <section className="patent-service-entry"><span><Lightbulb/></span><div><h2>专利成果</h2><p>查看深远海养殖、装备、加工、冷链与溯源方向的技术成果演示。</p></div><button type="button" onClick={() => navigate('/patents')}>进入专利成果 <ArrowRight/></button></section>
      <section className="industry-category-grid">
        {industryServiceCategories.map((item) => { const Icon = categoryIcons[item.id]; return <button className={category === item.id ? 'active' : ''} onClick={() => setCategory(category === item.id ? 'all' : item.id)} key={item.id}><span><Icon/></span><b>{item.name}</b><small>{item.description}</small></button> })}
      </section>

      <section className="industry-service-list-heading"><div><Boxes/><h2>{keyword || category !== 'all' ? '服务搜索结果' : '推荐产业服务'}</h2><span>共 {services.length} 项静态演示服务</span></div><button onClick={() => navigate('/services/orders')}>订单履约中心 <ArrowRight/></button></section>
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
    <SiliconAssistant onSearch={executeSearch}/>
  </main>
}
