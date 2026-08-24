import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeDollarSign, ChevronRight, ClipboardCheck, CookingPot, Fish, Newspaper, ScanLine, Search, Shell, ShoppingCart, WalletCards, Wrench } from 'lucide-react'
import { homeService } from '../services/homeService'
import { additionalEnterpriseActions, enterprisePrimaryActions } from '../data/enterpriseHomeActions'
import SiliconAssistant from '../components/ai/SiliconAssistant'
import PlatformSubjects from '../components/business/PlatformSubjects'
import { normalizeVoiceSearchText } from '../features/voice/voiceSearch'
import '../styles/home-page.css'

const financeItems = [[Fish,'养殖期融资','鱼在海里，钱先到'],[WalletCards,'存货质押融资','鱼在库里，钱先回来'],[ClipboardCheck,'订单融资','订单在手，资金无忧'],[BadgeDollarSign,'账期支付','先提货，后付款']]
const actionIcons = { purchase: ShoppingCart, sourcing: ClipboardCheck, news: Newspaper, service: Wrench, processed: CookingPot, seafood: Shell, traceability: ScanLine }
const actionIconImages = {
  sell: '/assets/home-icons/quick-sell-original.png',
  upstream: '/assets/home-icons/quick-aquaculture-original.png',
}
const statIconImages = [
  '/assets/home-icons/stat-suppliers-2026-08-16-v2.png',
  '/assets/home-icons/stat-buyers-2026-08-16-v2.png',
  '/assets/home-icons/stat-volume-2026-08-16-v2.png',
  '/assets/home-icons/stat-cities-2026-08-16-v2.png',
]

function HomeActionIcon({ icon, color }) {
  const image = actionIconImages[icon]
  if (image) return <span className="action-icon original-image"><img src={image} alt="" aria-hidden="true"/></span>
  const Icon = actionIcons[icon]
  return <span className={`action-icon ${color}`}><Icon size={31}/></span>
}

function HomeProductCard({ product, duplicate }) {
  return <Link className="home-product-card" to={`/products/${product.id}`} tabIndex={duplicate ? -1 : undefined}>
    <img src={product.image} alt={product.name}/>
    <span className="home-product-card-body">
      <b>{product.name}</b>
      <small>产地：{product.origin}</small>
      <small>形态：{product.productForm}</small>
      <small>规格：{product.spec}</small>
      <span className="home-product-card-footer"><strong>{product.price}</strong><em>查看详情 <ChevronRight/></em></span>
    </span>
  </Link>
}

export default function HomePage(){
  const [data,setData]=useState(null); const [searchKeyword,setSearchKeyword]=useState(''); const navigate=useNavigate()
  useEffect(()=>{homeService.getHome().then(setData)},[])

  function performHomeSearch(value = searchKeyword) {
    const keyword = normalizeVoiceSearchText(value)
    const params = new URLSearchParams()
    params.set('section', 'all')
    if (keyword) {
      params.set('keyword', keyword)
    }
    navigate(`/products?${params.toString()}`)
  }

  function submitHomeSearch(event) {
    event.preventDefault()
    performHomeSearch()
  }

  function handleVoiceSearch(keyword) {
    setSearchKeyword(keyword)
    performHomeSearch(keyword)
  }

  return <>
    <section className="hero-banner"><div className="hero-content"><div className="hero-copy"><div className="hero-search-stack"><h1>端稳中国海洋饭碗·挺起国产三文鱼脊梁</h1><div className="official-channel-mark"><ScanLine/>日照深海三文鱼唯一官方购买渠道</div><form className="hero-search platform-search" onSubmit={submitHomeSearch}><Search size={21}/><input aria-label="搜索企业商品" value={searchKeyword} onChange={(event)=>setSearchKeyword(event.target.value)} placeholder="搜索商品、品种、产地或供应商"/><button type="submit">搜索</button></form></div></div></div></section>
    <section className="quick-actions page-container relative z-10 grid grid-cols-4 gap-3">{enterprisePrimaryActions.map(({icon,title,description,path,color})=><button onClick={()=>navigate(path)} key={icon} className="action-card"><HomeActionIcon icon={icon} color={color}/><span className="text-left"><b>{title}</b><small>{description}</small></span><ChevronRight className="ml-auto text-blue-600"/></button>)}</section>
    <section className="quick-actions quick-actions-secondary page-container relative z-10 grid grid-cols-4 gap-3">{additionalEnterpriseActions.map(({icon,title,description,path,color})=><button onClick={()=>navigate(path)} key={icon} className="action-card"><HomeActionIcon icon={icon} color={color}/><span className="text-left"><b>{title}</b><small>{description}</small></span><ChevronRight className="ml-auto text-blue-600"/></button>)}</section>
    {/* 按用户要求暂时注释供应链金融横幅，保留原实现，后续可直接恢复。
    <section className="home-finance page-container"><div className="home-finance-intro"><span><BadgeDollarSign/></span><div><h3>供应链金融 <em>NEW</em></h3><p>让真实交易数据成为企业融资依据</p><small>基于养殖档案、库存、订单及履约数据，对接合作银行提供融资服务</small></div></div><div className="home-finance-services">{financeItems.map(([I,t,s])=><div key={t}><span><I/></span><p><b>{t}</b><small>{s}</small></p></div>)}</div><div className="home-finance-actions"><button onClick={()=>navigate('/finance/apply')}>测一测能贷多少</button><button onClick={()=>navigate('/finance')}>进入金融服务 →</button></div></section>
    */}
    {data ? <><main className="home-dashboard page-container">
      <section className="home-panel hot-panel"><header><h2>热门现货</h2><Link to="/products">更多 ›</Link></header><div className="home-product-marquee" role="region" aria-label="热门现货连续滚动商品"><div className="home-product-track">{[false,true].map((duplicate)=><div className="home-product-group" aria-hidden={duplicate} key={String(duplicate)}>{data.products.map((product)=><HomeProductCard product={product} duplicate={duplicate} key={`${duplicate}-${product.id}`}/>)}</div>)}</div></div></section>
      <section className="home-panel demand-panel"><header><h2>最新采购需求</h2><Link to="/procurement">更多 ›</Link></header>{data.demands.map(d=><Link className="home-demand-row" to={`/procurement/${d.id}`} key={d.id}><ClipboardCheck/><div><b>{d.name}</b><span className="home-row-meta"><p>{d.amount} · {d.city}</p><small>截止 {d.deadline}</small></span></div><span>查看报价</span></Link>)}</section>
      <section className="home-panel supplier-panel"><header><h2>优质供应商</h2><Link to="/suppliers">更多 ›</Link></header>{data.suppliers.map((s,i)=><Link className="home-supplier-row" to={`/suppliers/${i+1}`} key={s}><span className={`supplier-logo s${i}`}><Fish/></span><div><b>{s}</b><span className="home-row-meta"><p>整鱼/鱼柳/切片</p><small>{['日照市','威海市/荣成市','青岛市即墨区','大连市'][i]}</small></span></div><em>平台认证</em></Link>)}</section>
    </main><section className="home-stats page-container">{data.stats.map((s,i)=><div key={s[0]}><img className="home-stat-icon" src={statIconImages[i]} width="60" height="60" alt="" aria-hidden="true"/><p><span>{s[0]}</span><strong>{s[1]}</strong><small>{s[2]}</small></p></div>)}</section><PlatformSubjects/></>:<div className="p-20 text-center text-blue-600">正在加载平台数据...</div>}
    <SiliconAssistant onSearch={handleVoiceSearch}/>
  </>
}
