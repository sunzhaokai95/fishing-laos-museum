import { Compass, Sparkles, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { PEOPLE_GROUPS, PEOPLE_OVERRIDES } from '../data/people.js'
import AnglerAssessment from '../experiences/anglers/AnglerAssessment.jsx'
import AnglerIdentityStage from '../experiences/anglers/AnglerIdentityStage.jsx'
import WaterFortuneDraw from '../experiences/anglers/WaterFortuneDraw.jsx'
import { introParagraphs } from '../lib/content.js'

export default function AnglersHall({ hall, data }) {
  const [mode, setMode] = useState('identities')
  const [tool, setTool] = useState('assessment')
  const [selected, setSelected] = useState(null)
  const records = useMemo(() => {
    const people = data['collection-items'].filter((item) => item.collection_type === 'people').map((item) => { const override = PEOPLE_OVERRIDES[item.id]; return { id: item.id, title: override?.title ?? item.title, text: introParagraphs(item.body_markdown, 1)[0], kind: override?.kind ?? '历史人物与形象' } })
    const baike = data['baike-library'].filter((item) => item.category_name === '钓鱼达人').map((item) => ({ id: `person-${item.article_id}`, title: item.title, text: item.excerpt, image: item.image_urls_local?.[0], kind: '竞技与行业人物资料', groupId: 'competition-industry' }))
    return [...people, ...baike]
  }, [data])

  return (
    <main className="museum-hall museum-hall--anglers anglers-theatre" data-motion-language="portraits">
      <header className="anglers-theatre__opening">
        <span className="anglers-theatre__ghost" aria-hidden="true">钓者</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}><span>第五展厅 / 水边身份</span><h1>{hall.title}</h1><p>{hall.summary}</p></motion.div>
        <div><strong>6</strong><span>类水边身份</span></div>
      </header>

      <nav className="anglers-mode-switch" aria-label="第五展厅模式">
        <ModeButton active={mode === 'identities'} onClick={() => setMode('identities')} icon={Users}>身份图谱</ModeButton>
        <ModeButton active={mode === 'reflection'} onClick={() => setMode('reflection')} icon={Compass}>水边自测</ModeButton>
      </nav>

      {mode === 'identities' ? <AnglerIdentityStage groups={PEOPLE_GROUPS} records={records} onOpen={setSelected} /> : (
        <section className="angler-reflection-stage">
          <nav className="hall-submode-switch" aria-label="水边互动工具">
            <ModeButton active={tool === 'assessment'} onClick={() => setTool('assessment')} icon={Compass}>钓者性格测试</ModeButton>
            <ModeButton active={tool === 'fortune'} onClick={() => setTool('fortune')} icon={Sparkles}>今日水边签语</ModeButton>
          </nav>
          <div className="angler-reflection-content">{tool === 'assessment' ? <AnglerAssessment /> : <WaterFortuneDraw />}</div>
        </section>
      )}

      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="angler-drawer">{selected.image ? <img src={selected.image} alt={selected.title} /> : null}<span>{selected.kind}</span><h2>{selected.title}</h2><p>{selected.text}</p></div> : null}</ObjectDrawer>
    </main>
  )
}

function ModeButton({ active, onClick, icon: Icon, children }) {
  return <button type="button" onClick={onClick} aria-pressed={active} className={active ? 'is-active' : ''}><Icon aria-hidden="true" />{children}</button>
}
