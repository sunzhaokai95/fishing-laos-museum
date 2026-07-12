import { BookOpen, MessageCircle, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { introParagraphs } from '../lib/content.js'

const VIEWS = [
  { id: 'works', label: '诗画与典故', icon: BookOpen },
  { id: 'language', label: '钓鱼人的语言', icon: MessageCircle },
  { id: 'belief', label: '玄学标本柜', icon: Sparkles },
]

export default function CultureHall({ hall, data }) {
  const [view, setView] = useState('works')
  const [selected, setSelected] = useState(null)
  const items = useMemo(() => {
    const collections = data['collection-items']
    if (view === 'works') return collections.filter((item) => item.collection_type === 'works')
    if (view === 'language') return collections.filter((item) => item.collection_type === 'folklore' && !/天气|幸运/.test(item.title))
    return collections.filter((item) => item.collection_type === 'folklore' && /天气|幸运/.test(item.title))
  }, [data, view])
  return (
    <main className="exhibition-scene culture-scene">
      <header className="scene-intro culture-intro"><span>第六展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p></header>
      <section className="culture-cabinet">
        <nav aria-label="鱼文化分类">{VIEWS.map(({ id, label, icon: Icon }) => <button type="button" className={view === id ? 'is-active' : ''} onClick={() => setView(id)} key={id}><Icon aria-hidden="true" />{label}</button>)}</nav>
        <div className={`culture-display view-${view}`}>{items.map((item, index) => { const text = introParagraphs(item.body_markdown, 1)[0]; return <button type="button" onClick={() => setSelected({ ...item, text })} key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><h2>{item.title}</h2><p>{text}</p></button> })}</div>
      </section>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="culture-detail"><span>{VIEWS.find((item) => item.id === view)?.label}</span><h2>{selected.title}</h2><p>{selected.text}</p></div> : null}</ObjectDrawer>
    </main>
  )
}
