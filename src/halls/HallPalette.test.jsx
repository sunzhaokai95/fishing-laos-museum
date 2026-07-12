import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import AnglersHall from './AnglersHall.jsx'
import CultureHall from './CultureHall.jsx'
import EthicsHall from './EthicsHall.jsx'
import FishHall from './FishHall.jsx'
import TackleHall from './TackleHall.jsx'
import TechniquesHall from './TechniquesHall.jsx'

const hall = { title: '展厅', summary: '展厅说明' }
const emptyData = { 'collection-items': [], 'baike-library': [], 'fish-library': [], images: [] }

describe('museum hall palette', () => {
  afterEach(cleanup)

  it.each([
    ['fish', <FishHall key="fish" hall={hall} data={emptyData} />],
    ['tackle', <TackleHall key="tackle" hall={hall} data={emptyData} />],
    ['techniques', <TechniquesHall key="techniques" hall={hall} />],
    ['anglers', <AnglersHall key="anglers" hall={hall} data={emptyData} />],
    ['culture', <CultureHall key="culture" hall={hall} data={emptyData} />],
    ['ethics', <EthicsHall key="ethics" hall={hall} />],
  ])('keeps %s on the neutral museum surface', (_name, component) => {
    const { container } = render(component)
    expect(container.querySelector('main')).toHaveClass('bg-[#f5f5f7]')
  })
})
