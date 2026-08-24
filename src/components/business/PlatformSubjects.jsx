import { ArrowRight, Building2, Landmark } from 'lucide-react'
import { Link } from 'react-router-dom'
import { platformEntities } from '../../data/platformEntities'

export default function PlatformSubjects() {
  return <section className="platform-subjects page-container" aria-labelledby="platform-subjects-title">
    <header><div><h2 id="platform-subjects-title">平台承担主体</h2><p>三方共同承担平台；具体职责资料待补充，不自行推定法律或业务分工。</p></div></header>
    <div>{platformEntities.map((entity) => {
      const Icon = entity.type === '行业协会' ? Landmark : Building2
      return <Link to={`/suppliers/${entity.id}`} key={entity.id}><span><Icon /></span><div><b>{entity.name}</b><small>{entity.type}</small></div><ArrowRight /></Link>
    })}</div>
  </section>
}
