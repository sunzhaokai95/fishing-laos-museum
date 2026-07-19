import { useEffect, useMemo, useState } from 'react'
import { rebaseContentPaths, withBasePath } from '../lib/publicPath.js'

const ROUTE_DATA_FILES = {
  '/visit/history': ['history-timeline', 'images'],
  '/visit/fish': ['fish-library'],
  '/visit/tackle': ['collection-items', 'images', 'baike-library'],
  '/visit/anglers': ['collection-items', 'baike-library'],
  '/visit/culture': ['collection-items'],
}

export function dataFilesForPath(pathname) {
  const normalized = pathname.replace(/\/+$/, '') || '/'
  return ROUTE_DATA_FILES[normalized] ?? []
}

export default function useMuseumData(pathname) {
  const files = useMemo(() => dataFilesForPath(pathname), [pathname])
  const [state, setState] = useState(() => ({
    pathname,
    data: files.length ? null : {},
    error: null,
  }))

  useEffect(() => {
    if (!files.length) {
      setState({ pathname, data: {}, error: null })
      return undefined
    }

    const controller = new AbortController()
    setState({ pathname, data: null, error: null })
    Promise.all(
      files.map(async (name) => {
        const response = await fetch(withBasePath(`/content/data/${name}.json`), {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`无法读取 ${name}.json`)
        return [name, rebaseContentPaths(await response.json())]
      }),
    )
      .then((entries) => {
        setState({ pathname, data: Object.fromEntries(entries), error: null })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ pathname, data: null, error })
      })
    return () => controller.abort()
  }, [files, pathname])

  if (state.pathname !== pathname) {
    return { data: files.length ? null : {}, error: null }
  }
  return { data: state.data, error: state.error }
}
