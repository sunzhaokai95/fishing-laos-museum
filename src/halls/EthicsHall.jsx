import { motion } from 'motion/react'
import { Binoculars, Fish, MapPinned, Scale, Trash2 } from 'lucide-react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import { ETHICS_SECTIONS, LAW_HISTORY } from '../data/ethics.js'
import CatchDecisionLab from '../experiences/ethics/CatchDecisionLab.jsx'
import WatersidePledge from '../experiences/ethics/WatersidePledge.jsx'

const SECTION_ICONS = {
  'locate-rule': MapPinned,
  'decide-catch': Scale,
  'care-for-fish': Fish,
  'tackle-afterlife': Trash2,
  'watch-water': Binoculars,
}

export default function EthicsHall({ hall }) {
  return (
    <main className="museum-hall museum-hall--ethics min-h-screen" data-motion-language="judgment">
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <ExhibitHeader
          eyebrow="HALL 07 / 第七展厅"
          title={hall.title}
          summary="钓获不是故事的终点。法律决定最低边界，鱼体处置与水域变化则追问人在合法之外还应怎样行动。"
        />
        <section className="law-history-stage">
          <div className="law-history-intro">
            <span>RULES THROUGH TIME</span>
            <h2>规则为何出现</h2>
            <p>不同时代的规则保护过资源、税赋、权力、祭祀空间和公共安全，它们并不共享同一种理由。</p>
          </div>
          <div className="law-history-line">
            {LAW_HISTORY.map((item, index) => (
              <motion.article
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={item.period}
              >
                <span>{String(index + 1).padStart(2, '0')} / {item.period}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </div>
        </section>
        <CatchDecisionLab />
        <section className="ethics-consequences">
          <div>
            <span>FROM CAST TO DEPARTURE</span>
            <h2>法律边界之后，还有五个判断</h2>
          </div>
          <div className="ethics-consequence-list">
            {ETHICS_SECTIONS.map((section, index) => {
              const Icon = SECTION_ICONS[section.id]
              return (
                <motion.article whileHover={{ y: -5 }} key={section.id}>
                  <div><span>0{index + 1}</span><Icon size={18} /></div>
                  <h3>{section.title}</h3>
                  <strong>{section.question}</strong>
                  <p>{section.text}</p>
                </motion.article>
              )
            })}
          </div>
        </section>
        <WatersidePledge />
      </div>
    </main>
  )
}
