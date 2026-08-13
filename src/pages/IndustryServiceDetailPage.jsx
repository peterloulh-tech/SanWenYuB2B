import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, CheckCircle2, Clock3, Headphones, MapPin, Send, ShieldCheck } from 'lucide-react'
import { findIndustryService, industryServiceCategories } from '../data/industryServices'
import '../styles/industry-services.css'

export default function IndustryServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const service = findIndustryService(id)

  useEffect(() => {
    if (window.location.hash === '#request') document.getElementById('request')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [id])

  if (!service) return <main className="page-container industry-not-found"><h1>未找到该产业服务</h1><button onClick={() => navigate('/services')}>返回产业服务大厅</button></main>

  const category = industryServiceCategories.find((item) => item.id === service.category)?.name
  function submitRequest(event) {
    event.preventDefault()
    navigate('/services/request/success', { state: { serviceName: service.name, provider: service.provider } })
  }

  return <main className="industry-detail-page">
    <div className="page-container industry-detail-body">
      <button className="industry-back" onClick={() => navigate('/services')}><ArrowLeft/>返回产业服务大厅</button>
      <section className="industry-detail-card">
        <div className="industry-detail-main">
          <header><span>{category}</span><em><BadgeCheck/>平台认证服务商</em></header>
          <h1>{service.name}</h1><p className="industry-detail-provider">{service.provider}</p><p className="industry-detail-description">{service.description}</p>
          <div className="industry-detail-metrics"><div><MapPin/><span>服务地区</span><b>{service.region}</b></div><div><ShieldCheck/><span>承接能力</span><b>{service.capacity}</b></div><div><Clock3/><span>服务周期</span><b>{service.leadTime}</b></div></div>
          <section className="industry-detail-features"><h2>服务保障</h2>{service.features.map((feature) => <p key={feature}><CheckCircle2/>{feature}</p>)}</section>
        </div>

        <form id="request" className="industry-request-form" onSubmit={submitRequest}>
          <h2>提交服务需求</h2><p>填写关键信息，服务商将联系您确认详情。</p>
          <label><span>需求数量</span><input name="amount" required placeholder="例如：20吨 / 5000箱"/></label>
          <label><span>交付地区</span><input name="region" required placeholder="例如：山东省日照市"/></label>
          <label><span>期望时间</span><input name="date" required type="date"/></label>
          <aside><span>参考计价</span><strong>{service.pricing}</strong><small>最终价格以双方确认结果为准</small></aside>
          <button type="submit"><Send/>提交服务需求</button>
          <button type="button" className="industry-contact" onClick={() => window.alert('演示页面：服务商联系方式将在正式接入后展示')}><Headphones/>联系服务商</button>
          <small>当前为静态演示，不会产生真实订单或费用。</small>
        </form>
      </section>
    </div>
  </main>
}
