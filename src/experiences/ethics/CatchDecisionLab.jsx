import { Check, MapPinned, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { JURISDICTIONS } from '../../data/ethics.js'
import { DECISION_CONFIRMATIONS, decisionChecklist } from '../../lib/experienceAdapters.js'

export default function CatchDecisionLab() {
  const [place, setPlace] = useState(JURISDICTIONS[0].place)
  const [confirmations, setConfirmations] = useState({})
  const jurisdiction = JURISDICTIONS.find((item) => item.place === place)
  const state = decisionChecklist({ jurisdiction, confirmations })
  const toggle = (id) => setConfirmations((current) => ({ ...current, [id]: !current[id] }))
  const reset = () => setConfirmations({})

  return (
    <section className="catch-decision" aria-label="鱼获决定实验室">
      <header><div><small>CATCH DECISION LAB / 鱼获决定实验室</small><h2>先把情境查清，再决定怎样行动</h2></div><button type="button" onClick={reset}><RotateCcw aria-hidden="true" />重置确认</button></header>
      <div className="catch-decision__body">
        <aside className="catch-decision__jurisdiction"><label htmlFor="jurisdiction">国家或地区管理模型</label><select id="jurisdiction" aria-label="国家或地区管理模型" value={place} onChange={(event) => { setPlace(event.target.value); reset() }}>{JURISDICTIONS.map((item) => <option key={item.place}>{item.place}</option>)}</select><MapPinned aria-hidden="true" /><small>管理主体 / MANAGER</small><p>{jurisdiction.manager}</p><ol>{jurisdiction.questions.map((question, index) => <li key={question}><span>0{index + 1}</span>{question}</li>)}</ol></aside>
        <div className="catch-decision__checks"><small>情境确认 / CONTEXT CHECK</small><div>{DECISION_CONFIRMATIONS.map((item, index) => <label key={item.id}><span>0{index + 1}</span><strong>{item.label}</strong><input type="checkbox" aria-label={item.label} checked={Boolean(confirmations[item.id])} onChange={() => toggle(item.id)} /></label>)}</div><p>页面只帮助整理核对项。最终要求必须以所选水域管理主体在作钓当日发布的信息为准。</p></div>
        <aside className="catch-decision__readiness"><div><small>核对进度 / READINESS</small><strong>{state.completed} / {state.total} 项已确认</strong><span><i style={{ width: `${state.completed / state.total * 100}%` }} /></span></div>{state.status === 'ready-to-consult' ? <div><Check aria-hidden="true" /><strong>资料已齐备，可以向管理主体核对</strong><p>请打开当地官方页面或联系具体水域管理者，确认当天规则与鱼获处置要求。</p></div> : <div><strong>仍有情境未确认</strong><p>不要用其他水域、其他日期或比赛规则替代当前地点的要求。</p></div>}</aside>
      </div>
    </section>
  )
}
