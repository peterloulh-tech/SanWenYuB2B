import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Building2,
  Calculator,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  FileCheck2,
  Landmark,
  Leaf,
  Megaphone,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import "../styles/service-pages.css";

const products = [
  {
    icon: Leaf,
    tone: "green",
    title: "养殖期融资",
    tag: "数据增信",
    sub: "鱼还在海里，钱先到账",
    desc: "以海域监测数据与养殖档案支撑鱼在养生物资产动态估值，配套养殖保险增信，破解养殖周期内的资金空窗。",
    pills: [
      "额度参考  100万~3,000万",
      "最快  7天审批",
      "期限  12~24个月",
      "养殖保险增信",
    ],
    fit: "适用：养殖企业",
  },
  {
    icon: Building2,
    tone: "blue",
    title: "存货质押融资",
    tag: "最受欢迎",
    sub: "鱼在库里，钱先回来",
    desc: "在库批次按评估值质押授信，批次档案佐证货值，合作冷库监管、仓单电子化，出入库联动质押状态。",
    pills: [
      "额度参考  50万~2,000万",
      "最快  3天放款",
      "期限  3~12个月",
      "随卖随赎",
    ],
    fit: "适用：养殖、加工、贸易企业",
  },
  {
    icon: ClipboardList,
    tone: "teal",
    title: "订单融资",
    sub: "订单确认，货款提前到账",
    desc: "凭平台真实订单与历史履约记录提前回款，回款路径封闭，贷款结清自动归还，适配出鱼计划与备货周期。",
    pills: ["按订单金额  70%~90%", "最快  T+1放款", "封闭回款", "结算自动归还"],
    fit: "适用：有在手订单的卖家",
  },
  {
    icon: FileCheck2,
    tone: "orange",
    title: "账期支付（采购授信）",
    sub: "先提货，后付款",
    desc: "认证企业买家在银行授信额度内下单即用，30 / 60天账期，对账单自动生成，按期履约可提升额度。",
    pills: [
      "额度参考  10万~500万",
      "开通即用",
      "账期  30 / 60天",
      "按期履约提额",
    ],
    fit: "适用：认证企业买家",
  },
];

const tools = [
  [Calculator, "额度测算", "测一测您能获得多少额度"],
  [Clock3, "利率参考", "查看各产品利率区间"],
  [ClipboardList, "融资流程", "了解平台融资流程"],
  [FileCheck2, "材料清单", "准备材料更高效"],
];
const banks = [
  "中国农业银行",
  "中国建设银行",
  "交通银行",
  "招商银行",
  "中信银行",
  "兴业银行",
];

export default function FinancePage() {
  const nav = useNavigate();
  return (
    <main className="finance-page">
      <section className="finance-hero">
        <div className="page-container finance-hero-inner">
          <div className="finance-copy">
            <p className="service-crumb">
              首页 <ChevronRight /> 供应链金融
            </p>
            <h1>让银行看得见水里的资产</h1>
            <p>
              基于真实交易、养殖档案、海域监测等产业数据，为养殖、加工、贸易企业
              <br />
              提供全周期供应链金融服务。银行独立审批放款，平台不吸储、不放贷。
            </p>
            <div className="finance-hero-actions">
              <button
                className="primary-large"
                onClick={() => nav("/finance/apply")}
              >
                立即申请融资
              </button>
              <button
                className="secondary-large"
                onClick={() => nav("/finance/apply")}
              >
                测一测能贷多少
              </button>
            </div>
          </div>
          <span className="finance-float monitor">
            <i />
            海域实时监测
          </span>
          <span className="finance-float receipt">
            <i />
            电子仓单&nbsp; 已生成
          </span>
          <span className="finance-float credit">
            <i />
            银行授信&nbsp; T+1 到账
          </span>
          <aside className="finance-notice">
            <h3>
              <Megaphone />
              平台公告{" "}
              <Link to="/help">
                更多 <ChevronRight />
              </Link>
            </h3>
            <p>
              三文鱼数字化交易平台供应链金融服务上线 <time>2024-08-01</time>
            </p>
            <p>
              关于优化养殖期融资产品额度的公告 <time>2024-07-25</time>
            </p>
          </aside>
          <div className="finance-stats">
            {[
              [Banknote, "¥2.6", "亿", "累计对接融资"],
              [Building2, "60+", "家", "服务产业企业"],
              [ShieldCheck, "6", "家", "合作金融机构"],
              [Check, "T+1", "", "最快放款时效"],
            ].map(([Icon, val, unit, text]) => (
              <div key={text}>
                <span>
                  <Icon />
                </span>
                <p>
                  <strong>{val}</strong>
                  <b>{unit}</b>
                  <small>{text}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-container finance-body">
        <div className="finance-main">
          <header className="service-section-title">
            <h2>
              <i />
              融资产品
            </h2>
            <p>按企业经营周期设计，利率与额度以合作银行审批为准</p>
          </header>
          <div className="finance-product-grid">
            {products.map(({ icon: Icon, ...item }) => (
              <article className="finance-product-card" key={item.title}>
                <header>
                  <span className={`finance-product-icon ${item.tone}`}>
                    <Icon />
                  </span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.sub}</p>
                  </div>
                  {item.tag && <em>{item.tag}</em>}
                </header>
                <p className="finance-desc">{item.desc}</p>
                <div className="finance-pills">
                  {item.pills.map((x) => (
                    <span key={x}>{x}</span>
                  ))}
                </div>
                <footer>
                  <small>{item.fit}</small>
                  <button onClick={() => nav("/finance/apply")}>
                    {item.title.includes("账期") ? "开通额度" : "申请融资"}{" "}
                    <ArrowRight />
                  </button>
                </footer>
              </article>
            ))}
          </div>
          <Link className="finance-more" to="/finance/apply">
            查看全部产品 <ArrowRight />
          </Link>
          <div className="finance-benefits">
            {[
              [Landmark, "银行独立审批放款", "平台不吸储、不放贷"],
              [ShieldCheck, "数据加密授权", "保障企业数据安全"],
              [FileCheck2, "全流程线上化", "申请、签约、放款全线上"],
              [WalletCards, "资金流向可追溯", "每笔资金用途透明"],
            ].map(([I, t, s]) => (
              <div key={t}>
                <I />
                <p>
                  <b>{t}</b>
                  <small>{s}</small>
                </p>
              </div>
            ))}
          </div>
        </div>
        <aside className="finance-side">
          <section>
            <h2>金融工具</h2>
            {tools.map(([Icon, t, s]) => (
              <button key={t} onClick={() => nav("/finance/apply")}>
                <Icon />
                <p>
                  <b>{t}</b>
                  <small>{s}</small>
                </p>
                <ChevronRight />
              </button>
            ))}
          </section>
          <section className="bank-panel">
            <h2>
              合作金融机构{" "}
              <span>
                更多 <ChevronRight />
              </span>
            </h2>
            <div>
              {banks.map((bank, i) => (
                <span key={bank}>
                  <Landmark className={`bank-${i}`} />
                  <b>{bank}</b>
                </span>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
