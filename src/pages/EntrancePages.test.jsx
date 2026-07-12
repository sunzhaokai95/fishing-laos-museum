import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import EpilogueHall from '../halls/EpilogueHall.jsx'
import PrologueHall from '../halls/PrologueHall.jsx'
import HomePage from './HomePage.jsx'

describe('entrance, prologue and epilogue content contract', () => {
  afterEach(cleanup)

  it('keeps the homepage to one museum entry without an unapproved image', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: '钓鱼佬博物馆' })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: '进入博物馆' })).toHaveAttribute('href', '/visit/prologue')
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('keeps the prologue as one continuous paragraph', () => {
    const { container } = render(<PrologueHall />)
    expect(screen.getByRole('heading', { name: '水面之下' })).toBeInTheDocument()
    expect(container.querySelectorAll('p')).toHaveLength(1)
  })

  it('keeps the epilogue as one concluding paragraph', () => {
    render(
      <MemoryRouter>
        <EpilogueHall />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: '回到水边' })).toBeInTheDocument()
    expect(screen.getAllByText(/./, { selector: 'p' })).toHaveLength(1)
  })
})
