import { ArrowRight, ChefHat, Clock3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ContentSectionNav from '../components/content/ContentSectionNav'
import { salmonRecipes } from '../data/salmonKitchen'
import '../styles/report-remediation.css'

export default function SalmonKitchenPage() {
  const { search } = useLocation()
  const channel = new URLSearchParams(search).get('channel') === 'retail' ? '?channel=retail' : ''
  return <main className="remediation-page content-page">
    <ContentSectionNav/>
    <section className="content-page-hero"><div className="page-container"><span>简单 · 方便 · 快捷</span><h1>三文鱼厨房</h1><p>六道家庭静态演示菜品，提供食材、步骤、安全提示与商品入口。</p></div></section>
    <div className="page-container content-page-body"><section className="kitchen-grid">{salmonRecipes.map((recipe) => <article key={recipe.id}><img src={recipe.image} alt={recipe.name}/><div><span>演示菜品</span><h2>{recipe.name}</h2><p><Clock3/>{recipe.time}<b>{recipe.difficulty}</b></p><small>适用产品：{recipe.product}</small><Link to={`/salmon-kitchen/${recipe.id}${channel}`}>查看做法 <ArrowRight/></Link></div></article>)}</section></div>
  </main>
}
