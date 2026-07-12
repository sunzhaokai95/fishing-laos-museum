import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import useDialogBehavior from '../../hooks/useDialogBehavior.js'

export default function HistoryImageViewer({ image, onClose }) {
  const open = Boolean(image)
  const dialogRef = useDialogBehavior(open, onClose)
  return (
    <AnimatePresence>
      {image ? <div className="fixed inset-0 z-50 p-4 md:p-10 flex items-center justify-center"><motion.button type="button" aria-label="关闭历史图像背景" className="absolute inset-0 bg-black" initial={{ opacity: 0 }} animate={{ opacity: 0.72 }} exit={{ opacity: 0 }} onClick={onClose} /><motion.figure ref={dialogRef} role="dialog" aria-modal="true" aria-label={image.title} tabIndex={-1} initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: 'spring', damping: 24, stiffness: 190 }} className="relative z-10 w-full max-w-5xl max-h-full bg-white rounded-2xl p-3 md:p-5 shadow-2xl overflow-auto"><button type="button" onClick={onClose} aria-label="关闭历史图像" className="sticky top-0 float-right w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center shadow-sm z-10"><X size={17} /></button><img src={image.url} alt={image.title} className="w-full max-h-[72vh] object-contain bg-zinc-50 rounded-xl" /><figcaption className="clear-both pt-4 text-xs leading-6 text-zinc-600">{image.title}</figcaption></motion.figure></div> : null}
    </AnimatePresence>
  )
}
