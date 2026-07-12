import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WATER_FORTUNES } from '../../data/anglerInteractives.js'

export default function WaterFortuneDraw() {
  const [phase, setPhase] = useState('idle')
  const [index, setIndex] = useState(-1)
  useEffect(() => {
    if (phase !== 'drawing') return undefined
    const timer = window.setTimeout(() => { setIndex((value) => (value + 1) % WATER_FORTUNES.length); setPhase('result') }, 600)
    return () => window.clearTimeout(timer)
  }, [phase])
  const fortune = index >= 0 ? WATER_FORTUNES[index] : null
  return <section className="angler-tool-stage text-center"><Sparkles className="mx-auto text-zinc-500" size={25} aria-hidden="true" /><small className="mt-4 block">民俗互动，不预测鱼情</small><h2>从水边抽一句话</h2>{phase === 'drawing' ? <div aria-live="polite"><motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }} transition={{ repeat: Infinity, duration: 0.9 }} className="mx-auto my-8 h-32 w-24 border border-stone-300 bg-[#fbfaf7]" /><p>正在从标本柜中取出签语</p></div> : fortune ? <motion.div initial={{ rotateX: 70, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} className="my-7 border-y border-stone-300 py-7"><strong className="text-lg text-zinc-900">{fortune.title}</strong><p className="mt-4 font-serif text-xl leading-8 text-zinc-900">“{fortune.line}”</p><span className="mt-4 block text-xs leading-6 text-zinc-500">{fortune.note}</span></motion.div> : <p>这些签语来自展厅中的观察方式与水边语言，不对应吉凶、鱼获或个人命运。</p>}<button type="button" disabled={phase === 'drawing'} aria-label={fortune ? '再抽一签' : '抽取签语'} onClick={() => setPhase('drawing')} className="angler-primary-action disabled:opacity-50">{fortune ? '再抽一签' : '抽取签语'}</button></section>
}
