import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { objectNoteFor } from '../data/tackleObjectNotes.js'
import { tackleSystemFor } from '../experiences/tackle/tackleSystems.js'
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
  }, {
    article_id: '130',
    title: '振出式钓竿',
    category_name: '渔具配件',
    body_markdown: '# 振出式钓竿',
  }],
}

describe('tackle hall text collection', () => {
  afterEach(cleanup)

  it('presents instruments and fishing systems entirely as text', () => {
    render(<TackleHall hall={{ title: '手中的水下仪器', summary: '器物说明' }} data={data} />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByText(/器物图像/)).not.toBeInTheDocument()
    expect(screen.getByText('器物释义用于辨认结构、用途，以及它在钓组中的位置。')).toBeInTheDocument()
    expect(screen.getByText('专用于悬坠钓法的手竿，多采用可伸缩的振出结构。竿体轻、节段较长，依调性和强度分型，负责抛送钓组、传递鱼讯，并以竿身弹性缓冲鱼的冲击。')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /振出式钓竿/ }))
    expect(screen.getByText('多节中空竿节由细至粗套接，使用时逐节抽出并锁定，收纳时缩回底柄。它便于携带、展开迅速；抽收须依次进行，避免接口过紧、夹砂或竿节受损。')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '台钓' })).toBeInTheDocument()
    expect(screen.getByText('以竿、线、漂、坠、钩与饵构成可调钓组，通过调漂和饵料状态读取水下信号。')).toBeInTheDocument()
  })

  it('keeps curated object notes for entries whose source intros are unsuitable', () => {
    const titles = [
      '鱼钩', '关东钩、新关东钩', '伊豆钩', '滞线', '诱饵笼', '台钓竿', '振出式钓竿',
      '海竿', '木虾钩', '阿波漂', '水溶袋', '鱼铃铛', '香虎', '夜钓灯', '子线尺',
      '脱钩器', '绑钩器', '九一八·野战', '速攻', '天元邓刚浮钓鲢鳙', '易包搞定', '蓝鲫',
    ]

    expect(titles.every((title) => objectNoteFor(title).length >= 45)).toBe(true)
    expect(tackleSystemFor('天元邓刚浮钓鲢鳙')).toBe('饵')
    expect(tackleSystemFor('易包搞定')).toBe('饵')
  })
})
