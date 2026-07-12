import { ChevronDown, Search, Waves } from 'lucide-react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { filterFish, uniqueValues } from '../lib/exhibition.js'

const PAGE_SIZE = 32
const LAYERS = ['上层', '中层', '中下层', '底层', '近底层']
const DIETS = ['杂食', '肉食', '草食', '滤食']

export default function FishHall({ hall, data }) {
  const fish = data['fish-library']
  const [filters, setFilters] = useState({ query: '', family: '', layer: '', diet: '' })
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [selected, setSelected] = useState(null)
  const families = useMemo(() => uniqueValues(fish, (item) => item.fields?.科), [fish])
  const visible = useMemo(() => filterFish(fish, filters), [fish, filters])
  const update = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
    setLimit(PAGE_SIZE)
  }

  return (
    <main className="exhibition-scene fish-scene">
      <header className="scene-intro fish-intro">
        <span>第二展厅</span>
        <h1>{hall.title}</h1>
        <p>{hall.summary}</p>
        <div className="scene-stats">
          <div><strong>{fish.length}</strong><span>种鱼</span></div>
          <div><strong>{families.length}</strong><span>个科</span></div>
          <div><strong>{fish.filter((item) => item.image_url).length}</strong><span>张标本图</span></div>
        </div>
      </header>

      <section className="fish-observatory">
        <div className="fish-controls">
          <label className="search-control">
            <Search aria-hidden="true" />
            <input value={filters.query} onChange={(event) => update('query', event.target.value)} placeholder="搜索鱼名、别名或学名" />
          </label>
          <label><span>科</span><select value={filters.family} onChange={(event) => update('family', event.target.value)}><option value="">全部215个科</option>{families.map((family) => <option key={family}>{family}</option>)}</select></label>
          <label><span>水层</span><select value={filters.layer} onChange={(event) => update('layer', event.target.value)}><option value="">全部水层</option>{LAYERS.map((layer) => <option key={layer}>{layer}</option>)}</select></label>
          <label><span>食性</span><select value={filters.diet} onChange={(event) => update('diet', event.target.value)}><option value="">全部食性</option>{DIETS.map((diet) => <option key={diet}>{diet}</option>)}</select></label>
        </div>
        <div className="result-line"><Waves aria-hidden="true" /><span>当前水域找到 {visible.length} 种</span></div>
        <div className="fish-specimen-grid">
          {visible.slice(0, limit).map((item) => (
            <button className="fish-specimen" type="button" key={`${item.slug}-${item.list_position}`} onClick={() => setSelected(item)}>
              <div className="specimen-image">{item.image_url ? <img src={item.image_url} alt={item.name} loading="lazy" /> : <span>图像待补</span>}</div>
              <div><small>{item.fields?.科 || '科属待整理'}</small><h2>{item.name}</h2><p>{item.scientific_name}</p></div>
            </button>
          ))}
        </div>
        {limit < visible.length ? <button className="load-more" type="button" onClick={() => setLimit((value) => value + PAGE_SIZE)}>继续展开标本 <ChevronDown aria-hidden="true" /></button> : null}
      </section>

      <ObjectDrawer open={Boolean(selected)} title={selected?.name ?? ''} onClose={() => setSelected(null)}>
        {selected ? <FishDetail fish={selected} /> : null}
      </ObjectDrawer>
    </main>
  )
}

function FishDetail({ fish }) {
  return (
    <div className="fish-detail">
      <div className="drawer-object-image">{fish.image_url ? <img src={fish.image_url} alt={fish.name} /> : null}</div>
      <span>{fish.fields?.科}</span><h2>{fish.name}</h2><p className="scientific-name">{fish.scientific_name}</p>
      <p className="drawer-lead">{fish.summary}</p>
      <dl className="fish-facts">
        <div><dt>水层</dt><dd>{fish.fields?.水层 || '待整理'}</dd></div>
        <div><dt>食性</dt><dd>{fish.fields?.食性 || '待整理'}</dd></div>
        <div><dt>栖息环境</dt><dd>{fish.fields?.栖息环境 || '待整理'}</dd></div>
        <div><dt>体长</dt><dd>{fish.fields?.体长 || '待整理'}</dd></div>
        <div><dt>适温</dt><dd>{fish.fields?.适温 || '待整理'}</dd></div>
        <div><dt>别名</dt><dd>{fish.aliases || '无'}</dd></div>
      </dl>
      {fish.bait_options?.length ? <section><h3>常见饵料记录</h3><div className="tag-list">{fish.bait_options.slice(0, 12).map((bait) => <span key={bait}>{bait}</span>)}</div></section> : null}
      {fish.similar_fish?.length ? <section><h3>容易混淆</h3><p>{fish.similar_fish.join('、')}</p></section> : null}
    </div>
  )
}
