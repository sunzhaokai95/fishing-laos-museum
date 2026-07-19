import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'
import useDialogBehavior from '../hooks/useDialogBehavior.js'

export default function ObjectDrawer({ open, title, onClose, children }) {
  const drawerRef = useDialogBehavior(open, onClose)

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="object-drawer-layer" role="presentation">
          <motion.button type="button" aria-label="关闭详情背景" initial={{ opacity: 0 }} animate={{ opacity: .52 }} exit={{ opacity: 0 }} onClick={onClose} className="object-drawer-scrim" />
          <motion.aside
            ref={drawerRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: .55, ease: [0.76, 0, 0.24, 1] }}
            className="object-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
          >
            <button className="object-drawer-close" type="button" onClick={onClose} aria-label="关闭详情">
              <X size={17} aria-hidden="true" />
            </button>
            {children}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
