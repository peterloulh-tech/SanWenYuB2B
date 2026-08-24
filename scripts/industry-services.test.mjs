import assert from 'node:assert/strict'
import test from 'node:test'

import { additionalEnterpriseActions, enterprisePrimaryActions } from '../src/data/enterpriseHomeActions.js'
import * as industryServiceData from '../src/data/industryServices.js'

const {
  industryServiceCategories,
  industryServices,
  findIndustryService,
} = industryServiceData

test('企业首页第二排保留两类商品入口并新增溯源查询', () => {
  assert.equal(additionalEnterpriseActions.length, 4)
  assert.deepEqual(
    additionalEnterpriseActions.map(({ title, path }) => ({ title, path })),
    [
      { title: '产业服务', path: '/services' },
      { title: '养殖供应', path: '/products?section=aquaculture' },
      { title: '深加工品', path: '/products?section=processed' },
      { title: '溯源查询', path: '/traceability' },
    ],
  )
})

test('企业首页第一排的新闻政策可直接进入资讯中心', () => {
  assert.deepEqual(
    enterprisePrimaryActions.map(({ title, path }) => ({ title, path })),
    [
      { title: '我要采购', path: '/products' },
      { title: '我要卖鱼', path: '/suppliers' },
      { title: '我要找货', path: '/procurement' },
      { title: '新闻政策', path: '/news' },
    ],
  )
  assert.equal(enterprisePrimaryActions[3].pendingMessage, undefined)
})

test('产业服务大厅覆盖六类企业服务', () => {
  assert.deepEqual(
    industryServiceCategories.map(({ name }) => name),
    ['加工', '包装', '检测', '仓储', '冷链运输', '船运'],
  )
})

test('每项产业服务具备列表和详情展示所需的完整演示信息', () => {
  assert.equal(industryServices.length, 6)

  for (const service of industryServices) {
    assert.ok(service.id)
    assert.ok(service.name)
    assert.ok(service.provider)
    assert.ok(service.region)
    assert.ok(service.capacity)
    assert.ok(service.pricing)
    assert.ok(service.leadTime)
    assert.ok(service.description)
    assert.ok(service.features.length >= 3)
    assert.equal(findIndustryService(service.id), service)
  }

  assert.equal(findIndustryService('not-found'), null)
})

test('推荐服务卡片统一生成两行四项业务信息', () => {
  assert.equal(typeof industryServiceData.getIndustryServiceCardFacts, 'function')
  assert.deepEqual(
    industryServiceData.getIndustryServiceCardFacts(industryServices[0]),
    [
      { label: '服务地区', value: '山东日照' },
      { label: '服务能力', value: '每日可加工 30 吨' },
      { label: '计价方式', value: '¥1.8/kg 起' },
      { label: '服务周期', value: '确认后 24 小时内排产' },
    ],
  )
})

test('产业服务搜索同时匹配名称、服务商和地区', () => {
  assert.equal(typeof industryServiceData.filterIndustryServices, 'function')
  assert.deepEqual(
    industryServiceData.filterIndustryServices(industryServices, { category: 'all', keyword: '青岛' }).map(({ id }) => id),
    ['cold-packaging', 'coastal-shipping'],
  )
  assert.deepEqual(
    industryServiceData.filterIndustryServices(industryServices, { category: 'inspection', keyword: '' }).map(({ id }) => id),
    ['quality-inspection'],
  )
})
