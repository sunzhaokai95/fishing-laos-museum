import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import OptionalImage from './OptionalImage.jsx'

describe('OptionalImage', () => {
  it('renders nothing when an approved image is unavailable', () => {
    const { container } = render(<OptionalImage />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the image only when a usable URL is provided', () => {
    render(<OptionalImage src="/fish.webp" alt="鲫鱼" />)
    expect(screen.getByRole('img', { name: '鲫鱼' })).toHaveAttribute('src', '/fish.webp')
  })
})
