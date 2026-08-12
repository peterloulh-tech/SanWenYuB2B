export default function PageHero({ eyebrow = '三文鱼数字化交易平台', title, description, action }) {
  return <section className="sub-hero"><div className="page-container flex h-full items-center justify-between"><div>{eyebrow && <p>{eyebrow}</p>}<h1>{title}</h1><span>{description}</span></div>{action}</div></section>
}
