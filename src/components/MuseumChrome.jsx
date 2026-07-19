import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Menu, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MUSEUM_ROUTE, routeContext } from '../data/museumRoute.js'
import useDialogBehavior from '../hooks/useDialogBehavior.js'

const padIndex = (value) => String(value).padStart(2, '0')

export default function MuseumChrome({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { current, previous, next, index } = routeContext(pathname)
  const [directoryOpen, setDirectoryOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const closeDirectory = useCallback(() => setDirectoryOpen(false), [])
  const directoryRef = useDialogBehavior(directoryOpen, closeDirectory)

  useEffect(() => {
    const moveThroughRoute = (event) => {
      const activeElement = document.activeElement
      const tag = activeElement?.tagName
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag) || activeElement?.getAttribute('role') === 'slider') return
      if (event.key === 'ArrowRight' && next) navigate(next.url)
      if (event.key === 'ArrowLeft' && previous) navigate(previous.url)
    }
    window.addEventListener('keydown', moveThroughRoute)
    return () => window.removeEventListener('keydown', moveThroughRoute)
  }, [navigate, next, previous])

  if (pathname === '/') {
    return <MotionConfig reducedMotion="user">{children}</MotionConfig>
  }

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <div className="museum-shell museum-theatre-shell">
        <header className="museum-edge-header">
          <Link className="museum-edge-brand" to="/" aria-label="钓鱼佬博物馆首页">
            <span>钓鱼佬博物馆</span>
            <small>MUSEUM OF ANGLING</small>
          </Link>

          <div className="museum-edge-status" aria-live="polite">
            <span className="museum-edge-index">{padIndex(index + 1)} / {padIndex(MUSEUM_ROUTE.length)}</span>
            <span className="museum-edge-title">{current.title}</span>
          </div>

          <div className="museum-edge-actions">
            <button
              type="button"
              onClick={() => setReducedMotion((value) => !value)}
              className="museum-edge-icon"
              aria-label={reducedMotion ? '恢复动效' : '减少动效'}
              title={reducedMotion ? '恢复动效' : '减少动效'}
            >
              {reducedMotion ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setDirectoryOpen(true)}
              className="museum-edge-icon"
              aria-label="打开参观目录"
              title="参观目录"
            >
              <Menu aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="museum-shell-content">{children}</main>

        {index > 0 ? (
          <footer className="museum-edge-footer">
            <nav className="museum-edge-pager" aria-label="参观路线前后页">
              {previous ? (
                <Link to={previous.url} aria-label={`上一厅 ${previous.title}`} className="museum-edge-direction museum-edge-direction--previous">
                  <ArrowLeft aria-hidden="true" />
                  <span><small>上一厅</small>{previous.title}</span>
                </Link>
              ) : <span />}

              {next ? (
                <Link to={next.url} aria-label={`下一厅 ${next.title}`} className="museum-edge-direction museum-edge-direction--next">
                  <span><small>下一厅</small>{next.title}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <Link to="/" aria-label="回到首页" className="museum-edge-direction museum-edge-direction--next">
                  <span><small>参观结束</small>回到首页</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              )}
            </nav>

            <nav className="museum-linear-progress" aria-label="常设展线性进度">
              <ol>
                {MUSEUM_ROUTE.map((item, itemIndex) => (
                  <li
                    key={item.id}
                    className={itemIndex === index ? 'is-current' : itemIndex < index ? 'is-past' : ''}
                    title={item.title}
                  />
                ))}
              </ol>
            </nav>
          </footer>
        ) : null}

        {typeof document !== 'undefined' ? createPortal(<AnimatePresence>
          {directoryOpen ? (
            <motion.section
              ref={directoryRef}
              role="dialog"
              aria-modal="true"
              aria-label="参观目录"
              tabIndex={-1}
              initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
              exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.58, ease: [0.76, 0, 0.24, 1] }}
              className="museum-route-overlay"
            >
              <header className="museum-route-overlay__header">
                <span>钓鱼佬博物馆</span>
                <button type="button" onClick={closeDirectory} aria-label="关闭参观目录" className="museum-route-overlay__close">
                  <X aria-hidden="true" />
                </button>
              </header>

              <div className="museum-route-overlay__intro">
                <p>ONE CONTINUOUS VISIT</p>
                <h2>参观目录</h2>
              </div>

              <ol className="museum-route-list">
                {MUSEUM_ROUTE.map((item, itemIndex) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + itemIndex * 0.035, duration: 0.42 }}
                    className={itemIndex === index ? 'is-current' : ''}
                  >
                    <Link to={item.url} onClick={closeDirectory} aria-label={`第${itemIndex + 1}站 ${item.title}`}>
                      <span className="museum-route-list__number">{padIndex(itemIndex + 1)}</span>
                      <span className="museum-route-list__stage">{item.stage}</span>
                      <strong>{item.title}</strong>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </motion.li>
                ))}
              </ol>
            </motion.section>
          ) : null}
        </AnimatePresence>, document.body) : null}
      </div>
    </MotionConfig>
  )
}
