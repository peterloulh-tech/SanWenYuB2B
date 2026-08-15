import { CookingPot, Fish, Shell, Sprout } from 'lucide-react'
import { enterpriseProductSections } from '../../data/industryProducts'
import '../../styles/industry-products.css'

const sectionIcons = { fresh: Fish, aquaculture: Sprout, processed: CookingPot, seafood: Shell }

export default function EnterpriseSectionCards({
  selectedSection,
  counts,
  countUnit,
  onSelect,
  ariaLabel,
}) {
  return <section className="industry-stage-grid" aria-label={ariaLabel}>
    {enterpriseProductSections.map((item) => {
      const Icon = sectionIcons[item.id]
      const selected = selectedSection === item.id

      return <button
        type="button"
        className={selected ? 'active' : ''}
        aria-pressed={selected}
        onClick={() => onSelect(item.id)}
        key={item.id}
      >
        <span><Icon /></span>
        <div><b>{item.name}</b><small>{item.description}</small></div>
        <em>{counts[item.id] || 0} {countUnit}</em>
      </button>
    })}
  </section>
}
