import { ArrowUpRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CollectionStage from '../components/CollectionStage.jsx'
import MuseumHeroScene from '../components/MuseumHeroScene.jsx'
import StageArrows from '../components/StageArrows.jsx'
import useStageCarousel from '../hooks/useStageCarousel.js'
import { withBasePath } from '../lib/publicPath.js'

const COLLECTIONS = [
  {
    id: 'fish',
    label: '鱼类',
    index: '01',
    title: '水下不是同一种空间',
    text: '鱼分居不同水层、温度与流速之中。观察一种鱼，也是在观察它所依赖的水。',
    image: withBasePath('/museum-assets/home-collection-fish.webp'),
    alt: '透明底鲤鱼博物插画',
    tone: '#66aaa5',
    panel: '#83bdb7',
    shape: 'specimen',
  },
  {
    id: 'history',
    label: '钓史',
    index: '02',
    title: '时间留下的钩与图像',
    text: '从骨钩、金属钩到钓车与画卷，垂钓的历史由器物和图像共同保存。',
    image: withBasePath('/museum-assets/home-collection-history.webp'),
    alt: '骨钩、青铜钩与铁钩博物插画',
    tone: '#e85b3f',
    panel: '#f27a62',
    shape: 'artifact',
  },
  {
    id: 'tackle',
    label: '钓具',
    index: '03',
    title: '手中握着一套水下仪器',
    text: '竿、线、轮、漂与钩把看不见的受力、触碰和方向传回人的手中。',
    image: withBasePath('/museum-assets/home-collection-tackle.webp'),
    alt: '竿、轮、漂、线与钩的透明底器物插画',
    tone: '#b8c85f',
    panel: '#cad878',
    shape: 'tool',
  },
  {
    id: 'culture',
    label: '鱼文',
    index: '04',
    title: '鱼也生活在语言与图像里',
    text: '诗画、典故、行话和水边信念，让鱼离开水面以后继续进入人的生活。',
    image: withBasePath('/museum-assets/home-collection-culture.webp'),
    alt: '展开的水边垂钓画卷插画',
    tone: '#252d87',
    panel: '#3c45a0',
    shape: 'folio',
  },
]

export default function HomePage() {
  const reducedMotion = useReducedMotion()
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const [pointerReady, setPointerReady] = useState(false)
  const carousel = useStageCarousel(COLLECTIONS.length)
  const active = COLLECTIONS[carousel.activeIndex]

  useEffect(() => {
    COLLECTIONS.forEach((item) => {
      const image = new Image()
      image.src = item.image
    })
  }, [])

  const observe = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)),
      y: Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)),
      active: true,
    }
    if (!pointerReady) setPointerReady(true)
  }

  return (
    <main className="museum-home collection-home" onPointerMove={observe}>
      <MuseumHeroScene pointerRef={pointerRef} reducedMotion={Boolean(reducedMotion)} />
      <CollectionStage
        label={active.label}
        eyebrow={<><span>钓鱼佬博物馆</span><span>线上常设展</span></>}
        className="home-collection-stage"
        style={{ '--stage-bg': active.tone, '--stage-panel': active.panel }}
        testId="home-collection-theatre"
        activeIndex={carousel.activeIndex}
        caption={(
          <div className="home-collection-caption">
            <span>{active.index} / 04　入口藏品</span>
            <h2>{active.title}</h2>
            <p>{active.text}</p>
          </div>
        )}
        controls={<StageArrows previous={carousel.previous} next={carousel.next} />}
      >
        <h1 className="sr-only">钓鱼佬博物馆</h1>
        {COLLECTIONS.map((item) => (
          <figure
            className="home-collection-object"
            data-testid="home-collection-object"
            data-role={carousel.roleFor(COLLECTIONS.indexOf(item))}
            data-shape={item.shape}
            aria-hidden={item.id === active.id ? undefined : 'true'}
            key={item.id}
          >
            <img src={item.image} alt={item.id === active.id ? item.alt : ''} draggable="false" />
          </figure>
        ))}
      </CollectionStage>
      <Link className="home-start-visit" to="/visit/prologue" aria-label="开始参观">
        <span>开始参观</span>
        <ArrowUpRight aria-hidden="true" />
      </Link>
      <div className="home-pointer-state" aria-hidden="true">
        {pointerReady ? '水面正在回应你的移动' : '移动指针，观察水面'}
      </div>
    </main>
  )
}
