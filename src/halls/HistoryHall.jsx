import { AnimatePresence, motion } from 'motion/react'
import { Calendar, ChevronDown, Image as ImageIcon, ScrollText, ZoomIn } from 'lucide-react'
import { useMemo, useState } from 'react'
import ExhibitHeader from '../components/ExhibitHeader.jsx'
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
  const visibleTimeline = useMemo(() => timeline.map((item, index) => ({ item, index, era: historyEra(item, index) })).filter(({ era }) => activeEra === 'all' || era.id === activeEra), [activeEra, timeline])

  return (
    <main className="museum-hall museum-hall--history min-h-screen" data-motion-language="scroll">
      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        <ExhibitHeader eyebrow="HALL 01 / 第一展厅" title={hall.title} summary={hall.summary}>
          <span className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-xs">{timeline.length} 个历史节点</span>
          <span className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg shadow-xs">纵向时间轴</span>
        </ExhibitHeader>

        <HistoryEraFilter active={activeEra} onChange={(era) => { setActiveEra(era); setOpen(null) }} />
        <section className="relative ml-3 md:ml-12 pl-7 md:pl-14 py-4 space-y-7" aria-label="中国钓鱼史纵向时间轴">
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} className="absolute left-0 top-0 bottom-0 w-px bg-zinc-300 origin-top" aria-hidden="true" />
          {visibleTimeline.map(({ item, index }) => {
            const expanded = open === item.id
            const timelineImage = images.get(timelineImageId(item.image))
            return (
              <motion.article key={item.id} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-12%' }} transition={{ duration: 0.5, delay: Math.min(index * 0.025, 0.25) }} className="relative border-b border-zinc-200/80 pb-7">
                <span className={`absolute -left-[35px] md:-left-[63px] top-5 w-4 h-4 rounded-full border flex items-center justify-center bg-white shadow-xs transition-all ${expanded ? 'border-zinc-900 scale-110' : 'border-zinc-300'}`} aria-hidden="true"><i className={`w-1.5 h-1.5 rounded-full ${expanded ? 'bg-zinc-900' : 'bg-zinc-300'}`} /></span>
                <button type="button" onClick={() => setOpen(expanded ? null : item.id)} aria-expanded={expanded} className="w-full text-left grid grid-cols-1 md:grid-cols-[150px_1fr_auto] gap-3 md:gap-8 items-start group py-2">
                  <span className="font-mono space-y-1"><small className="block text-[9px] text-zinc-400">CHECKPOINT {String(index + 1).padStart(2, '0')}</small><strong className="text-xs text-zinc-700 flex items-center gap-1.5"><Calendar size={12} aria-hidden="true" />{item.period}</strong></span>
                  <span><strong className="text-lg md:text-xl text-zinc-900 group-hover:text-black block mb-2">{item.title}</strong><span className="text-sm leading-relaxed font-light text-zinc-600 block">{item.summary}</span></span>
                  <ChevronDown size={18} className={`mt-1 text-zinc-400 transition-transform duration-300 ${expanded ? 'rotate-180 text-zinc-900' : ''}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className={`pt-6 md:ml-[182px] grid gap-7 ${timelineImage ? 'lg:grid-cols-[1fr_260px]' : 'grid-cols-1'}`}>
                        <div className="space-y-5"><p className="text-sm leading-8 text-zinc-700 font-light">{item.detail}</p><div className="inline-flex items-center gap-2 text-[10px] font-mono text-zinc-500"><ScrollText size={13} aria-hidden="true" /><span>{item.theme}</span></div></div>
                        {timelineImage ? <figure className="space-y-2"><button type="button" aria-label={`查看图像 ${timelineImage.title.replaceAll('*', '')}`} onClick={() => setSelectedImage({ title: timelineImage.title.replaceAll('*', ''), url: imageUrl(timelineImage) })} className="relative w-full overflow-hidden rounded-2xl group"><motion.img whileHover={{ scale: 1.035 }} transition={{ duration: 0.5 }} src={imageUrl(timelineImage)} alt={timelineImage.title.replaceAll('*', '')} className="w-full aspect-[4/3] object-cover border border-zinc-200 bg-white shadow-sm" /><span className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/90 border border-zinc-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><ZoomIn size={15} /></span></button><figcaption className="text-[10px] leading-relaxed text-zinc-500 flex gap-1.5"><ImageIcon size={11} className="mt-0.5 shrink-0" aria-hidden="true" />{timelineImage.title.replaceAll('*', '')}</figcaption></figure> : null}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </section>
      </div>
      <HistoryImageViewer image={selectedImage} onClose={() => setSelectedImage(null)} />
    </main>
  )
}
