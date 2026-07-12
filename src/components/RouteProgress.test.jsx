import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import RouteProgress from './RouteProgress.jsx'

describe('RouteProgress', () => {
  it('marks the current gallery without relying on color alone', () => {
    render(
      <MemoryRouter>
        <RouteProgress currentStage="02" />
      </MemoryRouter>,
    )
    expect(screen.getByRole('navigation', { name: '常设展参观进度' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '02' })).toHaveAttribute('aria-current', 'step')
    expect(screen.getByText('尾厅')).toBeInTheDocument()
  })
})
