import { fishDistributionStats } from '../../lib/experienceAdapters.js'

const DIET_LABELS = [['omnivorous', '杂食'], ['predatory', '肉食'], ['herbivorous', '草食'], ['filter', '滤食'], ['other', '其他']]

export default function FishStats({ fish }) {
  const stats = fishDistributionStats(fish)
  return (
    <section className="fish-collection-ledger" aria-label="鱼类馆藏分布">
      <div className="fish-collection-ledger__total"><small>馆藏总量</small><strong>{stats.total}</strong><span>种</span></div>
      <dl>
        <div><dt>水层分布</dt><dd><span>上层 {stats.layers.upper}</span><span>中层 {stats.layers.middle}</span><span>底层 {stats.layers.lower}</span></dd></div>
        <div><dt>食性记录</dt><dd>{DIET_LABELS.filter(([key]) => stats.diets[key]).map(([key, label]) => <span key={key}>{label} {stats.diets[key]}</span>)}</dd></div>
      </dl>
    </section>
  )
}
