import { useState } from 'react'
import { ChevronLeft, ChevronRight, FileSearch } from 'lucide-react'
import { Link } from 'react-router-dom'
import { newsCategories, paginateNewsItems } from '../data/newsCenter'
import '../styles/news-center.css'

export default function NewsCenterPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const pageData = paginateNewsItems(activeCategory, currentPage, 6)
  const activeName = newsCategories.find(category => category.id === activeCategory)?.name ?? '综合'
  const changeCategory = categoryId => {
    setActiveCategory(categoryId)
    setCurrentPage(1)
  }

  return <main className="news-center-page">
    <section className="news-center-hero">
      <div className="page-container news-center-hero-inner">
        <div><p className="news-breadcrumb"><Link to="/">首页</Link><ChevronRight />新闻政策</p><h1>新闻政策与产业动态</h1><p>汇集权威资料，为企业经营决策提供清晰参考</p></div>
        <nav className="news-category-tabs" aria-label="资讯分类">
          {newsCategories.map(category => <button
            aria-pressed={activeCategory === category.id}
            className={activeCategory === category.id ? 'active' : ''}
            key={category.id}
            onClick={() => changeCategory(category.id)}
            type="button"
          >{category.name}</button>)}
        </nav>
      </div>
    </section>

    <section className="page-container news-center-content">
      <section className="news-list-shell">
        <header>
          <div><h2>{activeName}</h2>{pageData.totalItems > 0 && <span>真实来源</span>}</div>
          <p>{pageData.totalItems > 0 ? `共 ${pageData.totalItems} 篇 · 第 ${pageData.page}/${pageData.totalPages} 页` : '暂无已收录内容'}</p>
        </header>
        {pageData.items.length > 0 ? <>
          <div className="news-card-list">
          {pageData.items.map(item => <article key={item.id}>
            <div className="news-card-type"><span>{item.contentType}</span><small>{item.publishedAt}</small></div>
            <h3>{item.title}</h3>
            <small>{item.sourcePlatform} · {item.publisher}</small>
            <p>{item.summary}</p>
            <footer>
              <div>{item.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
              <Link to={`/news/${item.id}`}>查看详情 <ChevronRight /></Link>
            </footer>
          </article>)}
          </div>
          <nav className="news-pagination" aria-label="资讯分页">
            <button disabled={pageData.page === 1} onClick={() => setCurrentPage(pageData.page - 1)} type="button"><ChevronLeft />上一页</button>
            <div>{Array.from({ length: pageData.totalPages }, (_, index) => index + 1).map(page => <button
              aria-current={pageData.page === page ? 'page' : undefined}
              className={pageData.page === page ? 'active' : ''}
              key={page}
              onClick={() => setCurrentPage(page)}
              type="button"
            >{page}</button>)}</div>
            <button disabled={pageData.page === pageData.totalPages} onClick={() => setCurrentPage(pageData.page + 1)} type="button">下一页<ChevronRight /></button>
          </nav>
        </> : <div className="news-empty-state">
          <span><FileSearch /></span>
          <div><h2>暂无{activeName}内容</h2><p>当前不展示占位文章或虚构动态。<br />完成资料抓取与来源核验后，将在此更新内容。</p></div>
        </div>}
      </section>
    </section>
  </main>
}
