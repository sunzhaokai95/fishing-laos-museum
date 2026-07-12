import { motion } from 'motion/react'

export default function ExhibitHeader({ eyebrow, title, summary, children }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-zinc-200/80 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-7"
    >
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex px-3 py-1.5 rounded-full border border-zinc-200 bg-white/80 text-[10px] font-mono text-zinc-600 shadow-xs">{eyebrow}</span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-none tracking-normal text-zinc-900">{title}</h1>
        <p className="max-w-2xl text-sm md:text-base leading-relaxed font-light text-zinc-600">{summary}</p>
      </div>
      {children ? <div className="flex flex-wrap gap-2.5 text-[10px] font-mono text-zinc-500">{children}</div> : null}
    </motion.header>
  )
}
