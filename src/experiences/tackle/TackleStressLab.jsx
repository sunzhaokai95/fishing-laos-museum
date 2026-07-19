import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { TACKLE_SYSTEMS } from './tackleSystems.js'

export default function TackleStressLab({ records, onOpen }) {
  const firstSystem = TACKLE_SYSTEMS.find((item) => records.some((record) => record.system === item.id))?.id || '辅助'
  const [system, setSystem] = useState(firstSystem)
  const [activeId, setActiveId] = useState(() => records.find((record) => record.system === firstSystem)?.id)
  const visible = useMemo(() => records.filter((record) => record.system === system), [records, system])
  const active = visible.find((record) => record.id === activeId) || visible[0]
  const systemLabel = TACKLE_SYSTEMS.find((item) => item.id === system)?.label || system
  const activePosition = Math.max(0, visible.findIndex((record) => record.id === active?.id)) + 1

  const chooseSystem = (id) => {
    setSystem(id)
    setActiveId(records.find((record) => record.system === id)?.id)
  }

  return (
    <section className="tackle-object-stage" aria-label="钓具器物说明台">
      <nav className="tackle-system-rail" aria-label="钓具系统">
        {TACKLE_SYSTEMS.map(({ id, label, icon: Icon }) => (
          <button type="button" key={id} aria-label={`选择${label}系统`} onClick={() => chooseSystem(id)} className={system === id ? 'is-active' : ''}>
            <Icon aria-hidden="true" /><span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="tackle-object-stage__canvas">
        <div className="tackle-object-stage__heading"><span>当前器物 / SELECTED OBJECT</span><h2>{active?.title || '当前系统暂无记录'}</h2></div>
        {active ? (
          <motion.div className="tackle-object-stage__definition" key={`definition-${active.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span>器物释义 / OBJECT NOTE</span>
            <p>{active.description}</p>
          </motion.div>
        ) : null}
        {active ? (
          <dl className="tackle-object-stage__facts">
            <div><dt>所属系统</dt><dd>{systemLabel}</dd></div>
            <div><dt>器物类别</dt><dd>{active.kind}</dd></div>
            <div><dt>本组序号</dt><dd>{String(activePosition).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}</dd></div>
          </dl>
        ) : null}
      </div>

      <aside className="tackle-object-stage__index">
        <span>器物索引 / OBJECT INDEX</span>
        <div>{visible.map((record, index) => <button type="button" key={record.id} onClick={() => setActiveId(record.id)} className={active?.id === record.id ? 'is-active' : ''}><small>{String(index + 1).padStart(2, '0')}</small>{record.title}</button>)}</div>
      </aside>

      <aside className="tackle-object-reading">
        <motion.div key={active?.id || system} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <span>器物说明</span>
          <strong>{active?.title || systemLabel}</strong>
          {active ? <button type="button" onClick={() => onOpen(active)} aria-label={`查看${active.title}详情`}>查看完整器物记录 <ArrowUpRight aria-hidden="true" /></button> : <p>该系统尚无可用器物记录。</p>}
        </motion.div>
      </aside>

      <small className="tackle-object-stage__note">器物释义用于辨认结构、用途，以及它在钓组中的位置。</small>
    </section>
  )
}
