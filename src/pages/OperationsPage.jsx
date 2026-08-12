import {
  AlertTriangle, Bell, Building2, ChartNoAxesCombined, ClipboardCheck,
  ClipboardList, Coins, FileCheck2, Info, PackageCheck, ShieldAlert, ShoppingBag,
} from 'lucide-react'
import AdminSidebar from '../components/layout/AdminSidebar'
import '../styles/admin-mobile.css'

const kpis = [
  [Coins, '今日交易额', '¥ 2,856万', 'blue'], [ClipboardList, '今日订单', '342单', 'blue'],
  [Building2, '新增企业', '12家', 'blue'], [ShoppingBag, '待审商品', '18个', 'blue'],
  [AlertTriangle, '异常订单', '3单', 'orange'], [ClipboardCheck, '待办任务', '5类', 'blue'],
]
const todos = [['企业资质待审核', '6家'], ['商品信息待审核', '12个'], ['采购需求待审核', '4条'], ['售后/交易争议待处理', '2单'], ['合同或单据待确认', '3项']]
const risks = [
  [AlertTriangle, '冷链温度异常', '1单 / 订单202608080015', 'orange'],
  [PackageCheck, '企业资质即将到期', '3家 / 30日内到期', 'orange'],
  [ShieldAlert, '订单履约超时', '2单 / 超过预计发货时间', 'red'],
  [Info, '价格波动提醒', '1项 / 冰鲜3–4kg价格短时上涨', 'blue'],
]

export default function OperationsPage() {
  return <div className="ops-page">
    <header className="ops-header">
      <div className="ops-logo"><span className="ops-logo-mark">◒</span><b>三文鱼数字化交易平台</b><em>运营管理端</em></div>
      <div className="ops-user"><span className="ops-bell"><Bell /><i>6</i></span><span className="ops-avatar">👨🏻</span><b>管理员 张XX</b><span>⌄</span></div>
    </header>
    <div className="ops-body"><AdminSidebar /><main className="ops-main">
      <div className="ops-title"><h1>平台运营工作台</h1><span>今日平台运营与待办事项</span></div>
      <section className="ops-kpis">{kpis.map(([Icon, label, value, tone]) => <article key={label}><span className={tone}><Icon /></span><div><p>{label}</p><strong className={tone}>{value}</strong></div></article>)}</section>
      <section className="ops-grid top">
        <article className="ops-card"><h2><ClipboardCheck />今日待办</h2><div className="ops-todo">{todos.map(([label, count]) => <p key={label}><span>{label}</span><b>{count}</b><button>去处理</button></p>)}</div></article>
        <article className="ops-card ops-overview"><h2><ChartNoAxesCombined />交易概览</h2><div className="ops-chart-wrap"><div className="ops-chart-number"><span>近7日交易额</span><strong>¥1.86亿</strong><small>较上周 <b>+8.6% ↑</b></small></div><div className="ops-line-chart"><div className="ops-range"><b>7日</b><span>30日</span></div><svg viewBox="0 0 520 185" preserveAspectRatio="none"><g className="grid"><path d="M0 30H520M0 75H520M0 120H520M0 165H520"/></g><path className="area" d="M0 142 C60 125 70 92 130 100 S200 128 250 92 S320 42 370 75 S445 93 520 25 L520 165 L0 165Z"/><path className="line" d="M0 142 C60 125 70 92 130 100 S200 128 250 92 S320 42 370 75 S445 93 520 25"/><g className="dots"><circle cx="0" cy="142" r="4"/><circle cx="130" cy="100" r="4"/><circle cx="250" cy="92" r="4"/><circle cx="370" cy="75" r="4"/><circle cx="520" cy="25" r="4"/></g></svg><div className="ops-axis"><span>8/9</span><span>8/10</span><span>8/11</span><span>8/12</span><span>8/13</span><span>8/14</span><span>8/15</span></div></div></div></article>
      </section>
      <section className="ops-grid bottom">
        <article className="ops-card"><h2><ShieldAlert className="risk-title" />异常与风险</h2><div className="ops-risks">{risks.map(([Icon, label, detail, tone]) => <p key={label}><span className={tone}><Icon /></span><b>{label}</b><em>{detail}</em><button>查看</button></p>)}</div></article>
        <article className="ops-card"><h2><ChartNoAxesCombined />平台业务概况</h2><div className="ops-business"><div><span>入驻供应商</span><strong>1,268<small>家</small></strong></div><div><span>采购企业</span><strong>3,506<small>家</small></strong></div><div><span>在售商品</span><strong>2,158<small>个</small></strong></div><div><span>本月交易量</span><strong>5,280<small>吨</small></strong></div></div></article>
      </section>
      <footer className="ops-footer">© 2026 三文鱼数字化交易平台 版权所有</footer>
    </main></div>
  </div>
}
