export const enterpriseProductSections = [
  { id: 'fresh', name: '鲜鱼产品', description: '日照深海三文鱼与标准分割' },
  { id: 'aquaculture', name: '养殖供应', description: '鱼卵、鱼苗、饲料、鱼药与设备' },
  { id: 'processed', name: '深加工品', description: '烟熏、鱼饼与预制菜' },
  // 按今日整改要求暂不上线，可恢复：
  // { id: 'seafood', name: '其他海产', description: '虾、蟹、贝类与合规特色海产' },
]

const product = (id, section, category, name, supplier, region, spec, price, minOrder, supply, image, extra = {}) => ({
  id, section, category, name, supplier, region, spec, price, minOrder, supply, image,
  species: '综合',
  origin: '中国',
  productForm: category,
  unit: '千克',
  sourceType: '养殖或加工',
  complianceNote: '',
  lifeStage: '',
  delivery: '支持企业冷链配送',
  storage: section === 'aquaculture' ? '按商品说明储运' : '-18℃ 冷冻储存',
  settlement: '演示商品，价格与供应能力以实际询价为准',
  ...extra,
})

export const industryProducts = [
  product('fresh-whole-salmon', 'fresh', '整鱼', '日照深海三文鱼整鱼', '山东万泽丰海洋开发集团有限公司', '山东日照', '4—6 千克/尾', '¥88/kg 起', '500 千克', '日供 25 吨', '/assets/products/whole-salmon-on-ice.png', {
    species: '大西洋鲑', origin: '山东日照深远海', productForm: '冰鲜整鱼', unit: '千克', sourceType: '深远海养殖·演示数据', storage: '0—4℃ 冷藏储存', traceBatchCode: 'RZ-SALMON-202608-001',
  }),
  product('salmon-fillet', 'fresh', '鱼柳', '日照深海三文鱼鱼柳', '山东万泽丰海洋开发集团有限公司', '山东日照', '1.2—1.8 千克/片', '¥118/kg 起', '300 千克', '周供 40 吨', '/assets/products/salmon-fillet.png', {
    species: '大西洋鲑', origin: '山东日照深远海', productForm: '冷冻去皮鱼柳', unit: '千克', sourceType: '深远海养殖原料·演示数据', traceBatchCode: 'RZ-SALMON-202608-002',
  }),
  product('salmon-slices', 'fresh', '切片', '日照深海三文鱼切片', '山东万泽丰海洋开发集团有限公司', '山东日照', '500 克/盒', '¥72/盒起', '200 盒', '日供 8,000 盒', '/assets/products/salmon-slices.png', {
    species: '大西洋鲑', origin: '山东日照深远海', productForm: '标准切片', unit: '盒', sourceType: '深远海养殖原料·演示数据', traceBatchCode: 'RZ-SALMON-202608-003',
  }),
  product('salmon-byproducts', 'fresh', '副产物', '三文鱼骨及鱼头原料', '日照鲜港水产有限公司', '山东日照', '20 千克/箱', '¥12/kg 起', '1 吨', '日供 6 吨', '/assets/products/salmon-byproducts.jpg', {
    species: '大西洋鲑', origin: '冰岛', productForm: '鱼骨鱼头副产物', unit: '千克', sourceType: '海水养殖原料·国内分拣',
  }),
  product('rainbow-trout-whole', 'fresh', '鳟鱼', '冰鲜虹鳟整鱼', '烟台山海水产有限公司', '山东烟台', '1.5—2.5 千克/尾', '¥46/kg 起', '300 千克', '日供 8 吨', '/assets/products/rainbow-trout-whole.jpg', {
    species: '虹鳟', origin: '中国', productForm: '冰鲜整鱼', unit: '千克', sourceType: '淡水养殖', storage: '0—4℃ 冷藏储存',
  }),

  product('norway-salmon-eggs', 'aquaculture', '鱼卵', '挪威系大西洋鲑发眼卵', '青岛海源良种有限公司', '山东青岛', '发眼期，10,000 枚/保温箱', '¥0.68/枚起', '50,000 枚', '月供 500 万枚', '/assets/products/norway-salmon-eggs.jpg', {
    species: '大西洋鲑', origin: '挪威', productForm: '发眼卵', unit: '枚', sourceType: '挪威种源·人工繁育', lifeStage: '发眼期', delivery: '2—4℃ 恒温充氧运输', storage: '2—4℃ 避光恒温储运',
  }),
  product('us-rainbow-trout-eggs', 'aquaculture', '鱼卵', '美国系虹鳟发眼卵', '威海虹源水产种业有限公司', '山东威海', '发眼期，10,000 枚/保温箱', '¥0.52/枚起', '50,000 枚', '月供 320 万枚', '/assets/products/us-rainbow-trout-eggs.jpg', {
    species: '虹鳟', origin: '美国', productForm: '发眼卵', unit: '枚', sourceType: '美国种源·人工繁育', lifeStage: '发眼期', delivery: '2—4℃ 恒温充氧运输', storage: '2—4℃ 避光恒温储运',
  }),
  product('norway-salmon-fry', 'aquaculture', '鱼苗', '挪威系大西洋鲑鱼苗', '青岛海源良种有限公司', '山东青岛', '30—50 克/尾', '¥2.80/尾起', '5,000 尾', '月供 80 万尾', '/assets/products/salmon-fry.jpg', {
    species: '大西洋鲑', origin: '挪威', productForm: '鱼苗', unit: '尾', sourceType: '挪威种源·人工繁育', lifeStage: '幼苗期', delivery: '专业活水增氧运输', storage: '按养殖技术要求暂养',
  }),
  product('us-rainbow-trout-fry', 'aquaculture', '鱼苗', '美国系虹鳟鱼苗', '日照虹川水产种业有限公司', '山东日照', '20—40 克/尾', '¥1.90/尾起', '8,000 尾', '月供 120 万尾', '/assets/products/us-rainbow-trout-fry.jpg', {
    species: '虹鳟', origin: '美国', productForm: '鱼苗', unit: '尾', sourceType: '美国种源·人工繁育', lifeStage: '幼苗期', delivery: '专业活水增氧运输', storage: '按养殖技术要求暂养',
  }),
  product('salmon-vaccine', 'aquaculture', '鱼药疫苗', '鲑鳟鱼复合疫苗', '日照蓝海生物科技有限公司', '山东日照', '500 毫升/瓶', '面议', '20 瓶', '现货 1,200 瓶', '/assets/products/salmon-vaccine.jpg', {
    species: '鲑鳟适用', origin: '中国', productForm: '水产疫苗', unit: '瓶', sourceType: '生物制品', delivery: '医药冷链配送', storage: '2—8℃ 避光储存',
  }),
  product('salmon-feed', 'aquaculture', '饲料', '鲑鳟鱼高能配合饲料', '威海海牧饲料有限公司', '山东威海', '25 千克/袋', '¥9,600/吨起', '5 吨', '月供 500 吨', '/assets/products/salmon-feed.jpg', {
    species: '鲑鳟适用', origin: '中国', productForm: '颗粒配合饲料', unit: '吨', sourceType: '饲料加工', delivery: '整车或零担配送', storage: '阴凉干燥处储存',
  }),
  product('aquaculture-cage', 'aquaculture', '养殖设备', '深远海智能养殖网箱', '日照海工装备有限公司', '山东日照', '周长 80 米', '按方案报价', '1 套', '45 天交付', '/assets/products/aquaculture-cage.jpg', {
    species: '鲑鳟养殖通用', origin: '中国', productForm: '智能养殖设备', unit: '套', sourceType: '工业制造', delivery: '项目制运输与安装', storage: '提供现场安装说明',
  }),

  product('smoked-salmon', 'processed', '烟熏产品', '低温烟熏三文鱼', '青岛北洋食品有限公司', '山东青岛', '200 克/袋', '¥42/袋起', '300 袋', '月供 10 万袋', '/assets/retail/smoked-salmon.png', {
    species: '大西洋鲑', origin: '挪威', productForm: '低温烟熏切片', unit: '袋', sourceType: '海水养殖原料·国内加工', storage: '0—4℃ 冷藏储存',
  }),
  product('salmon-cakes', 'processed', '鱼饼', '即食三文鱼蔬菜鱼饼', '日照海享食品有限公司', '山东日照', '400 克/袋', '¥26/袋起', '500 袋', '日供 5,000 袋', '/assets/products/salmon-cakes.jpg', {
    species: '大西洋鲑', origin: '智利', productForm: '熟制鱼饼', unit: '袋', sourceType: '海水养殖原料·国内加工',
  }),
  product('salmon-prepared-meal', 'processed', '预制菜', '香煎三文鱼预制菜', '烟台鲜食科技有限公司', '山东烟台', '250 克/盒', '¥35/盒起', '300 盒', '日供 3,000 盒', '/assets/products/salmon-prepared-meal.jpg', {
    species: '大西洋鲑', origin: '加拿大', productForm: '调理预制菜', unit: '盒', sourceType: '海水养殖原料·国内加工',
  }),

  /* 按今日整改要求暂不上线，可恢复：其他海产 6 项代码保留。
  product('rizhao-prawns-b2b', 'seafood', '虾类', '日照海捕大虾', '日照海洋捕捞有限公司', '山东日照', '20—30 尾/千克', '¥56/kg 起', '500 千克', '日供 12 吨', '/assets/retail/rizhao-prawns.png', {
    species: '对虾', origin: '山东日照近海', productForm: '冰鲜整虾', unit: '千克', sourceType: '合规捕捞',
  }),
  product('swimming-crab-b2b', 'seafood', '蟹类', '鲜活梭子蟹', '日照鲜港水产有限公司', '山东日照', '3—4 只/千克', '¥76/kg 起', '300 千克', '日供 8 吨', '/assets/retail/swimming-crab.png', {
    species: '三疣梭子蟹', origin: '山东沿海', productForm: '鲜活', unit: '千克', sourceType: '养殖/合规捕捞', delivery: '低温保活运输', storage: '低温透气暂养',
  }),
  product('sea-scallops', 'seafood', '扇贝', '半壳扇贝批量装', '青岛海湾贝类有限公司', '山东青岛', '8—10 厘米/只', '¥19/kg 起', '1 吨', '周供 30 吨', '/assets/retail/garlic-scallops.png', {
    species: '扇贝', origin: '山东沿海', productForm: '冷冻半壳', unit: '千克', sourceType: '人工养殖',
  }),
  product('rizhao-oysters', 'seafood', '生蚝', '日照海域鲜活生蚝', '日照蓝湾养殖有限公司', '山东日照', '8—12 只/千克', '¥16/kg 起', '500 千克', '日供 15 吨', '/assets/retail/seafood-family-gift-box.png', {
    species: '太平洋牡蛎', origin: '山东日照海域', productForm: '鲜活', unit: '千克', sourceType: '人工养殖', delivery: '低温保活运输', storage: '低温湿润环境暂存',
  }),
  product('farmed-dried-seahorse', 'seafood', '海马', '人工养殖海马干品（资质审核）', '日照海润药食供应有限公司', '山东日照', '体长 10—14 厘米，500 克/袋', '资质审核后询价', '10 千克', '资质核验后确认', '/assets/products/farmed-dried-seahorse.jpg', {
    species: '海马属（Hippocampus spp.）', origin: '中国广东', productForm: '人工养殖干品', unit: '千克', sourceType: '人工养殖·合法来源', delivery: '密封防潮运输，单证随货', storage: '阴凉干燥处密封储存', complianceNote: '演示商品；实际交易需核验合法来源、经营资质及相关许可，仅在资质审核后提交询价。',
  }),
  product('rizhao-xishishe-clam', 'seafood', '西施舌', '日照鲜活西施舌', '日照金滩贝类养殖有限公司', '山东日照', '壳长 8—10 厘米，10—15 只/千克', '¥68/kg 起', '200 千克', '日供 2 吨', '/assets/products/rizhao-xishishe-clam.jpg', {
    species: '西施马珂蛤', origin: '山东日照海域', productForm: '鲜活贝类', unit: '千克', sourceType: '人工养殖/合规采捕', delivery: '低温保活运输', storage: '5—10℃ 湿润透气暂养', complianceNote: '演示商品；供货批次需核验人工养殖或合规采捕来源。',
  }),
  */
]

const legacyProductAliases = {
  1: 'fresh-whole-salmon',
  2: 'fresh-whole-salmon',
  3: 'salmon-fillet',
  4: 'salmon-slices',
  5: 'salmon-fillet',
  6: 'salmon-slices',
  7: 'salmon-fillet',
  8: 'salmon-byproducts',
  'salmon-fry': 'norway-salmon-fry',
}

export function findIndustryProduct(id) {
  const resolvedId = legacyProductAliases[id] || id
  return industryProducts.find((item) => item.id === resolvedId) ?? null
}

export function filterIndustryProducts(products, { section = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return products.filter((item) => {
    const matchesSection = section === 'all' || item.section === section
    const searchable = [item.name, item.category, item.supplier, item.region, item.spec, item.species, item.origin, item.productForm].join(' ').toLowerCase()
    return matchesSection && (!normalizedKeyword || searchable.includes(normalizedKeyword))
  })
}

export function resolveIndustryProductSearchSection(keyword, fallback = 'fresh') {
  return filterIndustryProducts(industryProducts, { section: 'all', keyword })[0]?.section || fallback
}

export function mapLegacyProductStage(stage) {
  return { upstream: 'aquaculture', midstream: 'fresh', downstream: 'processed' }[stage] || 'fresh'
}
