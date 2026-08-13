export const enterprisePrimaryActions = [
  {
    icon: 'purchase',
    title: '我要采购',
    description: '找产品、查现货、快速下单',
    path: '/products',
    color: 'blue',
  },
  {
    icon: 'sell',
    title: '我要卖鱼',
    description: '发布商品、管理订单、扩大销售',
    path: '/suppliers',
    color: 'orange',
  },
  {
    icon: 'sourcing',
    title: '我要找货',
    description: '发布采购需求、等待供应商报价',
    path: '/procurement',
    color: 'green',
  },
  {
    icon: 'news',
    title: '新闻政策',
    description: '查看行业资讯与政策动态',
    path: null,
    pendingMessage: '新闻政策页面将在后续阶段开发',
    color: 'violet',
  },
]

export const additionalEnterpriseActions = [
  {
    icon: 'service',
    title: '产业服务',
    description: '找加工、检测、冷链等服务',
    path: '/services',
    color: 'blue',
  },
  {
    icon: 'upstream',
    title: '上游供应',
    description: '鱼苗、饲料、鱼药与设备',
    path: '/industry-products?stage=upstream',
    color: 'orange',
  },
  {
    icon: 'midstream',
    title: '中游产品',
    description: '整鱼、鱼柳、切片与副产物',
    path: '/industry-products?stage=midstream',
    color: 'green',
  },
  {
    icon: 'downstream',
    title: '下游产品',
    description: '烟熏产品、鱼饼与预制菜',
    path: '/industry-products?stage=downstream',
    color: 'violet',
  },
]
