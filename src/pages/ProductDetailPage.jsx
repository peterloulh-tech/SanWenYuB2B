import { Check, ChevronRight, ScanLine } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { enterpriseProductSections, findIndustryProduct, industryProducts } from '../data/industryProducts'
import '../styles/trade-pages.css'

const freshSupplyPhotos={
  farm:'/assets/products/salmon-farm.jpg',
  sorting:'/assets/products/salmon-sorting.jpg',
  delivery:'/assets/products/salmon-cold-chain.jpg',
}

export default function ProductDetailPage(){
  const nav=useNavigate(); const { id }=useParams(); const product=findIndustryProduct(id)
  if(!product)return <main className="tp-page tp-product-missing"><h1>未找到该商品</h1><p>商品可能已调整，请返回企业商品大厅重新选择。</p><button className="tp-primary" onClick={()=>nav('/products')}>返回商品大厅</button></main>
  const section=enterpriseProductSections.find((item)=>item.id===product.section)
  const recommendations=industryProducts.filter((item)=>item.section===product.section&&item.id!==product.id).slice(0,3)
  const productCloseup=product.id==='rainbow-trout-whole'?product.image:product.image==='/assets/products/salmon-fillet.png'?'/assets/products/salmon-slices.png':'/assets/products/salmon-fillet.png'
  const photos=product.section==='fresh'?[product.image,productCloseup,freshSupplyPhotos.farm,freshSupplyPhotos.sorting,freshSupplyPhotos.delivery]:Array(5).fill(product.image)
  const supplyPhotos=product.section==='fresh'?[['商品展示',product.image],['企业供应',freshSupplyPhotos.farm],['规格分拣',freshSupplyPhotos.sorting],['包装与配送',freshSupplyPhotos.delivery]]:[['商品展示',product.image],['企业供应',product.image],['规格分拣',product.image],['包装与配送',product.image]]
  const originLabel=['鱼卵','鱼苗'].includes(product.category)?'种源国家':'产品产地'
  const basicInfo=[
    ['品种',product.species],
    ['产品形态',product.productForm],
    [originLabel,product.origin],
    ['供应商所在地',product.region],
    ['计价单位',product.unit],
    ...(product.lifeStage?[['发育阶段',product.lifeStage]]:[]),
    ['规格',product.spec],
    ['来源类型',product.sourceType],
    ['储存',product.storage],
    ['配送',product.delivery],
  ]
  return <main className="tp-page tp-detail-page">
    <div className="tp-crumb">首页 <b>›</b> 企业商品大厅 <b>›</b> {section?.name} <b>›</b> 商品详情</div>
    <section className="tp-detail-hero">
      <div className="tp-gallery"><img className="tp-main-photo" src={product.image} alt={product.name}/><div>{photos.map((x,i)=><img className={i===0?'active':''} src={x} key={`${x}-${i}`} alt={`${product.name}展示图`}/>)}</div></div>
      <div className="tp-product-info">
        <div className="tp-product-copy"><h1>{product.name}</h1><h3>品类：{product.category}　产品形态：{product.productForm}</h3><h3>规格：{product.spec}</h3><strong>{product.price}</strong><p>{originLabel}：{product.origin}</p><p>供应商所在地：{product.region}</p><p>供应能力：{product.supply}　起订量：{product.minOrder}</p>{product.complianceNote&&<div className="tp-compliance-note">{product.complianceNote}</div>}<div className="tp-service-tags"><span><Check/>企业配送</span><span><Check/>支持开票</span></div><em>{product.settlement}</em></div>
        <div className="tp-purchase-box"><label>采购数量<div><input defaultValue="1"/><span>{product.unit}</span></div></label><label>交付城市<select defaultValue="上海"><option>上海</option><option>北京</option><option>广州</option></select></label><button className="tp-primary" onClick={()=>nav(`/procurement/${product.id}/quote`)}>提交询价</button><button className="tp-outline" onClick={()=>nav('/procurement/new')}>发布采购需求</button>{product.traceBatchCode&&<button className="tp-outline trace-entry" onClick={()=>nav(`/traceability?batch=${product.traceBatchCode}`)}><ScanLine/>查看溯源</button>}</div>
        <footer>供应商：{product.supplier}<button onClick={()=>nav(product.supplier==='山东万泽丰海洋开发集团有限公司'?'/suppliers/wanzefeng-group':'/suppliers')}>查看企业 <ChevronRight/></button></footer>
      </div>
    </section>
    <section className="tp-detail-content">
      <div className="tp-basic"><nav>{['商品详情','质量资料','批次追溯','配送说明'].map((item,index)=><button className={index===0?'active':''} key={item}>{item}</button>)}</nav><article><h2>基本信息</h2><div>{basicInfo.map(([label,value])=><p key={label}>{label}：　{value}</p>)}</div></article></div>
      <div className="tp-photo-detail"><h2>商品与供应说明</h2><div>{supplyPhotos.map(([t,img])=><figure key={t}><figcaption>{t}</figcaption><img src={img} alt={t}/></figure>)}</div></div>
    </section>
    <section className="tp-recommend"><h2>相关推荐</h2>{recommendations.map((item)=><article key={item.id}><img src={item.image} alt={item.name}/><div><h3>{item.name}</h3><strong>{item.price}</strong><p>产品产地：{item.origin}　规格：{item.spec}</p></div><button onClick={()=>nav(`/products/${item.id}`)}>查看详情</button></article>)}</section>
  </main>
}
