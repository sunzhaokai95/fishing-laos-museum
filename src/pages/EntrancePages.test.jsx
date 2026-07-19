import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import EpilogueHall from '../halls/EpilogueHall.jsx'
import PrologueHall from '../halls/PrologueHall.jsx'
import HomePage from './HomePage.jsx'

describe('entrance, prologue and epilogue content contract', () => {
  afterEach(cleanup)

  it('opens directly into one fullscreen four-object collection theatre', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: '钓鱼佬博物馆' })).toBeInTheDocument()
    expect(screen.getAllByTestId('home-collection-object')).toHaveLength(4)
    expect(screen.getAllByRole('link')).toHaveLength(1)
    expect(screen.getByRole('link', { name: '开始参观' })).toHaveAttribute('href', '/visit/prologue')
    expect(screen.getByRole('button', { name: '上一件藏品' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '下一件藏品' })).toBeInTheDocument()
    expect(screen.getByTestId('museum-hero-scene')).toHaveAttribute('data-renderer', 'three')
    expect(container.querySelector('canvas')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '进入空间' })).not.toBeInTheDocument()
  })

  it('moves the center object, giant label and description as one state', () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>)
    expect(screen.getByTestId('home-collection-theatre')).toHaveAttribute('data-active-index', '0')
    expect(screen.getByText('鱼类')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('水下不是同一种空间')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '下一件藏品' }))
    expect(screen.getByTestId('home-collection-theatre')).toHaveAttribute('data-active-index', '1')
    expect(screen.getByText('钓史')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('时间留下的钩与图像')).toBeInTheDocument()
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
    expect(container.firstChild).toHaveClass('prologue-theatre')
    expect(screen.getByText('水下', { selector: '[aria-hidden="true"]' })).toBeInTheDocument()
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
    expect(container.firstChild).toHaveClass('epilogue-theatre')
    expect(screen.getByText('回', { selector: '[aria-hidden="true"]' })).toBeInTheDocument()
  })
})
