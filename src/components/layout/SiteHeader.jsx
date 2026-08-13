import { NavLink, useLocation, useNavigate } from "react-router-dom";
import IdentitySwitcher from "./IdentitySwitcher";

const navs = [
  ["/", "首页"],
  ["/products", "产品大厅"],
  ["/procurement", "采购大厅"],
  ["/market", "市场行情"],
  ["/suppliers", "供应商"],
  ["/services/orders", "交易服务"],
  ["/finance", "供应链金融"],
];

export default function SiteHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <header className="h-[60px] border-b border-slate-100 bg-white">
      <div className="page-container flex h-full items-center justify-between">
        <button
          className="brand-logo"
          aria-label="返回首页"
          onClick={() => navigate("/")}
        />
        <IdentitySwitcher />
        <nav className="flex h-full items-center gap-9 text-[16px] font-bold text-[#00015F]">
          {navs.map(([to, label]) => (
            <NavLink
              end={to === "/"}
              className={({ isActive }) =>
                `relative flex h-full items-center whitespace-nowrap ${isActive ? "active text-[#0051FE]" : ""}`
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
          <button className="btn-outline" onClick={() => navigate("/login")}>
            登录
          </button>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            注册
          </button>
          <NavLink
            className="ml-2 whitespace-nowrap text-[16px] font-bold text-[#00015F]"
            to="/help"
          >
            帮助中心
          </NavLink>
        </div>
      </div>
    </header>
  );
}
