import { motion } from 'motion/react'
import { Waves } from 'lucide-react'
import { useState } from 'react'

export default function PrologueHall() {
  const [depth, setDepth] = useState(0)

  return (
    <main
      className="prologue-scene min-h-[calc(100svh-132px)]"
      data-submerged={depth >= 45 ? 'true' : 'false'}
      style={{ '--observation-depth': depth / 100 }}
    >
      <div className="prologue-water" aria-hidden="true">
        <motion.span
          className="prologue-float"
          animate={{ y: depth > 50 ? 34 : [0, 4, 0], rotate: depth > 50 ? 4 : [0, -1, 1, 0] }}
          transition={{ duration: depth > 50 ? 0.7 : 4, repeat: depth > 50 ? 0 : Infinity }}
        />
        <span className="prologue-line" />
        <motion.i
          className="prologue-fish"
          animate={{ x: ['-15vw', '115vw'], y: [0, -16, 7] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        />
      </div>

      <article className="prologue-copy">
        <span className="prologue-kicker">PROLOGUE / 序厅</span>
        <h1>水面之下</h1>
        <p>一根钓线穿过水面以后，人能看见的东西很少。浮漂停在明处，鱼钩和饵沉入暗处。鱼在什么位置，水下有没有流动，温度、溶氧和食物如何变化，都藏在反光之下。钓者借助竿、线、轮、漂和自己的身体，接收那些不完整的信号。参观从这片水面开始。</p>
      </article>

      <div className="prologue-control">
        <div><span>OBSERVATION DEPTH / 观察深度</span><output>{depth} / 100</output></div>
        <input type="range" aria-label="观察深度" min="0" max="100" value={depth} onChange={(event) => setDepth(Number(event.target.value))} />
        <div className="prologue-presets">
          <button type="button" aria-pressed={depth < 45} onClick={() => setDepth(0)}>水面视角</button>
          <button type="button" aria-pressed={depth >= 45} onClick={() => setDepth(100)}>水下视角</button>
        </div>
        <span className="prologue-reading"><Waves size={12} aria-hidden="true" />{depth < 25 ? '反光仍遮住大部分水下条件' : depth < 70 ? '表层与水下信号开始叠合' : '水下结构、流动与生物逐渐显现'}</span>
      </div>
    </main>
  )
}
