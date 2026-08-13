import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import IdentitySwitcher from "./IdentitySwitcher";
import { getRetailNavActive } from "../../features/identity/identityPolicy";

const enterpriseNavs = [
  ["/", "首页"],
  ["/products", "产品大厅"],
  ["/procurement", "采购大厅"],
  ["/market", "市场行情"],
  ["/suppliers", "供应商"],
  ["/services", "产业服务"],
  ["/finance", "供应链金融"],
];

const retailNavs = [
  ["/retail", "首页"],
  ["/retail#fresh-salmon", "冰鲜三文鱼"],
  ["/retail#fish-products", "鱼类加工品"],
  ["/retail#other-seafood", "其他海产"],
  ["/retail#seafood-gifts", "海鲜礼盒"],
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isRetail = pathname.startsWith("/retail");
  const navs = isRetail ? retailNavs : enterpriseNavs;
  return (
    <header className={`site-header h-[60px] border-b border-slate-100 bg-white ${isRetail ? "retail-header" : ""}`}>
      <div className="page-container flex h-full items-center justify-between">
        <div className="site-brand-group">
          <button
            className="brand-logo"
            aria-label="返回首页"
            onClick={() => navigate(isRetail ? "/retail" : "/")}
          />
          <IdentitySwitcher />
        </div>
        <nav className="flex h-full items-center gap-9 text-[16px] font-bold text-[#00015F]">
          {navs.map(([to, label]) => (
            <NavLink
              end={to === "/" || to === "/retail"}
              className={({ isActive }) =>
                `relative flex h-full items-center whitespace-nowrap ${(isRetail ? getRetailNavActive(to, pathname) : isActive) ? "active text-[#0051FE]" : ""}`
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
          {!isRetail && <NavLink
            className="ml-2 whitespace-nowrap text-[16px] font-bold text-[#00015F]"
            to="/help"
          >
            帮助中心
          </NavLink>}
        </div>
      </div>
    </header>
  );
}
