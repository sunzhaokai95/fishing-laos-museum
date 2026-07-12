import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'
import { useState } from 'react'
import { timelineImageId } from '../data/history.js'
import { imageUrl } from '../lib/content.js'

export default function HistoryHall({ hall, data }) {
  const [open, setOpen] = useState(data['history-timeline'][0]?.id)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  return (
    <main className="exhibition-scene history-scene">
      <header className="scene-intro history-intro">
        <span>第一展厅</span>
        <h1>{hall.title}</h1>
        <p>{hall.summary}</p>
        <div className="scene-stat"><strong>{data['history-timeline'].length}</strong><span>个历史节点</span></div>
      </header>
      <section className="timeline-section" aria-label="中国钓鱼史纵向时间轴">
        <div className="timeline-spine" aria-hidden="true" />
        {data['history-timeline'].map((item, index) => {
          const expanded = open === item.id
          const timelineImage = images.get(timelineImageId(item.image))
          return (
            <article className={`timeline-event ${expanded ? 'is-open' : ''}`} key={item.id}>
              <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
              <button type="button" onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded}>
                <span className="timeline-period">{item.period}</span>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <ChevronDown aria-hidden="true" />
              </button>
              {expanded ? (
                <div className="timeline-detail">
                  {timelineImage ? <figure><img src={imageUrl(timelineImage)} alt={timelineImage.title.replaceAll('*', '')} /><figcaption>{timelineImage.title.replaceAll('*', '')}</figcaption></figure> : null}
                  <dl>
                    <div><dt>主题</dt><dd>{item.theme}</dd></div>
                    <div><dt>材料性质</dt><dd>{item.status}</dd></div>
                  </dl>
                  <p>{item.detail}</p>
                  {item.image && !item.image.startsWith('待补') ? <small>{item.image}</small> : null}
                </div>
              ) : null}
            </article>
          )
        })}
      </section>
    </main>
  )
}
