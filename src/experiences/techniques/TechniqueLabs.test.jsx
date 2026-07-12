import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import TechniquesHall from '../../halls/TechniquesHall.jsx'
import BaitDispersionLab from './BaitDispersionLab.jsx'
import FishControlLab from './FishControlLab.jsx'
import FloatSignalLab from './FloatSignalLab.jsx'
import RodAngleLab from './RodAngleLab.jsx'

describe('technique laboratories', () => {
  afterEach(() => { cleanup(); vi.useRealTimers() })

  it('switches among four float signal states', () => {
    render(<FloatSignalLab />)
    for (const state of ['静止', '轻颤', '下沉', '上浮']) {
      fireEvent.click(screen.getByRole('button', { name: `观察${state}漂相` }))
      expect(screen.getByTestId('float-signal-stage')).toHaveAttribute('data-state', state)
    }
  })

  it('labels bait dispersion and rod-angle risk bands', () => {
    const { unmount } = render(<BaitDispersionLab />)
    fireEvent.change(screen.getByLabelText('雾化速度'), { target: { value: '82' } })
    expect(screen.getByText('快速散开')).toBeInTheDocument()
    unmount()
    render(<RodAngleLab />)
    fireEvent.change(screen.getByRole('slider', { name: '竿身角度' }), { target: { value: '80' } })
    expect(screen.getByText('高角度风险')).toBeInTheDocument()
  })

  it('starts and stops the fish-control path without leaking its timer', () => {
    vi.useFakeTimers()
    render(<FishControlLab />)
    fireEvent.click(screen.getByRole('button', { name: '开始控鱼演示' }))
    act(() => vi.advanceTimersByTime(500))
    expect(Number(screen.getByTestId('fish-control-progress').textContent)).toBeGreaterThan(0)
    fireEvent.click(screen.getByRole('button', { name: '停止控鱼演示' }))
    expect(screen.getByRole('button', { name: '开始控鱼演示' })).toBeInTheDocument()
  })

  it('selects the matching simulator when technique categories change', () => {
    render(<TechniquesHall hall={{ title: '读懂看不见的鱼', summary: '动作与判断' }} />)
    expect(screen.getByRole('heading', { name: '饵料状态观察' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '漂技' }))
    expect(screen.getByRole('heading', { name: '浮漂信号观察' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '鱼技' }))
    expect(screen.getByRole('heading', { name: '控鱼轨迹观察' })).toBeInTheDocument()
  })
})
