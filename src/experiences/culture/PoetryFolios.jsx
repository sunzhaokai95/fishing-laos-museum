import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react'
import { useState } from 'react'

export default function PoetryFolios({ items, onOpen }) {
  const [index, setIndex] = useState(0)
  const item = items[index]
  if (!item) return <p className="culture-empty">本册暂无可展示条目。</p>
  const move = (amount) => setIndex((value) => (value + amount + items.length) % items.length)
  return (
    <section className="poetry-folio" role="region" aria-label="诗画册页">
      <motion.article key={item.id} initial={{ opacity: 0, rotateY: -9, x: 28 }} animate={{ opacity: 1, rotateY: 0, x: 0 }} transition={{ duration: .65 }} className={item.image ? 'has-image' : ''}>
        {item.image ? <figure><img src={item.image} alt={item.title} /></figure> : null}
        <div><small>FOLIO {String(index + 1).padStart(2, '0')} / POETRY, IMAGE & ALLUSION</small><h2>{item.title}</h2><p>{item.text}</p><button type="button" onClick={() => onOpen(item)}><Maximize2 aria-hidden="true" />展开条目</button></div>
      </motion.article>
      <footer><button type="button" aria-label="上一册页" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button><span>{index + 1} / {items.length}</span><button type="button" aria-label="下一册页" onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button></footer>
    </section>
  )
}
