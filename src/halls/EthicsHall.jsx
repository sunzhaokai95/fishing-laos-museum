import { Binoculars, Fish, MapPinned, Scale, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'
import { ETHICS_SECTIONS, LAW_HISTORY } from '../data/ethics.js'
import CatchDecisionLab from '../experiences/ethics/CatchDecisionLab.jsx'
import WatersidePledge from '../experiences/ethics/WatersidePledge.jsx'

const SECTION_ICONS = { 'locate-rule': MapPinned, 'decide-catch': Scale, 'care-for-fish': Fish, 'tackle-afterlife': Trash2, 'watch-water': Binoculars }

export default function EthicsHall({ hall }) {
  return (
    <main className="museum-hall museum-hall--ethics ethics-theatre" data-motion-language="judgment">
      <header className="ethics-theatre__opening">
        <span className="ethics-theatre__ghost" aria-hidden="true">之后</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}><span>第七展厅 / 法理与环境</span><h1>{hall.title}</h1><p>钓获不是故事的终点。法律决定最低边界，鱼体处置与水域变化则追问人在合法之外还应怎样行动。</p></motion.div>
      </header>

      <section className="law-history-stage">
        <header><span>RULES THROUGH TIME</span><h2>规则为何出现</h2><p>不同时代的规则保护过资源、税赋、权力、祭祀空间和公共安全，它们并不共享同一种理由。</p></header>
        <div>{LAW_HISTORY.map((item, index) => <motion.article initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} key={item.period}><span>{String(index + 1).padStart(2, '0')}</span><small>{item.period}</small><h3>{item.title}</h3><p>{item.text}</p></motion.article>)}</div>
      </section>

      <CatchDecisionLab />

      <section className="ethics-consequences">
        <header><span>FROM CAST TO DEPARTURE</span><h2>法律边界之后，还有五个判断</h2></header>
        <div>{ETHICS_SECTIONS.map((section, index) => { const Icon = SECTION_ICONS[section.id]; return <motion.article whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true }} key={section.id}><div><span>0{index + 1}</span><Icon aria-hidden="true" /></div><h3>{section.title}</h3><strong>{section.question}</strong><p>{section.text}</p></motion.article> })}</div>
      </section>
      <WatersidePledge />
    </main>
  )
}
