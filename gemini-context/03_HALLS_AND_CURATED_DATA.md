# Hall Components And Curated Data Context

> Generated from the current repository. Treat every file path and implementation below as real project context. Do not replace data flows with mock data.

## File: src/halls/PrologueHall.jsx

````jsx
import { ArrowDown } from 'lucide-react'

export default function PrologueHall() {
  return (
    <main className="prologue-scene">
      <div className="prologue-copy">
        <span>序厅</span>
        <h1>水面之下</h1>
        <p>
          一根钓线穿过水面以后，人能看见的东西很少。浮漂停在哪里，鱼钩沉入哪一层，水温、溶氧、食物和水流如何变化，都藏在反光之下。
        </p>
        <p>
          这座博物馆沿着一根线，进入鱼的生活、钓具的结构、人的动作与漫长的文化记忆。参观从一片水开始。
        </p>
        <ArrowDown aria-hidden="true" />
      </div>
    </main>
  )
}
````

## File: src/halls/HistoryHall.jsx

````jsx
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import { useState } from 'react'
import { timelineImageId } from '../data/history.js'
import { imageUrl } from '../lib/content.js'

export default function HistoryHall({ hall, data }) {
  const [open, setOpen] = useState(data['history-timeline'][0]?.id)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  return (
    <main className="exhibition-scene history-scene">
      <header className="scene-intro history-intro">
        <span>第一展厅</span>
        <h1>{hall.title}</h1>
        <p>{hall.summary}</p>
        <div className="scene-stat"><strong>{data['history-timeline'].length}</strong><span>个历史节点</span></div>
      </header>
      <section className="timeline-section" aria-label="中国钓鱼史纵向时间轴">
        <div className="timeline-spine" aria-hidden="true" />
        {data['history-timeline'].map((item, index) => {
          const expanded = open === item.id
          const timelineImage = images.get(timelineImageId(item.image))
          return (
            <article className={`timeline-event ${expanded ? 'is-open' : ''}`} key={item.id}>
              <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
              <button type="button" onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded}>
                <span className="timeline-period">{item.period}</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <ChevronDown aria-hidden="true" />
              </button>
              {expanded ? (
                <div className="timeline-detail">
                  {timelineImage ? <figure><img src={imageUrl(timelineImage)} alt={timelineImage.title.replaceAll('*', '')} /><figcaption>{timelineImage.title.replaceAll('*', '')}</figcaption></figure> : null}
                  <dl>
                    <div><dt>主题</dt><dd>{item.theme}</dd></div>
                    <div><dt>材料性质</dt><dd>{item.status}</dd></div>
                  </dl>
                  <p>{item.detail}</p>
                  {item.image && !item.image.startsWith('待补') ? <small>{item.image}</small> : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </section>
    </main>
  )
}
````

## File: src/halls/FishHall.jsx

````jsx
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
````

## File: src/halls/TackleHall.jsx

````jsx
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
````

## File: src/halls/TechniquesHall.jsx

````jsx
import { Crosshair, Fish, MoveUpRight, Waves } from 'lucide-react'
import { useState } from 'react'
import { TECHNIQUE_MODES } from '../data/techniques.js'

const ICONS = { bait: Crosshair, rod: MoveUpRight, float: Waves, fish: Fish }

export default function TechniquesHall({ hall }) {
  const [mode, setMode] = useState('bait')
  const active = TECHNIQUE_MODES.find((item) => item.id === mode)
  return (
    <main className="exhibition-scene technique-scene">
      <header className="scene-intro technique-intro"><span>第四展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p><div className="scene-stat"><strong>{TECHNIQUE_MODES.reduce((sum, item) => sum + item.items.length, 0)}</strong><span>项完整技法</span></div></header>
      <section className="technique-lab">
        <nav className="technique-modes" aria-label="技法类型">{TECHNIQUE_MODES.map(({ id, label }) => { const Icon = ICONS[id]; return <button type="button" className={mode === id ? 'is-active' : ''} onClick={() => setMode(id)} key={id}><Icon aria-hidden="true" /><span>{label}</span></button> })}</nav>
        <div className="technique-display">
          <div className="signal-visual" aria-hidden="true"><span className="water-line" /><span className="float-body" /><span className="signal-ring one" /><span className="signal-ring two" /></div>
          <div className="technique-sequence"><span>{active.label}</span><h2>{active.lead}</h2><div className="technique-records">{active.items.map((item, index) => <details key={item.id} open={index === 0}><summary><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.purpose}</p></div></summary><div className="technique-detail"><dl><div><dt>适用条件</dt><dd>{item.conditions}</dd></div><div><dt>常见误判</dt><dd>{item.misread}</dd></div></dl><h4>动作步骤</h4><ol>{item.steps.map((step) => <li key={step}>{step}</li>)}</ol></div></details>)}</div></div>
        </div>
      </section>
    </main>
  )
}
````

## File: src/halls/AnglersHall.jsx

````jsx
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
````

## File: src/halls/CultureHall.jsx

````jsx
import { BookOpen, MessageCircle, Sparkles } from 'lucide-react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { introParagraphs } from '../lib/content.js'

const VIEWS = [
  { id: 'works', label: '诗画与典故', icon: BookOpen },
  { id: 'language', label: '钓鱼人的语言', icon: MessageCircle },
  { id: 'belief', label: '玄学标本柜', icon: Sparkles },
]

export default function CultureHall({ hall, data }) {
  const [view, setView] = useState('works')
  const [selected, setSelected] = useState(null)
  const items = useMemo(() => {
    const collections = data['collection-items']
    if (view === 'works') return collections.filter((item) => item.collection_type === 'works')
    if (view === 'language') return collections.filter((item) => item.collection_type === 'folklore' && !/天气|幸运/.test(item.title))
    return collections.filter((item) => item.collection_type === 'folklore' && /天气|幸运/.test(item.title))
  }, [data, view])
  return (
    <main className="exhibition-scene culture-scene">
      <header className="scene-intro culture-intro"><span>第六展厅</span><h1>{hall.title}</h1><p>{hall.summary}</p></header>
      <section className="culture-cabinet">
        <nav aria-label="鱼文化分类">{VIEWS.map(({ id, label, icon: Icon }) => <button type="button" className={view === id ? 'is-active' : ''} onClick={() => setView(id)} key={id}><Icon aria-hidden="true" />{label}</button>)}</nav>
        <div className={`culture-display view-${view}`}>{items.map((item, index) => { const text = introParagraphs(item.body_markdown, 1)[0]; return <button type="button" onClick={() => setSelected({ ...item, text })} key={item.id}><span>{String(index + 1).padStart(2, '0')}</span><h2>{item.title}</h2><p>{text}</p></button> })}</div>
      </section>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="culture-detail"><span>{VIEWS.find((item) => item.id === view)?.label}</span><h2>{selected.title}</h2><p>{selected.text}</p></div> : null}</ObjectDrawer>
    </main>
  )
}
````

## File: src/halls/EthicsHall.jsx

````jsx
import { Binoculars, Earth, Fish, MapPinned, Scale, Trash2 } from 'lucide-react'
import { ETHICS_SECTIONS, JURISDICTIONS, LAW_HISTORY } from '../data/ethics.js'

const SECTION_ICONS = { 'locate-rule': MapPinned, 'decide-catch': Scale, 'care-for-fish': Fish, 'tackle-afterlife': Trash2, 'watch-water': Binoculars }

export default function EthicsHall({ hall }) {
  return (
    <main className="exhibition-scene ethics-scene">
      <header className="scene-intro ethics-intro"><span>第七展厅</span><h1>{hall.title}</h1><p>钓获不是故事的终点。法律决定最低边界，鱼体处置与水域变化则追问人在合法之外还应怎样行动。</p></header>
      <section className="law-history"><div className="module-heading"><Scale aria-hidden="true" /><span>规则为何出现</span><h2>钓鱼权利始终伴随水域秩序</h2><p>不同时代的规则保护过资源、税赋、权力、祭祀空间和公共安全，它们并不共享同一种理由。</p></div><div className="law-timeline">{LAW_HISTORY.map((item) => <article key={item.period}><span>{item.period}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      <section className="jurisdiction-room"><div className="module-heading"><Earth aria-hidden="true" /><span>不同国家与地区</span><h2>先找到规则由谁制定</h2><p>这里比较管理层级和查找路径，不提供一张脱离地点、日期和物种的万能规则表。</p></div><div className="jurisdiction-grid">{JURISDICTIONS.map((item) => <article key={item.place}><h3>{item.place}</h3><p>{item.manager}</p><ol>{item.questions.map((question) => <li key={question}>{question}</li>)}</ol></article>)}</div></section>
      <section className="ethics-decisions"><div className="module-heading"><span>从开竿到离开</span><h2>法律边界之后，还有五个判断</h2></div><div className="ethics-section-list">{ETHICS_SECTIONS.map((section, index) => { const Icon = SECTION_ICONS[section.id]; return <article key={section.id}><div><span>{String(index + 1).padStart(2, '0')}</span><Icon aria-hidden="true" /></div><div><h3>{section.title}</h3><strong>{section.question}</strong><p>{section.text}</p></div></article> })}</div></section>
    </main>
  )
}
````

## File: src/halls/EpilogueHall.jsx

````jsx
import { RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EpilogueHall() {
  return (
    <main className="epilogue-scene">
      <div><span>尾厅</span><h1>回到水边</h1><p>水面仍然平静，但你已经知道，下面有鱼的身体、水的变化、器物传来的信号，也有人的欲望、记忆和边界。</p><p>钓鱼并不保证获得一条鱼。它更像一次持续的判断：什么时候靠近，怎样理解，带走什么，又留下什么。</p><Link to="/"><RotateCcw aria-hidden="true" /> 回到博物馆入口</Link></div>
    </main>
  )
}
````

## File: src/data/history.js

````jsx
export const HISTORICAL_OBJECT_IDS = [
  'object-bone-straight-hook',
  'object-early-metal-hook',
  'object-ancient-fishing-wheel',
]

export function timelineImageId(imageText = '') {
  return imageText.match(/IMG-HIS-\d+/)?.[0] ?? null
}
````

## File: src/data/techniques.js

````jsx
export const TECHNIQUE_MODES = [
  {
    id: 'bait', label: '饵技', lead: '把材料变成鱼能发现、愿意接近并能够入口的状态。',
    items: [
      { id: 'bait-select', title: '先确定对象与水情', purpose: '决定使用天然饵、粮食颗粒、粉饵还是其他材料。', conditions: '目标鱼、季节、水温、流速、小杂鱼密度和当地饵料规则都会改变选择。', steps: ['先确认目标鱼通常摄食什么以及处于哪个水层。', '再判断静水、流水、深浅和小鱼干扰。', '只带能够形成明确差异的少量方案，避免同时混入过多变量。'], misread: '把某个品牌或味型当成跨水域通用答案。' },
      { id: 'bait-water', title: '量水、拌和与醒饵', purpose: '让粉体充分吸水并形成稳定、可重复的基础状态。', conditions: '配方颗粒大小、吸水性、空气湿度和作钓时间都会影响结果。', steps: ['先按配方建议量取饵和水，并保留实际用量。', '快速拌匀后静置吸水，不在尚未完成吸水时反复加干粉。', '醒饵后再根据需要轻揉、收拢或加入状态材料。'], misread: '凭手感连续补水补粉，最后无法判断是哪一步改变了状态。' },
      { id: 'bait-state', title: '控制附钩、松散与雾化', purpose: '让饵既能抵达目标位置，又能在合适时间释放颗粒和气味。', conditions: '抛投距离、入水冲击、水深、水流和目标鱼吸食方式共同决定状态。', steps: ['检查抛投后是否提前脱落。', '观察入水后外层剥落和钩上残留。', '逐次只改变揉打、含水或黏结中的一个变量。'], misread: '把雾化越快、香味越强理解为诱鱼一定越好。' },
      { id: 'bait-shape', title: '控制饵团大小与钩上形态', purpose: '使饵团与钩型、鱼口和进食强度相匹配。', conditions: '小鱼、轻口鱼、深水和远投对饵团大小的要求并不相同。', steps: ['确认钩尖是否能够正常工作。', '从较小、规则的饵团开始观察入口。', '根据空竿、蹭线和深吞情况调整，而不是只追求大饵避小鱼。'], misread: '把鱼口大小直接等同于应使用的饵团大小。' },
      { id: 'bait-rhythm', title: '建立投放节奏', purpose: '用频率维持可观察的食物信号，而不是一次投入大量饵料。', conditions: '鱼密度、水体交换、法规、富营养化风险和剩饵处理都会限制投放。', steps: ['开钓阶段记录每次抛投间隔。', '鱼进窝后降低无效投放，观察真实咬口。', '结束时带走包装和剩余材料，不把剩饵全部倒入水中。'], misread: '把没有信号一律解释为窝量不够，并持续加大投饵。' },
    ],
  },
  {
    id: 'rod', label: '竿技', lead: '利用空间、竿身弹性和线的张力完成投送与控制。',
    items: [
      { id: 'rod-space', title: '抛投前检查空间', purpose: '先确保人、树木、电线、船只和其他钓者不在竿线运动范围。', conditions: '长竿、重坠、拟饵和强风会放大误伤风险。', steps: ['看身后与头顶。', '确认钩饵没有挂住衣物和地面。', '设定落点及越界后的停止动作。'], misread: '只盯水面落点，不检查钩从哪里经过。' },
      { id: 'rod-swing', title: '荡抛与垂直递送', purpose: '在近距离或有遮挡环境中轻放钩饵。', conditions: '适合草洞、岸边结构和需要减少落水声的场景。', steps: ['让钩饵自然下垂并保持可控摆幅。', '用竿尖带动而不是突然甩腕。', '在目标上方卸力，使钩饵自然落下。'], misread: '用力越小就一定越准；真正关键是摆幅和释放时机。' },
      { id: 'rod-side', title: '侧抛', purpose: '降低运动轨迹，处理侧风或头顶障碍。', conditions: '必须确保身体侧后方无人，且钩饵不会擦过岸边。', steps: ['让竿尖在身体侧面形成平顺加速。', '释放后及时控制余线。', '落水前减速，避免钩饵重击水面。'], misread: '只用手腕突然抽打，造成方向漂移和竿节受力突变。' },
      { id: 'rod-overhead', title: '过头抛与远投', purpose: '在开阔空间获得更长投距和较直的运动轨迹。', conditions: '竿、线、坠饵总重必须匹配，身后需要完整安全区。', steps: ['平稳加载竿身，不突然暴力启动。', '让竿身回弹而不是只靠手臂推送。', '在飞行中控制出线，接近落点时减速。'], misread: '把竿弯得越深或挥得越猛等同于投得越远。' },
      { id: 'rod-tension', title: '刺鱼与张力管理', purpose: '建立钩尖接触，并用竿弯、泄力和人的移动消减冲击。', conditions: '距离、线的延展、钩条、鱼口和障碍决定刺鱼幅度。', steps: ['确认信号连续后以可控幅度收紧。', '保持竿身参与缓冲，避免竿线拉成直线。', '鱼冲时给出余量，鱼停时再恢复控制。'], misread: '刺鱼必须大力扬竿，或中鱼后始终死拉不放。' },
    ],
  },
  {
    id: 'float', label: '漂技', lead: '先建立钩、饵、坠、漂和水底的关系，再解释可见信号。',
    items: [
      { id: 'float-depth', title: '找底与测深', purpose: '确认配重、钩饵和水底之间的距离。', conditions: '软泥、水草、坡坎和走水会制造“到底”假象。', steps: ['使用可控配重逐步调整深度。', '比较多次落点和浮漂位置。', '记录底质差异，不把一个点代表整片水域。'], misread: '看到漂目稳定就认定已经准确到底。' },
      { id: 'float-balance', title: '建立漂坠平衡', purpose: '通过增减配重控制浮漂露出和钩饵下沉状态。', conditions: '浮漂吃铅、线径、水深和水流都会改变系统。', steps: ['在接近实际水深的条件下调整。', '每次少量改变配重并等待系统稳定。', '记录空钩、带饵和入水后的差异。'], misread: '把固定调目直接复制到不同浮漂、线组和水域。' },
      { id: 'float-depth-position', title: '确定钓层与钩饵状态', purpose: '让钩饵处于离底、触底、躺底或其他明确位置。', conditions: '目标鱼活动层、饵重、走水和底部障碍决定选择。', steps: ['先建立可确认的水深基准。', '逐次移动浮漂改变钩饵位置。', '用重复信号和鱼口结果验证，而不是只看目数。'], misread: '把“灵”与“钝”当成好坏等级，而不是不同受力关系。' },
      { id: 'float-signal', title: '读顿、顶、沉与横移', purpose: '把浮漂动作还原为水下受力变化。', conditions: '吞饵、碰线、饵料脱落、水流、风和小鱼都可能产生相似信号。', steps: ['先看动作方向、幅度、速度和是否连续。', '结合钩饵位置与此前信号判断。', '用提竿结果回看，而不是为单次动作建立永恒解释。'], misread: '顿口必有鱼、顶漂必是鲫鱼、黑漂必是大鱼。' },
      { id: 'float-recheck', title: '变化后重新校准', purpose: '在换饵、换钩、剪线、走水或水深改变后恢复可解释状态。', conditions: '任何影响重量、浮力、线长和阻力的变化都可能改变漂相。', steps: ['记录改变发生在什么环节。', '重新检查水深和露出目数。', '先恢复基准，再比较鱼口变化。'], misread: '漂相改变后只调整浮漂位置，却忽略线组或饵重已经变化。' },
    ],
  },
  {
    id: 'fish', label: '鱼技', lead: '围绕鱼的位置、行为和鱼体状态作出连续判断。',
    items: [
      { id: 'fish-read-water', title: '读水与找鱼', purpose: '从流速、深浅、结构、温度、溶氧和食物线索推测鱼可能的位置。', conditions: '同一水域会随天气、调水、季节和人类活动改变。', steps: ['先观察入水口、回水、坡坎、遮蔽和水面纹理。', '用安全方式测深并记录。', '把推测当作起点，通过少量移动验证。'], misread: '迎风岸、老钓位或浑水在任何时候都必然有鱼。' },
      { id: 'fish-identify', title: '辨认对象鱼与相似鱼', purpose: '确认鱼种、体型和保护状态，再决定后续动作。', conditions: '地方名、幼鱼体色和近似种可能造成误认。', steps: ['观察口位、鳍形、体侧斑纹和关键结构。', '保留必要照片但缩短离水时间。', '无法确定时按当地规定采取更保守的处理。'], misread: '用一个俗名概括多种鱼，或只凭体色完成鉴定。' },
      { id: 'fish-lure-search', title: '拟饵搜索', purpose: '用方向、深度、速度、停顿和动作寻找正在活动的鱼。', conditions: '水深、水流、障碍、猎物和目标鱼追逐距离决定搜索方式。', steps: ['把水面划分为方向与水层。', '用下沉时间控制搜索深度。', '每轮只改变一种速度或动作，并记录触碰、追随和咬口。'], misread: '持续快速抛投却没有建立方向、水层和动作的比较。' },
      { id: 'fish-playing', title: '遛鱼与控制方向', purpose: '在不过度消耗鱼体的前提下避开障碍并逐步缩短距离。', conditions: '鱼体大小、钩位、线组强度、流速和岸形共同限制动作。', steps: ['保持竿身缓冲和稳定张力。', '用侧向引导改变鱼头方向。', '鱼体失去强烈冲刺后再引向抄网。'], misread: '固定画“八字”或把鱼遛到完全无力才算成功。' },
      { id: 'fish-land-release', title: '抄鱼、摘钩与放流', purpose: '缩短控制与离水时间，减少鳃、眼、鳞和黏液损伤。', conditions: '深吞、鳃伤、高水温、深水压力变化和长时间遛鱼会降低存活。', steps: ['提前准备无结网、摘钩工具和湿润接触面。', '让鱼头进入抄网后托起，不用网框追砸。', '能在水中摘钩就不离水；需要离水时水平支撑并尽快处理。'], misread: '鱼能自行游走就证明没有延迟伤害。' },
      { id: 'fish-review', title: '失败复盘', purpose: '把空军、切线、跑鱼、挂底和误判转化为下一次可比较的记录。', conditions: '复盘必须保留地点尺度、日期、水情、装备与安全条件。', steps: ['区分没有鱼、没有找到鱼和鱼没有摄食。', '检查结、磨损、钩尖、泄力和动作时机。', '记录改变与结果，不为一次成功编造万能公式。'], misread: '只归因于运气、位置玄学或需要购买新装备。' },
    ],
  },
]
````

## File: src/data/people.js

````jsx
export const PEOPLE_GROUPS = [
  {
    id: 'livelihood',
    label: '以水为生',
    description: '捕鱼、垂钓、养殖、修船和售鱼可能共同构成生计。这里讨论劳动条件，而不把辛苦生活审美化。',
    recordIds: ['person-fishing-worker-seat'],
  },
  {
    id: 'power',
    label: '权力与选择',
    description: '有人借垂钓等待进入政治，有人用垂钓表达拒绝。历史人物与后世传说需要分层观看。',
    recordIds: ['person-jiang-shang', 'person-yan-ziling'],
  },
  {
    id: 'literature',
    label: '文学中的钓者',
    description: '诗与绘画中的人物不一定是真实人物传记，但他们塑造了人们理解孤独、家庭和水边生活的方式。',
    recordIds: ['person-cold-river-angler', 'person-child-making-hook'],
  },
  {
    id: 'women-family',
    label: '女性与家庭',
    description: '女性和儿童并非水边的陪衬。现有图像、诗文与当代经验需要分别整理，不能合成一种共同人生。',
    recordIds: ['person-women-anglers-seat'],
  },
  {
    id: 'competition-industry',
    label: '竞技与行业',
    description: '运动员、教练、裁判、饵料研究者、钓具经营者与内容传播者共同构成现代垂钓行业。',
    recordIds: ['person-modern-competition-seat'],
    includeBaike: true,
  },
  {
    id: 'community',
    label: '当代社群',
    description: '“钓鱼佬”是一种不断变化的网络自称，受到平台、地域、钓法、年龄和性别影响。',
    recordIds: ['person-fishing-lao-community-seat'],
  },
]

export const PEOPLE_OVERRIDES = {
  'person-fishing-worker-seat': { title: '以钓与捕鱼为生的人', kind: '劳动身份' },
  'person-women-anglers-seat': { title: '女性钓者', kind: '历史与当代身份' },
  'person-modern-competition-seat': { title: '竞技钓者', kind: '现代职业身份' },
  'person-fishing-lao-community-seat': { title: '“钓鱼佬”社群', kind: '当代社群身份' },
}
````

## File: src/data/ethics.js

````jsx
export const LAW_HISTORY = [
  { period: '唐代', title: '渔捕时禁进入官署管理', text: '河渠、水域和季节性的渔捕限制进入官署职责，垂钓并非天然不受管理。' },
  { period: '武周', title: '水域的政治与祭祀身份', text: '洛水被赋予新的政治意义后出现禁渔钓，规则同时维护资源、秩序与象征权力。' },
  { period: '清初', title: '买河禁钓与放生池', text: '地方士绅、寺院、税赋和放生实践共同改变水域使用权，善意、财力与公共使用之间产生张力。' },
  { period: '近现代', title: '许可、协会与保护制度', text: '休闲垂钓进入许可证、场地许可、闭季、尺寸和数量管理，不同国家形成不同层级。' },
  { period: '2026', title: '中国国家法律与地方规则并存', text: '修订后的渔业法提供国家边界，实际垂钓仍需定位到具体水域、日期、物种和地方办法。' },
]

export const JURISDICTIONS = [
  { place: '中国', manager: '国家法律、地方政府与具体水域管理者', questions: ['是否处于禁渔区或禁渔期', '是否涉及保护物种', '当地对竿、钩、饵和留取怎样规定'], sourceUrl: 'https://www.npc.gov.cn/npc/c2/c30834/202512/t20251227_450727.html' },
  { place: '英国（英格兰与威尔士）', manager: '国家钓竿许可、区域附例与水域所有者许可', questions: ['是否需要 rod licence', '当地闭季和鱼种规则是什么', '是否取得水域所有者许可'], sourceUrl: 'https://www.gov.uk/fishing-licences' },
  { place: '美国', manager: '州级许可和物种规则为主，叠加联邦或保护区规则', questions: ['所在州要求什么许可证', '尺寸与袋限是多少', '保护区是否有更严格的钩具和开放时间'], sourceUrl: 'https://www.fws.gov/services/purchase-fishing-license' },
  { place: '日本', manager: '都道府县调整规则、内水面渔业权与当地游渔规则', questions: ['当地允许哪些渔具渔法', '是否需要游渔券或承认证', '禁渔期、区域和体长限制是什么'], sourceUrl: 'https://www.jfa.maff.go.jp/j/enoki/yugyo/rule.html' },
  { place: '澳大利亚', manager: '州和领地管理为主，叠加海洋公园分区', questions: ['所在州是否要求许可', '尺寸、数量和持有限制是什么', '当前海洋公园分区是否允许垂钓'], sourceUrl: 'https://australianmarineparks.gov.au/access-use/other-approvals/recreational-fishing/' },
]

export const ETHICS_SECTIONS = [
  { id: 'locate-rule', title: '先定位规则', question: '你在哪里、何时、钓什么、用什么方法？', text: '“允许钓鱼”从来不是一个脱离地点的答案。先确定司法辖区、具体水域、日期、目标物种和钩具，再查许可证、闭季、保护区、尺寸与数量。比赛规则、钓场规则和国家法律不能互相替代。' },
  { id: 'decide-catch', title: '决定带走还是放回', question: '合法留取、必须放流和不宜继续作钓是三种不同判断。', text: '辨认物种与尺寸只是第一步。若连续钓到幼鱼、非目标鱼或不适合放流的深水鱼，应考虑改变钓层、钩型、地点或停止，而不是把每条鱼放回就视为零影响。' },
  { id: 'care-for-fish', title: '鱼离水后的处置', question: '怎样减少遛鱼、摘钩、拍照和放流造成的损伤？', text: '使用匹配目标鱼的钓具，避免把鱼遛到完全衰竭；尽可能在水中摘钩，湿手接触并水平支撑鱼体，缩短空气暴露。深水鱼可能出现压力伤，需要按物种和当地指南使用回深工具。' },
  { id: 'tackle-afterlife', title: '钓具的余生', question: '断线、鱼钩、铅坠和包装在离开手以后去了哪里？', text: '短线头会缠绕鸟类和水生动物，遗失钩具仍可能造成穿刺，部分铅制品会带来毒性风险。每次换线和剪结都应即时收纳；回收挂底器物不能以涉水、攀岩或潜水冒险为代价。' },
  { id: 'watch-water', title: '把观察变成公共记录', question: '钓者看到的变化，怎样不只停留在个人鱼获？', text: '持续记录日期、水域尺度、物种、尺寸方法、水温、鱼获与放流，可以帮助识别长期变化。无法确认的鱼应标记待鉴定，敏感物种和繁殖地不公开精确坐标；观察记录不能替代正式监测，但可以成为线索。' },
]

export const ETHICS_INTERNAL_SOURCES = [
  'https://www.fisheries.noaa.gov/national/resources-fishing/catch-and-release-fishing-best-practices',
  'https://www.gov.uk/freshwater-rod-fishing-rules/tackle-you-can-use',
  'https://pir.sa.gov.au/fishing-and-aquaculture/recreational-fishing/responsible-fishing-skills/handling-your-catch',
  'https://www.qld.gov.au/recreation/activities/boating-fishing/rec-fishing/app/my-fishing',
]
````
