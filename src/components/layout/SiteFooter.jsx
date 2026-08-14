import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return <footer className="site-footer bg-white"><div className="page-container flex items-center justify-between text-[13px] text-[#434973]"><div className="flex gap-8"><Link to="/help">关于平台</Link><Link to="/help">帮助中心</Link><Link to="/help">服务说明</Link><Link to="/operations">运营后台</Link><Link to="/help">隐私政策</Link></div><span>© 2026 三文鱼数字化交易平台　版权所有</span></div></footer>
}
