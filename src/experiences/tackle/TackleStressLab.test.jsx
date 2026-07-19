import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TackleStressLab from './TackleStressLab.jsx'

const records = [
  { id: 'rod', title: '手竿', description: '传递动作与受力。', kind: '钓具', system: '竿' },
  { id: 'reel', title: '纺车轮', description: '收放钓线。', kind: '钓具', system: '轮' },
  { id: 'line', title: '尼龙线', description: '连接器物。', kind: '钓具', system: '线' },
]

describe('tackle stress laboratory', () => {
  afterEach(cleanup)

  it('switches systems and opens the selected real record', () => {
    const onOpen = vi.fn()
    const { container } = render(<TackleStressLab records={records} onOpen={onOpen} />)
    expect(container.querySelector('section')).toHaveClass('tackle-object-stage')
    expect(screen.getByRole('heading', { name: '手竿' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '选择轮系统' }))
    expect(screen.getByRole('heading', { name: '纺车轮' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '查看纺车轮详情' }))
    expect(onOpen).toHaveBeenCalledWith(records[1])
  })

  it('keeps the selected instrument explanation central without a relative-load control', () => {
    render(<TackleStressLab records={records} onOpen={() => {}} />)
    expect(screen.queryByRole('slider', { name: '相对负载' })).not.toBeInTheDocument()
    expect(screen.queryByTestId('tackle-load-path')).not.toBeInTheDocument()
    expect(screen.getByText('传递动作与受力。')).toBeInTheDocument()
    expect(screen.getByText('器物说明')).toBeInTheDocument()
  })
})
