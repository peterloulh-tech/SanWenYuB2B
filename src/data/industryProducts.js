export const enterpriseProductSections = [
  { id: 'fresh', name: '鲜鱼产品', description: '整鱼、鱼柳、切片与副产物' },
  { id: 'aquaculture', name: '养殖供应', description: '鱼苗、饲料、鱼药与设备' },
  { id: 'processed', name: '深加工品', description: '烟熏、鱼饼与预制菜' },
  { id: 'seafood', name: '其他海产', description: '虾、蟹与贝类批量采购' },
]

const product = (id, section, category, name, supplier, region, spec, price, minOrder, supply, image, extra = {}) => ({
  id, section, category, name, supplier, region, spec, price, minOrder, supply, image,
  delivery: '支持企业冷链配送',
  storage: section === 'aquaculture' ? '按商品说明储运' : '-18℃ 冷冻储存',
  settlement: '以询价单和实际交付量为准',
  ...extra,
})

export const industryProducts = [
  product('fresh-whole-salmon', 'fresh', '整鱼', '冰鲜大西洋鲑整鱼', '日照海洋食品有限公司', '山东日照', '4—6 千克/尾', '¥88/kg 起', '500 千克', '日供 25 吨', '/assets/products/whole-salmon-on-ice.png', { storage: '0—4℃ 冷藏储存' }),
  product('salmon-fillet', 'fresh', '鱼柳', '冷冻去皮三文鱼柳', '青岛极鲜供应链有限公司', '山东青岛', '1.2—1.8 千克/片', '¥118/kg 起', '300 千克', '周供 40 吨', '/assets/products/salmon-fillet.png'),
  product('salmon-slices', 'fresh', '切片', '标准化三文鱼切片', '荣成海味加工有限公司', '山东荣成', '500 克/盒', '¥72/盒起', '200 盒', '日供 8,000 盒', '/assets/products/salmon-slices.png'),
  product('salmon-byproducts', 'fresh', '副产物', '三文鱼骨及鱼头原料', '日照鲜港水产有限公司', '山东日照', '20 千克/箱', '¥12/kg 起', '1 吨', '日供 6 吨', '/assets/products/salmon-slices.png'),
  product('salmon-fry', 'aquaculture', '鱼卵鱼苗', '大西洋鲑优质鱼苗', '青岛海源良种有限公司', '山东青岛', '30—50 克/尾', '¥2.80/尾起', '5,000 尾', '月供 80 万尾', '/assets/salmon-hero-bg-v2.png', { delivery: '专业活水运输', storage: '按养殖技术要求暂养' }),
  product('salmon-vaccine', 'aquaculture', '鱼药疫苗', '鲑鳟鱼复合疫苗', '日照蓝海生物科技有限公司', '山东日照', '500 毫升/瓶', '面议', '20 瓶', '现货 1,200 瓶', '/assets/finance-aquaculture-hero-v2.png', { delivery: '医药冷链配送', storage: '2—8℃ 避光储存' }),
  product('salmon-feed', 'aquaculture', '饲料', '鲑鳟鱼高能配合饲料', '威海海牧饲料有限公司', '山东威海', '25 千克/袋', '¥9,600/吨起', '5 吨', '月供 500 吨', '/assets/finance-aquaculture-hero.png', { delivery: '整车或零担配送', storage: '阴凉干燥处储存' }),
  product('aquaculture-cage', 'aquaculture', '养殖设备', '深远海智能养殖网箱', '日照海工装备有限公司', '山东日照', '周长 80 米', '按方案报价', '1 套', '45 天交付', '/assets/salmon-hero-bg.png', { delivery: '项目制运输与安装', storage: '提供现场安装说明' }),
  product('smoked-salmon', 'processed', '烟熏产品', '低温烟熏三文鱼', '青岛北洋食品有限公司', '山东青岛', '200 克/袋', '¥42/袋起', '300 袋', '月供 10 万袋', '/assets/retail/smoked-salmon.png', { storage: '0—4℃ 冷藏储存' }),
  product('salmon-cakes', 'processed', '鱼饼', '即食三文鱼蔬菜鱼饼', '日照海享食品有限公司', '山东日照', '400 克/袋', '¥26/袋起', '500 袋', '日供 5,000 袋', '/assets/retail/salmon-sashimi.png'),
  product('salmon-prepared-meal', 'processed', '预制菜', '香煎三文鱼预制菜', '烟台鲜食科技有限公司', '山东烟台', '250 克/盒', '¥35/盒起', '300 盒', '日供 3,000 盒', '/assets/retail/fresh-salmon-center.png'),
  product('rizhao-prawns-b2b', 'seafood', '虾类', '日照海捕大虾', '日照海洋捕捞有限公司', '山东日照', '20—30 尾/千克', '¥56/kg 起', '500 千克', '日供 12 吨', '/assets/retail/rizhao-prawns.png'),
  product('swimming-crab-b2b', 'seafood', '蟹类', '鲜活梭子蟹', '日照鲜港水产有限公司', '山东日照', '3—4 只/千克', '¥76/kg 起', '300 千克', '日供 8 吨', '/assets/retail/swimming-crab.png', { delivery: '低温保活运输', storage: '低温透气暂养' }),
  product('sea-scallops', 'seafood', '扇贝', '半壳扇贝批量装', '青岛海湾贝类有限公司', '山东青岛', '8—10 厘米/只', '¥19/kg 起', '1 吨', '周供 30 吨', '/assets/retail/garlic-scallops.png'),
  product('rizhao-oysters', 'seafood', '生蚝', '日照海域鲜活生蚝', '日照蓝湾养殖有限公司', '山东日照', '8—12 只/千克', '¥16/kg 起', '500 千克', '日供 15 吨', '/assets/retail/seafood-family-gift-box.png', { delivery: '低温保活运输', storage: '低温湿润环境暂存' }),
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
}

export function findIndustryProduct(id) {
  const resolvedId = legacyProductAliases[id] || id
  return industryProducts.find((item) => item.id === resolvedId) ?? null
}

export function filterIndustryProducts(products, { section = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return products.filter((item) => {
    const matchesSection = section === 'all' || item.section === section
    const searchable = [item.name, item.category, item.supplier, item.region, item.spec].join(' ').toLowerCase()
    return matchesSection && (!normalizedKeyword || searchable.includes(normalizedKeyword))
  })
}

export function mapLegacyProductStage(stage) {
  return { upstream: 'aquaculture', midstream: 'fresh', downstream: 'processed' }[stage] || 'fresh'
}
