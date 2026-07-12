import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import MuseumChrome from './MuseumChrome.jsx'

describe('MuseumChrome', () => {
  afterEach(cleanup)

  it('shows URL-driven route status and adjacent hall links', () => {
    render(
      <MemoryRouter initialEntries={['/visit/history']}>
        <MuseumChrome />
      </MemoryRouter>,
    )

    expect(screen.getByText('03 / 10')).toBeInTheDocument()
    expect(screen.getByText('从生存到垂钓')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /上一厅.*水面之下/ })).toHaveAttribute('href', '/visit/prologue')
    expect(screen.getByRole('link', { name: /下一厅.*鱼各有其水/ })).toHaveAttribute('href', '/visit/fish')
  })

  it('opens one ordered museum map with all ten stages', () => {
    render(
      <MemoryRouter initialEntries={['/visit/history']}>
        <MuseumChrome />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '展厅地图' }))
    const map = screen.getByRole('dialog', { name: '展厅地图' })
    expect(map).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /第.*站/ })).toHaveLength(10)
  })

  it('navigates the single route with arrow keys unless a field is focused', () => {
    render(
      <MemoryRouter initialEntries={['/visit/history']}>
        <MuseumChrome><input aria-label="展厅输入" /><LocationProbe /></MuseumChrome>
      </MemoryRouter>,
    )

    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByTestId('location')).toHaveTextContent('/visit/fish')

    const input = screen.getByRole('textbox', { name: '展厅输入' })
    input.focus()
    fireEvent.keyDown(window, { key: 'ArrowRight' })
    expect(screen.getByTestId('location')).toHaveTextContent('/visit/fish')
  })

  it('locks background scrolling and restores focus when the map closes', async () => {
    render(
      <MemoryRouter initialEntries={['/visit/history']}>
        <MuseumChrome />
      </MemoryRouter>,
    )

    const trigger = screen.getByRole('button', { name: '展厅地图' })
    trigger.focus()
    fireEvent.click(trigger)
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog', { name: '展厅地图' })).not.toBeInTheDocument())
    expect(document.body.style.overflow).toBe('')
    expect(trigger).toHaveFocus()
  })
})

function LocationProbe() {
  const location = useLocation()
  return <span data-testid="location">{location.pathname}</span>
}
