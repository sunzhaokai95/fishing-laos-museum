import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function ObjectDrawer({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined
    const close = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex justify-end" role="presentation">
          <motion.button type="button" aria-label="关闭详情背景" initial={{ opacity: 0 }} animate={{ opacity: 0.42 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black cursor-default" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="relative w-full max-w-xl h-full overflow-y-auto bg-white/95 backdrop-blur-2xl border-l border-zinc-200 shadow-2xl p-6 md:p-8 text-zinc-800"
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button className="sticky top-0 ml-auto z-10 w-10 h-10 rounded-full bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 flex items-center justify-center shadow-sm" type="button" onClick={onClose} aria-label="关闭详情">
              <X size={17} aria-hidden="true" />
            </button>
            {children}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
