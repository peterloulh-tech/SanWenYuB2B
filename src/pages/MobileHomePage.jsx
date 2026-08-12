import {
  BadgeDollarSign, Building2, ChartNoAxesCombined, ChevronRight, ClipboardList,
  Fish, Home, PackageSearch, Search, ShieldCheck, ShoppingCart, Snowflake, Store, Truck, UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import '../styles/admin-mobile.css'

const actions = [[ShoppingCart,'我要采购','找产品 速下单','/products','blue'],[Fish,'我要卖鱼','发布商品 拓销路','/suppliers','orange'],[ClipboardList,'发布需求','提出需求 等报价','/procurement/new','green'],[ChartNoAxesCombined,'查看行情','价格趋势 实时看','/market','purple']]
const quotes = [['3–4kg/尾','¥153.2','↑ 2.1%','up'],['4–5kg/尾','¥158.0','↑ 1.2%','up'],['5kg+/尾','¥166.0','↓ 0.4%','down']]
const needs = [['上海','冰鲜三文鱼 3–4kg/尾','20吨','已有6家报价'],['广州','三文鱼鱼柳','10吨','已有3家报价'],['北京','三文鱼切片','8吨','已有2家报价']]

function MobileNav({ active='home' }) { return <nav className="m-tabbar"><Link className={active==='home'?'active':''} to="/mobile"><Home/><span>首页</span></Link><Link className={active==='trade'?'active':''} to="/mobile/trade"><Fish/><span>交易</span></Link><Link to="/services/orders"><ClipboardList/><span>订单</span></Link><Link to="/login"><UserRound/><span>我的</span></Link></nav> }
export { MobileNav }

export default function MobileHomePage() {
 return <div className="m-page m-home">
  <header className="m-home-head"><div className="m-status"><b>9:41</b><span>▮▮▮　⌁　▱</span></div><div className="m-brand"><span className="m-fish-logo">◒</span><div><b>三文鱼数字化交易平台</b><small>产地直发 · 冷链履约 · 批次可溯</small></div><em>•••　◉</em></div>
   <div className="m-role"><span><Building2/></span><div><b>当前：采购企业</b><small>企业采购价 · 批量起订 · 对公结算</small></div><button>切换 ⇄</button></div>
   <label className="m-search"><Search/><input placeholder="搜索商品 / 规格 / 企业" /></label>
   <section className="m-hero"><span>日照产地直发</span><h1>好鱼从日照出海 鲜达全国</h1><p>固定规格 · 批次可溯 · 冷链配送</p><Link to="/products">立即找货 <ChevronRight/></Link><i/></section>
  </header>
  <main className="m-content">
   <section className="m-actions">{actions.map(([Icon,t,d,to,tone])=><Link to={to} key={t}><span className={tone}><Icon/></span><b>{t}</b><small>{d}</small></Link>)}</section>
   <section className="m-card"><h2>今日行情<Link to="/market">查看全部 <ChevronRight/></Link></h2><div className="m-quotes">{quotes.map(([s,p,c,t])=><article key={s}><span>{s}</span><strong>{p}<small>/kg</small></strong><em className={t}>{c}</em></article>)}</div></section>
   <section className="m-card"><h2>热门现货<Link to="/products">更多 <ChevronRight/></Link></h2><div className="m-products"><Link to="/products/1"><span className="fish-photo whole"/><div><b>日照冰鲜三文鱼</b><small>3–4kg/尾</small><strong>¥153.2<small>/kg</small></strong><em>● 平台认证</em></div></Link><Link to="/products/2"><span className="fish-photo fillet"/><div><b>三文鱼鱼柳</b><small>1–1.5kg/块</small><strong>¥168.0<small>/kg</small></strong><em>● 平台认证</em></div></Link></div></section>
   <section className="m-card"><h2>最新采购需求<Link to="/procurement">更多 <ChevronRight/></Link></h2><div className="m-needs">{needs.map(r=><Link to="/procurement/1" key={r[0]}><ClipboardList/>{r.map(v=><span key={v}>{v}</span>)}<ChevronRight/></Link>)}</div></section>
   <section className="m-card m-services"><h2>产业服务</h2><div>{[[ShieldCheck,'批次追溯','来源可溯\n批次可查'],[Truck,'冷链物流','全程冷链\n安全送达'],[BadgeDollarSign,'供应链金融','融资授信\n助力周转'],[Store,'商家入驻','快速入驻\n共拓市场']].map(([I,t,d])=><article key={t}><I/><p><b>{t}</b><small>{d}</small></p></article>)}</div></section>
  </main><MobileNav />
 </div>
}
