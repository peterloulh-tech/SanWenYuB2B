const DAY_MS = 24 * 60 * 60 * 1000

export const marketDemoMeta = {
  label: '平台演示数据',
  region: '全国演示市场',
  category: '三文鱼',
  specification: '冰鲜整鱼 3~4kg',
  unit: '元/kg',
  dataDate: '2026-08-13',
}

export const marketDemoDateRange = {
  min: '2026-05-16',
  max: marketDemoMeta.dataDate,
}

export const marketFilterOptions = {
  species: [
    { id: 'all', label: '全部三文鱼', adjustment: 0 },
    { id: 'atlantic', label: '大西洋鲑', adjustment: 4.8 },
    { id: 'coho', label: '银鲑', adjustment: -6.2 },
    { id: 'rainbow-trout', label: '虹鳟', adjustment: -11.8 },
    { id: 'king', label: '帝王鲑', adjustment: 24.5 },
  ],
  origin: [
    { id: 'all', label: '全部产地', adjustment: 0 },
    { id: 'norway', label: '挪威', adjustment: 5.1 },
    { id: 'chile', label: '智利', adjustment: -4.3 },
    { id: 'faroe', label: '法罗群岛', adjustment: 7.4 },
    { id: 'iceland', label: '冰岛', adjustment: 3.2 },
    { id: 'canada', label: '加拿大', adjustment: 1.8 },
    { id: 'us', label: '美国', adjustment: 2.6 },
    { id: 'china', label: '中国', adjustment: -8.5 },
  ],
  productForm: [
    { id: 'all', label: '全部形态', adjustment: 0 },
    { id: 'chilled-whole', label: '冰鲜整鱼', adjustment: 3.6 },
    { id: 'frozen-whole', label: '冷冻整鱼', adjustment: -7.2 },
    { id: 'fillet', label: '鱼柳', adjustment: 31.5 },
    { id: 'steak', label: '鱼排/中段', adjustment: 25.8 },
    { id: 'slice', label: '切片', adjustment: 38.2 },
    { id: 'byproduct', label: '鱼骨鱼头等副产物', adjustment: -91.4 },
  ],
}

export const marketPeriodOptions = [7, 30, 90]
export const defaultMarketFilters = { species: 'all', origin: 'all', productForm: 'all' }

export const marketProcurementTicker = [
  { id: 'shanghai-chilled', product: '挪威冰鲜三文鱼整鱼', quantity: '20吨', destination: '上海', delivery: '8月18日前到货' },
  { id: 'beijing-fillet', product: '智利冷冻三文鱼柳', quantity: '12吨', destination: '北京', delivery: '8月22日前到货' },
  { id: 'guangzhou-whole', product: '大西洋鲑整鱼 3~4kg', quantity: '18吨', destination: '广州', delivery: '8月20日前到货' },
  { id: 'chengdu-steak', product: '三文鱼排/中段', quantity: '8吨', destination: '成都', delivery: '8月25日前到货' },
]

function formatDate(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10)
}

const endTimestamp = Date.parse(`${marketDemoDateRange.max}T00:00:00Z`)
export const marketDemoDates = Array.from({ length: 90 }, (_, index) => formatDate(endTimestamp - (89 - index) * DAY_MS))
export const marketDemoChartDates = ['07-15', '07-19', '07-23', '07-27', '07-31', '08-03', '08-07', '08-10', '08-13']

function optionFor(group, id) {
  return marketFilterOptions[group].find((option) => option.id === id) || marketFilterOptions[group][0]
}

function normaliseFilters(filters = defaultMarketFilters) {
  return {
    species: optionFor('species', filters.species).id,
    origin: optionFor('origin', filters.origin).id,
    productForm: optionFor('productForm', filters.productForm).id,
  }
}

function round(value, precision = 1) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function priceAt(index, filters) {
  const selected = normaliseFilters(filters)
  const species = optionFor('species', selected.species)
  const origin = optionFor('origin', selected.origin)
  const productForm = optionFor('productForm', selected.productForm)
  const phase = marketFilterOptions.species.indexOf(species) * 1.7 + marketFilterOptions.origin.indexOf(origin) * .8 + marketFilterOptions.productForm.indexOf(productForm) * 1.2
  const curve = (point) => (point - 89) * .12 + Math.sin((point + phase) / 4.8) * 2.7 + Math.cos((point + phase) / 9.5) * 1.6
  return round(153.2 + species.adjustment + origin.adjustment + productForm.adjustment + curve(index) - curve(89))
}

function dateIndex(date) {
  const index = marketDemoDates.indexOf(date)
  return index === -1 ? marketDemoDates.length - 1 : index
}

export function getMarketSnapshot(filters = defaultMarketFilters, date = marketDemoDateRange.max) {
  const selected = normaliseFilters(filters)
  const index = dateIndex(date)
  const price = priceAt(index, selected)
  const previousPrice = priceAt(Math.max(0, index - 1), selected)
  const speciesIndex = marketFilterOptions.species.findIndex((option) => option.id === selected.species)
  const originIndex = marketFilterOptions.origin.findIndex((option) => option.id === selected.origin)
  const formIndex = marketFilterOptions.productForm.findIndex((option) => option.id === selected.productForm)
  const volume = round(Math.max(26, 186.5 + Math.sin(index / 3.9) * 16 - speciesIndex * 9 - formIndex * 6 + originIndex * 2))
  const demandCount = Math.max(6, Math.round(32 + Math.cos(index / 5.2) * 5 - speciesIndex * 2 - formIndex + originIndex * .4))
  const focus = optionFor('productForm', selected.productForm).label.replace('全部形态', '冰鲜整鱼')
  const source = optionFor('origin', selected.origin).label.replace('全部产地', '多产地')

  return {
    date: marketDemoDates[index],
    price,
    volume,
    demandCount,
    dailyChange: round((price - previousPrice) / previousPrice * 100),
    tip: `${focus}采购保持活跃，${source}货源报价整体平稳。`,
  }
}

export function getMarketTrend(filters = defaultMarketFilters, period = 30) {
  const selectedPeriod = marketPeriodOptions.includes(Number(period)) ? Number(period) : 30
  const start = marketDemoDates.length - selectedPeriod
  const points = marketDemoDates.slice(start).map((date, index) => ({ date, price: priceAt(start + index, filters) }))
  const firstPrice = points[0].price
  const currentPrice = points.at(-1).price

  return {
    period: selectedPeriod,
    points,
    currentPrice,
    change: round((currentPrice - firstPrice) / firstPrice * 100),
  }
}
