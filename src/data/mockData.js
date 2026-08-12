export const products = [
  { id: 1, name: '日照冰鲜三文鱼', spec: '3-4kg/条', origin: '挪威', price: '78.00', supplier: '日照海洋渔业有限公司', city: '山东日照', image: '/assets/products/whole-salmon-on-ice.png' },
  { id: 2, name: '冷冻三文鱼整鱼', spec: '4-5kg/条', origin: '智利', price: '72.50', supplier: '荣成海洋食品有限公司', city: '山东威海', image: '/assets/products/whole-salmon-on-ice.png' },
  { id: 3, name: '精品三文鱼柳', spec: '1-1.5kg/条', origin: '挪威', price: '126.00', supplier: '青岛深蓝水产有限公司', city: '山东青岛', image: '/assets/products/salmon-fillet.png' },
  { id: 4, name: '即食三文鱼切片', spec: '500g/包', origin: '中国', price: '98.00', supplier: '威海加仓味食品', city: '山东威海', image: '/assets/products/salmon-slices.png' },
  { id: 5, name: '大西洋三文鱼中段', spec: '2kg/盒', origin: '法罗群岛', price: '108.00', supplier: '大连北海三文鱼有限公司', city: '辽宁大连', image: '/assets/products/salmon-fillet.png' },
  { id: 6, name: '三文鱼刺身拼盘', spec: '400g/盒', origin: '挪威', price: '138.00', supplier: '日照蓝海供应链有限公司', city: '山东日照', image: '/assets/products/salmon-slices.png' },
  { id: 7, name: '冷鲜三文鱼鱼排', spec: '600g/包', origin: '智利', price: '88.00', supplier: '青岛海洋食品有限公司', city: '山东青岛', image: '/assets/products/salmon-fillet.png' },
  { id: 8, name: '三文鱼边角料', spec: '10kg/箱', origin: '中国', price: '36.00', supplier: '烟台冷链食品有限公司', city: '山东烟台', image: '/assets/products/salmon-slices.png' },
]

export const demands = [
  { id: 'CG20260811001', name: '冰鲜整鱼 3-5kg/条', amount: '20吨', city: '上海', deadline: '2026-08-15', quotes: 6, company: '上海鲜达供应链有限公司' },
  { id: 'CG20260811002', name: '三文鱼切片 500g/包', amount: '10吨', city: '广州', deadline: '2026-08-16', quotes: 3, company: '广州优鲜食品有限公司' },
  { id: 'CG20260811003', name: '三文鱼柳 1-1.5kg/条', amount: '15吨', city: '北京', deadline: '2026-08-18', quotes: 8, company: '北京冷链集采中心' },
  { id: 'CG20260811004', name: '冷冻整鱼 4-6kg/条', amount: '30吨', city: '成都', deadline: '2026-08-20', quotes: 4, company: '成都海味商贸有限公司' },
  { id: 'CG20260811005', name: '精品三文鱼中段', amount: '8吨', city: '杭州', deadline: '2026-08-22', quotes: 2, company: '杭州生鲜电商有限公司' },
]

export const suppliers = ['日照海洋渔业有限公司','荣成海洋食品有限公司','青岛深蓝水产有限公司','大连北海三文鱼有限公司','日照蓝海供应链有限公司','烟台冷链食品有限公司']

export const orderRows = [
  ['DD202608110018','日照冰鲜三文鱼','上海鲜达供应链','¥153,200','运输中'],
  ['DD202608100032','精品三文鱼柳','北京冷链集采中心','¥126,000','待发货'],
  ['DD202608090156','冷冻三文鱼整鱼','广州优鲜食品','¥217,500','已完成'],
  ['DD202608080077','即食三文鱼切片','成都海味商贸','¥98,000','待付款'],
]
