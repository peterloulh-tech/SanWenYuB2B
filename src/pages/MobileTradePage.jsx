import { Building2, ChevronRight, ClipboardCheck, ClipboardList, Fish, Package, PackageSearch, ShoppingCart, TrendingUp, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MobileNav } from './MobileHomePage'
import '../styles/admin-mobile.css'

export default function MobileTradePage(){return <div className="m-page m-trade">
 <header className="m-trade-head"><div className="m-status"><b>9:41</b><span>▮▮▮　⌁　▱</span></div><h1>交易中心</h1><em>•••　◉</em></header>
 <main className="m-trade-main">
  <div className="m-role"><span><Building2/></span><div><b>当前：采购方</b><small>企业采购 · 批量采购 · 对公结算</small></div><button>切换 ⇄</button></div>
  <h2>我要采购</h2><section className="m-buy-actions"><Link to="/products"><span><ShoppingCart/></span><div><b>现货采购</b><small>找现货 · 直接下单</small></div><em>去找货 <ChevronRight/></em></Link><Link to="/procurement/new"><span><ClipboardList/></span><div><b>发布采购需求</b><small>多家供应商在线报价</small></div><em>去发布 <ChevronRight/></em></Link></section>
  <div className="m-section-title"><h2>我的采购</h2><Link to="/services/orders">全部 <ChevronRight/></Link></div><section className="m-order-stats">{[[ClipboardList,'3','待报价'],[TrendingUp,'2','报价中'],[ClipboardCheck,'1','待确认'],[Truck,'4','履约中']].map(([I,n,t])=><Link to="/services/orders" key={t}><I/><b>{n}</b><span>{t}</span></Link>)}</section>
  <div className="m-section-title"><h2>进行中的采购</h2><Link to="/procurement">查看全部 <ChevronRight/></Link></div><section className="m-current"><Link to="/procurement/1"><span className="fish-photo whole"/><div><b>冰鲜三文鱼 3–4kg/尾</b><small>采购量：20吨　到货地：上海</small><p>已收到6家报价</p></div><em>报价中</em><strong>查看报价 <ChevronRight/></strong></Link><Link to="/procurement/2"><span className="fish-photo fillet"/><div><b>三文鱼柳 1–1.5kg/块</b><small>采购量：10吨　到货地：广州</small><p>等待供应商报价</p></div><em className="wait">待报价</em><strong>查看需求 <ChevronRight/></strong></Link></section>
  <h2>供应方服务</h2><section className="m-supplier-tools">{[[PackageSearch,'采购需求大厅','找采购需求','/procurement'],[ClipboardCheck,'我的报价','报价记录','/procurement'],[Truck,'待发货订单','处理待发货','/services/orders'],[Package,'商品管理','管理现货商品','/products']].map(([I,t,d,to])=><Link key={t} to={to}><span><I/></span><div><b>{t}</b><small>{d}</small></div></Link>)}</section>
 </main><MobileNav active="trade"/>
 </div>}
