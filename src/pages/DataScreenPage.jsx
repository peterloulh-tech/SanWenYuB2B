import { useEffect, useState } from 'react'
import { ClipboardList, Coins, Database, ShieldCheck, Snowflake, Truck } from 'lucide-react'
import '../styles/admin-mobile.css'
import '../styles/data-screen-v2.css'

const deals = [
  ['10:30:21', '冰鲜三文鱼', '1.20吨', '¥153/公斤', '上海'], ['10:29:48', '冰鲜银鲑鱼', '0.80吨', '¥146/公斤', '北京'],
  ['10:29:20', '三文鱼鱼柳', '0.50吨', '¥168/公斤', '广州'], ['10:28:42', '三文鱼切片', '1.50吨', '¥128/公斤', '深圳'],
  ['10:27:56', '冷冻整鱼', '0.30吨', '¥132/公斤', '成都'], ['10:27:18', '冰鲜三文鱼', '0.75吨', '¥156/公斤', '杭州'],
  ['10:26:39', '去骨鱼柳', '1.80吨', '¥172/公斤', '苏州'], ['10:25:57', '冷冻三文鱼', '2.20吨', '¥129/公斤', '南京'],
  ['10:25:14', '精品鱼排', '0.65吨', '¥138/公斤', '武汉'], ['10:24:36', '冰鲜三文鱼', '1.35吨', '¥155/公斤', '青岛'],
  ['10:23:52', '三文鱼切片', '0.90吨', '¥126/公斤', '西安'], ['10:23:09', '冷冻整鱼', '1.60吨', '¥131/公斤', '重庆'],
  ['10:22:25', '三文鱼鱼柳', '0.48吨', '¥169/公斤', '厦门'], ['10:21:48', '冰鲜银鲑鱼', '1.05吨', '¥148/公斤', '天津'],
]
const baseOrigins = [['冰鲜三文鱼', 100, 1258], ['三文鱼鱼柳', 78, 986], ['冰鲜鱼柳', 60, 754], ['三文鱼切片', 35, 432], ['冰鲜鱼', 22, 258]]
const baseRegions = [['上海', 2186.5, 12.8], ['北京', 1562.3, 9.3], ['广东', 1256.7, 8.6], ['浙江', 1102.4, 7.2], ['福建', 895.5, 10.1]]
const baseBuyers = [['某某XX商贸集团', 856.4], ['北京XX生鲜连锁', 664.1], ['深圳XX生鲜供应链', 532.6], ['杭州XX食品商', 412.8], ['广州XX食品集团', 398.1]]
const baseSpecs = [['2-3kg/条', 100, 1286], ['3-4kg/条', 82, 1018], ['1-2kg/条', 68, 876], ['4-5kg/条', 48, 652], ['5kg以上/条', 28, 348]]
const basePrices = [56,38,48,14,45,58,25,54,28,52,18,43,24,58,16,34]
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
function RankBars({ data }) { return <div className="ds-bars">{data.map(([name, value, total], i) => <div key={name}><b>{i + 1}</b><span>{name}</span><i><em style={{ width: `${value}%` }} /></i><strong>{total}</strong></div>)}</div> }
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

export default function DataScreenPage() {
  const [now, setNow] = useState(() => new Date())
  const [metrics, setMetrics] = useState({ amount: 2856, volume: 186.5, orders: 342, totalVolume: 5280, totalOrders: 12856 })
  const [liveData, setLiveData] = useState({
    origins: baseOrigins, regions: baseRegions, buyers: baseBuyers, specs: baseSpecs,
    buyerMix: [35, 28, 20, 12, 5], prices: basePrices, coldTrucks: 1,
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
      const nextMix = value.buyerMix.map((part, index) => index === 0 ? part + (Math.random() > .5 ? 1 : -1) : part)
      nextMix[4] = 100 - nextMix.slice(0, 4).reduce((sum, part) => sum + part, 0)
      return {
        origins: moveRows(value.origins),
        specs: moveRows(value.specs),
        regions: value.regions.map(([name, amount, rate]) => [name, Number((amount + Math.random() * 12).toFixed(1)), Number(Math.max(1, rate + Math.random() * .6 - .2).toFixed(1))]),
        buyers: value.buyers.map(([name, amount]) => [name, Number((amount + Math.random() * 6).toFixed(1))]),
        buyerMix: nextMix,
        prices: value.prices.map(point => Math.max(10, Math.min(65, point + Math.round(Math.random() * 9 - 4)))),
        coldTrucks: value.coldTrucks === 1 ? 2 : Math.max(1, Math.min(9, value.coldTrucks + (Math.random() > .52 ? 1 : -1))),
      }
    }), 4200)
    return () => { window.clearInterval(clockTimer); window.clearInterval(operationTimer); window.clearInterval(marketTimer) }
  }, [])
  const topStats = [
    [Coins, '今日交易额', `¥ ${metrics.amount.toLocaleString()}`, '万', '↑ 12.3%'], [Truck, '今日交易量', metrics.volume.toFixed(1), '吨', '↑ 8.7%'],
    [ClipboardList, '今日订单', metrics.orders.toLocaleString(), '单', '↑ 15.2%'], [Coins, '累计交易额', '8.6', '亿元', ''],
    [Truck, '累计交易量', metrics.totalVolume.toLocaleString(undefined, { maximumFractionDigits: 1 }), '吨', ''], [ClipboardList, '累计订单', metrics.totalOrders.toLocaleString(), '单', ''],
  ]
  const pricePath = liveData.prices.map((point, index) => `${index ? 'L' : 'M'}${(350 / (liveData.prices.length - 1) * index).toFixed(1)} ${point}`).join('')
  const priceValue = (148 + (65 - liveData.prices.at(-1)) * .18).toFixed(1)
  const donutStops = liveData.buyerMix.reduce((result, part) => [...result, (result.at(-1) || 0) + part], [])
  return <div className="ds-page">
    <header className="ds-header"><span><b>◈</b> 三文鱼数字化交易平台</span><h1>日照三文鱼数字化交易运营大屏</h1><time dateTime={now.toISOString()}>{formatTime(now)}</time></header>
    <section className="ds-kpis">{topStats.map(([Icon, label, value, unit, delta]) => <article key={label}><Icon /><div><span>{label}</span><strong>{value}<small>{unit}</small></strong>{delta && <em>{delta}　<i>较昨日</i></em>}</div></article>)}</section>
    <main className="ds-layout">
      <div className="ds-left">
        <ScreenPanel title="实时成交播报" extra="循环播报"><div className="ds-live-list"><div className="ds-live-head"><span>时间</span><span>品类</span><span>规格</span><span>单价</span><span>目的地</span></div><div className="ds-live-window"><div className="ds-live-track">{[...deals, ...deals].map((row, rowIndex)=><div className="ds-live-row" key={`${rowIndex}-${row[0]}-${row[1]}`}>{row.map((value,i)=><span className={i===0?'green':''} key={`${i}-${value}`}>{value}</span>)}</div>)}</div></div></div></ScreenPanel>
        <ScreenPanel title="热门产地TOP5" extra="单位：吨"><RankBars data={liveData.origins.map(([n,b,t])=>[n,b,t.toLocaleString()])}/></ScreenPanel>
        <ScreenPanel title="近30日价格趋势" extra="单位：元/kg"><div className="mini-line"><b>{priceValue}</b><svg viewBox="0 0 350 80" preserveAspectRatio="none"><path d={pricePath}/></svg><span>07-10　 07-15　 07-20　 07-25　 07-30　 08-04　 08-08</span></div></ScreenPanel>
      </div>
      <ScreenPanel title="全国交易流向" className="ds-map-panel"><ChinaMap /></ScreenPanel>
      <div className="ds-right">
        <ScreenPanel title="销售地区TOP5" extra="单位：万元"><table><thead><tr><th>排名</th><th>地区</th><th>成交额</th><th>环比</th></tr></thead><tbody>{liveData.regions.map((r,i)=><tr key={r[0]}><td className="orange">{i+1}</td><td>{r[0]}</td><td>{r[1].toLocaleString()}万</td><td className="green">↑ {r[2]}%</td></tr>)}</tbody></table></ScreenPanel>
        <ScreenPanel title="采购商结构"><div className="donut" style={{'--mix1':`${donutStops[0]}%`,'--mix2':`${donutStops[1]}%`,'--mix3':`${donutStops[2]}%`,'--mix4':`${donutStops[3]}%`}}/><ul className="donut-labels">{['批发市场','商超连锁','餐饮连锁','生鲜电商','食品加工'].map((name,i)=><li key={name}>{name}　{liveData.buyerMix[i]}%</li>)}</ul></ScreenPanel>
        <ScreenPanel title="重点采购商TOP5" extra="单位：万元"><table><thead><tr><th>排名</th><th>采购商</th><th>成交额</th></tr></thead><tbody>{liveData.buyers.map((r,i)=><tr key={r[0]}><td className="orange">{i+1}</td><td>{r[0]}</td><td>{r[1].toLocaleString()}万</td></tr>)}</tbody></table></ScreenPanel>
      </div>
    </main>
    <footer className="ds-bottom">
      <ScreenPanel title="近30日交易额趋势" extra="单位：万元"><div className="column-chart">{[52,63,58,45,71,62,49,73,66,55,77,61,53,69,64,58,75,62,55,70,65,48,60,72,57,66,54,78,59,71].map((v,i)=><i key={i} style={{height:`${v}%`}}/>)}<span>07-10　　　　07-15　　　　07-20　　　　07-25　　　　07-30　　　　08-04　08-08</span></div></ScreenPanel>
      <ScreenPanel title="热门规格需求TOP5" extra="单位：吨"><RankBars data={liveData.specs.map(([n,b,t])=>[n,b,t.toLocaleString()])}/></ScreenPanel>
      <ScreenPanel title="平台运行状态"><div className="ds-status"><div><ShieldCheck/><span>系统运行</span><b>正常</b></div><div><Snowflake/><span>冷链车源</span><b className="orange ds-changing-value">{liveData.coldTrucks}单</b></div><div><Database/><span>服务异常</span><b className="orange">2单</b></div></div></ScreenPanel>
    </footer>
  </div>
}
