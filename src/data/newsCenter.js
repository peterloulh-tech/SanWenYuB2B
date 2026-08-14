export const newsCategories = [
  { id: 'all', name: '综合' },
  { id: 'national-policy', name: '国家政策' },
  { id: 'current-affairs', name: '时事新闻' },
  { id: 'industry-news', name: '行业资讯' },
]

const industrySource = {
  category: 'industry-news',
  publisher: '壹渔业',
  sourcePlatform: '微信公众号',
  sourceAccountId: 'gh_a596d1e68331',
  sourceMethod: '在微信中搜索公众号“壹渔业”，按文章标题查看原文',
}

const industryArticles = [
  {
    id: 'industry-20260812-live-fish-carriers',
    title: '17家船厂竞标，最终花落中国！两艘活鱼运输船敲定',
    publishedAt: '2026-08-12',
    contentType: '产业与企业',
    tags: ['中国船厂', '活鱼运输船', '挪威'],
    summary: '挪威扩充活鱼运输船队，中国船厂获得两艘新船订单，并包含后续追加建造选择。',
  },
  {
    id: 'industry-20260811-cod-imports',
    title: '鳕鱼涨价冲击中国加工厂，进口额半年暴增近80%',
    publishedAt: '2026-08-11',
    contentType: '市场行情',
    tags: ['鳕鱼', '进口成本', '加工贸易'],
    summary: '中国鳕鱼加工贸易继续增长，进口金额明显上升，原料涨价正在向国内加工环节传导。',
  },
  {
    id: 'industry-20260805-land-salmon-ras',
    title: '陆基三文鱼卷土重来，多个大型RAS项目持续提速！',
    publishedAt: '2026-08-05',
    contentType: '养殖项目',
    tags: ['陆基三文鱼', 'RAS', '全球项目'],
    summary: '多个国家的大型循环水养殖项目接连推进，全球陆基三文鱼产业进入新一轮扩张期。',
  },
  {
    id: 'industry-20260731-oxygen-system',
    title: '爱尔兰水产制氧黑科技，能耗更低、纯度超99%！',
    publishedAt: '2026-07-31',
    contentType: '技术装备',
    tags: ['制氧系统', '陶瓷膜', '节能'],
    summary: '爱尔兰企业开发陶瓷膜制氧系统，为循环水和高密度养殖探索稳定、低能耗的供氧方案。',
  },
  {
    id: 'industry-20260729-lanhai-one',
    title: '新装备！深远海柔性网箱“蓝海一号”亮相',
    publishedAt: '2026-07-29',
    contentType: '技术装备',
    tags: ['深远海养殖', '柔性网箱', '抗台风'],
    summary: '深远海柔性网箱“蓝海一号”下水，可通过远程操作下潜避台风，并承载规模化海鱼养殖。',
  },
  {
    id: 'industry-20260728-deep-feeding',
    title: '挪威推出新型投喂方案！让饲料精准直达深水鱼群',
    publishedAt: '2026-07-28',
    contentType: '技术装备',
    tags: ['精准投喂', '深水养殖', '挪威'],
    summary: '新型混合式水下投喂系统无需大幅改造现有饲料船，即可把饲料精准输送至深水鱼群。',
  },
  {
    id: 'industry-20260723-oyster-system',
    title: '未来牡蛎养殖什么样？加拿大企业给出新方案',
    publishedAt: '2026-07-23',
    contentType: '技术装备',
    tags: ['牡蛎育苗', '水处理', '集装箱系统'],
    summary: '加拿大企业推出集装箱式水处理设备，用于改善养殖用水条件并支持牡蛎苗种培育。',
  },
  {
    id: 'industry-20260721-guoxin-one',
    title: '运行4年后，“国信1号”养殖工船拟升级改造！',
    publishedAt: '2026-07-21',
    contentType: '养殖项目',
    tags: ['国信1号', '养殖工船', '升级改造'],
    summary: '运行四年后，十万吨级养殖工船“国信1号”拟进行坞修改造，进一步提升海上养殖能力。',
  },
  {
    id: 'industry-20260717-fishmeal-fishoil',
    title: '从秘鲁到中国，鱼粉鱼油涨价正向养殖端传导！',
    publishedAt: '2026-07-17',
    contentType: '市场行情',
    tags: ['鱼粉', '鱼油', '养殖成本'],
    summary: '鱼粉和鱼油价格同步上涨，全球水产养殖成本承压，中国养殖户的投苗决策可能更趋谨慎。',
  },
  {
    id: 'industry-20260714-ningbo-salmon',
    title: '宁波三文鱼产量爆发，一二期满产，生物量创新高！',
    publishedAt: '2026-07-14',
    contentType: '养殖项目',
    tags: ['宁波', '陆基三文鱼', '产能'],
    summary: '宁波陆基三文鱼项目一、二期进入满负荷运行阶段，上半年收获量和在养生物量均明显提升。',
  },
  {
    id: 'industry-20260709-scotland-semi-closed',
    title: '未来养鱼场什么样？苏格兰正在测试一种新模式',
    publishedAt: '2026-07-09',
    contentType: '技术装备',
    tags: ['半封闭养殖', '废弃物回收', '苏格兰'],
    summary: '苏格兰测试浮式半封闭养殖系统，重点提升养殖废弃物回收能力并降低近海环境影响。',
  },
  {
    id: 'industry-20260703-tautiki-processing-ship',
    title: '传统加工厂被“搬走”了，北欧水产正在换一种活法',
    publishedAt: '2026-07-03',
    contentType: '产业与企业',
    tags: ['加工船', '北欧水产', '产业转型'],
    summary: '北欧水产养殖业借助新一代加工船推进海上加工和产业化转型，新型加工船已投入运营。',
  },
  {
    id: 'industry-20260702-honduras-shrimp',
    title: '痛失高端市场，这个国家超250家虾企倒闭了',
    publishedAt: '2026-07-02',
    contentType: '市场行情',
    tags: ['洪都拉斯', '白对虾', '经营风险'],
    summary: '洪都拉斯白对虾出口虽有增长，但高端市场流失和经营压力仍导致大量企业停止营业。',
  },
  {
    id: 'industry-20260630-black-cod-ras',
    title: '比三文鱼贵5倍！全球高端餐厅抢购的黑鳕首次陆基养殖',
    publishedAt: '2026-06-30',
    contentType: '养殖项目',
    tags: ['黑鳕', '陆基养殖', '高端市场'],
    summary: '欧洲推进首个黑鳕陆基养殖项目，瞄准供应紧张、价格较高的高端餐饮消费市场。',
  },
  {
    id: 'industry-20260626-fao-report',
    title: '最新报告：全球水产产量创新高，养殖规模飙升至1.4亿吨！',
    publishedAt: '2026-06-26',
    contentType: '行业报告',
    tags: ['FAO', '全球水产', '产量数据'],
    summary: '文章梳理联合国粮农组织报告数据，介绍全球渔业和水产养殖产量及产业规模的最新变化。',
  },
  {
    id: 'industry-20260623-chum-salmon-ras',
    title: '全球首个！大马哈鱼陆基RAS养殖项目启动',
    publishedAt: '2026-06-23',
    contentType: '养殖项目',
    tags: ['大马哈鱼', 'RAS', '日本'],
    summary: '日本启动大马哈鱼全生命周期陆基循环水养殖项目，探索野生资源压力下的稳定供给方案。',
  },
  {
    id: 'industry-20260618-global-shrimp-competition',
    title: '全球对虾行业加速洗牌：谁在被挤出市场？',
    publishedAt: '2026-06-18',
    contentType: '市场行情',
    tags: ['对虾', '行业竞争', '产区洗牌'],
    summary: '主要虾类生产国之间竞争加剧，全球对虾产业在成本、效率和市场份额方面持续洗牌。',
  },
  {
    id: 'industry-20260612-land-salmon-scale',
    title: '陆基三文鱼养殖仍需数年才能实现规模化？',
    publishedAt: '2026-06-12',
    contentType: '养殖项目',
    tags: ['陆基三文鱼', '规模化', '盈利压力'],
    summary: '陆基三文鱼行业的规模化进程仍较缓慢，多家企业需要继续解决产能爬坡和盈利压力。',
  },
  {
    id: 'industry-20260609-feed-market',
    title: '鱼粉涨疯了，豆粕却暴跌！全球饲料市场出现罕见分化',
    publishedAt: '2026-06-09',
    contentType: '市场行情',
    tags: ['鱼粉', '豆粕', '饲料成本'],
    summary: '鱼粉供应偏紧推动价格继续上涨，而豆粕价格走低，全球水产饲料原料市场出现明显分化。',
  },
  {
    id: 'industry-20260605-guolian-assets',
    title: '回血1600万，国联水产出售湖北加工厂盘活资产',
    publishedAt: '2026-06-05',
    contentType: '产业与企业',
    tags: ['国联水产', '资产出售', '资金压力'],
    summary: '国联水产出售湖北闲置加工资产以回笼资金、减少亏损，并缓解持续承压的经营状况。',
  },
]

export const newsItems = industryArticles.map(item => ({ ...industrySource, ...item }))

export const filterNewsItems = (category = 'all') => (
  category === 'all' ? newsItems : newsItems.filter(item => item.category === category)
)

export const paginateNewsItems = (category = 'all', requestedPage = 1, requestedPageSize = 6) => {
  const items = filterNewsItems(category)
  const pageSize = Math.max(1, Number(requestedPageSize) || 6)
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const page = Math.min(totalPages, Math.max(1, Number(requestedPage) || 1))
  const offset = (page - 1) * pageSize

  return {
    items: items.slice(offset, offset + pageSize),
    page,
    pageSize,
    totalItems: items.length,
    totalPages,
  }
}

export const findNewsItem = id => newsItems.find(item => item.id === id) ?? null

export const getNewsItemDetail = item => item ? ({
  title: item.title,
  publisher: item.publisher,
  publishedAt: item.publishedAt,
  documentNumber: item.documentNumber,
  summary: item.summary,
  sourceUrl: item.sourceUrl,
  contentType: item.contentType,
  tags: item.tags,
  sourcePlatform: item.sourcePlatform,
  sourceAccountId: item.sourceAccountId,
  sourceMethod: item.sourceMethod,
}) : null
