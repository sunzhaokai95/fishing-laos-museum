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
    expect(screen.getByRole('banner')).toHaveClass('museum-edge-header')
    expect(screen.getByRole('link', { name: /上一厅.*水面之下/ })).toHaveAttribute('href', '/visit/prologue')
    expect(screen.getByRole('link', { name: /下一厅.*鱼各有其水/ })).toHaveAttribute('href', '/visit/fish')
  })

  it('keeps route controls on one edge footer with a visible linear index', () => {
    render(<MemoryRouter initialEntries={['/visit/history']}><MuseumChrome /></MemoryRouter>)
    expect(screen.getByRole('contentinfo')).toHaveClass('museum-edge-footer')
    expect(screen.getByRole('navigation', { name: '常设展线性进度' })).toBeInTheDocument()
  })

  it('keeps the homepage entry unique and free of the route footer', () => {
    render(<MemoryRouter initialEntries={['/']}><MuseumChrome><div data-testid="home-scene" /></MuseumChrome></MemoryRouter>)
    expect(screen.getByTestId('home-scene')).toBeInTheDocument()
    expect(screen.queryByRole('banner')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '打开参观目录' })).not.toBeInTheDocument()
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /下一厅/ })).not.toBeInTheDocument()
  })

  it('opens one fullscreen ordered directory with all ten stages', () => {
    render(
      <MemoryRouter initialEntries={['/visit/history']}>
        <MuseumChrome />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: '打开参观目录' }))
    const map = screen.getByRole('dialog', { name: '参观目录' })
    expect(map).toBeInTheDocument()
    expect(map.parentElement).toBe(document.body)
    expect(map).toHaveClass('museum-route-overlay')
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

    const trigger = screen.getByRole('button', { name: '打开参观目录' })
    trigger.focus()
    fireEvent.click(trigger)
    expect(document.body.style.overflow).toBe('hidden')
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog', { name: '参观目录' })).not.toBeInTheDocument())
    expect(document.body.style.overflow).toBe('')
    expect(trigger).toHaveFocus()
  })
})

function LocationProbe() {
  const location = useLocation()
  return <span data-testid="location">{location.pathname}</span>
}
