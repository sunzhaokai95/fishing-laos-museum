import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import TackleHall from './TackleHall.jsx'

const data = {
  images: [{ id: 'float-image', local_path: 'assets/float.webp' }],
  'collection-items': [{
    id: 'object-seven-star-float',
    title: '七星漂',
    collection_type: 'objects',
    image_ids: ['float-image'],
    body_markdown: '# 七星漂\n\n数枚浮子分布在线上，用来传递水下触碰与位移。',
  }],
  'baike-library': [{
    article_id: '131',
    title: '台钓竿',
    category_name: '渔具配件',
    image_urls_local: ['/content/reference/rod.jpg'],
    body_markdown: '# 台钓竿\n\n台钓竿承担抛投、控线与传递受力。',
  }],
}

describe('tackle hall text collection', () => {
  afterEach(cleanup)

  it('presents instruments and fishing systems entirely as text', () => {
    render(<TackleHall hall={{ title: '手中的水下仪器', summary: '器物说明' }} data={data} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByText(/器物图像/)).not.toBeInTheDocument()
    expect(screen.getByText('器物释义用于辨认结构、用途，以及它在钓组中的位置。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '台钓' })).toBeInTheDocument()
    expect(screen.getByText('以竿、线、漂、坠、钩与饵构成可调钓组，通过调漂和饵料状态读取水下信号。')).toBeInTheDocument()
  })
})
