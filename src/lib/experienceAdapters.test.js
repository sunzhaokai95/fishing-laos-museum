import { describe, expect, it } from 'vitest'
import {
  decisionChecklist,
  fishDistributionStats,
  historyEra,
  relativeLoadState,
} from './experienceAdapters.js'

const fish = [
  { fields: { 水层: '上层', 食性: '肉食性' } },
  { fields: { 水层: '中下层', 食性: '杂食性' } },
  { fields: { 水层: '底层', 食性: '草食性' } },
  { fields: { 水层: '近底层', 食性: '滤食' } },
]

describe('experience adapters', () => {
  it('derives fish statistics from the supplied collection', () => {
    expect(fishDistributionStats(fish)).toEqual({
      total: 4,
      layers: { upper: 1, middle: 1, lower: 2 },
      diets: { predatory: 1, omnivorous: 1, herbivorous: 1, filter: 1, other: 0 },
    })
  })

  it('assigns all 31 timeline positions to stable eras', () => {
    expect(historyEra({}, 0).id).toBe('origins')
    expect(historyEra({}, 8).id).toBe('classical')
    expect(historyEra({}, 15).id).toBe('literati')
    expect(historyEra({}, 22).id).toBe('late-imperial')
    expect(historyEra({}, 30).id).toBe('modern')
  })

  it('maps relative tackle load to three non-numeric risk states', () => {
    expect(relativeLoadState(35).id).toBe('steady')
    expect(relativeLoadState(70).id).toBe('alert')
    expect(relativeLoadState(92).id).toBe('critical')
  })

  it('never turns an incomplete legal checklist into a verdict', () => {
    expect(decisionChecklist({
      jurisdiction: { place: '中国大陆', manager: '所在地主管部门' },
      confirmations: { water: true, date: true, species: false, permit: false, limits: false },
    })).toMatchObject({ completed: 2, total: 5, status: 'incomplete', verdict: null })

    expect(decisionChecklist({
      jurisdiction: { place: '中国大陆', manager: '所在地主管部门' },
      confirmations: { water: true, date: true, species: true, permit: true, limits: true },
    })).toMatchObject({ completed: 5, total: 5, status: 'ready-to-consult', verdict: null })
  })
})
