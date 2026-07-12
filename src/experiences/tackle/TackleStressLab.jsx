import { AnimatePresence, motion } from 'motion/react'
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
  const curve = `M 20 176 Q 210 ${168 - load * 1.15} 400 ${34 + load * 0.75}`

  const chooseSystem = (id) => {
    setSystem(id)
    setActiveId(records.find((record) => record.system === id)?.id)
  }

  return (
    <section className="border-y border-zinc-300" aria-label="钓具受力拆解台">
      <div className="grid min-h-[610px] lg:grid-cols-[230px_minmax(360px,1fr)_300px]">
        <aside className="border-b border-zinc-300 bg-white/45 lg:border-b-0 lg:border-r">
          <div className="grid grid-cols-4 gap-px border-b border-zinc-300 bg-zinc-300 lg:grid-cols-2">{TACKLE_SYSTEMS.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-label={`选择${label}系统`} onClick={() => chooseSystem(id)} className={`min-h-16 bg-zinc-50 px-2 py-3 text-[10px] ${system === id ? 'text-zinc-950 shadow-[inset_0_-2px_0_#18181b]' : 'text-zinc-500 hover:text-zinc-900'}`}><Icon size={15} className="mx-auto mb-1.5" aria-hidden="true" />{label}</button>)}</div>
          <div className="max-h-[420px] overflow-y-auto p-3"><small className="mb-2 block px-2 font-mono text-[9px] text-zinc-400">OBJECT INDEX / 器物索引</small>{visible.map((record) => <button type="button" key={record.id} onClick={() => setActiveId(record.id)} className={`w-full border-b border-zinc-200 px-2 py-3 text-left text-xs leading-5 ${active?.id === record.id ? 'bg-white text-zinc-950' : 'text-zinc-600 hover:bg-white/60'}`}>{record.title}</button>)}</div>
        </aside>

        <div className="relative flex min-h-[390px] flex-col justify-between overflow-hidden bg-zinc-200/70 p-5 md:p-8">
          <span className="absolute inset-0 gemini-dot-field opacity-20" aria-hidden="true" />
          <div className="relative z-10 flex items-start justify-between"><div><small className="font-mono text-[9px] text-zinc-500">RELATIVE STRESS / 相对受力</small><h2 className="mt-1 text-xl font-semibold text-zinc-900">{active?.title || '当前系统暂无记录'}</h2></div><output className="font-mono text-xs text-zinc-600" htmlFor="tackle-load">{load}%</output></div>
          <svg viewBox="0 0 420 220" className="relative z-10 my-5 w-full" role="img" aria-label="钓具受力曲线示意">
            <line x1="20" y1="190" x2="400" y2="190" stroke="rgba(63,63,70,.18)" />
            <motion.path data-testid="tackle-load-path" d={curve} animate={{ d: curve }} transition={{ type: 'spring', damping: 20, stiffness: 90 }} fill="none" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
            <motion.circle animate={{ cx: 400, cy: 34 + load * 0.75 }} transition={{ type: 'spring', damping: 20 }} r="8" fill="#f5f5f7" stroke="#27272a" strokeWidth="3" />
            <path d="M20 176 L20 204 M400 190 L400 204" stroke="#71717a" strokeWidth="2" />
          </svg>
          <label className="relative z-10 block text-[10px] font-mono text-zinc-600" htmlFor="tackle-load">相对负载<input id="tackle-load" aria-label="相对负载" className="mt-3 block w-full accent-zinc-900" type="range" min="0" max="100" value={load} onChange={(event) => setLoad(Number(event.target.value))} /></label>
        </div>

        <aside className="border-t border-zinc-300 bg-white/65 p-6 lg:border-l lg:border-t-0 md:p-8">
          <AnimatePresence><motion.div key={`${active?.id}-${loadState.id}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8, position: 'absolute' }} className="space-y-6"><div><small className="font-mono text-[9px] text-zinc-400">LOAD READING / 负载读数</small><strong className="mt-2 block text-2xl font-semibold text-zinc-900">{loadState.label}</strong><p className="mt-3 text-sm leading-7 text-zinc-600">{loadState.description}</p></div>{active ? <div className="border-t border-zinc-200 pt-5"><small className="font-mono text-[9px] text-zinc-400">SELECTED OBJECT / 当前器物</small><p className="mt-3 text-sm leading-7 text-zinc-700">{active.description}</p><button type="button" onClick={() => onOpen(active)} aria-label={`查看${active.title}详情`} className="mt-5 border-b border-zinc-800 pb-1 text-xs text-zinc-900">查看完整器物记录</button></div> : <p className="text-sm text-zinc-500">该系统尚无可用器物记录。</p>}</motion.div></AnimatePresence>
        </aside>
      </div>
      <p className="border-t border-zinc-300 px-4 py-3 text-[9px] leading-5 text-zinc-500">本台呈现钓组中的相对受力变化，不替代产品参数、现场检查或制造商安全说明。</p>
    </section>
  )
}
