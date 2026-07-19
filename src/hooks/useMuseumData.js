import { useEffect, useMemo, useState } from 'react'
import { rebaseContentPaths, withBasePath } from '../lib/publicPath.js'

const ROUTE_DATA_FILES = {
  '/visit/history': ['history-timeline', 'images'],
  '/visit/fish': ['fish-library'],
  '/visit/tackle': ['collection-items', 'baike-library'],
  '/visit/anglers': ['collection-items', 'baike-library'],
  '/visit/culture': ['collection-items', 'images'],
}

const fileCache = new Map()

export function dataFilesForPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return ROUTE_DATA_FILES[normalized] ?? []
}

function loadDataFile(name) {
  if (fileCache.has(name)) return fileCache.get(name)

  const request = fetch(withBasePath(`/content/data/${name}.json`))
    .then(async (response) => {
      if (!response.ok) throw new Error(`无法读取 ${name}.json`)
      return rebaseContentPaths(await response.json())
    })
    .catch((error) => {
      fileCache.delete(name)
      throw error
    })

  fileCache.set(name, request)
  return request
}

export function preloadDataForPath(pathname) {
  const files = dataFilesForPath(pathname)
  return Promise.all(files.map(async (name) => [name, await loadDataFile(name)]))
    .then((entries) => Object.fromEntries(entries))
}

export function clearMuseumDataCache() {
  fileCache.clear()
}

export default function useMuseumData(pathname) {
  const files = useMemo(() => dataFilesForPath(pathname), [pathname])
  const [state, setState] = useState(() => ({
    pathname,
    data: files.length ? null : {},
    error: null,
  }))

  useEffect(() => {
    let active = true
    if (!files.length) {
      setState({ pathname, data: {}, error: null })
      return () => { active = false }
    }

    setState({ pathname, data: null, error: null })
    preloadDataForPath(pathname)
      .then((data) => {
        if (active) setState({ pathname, data, error: null })
      })
      .catch((error) => {
        if (active) setState({ pathname, data: null, error })
      })

    return () => { active = false }
  }, [files, pathname])

  if (state.pathname !== pathname) {
    return { data: files.length ? null : {}, error: null }
  }
  return { data: state.data, error: state.error }
}
