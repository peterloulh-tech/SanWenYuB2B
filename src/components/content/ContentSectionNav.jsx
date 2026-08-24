import { NavLink, useLocation } from 'react-router-dom'

const items = [
  ['/rizhao-industry', '日照产业'],
  ['/salmon-encyclopedia', '三文鱼百科'],
  ['/salmon-kitchen', '三文鱼厨房'],
]

export default function ContentSectionNav() {
  const { search } = useLocation()
  const channel = new URLSearchParams(search).get('channel') === 'retail' ? '?channel=retail' : ''
  return <nav className="content-section-nav page-container" aria-label="三文鱼内容栏目">
    {items.map(([path, label]) => <NavLink to={`${path}${channel}`} key={path}>{label}</NavLink>)}
  </nav>
}
