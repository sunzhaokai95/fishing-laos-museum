import { Boxes, CircleDot, Gauge, Link2, PackageOpen, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { HISTORICAL_OBJECT_IDS } from '../data/history.js'
import { imageUrl, introParagraphs } from '../lib/content.js'

const SYSTEMS = [
  { id: '竿', label: '竿', icon: Gauge, test: /竿|杆/ },
  { id: '轮', label: '轮', icon: CircleDot, test: /轮|钓车/ },
  { id: '线', label: '线与结', icon: Link2, test: /线|转环|子线/ },
  { id: '钩', label: '钩', icon: PackageOpen, test: /钩|脱钩|取钩/ },
  { id: '漂坠', label: '漂与坠', icon: Waves, test: /漂|坠|铃/ },
  { id: '饵', label: '饵', icon: Boxes, test: /饵|诱|香虎|九一八|速攻|蓝鲫|水溶袋/ },
  { id: '辅助', label: '辅助工具', icon: Boxes, test: /.*/ },
]

const METHODS = ['台钓', '传统钓', '路亚', '飞蝇钓', '冰钓', '筏钓', '矶钓', '延绳钓']

export default function TackleHall({ hall, data }) {
  const [system, setSystem] = useState('竿')
  const [selected, setSelected] = useState(null)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const objects = data['collection-items'].filter((item) => item.collection_type === 'objects' && !HISTORICAL_OBJECT_IDS.includes(item.id)).map((item) => ({
    id: item.id, title: item.title, description: introParagraphs(item.body_markdown, 1)[0] || item.summary, image: imageUrl(images.get(item.image_ids[0])), kind: '数字器物',
  }))
  const baike = data['baike-library'].filter((item) => ['渔具配件', '饵料鱼饵'].includes(item.category_name)).map((item) => ({
    id: `baike-${item.article_id}`, title: item.title, description: item.excerpt, image: item.image_urls_local?.[0], kind: item.category_name,
  }))
  const records = [...objects, ...baike]
  const activeRule = SYSTEMS.find((item) => item.id === system)
  const visible = records.filter((item) => activeRule.test.test(item.title))

  return (
    <main className="exhibition-scene tackle-scene">
      <header className="scene-intro tackle-intro"><span>第三展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p><div className="scene-stats"><div><strong>{records.length}</strong><span>条器物记录</span></div><div><strong>{METHODS.length}</strong><span>种钓法系统</span></div></div></header>
      <section className="tackle-workbench">
        <nav className="system-switcher" aria-label="钓具系统">
          {SYSTEMS.map(({ id, label, icon: Icon }) => <button type="button" className={system === id ? 'is-active' : ''} onClick={() => setSystem(id)} key={id}><Icon aria-hidden="true" /><span>{label}</span></button>)}
        </nav>
        <div className="tackle-stage">
          <div className="tackle-schematic" aria-hidden="true"><span className="rod-line" /><span className="reel-disc" /><span className="float-pin" /><span className="hook-mark">J</span></div>
          <div className="tackle-records">
            <div className="module-heading"><span>{system}</span><h2>{system === '辅助' ? '工具如何协同工作' : `${system}的形制与作用`}</h2><p>同类记录先并置呈现，本轮不去重。</p></div>
            <div className="object-list">{visible.map((item) => <button type="button" onClick={() => setSelected(item)} key={item.id}><span>{item.kind}</span><strong>{item.title}</strong><p>{item.description}</p></button>)}</div>
          </div>
        </div>
        <div className="method-strip">{METHODS.map((method) => <span key={method}>{method}</span>)}</div>
      </section>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="object-detail">{selected.image ? <img src={selected.image} alt={selected.title} /> : null}<span>{selected.kind}</span><h2>{selected.title}</h2><p>{selected.description}</p></div> : null}</ObjectDrawer>
    </main>
  )
}
