import { motion } from 'motion/react'

export default function EpilogueHall() {
  return (
    <div className="relative min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6 py-20 overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 opacity-[0.04] gemini-dot-field" /><motion.span className="absolute left-1/2 top-1/2 w-[70vw] h-[20vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300/40" animate={{ scale: [0.9, 1.08], opacity: [0.25, 0.7, 0.25] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} /><motion.span className="absolute left-1/2 top-1/2 w-[50vw] h-[14vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300/50" animate={{ scale: [1.08, 0.92], opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} /></div>
      <motion.article initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl text-center space-y-8">
        <span className="inline-flex px-3.5 py-1.5 rounded-full bg-white/80 border border-zinc-200 text-[10px] font-mono text-zinc-600">EPILOGUE / 尾厅</span>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-normal text-zinc-900">回到水边</h1>
        <p className="py-8 border-y border-zinc-200 text-sm md:text-base font-light leading-loose text-zinc-600">参观从水面开始，也在水面结束。沿途出现的鱼、器物、动作、诗画、行话和规则，都指向同一件事：钓鱼是一种观察、等待、使用工具并承担后果的方式。回到真实水边时，它留下的不是一条万能经验，而是更清楚的依据，以及在必要时停手的能力。</p>
      </motion.article>
    </div>
  )
}
