import { useEffect, useState } from 'react'

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
        const response = await fetch(`/content/data/${name}.json`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`无法读取 ${name}.json`)
        return [name, await response.json()]
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
