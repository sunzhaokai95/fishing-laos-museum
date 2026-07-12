import { BookOpen, MessageCircle, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import LanguageIndex from '../experiences/culture/LanguageIndex.jsx'
import MetaphysicsCabinet from '../experiences/culture/MetaphysicsCabinet.jsx'
import PoetryFolios from '../experiences/culture/PoetryFolios.jsx'
import { introParagraphs } from '../lib/content.js'

const VIEWS = [{ id: 'works', label: '诗画与典故', icon: BookOpen }, { id: 'language', label: '钓鱼人的语言', icon: MessageCircle }, { id: 'belief', label: '玄学标本柜', icon: Sparkles }]

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
  return <main className="min-h-screen bg-[#f5f5f7] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans"><div className="max-w-7xl mx-auto relative z-10 space-y-10"><ExhibitHeader eyebrow="HALL 06 / 第六展厅" title={hall.title} summary={hall.summary} /><nav className="flex gap-8 overflow-x-auto border-b border-zinc-300" aria-label="鱼文化分类">{VIEWS.map(({ id, label, icon: Icon }) => <button type="button" className={`relative flex-none pb-4 flex items-center gap-2 text-xs ${view === id ? 'text-zinc-900 font-semibold' : 'text-zinc-500'}`} onClick={() => setView(id)} key={id}><Icon size={15} aria-hidden="true" />{label}{view === id ? <span className="absolute inset-x-0 bottom-0 h-0.5 bg-zinc-900" /> : null}</button>)}</nav>{view === 'works' ? <PoetryFolios items={items} onOpen={setSelected} /> : view === 'language' ? <LanguageIndex items={items} onOpen={setSelected} /> : <MetaphysicsCabinet items={items} />}</div><ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="space-y-6 -mt-5"><span className="text-[10px] font-mono text-zinc-500">{VIEWS.find((item) => item.id === view)?.label}</span><h2 className="font-serif text-3xl text-zinc-900">{selected.title}</h2><p className="text-sm leading-8 text-zinc-600">{selected.text}</p></div> : null}</ObjectDrawer></main>
}
