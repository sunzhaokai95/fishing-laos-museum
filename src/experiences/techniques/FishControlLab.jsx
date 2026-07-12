import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function FishControlLab() {
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!running) return undefined
    const timer = window.setInterval(() => setProgress((value) => (value + 2) % 101), 100)
    return () => window.clearInterval(timer)
  }, [running])
  const t = progress / 100 * Math.PI * 2
  const cx = 190 + Math.sin(t) * 110
  const cy = 126 + Math.sin(t * 2) * 62
  return <section className="technique-lab" aria-label="控鱼轨迹模拟器"><div className="technique-lab-heading"><small>FISH CONTROL / 控鱼</small><h2>控鱼轨迹观察</h2></div><div className="relative h-64 bg-zinc-100"><svg viewBox="0 0 380 250" className="h-full w-full" role="img" aria-label="侧向控鱼轨迹示意"><path d="M80 125 C80 30 300 30 300 125 C300 220 80 220 80 125 C80 30 300 30 300 125" fill="none" stroke="rgba(63,63,70,.22)" strokeDasharray="5 8" /><circle cx={cx} cy={cy} r="11" fill="#27272a" /><path d={`M35 215 Q ${cx * .55} ${cy + 15} ${cx} ${cy}`} fill="none" stroke="#52525b" strokeWidth="3" /></svg><output data-testid="fish-control-progress" className="absolute bottom-3 right-4 font-mono text-[9px] text-zinc-500">{progress}</output></div><button type="button" aria-label={running ? '停止控鱼演示' : '开始控鱼演示'} onClick={() => setRunning((value) => !value)} className="flex min-h-12 w-full items-center justify-center gap-2 border-t border-zinc-200 bg-white text-xs text-zinc-800">{running ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}{running ? '停止演示' : '开始演示'}</button><p className="technique-lab-note">轨迹用于观察侧向引导与张力变化，不表示固定画“八字”是通用遛鱼公式。</p></section>
}
