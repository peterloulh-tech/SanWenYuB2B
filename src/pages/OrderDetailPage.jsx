import { useParams } from 'react-router-dom'
import {
  Check, ChevronRight, ClipboardList, FileCheck2, FileText, MessageCircle,
  ReceiptText, ShieldCheck, Thermometer, Truck, Weight
} from 'lucide-react'
import '../styles/service-pages.css'

const steps = ['订单确认','合同确认','付款确认','备货称重','冷链运输','到货确认','最终结算']
const route = [['日照','8月14日 08:30','已发货'],['临沂','8月14日 12:40','运输中'],['苏州','8月15日 03:20','当前'],['上海','预计 8月15日 10:30','待到达']]
const tempPoints='0,65 22,54 44,61 66,52 88,59 110,50 132,61 154,53 176,64 198,53 220,64 242,54 264,63 286,56 308,67 330,60 352,71 374,64 396,70 418,68 440,63 462,62 484,55 506,48 528,53 550,40 572,49 594,44 616,52 638,47 660,60 682,58 704,66 726,61 748,69 770,73 792,64 814,59 836,65 858,70 880,65 902,58 924,60 946,54 968,59 990,55 1012,58 1034,64'

export default function OrderDetailPage(){ const {id}=useParams(); return <main className="order-fulfillment-page">
  <div className="page-container order-fulfillment-wrap">
    <p className="service-crumb">首页 <ChevronRight/> 交易服务 <ChevronRight/> 订单履约</p>
    <header className="order-title"><h1>订单履约中心</h1><p>查看订单进度 · 跟踪冷链运输 · 完成收货结算</p></header>
    <section className="fulfillment-card order-overview"><header><h2>订单概要</h2><b>订单号：{id || '202608080001'}</b></header><div className="overview-product"><p><b>商品信息：</b><strong>冰鲜三文鱼</strong><span>3~4kg/尾</span></p><p><b>采购数量：</b><strong>20吨</strong><span>成交价：<em>¥152/kg</em></span></p></div><div className="overview-parties"><p>卖方：<strong>日照XX渔业商业有限公司</strong><span><ShieldCheck/>平台认证</span></p><p>买方：<strong>上海XX食品有限公司</strong></p></div><div className="overview-state"><p><span>运输中</span>当前状态：<em>待到货</em></p><p>预计到货：<strong>8月15日</strong></p></div></section>
    <section className="fulfillment-card progress-card"><h2>订单履约进度</h2><div className="fulfillment-progress">{steps.map((step,i)=><div className={i<4?'done':i===4?'current':''} key={step}><b>{i<4?<Check/>:i+1}</b><span>{step}</span></div>)}</div></section>
    <div className="fulfillment-middle">
      <section className="fulfillment-card logistics-card"><h2>物流进度</h2><div className="logistics-body"><dl><div><dt>发货时间：</dt><dd>8月14日 08:30</dd></div><div><dt>当前位置：</dt><dd>江苏苏州</dd></div><div><dt>预计到达：</dt><dd>8月15日 10:30</dd></div><div><dt>承运方式：</dt><dd>冷藏专车</dd></div><div><dt>运输状态：</dt><dd className="normal">正常</dd></div></dl><div className="route-timeline">{route.map((r,i)=><div className={i<2?'done':i===2?'current':''} key={r[0]}><i>{i<2&&<Check/>}</i><p><strong>{r[0]}</strong><span>{r[1]} <b>{r[2]}</b></span></p></div>)}</div></div></section>
      <section className="fulfillment-card temperature-card"><header><h2>冷链温度监控</h2></header><div className="temp-stats"><div><strong>2.8<small>°C</small></strong><span>温度正常 <Check/></span></div><p>最高：<em>3.4°C</em></p><p>最低：<b>1.8°C</b></p></div><div className="temp-meta"><span>温度(°C)</span><b>温度要求：0~4°C</b><em>--- 上限 4°C</em><i>--- 下限 0°C</i></div><div className="temperature-chart"><div className="temp-y"><span>6</span><span>4</span><span>2</span><span>0</span></div><span className="temp-limit top"/><span className="temp-limit bottom"/><svg viewBox="0 0 1034 100" preserveAspectRatio="none"><defs><linearGradient id="tempArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#176fff" stopOpacity=".22"/><stop offset="1" stopColor="#176fff" stopOpacity="0"/></linearGradient></defs><polygon points={`${tempPoints} 1034,100 0,100`} fill="url(#tempArea)"/><polyline points={tempPoints}/></svg><div className="temp-x"><span>8/14 08:00</span><span>8/14 12:00</span><span>8/14 16:00</span><span>8/15 20:00</span><span>8/15 00:00</span><span>8/15 04:00</span><span>8/15 08:00</span></div></div></section>
    </div>
    <section className="fulfillment-card weighing-card"><h2>出库称重</h2>{[['采购数量','20吨'],['实际出库','19.86吨'],['成交单价','¥152/kg'],['预估商品金额','¥3,040,000'],['实际商品金额','¥3,018,720']].map(([k,v],i)=><div key={k}><span>{k}</span><strong className={i===1||i===4?'orange':''}>{v}</strong></div>)}</section>
    <section className="fulfillment-card documents-card"><h2>交易单据</h2><div>{[[FileText,'电子合同'],[FileCheck2,'检测报告'],[ClipboardList,'出库单'],[Truck,'物流单'],[ReceiptText,'发票']].map(([Icon,t])=><button key={t}><Icon/>{t}</button>)}</div><aside><button><MessageCircle/>联系供应商</button><button className="primary"><Truck/>查看物流详情</button></aside></section>
  </div>
 </main> }
