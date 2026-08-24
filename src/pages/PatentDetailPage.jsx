import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { findPatent, patentCategories } from '../data/patents'
import '../styles/report-remediation.css'

export default function PatentDetailPage() {
  const { id } = useParams()
  const patent = findPatent(id)
  if (!patent) return <main className="remediation-page"><div className="page-container remediation-empty"><Lightbulb/><h1>未找到该成果</h1><Link to="/patents">返回专利成果列表</Link></div></main>
  const category = patentCategories.find((item) => item.id === patent.category)?.name
  return <main className="remediation-page"><div className="page-container remediation-body patent-detail"><Link className="remediation-back" to="/patents"><ArrowLeft/>返回专利成果列表</Link><section><header><div><span>演示数据</span><em>{category}</em></div><h1>{patent.name}</h1><p>{patent.summary}</p></header><dl>{[['专利类型', patent.patentType], ['申请号或授权号', '资料待补充'], ['当前状态', patent.statusLabel], ['权利人', patent.ownerLabel], ['适用场景', patent.scenarios], ['合作方式', patent.cooperationModes.join('、')]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><aside>本成果为演示数据，不伪造真实申请号、授权号、权利人或法律状态。</aside><Link className="primary-link" to={`/patents/${patent.id}/inquiry`}>提交合作意向 <ArrowRight/></Link></section></div></main>
}
