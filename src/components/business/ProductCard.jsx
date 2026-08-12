import { Link } from 'react-router-dom'
import { MapPin, ShieldCheck } from 'lucide-react'

export default function ProductCard({ product }) {
  return <article className="product-card"><Link to={`/products/${product.id}`}><img src={product.image} alt={product.name}/></Link><div className="p-3"><Link to={`/products/${product.id}`} className="product-name">{product.name}</Link><p className="product-spec">规格：{product.spec}　产地：{product.origin}</p><strong>¥{product.price}<small>/kg</small></strong><p className="flex items-center gap-1"><ShieldCheck size={13} className="text-blue-500"/>{product.supplier}</p><p className="flex items-center gap-1"><MapPin size={13}/>{product.city}</p><Link to={`/products/${product.id}`} className="product-action">查看详情</Link></div></article>
}
