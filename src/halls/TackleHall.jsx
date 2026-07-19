import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import ObjectDrawer from '../components/ObjectDrawer.jsx'
import { HISTORICAL_OBJECT_IDS } from '../data/history.js'
import TackleStressLab from '../experiences/tackle/TackleStressLab.jsx'
import { tackleSystemFor } from '../experiences/tackle/tackleSystems.js'
import { publicBodyParagraphs } from '../lib/content.js'

const METHODS = [
  { name: '台钓', text: '以竿、线、漂、坠、钩与饵构成可调钓组，通过调漂和饵料状态读取水下信号。' },
  { name: '传统钓', text: '常以长竿、短线、单钩或轻量漂坠接近草洞、岸边和浅水障碍区，器物配置强调落点控制。' },
  { name: '路亚', text: '以拟饵、钓线、钓竿和绕线轮组成搜索系统，通过收线、停顿和竿尖动作改变拟饵姿态。' },
  { name: '飞蝇钓', text: '依靠有重量的飞蝇线完成抛投，毛钩本身较轻；线型、前导线和毛钩共同决定落水方式。' },
  { name: '冰钓', text: '从冰面孔洞垂直下放钓组，短竿、线轮、诱鱼器和保温安全装备共同构成寒冷环境中的器物系统。' },
  { name: '筏钓', text: '在筏体、船只或水上平台垂直作钓，竿梢、线轮与铅坠负责传递深水中的轻微触碰和水流变化。' },
  { name: '矶钓', text: '面向海岸岩礁与潮流环境配置钓竿、线轮、浮标、咬铅和前导线，使钓组沿预定水层随流移动。' },
  { name: '延绳钓', text: '在一条干线上按间距连接多条支线和钓钩，属于成组布设的捕捞器具，规模与使用范围受当地法规约束。' },
]

const OBJECT_NOTES = {
  台钓竿: '专用于悬坠钓法的手竿，多采用可伸缩的振出结构。竿体轻、节段较长，依调性和强度分型，负责抛送钓组、传递鱼讯，并以竿身弹性缓冲鱼的冲击。',
  振出式钓竿: '多节中空竿节由细至粗套接，使用时逐节抽出并锁定，收纳时缩回底柄。它便于携带、展开迅速；抽收须依次进行，避免接口过紧、夹砂或竿节受损。',
}

export default function TackleHall({ hall, data }) {
  const [selected, setSelected] = useState(null)
  const records = useMemo(() => {
    const objects = data['collection-items'].filter((item) => item.collection_type === 'objects' && !HISTORICAL_OBJECT_IDS.includes(item.id)).map((item) => {
      const details = publicBodyParagraphs(item.body_markdown).filter((line) => line !== item.title)
      return { id: item.id, title: item.title, description: details[0] || item.summary, details, kind: '数字器物' }
    })
    const baike = data['baike-library'].filter((item) => ['渔具配件', '饵料鱼饵'].includes(item.category_name)).map((item) => {
      const details = publicBodyParagraphs(item.body_markdown).filter((line) => line !== item.title)
      return { id: `baike-${item.article_id}`, title: item.title, description: OBJECT_NOTES[item.title] || details[0] || item.excerpt, details, kind: item.category_name }
    })
    return [...objects, ...baike].map((item) => ({ ...item, system: tackleSystemFor(item.title) }))
  }, [data])

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
      <section className="tackle-methods" aria-label="钓法系统">
        <header><span>钓法与器物组合 / TACKLE SYSTEMS</span><h2>器物如何组成一种钓法</h2></header>
        <div>{METHODS.map((method, index) => <article key={method.name}><small>{String(index + 1).padStart(2, '0')}</small><h3>{method.name}</h3><p>{method.text}</p></article>)}</div>
      </section>
      <ObjectDrawer open={Boolean(selected)} title={selected?.title ?? ''} onClose={() => setSelected(null)}>{selected ? <div className="tackle-drawer"><span>{selected.kind}</span><h2>{selected.title}</h2><div className="tackle-drawer__body">{selected.details.map((paragraph, index) => <p key={`${selected.id}-${index}`}>{paragraph}</p>)}</div></div> : null}</ObjectDrawer>
    </main>
  )
}
