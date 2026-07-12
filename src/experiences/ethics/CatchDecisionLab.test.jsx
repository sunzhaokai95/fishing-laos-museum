import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { DECISION_CONFIRMATIONS } from '../../lib/experienceAdapters.js'
import CatchDecisionLab from './CatchDecisionLab.jsx'
import WatersidePledge from './WatersidePledge.jsx'

describe('catch decision laboratory', () => {
  afterEach(() => { cleanup(); vi.useRealTimers() })

  it('tracks confirmations without issuing a legal verdict', () => {
    render(<CatchDecisionLab />)
    fireEvent.change(screen.getByLabelText('国家或地区管理模型'), { target: { value: '日本' } })
    expect(screen.getByText(/都道府县调整规则/)).toBeInTheDocument()
    expect(screen.getByText('0 / 5 项已确认')).toBeInTheDocument()
    DECISION_CONFIRMATIONS.forEach((item) => fireEvent.click(screen.getByRole('checkbox', { name: item.label })))
    expect(screen.getByText('5 / 5 项已确认')).toBeInTheDocument()
    expect(screen.getByText('资料已齐备，可以向管理主体核对')).toBeInTheDocument()
    expect(screen.queryByText(/合法|违法/)).not.toBeInTheDocument()
  })

  it('reveals the local pledge stamp after an impact transition', () => {
    vi.useFakeTimers()
    render(<WatersidePledge />)
    expect(screen.getByText('姓名只用于当前页面生成印记，不会上传或保存。')).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText('署名'), { target: { value: '水边访客' } })
    fireEvent.click(screen.getByRole('button', { name: '签署承诺' }))
    expect(screen.getByText('正在落印')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getByText('水边守护')).toBeInTheDocument()
    expect(screen.getByText('水边访客')).toBeInTheDocument()
  })
})
