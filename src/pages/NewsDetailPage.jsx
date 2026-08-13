import { ArrowLeft, FileSearch, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { findNewsItem, getNewsItemDetail } from '../data/newsCenter'
import '../styles/news-center.css'

export default function NewsDetailPage() {
  const { id } = useParams()
  const item = findNewsItem(id)
  const detail = getNewsItemDetail(item)

  if (!item) return <main className="news-detail-page page-container">
    <section className="news-detail-empty">
      <span><FileSearch /></span>
      <h1>资讯内容尚未引入</h1>
      <p>本页已预留标题、发布单位、日期、政策文号、摘要和原文链接结构。</p>
      <div><ShieldCheck />只会展示已核验来源的真实资料</div>
      <Link to="/news"><ArrowLeft />返回资讯中心</Link>
    </section>
  </main>

  return <main className="news-detail-page page-container">
    <article className="news-detail-article">
      <Link to="/news"><ArrowLeft />返回资讯中心</Link>
      <h1>{detail.title}</h1>
      <dl>
        <div><dt>发布单位</dt><dd>{detail.publisher}</dd></div>
        <div><dt>发布日期</dt><dd>{detail.publishedAt}</dd></div>
        {detail.documentNumber && <div><dt>政策文号</dt><dd>{detail.documentNumber}</dd></div>}
      </dl>
      <section><h2>内容摘要</h2><p>{detail.summary}</p></section>
      <a href={detail.sourceUrl} rel="noreferrer" target="_blank">查看原文来源</a>
    </article>
  </main>
}
