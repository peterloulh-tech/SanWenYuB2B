export const patentCategories = [
  { id: 'deep-sea', name: '深远海养殖' },
  { id: 'equipment', name: '网箱及养殖装备' },
  { id: 'breeding', name: '种苗饲料与病害防控' },
  { id: 'processing', name: '加工与保鲜' },
  { id: 'cold-chain', name: '冷链与溯源' },
]

export const cooperationModes = ['技术转让', '许可使用', '合作开发', '成果对接']

export const demoPatents = patentCategories.map((category, index) => ({
  id: `demo-patent-${index + 1}`,
  demo: true,
  category: category.id,
  name: `${category.name}技术成果演示方案`,
  summary: `用于展示${category.name}方向的技术成果介绍、适用场景和合作意向流程。`,
  patentType: '专利类型待核验',
  applicationNumber: '',
  statusLabel: '演示数据 · 法律状态待核验',
  legalStatus: '',
  ownerLabel: '权利人资料待补充',
  owner: '',
  scenarios: `${category.name}相关企业技术升级与成果对接`,
  cooperationModes,
}))

export function filterPatents(patents = demoPatents, { category = 'all', keyword = '' } = {}) {
  const normalizedKeyword = keyword.trim().toLowerCase()
  return patents.filter((patent) => {
    if (category !== 'all' && patent.category !== category) return false
    if (!normalizedKeyword) return true
    const categoryName = patentCategories.find(({ id }) => id === patent.category)?.name || ''
    return [patent.name, patent.summary, patent.scenarios, categoryName].join(' ').toLowerCase().includes(normalizedKeyword)
  })
}

export function findPatent(id) {
  return demoPatents.find((patent) => patent.id === id) ?? null
}

export function validatePatentInquiry(values = {}) {
  const errors = {}
  if (!values.contactName?.trim()) errors.contactName = '请填写联系人'
  if (!values.phone?.trim()) errors.phone = '请填写联系电话'
  else if (!/^(?:1\d{10}|0\d{2,3}-?\d{7,8})$/.test(values.phone.trim())) errors.phone = '请输入有效的手机或座机号码'
  if (!values.cooperationMode) errors.cooperationMode = '请选择合作方式'
  if (!values.intention?.trim()) errors.intention = '请填写合作需求'
  return errors
}
