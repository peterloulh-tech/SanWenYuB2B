import { BadgeCheck, ChevronDown } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import '../styles/trade-pages.css'

const quotes=[
  ['日照XX海洋渔业有限公司','¥ 152/kg','20吨','24小时内','98.6%','含冷链包装，运费根据交付地确认'],
  ['青岛XX水产有限公司','¥ 150/kg','15吨','48小时内','97.2%','支持分批供货'],
  ['威海XX食品有限公司','¥ 155/kg','20吨','今日发货','99.1%','无'],
]

export default function ProcurementDetailPage(){
  const nav=useNavigate(); const {id}=useParams()
  return <main className="tp-page tp-quote-page">
    <div className="tp-crumb">首页 <b>›</b> 采购大厅 <b>›</b> 采购需求详情</div>
    <section className="tp-request-summary"><header><h1>冰鲜三文鱼采购需求 <span>报价中</span></h1><button className="tp-outline">编辑需求</button></header><dl><div><dt>规格</dt><dd>3–4kg/尾</dd></div><div><dt>采购量</dt><dd>20吨</dd></div><div><dt>交付地</dt><dd>上海</dd></div><div><dt>到货要求</dt><dd>8月15日前</dd></div><div><dt>报价截止</dt><dd>8月10日 18:00</dd></div></dl><footer>采购企业：　上海XX食品有限公司　 <span><BadgeCheck/>平台认证</span></footer></section>
    <div className="tp-quote-title"><h2>已收到 <strong>6</strong> 家供应商报价</h2><div><button className="active">综合排序</button><button>价格最低</button><button>最快发货</button></div></div>
    <section className="tp-quote-list">{quotes.map(q=><article key={q[0]}><div className="tp-quote-company"><h3>{q[0]}</h3><span><BadgeCheck/>平台认证</span><p>报价说明：{q[5]}</p></div><dl>{[['报价',q[1]],['可供数量',q[2]],['最快发货',q[3]],['履约率',q[4]]].map(([k,v],i)=><div><dt>{k}</dt><dd className={i===0?'price':''}>{v}</dd></div>)}</dl><div className="tp-quote-actions"><button className="tp-outline">查看企业</button><button className="tp-primary" onClick={()=>nav(`/procurement/${id}/confirm`)}>选择供应商</button></div></article>)}</section>
    <button className="tp-view-all">查看全部6家报价 <ChevronDown/></button>
  </main>
}
