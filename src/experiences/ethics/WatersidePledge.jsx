import { motion } from 'motion/react'
import { Award, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WatersidePledge() {
  const [name, setName] = useState('')
  const [phase, setPhase] = useState('idle')
  useEffect(() => {
    if (phase !== 'stamping') return undefined
    const timer = window.setTimeout(() => setPhase('signed'), 600)
    return () => window.clearTimeout(timer)
  }, [phase])
  const submit = (event) => { event.preventDefault(); if (name.trim()) setPhase('stamping') }
  return <section className="grid items-center gap-8 overflow-hidden border-y border-zinc-300 bg-white/65 p-6 md:grid-cols-[1.2fr_.8fr] md:p-10"><div className="space-y-5"><span className="flex items-center gap-2 font-mono text-[9px] text-zinc-500"><Award size={14} aria-hidden="true" />WATERSIDE PLEDGE / 水边承诺</span><h2 className="text-2xl font-semibold text-zinc-900">把水边恢复到来时的样子</h2><p className="text-sm leading-7 text-zinc-600">我会先确认规则，按要求处置鱼获；缩短鱼体离水时间；带走断线、鱼钩、包装和剩余饵料；发现异常水情时，记录并向当地管理部门反映。</p>{phase === 'idle' ? <form onSubmit={submit} className="max-w-lg"><div className="flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="pledge-name">署名</label><input id="pledge-name" aria-label="署名" required maxLength={20} value={name} onChange={(event) => setName(event.target.value)} placeholder="写下姓名或水边称呼" className="h-11 flex-1 border border-zinc-300 bg-white px-4 text-sm outline-none focus:border-zinc-600" /><button type="submit" aria-label="签署承诺" className="h-11 bg-zinc-900 px-5 text-xs text-white">签署承诺</button></div><p className="mt-2 text-[10px] leading-5 text-zinc-500">姓名只用于当前页面生成印记，不会上传或保存。</p></form> : phase === 'stamping' ? <div className="flex items-center gap-3 text-sm text-zinc-700" aria-live="polite"><motion.span animate={{ scale: [1, 1.35, 1] }} transition={{ repeat: Infinity, duration: 0.55 }} className="h-3 w-3 rounded-full bg-red-700" />正在落印</div> : <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800"><CheckCircle2 size={17} />承诺已签署</div>}</div><div className="flex min-h-56 items-center justify-center">{phase === 'signed' ? <motion.div initial={{ scale: 2.2, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: -7, opacity: 1 }} transition={{ type: 'spring', damping: 12 }} className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 border-red-700/70 p-5 text-center text-red-800"><strong className="text-xl">水边守护</strong><span className="mt-2 max-w-[120px] break-words text-sm">{name}</span><small className="mt-3 font-mono text-[8px]">SIGNED LOCALLY</small></motion.div> : <div className="flex h-44 w-44 items-center justify-center rounded-full border border-dashed border-zinc-300 p-8 text-center font-mono text-[10px] text-zinc-400">签署后在当前页面生成数字印记</div>}</div></section>
}
