import { ArrowRight, Lightbulb, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { demoPatents, filterPatents, patentCategories } from '../data/patents'
import '../styles/report-remediation.css'

export default function PatentsPage() {
  const [category, setCategory] = useState('all')
  const [input, setInput] = useState('')
  const [keyword, setKeyword] = useState('')
  const patents = useMemo(() => filterPatents(demoPatents, { category, keyword }), [category, keyword])
  return <main className="remediation-page patents-page">
    <section className="remediation-hero"><div className="page-container"><span>企业版 · 产业服务</span><h1>专利技术成果</h1><p>本地静态演示链路，不提供真实估值、竞价、合同、支付或权属变更。</p></div></section>
    <div className="page-container remediation-body">
      <form className="patent-search" onSubmit={(event) => { event.preventDefault(); setKeyword(input); setCategory('all') }}><label><Search/><input aria-label="搜索专利成果" value={input} onChange={(event) => setInput(event.target.value)} placeholder="搜索技术方向、成果名称或适用场景"/></label><button>搜索</button></form>
      <nav className="patent-categories" aria-label="专利技术方向"><button className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>全部</button>{patentCategories.map((item) => <button className={category === item.id ? 'active' : ''} onClick={() => setCategory(item.id)} key={item.id}>{item.name}</button>)}</nav>
      <section className="patent-grid">{patents.map((patent) => <article key={patent.id}><header><span>演示数据</span><em>{patentCategories.find(({ id }) => id === patent.category)?.name}</em></header><Lightbulb/><h2>{patent.name}</h2><p>{patent.summary}</p><dl><div><dt>专利类型</dt><dd>{patent.patentType}</dd></div><div><dt>申请/授权号</dt><dd>资料待补充</dd></div><div><dt>权利人</dt><dd>{patent.ownerLabel}</dd></div><div><dt>状态</dt><dd>{patent.statusLabel}</dd></div></dl><Link to={`/patents/${patent.id}`}>查看详情 <ArrowRight/></Link></article>)}</section>
      {!patents.length && <section className="remediation-empty"><Search/><h2>未找到匹配成果</h2><p>请更换关键词或技术方向。</p></section>}
    </div>
  </main>
}
