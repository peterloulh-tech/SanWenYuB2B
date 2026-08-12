export default function SectionCard({ title, extra, children, className = '' }) {
  return <section className={`section-card ${className}`}><header><h2>{title}</h2>{extra}</header>{children}</section>
}
