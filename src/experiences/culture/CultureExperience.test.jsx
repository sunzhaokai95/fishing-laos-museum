import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import LanguageIndex from './LanguageIndex.jsx'
import MetaphysicsCabinet from './MetaphysicsCabinet.jsx'
import PoetryFolios from './PoetryFolios.jsx'
import CultureHall from '../../halls/CultureHall.jsx'

const items = [
  { id: 'one', title: '条目一', text: '第一条完整说明。' },
  { id: 'two', title: '条目二', text: '第二条完整说明。' },
]

describe('culture reading modes', () => {
  afterEach(cleanup)

  it('uses a folio theatre for the three cultural reading modes', () => {
    const { container } = render(<CultureHall hall={{ title: '鱼不只活在水里', summary: '鱼文化' }} data={{ 'collection-items': [], images: [] }} />)
    expect(container.querySelector('main')).toHaveClass('culture-theatre')
  })

  it('opens a complete language entry instead of repeating the preview sentence', () => {
    render(<CultureHall hall={{ title: '鱼不只活在水里', summary: '鱼文化' }} data={{
      images: [],
      'collection-items': [{
        id: 'term',
        title: '打龟',
        collection_type: 'folklore',
        image_ids: [],
        body_markdown: '# 打龟\n\n空手而归的社群说法。\n\n它在不同地区的使用范围并不相同。',
      }],
    }} />)
    fireEvent.click(screen.getByRole('button', { name: '钓鱼人的语言' }))
    fireEvent.click(screen.getByRole('button', { name: '查看完整词条' }))
    expect(screen.getByRole('dialog', { name: '打龟' })).toBeInTheDocument()
    expect(screen.getByText('它在不同地区的使用范围并不相同。')).toBeInTheDocument()
  })

  it('uses a paged folio for poetry and image culture', () => {
    render(<PoetryFolios items={items} onOpen={() => {}} />)
    expect(screen.getByRole('region', { name: '诗画册页' })).toBeInTheDocument()
    expect(screen.queryByText('鱼')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '下一册页' }))
    expect(screen.getByRole('heading', { name: '条目二' })).toBeInTheDocument()
  })

  it('uses a language index with a changing definition stage', () => {
    render(<LanguageIndex items={items} onOpen={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: '条目二' }))
    expect(screen.getByRole('heading', { name: '条目二' })).toBeInTheDocument()
    expect(screen.getByText('第二条完整说明。')).toBeInTheDocument()
  })

  it('updates the metaphysics analysis stage when a specimen is selected', () => {
    render(<MetaphysicsCabinet items={items} />)
    fireEvent.click(screen.getByRole('button', { name: '打开标本 条目二' }))
    expect(screen.getByRole('heading', { name: '条目二' })).toBeInTheDocument()
    expect(screen.getByText('第二条完整说明。')).toBeInTheDocument()
  })
})
