export const salmonRecipes = [
  {
    id: 'pan-seared-salmon', name: '香煎三文鱼', image: '/assets/products/salmon-prepared-meal.jpg', time: '20 分钟', difficulty: '简单', product: '三文鱼鱼排', productPath: '/retail/products/pan-seared-salmon-steak',
    ingredients: ['三文鱼鱼排 250g', '海盐 2g', '黑胡椒适量', '食用油 10ml'],
    steps: ['三文鱼解冻后吸干表面水分。', '两面撒海盐和黑胡椒，静置 5 分钟。', '平底锅加热放油，鱼排两面各煎 3～4 分钟。', '确认中心熟透后装盘食用。'],
    safety: '冷冻产品需完全解冻并充分加热；不将本预制鱼排作为刺身原料。',
  },
  {
    id: 'air-fryer-salmon', name: '空气炸锅三文鱼', image: '/assets/products/salmon-cakes.jpg', time: '18 分钟', difficulty: '简单', product: '三文鱼中段', productPath: '/retail/products/fresh-salmon-center',
    ingredients: ['三文鱼中段 300g', '橄榄油 5ml', '盐与黑胡椒适量'],
    steps: ['三文鱼解冻并擦干。', '薄涂橄榄油并调味。', '空气炸锅预热后放入鱼块。', '按设备功率烤至中心熟透。'],
    safety: '不同设备温度存在差异，应以三文鱼中心完全熟透为准。',
  },
  {
    id: 'oven-baked-salmon', name: '烤箱三文鱼', image: '/assets/products/salmon-fillet.png', time: '30 分钟', difficulty: '容易', product: '三文鱼鱼柳', productPath: '/retail/products/fresh-salmon-center',
    ingredients: ['三文鱼鱼柳 300g', '柠檬片', '迷迭香', '海盐适量'],
    steps: ['鱼柳解冻后吸干水分。', '铺上柠檬片并调味。', '放入预热烤箱烤制。', '确认中心熟透后静置 2 分钟。'],
    safety: '烤制时间需按鱼柳厚度调整，避免中心未熟。',
  },
  {
    id: 'salmon-salad', name: '三文鱼沙拉', image: '/assets/retail/salmon-sashimi.png', time: '15 分钟', difficulty: '简单', product: '三文鱼切片', productPath: '/retail/products/salmon-sashimi',
    ingredients: ['三文鱼切片 200g', '生菜 150g', '番茄 100g', '沙拉汁适量'],
    steps: ['确认产品标签适合直接食用并保持冷藏。', '蔬菜洗净沥干后铺盘。', '加入三文鱼切片。', '食用前淋上沙拉汁。'],
    safety: '生食前必须确认产品明确适合生食；孕妇、儿童、老年人及免疫力较弱人群应谨慎。',
  },
  {
    id: 'salmon-fried-rice', name: '三文鱼炒饭', image: '/assets/products/salmon-slices.png', time: '25 分钟', difficulty: '容易', product: '三文鱼切片', productPath: '/retail/products/salmon-sashimi',
    ingredients: ['三文鱼 150g', '米饭 300g', '鸡蛋 1 个', '时蔬 100g'],
    steps: ['三文鱼切丁并煎至变色。', '加入鸡蛋和时蔬翻炒。', '加入米饭炒散。', '调味后继续翻炒至全部熟透。'],
    safety: '隔夜米饭应冷藏保存并在食用前彻底加热。',
  },
  {
    id: 'salmon-congee', name: '三文鱼粥', image: '/assets/retail/fresh-salmon-center.png', time: '40 分钟', difficulty: '容易', product: '三文鱼中段', productPath: '/retail/products/fresh-salmon-center',
    ingredients: ['三文鱼 150g', '大米 100g', '清水 1L', '姜丝适量'],
    steps: ['大米洗净后煮至开花。', '三文鱼切小块备用。', '加入鱼块和姜丝继续煮。', '鱼肉完全熟透后调味食用。'],
    safety: '给儿童和老年人食用前需仔细检查鱼刺并确保鱼肉熟透。',
  },
]

export function findSalmonRecipe(id) {
  return salmonRecipes.find((recipe) => recipe.id === id) ?? null
}
