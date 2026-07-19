import { ArrowLeft, ArrowRight, Clock3, Fish, Wrench } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MuseumHeroScene from '../components/MuseumHeroScene.jsx'

const SPOTS = [
  {
    id: 'history',
    label: '时间的入口',
    eyebrow: '历史墙',
    title: '从生存到垂钓',
    text: '器物、图像与文字把中国钓鱼史留在墙面上。正式参观时，它们将沿一条纵向时间轴展开。',
    position: [76, 18],
    focus: [0.76, 0.2],
    zoom: 1.62,
    icon: Clock3,
  },
  {
    id: 'fish',
    label: '水下标本',
    eyebrow: '水域',
    title: '鱼各有其水',
    text: '不同鱼类生活在不同水层、温度与水流中。水面之下不是一片均匀的空间。',
    position: [35, 66],
    focus: [0.34, 0.66],
    zoom: 1.68,
    icon: Fish,
  },
  {
    id: 'tackle',
    label: '器物工作台',
    eyebrow: '器物',
    title: '手中的水下仪器',
    text: '竿、线、轮、漂与钩把水下受力传回手中。它们不是孤立商品，而是一套感知系统。',
    position: [70, 45],
    focus: [0.69, 0.45],
    zoom: 1.72,
    icon: Wrench,
  },
]

export default function HomePage() {
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const sceneStateRef = useRef({ phase: 'intro', focus: null })
  const [phase, setPhase] = useState('intro')
  const [focusId, setFocusId] = useState(null)
  const [pointerReady, setPointerReady] = useState(false)
  const [departing, setDeparting] = useState(false)
  const focus = SPOTS.find((spot) => spot.id === focusId) || null
  sceneStateRef.current = { phase, focus, departing }

  useEffect(() => {
    if (!focus) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setFocusId(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [focus])

  const observe = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)),
      y: Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)),
      active: true,
    }
    if (!pointerReady) setPointerReady(true)
  }

  const enterMuseum = (event) => {
    if (reducedMotion) return
    event.preventDefault()
    if (departing) return
    setDeparting(true)
    window.setTimeout(() => navigate('/visit/prologue'), 980)
  }

  return (
    <main
      className={`museum-home is-${phase}${focus ? ' has-focus' : ''}${departing ? ' is-departing' : ''}`}
      onPointerMove={observe}
    >
      <MuseumHeroScene
        pointerRef={pointerRef}
        sceneStateRef={sceneStateRef}
        reducedMotion={Boolean(reducedMotion)}
        departing={departing}
        focusId={focusId}
      />

      <AnimatePresence>
        {phase === 'intro' ? (
          <motion.div
            className="museum-curtain"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
            transition={{ duration: reducedMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="museum-curtain-sound">线上常设展</div>
            <p className="museum-curtain-present">钓鱼佬博物馆　呈现</p>
            <h1 aria-label="钓鱼佬博物馆">
              <span>一座</span>
              <span>由水</span>
              <span>塑造的</span>
              <span>博物馆</span>
            </h1>
            <p className="museum-curtain-copy">进入一座关于鱼、水域、器物、历史与人的线上博物馆</p>
            <button type="button" aria-label="进入空间" onClick={() => setPhase('room')}>
              <span>进入空间</span>
              <ArrowRight aria-hidden="true" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {phase === 'room' ? (
        <motion.div
          className="museum-room-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 0.72, duration: 0.7 }}
        >
          <h1 className="sr-only">钓鱼佬博物馆空间</h1>
          {!focus ? (
            <div className="museum-room-index">
              <span>空间观察</span>
              <strong>00 / 03</strong>
            </div>
          ) : null}

          {!focus ? SPOTS.map((spot, index) => {
            const Icon = spot.icon
            return (
              <motion.button
                type="button"
                className="museum-hotspot"
                style={{ '--spot-x': `${spot.position[0]}%`, '--spot-y': `${spot.position[1]}%` }}
                aria-label={`观察 ${spot.label}`}
                onClick={() => setFocusId(spot.id)}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reducedMotion ? 0 : 1 + index * 0.16, type: 'spring', damping: 18 }}
                key={spot.id}
              >
                <Icon aria-hidden="true" />
                <span>{spot.label}</span>
              </motion.button>
            )
          }) : null}

          {!focus ? (
            <Link className="museum-room-enter" to="/visit/prologue" aria-label="从序厅开始" onClick={enterMuseum}>
              <span>从序厅开始</span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}

          <div className="museum-room-observe" aria-hidden="true">
            {pointerReady ? '镜头正在跟随观察位置' : '移动指针，观察空间'}
          </div>
        </motion.div>
      ) : null}

      <AnimatePresence>
        {focus ? (
          <motion.section
            className="museum-object-focus"
            role="dialog"
            aria-modal="true"
            aria-label={focus.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.62, duration: 0.55 }}
          >
            <button type="button" className="museum-focus-back" aria-label="回到博物馆空间" onClick={() => setFocusId(null)}>
              <ArrowLeft aria-hidden="true" />
            </button>
            <motion.div
              className="museum-focus-caption"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.95, duration: 0.65 }}
            >
              <span>{focus.eyebrow}</span>
              <h2>{focus.title}</h2>
              <p>{focus.text}</p>
            </motion.div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
