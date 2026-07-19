import { AnimatePresence, motion } from 'motion/react'
import { Crosshair, Fish, MoveUpRight, Waves } from 'lucide-react'
import { useState } from 'react'
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
  const total = TECHNIQUE_MODES.reduce((sum, item) => sum + item.items.length, 0)
  const chooseMode = (id) => { const next = TECHNIQUE_MODES.find((item) => item.id === id); setMode(id); setOpen(next.items[0].id) }

  return (
    <main className="museum-hall museum-hall--techniques techniques-theatre" data-motion-language="gesture">
      <header className="techniques-theatre__opening">
        <span className="techniques-theatre__ghost" aria-hidden="true">技法</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
          <span>第四展厅 / 动作与判断</span>
          <h1>{hall.title}</h1>
          <p>{hall.summary}</p>
        </motion.div>
        <div><strong>{total}</strong><span>项完整技法</span></div>
      </header>

      <section className="technique-workspace" aria-label="技法展台" data-technique-mode={mode}>
        <nav className="technique-mode-rail" aria-label="技法类型">
          {TECHNIQUE_MODES.map(({ id, label }, index) => {
            const Icon = ICONS[id]
            const selected = mode === id
            return <button type="button" aria-label={label} aria-pressed={selected} className={selected ? 'is-active' : ''} onClick={() => chooseMode(id)} key={id}><small>0{index + 1}</small><Icon aria-hidden="true" /><strong>{label}</strong></button>
          })}
        </nav>

        <div className="technique-workspace__stage">
          <motion.div key={mode} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .48 }}><TechniqueSimulator mode={mode} /></motion.div>
          <p>{active.lead}</p>
        </div>

        <div className="technique-records">
          <nav aria-label={`${active.label}目录`}>{active.items.map((item, index) => <button type="button" key={item.id} onClick={() => setOpen(item.id)} className={open === item.id ? 'is-active' : ''}><small>{String(index + 1).padStart(2, '0')}</small><span>{item.title}</span></button>)}</nav>
          <AnimatePresence mode="wait"><TechniqueDetail key={open} item={active.items.find((item) => item.id === open) || active.items[0]} /></AnimatePresence>
        </div>
      </section>
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
  return (
    <motion.article className="technique-record" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }}>
      <span>技法记录 / TECHNIQUE RECORD</span>
      <h2>{item.title}</h2>
      <p>{item.purpose}</p>
      <dl><div><dt>适用条件</dt><dd>{item.conditions}</dd></div><div><dt>常见误判</dt><dd>{item.misread}</dd></div></dl>
      <h3>动作步骤</h3>
      <ol>{item.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol>
    </motion.article>
  )
}
