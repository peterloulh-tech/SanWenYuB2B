import {
  BarChart3, Building2, ClipboardList, Fish, LayoutDashboard,
  LogOut, Settings, ShoppingBag, Truck, Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const items = [
  [LayoutDashboard, '工作台'],
  [Building2, '企业管理'],
  [ShoppingBag, '商品管理'],
  [ClipboardList, '采购需求'],
  [Fish, '交易订单'],
  [Truck, '物流与质量'],
  [BarChart3, '行情与内容'],
  [Settings, '系统管理'],
]

export default function AdminSidebar() {
  return <aside className="ops-sidebar">
    <nav>{items.map(([Icon, label], index) => <button type="button" className={index === 0 ? 'active' : ''} key={label}><Icon />{label}</button>)}</nav>
    <Link className="ops-logout" to="/"><LogOut />退出登录</Link>
  </aside>
}
