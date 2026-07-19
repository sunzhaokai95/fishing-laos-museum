import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { relativeLoadState } from '../../lib/experienceAdapters.js'
import { TACKLE_SYSTEMS } from './tackleSystems.js'

export default function TackleStressLab({ records, onOpen }) {
  const firstSystem = TACKLE_SYSTEMS.find((item) => records.some((record) => record.system === item.id))?.id || '辅助'
  const [system, setSystem] = useState(firstSystem)
  const [activeId, setActiveId] = useState(() => records.find((record) => record.system === firstSystem)?.id)
  const [load, setLoad] = useState(38)
  const visible = useMemo(() => records.filter((record) => record.system === system), [records, system])
  const active = visible.find((record) => record.id === activeId) || visible[0]
  const loadState = relativeLoadState(load)
  const curve = `M 24 178 Q 212 ${168 - load * 1.15} 400 ${34 + load * .75}`

  const chooseSystem = (id) => {
    setSystem(id)
    setActiveId(records.find((record) => record.system === id)?.id)
  }

  return (
    <section className="tackle-object-stage" aria-label="钓具受力拆解台" style={{ '--load': load / 100 }}>
      <nav className="tackle-system-rail" aria-label="钓具系统">
        {TACKLE_SYSTEMS.map(({ id, label, icon: Icon }) => (
          <button type="button" key={id} aria-label={`选择${label}系统`} onClick={() => chooseSystem(id)} className={system === id ? 'is-active' : ''}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="tackle-object-stage__canvas">
        <div className="tackle-object-stage__heading"><span>当前器物 / SELECTED OBJECT</span><h2>{active?.title || '当前系统暂无记录'}</h2></div>
        <AnimatePresence mode="wait">
          <motion.div key={active?.id || system} className="tackle-object-stage__object" initial={{ opacity: 0, scale: .82, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 1.12, rotate: 4 }} transition={{ duration: .58, ease: [0.22, 1, 0.36, 1] }}>
            {active?.image ? <img src={active.image} alt={active.title} /> : <span aria-hidden="true">{system}</span>}
          </motion.div>
        </AnimatePresence>
        <svg viewBox="0 0 424 220" className="tackle-load-drawing" role="img" aria-label="钓具受力曲线示意">
          <line x1="24" y1="190" x2="400" y2="190" />
          <motion.path data-testid="tackle-load-path" d={curve} animate={{ d: curve }} transition={{ type: 'spring', damping: 20, stiffness: 90 }} />
          <motion.circle animate={{ cx: 400, cy: 34 + load * .75 }} transition={{ type: 'spring', damping: 20 }} r="7" />
        </svg>
        <div className="tackle-load-control">
          <div><label htmlFor="tackle-load">相对负载</label><output>{load}%</output></div>
          <input id="tackle-load" type="range" min="0" max="100" value={load} onChange={(event) => setLoad(Number(event.target.value))} />
        </div>
      </div>

      <aside className="tackle-object-stage__index">
        <span>器物索引 / OBJECT INDEX</span>
        <div>{visible.map((record, index) => <button type="button" key={record.id} onClick={() => setActiveId(record.id)} className={active?.id === record.id ? 'is-active' : ''}><small>{String(index + 1).padStart(2, '0')}</small>{record.title}</button>)}</div>
      </aside>

      <aside className="tackle-load-reading">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span>负载读数 / LOAD READING</span>
          <strong>{loadState.label}</strong>
          <p>{loadState.description}</p>
          {active ? <><p>{active.description}</p><button type="button" onClick={() => onOpen(active)} aria-label={`查看${active.title}详情`}>查看完整器物记录 <ArrowUpRight aria-hidden="true" /></button></> : <p>该系统尚无可用器物记录。</p>}
        </motion.div>
      </aside>

      <small className="tackle-object-stage__note">本台呈现钓组中的相对受力变化，不替代产品参数、现场检查或制造商安全说明。</small>
    </section>
  )
}
