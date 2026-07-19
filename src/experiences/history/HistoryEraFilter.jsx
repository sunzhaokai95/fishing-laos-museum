import { motion } from 'motion/react'
import { HISTORY_ERAS } from '../../lib/experienceAdapters.js'

export default function HistoryEraFilter({ active, onChange }) {
  return (
    <nav className="history-era-rail" aria-label="历史时代筛选">
      <span>时代</span>
      <div>
        {HISTORY_ERAS.map((era) => (
          <button key={era.id} type="button" onClick={() => onChange(era.id)} className={active === era.id ? 'is-active' : ''}>
            <strong>{era.label}</strong>
            <small>{era.range}</small>
            {active === era.id ? <motion.i layoutId="history-era" /> : null}
          </button>
        ))}
      </div>
    </nav>
  )
}
