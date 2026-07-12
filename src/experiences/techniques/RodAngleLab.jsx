import { motion } from 'motion/react'
import { useState } from 'react'

function angleState(angle) {
  if (angle >= 70) return ['高角度风险', '竿尖接近高位时，局部弯曲和操作余量需要格外留意。']
  if (angle <= 28) return ['近直线受力', '竿线接近直线时，竿身参与缓冲的程度下降。']
  return ['缓冲区间', '竿身、钓线和泄力共同参与相对平稳的张力传递。']
}

export default function RodAngleLab() {
  const [angle, setAngle] = useState(48)
  const [label, note] = angleState(angle)
  const radians = angle * Math.PI / 180
  const x = 38 + Math.cos(radians) * 290
  const y = 205 - Math.sin(radians) * 175
  return <section className="technique-lab" aria-label="竿角模拟器"><div className="technique-lab-heading"><small>ROD ANGLE / 竿身角度</small><h2>竿角与张力观察</h2></div><div className="h-64 bg-[#e9ece6] p-4"><svg viewBox="0 0 380 230" className="h-full w-full" role="img" aria-label="竿身角度示意"><path d="M38 205 H354" stroke="rgba(63,63,70,.25)" /><motion.path animate={{ d: `M38 205 Q ${x * .58} ${y + 12} ${x} ${y}` }} d={`M38 205 Q ${x * .58} ${y + 12} ${x} ${y}`} fill="none" stroke="#27272a" strokeWidth="6" strokeLinecap="round" /><motion.line animate={{ x1: x, y1: y }} x1={x} y1={y} x2="350" y2="205" stroke="#71717a" strokeWidth="1.5" /></svg></div><label className="block border-t border-zinc-200 bg-white p-4 text-[10px] font-mono text-zinc-600">竿身角度 <output>{angle}°</output><input aria-label="竿身角度" type="range" min="15" max="85" value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="mt-3 block w-full accent-zinc-900" /></label><p className="technique-lab-note"><strong className="mr-2 text-zinc-900">{label}</strong>{note}</p></section>
}
