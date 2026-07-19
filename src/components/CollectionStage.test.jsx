import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import CollectionStage from './CollectionStage.jsx'
import useStageCarousel from '../hooks/useStageCarousel.js'

function CarouselHarness() {
  const carousel = useStageCarousel(4, 650)
  return (
    <div data-testid="carousel" data-active-index={carousel.activeIndex}>
      <button type="button" onClick={carousel.previous}>上一件</button>
      <button type="button" onClick={carousel.next}>下一件</button>
      {[0, 1, 2, 3].map((index) => <span data-role={carousel.roleFor(index)} key={index}>{index}</span>)}
    </div>
  )
}

describe('fullscreen collection stage', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('exposes grain, giant type and edge slots without imposing content layout', () => {
    const { container } = render(
      <CollectionStage label="鱼类" eyebrow="第二展厅" caption={<p>鱼各有其水</p>} controls={<button type="button">切换</button>}>
        <img src="/fish.webp" alt="鲤鱼" />
      </CollectionStage>,
    )
    expect(container.querySelector('.collection-stage-grain')).toBeInTheDocument()
    expect(screen.getByText('鱼类')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('第二展厅')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '鲤鱼' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '切换' })).toBeInTheDocument()
  })

  it('rotates four object roles with buttons and arrow keys', () => {
    vi.useFakeTimers()
    render(<CarouselHarness />)
    expect(screen.getByTestId('carousel')).toHaveAttribute('data-active-index', '0')
    expect(screen.getByText('0')).toHaveAttribute('data-role', 'center')
    expect(screen.getByText('1')).toHaveAttribute('data-role', 'right')
    expect(screen.getByText('2')).toHaveAttribute('data-role', 'back')
    expect(screen.getByText('3')).toHaveAttribute('data-role', 'left')
    fireEvent.click(screen.getByRole('button', { name: '下一件' }))
    expect(screen.getByTestId('carousel')).toHaveAttribute('data-active-index', '1')
    vi.advanceTimersByTime(651)
    fireEvent.keyDown(window, { key: 'ArrowLeft' })
    expect(screen.getByTestId('carousel')).toHaveAttribute('data-active-index', '0')
  })
})
