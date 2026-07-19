import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'

export default function MetaphysicsCabinet({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const active = items.find((item) => item.id === activeId) || items[0]
  return (
    <section className="metaphysics-cabinet" aria-label="玄学标本柜">
      <div>{items.map((item, index) => <button type="button" key={item.id} aria-label={`打开标本 ${item.title}`} onClick={() => setActiveId(item.id)} className={active?.id === item.id ? 'is-active' : ''}><Sparkles aria-hidden="true" /><small>SPECIMEN {String(index + 1).padStart(2, '0')}</small><span>{item.title}</span></button>)}</div>
      {active ? <motion.article key={active.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><i aria-hidden="true">俗</i><small>民俗分析 / FOLK BELIEF ANALYSIS</small><h2>{active.title}</h2><p>{active.text}</p><p>本柜保存的是水边经验、玩笑和民俗表达，不把相关性写成因果，也不提供预测。</p></motion.article> : null}
    </section>
  )
}
