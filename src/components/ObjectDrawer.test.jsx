import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import ObjectDrawer from './ObjectDrawer.jsx'

describe('ObjectDrawer', () => {
  afterEach(cleanup)

  it('portals the detail layer to the viewport instead of the transformed hall', () => {
    render(<div data-testid="hall"><ObjectDrawer open title="完整词条" onClose={() => {}}><p>完整正文</p></ObjectDrawer></div>)
    const dialog = screen.getByRole('dialog', { name: '完整词条' })
    expect(dialog.closest('.object-drawer-layer')?.parentElement).toBe(document.body)
    expect(screen.getByText('完整正文')).toBeInTheDocument()
  })
})
