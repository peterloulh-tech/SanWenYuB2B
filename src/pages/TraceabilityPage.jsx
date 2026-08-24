import { useState } from 'react'
import { Database, Search, ShieldCheck } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { findTraceabilityBatch, traceabilityBatches } from '../data/traceability'
import '../styles/report-remediation.css'

const fields = [
  ['批次编号', 'batchCode'], ['产品名称', 'productName'], ['品种', 'species'], ['生产企业', 'producer'], ['养殖地', 'farmLocation'], ['捕捞/收鱼日期', 'harvestDate'], ['质量状态', 'qualityStatus'], ['数据来源', 'dataSource'], ['更新时间', 'updatedAt'],
]

export default function TraceabilityPage() {
  const [searchParams] = useSearchParams()
  const initialCode = searchParams.get('batch') || ''
  const [input, setInput] = useState(initialCode)
  const [submitted, setSubmitted] = useState(Boolean(initialCode))
  const [result, setResult] = useState(() => initialCode ? findTraceabilityBatch(initialCode) : null)

  function queryBatch(code = input) {
    setInput(code)
    setSubmitted(true)
    setResult(findTraceabilityBatch(code))
  }

  return <main className="remediation-page traceability-page">
    <section className="remediation-hero"><div className="page-container"><span>企业交易 · 简单批次查询</span><h1>日照银行批次溯源</h1><p>模拟日照银行接口返回，仅展示已确认的基础批次字段。</p></div></section>
    <div className="page-container remediation-body compact-body">
      <section className="trace-query-panel">
        <div className="demo-notice"><Database/><b>演示数据</b><span>数据来源：日照银行</span><em>正式链接待对接</em></div>
        <form onSubmit={(event) => { event.preventDefault(); queryBatch() }}><label><Search/><input aria-label="批次码" value={input} onChange={(event) => setInput(event.target.value)} placeholder="请输入批次码，例如 RZ-SALMON-202608-001"/></label><button type="submit">查询批次</button></form>
        <div className="trace-samples"><span>快捷体验：</span>{traceabilityBatches.map((batch) => <button type="button" onClick={() => queryBatch(batch.batchCode)} key={batch.batchCode}>{batch.batchCode}</button>)}</div>
      </section>
      {result && <section className="trace-result" aria-live="polite"><header><div><ShieldCheck/><span><b>模拟日照银行接口返回</b><small>演示数据，不作为真实质量或金融背书</small></span></div><em>{result.qualityStatus}</em></header><dl>{fields.map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{result[key]}</dd></div>)}</dl></section>}
      {submitted && !result && <section className="remediation-empty" aria-live="polite"><Search/><h2>未查询到该批次</h2><p>请核对批次码，或点击上方三个样例批次进行体验。</p></section>}
    </div>
  </main>
}
