import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { buildProcurementCategoryPath, getProcurementCategoryLevels, isProcurementCategoryComplete, procurementCategoryPaths, procurementCategoryTree } from '../src/data/procurementCategories.js'
import { validateProcurementRequest } from '../src/features/procurement/procurementPublish.js'

test('采购品类提供四个大品类和二到四层完整路径', () => {
  assert.deepEqual(procurementCategoryTree.map((group) => group.label), ['鲜鱼产品', '养殖供应', '深加工品', '其他海产'])
  assert.equal(procurementCategoryPaths.length, 24)
  assert.equal(new Set(procurementCategoryPaths).size, procurementCategoryPaths.length)
  for (const path of procurementCategoryPaths) assert.equal(path.includes(' / '), true, `${path} 不是完整分类路径`)
  assert.equal(Math.min(...procurementCategoryPaths.map((path) => path.split(' / ').length)), 2)
  assert.equal(Math.max(...procurementCategoryPaths.map((path) => path.split(' / ').length)), 4)
})

test('鱼卵和鱼苗使用独立品种和种源国家层级', () => {
  const expectedPaths = [
    '养殖供应 / 鱼卵 / 大西洋鲑 / 挪威',
    '养殖供应 / 鱼卵 / 虹鳟 / 美国',
    '养殖供应 / 鱼苗 / 大西洋鲑 / 挪威',
    '养殖供应 / 鱼苗 / 虹鳟 / 美国',
  ]
  assert.deepEqual(procurementCategoryPaths.filter((path) => path.includes('/ 鱼卵 /') || path.includes('/ 鱼苗 /')), expectedPaths)
  const selection = ['aquaculture', 'eggs', 'atlantic-salmon', 'norway']
  assert.deepEqual(getProcurementCategoryLevels(selection).map((level) => level.label), ['大品类', '细分品类', '品种', '种源国家'])
  assert.equal(buildProcurementCategoryPath(selection), '养殖供应 / 鱼卵 / 大西洋鲑 / 挪威')
  assert.equal(isProcurementCategoryComplete(selection), true)
  assert.equal(isProcurementCategoryComplete(selection.slice(0, 3)), false)
})

test('采购发布校验必填字段、电话、可选邮箱和截止日期', () => {
  assert.deepEqual(validateProcurementRequest({ category: '', details: '', quantity: '', city: '', deadline: '', phone: '', email: '' }, '2026-08-14'), {
    category: '请选择采购品类',
    details: '请填写具体采购需求',
    quantity: '请填写需求数量',
    city: '请填写交付城市',
    deadline: '请选择截止日期',
    phone: '请填写联系电话',
  })

  const validRequest = { category: procurementCategoryPaths[0], details: '整鱼，单条 4–6 公斤，纸箱包装', quantity: '20 吨', city: '山东省日照市', deadline: '2026-08-20', phone: '0633-8888888', email: '' }
  assert.deepEqual(validateProcurementRequest(validRequest, '2026-08-14'), {})
  assert.deepEqual(validateProcurementRequest({ ...validRequest, phone: '138 0000 2026', email: 'buyer@example.com' }, '2026-08-14'), {})
  assert.equal(validateProcurementRequest({ ...validRequest, deadline: '2026-08-13' }, '2026-08-14').deadline, '截止日期不能早于今天')
  assert.equal(validateProcurementRequest({ ...validRequest, email: 'buyer@example' }, '2026-08-14').email, '请输入正确的邮箱地址')
})

test('发布采购使用专用页面而不改造通用表单', async () => {
  const app = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const actionPage = await readFile(new URL('../src/pages/ActionPage.jsx', import.meta.url), 'utf8')
  assert.match(app, /path="procurement\/new" element={<ProcurementPublishPage \/>}/)
  assert.doesNotMatch(app, /ActionPage type="publish"/)
  assert.doesNotMatch(actionPage, /publish:/)
  const publishPage = await readFile(new URL('../src/pages/ProcurementPublishPage.jsx', import.meta.url), 'utf8')
  const linkedSelect = await readFile(new URL('../src/components/ui/LinkedSelect.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(publishPage, /<optgroup|<select/)
  assert.match(publishPage, /<LinkedSelect/)
  assert.match(linkedSelect, /linked-category-menu/)
  assert.match(publishPage, /具体采购需求/)
  assert.match(publishPage, /<textarea/)
})
