import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2, ClipboardList, Store } from 'lucide-react'
import '../styles/industry-services.css'

export default function ServiceRequestSuccessPage() {
  const navigate = useNavigate()
  const { state } = useLocation()
  return <main className="industry-success-page page-container">
    <section><CheckCircle2/><span>需求提交成功</span><h1>产业服务需求已提交</h1><p>演示编号：<b>FW20260813001</b></p><div><small>服务项目</small><strong>{state?.serviceName || '产业服务需求'}</strong></div><div><small>意向服务商</small><strong>{state?.provider || '平台认证服务商'}</strong></div><aside>当前为静态演示，服务商不会收到真实需求。</aside><footer><button onClick={() => navigate('/services/orders')}><ClipboardList/>查看订单/需求进度</button><button onClick={() => navigate('/services')}><Store/>继续浏览服务</button></footer></section>
  </main>
}
