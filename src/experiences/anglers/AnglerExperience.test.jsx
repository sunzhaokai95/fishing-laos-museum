import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ANGLER_QUESTIONS } from '../../data/anglerInteractives.js'
import { PEOPLE_GROUPS } from '../../data/people.js'
import AnglerAssessment from './AnglerAssessment.jsx'
import AnglerIdentityStage from './AnglerIdentityStage.jsx'
import WaterFortuneDraw from './WaterFortuneDraw.jsx'
import AnglersHall from '../../halls/AnglersHall.jsx'

const records = PEOPLE_GROUPS.map((group, index) => ({ id: group.recordIds[0] || `record-${index}`, title: `${group.label}人物`, text: `${group.label}记录`, kind: '人物记录', groupId: group.id }))

describe('angler experiences', () => {
  afterEach(() => { cleanup(); vi.useRealTimers() })

  it('uses a portrait theatre without changing the six identity groups', () => {
    const data = { 'collection-items': [], 'baike-library': [] }
    const { container } = render(<AnglersHall hall={{ title: '谁坐在水边', summary: '身份' }} data={data} />)
    expect(container.querySelector('main')).toHaveClass('anglers-theatre')
  })

  it('switches all six identity groups and opens a real record', () => {
    const onOpen = vi.fn()
    render(<AnglerIdentityStage groups={PEOPLE_GROUPS} records={records} onOpen={onOpen} />)
    PEOPLE_GROUPS.forEach((group) => expect(screen.getByRole('button', { name: group.label })).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: '文学中的钓者' }))
    expect(screen.getByRole('heading', { name: '文学中的钓者人物' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '查看文学中的钓者人物' }))
    expect(onOpen).toHaveBeenCalled()
  })

  it('runs four questions, reveals dimension bars, and resets', () => {
    vi.useFakeTimers()
    render(<AnglerAssessment />)
    fireEvent.click(screen.getByRole('button', { name: '开始水边自测' }))
    for (let index = 0; index < ANGLER_QUESTIONS.length; index += 1) fireEvent.click(screen.getAllByRole('button', { name: ANGLER_QUESTIONS[index].options[0].text })[0])
    expect(screen.getByText('正在整理四次选择')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getAllByRole('progressbar')).toHaveLength(4)
    fireEvent.click(screen.getByRole('button', { name: '重新测试' }))
    expect(screen.getByRole('button', { name: '开始水边自测' })).toBeInTheDocument()
  })

  it('keeps the folklore disclaimer and reveals a redrawable result', () => {
    vi.useFakeTimers()
    render(<WaterFortuneDraw />)
    expect(screen.getByText('民俗互动，不预测鱼情')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: '抽取签语' }))
    expect(screen.getByText('正在从标本柜中取出签语')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(700))
    expect(screen.getByRole('button', { name: '再抽一签' })).toBeInTheDocument()
  })
})
