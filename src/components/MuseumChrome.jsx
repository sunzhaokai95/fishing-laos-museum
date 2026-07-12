import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { ChevronLeft, ChevronRight, Eye, EyeOff, Map, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MUSEUM_ROUTE, routeContext } from '../data/museumRoute.js'
import useDialogBehavior from '../hooks/useDialogBehavior.js'

export default function MuseumChrome({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { current, previous, next, index } = routeContext(pathname)
  const [mapOpen, setMapOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  const closeMap = useCallback(() => setMapOpen(false), [])
  const mapRef = useDialogBehavior(mapOpen, closeMap)

  useEffect(() => {
    const moveThroughRoute = (event) => {
      const tag = document.activeElement?.tagName
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag) || document.activeElement?.getAttribute('role') === 'slider') return
      if (event.key === 'ArrowRight' && next) navigate(next.url)
      if (event.key === 'ArrowLeft' && previous) navigate(previous.url)
    }
    window.addEventListener('keydown', moveThroughRoute)
    return () => window.removeEventListener('keydown', moveThroughRoute)
  }, [navigate, next, previous])

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
      <div className="min-h-screen bg-[#f5f5f7] text-zinc-800 flex flex-col justify-between relative selection:bg-zinc-900/10 selection:text-zinc-900 font-sans">
        <header className="sticky top-0 z-40 bg-white/95 border-b border-zinc-200/60 py-3.5 px-4 md:px-8 flex items-center justify-between shadow-[0_1px_0_rgba(0,0,0,0.02)]">
          <Link className="flex items-center gap-3" to="/" aria-label="钓鱼佬博物馆首页">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-bold text-sm tracking-tighter shadow-sm" aria-hidden="true">钓</span>
            <span className="text-left">
              <strong className="text-sm font-bold tracking-normal text-zinc-900 block">钓鱼佬博物馆</strong>
              <small className="text-[9px] text-zinc-500 uppercase tracking-normal font-mono block">MUSEUM OF ANGLING HERITAGE</small>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-xs text-zinc-500 font-mono" aria-live="polite">
            <div className="flex items-center gap-2 border-r border-zinc-200/60 pr-6">
              <span className="text-[10px] text-zinc-400 uppercase">ROUTE SEQUENCE:</span>
              <span className="text-zinc-800 font-medium">{String(index + 1).padStart(2, '0')} / {String(MUSEUM_ROUTE.length).padStart(2, '0')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 uppercase">CURRENT HALL:</span>
              <strong className="text-zinc-900 font-semibold">{current.title}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setReducedMotion((value) => !value)}
              className="p-2 rounded-xl bg-white border border-zinc-200/70 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-all cursor-pointer active:scale-95 shadow-xs"
              aria-label={reducedMotion ? '恢复动效' : '减少动效'}
            >
              {reducedMotion ? <EyeOff size={14} aria-hidden="true" /> : <Eye size={14} aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-white flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
              aria-label="展厅地图"
            >
              <Map size={14} aria-hidden="true" /><span className="hidden sm:inline">展厅地图</span>
            </button>
          </div>
        </header>

        <main className="flex-grow">{children}</main>

        <footer className="sticky bottom-0 z-30 bg-white/95 border-t border-zinc-200/60 py-4 px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_-1px_0_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] text-zinc-400 font-mono block">
              {index === 0 ? 'WELCOME / 参观起点' : index === MUSEUM_ROUTE.length - 1 ? 'CONCLUDED / 参观结束' : 'PROGRESSING TOUR / 常设展参观路线'}
            </span>
            <ol className="flex gap-1 m-0 p-0 list-none" aria-label="常设展参观路线">
              {MUSEUM_ROUTE.map((item, itemIndex) => (
                <li
                  key={item.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${itemIndex === index ? 'w-5 bg-zinc-900' : itemIndex < index ? 'w-1.5 bg-zinc-400' : 'w-1.5 bg-zinc-200'}`}
                  title={item.title}
                />
              ))}
            </ol>
          </div>

          <nav className="flex items-center gap-3" aria-label="参观路线前后页">
            {previous ? (
              <Link to={previous.url} aria-label={`上一厅 ${previous.title}`} className="px-4 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 text-xs transition-all flex items-center gap-1.5 shadow-xs">
                <ChevronLeft size={14} aria-hidden="true" /><span>上一厅</span><span className="hidden lg:inline text-zinc-400">{previous.title}</span>
              </Link>
            ) : (
              <span className="px-4 py-2 rounded-xl border border-zinc-200 text-xs opacity-35 flex items-center gap-1.5" aria-hidden="true"><ChevronLeft size={14} />上一厅</span>
            )}
            {next ? (
              <Link to={next.url} aria-label={`下一厅 ${next.title}`} className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5">
                <span>下一厅</span><span className="hidden lg:inline text-zinc-300">{next.title}</span><ChevronRight size={14} aria-hidden="true" />
              </Link>
            ) : (
              <Link to="/" aria-label="回到首页" className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5">回到首页<ChevronRight size={14} aria-hidden="true" /></Link>
            )}
          </nav>
        </footer>

        <AnimatePresence>
          {mapOpen ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={closeMap} className="absolute inset-0 bg-black" />
              <motion.section
                ref={mapRef}
                role="dialog"
                aria-modal="true"
                aria-label="展厅地图"
                tabIndex={-1}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-3xl max-h-[calc(100svh-2rem)] overflow-auto bg-white/95 backdrop-blur-2xl border border-zinc-200/60 rounded-3xl p-6 md:p-8 space-y-6 z-10 shadow-2xl text-zinc-800"
              >
                <header className="flex justify-between items-start border-b border-zinc-200/60 pb-4">
                  <div><h2 className="text-lg md:text-xl font-bold tracking-normal text-zinc-900">展厅地图</h2><p className="text-xs text-zinc-500 font-light mt-1">首页、序厅、七个展厅与尾厅组成一条固定的参观顺序。</p></div>
                  <button type="button" onClick={closeMap} className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200/50" aria-label="关闭展厅地图"><X size={15} aria-hidden="true" /></button>
                </header>

                <div className="relative h-28 bg-zinc-50 border border-zinc-200/80 rounded-2xl p-4 overflow-hidden hidden sm:flex items-center justify-center" aria-hidden="true">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 100">
                    <path d="M 40 50 Q 150 20, 250 50 T 450 50 T 650 50 T 760 50" fill="none" stroke="#e4e4e7" strokeWidth="8" strokeLinecap="round" />
                    <motion.path d="M 40 50 Q 150 20, 250 50 T 450 50 T 650 50 T 760 50" fill="none" stroke="#18181b" strokeWidth="4" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: (index + 1) / MUSEUM_ROUTE.length }} transition={{ duration: 0.8 }} />
                  </svg>
                  <div className="absolute inset-x-8 flex justify-between items-center z-10 w-[90%] mx-auto">
                    {MUSEUM_ROUTE.map((item, itemIndex) => <span key={item.id} className={`w-8 h-8 rounded-full border flex items-center justify-center text-[9px] font-mono ${itemIndex === index ? 'bg-zinc-900 border-zinc-900 text-white ring-4 ring-zinc-900/10 scale-110' : itemIndex < index ? 'bg-zinc-100 border-zinc-300 text-zinc-700' : 'bg-white border-zinc-200 text-zinc-400'}`}>{String(itemIndex + 1).padStart(2, '0')}</span>)}
                  </div>
                </div>

                <ol className="grid grid-cols-2 sm:grid-cols-3 gap-3 m-0 p-0 list-none">
                  {MUSEUM_ROUTE.map((item, itemIndex) => (
                    <li key={item.id}>
                      <Link
                        to={item.url}
                        onClick={closeMap}
                        aria-label={`第${itemIndex + 1}站 ${item.title}`}
                        className={`p-3.5 rounded-[18px] border text-left transition-all flex flex-col justify-between h-24 ${itemIndex === index ? 'bg-zinc-900 border-zinc-900 text-white shadow-lg' : itemIndex < index ? 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100/70' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-700'}`}
                      >
                        <span className="font-mono text-[9px] uppercase opacity-60">STAGE {String(itemIndex + 1).padStart(2, '0')}</span>
                        <span><strong className="text-xs font-semibold block">{item.title}</strong><small className="text-[8px] font-mono uppercase opacity-50">{item.stage}</small></span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </motion.section>
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}
