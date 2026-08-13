import { ShieldCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function SiteFooter() {
  const isRetail = useLocation().pathname.startsWith('/retail')
  return <footer className="mt-3 bg-white"><div className="page-container flex h-[66px] items-center justify-between text-[13px] text-[#434973]">{!isRetail && <span className="flex items-center gap-2"><ShieldCheck size={23}/> 国企平台　·　安全可靠　·　阳光交易</span>}<div className="flex gap-8"><Link to="/help">关于平台</Link><Link to="/help">服务说明</Link><Link to="/operations">运营后台</Link><Link to="/help">隐私政策</Link></div><span>© 2026 三文鱼数字化交易平台　版权所有</span></div></footer>
}
