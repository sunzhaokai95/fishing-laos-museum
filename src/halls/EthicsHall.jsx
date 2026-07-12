import { motion } from 'motion/react'
import { Binoculars, Fish, MapPinned, Scale, Trash2 } from 'lucide-react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import { ETHICS_SECTIONS, LAW_HISTORY } from '../data/ethics.js'
import CatchDecisionLab from '../experiences/ethics/CatchDecisionLab.jsx'
import WatersidePledge from '../experiences/ethics/WatersidePledge.jsx'

const SECTION_ICONS = { 'locate-rule': MapPinned, 'decide-catch': Scale, 'care-for-fish': Fish, 'tackle-afterlife': Trash2, 'watch-water': Binoculars }

export default function EthicsHall({ hall }) {
  return <main className="min-h-screen bg-[#f5f5f7] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans"><div className="absolute top-[30%] -left-48 w-[38rem] h-[38rem] rounded-full bg-zinc-200/45 blur-[150px] pointer-events-none" /><div className="max-w-7xl mx-auto relative z-10 space-y-16"><ExhibitHeader eyebrow="HALL 07 / 第七展厅" title={hall.title} summary="钓获不是故事的终点。法律决定最低边界，鱼体处置与水域变化则追问人在合法之外还应怎样行动。" />
    <section className="grid lg:grid-cols-[280px_1fr] gap-8"><div className="lg:sticky lg:top-24 self-start"><span className="text-[10px] font-mono text-zinc-500">RULES THROUGH TIME</span><h2 className="text-3xl font-bold text-zinc-900 mt-2">规则为何出现</h2><p className="text-sm leading-7 text-zinc-600 mt-4">不同时代的规则保护过资源、税赋、权力、祭祀空间和公共安全，它们并不共享同一种理由。</p></div><div className="relative pl-7 border-l border-zinc-300 space-y-8">{LAW_HISTORY.map((item, index) => <motion.article initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={item.period} className="relative pb-8 border-b border-zinc-200"><span className="absolute -left-[34px] top-1 w-3.5 h-3.5 rounded-full bg-white border border-zinc-400" /><span className="text-[10px] font-mono text-zinc-500">{String(index + 1).padStart(2, '0')} / {item.period}</span><h3 className="text-lg font-bold text-zinc-900 mt-2">{item.title}</h3><p className="text-sm leading-7 text-zinc-600 mt-3">{item.text}</p></motion.article>)}</div></section>
    <CatchDecisionLab />
    <section><div className="max-w-2xl mb-7"><span className="text-[10px] font-mono text-zinc-500">FROM CAST TO DEPARTURE</span><h2 className="text-3xl font-bold text-zinc-900 mt-2">法律边界之后，还有五个判断</h2></div><div className="grid md:grid-cols-5 gap-px bg-zinc-300 border border-zinc-300">{ETHICS_SECTIONS.map((section, index) => { const Icon = SECTION_ICONS[section.id]; return <motion.article whileHover={{ y: -5 }} key={section.id} className="bg-zinc-50 p-5 md:min-h-[330px] flex flex-col justify-between"><div className="flex items-center justify-between"><span className="text-[9px] font-mono text-zinc-400">0{index + 1}</span><Icon size={18} className="text-zinc-500" /></div><div><h3 className="text-base font-bold text-zinc-900">{section.title}</h3><strong className="block text-xs leading-6 text-zinc-700 mt-3">{section.question}</strong><p className="text-xs leading-6 text-zinc-500 mt-3">{section.text}</p></div></motion.article> })}</div></section>
    <WatersidePledge />
  </div></main>
}
