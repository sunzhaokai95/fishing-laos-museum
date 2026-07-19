import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, RotateCcw, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
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
  const imageCount = useMemo(() => fish.filter((item) => item.image_url).length, [fish])
  const visible = useMemo(() => filterFish(fish, filters).filter((item) => !filters.difficulty || fishDifficulty(item).level === Number(filters.difficulty)), [fish, filters])
  const update = (key, value) => { setFilters((current) => ({ ...current, [key]: value })); setLimit(PAGE_SIZE) }
  const reset = () => { setFilters({ query: '', family: '', layer: '', diet: '', difficulty: '' }); setLimit(PAGE_SIZE) }

  return (
    <main className="museum-hall museum-hall--fish fish-theatre" data-motion-language="shoal">
      <header className="fish-theatre__opening">
        <span className="fish-theatre__ghost" aria-hidden="true">鱼类</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
          <span>第二展厅 / 水域标本</span>
          <h1>{hall.title}</h1>
          <p>{hall.summary}</p>
        </motion.div>
        <div className="fish-theatre__counts" aria-label="鱼类馆藏概况">
          <span><strong>{fish.length}</strong>种鱼</span>
          <span><strong>{imageCount}</strong>张图像</span>
          <span><strong>{families.length}</strong>个科</span>
        </div>
      </header>

      <FishOrbitCanopy fish={fish} onSelect={setSelected} />
      <FishStats fish={fish} />

      <section className="fish-catalogue" aria-label="鱼类标本检索">
        <header className="fish-catalogue__heading"><span>馆藏检索 / COLLECTION INDEX</span><h2>从水域进入鱼名</h2></header>
        <div className="fish-filter-dock">
          <label className="fish-search"><Search aria-hidden="true" /><span className="sr-only">搜索鱼类</span><input value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="搜索鱼名、别名或学名" /></label>
          <div className="fish-filter-dock__selects">
            <FilterSelect label="科" value={filters.family} onChange={(value) => update('family', value)} options={families} all="全部科" />
            <FilterSelect label="水层" value={filters.layer} onChange={(value) => update('layer', value)} options={LAYERS} all="全部水层" />
            <FilterSelect label="食性" value={filters.diet} onChange={(value) => update('diet', value)} options={DIETS} all="全部食性" />
            <FilterSelect label="钓获难度" value={filters.difficulty} onChange={(value) => update('difficulty', value)} options={['1', '2', '3', '4', '5']} all="全部难度" format={(value) => `${value} 级`} />
          </div>
          <button type="button" onClick={reset} className="fish-filter-reset" aria-label="重置全部筛选"><RotateCcw aria-hidden="true" /></button>
        </div>

        <div className="fish-catalogue__status"><span>当前水域找到 {visible.length} 种</span><small>钓获难度为五级馆内评估</small></div>
        <motion.div layout className="fish-specimen-grid">
          <AnimatePresence mode="popLayout">
            {visible.slice(0, limit).map((item, index) => {
              const difficulty = fishDifficulty(item)
              return (
                <motion.button
                  layout
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: .96 }}
                  transition={{ duration: .42, delay: Math.min(index * .01, .16) }}
                  className="fish-specimen-sheet"
                  type="button"
                  key={`${item.slug}-${item.list_position}`}
                  onClick={() => setSelected(item)}
                >
                  {item.image_url ? <span className="fish-specimen-sheet__image"><img src={item.image_url} alt={item.name} loading="lazy" /></span> : null}
                  <span className="fish-specimen-sheet__copy">
                    <small>{item.fields?.科 || '科属未录入'}</small>
                    <strong>{item.name}</strong>
                    {item.scientific_name ? <i>{item.scientific_name}</i> : null}
                    <span className="fish-specimen-sheet__difficulty"><em>钓获难度</em><b aria-label={`${difficulty.level}级 ${difficulty.label}`}>{[1, 2, 3, 4, 5].map((level) => <i key={level} className={level <= difficulty.level ? 'is-on' : ''} />)}<small>{difficulty.label}</small></b></span>
                  </span>
                </motion.button>
              )
            })}
          </AnimatePresence>
        </motion.div>
        {limit < visible.length ? <button className="fish-catalogue__more" type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)}>继续展开标本 <ChevronDown aria-hidden="true" /></button> : null}
      </section>

      <ObjectDrawer open={Boolean(selected)} title={selected?.name ?? ''} onClose={() => setSelected(null)}>{selected ? <FishDetail fish={selected} /> : null}</ObjectDrawer>
    </main>
  )
}

function FilterSelect({ label, value, onChange, options, all, format = (option) => option }) {
  return <label><SlidersHorizontal aria-hidden="true" /><span className="sr-only">{label}</span><select aria-label={label} value={value} onChange={(event) => onChange(event.target.value)}><option value="">{all}</option>{options.map((option) => <option key={option} value={option}>{format(option)}</option>)}</select></label>
}

function FishDetail({ fish }) {
  const difficulty = fishDifficulty(fish)
  const facts = [['水层', fish.fields?.水层], ['食性', fish.fields?.食性], ['栖息环境', fish.fields?.栖息环境], ['体长', fish.fields?.体长], ['适温', fish.fields?.适温], ['别名', fish.aliases && fish.aliases !== '未知' ? fish.aliases : null]].filter(([, value]) => value)
  const baits = (fish.bait_options || []).filter((item) => item.length < 20 && !/[：:]/.test(item) && !['实战技巧', '推荐钓点', '相似鱼种'].includes(item)).slice(0, 10)
  return <div className="fish-drawer">{fish.image_url ? <img src={fish.image_url} alt={fish.name} /> : null}<span>{fish.fields?.科}</span><h2>{fish.name}</h2>{fish.scientific_name ? <i>{fish.scientific_name}</i> : null}<p>{fish.summary}</p><section className="fish-drawer__difficulty"><span>馆内钓获难度</span><strong>{difficulty.level} / 5 · {difficulty.label}</strong></section><dl>{facts.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>{baits.length ? <section><h3>常见饵料记录</h3><div>{baits.map((bait) => <span key={bait}>{bait}</span>)}</div></section> : null}{fish.similar_fish?.length ? <section><h3>容易混淆</h3><p>{fish.similar_fish.join('、')}</p></section> : null}</div>
}
