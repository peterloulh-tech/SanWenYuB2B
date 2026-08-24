import { useMemo, useState } from 'react'
import { BadgeCheck, ClipboardList, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
import '../styles/trade-pages.css'

const demands = [
  { name: '冰鲜三文鱼', spec: '3–4kg/尾', amount: '20吨', city: '上海', deadline: '8月15日前', company: '上海XX食品有限公司', quotes: '6', image: '/assets/products/whole-salmon-on-ice.png', type: '整鱼', status: '报价中' },
  { name: '三文鱼鱼柳', spec: '1–1.5kg/块', amount: '10吨', city: '广州', deadline: '8月18日前', company: '广州XX餐饮供应链有限公司', quotes: '3', image: '/assets/products/salmon-fillet.png', type: '鱼柳', status: '报价中' },
  { name: '冷冻整鱼', spec: '4–5kg/尾', amount: '30吨', city: '成都', deadline: '8月20日前', company: '成都XX商贸有限公司', quotes: '4', image: '/assets/products/whole-salmon-on-ice.png', type: '整鱼', status: '即将截止' },
  { name: '三文鱼切片', spec: '500g/包', amount: '8吨', city: '北京', deadline: '8月12日前', company: '北京XX生鲜有限公司', quotes: '2', image: '/assets/products/salmon-slices.png', type: '切片', status: '已截止' },
  { name: '去骨鱼柳', spec: '1kg/块', amount: '12吨', city: '杭州', deadline: '8月16日前', company: '杭州XX供应链有限公司', quotes: '5', image: '/assets/products/salmon-fillet.png', type: '鱼柳', status: '报价中' },
]

const productTypes = ['全部产品', ...new Set(demands.map(({ type }) => type))]
const deliveryCities = ['全部地区', ...new Set(demands.map(({ city }) => city))]
const demandStatuses = ['全部状态', ...new Set(demands.map(({ status }) => status))]

export default function ProcurementPage() {
  const navigate = useNavigate()
  const [keywordInput, setKeywordInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const [productType, setProductType] = useState('全部产品')
  const [deliveryCity, setDeliveryCity] = useState('全部地区')
  const [status, setStatus] = useState('全部状态')

  const filteredDemands = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase()
    return demands.filter((demand) => {
      if (productType !== '全部产品' && demand.type !== productType) return false
      if (deliveryCity !== '全部地区' && demand.city !== deliveryCity) return false
      if (status !== '全部状态' && demand.status !== status) return false
      const searchable = [demand.name, demand.spec, demand.company, demand.city, demand.type, demand.status].join(' ').toLowerCase()
      return !normalizedKeyword || searchable.includes(normalizedKeyword)
    })
  }, [deliveryCity, keyword, productType, status])

  function executeSearch(value = keywordInput) {
    const normalizedKeyword = normalizeVoiceSearchText(value)
    setKeywordInput(normalizedKeyword)
    setKeyword(normalizedKeyword)
    setProductType('全部产品')
    setDeliveryCity('全部地区')
    setStatus('全部状态')
  }

  return <main className="tp-page tp-demand-page">
    <div className="tp-crumb">首页 <b>›</b> 采购大厅</div>
    <section className="tp-title-row"><div><h1>采购需求大厅</h1><p>发布采购需求 · 多家供应商在线报价</p></div><div className="tp-title-actions"><form className="tp-title-search platform-search" onSubmit={(event) => { event.preventDefault(); executeSearch() }}><Search/><input aria-label="搜索采购需求" value={keywordInput} onChange={(event) => setKeywordInput(event.target.value)} placeholder="搜索采购产品、采购企业"/><button type="submit">搜索</button></form><button className="tp-primary" onClick={() => navigate('/procurement/new')}><Plus/>发布采购需求</button><button className="tp-outline"><ClipboardList/>我的采购需求</button></div></section>
    <section className="tp-demand-filters">
      <select aria-label="按产品类型筛选" value={productType} onChange={(event) => setProductType(event.target.value)}>{productTypes.map((option) => <option key={option}>{option}</option>)}</select>
      <select aria-label="按交付地区筛选" value={deliveryCity} onChange={(event) => setDeliveryCity(event.target.value)}>{deliveryCities.map((option) => <option key={option}>{option}</option>)}</select>
      <select aria-label="按采购状态筛选" value={status} onChange={(event) => setStatus(event.target.value)}>{demandStatuses.map((option) => <option key={option}>{option}</option>)}</select>
    </section>
    <section className="tp-demand-list">{filteredDemands.map((demand) => {
      const demandIndex = demands.indexOf(demand)
      return <article key={demand.name}>
        <span className="tp-buy-label">求购<small>{demand.status}</small></span><img src={demand.image} alt={demand.name}/><div className="tp-demand-name"><h2>{demand.name}</h2><p>规格　{demand.spec}</p></div><dl><div><dt>采购量</dt><dd>{demand.amount}</dd></div><div><dt>交付地</dt><dd>{demand.city}</dd></div><div><dt>到货要求</dt><dd>{demand.deadline}</dd></div></dl><div className="tp-demand-company"><h3>{demand.company}</h3><span><BadgeCheck/>平台认证</span></div><p className="tp-quotes">已有 <strong>{demand.quotes}</strong> 家报价</p><button className="tp-outline" onClick={() => navigate(`/procurement/CG2026081100${demandIndex + 1}`)}>查看报价</button>
      </article>
    })}</section>
    {filteredDemands.length === 0 && <div className="tp-demand-empty"><Search/><h2>没有找到匹配采购需求</h2><p>请更换关键词或重置筛选条件。</p></div>}
    <div className="tp-list-foot"><p>共 <b>{filteredDemands.length}</b> 条匹配演示需求</p>{filteredDemands.length > 0 && <div className="tp-pagination"><button className="active">1</button></div>}</div>
    <SiliconAssistant onSearch={executeSearch}/>
  </main>
}
