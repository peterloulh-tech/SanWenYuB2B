export const traceabilityBatches = [
  {
    batchCode: 'RZ-SALMON-202608-001',
    productName: '日照深海三文鱼整鱼',
    species: '大西洋鲑',
    producer: '山东万泽丰海洋开发集团有限公司',
    farmLocation: '山东日照深远海养殖区（演示）',
    harvestDate: '2026-08-18',
    qualityStatus: '演示合格',
    dataSource: '日照银行',
    updatedAt: '2026-08-20 10:30',
  },
  {
    batchCode: 'RZ-SALMON-202608-002',
    productName: '日照深海三文鱼鱼柳',
    species: '大西洋鲑',
    producer: '山东万泽丰海洋开发集团有限公司',
    farmLocation: '山东日照深远海养殖区（演示）',
    harvestDate: '2026-08-19',
    qualityStatus: '演示合格',
    dataSource: '日照银行',
    updatedAt: '2026-08-21 09:15',
  },
  {
    batchCode: 'RZ-SALMON-202608-003',
    productName: '日照深海三文鱼切片',
    species: '大西洋鲑',
    producer: '山东万泽丰海洋开发集团有限公司',
    farmLocation: '山东日照深远海养殖区（演示）',
    harvestDate: '2026-08-20',
    qualityStatus: '演示合格',
    dataSource: '日照银行',
    updatedAt: '2026-08-22 14:20',
  },
]

export function findTraceabilityBatch(batchCode) {
  const normalizedCode = String(batchCode || '').trim().toUpperCase()
  return traceabilityBatches.find((batch) => batch.batchCode === normalizedCode) ?? null
}
