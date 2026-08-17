import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, ChevronRight, ClipboardCheck, RotateCcw, Send, Store } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import LinkedSelect from '../components/ui/LinkedSelect'
import { buildProcurementCategoryPath, getProcurementCategoryLevels, isProcurementCategoryComplete } from '../data/procurementCategories'
import { emptyProcurementRequest, getLocalDateInputValue, validateProcurementRequest } from '../features/procurement/procurementPublish'
import '../styles/procurement-publish.css'

const fieldOrder = ['category', 'details', 'quantity', 'city', 'deadline', 'phone', 'email']

function RequiredMark() {
  return <em aria-hidden="true">*</em>
}

export default function ProcurementPublishPage() {
  const navigate = useNavigate()
  const [request, setRequest] = useState(emptyProcurementRequest)
  const [categorySelection, setCategorySelection] = useState([])
  const [openCategoryLevel, setOpenCategoryLevel] = useState(null)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const categorySelectorRef = useRef(null)
  const today = getLocalDateInputValue()
  const categoryLevels = getProcurementCategoryLevels(categorySelection)
  const categoryPath = buildProcurementCategoryPath(categorySelection)
  const categoryComplete = isProcurementCategoryComplete(categorySelection)

  useEffect(() => {
    if (openCategoryLevel === null) return undefined
    const closeMenu = (event) => {
      if (!categorySelectorRef.current?.contains(event.target)) setOpenCategoryLevel(null)
    }
    document.addEventListener('pointerdown', closeMenu)
    return () => document.removeEventListener('pointerdown', closeMenu)
  }, [openCategoryLevel])

  const updateField = (field, value) => {
    setRequest((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const selectCategory = (index, value) => {
    setCategorySelection((current) => [...current.slice(0, index), value])
    setErrors((current) => ({ ...current, category: undefined }))
    setOpenCategoryLevel(null)
  }

  const submitRequest = (event) => {
    event.preventDefault()
    const nextErrors = validateProcurementRequest({ ...request, category: categoryComplete ? categoryPath : '' }, today)
    setErrors(nextErrors)
    const firstInvalidField = fieldOrder.find((field) => nextErrors[field])
    if (firstInvalidField) {
      const targetId = firstInvalidField === 'category' ? `procurement-category-${categoryLevels.length - 1}` : `procurement-${firstInvalidField}`
      window.requestAnimationFrame(() => document.getElementById(targetId)?.focus())
      return
    }
    setSubmitted(true)
  }

  const resetForm = () => {
    setRequest(emptyProcurementRequest)
    setCategorySelection([])
    setOpenCategoryLevel(null)
    setErrors({})
    setSubmitted(false)
  }

  return <>
    <PageHero title="发布采购需求" description="填写需求后等待认证供应商报价" />
    <main className="page-container procurement-publish-main">
      {submitted ? <section className="procurement-success" aria-live="polite">
        <CheckCircle2 />
        <span>需求已提交（演示）</span>
        <h1>采购需求已完成前端提交</h1>
        <p>本次操作不会保存联系信息，也不会创建真实采购单或通知供应商。</p>
        <dl><div><dt>采购品类</dt><dd>{categoryPath}</dd></div><div><dt>需求数量</dt><dd>{request.quantity}</dd></div><div><dt>交付城市</dt><dd>{request.city}</dd></div><div><dt>截止日期</dt><dd>{request.deadline}</dd></div></dl>
        <div className="procurement-success-details"><strong>具体采购需求</strong><p>{request.details}</p></div>
        <footer><button type="button" onClick={() => navigate('/procurement')}><Store />返回采购大厅</button><button type="button" className="secondary" onClick={resetForm}><RotateCcw />继续发布</button></footer>
      </section> : <form className="procurement-publish-card" onSubmit={submitRequest} noValidate>
        <header>
          <span className="procurement-publish-icon"><ClipboardCheck /></span>
          <div><h2>发布采购需求</h2><p>请选择具体品类并填写采购与联系信息</p></div>
          <em className="procurement-demo-badge">静态演示</em>
        </header>

        <div className="procurement-form-grid">
          <div className={`procurement-category-block ${errors.category ? 'has-error' : ''}`} ref={categorySelectorRef}>
            <span className="procurement-category-heading">采购品类 <RequiredMark /></span>
            <div className="linked-category-row">
              {categoryLevels.map((level, index) => <div className="linked-category-step" key={`${index}-${level.label}`}>
                {index > 0 && <span className="linked-category-arrow" aria-hidden="true"><ChevronRight /></span>}
                <LinkedSelect id={`procurement-category-${index}`} label={level.label} options={level.options} value={categorySelection[index]} open={openCategoryLevel === index} onToggle={(force) => setOpenCategoryLevel(force === false ? null : openCategoryLevel === index ? null : index)} onSelect={(value) => selectCategory(index, value)} />
              </div>)}
            </div>
            <small id="procurement-category-error" role={errors.category ? 'alert' : undefined}>{errors.category || ''}</small>
          </div>

          <label className={`procurement-field procurement-details ${errors.details ? 'has-error' : ''}`} htmlFor="procurement-details">
            <span>具体采购需求 <RequiredMark /></span><textarea id="procurement-details" value={request.details} onChange={(event) => updateField('details', event.target.value)} placeholder="请填写规格、等级、包装、交付批次等具体要求" rows="2" aria-invalid={Boolean(errors.details)} aria-describedby="procurement-details-error" /><small id="procurement-details-error" role={errors.details ? 'alert' : undefined}>{errors.details || ''}</small>
          </label>

          <label className={`procurement-field ${errors.quantity ? 'has-error' : ''}`} htmlFor="procurement-quantity">
            <span>需求数量 <RequiredMark /></span><input id="procurement-quantity" value={request.quantity} onChange={(event) => updateField('quantity', event.target.value)} placeholder="例如：20 吨 / 50,000 枚" aria-invalid={Boolean(errors.quantity)} aria-describedby="procurement-quantity-error" /><small id="procurement-quantity-error" role={errors.quantity ? 'alert' : undefined}>{errors.quantity || ''}</small>
          </label>
          <label className={`procurement-field ${errors.city ? 'has-error' : ''}`} htmlFor="procurement-city">
            <span>交付城市 <RequiredMark /></span><input id="procurement-city" value={request.city} onChange={(event) => updateField('city', event.target.value)} placeholder="例如：山东省日照市" aria-invalid={Boolean(errors.city)} aria-describedby="procurement-city-error" /><small id="procurement-city-error" role={errors.city ? 'alert' : undefined}>{errors.city || ''}</small>
          </label>
          <label className={`procurement-field ${errors.deadline ? 'has-error' : ''}`} htmlFor="procurement-deadline">
            <span>截止日期 <RequiredMark /></span><input id="procurement-deadline" type="date" min={today} value={request.deadline} onChange={(event) => updateField('deadline', event.target.value)} aria-invalid={Boolean(errors.deadline)} aria-describedby="procurement-deadline-error" /><small id="procurement-deadline-error" role={errors.deadline ? 'alert' : undefined}>{errors.deadline || ''}</small>
          </label>
          <label className={`procurement-field contact ${errors.phone ? 'has-error' : ''}`} htmlFor="procurement-phone">
            <span>联系电话 <RequiredMark /></span><input id="procurement-phone" type="tel" value={request.phone} onChange={(event) => updateField('phone', event.target.value)} placeholder="手机或座机号码" aria-invalid={Boolean(errors.phone)} aria-describedby="procurement-phone-error" /><small id="procurement-phone-error" role={errors.phone ? 'alert' : undefined}>{errors.phone || ''}</small>
          </label>
          <label className={`procurement-field contact ${errors.email ? 'has-error' : ''}`} htmlFor="procurement-email">
            <span>联系邮箱 <b>选填</b></span><input id="procurement-email" type="email" value={request.email} onChange={(event) => updateField('email', event.target.value)} placeholder="例如：buyer@example.com" aria-invalid={Boolean(errors.email)} aria-describedby="procurement-email-error" /><small id="procurement-email-error" role={errors.email ? 'alert' : undefined}>{errors.email || ''}</small>
          </label>
        </div>

        <footer><p>当前为静态演示，联系信息不会保存，不会创建真实采购单。</p><button type="submit"><Send />发布需求</button></footer>
      </form>}
    </main>
  </>
}
