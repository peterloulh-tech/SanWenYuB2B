export const newsCategories = [
  { id: 'all', name: '综合' },
  { id: 'national-policy', name: '国家政策' },
  { id: 'current-affairs', name: '时事新闻' },
]

// 真实资讯将在完成来源核验后单独引入，当前不放置演示文章。
export const newsItems = []

export const filterNewsItems = (category = 'all') => (
  category === 'all' ? newsItems : newsItems.filter(item => item.category === category)
)

export const findNewsItem = id => newsItems.find(item => item.id === id) ?? null

export const getNewsItemDetail = item => item ? ({
  title: item.title,
  publisher: item.publisher,
  publishedAt: item.publishedAt,
  documentNumber: item.documentNumber,
  summary: item.summary,
  sourceUrl: item.sourceUrl,
}) : null
