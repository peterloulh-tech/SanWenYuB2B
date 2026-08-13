import { Navigate, useSearchParams } from 'react-router-dom'
import { mapLegacyProductStage } from '../data/industryProducts'

export default function LegacyIndustryProductsRedirect() {
  const [searchParams] = useSearchParams()
  const section = mapLegacyProductStage(searchParams.get('stage'))
  return <Navigate to={section === 'fresh' ? '/products' : `/products?section=${section}`} replace />
}
