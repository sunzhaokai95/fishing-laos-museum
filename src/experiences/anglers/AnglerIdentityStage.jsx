import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'

export default function AnglerIdentityStage({ groups, records, onOpen }) {
  const [groupId, setGroupId] = useState(groups[0].id)
  const group = groups.find((item) => item.id === groupId)
  const visible = useMemo(() => records.filter((record) => record.groupId === groupId || group.recordIds.includes(record.id)), [group.recordIds, groupId, records])
  const [recordId, setRecordId] = useState(null)
  const active = visible.find((item) => item.id === recordId) || visible[0]
  const chooseGroup = (id) => { setGroupId(id); setRecordId(null) }

  return (
    <section className="identity-theatre" aria-label="水边身份图谱">
      <nav className="identity-theatre__groups" aria-label="水边身份分类">
        {groups.map((item, index) => <button type="button" aria-label={item.label} className={groupId === item.id ? 'is-active' : ''} onClick={() => chooseGroup(item.id)} key={item.id}><small>0{index + 1}</small><span>{item.label}</span>{groupId === item.id ? <motion.i layoutId="identity-line" /> : null}</button>)}
      </nav>
      <div className="identity-theatre__stage">
        <aside><span>身份类别 / IDENTITY GROUP</span><h2>{group.label}</h2><p>{group.description}</p></aside>
        <nav aria-label={`${group.label}人物索引`}>
          {visible.length ? visible.map((record, index) => <button type="button" key={record.id} onClick={() => setRecordId(record.id)} className={active?.id === record.id ? 'is-active' : ''}><small>{String(index + 1).padStart(2, '0')}</small><span>{record.title}</span></button>) : <p>该类别的资料仍在整理，不设置虚拟人物。</p>}
        </nav>
        {active ? (
          <motion.article key={active.id} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }}>
            <span className="identity-theatre__ghost" aria-hidden="true">{group.label.slice(0, 2)}</span>
            {active.image ? <img src={active.image} alt={active.title} /> : null}
            <div><small>{active.kind}</small><h2>{active.title}</h2><p>{active.text}</p></div>
            <button type="button" onClick={() => onOpen(active)} aria-label={`查看${active.title}`}>查看完整人物记录 <ArrowUpRight aria-hidden="true" /></button>
          </motion.article>
        ) : null}
      </div>
    </section>
  )
}
