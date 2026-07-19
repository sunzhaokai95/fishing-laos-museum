import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import AnglersHall from './AnglersHall.jsx'
import CultureHall from './CultureHall.jsx'
import EthicsHall from './EthicsHall.jsx'
import FishHall from './FishHall.jsx'
import HistoryHall from './HistoryHall.jsx'
import TackleHall from './TackleHall.jsx'
import TechniquesHall from './TechniquesHall.jsx'

const hall = { title: '展厅', summary: '展厅说明' }
const emptyData = { 'collection-items': [], 'baike-library': [], 'fish-library': [], 'history-timeline': [], images: [] }

describe('museum hall visual languages', () => {
  afterEach(cleanup)

  it.each([
    ['history', 'scroll', <HistoryHall key="history" hall={hall} data={emptyData} />],
    ['fish', 'shoal', <FishHall key="fish" hall={hall} data={emptyData} />],
    ['tackle', 'workbench', <TackleHall key="tackle" hall={hall} data={emptyData} />],
    ['techniques', 'gesture', <TechniquesHall key="techniques" hall={hall} />],
    ['anglers', 'portraits', <AnglersHall key="anglers" hall={hall} data={emptyData} />],
    ['culture', 'folios', <CultureHall key="culture" hall={hall} data={emptyData} />],
    ['ethics', 'judgment', <EthicsHall key="ethics" hall={hall} />],
  ])('gives %s a distinct %s motion language', (name, language, component) => {
    const { container } = render(component)
    expect(container.querySelector('main')).toHaveClass('museum-hall', `museum-hall--${name}`)
    expect(container.querySelector('main')).toHaveAttribute('data-motion-language', language)
  })
})
