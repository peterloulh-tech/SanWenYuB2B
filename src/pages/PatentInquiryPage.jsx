import { ArrowLeft, Send } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cooperationModes, findPatent, validatePatentInquiry } from '../data/patents'
import '../styles/report-remediation.css'

export default function PatentInquiryPage() {
  const { id } = useParams(); const navigate = useNavigate(); const patent = findPatent(id)
  const [values, setValues] = useState({ contactName: '', company: '', phone: '', cooperationMode: '', intention: '' })
  const [errors, setErrors] = useState({})
  if (!patent) return <main className="remediation-page"><div className="page-container remediation-empty"><h1>未找到该成果</h1><Link to="/patents">返回专利成果列表</Link></div></main>
  function update(field, value) { setValues((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  function submit(event) { event.preventDefault(); const nextErrors = validatePatentInquiry(values); setErrors(nextErrors); if (!Object.keys(nextErrors).length) navigate('/patents/request/success', { state: { patentName: patent.name, cooperationMode: values.cooperationMode } }) }
  return <main className="remediation-page"><div className="page-container remediation-body patent-inquiry"><Link className="remediation-back" to={`/patents/${patent.id}`}><ArrowLeft/>返回成果详情</Link><section><header><span>静态演示表单</span><h1>提交合作意向</h1><p>{patent.name}</p></header><form onSubmit={submit}>{[['contactName', '联系人', '请输入联系人'], ['company', '单位名称（选填）', '请输入单位名称'], ['phone', '联系电话', '请输入手机或座机号码']].map(([field, label, placeholder]) => <label key={field}><span>{label}</span><input value={values[field]} onChange={(event) => update(field, event.target.value)} placeholder={placeholder}/>{errors[field]&&<small>{errors[field]}</small>}</label>)}<label><span>合作方式</span><select value={values.cooperationMode} onChange={(event) => update('cooperationMode', event.target.value)}><option value="">请选择</option>{cooperationModes.map((mode) => <option key={mode}>{mode}</option>)}</select>{errors.cooperationMode&&<small>{errors.cooperationMode}</small>}</label><label className="wide"><span>合作需求</span><textarea value={values.intention} onChange={(event) => update('intention', event.target.value)} placeholder="请简要说明适用场景、合作目标或希望进一步了解的内容"/>{errors.intention&&<small>{errors.intention}</small>}</label><aside>提交只进入本地演示成功页，不会发送给真实企业或权利人。</aside><button type="submit"><Send/>提交合作意向</button></form></section></div></main>
}
