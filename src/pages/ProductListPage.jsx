import { BadgeCheck, ChevronDown, MapPinned, Search, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/trade-pages.css'

const goods = [
  ['日照冰鲜三文鱼','3–4kg/条','¥153.2/kg','18.6吨','山东日照','今日','日照海洋渔业有限公司','/assets/products/whole-salmon-on-ice.png'],
  ['冷冻整鱼三文鱼','3–4kg/条','¥128.6/kg','25.2吨','青岛','24小时内','青岛深蓝水产有限公司','/assets/products/whole-salmon-on-ice.png'],
  ['三文鱼鱼柳','1–1.5kg/块','¥168.0/kg','12.8吨','威海','24小时内','威海蓝源水产有限公司','/assets/products/salmon-fillet.png'],
  ['三文鱼切片','500g/包','¥98.0/kg','5.6吨','烟台','24小时内','烟台海之味食品有限公司','/assets/products/salmon-slices.png'],
  ['精品冰鲜整鱼','4–5kg/条','¥178.0/kg','15.0吨','大连','今日','大连蓝洋水产有限公司','/assets/products/whole-salmon-on-ice.png'],
  ['冷冻鱼排','400g/包','¥86.0/kg','8.2吨','山东日照','24小时内','日照海洋渔业有限公司','/assets/products/salmon-fillet.png'],
  ['去骨鱼柳','1kg/块','¥165.0/kg','10.4吨','青岛','24小时内','青岛深蓝水产有限公司','/assets/products/salmon-fillet.png'],
  ['冷链切片礼盒','300g×4包/盒','¥108.0/kg','3.6吨','威海','24小时内','威海蓝源水产有限公司','/assets/products/salmon-slices.png'],
]

const filters = [
  ['产品类型',['冰鲜整鱼','冷冻整鱼','鱼柳','切片','鱼鳍鱼排','加工品']],
  ['规格',['1–2kg','2–3kg','3–4kg','4–5kg','5kg+']],
  ['产地',['山东日照','青岛','威海','烟台','大连']],
  ['价格',['100元以下','100–150元','150–200元','200元以上']],
  ['供货状态',['现货','可预订']],
]

export default function ProductListPage(){
  const nav=useNavigate()
  return <main className="tp-page tp-product-page">
    <div className="tp-crumb">首页 <b>›</b> 产品大厅</div>
    <section className="tp-title-row">
      <div><h1>三文鱼现货交易大厅</h1><p>面向采购企业的三文鱼现货查询与批量采购入口</p></div>
      <div className="tp-title-actions"><button className="tp-primary" onClick={()=>nav('/procurement/new')}><MapPinned/>发布采购需求</button><label className="tp-search"><Search/><input placeholder="搜索产品、规格、供应商"/></label></div>
    </section>
    <section className="tp-products-top">
      <div className="tp-filter-box">
        {filters.map(([title,opts],row)=><div className="tp-filter-row" key={title}><strong>{title}</strong>{opts.map((x,i)=><button className={(i===0||row===1&&i===2)?'active':''} key={x}>{x}</button>)}</div>)}
      </div>
      <aside className="tp-assistant"><h3>▣　采购助手</h3>{['支持批量询价','支持按实际重量结算','支持冷链配送','支持企业采购开票'].map(x=><p key={x}><ShieldCheck/>{x}</p>)}</aside>
    </section>
    <div className="tp-sort"><button className="active">综合排序 <ChevronDown/></button><button>价格　↕</button><button>库存　↕</button><button>最快发货　↕</button></div>
    <section className="tp-goods-grid">
      {goods.map((g,i)=><article className="tp-good" key={g[0]}>
        <div className="tp-good-image"><img src={g[7]} alt={g[0]}/><span><BadgeCheck/>平台认证</span></div>
        <div className="tp-good-body"><h2>{g[0]}</h2><p>规格：{g[1]}</p><p>参考价： <em>{g[2]}</em></p><p>可供：{g[3]}</p><p>发货地：{g[4]}</p><p>最快发货：{g[5]}</p><p>供应商：{g[6]}</p><div><button className="tp-primary" onClick={()=>nav(`/products/${i+1}`)}>立即询价</button><button className="tp-outline" onClick={()=>nav(`/products/${i+1}`)}>查看详情</button></div></div>
      </article>)}
    </section>
    <div className="tp-list-foot"><p>共 <b>268</b> 个商品</p><div className="tp-pagination"><button>上一页</button>{[1,2,3,4,5].map(n=><button className={n===1?'active':''} key={n}>{n}</button>)}<button>…</button><button>27</button><button>下一页</button></div></div>
  </main>
}
