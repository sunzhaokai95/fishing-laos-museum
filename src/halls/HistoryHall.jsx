import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ZoomIn } from 'lucide-react'
import { useMemo, useState } from 'react'
import { timelineImageId } from '../data/history.js'
import HistoryEraFilter from '../experiences/history/HistoryEraFilter.jsx'
import HistoryImageViewer from '../experiences/history/HistoryImageViewer.jsx'
import { historyEra } from '../lib/experienceAdapters.js'
import { imageUrl } from '../lib/content.js'

export default function HistoryHall({ hall, data }) {
  const timeline = data['history-timeline']
  const [open, setOpen] = useState(timeline[0]?.id)
  const [activeEra, setActiveEra] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const visibleTimeline = useMemo(
    () => timeline
      .map((item, index) => ({ item, index, era: historyEra(item, index) }))
      .filter(({ era }) => activeEra === 'all' || era.id === activeEra),
    [activeEra, timeline],
  )

  return (
    <main className="museum-hall museum-hall--history history-theatre" data-motion-language="scroll">
      <header className="history-theatre__opening">
        <span className="history-theatre__ghost" aria-hidden="true">钓史</span>
        <div className="history-theatre__index"><span>HALL 01</span><strong>{timeline.length}</strong><small>历史节点</small></div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
          <span>第一展厅 / 中国钓鱼史</span>
          <h1>{hall.title}</h1>
          <p>{hall.summary}</p>
        </motion.div>
      </header>

      <HistoryEraFilter active={activeEra} onChange={(era) => { setActiveEra(era); setOpen(null) }} />

      <section className="history-river" aria-label="中国钓鱼史纵向时间轴">
        <motion.i className="history-river__line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} aria-hidden="true" />
        {visibleTimeline.map(({ item, index }) => {
          const expanded = open === item.id
          const timelineImage = images.get(timelineImageId(item.image))
          return (
            <motion.article
              key={item.id}
              layout="position"
              className={expanded ? 'is-open' : ''}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: .65, delay: Math.min(index * .018, .18) }}
            >
              <span className="history-river__mark" aria-hidden="true" />
              <div className="history-river__period"><small>{String(index + 1).padStart(2, '0')}</small><strong>{item.period}</strong></div>
              <button type="button" onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded} className="history-river__trigger">
                <span>CHECKPOINT {String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
                {expanded ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
              </button>

              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div className="history-river__detail" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .5, ease: [0.22, 1, 0.36, 1] }}>
                    <div>
                      <span>{item.theme}</span>
                      <p>{item.detail}</p>
                    </div>
                    {timelineImage ? (
                      <figure>
                        <button type="button" aria-label={`查看图像 ${timelineImage.title.replaceAll('*', '')}`} onClick={() => setSelectedImage({ title: timelineImage.title.replaceAll('*', ''), url: imageUrl(timelineImage) })}>
                          <img src={imageUrl(timelineImage)} alt={timelineImage.title.replaceAll('*', '')} />
                          <ZoomIn aria-hidden="true" />
                        </button>
                        <figcaption>{timelineImage.title.replaceAll('*', '')}</figcaption>
                      </figure>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
          )
        })}
      </section>
      <HistoryImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  )
}
