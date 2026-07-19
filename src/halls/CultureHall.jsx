import { BookOpen, MessageCircle, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import LanguageIndex from '../experiences/culture/LanguageIndex.jsx'
import MetaphysicsCabinet from '../experiences/culture/MetaphysicsCabinet.jsx'
import PoetryFolios from '../experiences/culture/PoetryFolios.jsx'
import { introParagraphs } from '../lib/content.js'

const VIEWS = [
  { id: 'works', label: '诗画与典故', icon: BookOpen },
  { id: 'language', label: '钓鱼人的语言', icon: MessageCircle },
  { id: 'belief', label: '玄学标本柜', icon: Sparkles },
]

export default function CultureHall({ hall, data }) {
  const [view, setView] = useState('works')
  const [selected, setSelected] = useState(null)
  const collections = data['collection-items']
  const items = useMemo(() => {
    let list
    if (view === 'works') list = collections.filter((item) => item.collection_type === 'works')
    else if (view === 'language') list = collections.filter((item) => item.collection_type === 'folklore' && !/天气|幸运/.test(item.title))
    else list = collections.filter((item) => item.collection_type === 'folklore' && /天气|幸运/.test(item.title))
    return list.map((item) => ({ ...item, text: introParagraphs(item.body_markdown, 1)[0] }))
  }, [collections, view])

  return (
    <main className="museum-hall museum-hall--culture min-h-screen" data-motion-language="folios">
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 06 / 第六展厅" title={hall.title} summary={hall.summary} />
        <nav className="culture-index" aria-label="鱼文化分类">
          {VIEWS.map(({ id, label, icon: Icon }) => (
            <button type="button" aria-pressed={view === id} onClick={() => setView(id)} key={id}>
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        {view === 'works' ? <PoetryFolios items={items} onOpen={setSelected} /> : null}
        {view === 'language' ? <LanguageIndex items={items} onOpen={setSelected} /> : null}
        {view === 'belief' ? <MetaphysicsCabinet items={items} /> : null}
      </div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>
        {selected ? (
          <div className="space-y-6 -mt-5">
            <span className="text-[10px] font-mono text-zinc-500">{VIEWS.find((item) => item.id === view)?.label}</span>
            <h2 className="font-serif text-3xl text-zinc-900">{selected.title}</h2>
            <p className="text-sm leading-8 text-zinc-600">{selected.text}</p>
          </div>
        ) : null}
      </ObjectDrawer>
    </main>
  )
}
