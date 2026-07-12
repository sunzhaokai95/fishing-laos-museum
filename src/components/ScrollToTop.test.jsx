import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScrollToTop } from '../App.jsx'

describe('ScrollToTop', () => {
  afterEach(() => vi.restoreAllMocks())

  it('does not return the browser scroll result as an effect cleanup', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => Promise.resolve())
    const view = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>,
    )
    expect(() => view.unmount()).not.toThrow()
  })
})
