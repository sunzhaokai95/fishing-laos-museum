import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import FishHall from '../../halls/FishHall.jsx'
import FishOrbitCanopy from './FishOrbitCanopy.jsx'
import FishStats from './FishStats.jsx'

const fish = Array.from({ length: 15 }, (_, index) => ({
  slug: `fish-${index + 1}`,
  list_position: index + 1,
  name: `鱼种 ${index + 1}`,
  scientific_name: `Piscis ${index + 1}`,
  aliases: '',
  summary: index === 14 ? '远洋深海大型鱼类，需要船钓和重型装备。' : '常见淡水鱼类。',
  image_url: index % 2 === 0 ? `/fish-${index + 1}.webp` : '',
  fields: {
    科: index < 8 ? '鲤科' : '鲈科',
    水层: index % 3 === 0 ? '上层' : index % 3 === 1 ? '中层' : '底层',
    食性: index % 2 === 0 ? '杂食' : '肉食',
    体长: index === 14 ? '250 厘米' : '30 厘米',
  },
  bait_options: index === 14 ? [] : ['蚯蚓', '玉米'],
}))

describe('fish orbit canopy', () => {
  afterEach(cleanup)

  it('derives distribution totals from the complete collection', () => {
    render(<FishStats fish={fish} />)
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('上层 5')).toBeInTheDocument()
    expect(screen.getByText('中层 5')).toBeInTheDocument()
    expect(screen.getByText('底层 5')).toBeInTheDocument()
  })

  it('shows no more than twelve specimens and supports reshuffle and selection', () => {
    const onSelect = vi.fn()
    render(<FishOrbitCanopy fish={fish} onSelect={onSelect} />)
    expect(screen.getAllByRole('button', { name: /观察鱼种/ })).toHaveLength(12)
    expect(screen.getByTestId('fish-orbit-canopy')).toHaveAttribute('data-generation', '0')

    fireEvent.click(screen.getByRole('button', { name: '换一组鱼群' }))
    expect(screen.getByTestId('fish-orbit-canopy')).toHaveAttribute('data-generation', '1')
    fireEvent.click(screen.getAllByRole('button', { name: /观察鱼种/ })[0])
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('filters the catalogue by difficulty and resets all filters', () => {
    render(<FishHall hall={{ title: '鱼各有其水', summary: '鱼类标本' }} data={{ 'fish-library': fish }} />)
    fireEvent.change(screen.getByLabelText('钓获难度'), { target: { value: '4' } })
    expect(screen.getByText('当前水域找到 1 种')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '重置全部筛选' }))
    expect(screen.getByText('当前水域找到 15 种')).toBeInTheDocument()
  })
})
