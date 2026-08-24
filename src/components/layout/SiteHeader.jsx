import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Monitor, ShoppingCart } from "lucide-react";
import IdentitySwitcher from "./IdentitySwitcher";
import { getRetailNavActive } from "../../features/identity/identityPolicy";

const enterpriseNavs = [
  ["/", "首页"],
  ["/rizhao-industry", "日照产业"],
  ["/products", "产品大厅"],
  ["/procurement", "采购大厅"],
  ["/market", "市场行情"],
  ["/suppliers", "供应商"],
  ["/services", "产业服务"],
  ["/finance", "供应链金融"],
];

const retailNavs = [
  ["/retail", "首页"],
  ["/rizhao-industry?channel=retail", "日照产业"],
  ["/retail#fresh-salmon", "冰鲜三文鱼"],
  ["/retail#salmon-products", "三文鱼加工品"],
  ["/retail#salmon-meals", "三文鱼预制菜"],
  ["/retail#salmon-gifts", "三文鱼礼盒"],
  // 按今日整改要求暂不上线，可恢复：其他海产与海鲜礼盒旧导航。
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const isRetail = pathname.startsWith("/retail") || new URLSearchParams(search).get('channel') === 'retail';
  const navs = isRetail ? retailNavs : enterpriseNavs;
  return (
    <header className={`site-header h-[60px] border-b border-slate-100 bg-white ${isRetail ? "retail-header" : ""}`}>
      <div className="page-container flex h-full items-center justify-between">
        <div className="site-brand-group">
          <button
            className="brand-logo"
            aria-label={`日照三文鱼交易平台，返回${isRetail ? '个人消费' : '企业交易'}首页`}
            onClick={() => navigate(isRetail ? "/retail" : "/")}
          >
            <img src="/assets/brand/rizhao-salmon-festival-mark-registered-2k-transparent.png" alt="日照三文鱼交易平台 Logo" />
            <span>日照三文鱼交易平台</span>
          </button>
          <IdentitySwitcher />
        </div>
        <nav className="flex h-full items-center gap-9 text-[16px] font-bold text-[#00015F]">
          {navs.map(([to, label]) => (
            <NavLink
              end={to === "/" || to === "/retail"}
              className={({ isActive }) =>
                `relative flex h-full items-center whitespace-nowrap ${(pathname === '/rizhao-industry' && to.startsWith('/rizhao-industry')) || (isRetail ? getRetailNavActive(to, pathname) : isActive) ? "active text-[#0051FE]" : ""}`
              }
              key={to}
              to={to}
            >
              {label}
              {label === "供应链金融" && pathname === "/" && (
                <b className="nav-new">新</b>
              )}
              <i className="nav-active-line" />
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {isRetail && <button className="retail-cart-link" type="button" onClick={() => navigate("/retail/cart")}>
            <ShoppingCart />购物车
          </button>}
          <button className="btn-outline" onClick={() => navigate("/login")}>
            登录
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            注册
          </button>
          {!isRetail && <button
            className="btn-outline flex items-center gap-1.5 whitespace-nowrap"
            type="button"
            onClick={() => navigate("/data-screen")}
          >
            <Monitor className="h-4 w-4" />运营大屏
          </button>}
        </div>
      </div>
    </header>
  );
}
