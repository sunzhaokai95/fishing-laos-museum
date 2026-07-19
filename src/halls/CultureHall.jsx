import { BookOpen, MessageCircle, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import LanguageIndex from '../experiences/culture/LanguageIndex.jsx'
import MetaphysicsCabinet from '../experiences/culture/MetaphysicsCabinet.jsx'
import PoetryFolios from '../experiences/culture/PoetryFolios.jsx'
import { imageUrl, publicBodyParagraphs } from '../lib/content.js'

const VIEWS = [
  { id: 'works', label: '诗画与典故', icon: BookOpen },
  { id: 'language', label: '钓鱼人的语言', icon: MessageCircle },
  { id: 'belief', label: '玄学标本柜', icon: Sparkles },
]

export default function CultureHall({ hall, data }) {
  const [view, setView] = useState('works')
  const [selected, setSelected] = useState(null)
  const collections = data['collection-items']
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const items = useMemo(() => {
    let list
    if (view === 'works') list = collections.filter((item) => item.collection_type === 'works')
    else if (view === 'language') list = collections.filter((item) => item.collection_type === 'folklore' && !/天气|幸运/.test(item.title))
    else list = collections.filter((item) => item.collection_type === 'folklore' && /天气|幸运/.test(item.title))
    return list.map((item) => {
      const details = publicBodyParagraphs(item.body_markdown).filter((line) => line !== item.title)
      return {
        ...item,
        text: details[0] || item.summary || '',
        details,
        image: imageUrl(images.get(item.image_ids?.[0])),
      }
    })
  }, [collections, images, view])

  return (
    <main className="museum-hall museum-hall--culture culture-theatre" data-motion-language="folios">
      <header className="culture-theatre__opening">
        <span className="culture-theatre__ghost" aria-hidden="true">鱼文</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}><span>第六展厅 / 鱼文化</span><h1>{hall.title}</h1><p>{hall.summary}</p></motion.div>
      </header>
      <nav className="culture-view-rail" aria-label="鱼文化分类">
        {VIEWS.map(({ id, label, icon: Icon }, index) => <button type="button" aria-label={label} aria-pressed={view === id} className={view === id ? 'is-active' : ''} onClick={() => setView(id)} key={id}><small>0{index + 1}</small><Icon aria-hidden="true" /><span>{label}</span></button>)}
      </nav>
      <div className="culture-theatre__reading">
        {view === 'works' ? <PoetryFolios items={items} onOpen={setSelected} /> : null}
        {view === 'language' ? <LanguageIndex items={items} onOpen={setSelected} /> : null}
        {view === 'belief' ? <MetaphysicsCabinet items={items} /> : null}
      </div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="culture-drawer">{selected.image ? <img src={selected.image} alt={selected.title} /> : null}<span>{VIEWS.find((item) => item.id === view)?.label}</span><h2>{selected.title}</h2><div className="culture-drawer__body">{selected.details.map((paragraph, index) => <p key={`${selected.id}-${index}`}>{paragraph}</p>)}</div></div> : null}</ObjectDrawer>
    </main>
  )
}
