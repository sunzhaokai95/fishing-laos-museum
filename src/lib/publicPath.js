const DEFAULT_BASE = import.meta.env.BASE_URL || '/'

export function withBasePath(path, base = DEFAULT_BASE) {
  if (!path || !path.startsWith('/') || /^(?:\/\/|https?:)/.test(path)) return path
  const normalizedBase = base === '/' ? '' : `/${base.replace(/^\/+|\/+$/g, '')}`
  return `${normalizedBase}${path}`
}

export function rebaseContentPaths(value, base = DEFAULT_BASE) {
  if (typeof value === 'string') {
    return value.startsWith('/content/') ? withBasePath(value, base) : value
  }
  if (Array.isArray(value)) return value.map((item) => rebaseContentPaths(item, base))
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, rebaseContentPaths(item, base)]),
    )
  }
  return value
}
