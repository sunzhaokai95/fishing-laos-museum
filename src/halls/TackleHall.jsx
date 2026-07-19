import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { HISTORICAL_OBJECT_IDS } from '../data/history.js'
import TackleStressLab from '../experiences/tackle/TackleStressLab.jsx'
import { tackleSystemFor } from '../experiences/tackle/tackleSystems.js'
import { imageUrl, publicBodyParagraphs } from '../lib/content.js'

const METHODS = ['台钓', '传统钓', '路亚', '飞蝇钓', '冰钓', '筏钓', '矶钓', '延绳钓']

export default function TackleHall({ hall, data }) {
  const [selected, setSelected] = useState(null)
  const images = useMemo(() => new Map(data.images.map((item) => [item.id, item])), [data.images])
  const records = useMemo(() => {
    const objects = data['collection-items'].filter((item) => item.collection_type === 'objects' && !HISTORICAL_OBJECT_IDS.includes(item.id)).map((item) => {
      const details = publicBodyParagraphs(item.body_markdown).filter((line) => line !== item.title)
      return { id: item.id, title: item.title, description: details[0] || item.summary, details, image: imageUrl(images.get(item.image_ids?.[0])), kind: '数字器物' }
    })
    const baike = data['baike-library'].filter((item) => ['渔具配件', '饵料鱼饵'].includes(item.category_name)).map((item) => {
      const details = publicBodyParagraphs(item.body_markdown).filter((line) => line !== item.title)
      return { id: `baike-${item.article_id}`, title: item.title, description: details[0] || item.excerpt, details, image: item.image_urls_local?.[0], kind: item.category_name }
    })
    return [...objects, ...baike].map((item) => ({ ...item, system: tackleSystemFor(item.title) }))
  }, [data, images])

  return (
    <main className="museum-hall museum-hall--tackle tackle-theatre" data-motion-language="workbench">
      <header className="tackle-theatre__opening">
        <span className="tackle-theatre__ghost" aria-hidden="true">器物</span>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85 }}>
          <span>第三展厅 / 钓具拆解台</span>
          <h1>{hall.title}</h1>
          <p>{hall.summary}</p>
        </motion.div>
        <div><strong>{records.length}</strong><span>条器物记录</span></div>
      </header>
      <TackleStressLab records={records} onOpen={setSelected} />
      <div className="tackle-methods" aria-label="钓法系统">{METHODS.map((method) => <span key={method}>{method}</span>)}</div>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="tackle-drawer">{selected.image ? <img src={selected.image} alt={selected.title} /> : null}<span>{selected.kind}</span><h2>{selected.title}</h2><div className="tackle-drawer__body">{selected.details.map((paragraph, index) => <p key={`${selected.id}-${index}`}>{paragraph}</p>)}</div></div> : null}</ObjectDrawer>
    </main>
  )
}
