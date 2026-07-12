import { motion } from 'motion/react'
import { useState } from 'react'

function labelFor(value) {
  if (value >= 70) return '快速散开'
  if (value >= 35) return '逐层释放'
  return '缓慢保持'
}

export default function BaitDispersionLab() {
  const [value, setValue] = useState(48)
  const label = labelFor(value)
  return <section className="technique-lab" aria-label="饵料状态模拟器"><div className="technique-lab-heading"><small>BAIT STATE / 饵料状态</small><h2>饵料状态观察</h2></div><div className="relative h-64 overflow-hidden bg-zinc-100"><motion.span animate={{ scale: 0.78 + value / 130, opacity: 1 - value / 170 }} className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-700" />{Array.from({ length: 22 }, (_, index) => { const angle = index * 2.4; const radius = 18 + value * (0.32 + (index % 5) / 30); return <motion.i key={index} animate={{ x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, opacity: 0.25 + value / 150 }} transition={{ duration: 0.8 }} className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-zinc-600" /> })}<span className="absolute bottom-4 left-4 font-mono text-[9px] text-zinc-500">水下释放示意</span></div><label className="block border-t border-zinc-200 bg-white p-4 text-[10px] font-mono text-zinc-600">雾化速度<input aria-label="雾化速度" type="range" min="0" max="100" value={value} onChange={(event) => setValue(Number(event.target.value))} className="mt-3 block w-full accent-zinc-900" /></label><p className="technique-lab-note"><strong className="mr-2 text-zinc-900">{label}</strong>该示意只比较相对释放状态；水深、水流与饵料配方会改变实际结果。</p></section>
}
