import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function ObjectDrawer({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined
    const close = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={onClose}>
      <aside
        className="object-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" type="button" onClick={onClose} aria-label="关闭详情">
          <X aria-hidden="true" />
        </button>
        {children}
      </aside>
    </div>
  )
}
