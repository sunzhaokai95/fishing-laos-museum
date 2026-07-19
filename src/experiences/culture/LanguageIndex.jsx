import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export default function LanguageIndex({ items, onOpen }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const active = items.find((item) => item.id === activeId) || items[0]
  return (
    <section className="language-index" aria-label="钓鱼语言索引">
      <nav aria-label="词条目录">{items.map((item, index) => <button type="button" key={item.id} aria-label={item.title} onClick={() => setActiveId(item.id)} className={active?.id === item.id ? 'is-active' : ''}><small>TERM {String(index + 1).padStart(2, '0')}</small><span>{item.title}</span></button>)}</nav>
      {active ? <motion.article key={active.id} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}><span className="language-index__ghost" aria-hidden="true">言</span><div><small>语言记录 / LANGUAGE RECORD</small><h2>{active.title}</h2><p>{active.text}</p></div><button type="button" onClick={() => onOpen(active)}>查看完整词条 <ArrowUpRight aria-hidden="true" /></button></motion.article> : null}
    </section>
  )
}
