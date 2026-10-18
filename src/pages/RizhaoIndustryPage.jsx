import { ArrowRight, CalendarDays, Film, MapPinned, ShipWheel } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ContentSectionNav from '../components/content/ContentSectionNav'
import '../styles/report-remediation.css'

export default function RizhaoIndustryPage() {
  const { search } = useLocation()
  const channel = new URLSearchParams(search).get('channel') === 'retail' ? '?channel=retail' : ''
  return <main className="remediation-page content-page">
    <ContentSectionNav/>
    <section className="content-page-hero"><div className="page-container"><span>共享内容中心</span><h1>走进日照三文鱼</h1><p>聚焦日照市情、深远海三文鱼产业、本地发展历程与产业影像。</p></div></section>
    <div className="page-container content-page-body">
      <figure className="rizhao-industry-visual-intro" aria-labelledby="rizhao-industry-visual-title">
        <img src="/assets/rizhao-industry/05-sunrise-city-lounge.png" alt="日照港口与深海三文鱼养殖平台视觉展示" />
        <figcaption id="rizhao-industry-visual-title"><span>日照 · 蓝色粮仓</span><small>向海图强，港产城融合</small></figcaption>
      </figure>
      <section className="content-feature-grid"><article><MapPinned/><h2>日照市情</h2><p>城市区位、海洋资源、港口与产业基础资料待补充。</p><a href="https://www.rizhao.gov.cn/" target="_blank" rel="noreferrer">来源入口：日照市人民政府 · 资料日期待补充</a></article><article><ShipWheel/><h2>日照深海三文鱼产业</h2><p>农业农村部记录显示，国内首艘养殖工船于日照启航，并面向三文鱼等海洋冷水鱼类养殖开展装备探索。</p><a href="https://yyj.moa.gov.cn/gzdt/201904/t20190418_6195802.htm" target="_blank" rel="noreferrer">来源：农业农村部渔业渔政管理局 · 2019-04-18</a></article></section>
      <section className="industry-timeline"><header><CalendarDays/><div><h2>日照三文鱼发展历程</h2><p>仅列可核验节点；其他时间与数据资料待补充。</p></div></header><ol><li><time>2019</time><div><h3>国内首艘养殖工船在山东日照启航</h3><p>用于展示日照深远海养殖装备探索的公开节点。</p></div></li><li><time>资料待补充</time><div><h3>本地产业节点</h3><p>等待政府、协会或企业提供可核验来源与日期。</p></div></li><li><time>2026</time><div><h3>交易平台静态演示建设</h3><p>当前页面为本地 PC 前端静态演示，不代表平台已正式运营。</p></div></li></ol></section>
      <section className="industry-video-section"><header><Film/><div><h2>产业影像</h2><p>精选企业代表视频，并回链企业详情的完整影像区。</p></div></header><div className="video-placeholder"><Film/><h3>视频资料待补充</h3><p>收到企业原始视频后再接入，不使用视频号截图伪造视频。</p><Link to={`/suppliers/wanzefeng-group${channel}`}>查看万泽丰企业影像 <ArrowRight/></Link></div></section>
    </div>
  </main>
}
