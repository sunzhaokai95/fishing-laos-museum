import { motion } from 'motion/react'

export default function EpilogueHall() {
  return (
    <main className="epilogue-scene min-h-[calc(100svh-132px)]">
      <div className="epilogue-water" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <motion.span
            key={index}
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1.6, opacity: [0, 0.45, 0] }}
            transition={{ duration: 7, delay: index * 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
      </div>
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span>EPILOGUE / 尾厅</span>
        <h1>回到水边</h1>
        <p>参观从水面开始，也在水面结束。沿途出现的鱼、器物、动作、诗画、行话和规则，都指向同一件事：钓鱼是一种观察、等待、使用工具并承担后果的方式。回到真实水边时，它留下的不是一条万能经验，而是更清楚的依据，以及在必要时停手的能力。</p>
      </motion.article>
    </main>
  )
}
