import { lazy, Suspense, useEffect, useState } from 'react'
import { ClipboardList, Coins, Truck } from 'lucide-react'
import '../styles/data-screen-v2.css'

const DataScreenTrendChart = lazy(() => import('../components/data-screen/DataScreenTrendChart'))

const deals = [
  ['10:30', '冰鲜三文鱼', '1.20吨', '153元/kg', '上海'], ['10:29', '冰鲜银鲑', '0.80吨', '146元/kg', '北京'],
  ['10:28', '三文鱼鱼柳', '0.50吨', '168元/kg', '广州'], ['10:27', '三文鱼切片', '1.50吨', '128元/kg', '深圳'],
  ['10:26', '冷冻整鱼', '0.30吨', '132元/kg', '成都'], ['10:25', '冰鲜三文鱼', '0.75吨', '156元/kg', '杭州'],
  ['10:24', '去骨鱼柳', '1.80吨', '172元/kg', '苏州'], ['10:23', '冷冻三文鱼', '2.20吨', '129元/kg', '南京'],
  ['10:22', '精品鱼排', '0.65吨', '138元/kg', '武汉'], ['10:21', '冰鲜三文鱼', '1.35吨', '155元/kg', '青岛'],
  ['10:20', '三文鱼切片', '0.90吨', '126元/kg', '西安'], ['10:19', '冷冻整鱼', '1.60吨', '131元/kg', '重庆'],
  ['10:18', '三文鱼鱼柳', '0.48吨', '169元/kg', '厦门'], ['10:17', '冰鲜银鲑', '1.05吨', '148元/kg', '天津'],
]
const baseOrigins = [['挪威', 100, 1258], ['智利', 78, 986], ['中国', 60, 754], ['法罗群岛', 35, 432], ['加拿大', 22, 258]]
const baseRegions = [['上海', 2186.5, 12.8], ['北京', 1562.3, 9.3], ['广东', 1256.7, 8.6], ['浙江', 1102.4, 7.2], ['福建', 895.5, 10.1]]
const baseBuyers = [['某某XX商贸集团', 856.4], ['北京XX生鲜连锁', 664.1], ['深圳XX生鲜供应链', 532.6], ['杭州XX食品商', 412.8], ['广州XX食品集团', 398.1]]
const baseSpecs = [['2-3kg/条', 100, 1286], ['3-4kg/条', 82, 1018], ['1-2kg/条', 68, 876], ['4-5kg/条', 48, 652], ['5kg以上/条', 28, 348]]
const basePrices = [146.8,147.6,148.2,147.9,149.1,149.8,150.4,149.7,150.8,151.2,150.6,151.8,152.4,151.6,152.9,153.3,152.7,153.8,154.2,153.4,154.6,155.1,154.3,153.8,154.9,155.6,154.8,155.9,156.4,155.7]
const transactionAmounts = [468,512,536,498,571,544,526,589,562,548,604,576,552,618,584,567,632,601,575,646,621,589,608,655,612,638,624,671,643,688]
const trendDates = Array.from({ length: 30 }, (_, index) => {
  const date = new Date(2026, 6, 10 + index)
  return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
})
const supplyDemandMessages = [
  { id: 'supply-salmon', type: '供', product: '冰鲜三文鱼', quantity: '2.5吨', locationLabel: '产地', location: '挪威' },
  { id: 'demand-trout', type: '求', product: '虹鳟整鱼', quantity: '1.2吨', locationLabel: '目的地', location: '上海' },
  { id: 'supply-fillet', type: '供', product: '大西洋鲑鱼柳', quantity: '800公斤', locationLabel: '产地', location: '智利' },
  { id: 'demand-frozen', type: '求', product: '冷冻整鱼', quantity: '3.0吨', locationLabel: '目的地', location: '北京' },
  { id: 'supply-slices', type: '供', product: '三文鱼切片', quantity: '600公斤', locationLabel: '产地', location: '中国' },
  { id: 'demand-steak', type: '求', product: '三文鱼鱼排', quantity: '1.5吨', locationLabel: '目的地', location: '广州' },
  { id: 'supply-eggs', type: '供', product: '挪威系发眼卵', quantity: '20万枚', locationLabel: '产地', location: '挪威' },
  { id: 'demand-fry', type: '求', product: '虹鳟鱼苗', quantity: '8万尾', locationLabel: '目的地', location: '山东日照' },
]
const mapFlows = [
  { name: '上海', path: 'M 768 294 Q 826 305 824 358', duration: 2.6, delay: 0 },
  { name: '浙江', path: 'M 768 294 Q 834 340 808 392', duration: 2.8, delay: .35 },
  { name: '福建', path: 'M 768 294 Q 844 388 788 465', duration: 3.1, delay: .75 },
  { name: '广东', path: 'M 768 294 Q 742 438 668 507', duration: 3.5, delay: 1.1 },
  { name: '广西', path: 'M 768 294 Q 702 438 630 518', duration: 3.7, delay: 1.45 },
  { name: '云南', path: 'M 768 294 Q 650 422 530 479', duration: 4, delay: .2 },
  { name: '西藏', path: 'M 768 294 Q 568 352 344 380', duration: 4.5, delay: .6 },
  { name: '青海', path: 'M 768 294 Q 622 300 459 345', duration: 4, delay: 1 },
  { name: '四川', path: 'M 768 294 Q 642 340 533 387', duration: 3.5, delay: 1.4 },
  { name: '重庆', path: 'M 768 294 Q 662 328 594 367', duration: 3.2, delay: 1.8 },
  { name: '湖北', path: 'M 768 294 Q 704 300 648 322', duration: 3, delay: 2.2 },
  { name: '安徽', path: 'M 768 294 Q 752 316 730 339', duration: 2.8, delay: 2.6 },
  { name: '河南', path: 'M 768 294 Q 720 264 672 284', duration: 2.9, delay: .25 },
  { name: '甘肃', path: 'M 768 294 Q 610 228 440 253', duration: 4.1, delay: .65 },
  { name: '新疆', path: 'M 768 294 Q 548 168 286 224', duration: 4.6, delay: 1.05 },
  { name: '北京', path: 'M 768 294 Q 718 250 740 220', duration: 2.8, delay: 1.45 },
  { name: '天津', path: 'M 768 294 Q 792 276 773 259', duration: 2.5, delay: 1.85 },
  { name: '内蒙古', path: 'M 768 294 Q 692 232 731 177', duration: 3.5, delay: 2.25 },
  { name: '辽宁', path: 'M 768 294 Q 824 248 865 212', duration: 3.2, delay: 2.65 },
  { name: '吉林', path: 'M 768 294 Q 836 226 896 161', duration: 3.7, delay: .4 },
  { name: '黑龙江', path: 'M 768 294 Q 790 188 867 115', duration: 4.1, delay: .8 },
]
const mapFlowTailOffsets = [0, .08, .16]

function ScreenPanel({ title, extra, children, className = '' }) { return <section className={`ds-panel ${className}`}><h2><i />{title}{extra && <small>{extra}</small>}</h2>{children}</section> }
function RankBars({ data, variant = 'standard' }) {
  return <div className={`ds-bars ${variant === 'specs' ? 'ds-spec-bars' : ''}`}>{data.map(([name, value, total], i) => variant === 'specs'
    ? <div className="ds-spec-row" key={name}><div className="ds-spec-head"><span><b>{i + 1}</b>{name}</span><strong>{total}</strong></div><i><em style={{ width: `${value}%` }} /></i></div>
    : <div className="ds-bar-row" key={name}><b>{i + 1}</b><span>{name}</span><i><em style={{ width: `${value}%` }} /></i><strong>{total}</strong></div>)}</div>
}
function ChinaMap() {
  return <div className="china-map" role="img" aria-label="中国全景交易流向地图">
    <svg className="china-map-flow" viewBox="0 0 1060 640" preserveAspectRatio="none" aria-hidden="true">
      {mapFlows.map(route => <g key={route.name} data-flow-route={route.name}>
        {mapFlowTailOffsets.map((offset, particleIndex) => {
          const begin = route.delay + offset
          const opacity = particleIndex === 0 ? .98 : particleIndex === 1 ? .58 : .28
          return <circle
            className={`map-flow-particle ${particleIndex === 0 ? 'map-flow-particle--head' : 'map-flow-particle--tail'}`}
            cx="0"
            cy="0"
            fill={particleIndex === 0 ? '#fff7c9' : '#ff9d35'}
            key={`${route.name}-${particleIndex}`}
            opacity="0"
            r={particleIndex === 0 ? 3.2 : particleIndex === 1 ? 2.2 : 1.35}
          >
            <animateMotion path={route.path} dur={`${route.duration}s`} begin={`${begin}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values={`0;${opacity};${opacity};0`} keyTimes="0;.08;.86;1" dur={`${route.duration}s`} begin={`${begin}s`} repeatCount="indefinite" />
          </circle>
        })}
      </g>)}
    </svg>
  </div>
}

const pad = value => String(value).padStart(2, '0')
function formatTime(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}  ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}
function formatClock(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export default function DataScreenPage() {
  const [now, setNow] = useState(() => new Date())
  const [metrics, setMetrics] = useState({ amount: 2856, volume: 186.5, orders: 342, totalVolume: 5280, totalOrders: 12856 })
  const [liveData, setLiveData] = useState({
    origins: baseOrigins, regions: baseRegions, buyers: baseBuyers, specs: baseSpecs, prices: basePrices,
  })
  const [supplyDemandFeed, setSupplyDemandFeed] = useState(() => {
    const currentTime = Date.now()
    return {
      items: supplyDemandMessages.slice(0, 3).map((item, index) => ({
        ...item,
        time: formatClock(new Date(currentTime - (2 - index) * 2800)),
      })),
      nextIndex: 3,
      revision: 0,
    }
  })
  useEffect(() => {
    const clockTimer = window.setInterval(() => setNow(new Date()), 1000)
    const operationTimer = window.setInterval(() => setMetrics(value => {
      const volumeStep = Number((.1 + Math.random() * .5).toFixed(1))
      const ordersStep = Math.random() > .35 ? 1 : 2
      return {
        amount: value.amount + Math.round(12 + Math.random() * 35),
        volume: Number((value.volume + volumeStep).toFixed(1)),
        orders: value.orders + ordersStep,
        totalVolume: Number((value.totalVolume + volumeStep).toFixed(1)),
        totalOrders: value.totalOrders + ordersStep,
      }
    }), 2800)
    const marketTimer = window.setInterval(() => setLiveData(value => {
      const moveRows = rows => rows.map(([name, bar, total]) => [name, Math.max(18, Math.min(100, bar + Math.round(Math.random() * 4 - 2))), total + Math.round(Math.random() * 9)])
      return {
        origins: moveRows(value.origins),
        specs: moveRows(value.specs),
        regions: value.regions.map(([name, amount, rate]) => [name, Number((amount + Math.random() * 12).toFixed(1)), Number(Math.max(1, rate + Math.random() * .6 - .2).toFixed(1))]),
        buyers: value.buyers.map(([name, amount]) => [name, Number((amount + Math.random() * 6).toFixed(1))]),
        prices: value.prices.map(point => Number(Math.max(138, Math.min(160, point + Math.random() * 1.6 - .8)).toFixed(1))),
      }
    }), 4200)
    const supplyDemandTimer = window.setInterval(() => setSupplyDemandFeed(value => {
      const nextMessage = supplyDemandMessages[value.nextIndex]
      return {
        items: [...value.items.slice(1), { ...nextMessage, time: formatClock(new Date()) }],
        nextIndex: (value.nextIndex + 1) % supplyDemandMessages.length,
        revision: value.revision + 1,
      }
    }), 2800)
    return () => {
      window.clearInterval(clockTimer)
      window.clearInterval(operationTimer)
      window.clearInterval(marketTimer)
      window.clearInterval(supplyDemandTimer)
    }
  }, [])
  const topStats = [
    [Coins, '今日交易额', `¥ ${metrics.amount.toLocaleString()}`, '万元', '+12.3%'], [Truck, '今日交易量', metrics.volume.toFixed(1), '吨', '+8.7%'],
    [ClipboardList, '今日订单', metrics.orders.toLocaleString(), '单', '+15.2%'], [Coins, '累计交易额', '8.6', '亿元', ''],
    [Truck, '累计交易量', metrics.totalVolume.toLocaleString(undefined, { maximumFractionDigits: 1 }), '吨', ''], [ClipboardList, '累计订单', metrics.totalOrders.toLocaleString(), '单', ''],
  ]
  const pending = Math.round(metrics.orders * .06)
  const awaitingShipment = Math.round(metrics.orders * .14)
  const inTransit = Math.round(metrics.orders * .26)
  const orderStatuses = [
    ['待确认', pending, '#e89642'],
    ['待发货', awaitingShipment, '#51c3df'],
    ['运输中', inTransit, '#5b83db'],
    ['已完成', metrics.orders - pending - awaitingShipment - inTransit, '#35c98b'],
  ]
  const orderStatusStops = orderStatuses.reduce((result, [, value]) => [...result, (result.at(-1) || 0) + value / metrics.orders * 100], [])
  return <div className="ds-page">
    <header className="ds-header"><span><b>◈</b> 三文鱼数字化交易平台</span><h1>日照三文鱼数字化交易运营大屏</h1><time dateTime={now.toISOString()}>{formatTime(now)}</time></header>
    <section className="ds-kpis">{topStats.map(([Icon, label, value, unit, delta]) => <article className={delta ? 'is-today' : 'is-cumulative'} key={label}><Icon /><div><span>{label}</span><strong>{value}<small>{unit}</small></strong>{delta ? <em><i>较昨日</i><b>{delta}</b></em> : <em className="ds-kpi-placeholder" aria-hidden="true" />}</div></article>)}</section>
    <main className="ds-layout">
      <div className="ds-left">
        <ScreenPanel title="实时成交播报" extra="循环播报"><div className="ds-live-list"><div className="ds-live-head"><span>时间</span><span>品类</span><span>规格</span><span>单价</span><span>目的地</span></div><div className="ds-live-window"><div className="ds-live-track">{[...deals, ...deals].map((row, rowIndex)=><div className="ds-live-row" key={`${rowIndex}-${row[0]}-${row[1]}`}>{row.map((value,i)=><span className={i===0?'green':''} key={`${i}-${value}`}>{value}</span>)}</div>)}</div></div></div></ScreenPanel>
        <ScreenPanel title="热门产地TOP5" extra="单位：吨" className="ds-unit-panel"><RankBars data={liveData.origins.map(([n,b,t])=>[n,b,t.toLocaleString()])}/></ScreenPanel>
        <ScreenPanel title="近30日价格趋势" extra={`最新 ${liveData.prices.at(-1).toFixed(1)}元/kg`}><Suspense fallback={<div className="ds-trend-chart" role="status" />}><DataScreenTrendChart dates={trendDates} values={liveData.prices} type="line" valueLabel="成交均价" unit="元/kg" decimals={1} /></Suspense></ScreenPanel>
      </div>
      <ScreenPanel title="全国交易流向" className="ds-map-panel"><ChinaMap /></ScreenPanel>
      <div className="ds-right">
        <ScreenPanel title="销售地区TOP5"><table><thead><tr><th>排名</th><th>地区</th><th>成交额（万元）</th><th>环比</th></tr></thead><tbody>{liveData.regions.map((r,i)=><tr key={r[0]}><td className="orange">{i+1}</td><td>{r[0]}</td><td>{r[1].toLocaleString()}</td><td className="green">↑ {r[2]}%</td></tr>)}</tbody></table></ScreenPanel>
        <ScreenPanel title="订单履约状态"><div className="ds-order-status"><div className="ds-order-donut" style={{'--order-stop-1':`${orderStatusStops[0]}%`,'--order-stop-2':`${orderStatusStops[1]}%`,'--order-stop-3':`${orderStatusStops[2]}%`}}><div><strong>{metrics.orders.toLocaleString()}</strong><span>今日订单</span></div></div><ul>{orderStatuses.map(([name, value, color])=><li key={name}><i style={{ backgroundColor: color }}/><span>{name}</span><strong>{Math.round(value / metrics.orders * 100)}%</strong></li>)}</ul></div></ScreenPanel>
        <ScreenPanel title="重点采购商TOP5"><table className="ds-buyer-table"><thead><tr><th>排名</th><th>采购商</th><th>成交额（万元）</th></tr></thead><tbody>{liveData.buyers.map((r,i)=><tr key={r[0]}><td className="orange">{i+1}</td><td>{r[0]}</td><td>{r[1].toLocaleString()}</td></tr>)}</tbody></table></ScreenPanel>
      </div>
    </main>
    <footer className="ds-bottom">
      <ScreenPanel title="近30日交易额趋势"><Suspense fallback={<div className="ds-trend-chart" role="status" />}><DataScreenTrendChart dates={trendDates} values={transactionAmounts} type="bar" valueLabel="交易额" unit="万元" /></Suspense></ScreenPanel>
      <ScreenPanel title="热门规格需求TOP5" extra="单位：吨" className="ds-unit-panel"><RankBars variant="specs" data={liveData.specs.map(([n,b,t])=>[n,b,t.toLocaleString()])}/></ScreenPanel>
      <ScreenPanel title="实时供求信息" extra="演示数据 · 模拟实时更新" className="ds-demand-panel">
        <div className="ds-demand-window">
          <div className="ds-demand-feed" key={supplyDemandFeed.revision}>
            {supplyDemandFeed.items.map(item => <div className="ds-demand-row" key={`${item.id}-${item.time}`}>
              <b className={item.type === '供' ? 'supply' : 'demand'}>{item.type}</b>
              <div className="ds-demand-product"><strong>{item.product}</strong><span>{item.locationLabel}：{item.location}</span></div>
              <em>{item.quantity}</em>
              <time>{item.time}</time>
            </div>)}
          </div>
        </div>
      </ScreenPanel>
    </footer>
  </div>
}
