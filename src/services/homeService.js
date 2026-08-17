import { homeFeaturedProducts } from '../data/homeFeaturedProducts'
import { demands, suppliers } from '../data/mockData'
const delay = (value, ms = 220) => new Promise(resolve => setTimeout(() => resolve(value), ms))

export const homeService = {
  getHome: () => delay({
    market: { price: '78.60', increase: '+2.35%', volume: '1,286.50' },
    products: homeFeaturedProducts, demands: demands.slice(0, 4), suppliers: suppliers.slice(0, 4),
    stats: [['认证供应商','1,286+','家'],['采购企业','3,562+','家'],['累计交易量','86,532+','吨'],['覆盖城市','156+','个']],
  }),
}
