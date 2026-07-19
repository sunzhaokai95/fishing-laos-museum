import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import HallPage from './HallPage.jsx'

describe('hall page delivery', () => {
  afterEach(cleanup)

  it('renders a content-only hall immediately without a lazy chunk fallback', () => {
    render(<HallPage hallId="techniques" data={{}} />)

    expect(screen.getByRole('heading', { name: '读懂看不见的鱼' })).toBeInTheDocument()
    expect(screen.queryByText('正在打开展厅')).not.toBeInTheDocument()
  })
})
