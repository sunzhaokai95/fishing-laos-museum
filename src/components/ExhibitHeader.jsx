import { motion } from 'motion/react'

export default function ExhibitHeader({ eyebrow, title, summary, children }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="exhibit-header"
    >
      <div className="exhibit-heading">
        <span className="exhibit-kicker">{eyebrow}</span>
        <h1 className="exhibit-title">{title}</h1>
        <p className="exhibit-summary">{summary}</p>
      </div>
      {children ? <div className="exhibit-facts">{children}</div> : null}
    </motion.header>
  )
}
