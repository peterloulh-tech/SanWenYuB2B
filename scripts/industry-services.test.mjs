import assert from 'node:assert/strict'
import test from 'node:test'

import { additionalEnterpriseActions } from '../src/data/enterpriseHomeActions.js'
import {
  industryServiceCategories,
  industryServices,
  findIndustryService,
} from '../src/data/industryServices.js'

test('企业首页第二排提供一个产业服务入口和三个待定入口', () => {
  assert.equal(additionalEnterpriseActions.length, 4)
  assert.deepEqual(
    additionalEnterpriseActions.map(({ title, path }) => ({ title, path })),
    [
      { title: '产业服务', path: '/services' },
      { title: '功能待定', path: null },
      { title: '功能待定', path: null },
      { title: '功能待定', path: null },
    ],
  )
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
