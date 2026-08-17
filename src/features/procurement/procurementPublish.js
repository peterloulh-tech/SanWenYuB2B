const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^\+?\d{7,20}$/

export const emptyProcurementRequest = {
  category: '',
  details: '',
  quantity: '',
  city: '',
  deadline: '',
  phone: '',
  email: '',
}

export function getLocalDateInputValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function validateProcurementRequest(request, today = getLocalDateInputValue()) {
  const errors = {}
  if (!request.category.trim()) errors.category = '请选择采购品类'
  if (!request.details.trim()) errors.details = '请填写具体采购需求'
  if (!request.quantity.trim()) errors.quantity = '请填写需求数量'
  if (!request.city.trim()) errors.city = '请填写交付城市'
  if (!request.deadline) errors.deadline = '请选择截止日期'
  else if (request.deadline < today) errors.deadline = '截止日期不能早于今天'

  const normalizedPhone = request.phone.replace(/[()\s-]/g, '')
  if (!request.phone.trim()) errors.phone = '请填写联系电话'
  else if (!phonePattern.test(normalizedPhone)) errors.phone = '请输入正确的手机或座机号码'
  if (request.email.trim() && !emailPattern.test(request.email.trim())) errors.email = '请输入正确的邮箱地址'
  return errors
}
