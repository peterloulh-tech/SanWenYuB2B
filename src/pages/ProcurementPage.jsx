import { BadgeCheck, ChevronDown, ClipboardList, Plus, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/trade-pages.css'

const demands=[
  ['冰鲜三文鱼','3–4kg/尾','20吨','上海','8月15日前','上海XX食品有限公司','6','/assets/products/whole-salmon-on-ice.png'],
  ['三文鱼鱼柳','1–1.5kg/块','10吨','广州','8月18日前','广州XX餐饮供应链有限公司','3','/assets/products/salmon-fillet.png'],
  ['冷冻整鱼','4–5kg/尾','30吨','成都','8月20日前','成都XX商贸有限公司','4','/assets/products/whole-salmon-on-ice.png'],
  ['三文鱼切片','500g/包','8吨','北京','8月12日前','北京XX生鲜有限公司','2','/assets/products/salmon-slices.png'],
  ['去骨鱼柳','1kg/块','12吨','杭州','8月16日前','杭州XX供应链有限公司','5','/assets/products/salmon-fillet.png'],
]

export default function ProcurementPage(){
  const nav=useNavigate()
  return <main className="tp-page tp-demand-page">
    <div className="tp-crumb">首页 <b>›</b> 采购大厅</div>
    <section className="tp-title-row"><div><h1>采购需求大厅</h1><p>发布采购需求 · 多家供应商在线报价</p></div><div className="tp-title-actions"><button className="tp-primary" onClick={()=>nav('/procurement/new')}><Plus/>发布采购需求</button><button className="tp-outline"><ClipboardList/>我的采购需求</button></div></section>
    <section className="tp-demand-filters"><label><Search/><input placeholder="搜索采购产品、采购企业"/></label>{['产品类型','交付地区','状态'].map(x=><button key={x}>{x}<ChevronDown/></button>)}</section>
    <section className="tp-demand-list">{demands.map((d,i)=><article key={d[0]}>
      <span className="tp-buy-label">求购</span><img src={d[7]} alt={d[0]}/><div className="tp-demand-name"><h2>{d[0]}</h2><p>规格　{d[1]}</p></div><dl><div><dt>采购量</dt><dd>{d[2]}</dd></div><div><dt>交付地</dt><dd>{d[3]}</dd></div><div><dt>到货要求</dt><dd>{d[4]}</dd></div></dl><div className="tp-demand-company"><h3>{d[5]}</h3><span><BadgeCheck/>平台认证</span></div><p className="tp-quotes">已有 <strong>{d[6]}</strong> 家报价</p><button className="tp-outline" onClick={()=>nav(`/procurement/CG2026081100${i+1}`)}>查看报价</button>
    </article>)}</section>
    <div className="tp-list-foot"><p>共 <b>128</b> 条采购需求</p><div className="tp-pagination"><button>上一页</button>{[1,2,3,4].map(n=><button className={n===1?'active':''}>{n}</button>)}<button>下一页</button></div></div>
  </main>
}
