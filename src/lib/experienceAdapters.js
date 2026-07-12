export const HISTORY_ERAS = [
  { id: 'all', label: '全部时代', range: '31 个节点' },
  { id: 'origins', label: '起源与早期', range: '史前至商代', start: 0, end: 5 },
  { id: 'classical', label: '先秦至汉', range: '思想与图像', start: 6, end: 11 },
  { id: 'literati', label: '唐宋文人', range: '诗画与器物', start: 12, end: 18 },
  { id: 'late-imperial', label: '明清图像', range: '图谱与出版', start: 19, end: 24 },
  { id: 'modern', label: '现代转型', range: '工业与社群', start: 25, end: 30 },
]

export function fishDistributionStats(fish) {
  const stats = {
    total: fish.length,
    layers: { upper: 0, middle: 0, lower: 0 },
    diets: { predatory: 0, omnivorous: 0, herbivorous: 0, filter: 0, other: 0 },
  }

  fish.forEach((item) => {
    const layer = item.fields?.水层 || ''
    if (layer.includes('上')) stats.layers.upper += 1
    else if (layer.includes('底')) stats.layers.lower += 1
    else stats.layers.middle += 1

    const diet = item.fields?.食性 || ''
    if (diet.includes('肉')) stats.diets.predatory += 1
    else if (diet.includes('杂')) stats.diets.omnivorous += 1
    else if (diet.includes('草')) stats.diets.herbivorous += 1
    else if (diet.includes('滤')) stats.diets.filter += 1
    else stats.diets.other += 1
  })

  return stats
}

export function historyEra(item, index) {
  return HISTORY_ERAS.find((era) => era.id !== 'all' && index >= era.start && index <= era.end) || HISTORY_ERAS.at(-1)
}

export function relativeLoadState(value) {
  if (value >= 85) return { id: 'critical', label: '高负载区', description: '系统接近高负载状态，需要降低持续拉力并重新分配受力。' }
  if (value >= 60) return { id: 'alert', label: '负载上升', description: '形变与局部受力正在增加，应让竿、线和泄力共同缓冲。' }
  return { id: 'steady', label: '稳定传递', description: '受力仍处于可观察的相对稳定区间。' }
}

export const DECISION_CONFIRMATIONS = [
  { id: 'water', label: '已经确认具体水域及其管理主体' },
  { id: 'date', label: '已经确认日期、禁渔期和开放时段' },
  { id: 'species', label: '已经确认物种身份和保护状态' },
  { id: 'permit', label: '已经确认许可证、钓法和钓具要求' },
  { id: 'limits', label: '已经确认尺寸、数量和鱼获处置规则' },
]

export function decisionChecklist({ jurisdiction, confirmations }) {
  const completed = DECISION_CONFIRMATIONS.filter((item) => Boolean(confirmations[item.id])).length
  return {
    completed,
    total: DECISION_CONFIRMATIONS.length,
    status: completed === DECISION_CONFIRMATIONS.length ? 'ready-to-consult' : 'incomplete',
    verdict: null,
    manager: jurisdiction?.manager || '',
  }
}
