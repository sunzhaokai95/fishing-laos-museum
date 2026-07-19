import { describe, expect, it } from 'vitest'
import {
  findCollectionByUrl,
  findRouteByUrl,
  galleryStage,
  galleryKicker,
  cleanInlineText,
  publicBodyParagraphs,
  publicationLabel,
  rewriteEditorialTerms,
  rewriteAssetPaths,
} from './content.js'

const routes = [
  { id: 'home', url: '/', gallery: 'home', route_order: 0 },
  { id: 'prologue', url: '/visit/prologue', gallery: 'prologue', route_order: 1 },
  { id: 'origins', url: '/visit/origins', gallery: '02-origins', route_order: 2 },
]

describe('content helpers', () => {
  it('finds routes and collections by normalized URL', () => {
    expect(findRouteByUrl(routes, '/visit/origins/')).toEqual(routes[2])
    expect(
      findCollectionByUrl(
        [{ url: '/collection/species/common-carp', id: 'species-common-carp' }],
        '/collection/species/common-carp/',
      ).id,
    ).toBe('species-common-carp')
  })

  it('maps route metadata to the continuous museum stage', () => {
    expect(galleryStage(routes[0])).toBe('首页')
    expect(galleryStage(routes[1])).toBe('序厅')
    expect(galleryStage(routes[2])).toBe('01')
    expect(galleryKicker(routes[2])).toBe('第一展厅')
  })

  it('rewrites local markdown images to public content assets', () => {
    const markdown = '![骨钩](../../assets/source-docx/image10.jpeg)'
    expect(
      rewriteAssetPaths(markdown, 'route/02-origins/01-prehistoric-fishing.md'),
    ).toBe('![骨钩](/content/assets/source-docx/image10.jpeg)')
  })

  it('turns editorial metadata into visitor-facing Chinese', () => {
    expect(cleanInlineText('鲤鱼 *Cyprinus carpio*')).toBe('鲤鱼 Cyprinus carpio')
    expect(publicationLabel('rights_pending')).toBe('发布许可待确认')
    expect(rewriteEditorialTerms('权利状态：rights_pending')).toBe(
      '权利状态：发布许可待确认',
    )
  })

  it('keeps full public prose while removing source and image administration', () => {
    const markdown = '# 鱼钩\n\n- 来源：https://example.com\n\n## 图片\n\n- image.jpg\n\n## 正文\n\n第一段。\n第二段。\n本文或来源网络共享文章：https://example.com'
    expect(publicBodyParagraphs(markdown)).toEqual(['第一段。', '第二段。'])
  })
})
