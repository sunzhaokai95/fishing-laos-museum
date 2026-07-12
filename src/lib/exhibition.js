const LEGACY_HALLS = [
  ['/visit/origins', '/visit/history'],
  ['/visit/fish-and-waters', '/visit/fish'],
  ['/visit/tackle', '/visit/tackle'],
  ['/visit/techniques', '/visit/techniques'],
  ['/visit/anglers', '/visit/anglers'],
  ['/visit/imaginations', '/visit/culture'],
  ['/visit/ethics', '/visit/ethics'],
]

export function filterFish(fish, filters) {
  const query = filters.query.trim().toLocaleLowerCase('zh-CN')
  return fish.filter((item) => {
    const searchable = [item.name, item.scientific_name, item.aliases]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('zh-CN')
    return (
      (!query || searchable.includes(query)) &&
      (!filters.family || item.fields?.科 === filters.family) &&
      (!filters.layer || item.fields?.水层?.includes(filters.layer)) &&
      (!filters.diet || item.fields?.食性?.includes(filters.diet))
    )
  })
}

export function legacyHallUrl(pathname) {
  return LEGACY_HALLS.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? null
}

export function normalizeCategory(category) {
  if (category === '渔具配件') return '钓具'
  if (category === '饵料鱼饵') return '饵料'
  if (category === '钓鱼达人') return '人物'
  if (category === '常说词汇') return '术语'
  if (category === '看图识鱼') return '鱼类'
  return category
}

export function uniqueValues(items, accessor) {
  return [...new Set(items.map(accessor).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  )
}
