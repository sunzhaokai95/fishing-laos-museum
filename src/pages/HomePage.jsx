import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MuseumHeroScene from '../components/MuseumHeroScene.jsx'

export default function HomePage() {
  const reducedMotion = useReducedMotion()
  const navigate = useNavigate()
  const pointerRef = useRef({ x: 0, y: 0, active: false })
  const [pointerReady, setPointerReady] = useState(false)
  const [departing, setDeparting] = useState(false)

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
    window.setTimeout(() => navigate('/visit/prologue'), 920)
  }

  return (
    <main className={`museum-home${departing ? ' is-departing' : ''}`} onPointerMove={observe}>
      <MuseumHeroScene pointerRef={pointerRef} reducedMotion={Boolean(reducedMotion)} departing={departing} />
      <div className="museum-home-vignette" aria-hidden="true" />

      <header className="museum-home-header">
        <p><span>线上常设展</span><strong>钓鱼佬博物馆</strong></p>
      </header>

      <div className="museum-home-copy">
        <h1>钓鱼佬<br />博物馆</h1>
        <p>从一根穿过水面的钓线出发，看见鱼、水域、器物、历史与人的选择。</p>
        <Link to="/visit/prologue" aria-label="进入博物馆" onClick={enterMuseum}>
          <span>进入博物馆</span>
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>

      <footer className="museum-home-footer">
        <span>唯一参观路线</span>
        <p>序厅 · 第一至第七展厅 · 尾厅</p>
        <small>{pointerReady ? '正在观察水面' : '移动指针，改变观察位置'}</small>
      </footer>
    </main>
  )
}
