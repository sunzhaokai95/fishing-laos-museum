import { Binoculars, Earth, Fish, MapPinned, Scale, Trash2 } from 'lucide-react'
import { ETHICS_SECTIONS, JURISDICTIONS, LAW_HISTORY } from '../data/ethics.js'

const SECTION_ICONS = { 'locate-rule': MapPinned, 'decide-catch': Scale, 'care-for-fish': Fish, 'tackle-afterlife': Trash2, 'watch-water': Binoculars }

export default function EthicsHall({ hall }) {
  return (
    <main className="exhibition-scene ethics-scene">
      <header className="scene-intro ethics-intro"><span>第七展厅</span><h1>{hall.title}</h1><p>钓获不是故事的终点。法律决定最低边界，鱼体处置与水域变化则追问人在合法之外还应怎样行动。</p></header>
      <section className="law-history"><div className="module-heading"><Scale aria-hidden="true" /><span>规则为何出现</span><h2>钓鱼权利始终伴随水域秩序</h2><p>不同时代的规则保护过资源、税赋、权力、祭祀空间和公共安全，它们并不共享同一种理由。</p></div><div className="law-timeline">{LAW_HISTORY.map((item) => <article key={item.period}><span>{item.period}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section className="jurisdiction-room"><div className="module-heading"><Earth aria-hidden="true" /><span>不同国家与地区</span><h2>先找到规则由谁制定</h2><p>这里比较管理层级和查找路径，不提供一张脱离地点、日期和物种的万能规则表。</p></div><div className="jurisdiction-grid">{JURISDICTIONS.map((item) => <article key={item.place}><h3>{item.place}</h3><p>{item.manager}</p><ol>{item.questions.map((question) => <li key={question}>{question}</li>)}</ol></article>)}</div></section>
      <section className="ethics-decisions"><div className="module-heading"><span>从开竿到离开</span><h2>法律边界之后，还有五个判断</h2></div><div className="ethics-section-list">{ETHICS_SECTIONS.map((section, index) => { const Icon = SECTION_ICONS[section.id]; return <article key={section.id}><div><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /></div><div><h3>{section.title}</h3><strong>{section.question}</strong><p>{section.text}</p></div></article> })}</div></section>
    </main>
  )
}
