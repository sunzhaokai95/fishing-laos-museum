import { Link } from 'react-router-dom'
import { HALLS } from '../data/halls.js'

export default function RouteProgress({ currentStage }) {
  return (
    <nav className="route-progress" aria-label="常设展参观进度">
      <ol>
        {HALLS.map((stage) => {
          const current = stage.stage === currentStage
          return (
            <li key={stage.id} className={current ? 'is-current' : ''}>
              <Link
                to={stage.url}
                aria-current={current ? 'step' : undefined}
                title={stage.title}
              >
                <span className="route-dot" aria-hidden="true" />
                <span>{stage.stage}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
