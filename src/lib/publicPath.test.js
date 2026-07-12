import { describe, expect, it } from 'vitest'
import { rebaseContentPaths, withBasePath } from './publicPath.js'

describe('production public paths', () => {
  it('mounts root assets beneath the museum base path', () => {
    expect(withBasePath('/content/data/fish-library.json', '/museums/fishing-laos/')).toBe(
      '/museums/fishing-laos/content/data/fish-library.json',
    )
    expect(withBasePath('/content/data/fish-library.json', '/')).toBe(
      '/content/data/fish-library.json',
    )
  })

  it('rebases nested content assets without changing external links', () => {
    expect(rebaseContentPaths({ image_url: '/content/fish.webp', source_url: 'https://example.com' }, '/museums/fishing-laos/')).toEqual({
      image_url: '/museums/fishing-laos/content/fish.webp',
      source_url: 'https://example.com',
    })
  })
})
