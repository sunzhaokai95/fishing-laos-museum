import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clearMuseumDataCache, dataFilesForPath, preloadDataForPath } from './useMuseumData.js'

describe('museum route data loading', () => {
  beforeEach(() => {
    clearMuseumDataCache()
    vi.restoreAllMocks()
  })

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
    expect(dataFilesForPath('/visit/tackle')).toEqual(['collection-items', 'baike-library'])
    expect(dataFilesForPath('/visit/anglers')).toEqual(['collection-items', 'baike-library'])
    expect(dataFilesForPath('/visit/culture')).toEqual(['collection-items', 'images'])
  })

  it('prefetches a route library once and reuses it during navigation', async () => {
    const fetchMock = vi.fn(async () => ({ ok: true, json: async () => [{ name: '鲤鱼' }] }))
    vi.stubGlobal('fetch', fetchMock)

    await preloadDataForPath('/visit/fish')
    await preloadDataForPath('/visit/fish')

    expect(fetchMock).toHaveBeenCalledOnce()
    expect(fetchMock.mock.calls[0][0]).toContain('/content/data/fish-library.json')
  })
})
