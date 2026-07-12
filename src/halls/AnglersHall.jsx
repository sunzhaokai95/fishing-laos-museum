import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { PEOPLE_GROUPS, PEOPLE_OVERRIDES } from '../data/people.js'
import { introParagraphs } from '../lib/content.js'

export default function AnglersHall({ hall, data }) {
  const [groupId, setGroupId] = useState(PEOPLE_GROUPS[0].id)
  const [selected, setSelected] = useState(null)
  const records = useMemo(() => data['collection-items'].filter((item) => item.collection_type === 'people').map((item) => {
    const override = PEOPLE_OVERRIDES[item.id]
    return { id: item.id, title: override?.title ?? item.title, text: introParagraphs(item.body_markdown, 1)[0], kind: override?.kind ?? '历史人物与形象' }
  }), [data])
  const baikePeople = useMemo(() => data['baike-library'].filter((item) => item.category_name === '钓鱼达人').map((item) => ({ id: `person-${item.article_id}`, title: item.title, text: item.excerpt || '人物资料待进一步整理。', image: item.image_urls_local?.[0], kind: '竞技与行业人物资料' })), [data])
  const group = PEOPLE_GROUPS.find((item) => item.id === groupId)
  const recordMap = new Map(records.map((item) => [item.id, item]))
  const visible = [...group.recordIds.map((id) => recordMap.get(id)).filter(Boolean), ...(group.includeBaike ? baikePeople : [])]
  return <main className="exhibition-scene anglers-scene"><header className="scene-intro anglers-intro"><span>第五展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p><div className="scene-stat"><strong>{records.length + baikePeople.length}</strong><span>条人物与身份记录</span></div></header><section className="portrait-wall"><nav>{PEOPLE_GROUPS.map((item) => <button type="button" className={groupId === item.id ? 'is-active' : ''} onClick={() => setGroupId(item.id)} key={item.id}>{item.label}</button>)}</nav><div className="identity-intro"><span>{group.label}</span><p>{group.description}</p></div><div className="portrait-grid">{visible.map((item, index) => <button type="button" onClick={() => setSelected(item)} key={item.id}><span className="portrait-number">{String(index + 1).padStart(2, '0')}</span>{item.image ? <img src={item.image} alt="" /> : <div className="portrait-silhouette" aria-hidden="true" />}<small>{item.kind}</small><h2>{item.title}</h2><p>{item.text}</p></button>)}</div></section><ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="object-detail">{selected.image ? <img src={selected.image} alt={selected.title} /> : null}<span>{selected.kind}</span><h2>{selected.title}</h2><p>{selected.text}</p></div> : null}</ObjectDrawer></main>
}
