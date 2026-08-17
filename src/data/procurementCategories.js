const leaf = (id, label) => ({ id, label })

export const procurementCategoryTree = [
  {
    id: 'fresh', label: '鲜鱼产品', childLabel: '细分品类', children: [
      { id: 'salmon', label: '三文鱼', childLabel: '产品形式', children: [leaf('whole', '整鱼'), leaf('fillet', '鱼柳'), leaf('steak', '鱼排'), leaf('slice', '切片'), leaf('byproduct', '鱼骨鱼头等副产物')] },
      { id: 'trout', label: '鳟鱼', childLabel: '产品形式', children: [leaf('whole', '整鱼'), leaf('fillet', '鱼柳'), leaf('slice', '切片')] },
    ],
  },
  {
    id: 'aquaculture', label: '养殖供应', childLabel: '细分品类', children: [
      {
        id: 'eggs', label: '鱼卵', childLabel: '品种', children: [
          { id: 'atlantic-salmon', label: '大西洋鲑', childLabel: '种源国家', children: [leaf('norway', '挪威')] },
          { id: 'rainbow-trout', label: '虹鳟', childLabel: '种源国家', children: [leaf('us', '美国')] },
        ],
      },
      {
        id: 'fry', label: '鱼苗', childLabel: '品种', children: [
          { id: 'atlantic-salmon', label: '大西洋鲑', childLabel: '种源国家', children: [leaf('norway', '挪威')] },
          { id: 'rainbow-trout', label: '虹鳟', childLabel: '种源国家', children: [leaf('us', '美国')] },
        ],
      },
      leaf('feed', '饲料'),
      leaf('medicine', '鱼药疫苗'),
      leaf('equipment', '养殖设备'),
    ],
  },
  { id: 'processed', label: '深加工品', childLabel: '细分品类', children: [leaf('smoked', '烟熏产品'), leaf('fish-cake', '鱼饼'), leaf('prepared-meal', '预制菜')] },
  { id: 'seafood', label: '其他海产', childLabel: '细分品类', children: [leaf('shrimp', '虾类'), leaf('crab', '蟹类'), leaf('scallop', '扇贝'), leaf('oyster', '生蚝'), leaf('seahorse', '海马'), leaf('xishishe', '西施舌')] },
]

function resolveSelection(selection) {
  const nodes = []
  let options = procurementCategoryTree
  for (const id of selection) {
    const node = options.find((item) => item.id === id)
    if (!node) break
    nodes.push(node)
    options = node.children || []
  }
  return nodes
}

export function getProcurementCategoryLevels(selection = []) {
  const levels = []
  let label = '大品类'
  let options = procurementCategoryTree
  for (let index = 0; options.length; index += 1) {
    levels.push({ label, options })
    const selectedNode = options.find((item) => item.id === selection[index])
    if (!selectedNode?.children?.length) break
    label = selectedNode.childLabel
    options = selectedNode.children
  }
  return levels
}

export function buildProcurementCategoryPath(selection = []) {
  return resolveSelection(selection).map((node) => node.label).join(' / ')
}

export function isProcurementCategoryComplete(selection = []) {
  const nodes = resolveSelection(selection)
  return nodes.length === selection.length && nodes.length > 0 && !nodes.at(-1)?.children?.length
}

function collectPaths(options, prefix = []) {
  return options.flatMap((option) => option.children?.length
    ? collectPaths(option.children, [...prefix, option.label])
    : [[...prefix, option.label].join(' / ')])
}

export const procurementCategoryPaths = collectPaths(procurementCategoryTree)
