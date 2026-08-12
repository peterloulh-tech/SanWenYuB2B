import { BadgeCheck, CircleDot, FileText, Snowflake } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import '../styles/trade-pages.css'

export default function OrderConfirmPage(){
  const nav=useNavigate()
  return <main className="tp-page tp-confirm-page">
    <div className="tp-crumb">首页 <b>›</b> 采购大厅 <b>›</b> 采购需求详情 <b>›</b> 确认采购</div>
    <section className="tp-confirm-title"><div><h1>确认采购订单</h1><p>请确认采购商品、供应商及交付信息</p></div><span>待确认</span></section>
    <section className="tp-selected-supplier"><h2>已选择供应商</h2><div className="tp-selected-grid"><div><h3>日照XX海洋渔业有限公司　<span><BadgeCheck/>平台认证</span></h3><p><span><Snowflake/>全程冷链运输</span><span><FileText/>支持企业开票</span><span><CircleDot/>批次可追溯</span></p><small>报价说明：含冷链包装、运输装卸及灯塔确认</small></div><dl>{[['报价','¥152/kg'],['可供','20吨'],['发货时效','24小时内发货'],['履约率','98.6%']].map(([k,v],i)=><div key={k}><dt>{k}</dt><dd className={i===0?'price':''}>{v}</dd></div>)}</dl><button className="tp-outline">查看企业</button></div></section>
    <section className="tp-purchase-info"><h2>采购信息</h2><div className="tp-purchase-grid"><label>商品：<b>冰鲜三文鱼</b></label><label>规格：<b>3–4kg/尾</b></label><label>成交单价：<strong>¥152/kg</strong></label><label>采购数量：<span><input type="number" defaultValue="20"/> 吨</span></label><label>交付城市：<b>上海</b></label><label>要求到货：<b>8月15日前</b></label></div><p className="tp-service-line">交易服务条件：　<span><Snowflake/>冷链配送</span><span><FileText/>支持开票</span></p><aside>ⓘ　提示：最终货款按实际出库数量结算</aside></section>
    <section className="tp-confirm-bottom"><article><h2>交付信息</h2><p>收货企业：　　　　　上海XX食品有限公司</p><p>收货地址：　　　　　上海市XX区XXXXXXXX</p><p>联系人：　　　　　　王先生</p><p>联系电话：　　　　　138****1234</p><p>到货日期：　　　　　8月15日前</p><button className="tp-outline">修改交付信息</button></article><article><h2>订单金额</h2><p>商品单价：<b>¥152/kg</b></p><p>采购数量：<b>20吨</b></p><p>预估商品金额：<strong>¥3,040,000</strong></p><p>冷链运输：<b>待确认</b></p><p className="total">预计订单金额：<strong>¥3,040,000 + 运费</strong></p></article></section>
    <section className="tp-confirm-actions"><label><input type="checkbox"/> 我已确认以上采购及交付信息</label><div><button className="tp-outline" onClick={()=>nav(-1)}>返回修改</button><button className="tp-primary" onClick={()=>nav('/services/orders/DD202608110018')}>确认并生成订单</button></div></section>
  </main>
}
