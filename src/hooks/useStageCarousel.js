import { useCallback, useEffect, useRef, useState } from 'react'

export default function useStageCarousel(length, duration = 650) {
  const [activeIndex, setActiveIndex] = useState(0)
  const lockRef = useRef(false)
  const timerRef = useRef(0)

  const move = useCallback((direction) => {
    if (length < 2 || lockRef.current) return
    lockRef.current = true
    setActiveIndex((current) => (current + direction + length) % length)
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      lockRef.current = false
    }, duration)
  }, [duration, length])

  const previous = useCallback(() => move(-1), [move])
  const next = useCallback(() => move(1), [move])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(timerRef.current)
    }
  }, [next, previous])

  const roleFor = useCallback((index) => {
    const offset = (index - activeIndex + length) % length
    if (offset === 0) return 'center'
    if (offset === 1) return 'right'
    if (offset === length - 1) return 'left'
    return 'back'
  }, [activeIndex, length])

  return { activeIndex, previous, next, roleFor }
}
