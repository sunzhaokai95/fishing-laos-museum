import { useEffect, useRef } from 'react'

export default function useDialogBehavior(open, onClose) {
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    if (!open) return undefined
    const previousOverflow = document.body.style.overflow
    const returnTarget = document.activeElement
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeRef.current()
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', closeOnEscape)
    dialogRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
      returnTarget?.focus?.()
    }
  }, [open])

  return dialogRef
}
