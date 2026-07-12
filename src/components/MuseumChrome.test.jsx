import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
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
})
