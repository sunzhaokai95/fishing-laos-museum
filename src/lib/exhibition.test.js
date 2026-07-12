import { describe, expect, it } from 'vitest'
import { filterFish, legacyHallUrl, normalizeCategory } from './exhibition.js'

const fish = [
  { name: '鲫鱼', scientific_name: 'Carassius auratus', fields: { 科: '鲤科', 水层: '中下层', 食性: '杂食性' } },
  { name: '花鲈', scientific_name: 'Lateolabrax maculatus', fields: { 科: '花鲈科', 水层: '中层', 食性: '肉食性' } },
]

describe('exhibition helpers', () => {
  it('filters fish across names and structured fields', () => {
    expect(filterFish(fish, { query: 'Carassius', family: '', layer: '', diet: '' })).toHaveLength(1)
    expect(filterFish(fish, { query: '', family: '鲤科', layer: '中下层', diet: '杂食性' })).toEqual([fish[0]])
  })

  it('maps legacy article routes back to one canonical hall', () => {
    expect(legacyHallUrl('/visit/origins/prehistoric-fishing')).toBe('/visit/history')
    expect(legacyHallUrl('/visit/fish-and-waters')).toBe('/visit/fish')
  })

  it('normalizes encyclopedia categories into hall groups', () => {
    expect(normalizeCategory('渔具配件')).toBe('钓具')
    expect(normalizeCategory('饵料鱼饵')).toBe('饵料')
  })
})
