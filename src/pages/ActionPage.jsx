import { useNavigate, useParams } from 'react-router-dom'
import { BadgeCheck, Building2, ClipboardCheck, KeyRound, UserPlus } from 'lucide-react'
import PageHero from '../components/ui/PageHero'

const config = {
  login: ['用户登录','登录后管理采购、报价和订单',KeyRound,['手机号','登录密码'],'登录'],
  register: ['企业用户注册','完成注册后提交企业认证',UserPlus,['企业名称','联系人','手机号'],'提交注册'],
  publish: ['发布采购需求','填写需求后等待认证供应商报价',ClipboardCheck,['采购品类','需求数量','交付城市','截止日期'],'发布需求'],
  quote: ['提交供应报价','根据采购需求填写价格和履约信息',BadgeCheck,['报价单价','可供数量','交付日期','补充说明'],'提交报价'],
  order: ['订单详情','查看交易信息与履约进度',ClipboardCheck,[], '返回订单中心'],
  supplier: ['供应商企业主页','平台认证供应商信息',Building2,[], '返回供应商列表'],
  finance: ['申请供应链金融','基于平台真实交易数据提交融资意向',BadgeCheck,['申请额度','融资产品','联系人','联系电话'],'提交申请'],
}

export default function ActionPage({type}){const nav=useNavigate();const {id}=useParams();const [title,desc,Icon,fields,button]=config[type];const back=type==='order'?'/services/orders':type==='supplier'?'/suppliers':'/';return <><PageHero title={title} description={desc}/><main className="page-container py-8"><section className="action-form"><Icon size={42}/><h2>{title}{id&&<small>　编号：{id}</small>}</h2>{fields.length?<div className="grid grid-cols-2 gap-4">{fields.map(f=><label key={f}><span>{f}</span><input placeholder={`请输入${f}`}/></label>)}</div>:<div className="demo-detail"><p>当前为前端演示流程，真实业务数据将在后端 API 接入后展示。</p><p>页面路由和返回链路已经打通。</p></div>}<button className="btn-primary mt-6" onClick={()=>nav(back)}>{button}</button></section></main></>}
