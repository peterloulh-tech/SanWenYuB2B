import { BookOpenCheck, Fish, ShieldAlert, Snowflake, Waves } from 'lucide-react'
import ContentSectionNav from '../components/content/ContentSectionNav'
import '../styles/report-remediation.css'

export default function SalmonEncyclopediaPage() {
  return <main className="remediation-page content-page">
    <ContentSectionNav/>
    <section className="content-page-hero"><div className="page-container"><span>共享内容中心</span><h1>三文鱼百科</h1><p>认识三文鱼、了解产业链、查看历史与食品安全提示。</p></div></section>
    <div className="page-container content-page-body encyclopedia-body">
      <section><header><Fish/><div><h2>认识三文鱼</h2><p>页面按“品种、产品形态、产地、适用食用方式”分开理解商品标签。</p></div></header><div className="knowledge-cards"><article><h3>品种</h3><p>大西洋鲑、虹鳟等名称应以真实商品标签和可核验资料为准。</p></article><article><h3>生长环境</h3><p>海水、淡水及深远海养殖条件不同，具体来源以批次资料为准。</p></article><article><h3>产品形态</h3><p>整鱼、鱼柳、切片、烟熏和预制菜具有不同储存与食用要求。</p></article></div></section>
      <section><header><BookOpenCheck/><div><h2>三文鱼历史</h2><p>世界、中国与国产深远海养殖历史资料待权威来源补充。</p></div></header><p className="inline-placeholder">暂不填写未经核验的年份、产量或产业规模。</p></section>
      <section><header><Waves/><div><h2>从深海养殖到餐桌</h2><p>轻量展示常见环节，不代表任何具体商品已完成这些流程。</p></div></header><div className="process-line">{['养殖', '捕捞/收鱼', '加工分装', '冷链运输', '批次查询', '家庭食用'].map((item, index) => <span key={item}><b>{index + 1}</b>{item}</span>)}</div></section>
      <section><header><Snowflake/><div><h2>全国 / 山东 / 日照产业概况</h2><p>可靠统计数据和对比口径尚未提供。</p></div></header><div className="knowledge-cards"><article><h3>全国</h3><p>产业数据待补充。</p></article><article><h3>山东</h3><p>产业数据待补充。</p></article><article><h3>日照</h3><p>产业数据待补充。</p></article></div><a className="source-link" href="https://yyj.moa.gov.cn/scyz/202308/t20230803_6433444.htm" target="_blank" rel="noreferrer">深远海养殖政策来源：农业农村部渔业渔政管理局 · 2023-08-03</a></section>
      <aside className="food-safety-note"><ShieldAlert/><div><h2>生食、保存与冷链安全提示</h2><p>先看商品标签是否明确适合生食；家庭处理水产品时应注意生熟分开、低温保存并避免反复冻融，不适合生食的产品应充分加热。</p><a href="https://www.nhc.gov.cn/sps/c100087/202201/b21f124f4e604e7dbc37e51e367e335a.shtml" target="_blank" rel="noreferrer">来源：国家卫生健康委员会食品安全消费提示 · 2022-01</a></div></aside>
    </div>
  </main>
}
