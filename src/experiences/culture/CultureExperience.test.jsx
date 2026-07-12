import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import LanguageIndex from './LanguageIndex.jsx'
import MetaphysicsCabinet from './MetaphysicsCabinet.jsx'
import PoetryFolios from './PoetryFolios.jsx'

const items = [
  { id: 'one', title: '条目一', text: '第一条完整说明。' },
  { id: 'two', title: '条目二', text: '第二条完整说明。' },
]

describe('culture reading modes', () => {
  afterEach(cleanup)

  it('uses a paged folio for poetry and image culture', () => {
    render(<PoetryFolios items={items} onOpen={() => {}} />)
    expect(screen.getByRole('region', { name: '诗画册页' })).toBeInTheDocument()
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
