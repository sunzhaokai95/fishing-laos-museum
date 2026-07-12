import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  const [ripples, setRipples] = useState([])

  const addRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const ripple = { id: Date.now(), x: event.clientX - rect.left, y: event.clientY - rect.top }
    setRipples((current) => [...current.slice(-4), ripple])
    window.setTimeout(() => setRipples((current) => current.filter((item) => item.id !== ripple.id)), 1300)
  }

  return (
    <main className="museum-home" onPointerDown={addRipple}>
      <div className="water-field" aria-hidden="true">
        <span className="water-line line-one" />
        <span className="water-line line-two" />
        <span className="float-mark" />
        {ripples.map((ripple) => <span className="touch-ripple" style={{ left: ripple.x, top: ripple.y }} key={ripple.id} />)}
      </div>
      <section className="museum-home-copy">
        <span className="home-index">MUSEUM OF ANGLING</span>
        <h1>钓鱼佬博物馆</h1>
        <p>
          一根钓线穿过水面以后，人能看见的东西很少。浮漂停在明处，鱼钩和饵沉入暗处。这座线上博物馆沿着钓的历史、鱼与水域、器物、技法、人的生活和钓获之后的责任，进入水面之下。
        </p>
        <Link className="museum-enter" to="/visit/prologue" aria-label="进入博物馆">
          <span>进入博物馆</span><ArrowRight aria-hidden="true" />
        </Link>
      </section>
      <div className="home-coordinate" aria-hidden="true">30°N / 120°E</div>
    </main>
  )
}
