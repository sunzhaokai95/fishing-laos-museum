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
    render(<TackleStressLab records={records} onOpen={onOpen} />)
    expect(screen.getByRole('heading', { name: '手竿' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '选择轮系统' }))
    expect(screen.getByRole('heading', { name: '纺车轮' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '查看纺车轮详情' }))
    expect(onOpen).toHaveBeenCalledWith(records[1])
  })

  it('changes the SVG load path and reports a high relative load', () => {
    render(<TackleStressLab records={records} onOpen={() => {}} />)
    const path = screen.getByTestId('tackle-load-path')
    const initial = path.getAttribute('d')
    fireEvent.change(screen.getByLabelText('相对负载'), { target: { value: '90' } })
    expect(path.getAttribute('d')).not.toBe(initial)
    expect(screen.getByText('高负载区')).toBeInTheDocument()
    expect(screen.getByText(/降低持续拉力/)).toBeInTheDocument()
  })
})
