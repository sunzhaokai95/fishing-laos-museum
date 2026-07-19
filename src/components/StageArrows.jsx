import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function StageArrows({ previous, next, noun = '藏品' }) {
  return (
    <div className="stage-arrows">
      <button type="button" aria-label={`上一件${noun}`} onClick={previous}>
        <ArrowLeft aria-hidden="true" />
      </button>
      <button type="button" aria-label={`下一件${noun}`} onClick={next}>
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  )
}
