import { Crosshair, Fish, MoveUpRight, Waves } from 'lucide-react'
import { useState } from 'react'
import { TECHNIQUE_MODES } from '../data/techniques.js'

const ICONS = { bait: Crosshair, rod: MoveUpRight, float: Waves, fish: Fish }

export default function TechniquesHall({ hall }) {
  const [mode, setMode] = useState('bait')
  const active = TECHNIQUE_MODES.find((item) => item.id === mode)
  return (
    <main className="exhibition-scene technique-scene">
      <header className="scene-intro technique-intro"><span>第四展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p><div className="scene-stat"><strong>{TECHNIQUE_MODES.reduce((sum, item) => sum + item.items.length, 0)}</strong><span>项完整技法</span></div></header>
      <section className="technique-lab">
        <nav className="technique-modes" aria-label="技法类型">{TECHNIQUE_MODES.map(({ id, label }) => { const Icon = ICONS[id]; return <button type="button" className={mode === id ? 'is-active' : ''} onClick={() => setMode(id)} key={id}><Icon aria-hidden="true" /><span>{label}</span></button> })}</nav>
        <div className="technique-display">
          <div className="signal-visual" aria-hidden="true"><span className="water-line" /><span className="float-body" /><span className="signal-ring one" /><span className="signal-ring two" /></div>
          <div className="technique-sequence"><span>{active.label}</span><h2>{active.lead}</h2><div className="technique-records">{active.items.map((item, index) => <details key={item.id} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.purpose}</p></div></summary><div className="technique-detail"><dl><div><dt>适用条件</dt><dd>{item.conditions}</dd></div><div><dt>常见误判</dt><dd>{item.misread}</dd></div></dl><h4>动作步骤</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol></div></details>)}</div></div>
        </div>
      </section>
    </main>
  )
}
