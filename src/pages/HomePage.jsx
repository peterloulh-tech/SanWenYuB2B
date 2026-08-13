import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BadgeDollarSign, BarChart3, Building2, ChevronRight, ClipboardCheck, Fish, Landmark, MapPin, Search, Settings2, ShieldCheck, ShoppingCart, TrendingUp, UsersRound, WalletCards, Wrench } from 'lucide-react'
import { homeService } from '../services/homeService'
import { additionalEnterpriseActions } from '../data/enterpriseHomeActions'
import '../styles/home-page.css'

const actions = [
  [ShoppingCart,'我要采购','找产品、查现货、快速下单','/products','blue'],
  [Fish,'我要卖鱼','发布商品、管理订单、扩大销售','/suppliers','orange'],
  [ClipboardCheck,'我要找货','发布采购需求、等待供应商报价','/procurement','green'],
  [BarChart3,'查看行情','查看价格、成交量和走势','/market','violet'],
]
const financeItems = [[Fish,'养殖期融资','鱼在海里，钱先到'],[WalletCards,'存货质押融资','鱼在库里，钱先回来'],[ClipboardCheck,'订单融资','订单在手，资金无忧'],[BadgeDollarSign,'账期支付','先提货，后付款']]
const additionalActionIcons = { service: Wrench, 'pending-one': Settings2, 'pending-two': Landmark, 'pending-three': Building2 }

export default function HomePage(){
  const [data,setData]=useState(null); const navigate=useNavigate()
  useEffect(()=>{homeService.getHome().then(setData)},[])
  return <>
    <section className="hero-banner"><div className="hero-content"><div className="hero-copy"><h1>三文鱼数字化交易平台</h1><p>连接优质养殖资源 · 服务全国采购市场</p><div className="hero-search"><Search size={21}/><input placeholder="搜索产品、规格、供应商、采购需求"/><button onClick={()=>navigate('/products')}>搜索</button></div><div className="hero-abilities">{[[ShieldCheck,'国企平台'],[ShieldCheck,'安全可靠'],[ShoppingCart,'在线交易'],[BarChart3,'市场行情']].map(([I,t])=><span key={t}><I size={22}/>{t}</span>)}</div></div><div className="hero-slogan"><strong>日照起航<br/>服务全国</strong><span>国企平台 · 值得信赖</span></div></div></section>
    <section className="quick-actions page-container relative z-10 grid grid-cols-4 gap-3">{actions.map(([I,t,s,to,c])=><button onClick={()=>navigate(to)} key={t} className="action-card"><span className={`action-icon ${c}`}><I size={31}/></span><span className="text-left"><b>{t}</b><small>{s}</small></span><ChevronRight className="ml-auto text-blue-600"/></button>)}</section>
    <section className="quick-actions quick-actions-secondary page-container relative z-10 grid grid-cols-4 gap-3">{additionalEnterpriseActions.map(({icon,title,description,path,color})=>{const Icon=additionalActionIcons[icon];return <button onClick={()=>path?navigate(path):window.alert('功能规划中')} key={icon} className={`action-card ${path?'':'action-card-pending'}`}><span className={`action-icon ${color}`}><Icon size={31}/></span><span className="text-left"><b>{title}</b><small>{description}</small></span><ChevronRight className="ml-auto text-blue-600"/></button>})}</section>
    {/* 按用户要求暂时注释供应链金融横幅，保留原实现，后续可直接恢复。
    <section className="home-finance page-container"><div className="home-finance-intro"><span><BadgeDollarSign/></span><div><h3>供应链金融 <em>NEW</em></h3><p>让真实交易数据成为企业融资依据</p><small>基于养殖档案、库存、订单及履约数据，对接合作银行提供融资服务</small></div></div><div className="home-finance-services">{financeItems.map(([I,t,s])=><div key={t}><span><I/></span><p><b>{t}</b><small>{s}</small></p></div>)}</div><div className="home-finance-actions"><button onClick={()=>navigate('/finance/apply')}>测一测能贷多少</button><button onClick={()=>navigate('/finance')}>进入金融服务 →</button></div></section>
    */}
    {data ? <><main className="home-dashboard page-container">
      <section className="home-panel market-panel"><header><h2>今日市场</h2><Link to="/market">更多 ›</Link></header><div className="market-row"><span className="blue"><BadgeDollarSign/></span><div><small>今日均价（元/公斤）</small><strong>{data.market.price}</strong></div><em>较昨日<br/><b>{data.market.increase}</b></em></div><div className="market-row"><span className="orange"><TrendingUp/></span><div><small>涨跌幅</small><strong className="red">{data.market.increase} ↗</strong></div></div><div className="market-row"><span className="green"><Fish/></span><div><small>今日交易量（吨）</small><strong>{data.market.volume}</strong></div></div></section>
      <section className="home-panel hot-panel"><header><h2>热门现货</h2><Link to="/products">更多 ›</Link></header><div className="home-product-grid">{data.products.map(p=><article key={p.id}><img src={p.image} alt={p.name}/><b>{p.name}</b><small>规格：{p.spec}</small><strong>¥{p.price}<small>/kg</small></strong><p>供应商：{p.supplier}</p><Link to={`/products/${p.id}`}>查看详情</Link></article>)}</div></section>
      <section className="home-panel demand-panel"><header><h2>最新采购需求</h2><Link to="/procurement">更多 ›</Link></header>{data.demands.map(d=><Link className="home-demand-row" to={`/procurement/${d.id}`} key={d.id}><ClipboardCheck/><div><b>{d.name}</b><p>需求量：{d.amount}　目的地：{d.city}</p><small>截止时间：{d.deadline}</small></div><span>查看报价</span></Link>)}</section>
      <section className="home-panel supplier-panel"><header><h2>优质供应商</h2><Link to="/suppliers">更多 ›</Link></header>{data.suppliers.map((s,i)=><Link className="home-supplier-row" to={`/suppliers/${i+1}`} key={s}><span className={`supplier-logo s${i}`}><Fish/></span><div><b>{s}</b><small>{['日照市','威海市/荣成市','青岛市即墨区','大连市'][i]}</small><p>主营：整鱼、鱼柳、切片</p></div><em>平台认证</em></Link>)}</section>
    </main><section className="home-stats page-container">{data.stats.map((s,i)=>{const I=[UsersRound,Building2,TrendingUp,MapPin][i];return <div key={s[0]}><I/><p><span>{s[0]}</span><strong>{s[1]}</strong><small>{s[2]}</small></p></div>})}</section></>:<div className="p-20 text-center text-blue-600">正在加载平台数据...</div>}
  </>
}
