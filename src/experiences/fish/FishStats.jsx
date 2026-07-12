import { fishDistributionStats } from '../../lib/experienceAdapters.js'

const DIET_LABELS = [
  ['omnivorous', '杂食'],
  ['predatory', '肉食'],
  ['herbivorous', '草食'],
  ['filter', '滤食'],
  ['other', '其他'],
]

export default function FishStats({ fish }) {
  const stats = fishDistributionStats(fish)
  return (
    <section className="grid gap-px overflow-hidden border-y border-zinc-300/70 bg-zinc-300/70 md:grid-cols-[0.8fr_1.2fr_1.5fr]" aria-label="鱼类馆藏分布">
      <div className="bg-zinc-50 px-4 py-5 md:px-6"><small className="font-mono text-[9px] text-zinc-500">COLLECTION / 馆藏总量</small><strong className="mt-1 block text-4xl font-light text-zinc-900">{stats.total}</strong></div>
      <div className="bg-zinc-50 px-4 py-5 md:px-6"><small className="font-mono text-[9px] text-zinc-500">WATER LAYER / 水层分布</small><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-700"><span>上层 {stats.layers.upper}</span><span>中层 {stats.layers.middle}</span><span>底层 {stats.layers.lower}</span></div></div>
      <div className="bg-zinc-50 px-4 py-5 md:px-6"><small className="font-mono text-[9px] text-zinc-500">FEEDING / 食性记录</small><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-700">{DIET_LABELS.filter(([key]) => stats.diets[key]).map(([key, label]) => <span key={key}>{label} {stats.diets[key]}</span>)}</div></div>
    </section>
  )
}
