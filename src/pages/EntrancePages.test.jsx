import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import EpilogueHall from '../halls/EpilogueHall.jsx'
import PrologueHall from '../halls/PrologueHall.jsx'
import HomePage from './HomePage.jsx'

describe('entrance, prologue and epilogue content contract', () => {
  afterEach(cleanup)

  it('uses the approved museum image as one spatial entry with a static fallback', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: '钓鱼佬博物馆' })).toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: '进入博物馆' })).toHaveAttribute('href', '/visit/prologue')
    expect(screen.getByTestId('museum-hero-scene')).toHaveAttribute('data-renderer', 'three')
    expect(screen.getByRole('img', { name: '水边与展厅相连的钓鱼佬博物馆' })).toHaveAttribute(
      'src',
      expect.stringContaining('fishing-museum-hero-parallax'),
    )
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(container.querySelector('section')).not.toBeInTheDocument()
  })

  it('passes bounded pointer coordinates to the spatial scene', () => {
    const { container } = render(<MemoryRouter><HomePage /></MemoryRouter>)
    fireEvent.pointerMove(container.firstChild, { clientX: 120, clientY: 80 })
    expect(screen.getByTestId('museum-hero-scene')).toHaveAttribute('data-pointer-ready', 'true')
  })

  it('keeps the prologue as one continuous paragraph', () => {
    const { container } = render(<PrologueHall />)
    expect(screen.getByRole('heading', { name: '水面之下' })).toBeInTheDocument()
    expect(container.querySelectorAll('p')).toHaveLength(1)
    expect(container.firstChild).toHaveClass('min-h-[calc(100svh-132px)]')
  })

  it('synchronizes the prologue depth slider and numerical readout', () => {
    render(<PrologueHall />)
    fireEvent.change(screen.getByRole('slider', { name: '观察深度' }), { target: { value: '68' } })
    expect(screen.getByText('68 / 100')).toBeInTheDocument()
  })

  it('keeps the epilogue as one concluding paragraph', () => {
    const { container } = render(
      <MemoryRouter>
        <EpilogueHall />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: '回到水边' })).toBeInTheDocument()
    expect(screen.getAllByText(/./, { selector: 'p' })).toHaveLength(1)
    expect(container.firstChild).toHaveClass('min-h-[calc(100svh-132px)]')
  })
})
