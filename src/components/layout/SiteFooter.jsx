import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return <footer className="site-footer bg-white"><div className="page-container footer-main"><div className="footer-links"><Link to="/help">关于平台</Link><Link to="/help">帮助中心</Link><Link to="/help">服务说明</Link><Link to="/operations">运营后台</Link><Link to="/help">隐私政策</Link></div><div className="footer-subjects"><span>平台承担主体：</span><Link to="/suppliers/wanzefeng-group">万泽丰集团</Link><Link to="/suppliers/xufeng-fishery">旭丰渔业</Link><Link to="/suppliers/rizhao-salmon-association">日照深海三文鱼产业协会</Link></div><span>© 2026 日照三文鱼交易平台</span></div></footer>
}
