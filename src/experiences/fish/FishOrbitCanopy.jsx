import { RefreshCw } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

const MAX_SPECIMENS = 12
const ORBITS = [
  [12, 24], [28, 13], [47, 24], [68, 12], [87, 29], [17, 65],
  [36, 51], [56, 69], [74, 52], [91, 70], [43, 88], [70, 88],
]

function reducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

export default function FishOrbitCanopy({ fish, onSelect }) {
  const [generation, setGeneration] = useState(0)
  const canvasRef = useRef(null)
  const stageRef = useRef(null)
  const planetRefs = useRef([])
  const paused = useRef(new Set())
  const specimens = useMemo(() => {
    if (fish.length <= MAX_SPECIMENS) return fish
    const offset = (generation * 7) % fish.length
    return Array.from({ length: MAX_SPECIMENS }, (_, index) => fish[(offset + index) % fish.length])
  }, [fish, generation])

  useEffect(() => {
    if (fish.length <= MAX_SPECIMENS || reducedMotion()) return undefined
    const interval = window.setInterval(() => setGeneration((value) => value + 1), 4000)
    return () => window.clearInterval(interval)
  }, [fish.length])

  useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    const context = canvas?.getContext?.('2d')
    if (!canvas || !stage || !context) return undefined
    let frame = 0
    let animationFrame = 0
    const still = reducedMotion()

    const draw = () => {
      const rect = stage.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, rect.width * ratio)
      canvas.height = Math.max(1, rect.height * ratio)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, rect.width, rect.height)
      context.strokeStyle = 'rgba(46, 82, 91, 0.17)'
      context.lineWidth = 1
      const points = specimens.map((_, index) => {
        const [left, top] = ORBITS[index]
        const drift = still || paused.current.has(index) ? 0 : Math.sin(frame / 55 + index * 0.8) * 7
        const x = rect.width * left / 100 + drift
        const y = rect.height * top / 100 + Math.cos(frame / 70 + index) * (still ? 0 : 4)
        const node = planetRefs.current[index]
        if (node) node.style.transform = `translate3d(${drift}px, ${still ? 0 : Math.cos(frame / 70 + index) * 4}px, 0)`
        return [x, y]
      })
      points.forEach(([x, y], index) => {
        const [nextX, nextY] = points[(index + 3) % points.length] || [x, y]
        context.beginPath()
        context.moveTo(x, y)
        context.quadraticCurveTo((x + nextX) / 2, (y + nextY) / 2 - 16, nextX, nextY)
        context.stroke()
      })
      frame += 1
      if (!still) animationFrame = window.requestAnimationFrame(draw)
    }
    draw()
    window.addEventListener('resize', draw)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', draw)
    }
  }, [specimens])

  return (
    <section className="fish-orbit" aria-labelledby="fish-orbit-title" data-generation={generation} data-testid="fish-orbit-canopy">
      <div className="flex items-end justify-between gap-4 border-b border-zinc-300/70 pb-4">
        <div><small className="font-mono text-[9px] text-zinc-500">MOVING SPECIMENS / 流动标本</small><h2 id="fish-orbit-title" className="mt-1 text-xl font-semibold text-zinc-900">鱼群经过不同水层</h2></div>
        <button type="button" onClick={() => setGeneration((value) => value + 1)} className="inline-flex h-10 shrink-0 items-center gap-2 border border-zinc-300 bg-white px-3 text-xs text-zinc-700 hover:border-zinc-600" aria-label="换一组鱼群"><RefreshCw size={14} aria-hidden="true" />换一组</button>
      </div>
      <div ref={stageRef} className="fish-orbit-stage">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        {specimens.map((item, index) => {
          const [left, top] = ORBITS[index]
          return <button ref={(node) => { planetRefs.current[index] = node }} type="button" key={`${item.slug}-${item.list_position}`} onClick={() => onSelect(item)} onMouseEnter={() => paused.current.add(index)} onMouseLeave={() => paused.current.delete(index)} onFocus={() => paused.current.add(index)} onBlur={() => paused.current.delete(index)} aria-label={`观察鱼种 ${item.name}`} className="fish-orbit-planet" style={{ left: `${left}%`, top: `${top}%` }}>
            <span className="fish-orbit-image">{item.image_url ? <img src={item.image_url} alt="" loading="lazy" /> : <b>{item.name.slice(0, 2)}</b>}</span>
            <span className="fish-orbit-name">{item.name}</span>
          </button>
        })}
        <span className="fish-orbit-depth fish-orbit-depth-surface">水面</span><span className="fish-orbit-depth fish-orbit-depth-bed">水底</span>
      </div>
    </section>
  )
}
