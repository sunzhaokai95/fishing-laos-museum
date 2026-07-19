import { motion } from 'motion/react'
import { Award, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function WatersidePledge() {
  const [name, setName] = useState('')
  const [phase, setPhase] = useState('idle')
  useEffect(() => { if (phase !== 'stamping') return undefined; const timer = window.setTimeout(() => setPhase('signed'), 600); return () => window.clearTimeout(timer) }, [phase])
  const submit = (event) => { event.preventDefault(); if (name.trim()) setPhase('stamping') }
  return (
    <section className="waterside-pledge">
      <div><span><Award aria-hidden="true" />WATERSIDE PLEDGE / 水边承诺</span><h2>把水边恢复到来时的样子</h2><p>我会先确认规则，按要求处置鱼获；缩短鱼体离水时间；带走断线、鱼钩、包装和剩余饵料；发现异常水情时，记录并向当地管理部门反映。</p>{phase === 'idle' ? <form onSubmit={submit}><label className="sr-only" htmlFor="pledge-name">署名</label><input id="pledge-name" aria-label="署名" required maxLength={20} value={name} onChange={(event) => setName(event.target.value)} placeholder="写下姓名或水边称呼" /><button type="submit" aria-label="签署承诺">签署承诺</button><p>姓名只用于当前页面生成印记，不会上传或保存。</p></form> : phase === 'stamping' ? <div className="waterside-pledge__stamping" aria-live="polite"><motion.span animate={{ scale: [1, 1.35, 1] }} transition={{ repeat: Infinity, duration: .55 }} />正在落印</div> : <div className="waterside-pledge__signed"><CheckCircle2 aria-hidden="true" />承诺已签署</div>}</div>
      <div className="waterside-pledge__mark">{phase === 'signed' ? <motion.div initial={{ scale: 2.2, rotate: -20, opacity: 0 }} animate={{ scale: 1, rotate: -7, opacity: 1 }} transition={{ type: 'spring', damping: 12 }}><strong>水边守护</strong><span>{name}</span><small>SIGNED LOCALLY</small></motion.div> : <span>签署后在当前页面生成数字印记</span>}</div>
    </section>
  )
}
