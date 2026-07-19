import { lazy, Suspense } from 'react'
import { hallById } from '../data/halls.js'

const SCENES = {
  prologue: lazy(() => import('../halls/PrologueHall.jsx')),
  history: lazy(() => import('../halls/HistoryHall.jsx')),
  fish: lazy(() => import('../halls/FishHall.jsx')),
  tackle: lazy(() => import('../halls/TackleHall.jsx')),
  techniques: lazy(() => import('../halls/TechniquesHall.jsx')),
  anglers: lazy(() => import('../halls/AnglersHall.jsx')),
  culture: lazy(() => import('../halls/CultureHall.jsx')),
  ethics: lazy(() => import('../halls/EthicsHall.jsx')),
  epilogue: lazy(() => import('../halls/EpilogueHall.jsx')),
}

export default function HallPage({ hallId, data }) {
  const hall = hallById(hallId)
  const Scene = SCENES[hallId]
  return (
    <div className={`hall-page hall-${hallId}`} data-hall={hallId}>
      <div className="hall-atmosphere" aria-hidden="true"><span /><i /></div>
      <Suspense fallback={<div className="load-state" role="status"><span className="loading-line" aria-hidden="true" /><p>正在打开展厅</p></div>}>
        <Scene hall={hall} data={data} />
      </Suspense>
    </div>
  )
}
