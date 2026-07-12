import { motion } from 'motion/react'
import { useState } from 'react'

const SIGNALS = {
  静止: { y: 0, rotate: 0, note: '浮漂保持基准位置；仍需结合风、水流与钩饵状态观察。' },
  轻颤: { y: [0, 2, -1, 1, 0], rotate: [0, 1, -1, 0], note: '连续的小幅动作可能来自触碰、试探、水流或小鱼。' },
  下沉: { y: 42, rotate: 1, note: '向下位移只说明受力方向改变，不能单凭一次动作判断对象鱼。' },
  上浮: { y: -30, rotate: -1, note: '上浮可能与钩饵被托起、配重变化或水体扰动有关。' },
}

export default function FloatSignalLab() {
  const [signal, setSignal] = useState('静止')
  const state = SIGNALS[signal]
  return <section className="technique-lab" aria-label="浮漂信号模拟器"><div className="technique-lab-heading"><small>FLOAT SIGNAL / 漂相</small><h2>浮漂信号观察</h2></div><div className="relative h-64 overflow-hidden bg-[#e6efed]" data-state={signal} data-testid="float-signal-stage"><span className="absolute inset-x-0 top-[38%] h-px bg-zinc-500/40" /><motion.span animate={{ y: state.y, rotate: state.rotate }} transition={{ duration: signal === '轻颤' ? 0.55 : 0.7, repeat: signal === '轻颤' ? Infinity : 0 }} className="absolute left-1/2 top-[18%] h-32 w-3 -translate-x-1/2 rounded-full border border-zinc-600 bg-white before:absolute before:inset-x-0 before:top-0 before:h-11 before:rounded-t-full before:bg-zinc-900" /><motion.span key={signal} initial={{ scale: 0.5, opacity: 0.6 }} animate={{ scale: 2.8, opacity: 0 }} transition={{ duration: 1.5 }} className="absolute left-1/2 top-[36%] h-3 w-16 -translate-x-1/2 rounded-full border border-zinc-500" /></div><div className="grid grid-cols-4 gap-px bg-zinc-200">{Object.keys(SIGNALS).map((name) => <button type="button" key={name} aria-label={`观察${name}漂相`} onClick={() => setSignal(name)} className={`min-h-11 bg-white px-2 text-xs ${signal === name ? 'font-semibold text-zinc-950 shadow-[inset_0_-2px_0_#18181b]' : 'text-zinc-500'}`}>{name}</button>)}</div><p className="technique-lab-note">{state.note}</p></section>
}
