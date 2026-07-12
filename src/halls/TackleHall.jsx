import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { HISTORICAL_OBJECT_IDS } from '../data/history.js'
import TackleStressLab from '../experiences/tackle/TackleStressLab.jsx'
import { tackleSystemFor } from '../experiences/tackle/tackleSystems.js'
import { imageUrl, introParagraphs } from '../lib/content.js'

const METHODS = ['台钓', '传统钓', '路亚', '飞蝇钓', '冰钓', '筏钓', '矶钓', '延绳钓']

export default function TackleHall({ hall, data }) {
  const [selected, setSelected] = useState(null)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const records = useMemo(() => {
    const objects = data['collection-items'].filter((item) => item.collection_type === 'objects' && !HISTORICAL_OBJECT_IDS.includes(item.id)).map((item) => ({ id: item.id, title: item.title, description: introParagraphs(item.body_markdown, 1)[0] || item.summary, image: imageUrl(images.get(item.image_ids[0])), kind: '数字器物' }))
    const baike = data['baike-library'].filter((item) => ['渔具配件', '饵料鱼饵'].includes(item.category_name)).map((item) => ({ id: `baike-${item.article_id}`, title: item.title, description: item.excerpt, image: item.image_urls_local?.[0], kind: item.category_name }))
    return [...objects, ...baike].map((item) => ({ ...item, system: tackleSystemFor(item.title) }))
  }, [data, images])

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-zinc-200/50 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 03 / 第三展厅" title={hall.title} summary={hall.summary}><span className="px-3 py-1.5 bg-white/70 border border-zinc-200 rounded-lg">{records.length} 条器物记录</span><span className="px-3 py-1.5 bg-white/70 border border-zinc-200 rounded-lg">{METHODS.length} 种系统</span></ExhibitHeader>
        <TackleStressLab records={records} onOpen={setSelected} />
        <div className="flex flex-wrap gap-2">{METHODS.map((method) => <span className="px-3 py-1.5 rounded-full border border-zinc-300 bg-white/50 text-[10px] font-mono text-zinc-500" key={method}>{method}</span>)}</div>
      </div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="space-y-6 -mt-5">{selected.image ? <img src={selected.image} alt={selected.title} className="w-full max-h-[360px] object-contain rounded-2xl bg-zinc-50 border border-zinc-200 p-4" /> : null}<span className="text-[10px] font-mono text-zinc-500">{selected.kind}</span><h2 className="text-3xl font-bold text-zinc-900">{selected.title}</h2><p className="text-sm leading-8 text-zinc-600">{selected.description}</p></div> : null}</ObjectDrawer>
    </main>
  )
}
