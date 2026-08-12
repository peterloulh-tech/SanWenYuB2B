import { Outlet } from 'react-router-dom'
import SiteHeader from '../components/layout/SiteHeader'
import SiteFooter from '../components/layout/SiteFooter'

export default function SiteLayout() {
  return <div className="site-shell flex min-h-screen min-w-[1180px] flex-col bg-[#f8fbff]">
    <SiteHeader />
    <div className="flex-1"><Outlet /></div>
    <SiteFooter />
  </div>
}
