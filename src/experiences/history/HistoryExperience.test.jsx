import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import HistoryHall from '../../halls/HistoryHall.jsx'

const timeline = Array.from({ length: 31 }, (_, index) => ({
  id: `node-${index + 1}`,
  period: `时期 ${index + 1}`,
  title: `节点 ${index + 1}`,
  summary: `摘要 ${index + 1}`,
  detail: `详情 ${index + 1}`,
  theme: '历史主题',
  image: index === 0 ? 'IMG-HIS-001' : '',
}))

const data = {
  'history-timeline': timeline,
  images: [{ id: 'IMG-HIS-001', title: '历史图像', local_path: 'assets/history.webp' }],
}

describe('history experience', () => {
  afterEach(cleanup)

  it('filters the 31-node timeline by era and restores all nodes', () => {
    render(<HistoryHall hall={{ title: '从生存到垂钓', summary: '中国钓鱼史' }} data={data} />)
    expect(screen.getAllByRole('button', { name: /CHECKPOINT.*节点/ })).toHaveLength(31)

    fireEvent.click(screen.getByRole('button', { name: /现代转型/ }))
    expect(screen.queryByRole('button', { name: /节点 1\b/ })).not.toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /CHECKPOINT.*节点/ })).toHaveLength(6)

    fireEvent.click(screen.getByRole('button', { name: /全部时代/ }))
    expect(screen.getAllByRole('button', { name: /CHECKPOINT.*节点/ })).toHaveLength(31)
  })

  it('opens a real timeline image in a viewer and closes it with Escape', async () => {
    render(<HistoryHall hall={{ title: '从生存到垂钓', summary: '中国钓鱼史' }} data={data} />)
    fireEvent.click(screen.getByRole('button', { name: '查看图像 历史图像' }))
    expect(screen.getByRole('dialog', { name: '历史图像' })).toBeInTheDocument()
    fireEvent.keyDown(document, { key: 'Escape' })
    await waitFor(() => expect(screen.queryByRole('dialog', { name: '历史图像' })).not.toBeInTheDocument())
  })
})
