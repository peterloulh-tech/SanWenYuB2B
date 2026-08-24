import { CheckCircle2, Lightbulb } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/report-remediation.css'

export default function PatentSuccessPage() {
  const { state } = useLocation()
  return <main className="remediation-page"><div className="page-container remediation-body patent-success"><section><CheckCircle2/><span>静态演示</span><h1>合作意向提交成功</h1><p>演示编号：ZL20260824001</p><dl><div><dt>意向成果</dt><dd>{state?.patentName || '专利技术成果演示方案'}</dd></div><div><dt>合作方式</dt><dd>{state?.cooperationMode || '成果对接'}</dd></div></dl><aside>本次提交不会发送给真实企业、权利人或交易系统。</aside><footer><Link to="/patents"><Lightbulb/>继续浏览成果</Link><Link to="/services">返回产业服务</Link></footer></section></div></main>
}
