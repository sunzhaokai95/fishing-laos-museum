import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

export default function LanguageIndex({ items, onOpen }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const active = items.find((item) => item.id === activeId) || items[0]
  return <section className="grid min-h-[540px] border-y border-zinc-300 md:grid-cols-[260px_1fr]" aria-label="钓鱼语言索引"><nav className="max-h-[540px] overflow-y-auto border-b border-zinc-300 md:border-b-0 md:border-r" aria-label="词条目录">{items.map((item, index) => <button type="button" key={item.id} aria-label={item.title} onClick={() => setActiveId(item.id)} className={`w-full border-b border-zinc-200 px-5 py-4 text-left ${active?.id === item.id ? 'bg-white text-zinc-950' : 'bg-white/30 text-zinc-500 hover:bg-white/70'}`}><small className="font-mono text-[8px] text-zinc-400">TERM {String(index + 1).padStart(2, '0')}</small><span className="mt-1 block text-sm">{item.title}</span></button>)}</nav>{active ? <motion.article key={active.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-between bg-white p-6 md:p-10"><div><small className="font-mono text-[9px] text-zinc-400">LANGUAGE RECORD / 语言记录</small><h2 className="mt-3 text-3xl font-semibold text-zinc-900">{active.title}</h2><p className="mt-6 max-w-2xl text-sm leading-8 text-zinc-600">{active.text}</p></div><button type="button" onClick={() => onOpen(active)} className="mt-8 inline-flex items-center gap-2 self-start border-b border-zinc-800 pb-1 text-xs">查看完整词条 <ArrowUpRight size={13} /></button></motion.article> : null}</section>
}
