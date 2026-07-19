import { RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const MAX_SPECIMENS = 12
const POSITIONS = [
  [8, 18, .72], [27, 9, 1.05], [52, 22, .84], [77, 11, 1.18], [90, 32, .63], [14, 58, 1.12],
  [38, 48, .76], [61, 61, 1.2], [82, 53, .88], [94, 75, .66], [30, 82, .92], [68, 86, .7],
]

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function FishOrbitCanopy({ fish, onSelect }) {
  const [generation, setGeneration] = useState(0)
  const specimens = useMemo(() => {
    if (fish.length <= MAX_SPECIMENS) return fish
    const offset = (generation * 7) % fish.length
    return Array.from({ length: MAX_SPECIMENS }, (_, index) => fish[(offset + index) % fish.length])
  }, [fish, generation])

  useEffect(() => {
    if (fish.length <= MAX_SPECIMENS || reducedMotion()) return undefined
    const interval = window.setInterval(() => setGeneration((value) => value + 1), 5500)
    return () => window.clearInterval(interval)
  }, [fish.length])

  return (
    <section className="fish-water-stage" aria-labelledby="fish-orbit-title" data-generation={generation} data-testid="fish-orbit-canopy">
      <header>
        <div><small>流动标本 / MOVING SPECIMENS</small><h2 id="fish-orbit-title">鱼群经过不同水层</h2></div>
        <button type="button" onClick={() => setGeneration((value) => value + 1)} aria-label="换一组鱼群"><RefreshCw aria-hidden="true" /><span>换一组</span></button>
      </header>
      <div className="fish-water-stage__field">
        <span className="fish-water-stage__depth fish-water-stage__depth--surface">水面</span>
        <span className="fish-water-stage__depth fish-water-stage__depth--bed">水底</span>
        {specimens.map((item, index) => {
          const [left, top, scale] = POSITIONS[index]
          return (
            <button
              type="button"
              key={`${item.slug}-${item.list_position}`}
              onClick={() => onSelect(item)}
              aria-label={`观察鱼种 ${item.name}`}
              className="fish-water-stage__specimen"
              style={{ '--left': `${left}%`, '--top': `${top}%`, '--scale': scale, '--delay': `${index * -.42}s` }}
            >
              {item.image_url ? <img src={item.image_url} alt="" loading="lazy" /> : null}
              <span>{item.name}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
