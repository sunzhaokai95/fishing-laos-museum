import { ChevronLeft, ChevronRight, Eye, EyeOff, Map, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MUSEUM_ROUTE, routeContext } from '../data/museumRoute.js'

export default function MuseumChrome() {
  const { pathname } = useLocation()
  const { current, previous, next, index } = routeContext(pathname)
  const [mapOpen, setMapOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (!mapOpen) return undefined
    const close = (event) => event.key === 'Escape' && setMapOpen(false)
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [mapOpen])

  useEffect(() => {
    document.documentElement.dataset.motion = reducedMotion ? 'reduced' : 'full'
    return () => delete document.documentElement.dataset.motion
  }, [reducedMotion])

  return (
    <>
      <header className="museum-chrome-header">
        <Link className="chrome-brand" to="/" aria-label="钓鱼佬博物馆首页">
          <span aria-hidden="true">钓</span>
          <span><strong>钓鱼佬博物馆</strong><small>MUSEUM OF ANGLING</small></span>
        </Link>
        <div className="chrome-status" aria-live="polite">
          <span>{String(index + 1).padStart(2, '0')} / {MUSEUM_ROUTE.length}</span>
          <strong>{current.title}</strong>
        </div>
        <div className="chrome-actions">
          <button type="button" onClick={() => setReducedMotion((value) => !value)} aria-label={reducedMotion ? '恢复动效' : '减少动效'}>
            {reducedMotion ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
          </button>
          <button type="button" className="map-trigger" onClick={() => setMapOpen(true)} aria-label="展厅地图">
            <Map aria-hidden="true" /><span>展厅地图</span>
          </button>
        </div>
      </header>

      <nav className="museum-chrome-footer" aria-label="常设展参观路线">
        <div className="route-readout">
          <span>{index === 0 ? '参观起点' : index === MUSEUM_ROUTE.length - 1 ? '参观结束' : '参观进行中'}</span>
          <ol aria-hidden="true">
            {MUSEUM_ROUTE.map((item, itemIndex) => (
              <li className={itemIndex === index ? 'is-current' : itemIndex < index ? 'is-passed' : ''} key={item.id} />
            ))}
          </ol>
        </div>
        <div className="route-adjacent">
          {previous ? <Link to={previous.url} aria-label={`上一厅 ${previous.title}`}><ChevronLeft aria-hidden="true" /><span><small>上一厅</small><strong>{previous.title}</strong></span></Link> : <span />}
          {next ? <Link className="next" to={next.url} aria-label={`下一厅 ${next.title}`}><span><small>下一厅</small><strong>{next.title}</strong></span><ChevronRight aria-hidden="true" /></Link> : <Link className="next" to="/" aria-label="回到首页"><span><small>重新开始</small><strong>回到首页</strong></span><ChevronRight aria-hidden="true" /></Link>}
        </div>
      </nav>

      {mapOpen ? (
        <div className="museum-map-layer" role="presentation" onMouseDown={() => setMapOpen(false)}>
          <section className="museum-map" role="dialog" aria-modal="true" aria-label="展厅地图" onMouseDown={(event) => event.stopPropagation()}>
            <header><div><span>唯一参观顺序</span><h2>展厅地图</h2></div><button type="button" onClick={() => setMapOpen(false)} aria-label="关闭展厅地图"><X aria-hidden="true" /></button></header>
            <ol>
              {MUSEUM_ROUTE.map((item, itemIndex) => (
                <li className={itemIndex === index ? 'is-current' : ''} key={item.id}>
                  <Link to={item.url} onClick={() => setMapOpen(false)} aria-label={`第${itemIndex + 1}站 ${item.title}`}>
                    <span>{String(itemIndex + 1).padStart(2, '0')}</span><strong>{item.title}</strong><small>{item.stage}</small>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      ) : null}
    </>
  )
}
