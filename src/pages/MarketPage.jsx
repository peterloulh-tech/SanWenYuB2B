import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Box, ChevronRight, Lightbulb, Megaphone, Scale, ShoppingCart, SlidersHorizontal, Waves } from 'lucide-react'
import LinkedSelect from '../components/ui/LinkedSelect'
import { defaultMarketFilters, getMarketSnapshot, getMarketTrend, marketDemoDateRange, marketDemoMeta, marketFilterOptions, marketPeriodOptions, marketProcurementTicker } from '../data/marketData'
import '../styles/service-pages.css'

function signed(value) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

const PriceTrendChart = lazy(() => import('../components/market/PriceTrendChart'))

export default function MarketPage() {
  const navigate = useNavigate()
  const filterRef = useRef(null)
  const [filters, setFilters] = useState(defaultMarketFilters)
  const [dataDate, setDataDate] = useState(marketDemoDateRange.max)
  const [period, setPeriod] = useState(30)
  const [openFilter, setOpenFilter] = useState(null)
  const snapshot = useMemo(() => getMarketSnapshot(filters, dataDate), [filters, dataDate])
  const trend = useMemo(() => getMarketTrend(filters, period), [filters, period])

  useEffect(() => {
    if (!openFilter) return undefined
    const closeMenu = (event) => {
      if (!filterRef.current?.contains(event.target)) setOpenFilter(null)
    }
    document.addEventListener('pointerdown', closeMenu)
    return () => document.removeEventListener('pointerdown', closeMenu)
  }, [openFilter])

  const selectFilter = (group, value) => {
    setFilters((current) => ({ ...current, [group]: value }))
    setOpenFilter(null)
  }

  const resetFilters = () => {
    setFilters(defaultMarketFilters)
    setDataDate(marketDemoDateRange.max)
    setPeriod(30)
    setOpenFilter(null)
  }

  return <main className="market-page">
    <section className="market-heading"><div className="page-container"><p className="service-crumb">首页 <ChevronRight /> 市场行情</p><h1>市场行情中心 <em className="market-demo-label">{marketDemoMeta.label}</em></h1><span>掌握价格变化，了解市场需求方向</span></div><Waves /></section>
    <div className="page-container market-board">
      <section className="market-filter market-card" ref={filterRef}>
        <header><SlidersHorizontal /><h2>行情筛选</h2></header>
        {[
          ['species', '品种'],
          ['origin', '产品产地'],
          ['productForm', '产品形态'],
        ].map(([group, label]) => <LinkedSelect id={`market-filter-${group}`} label={label} options={marketFilterOptions[group]} value={filters[group]} open={openFilter === group} onToggle={(force) => setOpenFilter(force === false ? null : openFilter === group ? null : group)} onSelect={(value) => selectFilter(group, value)} key={group} />)}
        <label className="market-filter-date" htmlFor="market-data-date"><span>数据日期</span><input id="market-data-date" type="date" min={marketDemoDateRange.min} max={marketDemoDateRange.max} value={dataDate} onChange={(event) => setDataDate(event.target.value)} /></label>
        <button type="button" className="market-reset" onClick={resetFilters}>重置筛选</button>
      </section>

      <section className="market-summary market-card"><header><BarChart3 /><h2>当日市场</h2></header><div className="market-summary-values"><div><span>当日均价</span><strong>¥{snapshot.price.toFixed(1)}<small>/kg</small></strong><em className={snapshot.dailyChange < 0 ? 'down' : ''}>{signed(snapshot.dailyChange)}</em></div><div><span>当日成交量</span><strong className="blue">{snapshot.volume.toFixed(1)}<small>吨</small></strong></div><div><span>当日采购需求</span><strong className="blue">{snapshot.demandCount}<small>条</small></strong></div></div><div className="market-tip"><Lightbulb /><p><b>市场提示</b>{snapshot.tip}</p><button onClick={() => navigate('/procurement')}>查看采购大厅</button></div></section>

      <section className="market-chart market-card"><header><BarChart3 /><h2>近{period}日成交价格走势</h2><div className="market-periods" aria-label="走势图时间范围">{marketPeriodOptions.map((option) => <button type="button" className={period === option ? 'active' : ''} aria-pressed={period === option} onClick={() => setPeriod(option)} key={option}>{option}日</button>)}</div></header><Suspense fallback={<div className="market-echart" role="status" aria-label="成交价格走势图加载中" />}><PriceTrendChart points={trend.points} period={period} /></Suspense></section>

      <section className="market-card market-supply">
        <div className="market-ticker" role="region" aria-label="平台演示采购需求滚动快讯">
          <div className="market-ticker-label"><Megaphone /><b>采购快讯</b><em>演示数据</em></div>
          <div className="market-ticker-viewport"><div className="market-ticker-track">{[false, true].map((duplicate) => <div className="market-ticker-group" aria-hidden={duplicate} key={String(duplicate)}>{marketProcurementTicker.map((item) => <span key={`${duplicate}-${item.id}`}><strong>{item.product}</strong> {item.quantity} · {item.destination}交付 · {item.delivery}</span>)}</div>)}</div></div>
        </div>
        <div className="market-supply-main"><header><Scale /><h2>全平台市场供需</h2></header><div className="market-supply-values"><div><span><ShoppingCart /></span><p><b>采购需求总量：</b><strong>186<small>吨</small></strong></p></div><div><span><Box /></span><p><b>平台现货供应：</b><strong>235<small>吨</small></strong></p></div><div><span><BarChart3 /></span><p><b>当日新增需求：</b><strong>32<small>条</small></strong></p></div></div></div>
      </section>
    </div>
  </main>
}
