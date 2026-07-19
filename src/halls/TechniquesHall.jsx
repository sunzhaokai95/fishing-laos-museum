import { AnimatePresence, motion } from 'motion/react'
import { Crosshair, Fish, MoveUpRight, Waves } from 'lucide-react'
import { useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import { TECHNIQUE_MODES } from '../data/techniques.js'
import BaitDispersionLab from '../experiences/techniques/BaitDispersionLab.jsx'
import FishControlLab from '../experiences/techniques/FishControlLab.jsx'
import FloatSignalLab from '../experiences/techniques/FloatSignalLab.jsx'
import RodAngleLab from '../experiences/techniques/RodAngleLab.jsx'

const ICONS = { bait: Crosshair, rod: MoveUpRight, float: Waves, fish: Fish }

export default function TechniquesHall({ hall }) {
  const [mode, setMode] = useState('bait')
  const [open, setOpen] = useState(TECHNIQUE_MODES[0].items[0].id)
  const active = TECHNIQUE_MODES.find((item) => item.id === mode)
  const chooseMode = (id) => { const next = TECHNIQUE_MODES.find((item) => item.id === id); setMode(id); setOpen(next.items[0].id) }
  return (
    <main className="museum-hall museum-hall--techniques min-h-screen" data-motion-language="gesture">
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 04 / 第四展厅" title={hall.title} summary={hall.summary}><span className="px-3 py-1.5 bg-white/75 border border-zinc-200 rounded-lg">{TECHNIQUE_MODES.reduce((sum, item) => sum + item.items.length, 0)} 项完整技法</span></ExhibitHeader>
        <section className="space-y-7" aria-label="技法展台" data-technique-mode={mode}>
          <nav className="grid grid-cols-4 gap-px border border-zinc-200 bg-zinc-200 max-w-2xl" aria-label="技法类型">{TECHNIQUE_MODES.map(({ id, label }) => { const Icon = ICONS[id]; const selected = mode === id; return <button type="button" aria-pressed={selected} className={`relative min-h-16 bg-white px-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-xs transition-colors ${selected ? 'text-zinc-950 shadow-[inset_0_-2px_0_#18181b]' : 'text-zinc-500 hover:text-zinc-900'}`} onClick={() => chooseMode(id)} key={id}><Icon size={16} aria-hidden="true" /><span>{label}</span></button> })}</nav>
          <div className="grid lg:grid-cols-[minmax(320px,0.82fr)_1.18fr] gap-6 items-start">
            <div className="lg:sticky lg:top-24 space-y-4"><motion.div key={mode} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><TechniqueSimulator mode={mode} /></motion.div><p className="border-l border-zinc-400 pl-4 text-xs leading-6 text-zinc-600">{active.lead}</p></div>
            <div className="grid md:grid-cols-[190px_1fr] border-y border-zinc-300 min-w-0"><nav className="border-b md:border-b-0 md:border-r border-zinc-300 max-h-[620px] overflow-y-auto" aria-label={`${active.label}目录`}>{active.items.map((item, index) => <button type="button" key={item.id} onClick={() => setOpen(item.id)} className={`w-full px-4 py-4 text-left border-b border-zinc-200 ${open === item.id ? 'bg-white text-zinc-950' : 'bg-white/40 text-zinc-500 hover:bg-white/70'}`}><small className="block font-mono text-[8px] text-zinc-400">{String(index + 1).padStart(2, '0')}</small><span className="mt-1 block text-xs leading-5">{item.title}</span></button>)}</nav><AnimatePresence mode="wait"><TechniqueDetail key={open} item={active.items.find((item) => item.id === open) || active.items[0]} /></AnimatePresence></div>
          </div>
        </section>
      </div>
    </main>
  )
}

function TechniqueSimulator({ mode }) {
  if (mode === 'rod') return <RodAngleLab />
  if (mode === 'float') return <FloatSignalLab />
  if (mode === 'fish') return <FishControlLab />
  return <BaitDispersionLab />
}

function TechniqueDetail({ item }) {
  return <motion.article initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="bg-white/75 p-5 md:p-7 min-w-0"><small className="font-mono text-[9px] text-zinc-400">TECHNIQUE RECORD / 技法记录</small><h2 className="mt-2 text-xl font-semibold text-zinc-900">{item.title}</h2><p className="mt-3 text-sm leading-7 text-zinc-600">{item.purpose}</p><dl className="mt-6 space-y-5"><div><dt className="text-[9px] font-mono text-zinc-400">适用条件</dt><dd className="mt-2 text-xs leading-6 text-zinc-700">{item.conditions}</dd></div><div className="border-l-2 border-rose-300 pl-4"><dt className="text-[9px] font-mono text-rose-500">常见误判</dt><dd className="mt-2 text-xs leading-6 text-zinc-700">{item.misread}</dd></div></dl><h3 className="mt-7 text-[10px] font-mono text-zinc-500">动作步骤</h3><ol className="mt-3 space-y-3">{item.steps.map((step, index) => <li className="grid grid-cols-[22px_1fr] gap-3 text-xs leading-6 text-zinc-700" key={step}><span className="font-mono text-[9px] text-zinc-400">{String(index + 1).padStart(2, '0')}</span><span>{step}</span></li>)}</ol></motion.article>
}
