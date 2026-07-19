import { describe, expect, it } from 'vitest'
import { MUSEUM_ROUTE, routeContext } from './museumRoute.js'

describe('museum route contract', () => {
  it('keeps the approved ten-stage sequence and formal hall names', () => {
    expect(MUSEUM_ROUTE.map(({ title }) => title)).toEqual([
      '钓鱼佬博物馆',
      '水面之下',
      '从生存到垂钓',
      '鱼各有其水',
      '手中的水下仪器',
      '读懂看不见的鱼',
      '谁坐在水边',
      '鱼不只活在水里',
      '钓获之后',
      '回到水边',
    ])
  })

  it('derives current, previous and next stages from a real URL', () => {
    const context = routeContext('/visit/history')
    expect(context.index).toBe(2)
    expect(context.current.title).toBe('从生存到垂钓')
    expect(context.previous.url).toBe('/visit/prologue')
    expect(context.next.url).toBe('/visit/fish')
  })

  it('recognizes static-host routes with a trailing slash', () => {
    const context = routeContext('/visit/fish/')

    expect(context.index).toBe(3)
    expect(context.current.title).toBe('鱼各有其水')
  })
})
