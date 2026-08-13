export const industryServiceCategories = [
  { id: 'processing', name: '加工', description: '去脏、分切、分装' },
  { id: 'packaging', name: '包装', description: '保温箱、真空与礼盒包装' },
  { id: 'inspection', name: '检测', description: '品质、微生物与合规检测' },
  { id: 'warehousing', name: '仓储', description: '冷藏、冷冻与库存管理' },
  { id: 'cold-chain', name: '冷链运输', description: '全程温控配送' },
  { id: 'shipping', name: '船运', description: '近海运输与港口衔接' },
]

export const industryServices = [
  {
    id: 'salmon-processing',
    category: 'processing',
    name: '三文鱼精细分割加工',
    provider: '日照海洋食品加工有限公司',
    region: '山东日照',
    capacity: '每日可加工 30 吨',
    pricing: '¥1.8/kg 起',
    leadTime: '确认后 24 小时内排产',
    description: '提供整鱼去脏、去骨、切段、鱼柳修整及小规格分装等一站式加工服务。',
    features: ['独立加工车间', '支持来料加工', '批次信息可追溯'],
  },
  {
    id: 'cold-packaging',
    category: 'packaging',
    name: '水产冷链包装服务',
    provider: '青岛蓝湾包装科技有限公司',
    region: '山东青岛',
    capacity: '每日可包装 20,000 箱',
    pricing: '按箱询价',
    leadTime: '确认后 2 个工作日',
    description: '提供真空袋、保温箱、冰袋配置及企业定制礼盒包装，适配水产冷链运输。',
    features: ['支持规格定制', '食品接触级材料', '可提供打样'],
  },
  {
    id: 'quality-inspection',
    category: 'inspection',
    name: '水产品质量检测',
    provider: '山东海洋食品检测中心',
    region: '山东日照',
    capacity: '每日可受理 120 批次',
    pricing: '¥680/批次起',
    leadTime: '3—5 个工作日出具报告',
    description: '面向交易批次提供感官、理化、微生物及相关合规项目检测服务。',
    features: ['平台认证机构', '支持加急检测', '出具电子报告'],
  },
  {
    id: 'frozen-warehousing',
    category: 'warehousing',
    name: '水产冷冻仓储',
    provider: '日照港冷链仓储有限公司',
    region: '山东日照',
    capacity: '可用库容 8,000 吨',
    pricing: '¥3.2/吨·天起',
    leadTime: '当天预约，当天入库',
    description: '提供冷藏、冷冻、装卸、库位管理和出入库记录等水产仓储服务。',
    features: ['多温区库房', '24 小时装卸', '出入库记录可查'],
  },
  {
    id: 'cold-chain-transport',
    category: 'cold-chain',
    name: '全国冷链干线运输',
    provider: '鲁海冷链物流有限公司',
    region: '日照发往全国',
    capacity: '自有及协作冷藏车 260 辆',
    pricing: '按线路与车次询价',
    leadTime: '最快 4 小时调车',
    description: '提供从产地、加工厂或冷库到采购企业的整车及零担冷链运输服务。',
    features: ['全程温控', '支持整车与零担', '运输节点可查询'],
  },
  {
    id: 'coastal-shipping',
    category: 'shipping',
    name: '近海水产运输与港口衔接',
    provider: '青岛海联船运服务有限公司',
    region: '青岛、日照及周边港口',
    capacity: '每航次最高 500 吨',
    pricing: '按航线与载量询价',
    leadTime: '提前 3 天预约船期',
    description: '提供近海水产运输、港口装卸协调和冷链转运衔接等综合服务。',
    features: ['港口作业协调', '冷链转运衔接', '船期状态可查询'],
  },
]

export function findIndustryService(id) {
  return industryServices.find((service) => service.id === id) ?? null
}

export function getIndustryServiceCardFacts(service) {
  return [
    { label: '服务地区', value: service.region },
    { label: '服务能力', value: service.capacity },
    { label: '计价方式', value: service.pricing },
    { label: '服务周期', value: service.leadTime },
  ]
}

export function filterIndustryServices(services, { category = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return services.filter((service) => {
    const matchesCategory = category === 'all' || service.category === category
    const searchText = `${service.name}${service.provider}${service.region}`.toLowerCase()
    return matchesCategory && (!normalizedKeyword || searchText.includes(normalizedKeyword))
  })
}
