import { describe, expect, it } from 'vitest'
import { dataFilesForPath } from './useMuseumData.js'

describe('museum route data loading', () => {
  it('opens routes with no collection dependency without downloading collection libraries', () => {
    expect(dataFilesForPath('/')).toEqual([])
    expect(dataFilesForPath('/visit/prologue')).toEqual([])
    expect(dataFilesForPath('/visit/techniques')).toEqual([])
    expect(dataFilesForPath('/visit/ethics')).toEqual([])
    expect(dataFilesForPath('/visit/epilogue')).toEqual([])
  })

  it('loads only the libraries required by each collection hall', () => {
    expect(dataFilesForPath('/visit/history')).toEqual(['history-timeline', 'images'])
    expect(dataFilesForPath('/visit/fish')).toEqual(['fish-library'])
    expect(dataFilesForPath('/visit/tackle')).toEqual(['collection-items', 'images', 'baike-library'])
    expect(dataFilesForPath('/visit/anglers')).toEqual(['collection-items', 'baike-library'])
    expect(dataFilesForPath('/visit/culture')).toEqual(['collection-items', 'images'])
  })
})
