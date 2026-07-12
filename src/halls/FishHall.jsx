import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, RotateCcw, Search, SlidersHorizontal, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import FishOrbitCanopy from '../experiences/fish/FishOrbitCanopy.jsx'
import FishStats from '../experiences/fish/FishStats.jsx'
import { filterFish, uniqueValues } from '../lib/exhibition.js'
import { fishDifficulty } from '../lib/fishDifficulty.js'

const PAGE_SIZE = 32
const LAYERS = ['上层', '中层', '中下层', '底层', '近底层']
const DIETS = ['杂食', '肉食', '草食', '滤食']

export default function FishHall({ hall, data }) {
  const fish = data['fish-library']
  const [filters, setFilters] = useState({ query: '', family: '', layer: '', diet: '', difficulty: '' })
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)
  const families = useMemo(() => uniqueValues(fish, (item) => item.fields?.科), [fish])
  const visible = useMemo(() => filterFish(fish, filters).filter((item) => !filters.difficulty || fishDifficulty(item).level === Number(filters.difficulty)), [fish, filters])
  const update = (key, value) => { setFilters((current) => ({ ...current, [key]: value })); setLimit(PAGE_SIZE) }
  const reset = () => { setFilters({ query: '', family: '', layer: '', diet: '', difficulty: '' }); setLimit(PAGE_SIZE) }

  return (
    <main className="min-h-screen bg-[#eef4f5] text-zinc-800 px-4 md:px-8 py-14 md:py-20 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true"><span className="absolute top-32 left-[8%] w-72 h-72 rounded-full bg-cyan-100/70 blur-[120px] animate-pulse" /><span className="absolute top-[38rem] right-[-8rem] w-96 h-96 rounded-full bg-sky-100/60 blur-[130px]" /><span className="fish-current fish-current-one" /><span className="fish-current fish-current-two" /></div>
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        <ExhibitHeader eyebrow="HALL 02 / 第二展厅" title={hall.title} summary={hall.summary}>
          <span className="px-3 py-1.5 bg-white/80 border border-zinc-200 rounded-lg">{fish.length} 种鱼</span><span className="px-3 py-1.5 bg-white/80 border border-zinc-200 rounded-lg">{families.length} 个科</span><span className="px-3 py-1.5 bg-white/80 border border-zinc-200 rounded-lg">{fish.filter((item) => item.image_url).length} 张图像</span>
        </ExhibitHeader>

        <FishStats fish={fish} />
        <FishOrbitCanopy fish={fish} onSelect={setSelected} />

        <section className="space-y-7" aria-label="鱼类标本检索">
          <div className="sticky top-[65px] z-20 bg-white/90 backdrop-blur-xl border border-zinc-200/80 p-3 md:p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(240px,1fr)_repeat(4,minmax(120px,auto))_auto] gap-3">
            <label className="relative flex items-center"><Search className="absolute left-3.5 text-zinc-400" size={16} aria-hidden="true" /><input className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-white text-sm outline-none focus:border-zinc-500" value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="搜索鱼名、别名或学名" /></label>
            <FilterSelect label="科" value={filters.family} onChange={(value) => update('family', value)} options={families} all="全部科" />
            <FilterSelect label="水层" value={filters.layer} onChange={(value) => update('layer', value)} options={LAYERS} all="全部水层" />
            <FilterSelect label="食性" value={filters.diet} onChange={(value) => update('diet', value)} options={DIETS} all="全部食性" />
            <FilterSelect label="钓获难度" value={filters.difficulty} onChange={(value) => update('difficulty', value)} options={['1', '2', '3', '4', '5']} all="全部难度" format={(value) => `${value} 级`} />
            <button type="button" onClick={reset} className="inline-flex h-11 items-center justify-center gap-2 border border-zinc-200 bg-white px-3 text-xs text-zinc-600 hover:border-zinc-500" aria-label="重置全部筛选"><RotateCcw size={14} aria-hidden="true" />重置</button>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-300/70 pb-3 text-[10px] font-mono text-zinc-500"><span className="flex items-center gap-2"><Waves size={14} aria-hidden="true" />当前水域找到 {visible.length} 种</span><span>馆内钓获难度为五级策展评估</span></div>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.slice(0, limit).map((item, index) => {
                const difficulty = fishDifficulty(item)
                return <motion.button layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35, delay: Math.min(index * 0.012, 0.18) }} whileHover={{ y: -4 }} className="group text-left bg-white/85 border border-zinc-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg hover:border-zinc-300 transition-shadow min-w-0" type="button" key={`${item.slug}-${item.list_position}`} onClick={() => setSelected(item)}>
                  {item.image_url ? <div className="aspect-[4/3] overflow-hidden bg-white"><img src={item.image_url} alt={item.name} loading="lazy" className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-700" /></div> : null}
                  <div className="p-3.5 md:p-4 space-y-2.5"><small className="block text-[9px] text-zinc-500 font-mono truncate">{item.fields?.科 || '科属未录入'}</small><div className="min-w-0"><h2 className="text-sm md:text-base font-bold text-zinc-900 truncate">{item.name}</h2>{item.scientific_name ? <p className="text-[9px] md:text-[10px] italic text-zinc-400 font-mono truncate mt-1">{item.scientific_name}</p> : null}</div><div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2 text-[9px] font-mono"><span className="text-zinc-500">钓获难度</span><span className="flex items-center gap-1.5 text-zinc-800"><i className="flex gap-0.5" aria-hidden="true">{[1, 2, 3, 4, 5].map((level) => <b key={level} className={`w-1.5 h-1.5 rounded-full ${level <= difficulty.level ? 'bg-zinc-800' : 'bg-zinc-200'}`} />)}</i>{difficulty.label}</span></div></div>
                </motion.button>
              })}
            </AnimatePresence>
          </motion.div>
          {limit < visible.length ? <button className="mx-auto px-7 py-3 rounded-full bg-zinc-900 text-white text-xs font-mono flex items-center gap-2 hover:bg-zinc-800" type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)}>继续展开标本 <ChevronDown size={15} aria-hidden="true" /></button> : null}
        </section>
      </div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.name ?? ''} onClose={() => setSelected(null)}>{selected ? <FishDetail fish={selected} /> : null}</ObjectDrawer>
    </main>
  )
}

function FilterSelect({ label, value, onChange, options, all, format = (option) => option }) {
  return <label className="relative flex items-center"><SlidersHorizontal className="absolute left-3 text-zinc-400" size={13} aria-hidden="true" /><span className="sr-only">{label}</span><select aria-label={label} className="w-full h-11 pl-9 pr-8 rounded-xl border border-zinc-200 bg-white text-xs text-zinc-700 outline-none focus:border-zinc-500" value={value} onChange={(event) => onChange(event.target.value)}><option value="">{all}</option>{options.map((option) => <option key={option} value={option}>{format(option)}</option>)}</select></label>
}

function FishDetail({ fish }) {
  const difficulty = fishDifficulty(fish)
  const facts = [['水层', fish.fields?.水层], ['食性', fish.fields?.食性], ['栖息环境', fish.fields?.栖息环境], ['体长', fish.fields?.体长], ['适温', fish.fields?.适温], ['别名', fish.aliases && fish.aliases !== '未知' ? fish.aliases : null]].filter(([, value]) => value)
  const baits = (fish.bait_options || []).filter((item) => item.length < 20 && !/[：:]/.test(item) && !['实战技巧', '推荐钓点', '相似鱼种'].includes(item)).slice(0, 10)
  return <div className="space-y-7 -mt-5">{fish.image_url ? <img src={fish.image_url} alt={fish.name} className="w-full aspect-video object-contain bg-zinc-50 rounded-2xl border border-zinc-200 p-5" /> : null}<div><span className="text-[10px] font-mono text-zinc-500">{fish.fields?.科}</span><h2 className="text-3xl font-bold text-zinc-900 mt-1">{fish.name}</h2>{fish.scientific_name ? <p className="font-mono text-xs italic text-zinc-400 mt-1">{fish.scientific_name}</p> : null}</div><p className="text-sm leading-7 text-zinc-600 font-light">{fish.summary}</p><section className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200"><div className="flex items-center justify-between text-xs"><span className="font-mono text-zinc-500">馆内钓获难度</span><strong>{difficulty.level} / 5 · {difficulty.label}</strong></div></section><dl className="grid grid-cols-2 gap-px bg-zinc-200 border border-zinc-200 rounded-2xl overflow-hidden">{facts.map(([term, value]) => <div className="bg-white p-4 min-w-0" key={term}><dt className="text-[9px] font-mono text-zinc-400 mb-1">{term}</dt><dd className="text-xs leading-relaxed break-words">{value}</dd></div>)}</dl>{baits.length ? <section className="space-y-3"><h3 className="text-xs font-mono text-zinc-500">常见饵料记录</h3><div className="flex flex-wrap gap-2">{baits.map((bait) => <span className="px-2.5 py-1.5 rounded-lg bg-zinc-100 text-xs" key={bait}>{bait}</span>)}</div></section> : null}{fish.similar_fish?.length ? <section className="space-y-2"><h3 className="text-xs font-mono text-zinc-500">容易混淆</h3><p className="text-sm text-zinc-700">{fish.similar_fish.join('、')}</p></section> : null}</div>
}
