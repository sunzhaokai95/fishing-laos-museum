import { motion } from 'motion/react'
import { HISTORY_ERAS } from '../../lib/experienceAdapters.js'

export default function HistoryEraFilter({ active, onChange }) {
  return (
    <nav className="border-b border-zinc-200 py-4" aria-label="历史时代筛选">
      <span className="block text-[9px] font-mono text-zinc-400 mb-3">ERA SEGMENT / 时代分段</span>
      <div className="flex gap-7 overflow-x-auto pb-1">
        {HISTORY_ERAS.map((era) => (
          <button key={era.id} type="button" onClick={() => onChange(era.id)} className={`relative flex-none pb-2 text-left ${active === era.id ? 'text-zinc-900' : 'text-zinc-400 hover:text-zinc-700'}`}>
            <strong className="block text-xs">{era.label}</strong>
            <small className="block text-[8px] font-mono mt-0.5">{era.range}</small>
            {active === era.id ? <motion.span layoutId="history-era" className="absolute bottom-0 inset-x-0 h-0.5 bg-zinc-900" /> : null}
          </button>
        ))}
      </div>
    </nav>
  )
}
