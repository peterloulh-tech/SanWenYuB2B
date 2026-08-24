import { ArrowLeft, ChefHat, Clock3, Film, ShoppingBag } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ContentSectionNav from '../components/content/ContentSectionNav'
import { findSalmonRecipe } from '../data/salmonKitchen'
import '../styles/report-remediation.css'

export default function SalmonKitchenDetailPage() {
  const { id } = useParams()
  const { search } = useLocation()
  const recipe = findSalmonRecipe(id)
  const channel = new URLSearchParams(search).get('channel') === 'retail' ? '?channel=retail' : ''
  if (!recipe) return <main className="remediation-page"><div className="page-container remediation-empty"><ChefHat/><h1>未找到该菜品</h1><Link to={`/salmon-kitchen${channel}`}>返回三文鱼厨房</Link></div></main>
  return <main className="remediation-page content-page">
    <ContentSectionNav/>
    <div className="page-container remediation-body kitchen-detail">
      <Link className="remediation-back" to={`/salmon-kitchen${channel}`}><ArrowLeft/>返回三文鱼厨房</Link>
      <section className="kitchen-detail-hero"><img src={recipe.image} alt={recipe.name}/><div><span>演示菜品</span><h1>{recipe.name}</h1><p><Clock3/>{recipe.time}<b>{recipe.difficulty}</b></p><em>适用产品：{recipe.product}</em><Link to={recipe.productPath}><ShoppingBag/>购买所需三文鱼</Link></div></section>
      <div className="kitchen-detail-grid"><section><h2>食材</h2><ul>{recipe.ingredients.map((item) => <li key={item}>{item}</li>)}</ul></section><section><h2>制作步骤</h2><ol>{recipe.steps.map((step, index) => <li key={step}><b>{index + 1}</b><p>{step}</p></li>)}</ol></section></div>
      <aside className="kitchen-safety"><h2>食用安全提示</h2><p>{recipe.safety}</p></aside>
      <section className="recipe-video"><Film/><h2>视频待提供</h2><p>未收到经授权的烹饪视频，本页面不制作虚假视频。</p></section>
    </div>
  </main>
}
