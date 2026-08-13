import { useState } from 'react'
import { CalendarClock, ChevronRight, FileSearch, Newspaper, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { filterNewsItems, newsCategories } from '../data/newsCenter'
import '../styles/news-center.css'

export default function NewsCenterPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const items = filterNewsItems(activeCategory)
  const activeName = newsCategories.find(category => category.id === activeCategory)?.name ?? '综合'

  return <main className="news-center-page">
    <section className="news-center-hero">
      <div className="page-container">
        <p className="news-breadcrumb"><Link to="/">首页</Link><ChevronRight />新闻政策</p>
        <div>
          <span className="news-hero-icon"><Newspaper /></span>
          <div><h1>新闻政策与产业动态</h1><p>汇集权威资料，为企业经营决策提供清晰参考</p></div>
        </div>
        <aside><ShieldCheck />后续引入的新闻与政策将逐条标注发布单位、日期和原文链接</aside>
      </div>
    </section>

    <section className="page-container news-center-content">
      <nav className="news-category-tabs" aria-label="资讯分类">
        {newsCategories.map(category => <button
          aria-pressed={activeCategory === category.id}
          className={activeCategory === category.id ? 'active' : ''}
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          type="button"
        >{category.name}</button>)}
      </nav>

      <section className="news-list-shell">
        <header>
          <div><h2>{activeName}</h2><p>资料录入后将在此按时间展示</p></div>
          <span><CalendarClock />内容待更新</span>
        </header>
        {items.length > 0 ? <div className="news-card-list">
          {items.map(item => <article key={item.id}>
            <h3>{item.title}</h3>
            <small>{item.publisher} · {item.publishedAt}</small>
            <p>{item.summary}</p>
            <Link to={`/news/${item.id}`}>查看详情 <ChevronRight /></Link>
          </article>)}
        </div> : <div className="news-empty-state">
          <span><FileSearch /></span>
          <h2>真实资讯待引入</h2>
          <p>当前不展示占位文章或虚构动态。<br />完成资料抓取与来源核验后，将在此显示真实内容。</p>
          <Link to="/">返回企业首页</Link>
        </div>}
      </section>
    </section>
  </main>
}
