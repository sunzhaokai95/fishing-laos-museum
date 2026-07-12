import { useEffect, useState } from 'react'
import { rebaseContentPaths, withBasePath } from '../lib/publicPath.js'

const DATA_FILES = [
  'route-pages',
  'collection-items',
  'images',
  'fish-library',
  'baike-library',
  'history-timeline',
]

export default function useMuseumData() {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()
    Promise.all(
      DATA_FILES.map(async (name) => {
        const response = await fetch(withBasePath(`/content/data/${name}.json`), {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`无法读取 ${name}.json`)
        return [name, rebaseContentPaths(await response.json())]
      }),
    )
      .then((entries) => {
        setState({ data: Object.fromEntries(entries), error: null })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error })
      })
    return () => controller.abort()
  }, [])

  return state
}
