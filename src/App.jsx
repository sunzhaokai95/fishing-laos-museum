import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MuseumChrome from './components/MuseumChrome.jsx'
import useMuseumData from './hooks/useMuseumData.js'
import { legacyHallUrl } from './lib/exhibition.js'
import HallPage from './pages/HallPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'
import './editorial.css'
import './museum-shell.css'
import './immersive.css'
import './museum-redesign.css'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function LegacyResolver() {
  const { pathname } = useLocation()
  const destination = legacyHallUrl(pathname)
  return destination && destination !== pathname ? <Navigate to={destination} replace /> : <NotFound />
}

export default function App() {
  const { data, error } = useMuseumData()
  const location = useLocation()

  if (error) {
    return (
      <main className="load-state" role="alert">
        <h1>内容没有加载完成</h1>
        <p>{error.message}</p>
        <button type="button" onClick={() => window.location.reload()}>
          重新加载
        </button>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="load-state" aria-live="polite">
        <span className="loading-line" aria-hidden="true" />
        <p>正在打开博物馆</p>
      </main>
    )
  }

  return (
    <MuseumChrome>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className="museum-stage"
          data-route={location.pathname}
          key={location.pathname}
          initial={{ opacity: 0, scale: 1.018, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.988, filter: 'blur(6px)' }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/visit/prologue" element={<HallPage hallId="prologue" data={data} />} />
            <Route path="/visit/history" element={<HallPage hallId="history" data={data} />} />
            <Route path="/visit/fish" element={<HallPage hallId="fish" data={data} />} />
            <Route path="/visit/tackle" element={<HallPage hallId="tackle" data={data} />} />
            <Route path="/visit/techniques" element={<HallPage hallId="techniques" data={data} />} />
            <Route path="/visit/anglers" element={<HallPage hallId="anglers" data={data} />} />
            <Route path="/visit/culture" element={<HallPage hallId="culture" data={data} />} />
            <Route path="/visit/ethics" element={<HallPage hallId="ethics" data={data} />} />
            <Route path="/visit/epilogue" element={<HallPage hallId="epilogue" data={data} />} />
            <Route path="/collection/species/*" element={<Navigate to="/visit/fish" replace />} />
            <Route path="/collection/objects/*" element={<Navigate to="/visit/tackle" replace />} />
            <Route path="/collection/techniques/*" element={<Navigate to="/visit/techniques" replace />} />
            <Route path="/collection/people/*" element={<Navigate to="/visit/anglers" replace />} />
            <Route path="/collection/works/*" element={<Navigate to="/visit/culture" replace />} />
            <Route path="/collection/folklore/*" element={<Navigate to="/visit/culture" replace />} />
            <Route path="*" element={<LegacyResolver />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </MuseumChrome>
  )
}
