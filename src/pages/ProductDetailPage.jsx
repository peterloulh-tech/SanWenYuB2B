import { BadgeCheck, Check, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/trade-pages.css'

const photos=[
  '/assets/products/whole-salmon-on-ice.png',
  '/assets/products/salmon-fillet.png',
  '/assets/products/whole-salmon-on-ice.png',
  '/assets/products/whole-salmon-on-ice.png',
  '/assets/products/salmon-slices.png',
]

export default function ProductDetailPage(){
  const nav=useNavigate()
  return <main className="tp-page tp-detail-page">
    <div className="tp-crumb">首页 <b>›</b> 产品大厅 <b>›</b> 商品详情</div>
    <section className="tp-detail-hero">
      <div className="tp-gallery"><img className="tp-main-photo" src={photos[0]} alt="日照冰鲜三文鱼"/><div>{photos.map((x,i)=><img className={i===0?'active':''} src={x} key={`${x}-${i}`} alt="商品实拍"/>)}</div></div>
      <div className="tp-product-info">
        <div className="tp-product-copy"><h1>日照冰鲜三文鱼 <span><BadgeCheck/>平台认证</span></h1><h3>品种：大西洋鲑</h3><h3>规格：3–4kg/尾</h3><strong>¥153.2 <small>/ kg</small></strong><p>可供：18.6吨</p><p>发货地：山东日照</p><p>24小时内发货</p><div className="tp-service-tags"><span><Check/>冷链发货</span><span><Check/>支持开票</span></div><em>按实际出库重量结算</em></div>
        <div className="tp-purchase-box"><label>采购数量<div><input defaultValue="1000"/><span>kg</span></div></label><label>交付城市<select defaultValue="上海"><option>上海</option><option>北京</option><option>广州</option></select></label><button className="tp-primary" onClick={()=>nav('/procurement')}>提交询价</button><button className="tp-outline" onClick={()=>nav('/procurement/CG20260811001/confirm')}>直接采购</button></div>
        <footer>供应商：日照XX海洋渔业有限公司　<span><BadgeCheck/>平台认证</span><button onClick={()=>nav('/suppliers')}>查看企业 <ChevronRight/></button></footer>
      </div>
    </section>
    <section className="tp-detail-content">
      <div className="tp-basic"><nav>{['商品详情','检测报告','批次追溯','配送说明'].map((x,i)=><button className={i===0?'active':''} key={x}>{x}</button>)}</nav><article><h2>基本信息</h2><div><p>品种：　大西洋鲑</p><p>包装：　冷链保温包装</p><p>规格：　3–4kg/尾</p><p>储存：　0～4℃</p><p>产地：　山东日照</p><p>结算：　实际出库重量</p></div></article></div>
      <div className="tp-photo-detail"><h2>商品图文详情</h2><div>{[['产品实拍',photos[0]],['日照深海养殖基地',photos[2]],['捕捞与分拣',photos[3]],['冷链包装与发货',photos[4]]].map(([t,img])=><figure key={t}><figcaption>{t}</figcaption><img src={img} alt={t}/></figure>)}</div></div>
    </section>
    <section className="tp-recommend"><h2>相关推荐</h2>{[['冷冻挪威三文鱼','¥152.1 / kg','3–4kg/尾',photos[0]],['三文鱼切片','¥98.0 / kg','500g/包',photos[1]],['冰鲜三文鱼中段','¥168.0 / kg','1–1.5kg/段',photos[1]]].map(([n,p,s,img],i)=><article key={n}><img src={img} alt={n}/><div><h3>{n}</h3><strong>{p}</strong><p>规格：{s}</p></div><button onClick={()=>nav(`/products/${i+2}`)}>查看详情</button></article>)}</section>
  </main>
}
