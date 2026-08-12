import { BadgeCheck, Building2, MapPin, Search } from 'lucide-react'
import PageHero from '../components/ui/PageHero'
import { suppliers } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

export default function SuppliersPage(){const nav=useNavigate();return <><PageHero eyebrow="" title="优质供应商" description="严选认证企业，连接稳定可靠的三文鱼货源"/><main className="page-container py-5"><div className="filter-card"><div className="list-search"><Search/><input placeholder="搜索供应商名称、地区或主营产品"/><button>搜索</button></div></div><section className="mt-4 grid grid-cols-3 gap-4">{suppliers.map((s,i)=><article className="supplier-card" key={s}><div className={`supplier-logo s${i%4}`}><Building2/></div><div><h2>{s}</h2><p><BadgeCheck/>平台认证供应商</p><span><MapPin/>山东省 · {['日照','威海','青岛','大连','日照','烟台'][i]}</span></div><div className="col-span-2 mt-4 border-t pt-4"><b>主营产品</b><p>冰鲜整鱼、冷冻整鱼、三文鱼柳、精加工切片</p><button className="btn-outline mt-4" onClick={()=>nav(`/suppliers/${i+1}`)}>查看企业主页</button></div></article>)}</section></main></>}
