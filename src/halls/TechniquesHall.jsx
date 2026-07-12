import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Crosshair, Fish, MoveUpRight, Waves } from 'lucide-react'
import { useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import { TECHNIQUE_MODES } from '../data/techniques.js'

const ICONS = { bait: Crosshair, rod: MoveUpRight, float: Waves, fish: Fish }

export default function TechniquesHall({ hall }) {
  const [mode, setMode] = useState('bait')
  const [open, setOpen] = useState(TECHNIQUE_MODES[0].items[0].id)
  const active = TECHNIQUE_MODES.find((item) => item.id === mode)
  const chooseMode = (id) => { const next = TECHNIQUE_MODES.find((item) => item.id === id); setMode(id); setOpen(next.items[0].id) }
  return (
    <main className="min-h-screen bg-[#edf2ef] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans">
      <div className="absolute top-20 right-[-12rem] w-[38rem] h-[38rem] rounded-full bg-emerald-100/45 blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 04 / 第四展厅" title={hall.title} summary={hall.summary}><span className="px-3 py-1.5 bg-white/75 border border-zinc-200 rounded-lg">{TECHNIQUE_MODES.reduce((sum, item) => sum + item.items.length, 0)} 项完整技法</span></ExhibitHeader>
        <section className="space-y-7" aria-label="技法展台">
          <nav className="grid grid-cols-4 gap-2 p-1.5 rounded-2xl bg-white/60 border border-zinc-200 max-w-2xl" aria-label="技法类型">{TECHNIQUE_MODES.map(({ id, label }) => { const Icon = ICONS[id]; const selected = mode === id; return <button type="button" className={`relative min-h-16 px-2 rounded-xl flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs transition-colors ${selected ? 'text-white' : 'text-zinc-500 hover:text-zinc-900'}`} onClick={() => chooseMode(id)} key={id}>{selected ? <motion.span layoutId="technique-mode" className="absolute inset-0 bg-zinc-900 rounded-xl shadow-md" /> : null}<Icon className="relative" size={16} aria-hidden="true" /><span className="relative">{label}</span></button> })}</nav>
          <div className="grid lg:grid-cols-[minmax(300px,0.75fr)_1.25fr] gap-6 items-start">
            <div className="lg:sticky lg:top-24 rounded-2xl overflow-hidden border border-zinc-200 bg-white/65 min-h-[360px] relative flex flex-col justify-between p-7"><SignalVisual mode={mode} /><AnimatePresence mode="wait"><motion.div key={mode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="relative z-10 mt-56"><span className="text-[10px] font-mono text-zinc-500">{active.label} / SIGNAL READING</span><h2 className="text-xl font-bold text-zinc-900 mt-2">{active.lead}</h2></motion.div></AnimatePresence></div>
            <AnimatePresence mode="wait"><motion.div key={mode} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="space-y-3">{active.items.map((item, index) => { const expanded = open === item.id; return <motion.article layout className={`rounded-2xl border transition-colors overflow-hidden ${expanded ? 'bg-white border-zinc-300 shadow-sm' : 'bg-white/45 border-zinc-200'}`} key={item.id}><button type="button" className="w-full text-left p-5 grid grid-cols-[32px_1fr_auto] gap-3 items-start" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : item.id)}><span className="text-[10px] font-mono text-zinc-400 pt-1">{String(index + 1).padStart(2, '0')}</span><span><strong className="text-sm md:text-base text-zinc-900 block">{item.title}</strong><span className="text-xs leading-6 text-zinc-600 block mt-1">{item.purpose}</span></span><ChevronDown size={17} className={`text-zinc-400 transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" /></button><AnimatePresence initial={false}>{expanded ? <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="px-5 pb-6 ml-[45px] space-y-5"><dl className="grid md:grid-cols-2 gap-3"><div className="p-4 rounded-xl bg-zinc-50 border border-zinc-100"><dt className="text-[9px] font-mono text-zinc-400 mb-2">适用条件</dt><dd className="text-xs leading-6 text-zinc-700">{item.conditions}</dd></div><div className="p-4 rounded-xl bg-rose-50/50 border border-rose-100"><dt className="text-[9px] font-mono text-rose-500 mb-2">常见误判</dt><dd className="text-xs leading-6 text-zinc-700">{item.misread}</dd></div></dl><div><h3 className="text-[10px] font-mono text-zinc-500 mb-3">动作步骤</h3><ol className="space-y-3">{item.steps.map((step, stepIndex) => <li className="flex gap-3 text-xs leading-6 text-zinc-700" key={step}><span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[9px] font-mono flex items-center justify-center shrink-0 mt-0.5">{stepIndex + 1}</span>{step}</li>)}</ol></div></div></motion.div> : null}</AnimatePresence></motion.article> })}</motion.div></AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  )
}

function SignalVisual({ mode }) {
  const positions = { bait: '62%', rod: '44%', float: '54%', fish: '72%' }
  return <div className="absolute inset-x-0 top-0 h-64 overflow-hidden" aria-hidden="true"><span className="absolute inset-x-0 top-[42%] h-px bg-zinc-400/50" /><span className="absolute inset-x-0 top-[43%] bottom-0 bg-cyan-100/30" /><motion.span animate={{ left: positions[mode], rotate: mode === 'rod' ? -7 : 0, y: mode === 'float' ? [0, 8, 0] : 0 }} transition={{ type: 'spring', damping: 16, y: { repeat: Infinity, duration: 2 } }} className="absolute top-[22%] w-3 h-28 rounded-full bg-white border border-zinc-500 shadow-sm before:absolute before:top-0 before:left-0 before:right-0 before:h-10 before:bg-zinc-900 before:rounded-t-full" /><motion.span key={mode} initial={{ scale: 0.3, opacity: 0.8 }} animate={{ scale: 3.2, opacity: 0 }} transition={{ repeat: Infinity, duration: 2.4 }} className="absolute top-[39%] w-12 h-4 rounded-full border border-zinc-500" style={{ left: positions[mode], marginLeft: '-18px' }} /></div>
}
