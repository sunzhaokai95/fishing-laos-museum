import { AnimatePresence, motion } from 'motion/react'
import { Boxes, CircleDot, Gauge, Link2, PackageOpen, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { HISTORICAL_OBJECT_IDS } from '../data/history.js'
import { imageUrl, introParagraphs } from '../lib/content.js'

const SYSTEMS = [
  { id: '竿', label: '竿', icon: Gauge, test: /竿|杆/ }, { id: '轮', label: '轮', icon: CircleDot, test: /轮|钓车/ }, { id: '线', label: '线与结', icon: Link2, test: /线|转环|子线/ }, { id: '钩', label: '钩', icon: PackageOpen, test: /钩|脱钩|取钩/ }, { id: '漂坠', label: '漂与坠', icon: Waves, test: /漂|坠|铃/ }, { id: '饵', label: '饵', icon: Boxes, test: /饵|诱|香虎|九一八|速攻|蓝鲫|水溶袋/ }, { id: '辅助', label: '辅助工具', icon: Boxes, test: /.*/ },
]
const METHODS = ['台钓', '传统钓', '路亚', '飞蝇钓', '冰钓', '筏钓', '矶钓', '延绳钓']

export default function TackleHall({ hall, data }) {
  const [system, setSystem] = useState('竿')
  const [selected, setSelected] = useState(null)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const records = useMemo(() => {
    const objects = data['collection-items'].filter((item) => item.collection_type === 'objects' && !HISTORICAL_OBJECT_IDS.includes(item.id)).map((item) => ({ id: item.id, title: item.title, description: introParagraphs(item.body_markdown, 1)[0] || item.summary, image: imageUrl(images.get(item.image_ids[0])), kind: '数字器物' }))
    const baike = data['baike-library'].filter((item) => ['渔具配件', '饵料鱼饵'].includes(item.category_name)).map((item) => ({ id: `baike-${item.article_id}`, title: item.title, description: item.excerpt, image: item.image_urls_local?.[0], kind: item.category_name }))
    return [...objects, ...baike]
  }, [data, images])
  const activeRule = SYSTEMS.find((item) => item.id === system)
  const visible = records.filter((item) => activeRule.test.test(item.title))

  return (
    <main className="min-h-screen bg-[#f3f1ed] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans">
      <div className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full bg-stone-200/70 blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 03 / 第三展厅" title={hall.title} summary={hall.summary}><span className="px-3 py-1.5 bg-white/70 border border-stone-200 rounded-lg">{records.length} 条器物记录</span><span className="px-3 py-1.5 bg-white/70 border border-stone-200 rounded-lg">{METHODS.length} 种系统</span></ExhibitHeader>
        <section className="grid lg:grid-cols-[210px_1fr] gap-5 md:gap-8" aria-label="钓具拆解台">
          <nav className="grid grid-cols-4 lg:grid-cols-1 gap-2 self-start lg:sticky lg:top-24" aria-label="钓具系统">{SYSTEMS.map(({ id, label, icon: Icon }) => <button type="button" className={`relative min-h-14 px-3 py-3 rounded-xl border flex flex-col lg:flex-row items-center gap-2 text-[10px] lg:text-xs transition-all ${system === id ? 'bg-zinc-900 border-zinc-900 text-white shadow-md' : 'bg-white/65 border-stone-200 text-zinc-600 hover:bg-white'}`} onClick={() => setSystem(id)} key={id}><Icon size={16} aria-hidden="true" /><span>{label}</span>{system === id ? <motion.i layoutId="tackle-active" className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-zinc-900 hidden lg:block" /> : null}</button>)}</nav>
          <div className="space-y-7 min-w-0">
            <div className="relative min-h-[330px] md:min-h-[390px] bg-white/55 border border-stone-200 rounded-2xl overflow-hidden grid md:grid-cols-[minmax(260px,0.8fr)_1fr]">
              <TackleDiagram system={system} />
              <div className="p-6 md:p-9 flex flex-col justify-center border-t md:border-t-0 md:border-l border-stone-200"><AnimatePresence mode="wait"><motion.div key={system} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.35 }} className="space-y-4"><span className="text-[10px] font-mono text-zinc-500">ACTIVE MODULE / {system}</span><h2 className="text-2xl md:text-3xl font-bold text-zinc-900">{system === '辅助' ? '工具如何协同工作' : `${system}的形制与作用`}</h2><p className="text-sm leading-7 font-light text-zinc-600">选择一条记录，查看器物在钓组中的位置、形制与作用。历史证据留在第一展厅，这里只讨论现在手中的系统。</p></motion.div></AnimatePresence></div>
            </div>
            <motion.div layout className="divide-y divide-stone-200 border-y border-stone-200"><AnimatePresence mode="popLayout">{visible.map((item, index) => <motion.button layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.18) }} type="button" onClick={() => setSelected(item)} key={item.id} className="w-full text-left py-5 grid md:grid-cols-[110px_220px_1fr] gap-2 md:gap-6 group"><span className="text-[9px] font-mono text-zinc-400">{item.kind}</span><strong className="text-sm text-zinc-900 group-hover:translate-x-1 transition-transform">{item.title}</strong><p className="text-xs leading-6 text-zinc-600 line-clamp-2">{item.description}</p></motion.button>)}</AnimatePresence></motion.div>
            <div className="flex flex-wrap gap-2">{METHODS.map((method) => <span className="px-3 py-1.5 rounded-full border border-stone-300 bg-white/50 text-[10px] font-mono text-zinc-500" key={method}>{method}</span>)}</div>
          </div>
        </section>
      </div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="space-y-6 -mt-5">{selected.image ? <img src={selected.image} alt={selected.title} className="w-full max-h-[360px] object-contain rounded-2xl bg-stone-50 border border-stone-200 p-4" /> : null}<span className="text-[10px] font-mono text-zinc-500">{selected.kind}</span><h2 className="text-3xl font-bold text-zinc-900">{selected.title}</h2><p className="text-sm leading-8 text-zinc-600">{selected.description}</p></div> : null}</ObjectDrawer>
    </main>
  )
}

function TackleDiagram({ system }) {
  return <div className="relative min-h-[270px] md:min-h-full overflow-hidden bg-[#e9e6df]" aria-hidden="true"><span className="absolute inset-0 gemini-dot-field opacity-25" /><motion.span animate={{ rotate: system === '竿' ? -6 : -18, y: system === '竿' ? 0 : 10 }} transition={{ type: 'spring', damping: 18 }} className="absolute left-[8%] top-[30%] w-[78%] h-1 bg-zinc-800 origin-left rounded-full" /><motion.span animate={{ height: system === '线' ? '68%' : '48%', opacity: system === '线' || system === '钩' || system === '漂坠' ? 1 : 0.48 }} className="absolute left-[58%] top-[31%] w-px bg-zinc-700" /><motion.span animate={{ scale: system === '轮' ? 1.35 : 1, opacity: system === '轮' ? 1 : 0.52 }} className="absolute left-[31%] top-[35%] w-16 h-16 rounded-full border-[6px] border-zinc-700 bg-stone-100 shadow-inner" /><motion.span animate={{ y: system === '漂坠' ? [0, -8, 0] : 0, scale: system === '漂坠' ? 1.3 : 1 }} transition={{ repeat: system === '漂坠' ? Infinity : 0, duration: 2.3 }} className="absolute left-[56.5%] top-[58%] w-3 h-14 rounded-full bg-white border border-zinc-500 before:absolute before:top-0 before:left-0 before:right-0 before:h-5 before:bg-zinc-900 before:rounded-t-full" /><motion.span animate={{ scale: system === '钩' ? 1.45 : 1, rotate: system === '钩' ? 8 : 0 }} className="absolute left-[56%] bottom-[8%] text-5xl font-serif text-zinc-800">J</motion.span><span className="absolute left-5 bottom-5 text-[9px] font-mono text-zinc-500">SYSTEM ASSEMBLY / {system}</span></div>
}
