export const industryProductStages = [
  { id: 'all', name: '全部商品', description: '汇总全产业链商品' },
  { id: 'upstream', name: '上游供应', description: '养殖投入与生产设备' },
  { id: 'midstream', name: '中游产品', description: '整鱼、分割与副产物' },
  { id: 'downstream', name: '下游产品', description: '深加工与消费成品' },
]

export const industryProducts = [
  { id: 'salmon-fry', stage: 'upstream', category: '鱼卵鱼苗', name: '大西洋鲑优质鱼苗', supplier: '青岛海源良种有限公司', region: '山东青岛', spec: '30—50 克/尾', price: '¥2.80/尾起', minOrder: '5,000 尾', supply: '月供 80 万尾' },
  { id: 'salmon-vaccine', stage: 'upstream', category: '鱼药疫苗', name: '鲑鳟鱼复合疫苗', supplier: '日照蓝海生物科技有限公司', region: '山东日照', spec: '500 毫升/瓶', price: '面议', minOrder: '20 瓶', supply: '现货 1,200 瓶' },
  { id: 'salmon-feed', stage: 'upstream', category: '饲料', name: '鲑鳟鱼高能配合饲料', supplier: '威海海牧饲料有限公司', region: '山东威海', spec: '25 千克/袋', price: '¥9,600/吨起', minOrder: '5 吨', supply: '月供 500 吨' },
  { id: 'aquaculture-cage', stage: 'upstream', category: '养殖设备', name: '深远海智能养殖网箱', supplier: '日照海工装备有限公司', region: '山东日照', spec: '周长 80 米', price: '按方案报价', minOrder: '1 套', supply: '45 天交付' },
  { id: 'fresh-whole-salmon', stage: 'midstream', category: '整鱼', name: '冰鲜大西洋鲑整鱼', supplier: '日照海洋食品有限公司', region: '山东日照', spec: '4—6 千克/尾', price: '¥88/kg 起', minOrder: '500 千克', supply: '日供 25 吨' },
  { id: 'salmon-fillet', stage: 'midstream', category: '鱼柳', name: '冷冻去皮三文鱼柳', supplier: '青岛极鲜供应链有限公司', region: '山东青岛', spec: '1.2—1.8 千克/片', price: '¥118/kg 起', minOrder: '300 千克', supply: '周供 40 吨' },
  { id: 'salmon-slices', stage: 'midstream', category: '切片', name: '标准化三文鱼切片', supplier: '荣成海味加工有限公司', region: '山东荣成', spec: '500 克/盒', price: '¥72/盒起', minOrder: '200 盒', supply: '日供 8,000 盒' },
  { id: 'salmon-byproducts', stage: 'midstream', category: '副产物', name: '三文鱼骨及鱼头原料', supplier: '日照鲜港水产有限公司', region: '山东日照', spec: '20 千克/箱', price: '¥12/kg 起', minOrder: '1 吨', supply: '日供 6 吨' },
  { id: 'smoked-salmon', stage: 'downstream', category: '烟熏产品', name: '低温烟熏三文鱼', supplier: '青岛北洋食品有限公司', region: '山东青岛', spec: '200 克/袋', price: '¥42/袋起', minOrder: '300 袋', supply: '月供 10 万袋' },
  { id: 'salmon-cakes', stage: 'downstream', category: '鱼饼', name: '即食三文鱼蔬菜鱼饼', supplier: '日照海享食品有限公司', region: '山东日照', spec: '400 克/袋', price: '¥26/袋起', minOrder: '500 袋', supply: '日供 5,000 袋' },
  { id: 'salmon-prepared-meal', stage: 'downstream', category: '预制菜', name: '香煎三文鱼预制菜', supplier: '烟台鲜食科技有限公司', region: '山东烟台', spec: '250 克/盒', price: '¥35/盒起', minOrder: '300 盒', supply: '日供 3,000 盒' },
]

export function filterIndustryProducts(products, { stage = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return products.filter((product) => {
    const matchesStage = stage === 'all' || product.stage === stage
    const searchable = [product.name, product.category, product.supplier, product.region, product.spec].join(' ').toLowerCase()
    return matchesStage && (!normalizedKeyword || searchable.includes(normalizedKeyword))
  })
}
