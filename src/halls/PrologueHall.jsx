import { motion } from 'motion/react'
import { useState } from 'react'

const readingForDepth = (depth) => {
  if (depth < 25) return '反光仍遮住大部分水下条件'
  if (depth < 70) return '表层与水下信号开始叠合'
  return '水下结构、流动与生物逐渐显现'
}

export default function PrologueHall() {
  const [depth, setDepth] = useState(0)
  const waterline = 62 - depth * 0.34

  return (
    <main
      className="prologue-theatre"
      data-submerged={depth >= 45 ? 'true' : 'false'}
      style={{ '--depth': depth / 100, '--waterline': `${waterline}%` }}
    >
      <span className="prologue-theatre__ghost" aria-hidden="true">水下</span>

      <div className="prologue-theatre__surface" aria-hidden="true">
        <span className="prologue-theatre__glare" />
        <motion.span
          className="prologue-theatre__float"
          animate={{ y: depth > 50 ? 42 : [0, 5, 0], rotate: depth > 50 ? 5 : [0, -1.5, 1.5, 0] }}
          transition={{ duration: depth > 50 ? .7 : 4.2, repeat: depth > 50 ? 0 : Infinity }}
        />
        <span className="prologue-theatre__line" />
      </div>

      <div className="prologue-theatre__underwater" aria-hidden="true">
        <i className="prologue-theatre__current prologue-theatre__current--one" />
        <i className="prologue-theatre__current prologue-theatre__current--two" />
        <motion.span
          className="prologue-theatre__fish prologue-theatre__fish--one"
          animate={{ x: ['-18vw', '112vw'], y: [0, -18, 8, 0] }}
          transition={{ repeat: Infinity, duration: 19, ease: 'linear' }}
        />
        <motion.span
          className="prologue-theatre__fish prologue-theatre__fish--two"
          animate={{ x: ['106vw', '-22vw'], y: [0, 12, -7, 0] }}
          transition={{ repeat: Infinity, duration: 27, ease: 'linear', delay: 3 }}
        />
      </div>

      <motion.article
        className="prologue-theatre__copy"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>PROLOGUE / 序厅</span>
        <h1>水面之下</h1>
        <p>一根钓线穿过水面以后，人能看见的东西很少。浮漂停在明处，鱼钩和饵沉入暗处。鱼在什么位置，水下有没有流动，温度、溶氧和食物如何变化，都藏在反光之下。钓者借助竿、线、轮、漂和自己的身体，接收那些不完整的信号。参观从这片水面开始。</p>
      </motion.article>

      <div className="prologue-depth">
        <div className="prologue-depth__readout">
          <span>观察深度</span>
          <output>{depth} / 100</output>
        </div>
        <input
          type="range"
          aria-label="观察深度"
          min="0"
          max="100"
          value={depth}
          onChange={(event) => setDepth(Number(event.target.value))}
        />
        <div className="prologue-depth__ends" aria-hidden="true"><span>水面</span><span>水下</span></div>
        <span className="prologue-depth__reading">{readingForDepth(depth)}</span>
      </div>
    </main>
  )
}
