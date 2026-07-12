import { describe, expect, it } from 'vitest'
import { PEOPLE_GROUPS } from './people.js'
import { ETHICS_SECTIONS, JURISDICTIONS } from './ethics.js'
import { HISTORICAL_OBJECT_IDS } from './history.js'
import { TECHNIQUE_MODES } from './techniques.js'

describe('curated exhibition content', () => {
  it('keeps technique knowledge separate from bait products', () => {
    expect(TECHNIQUE_MODES.map((mode) => mode.label)).toEqual(['饵技', '竿技', '漂技', '鱼技'])
    expect(TECHNIQUE_MODES.every((mode) => mode.items.length >= 5)).toBe(true)
    expect(JSON.stringify(TECHNIQUE_MODES)).not.toMatch(/九一八|速攻|天元邓刚|易包搞定|蓝鲫/)
    expect(TECHNIQUE_MODES.find((mode) => mode.id === 'fish').items.some((item) => item.title === '拟饵搜索')).toBe(true)
  })

  it('uses identity groups instead of title keyword matching', () => {
    expect(PEOPLE_GROUPS.map((group) => group.label)).toEqual([
      '以水为生', '权力与选择', '文学中的钓者', '女性与家庭', '竞技与行业', '当代社群',
    ])
    expect(PEOPLE_GROUPS.every((group) => group.recordIds.length || group.includeBaike)).toBe(true)
  })

  it('moves historical artefacts out of the contemporary tackle bench', () => {
    expect(HISTORICAL_OBJECT_IDS).toEqual(expect.arrayContaining([
      'object-early-metal-hook', 'object-bone-straight-hook', 'object-ancient-fishing-wheel',
    ]))
  })

  it('separates law comparison from catch and environmental responsibility', () => {
    expect(JURISDICTIONS).toHaveLength(5)
    expect(ETHICS_SECTIONS.map((section) => section.id)).toEqual([
      'locate-rule', 'decide-catch', 'care-for-fish', 'tackle-afterlife', 'watch-water',
    ])
  })
})
