import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RoutePager({ previous, next }) {
  return (
    <nav className="route-pager" aria-label="参观路线前后页">
      {previous ? (
        <Link className="pager-item previous" to={previous.url}>
          <ArrowLeft aria-hidden="true" />
          <span>
            <small>上一厅</small>
            <strong>{previous.title}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="pager-item next" to={next.url}>
          <span>
            <small>下一厅</small>
            <strong>{next.title}</strong>
          </span>
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  )
}
