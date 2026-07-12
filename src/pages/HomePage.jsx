import { Anchor, ArrowDown, ChevronRight, Compass, History, Sparkles, Waves, Wrench } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const OBSERVATION_UNITS = [
  {
    title: '从生存到垂钓',
    english: 'HISTORY OF ANGLING',
    description: '三十一个时间节点沿中国钓鱼史展开。器物、文献、图像和人物在各自的时代语境中出现。',
    icon: History,
    badges: ['31 个历史节点', '纵向时间轴', '图像与文献'],
  },
  {
    title: '鱼各有其水',
    english: 'FISH AND WATERS',
    description: '八百零六种鱼被放回具体水域，从规范名、科学名、栖息环境、食性和身体线索建立比较。',
    icon: Waves,
    badges: ['806 种鱼', '215 个科', '794 张本地主图'],
  },
  {
    title: '手中的水下仪器',
    english: 'TACKLE AS INSTRUMENT',
    description: '钩、线、竿、轮、漂、坠和饵组成一套感知与受力系统。展项关注它们如何工作，又在何处失效。',
    icon: Wrench,
    badges: ['25 件已整理器物', '部件拆解', '受力演示'],
  },
  {
    title: '读懂看不见的鱼',
    english: 'TECHNIQUES AND SIGNALS',
    description: '技法按饵技、竿技、漂技和鱼技展开。每项都保留目的、条件、步骤与常见误判。',
    icon: Compass,
    badges: ['21 项技法', '四类知识', '交互信号演示'],
  },
]

export default function HomePage() {
  const systemReducedMotion = useReducedMotion()
  const [ripples, setRipples] = useState([])
  const [activeUnit, setActiveUnit] = useState(0)

  const addRipple = (event) => {
    if (systemReducedMotion) return
    const rect = event.currentTarget.getBoundingClientRect()
    setRipples((current) => [...current.slice(-8), { x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() + Math.random() }])
  }

  const active = OBSERVATION_UNITS[activeUnit]

  return (
    <div onMouseMove={addRipple} onClick={addRipple} className="relative min-h-screen bg-[#f5f5f7] text-zinc-800 flex flex-col justify-between overflow-y-auto overflow-x-hidden cursor-crosshair select-none pb-12 font-sans">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-zinc-200/50 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[45%] h-[45%] rounded-full bg-zinc-300/40 blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.04] gemini-dot-field" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {ripples.map((ripple) => (
            <motion.span
              data-testid="home-ripple"
              key={ripple.id}
              initial={{ position: 'absolute', left: ripple.x, top: ripple.y, x: '-50%', y: '-50%', width: 16, height: 16, borderRadius: '50%', border: '1px solid rgba(9,9,11,.15)', scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 16, opacity: 0, borderWidth: '0.5px' }}
              transition={{ duration: 1.8, ease: [0.1, 0.8, 0.2, 1] }}
              onAnimationComplete={() => setRipples((current) => current.filter((item) => item.id !== ripple.id))}
            />
          ))}
      </div>

      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-8 flex justify-between items-center border-b border-zinc-200/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-xs"><Anchor size={18} className="animate-pulse" aria-hidden="true" /></div>
          <div><span className="text-[10px] uppercase tracking-normal text-zinc-400 font-medium">DIGITAL MUSEUM</span><strong className="text-xs font-semibold tracking-normal text-zinc-900 block">钓鱼佬博物馆</strong></div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase"><span>COORDINATES: 30°N 120°E</span><span className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-ping" /></div>
      </header>

      <main className="relative z-20 flex-grow flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] font-mono tracking-normal mx-auto shadow-xs"><Compass size={14} aria-hidden="true" /><span>THE WATER INVITATION / 从水面开始</span></div>
          <div className="space-y-4"><h1 className="text-5xl md:text-7xl font-extrabold tracking-normal text-zinc-900 leading-none">钓鱼佬博物馆</h1><div className="h-1 w-24 bg-zinc-900 mx-auto rounded-full gemini-title-line" /></div>
          <p className="max-w-2xl mx-auto text-zinc-600 text-sm md:text-base font-light leading-relaxed tracking-normal">
            一根钓线穿过水面以后，人能看见的东西很少。
            <br />浮漂停在明处，鱼钩和饵沉入暗处。博物馆沿着这根线，进入历史、鱼与水域、器物、技法、人的生活和钓获之后的责任。
            <span className="text-zinc-400 text-xs font-mono block mt-4 italic">* 移动鼠标或触碰屏幕，水面会留下短暂的涟漪 *</span>
          </p>
          <div className="pt-6 flex flex-col items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link onClick={(event) => event.stopPropagation()} to="/visit/prologue" aria-label="进入博物馆" className="group relative px-8 py-3.5 bg-zinc-900 text-white font-semibold rounded-full tracking-normal hover:bg-zinc-800 transition-all shadow-md flex items-center gap-3">
                <span>进入博物馆</span><ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </motion.div>
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-[9px] uppercase"><span>SCROLL DOWN TO VIEW THE MUSEUM STRUCTURE</span><ArrowDown size={10} className="text-zinc-600 animate-bounce" /></div>
          </div>
        </motion.div>
      </main>

      <section className="relative z-20 w-full max-w-5xl mx-auto px-6 py-12 space-y-12">
        <div className="text-center space-y-2 pb-4"><div className="inline-flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase"><Sparkles size={11} className="text-zinc-800 animate-pulse" /><span>OBSERVATION INDEX / 展览观察索引</span></div><h2 className="text-2xl md:text-4xl font-extrabold text-zinc-900 tracking-normal">四个内容切面</h2><p className="text-zinc-500 text-xs font-light max-w-lg mx-auto leading-relaxed">它们不是四条路线，只是正式参观顺序中的四种观察方法。</p></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative py-6">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-zinc-200 animate-[spin_120s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-zinc-300" />
              <div className="absolute inset-12 rounded-full border border-zinc-100" />
              <motion.div className="absolute w-1/2 h-[1px] bg-zinc-300 origin-left left-1/2 top-1/2 z-10" animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} />
              <div className="absolute inset-x-0 h-[1px] bg-zinc-200" /><div className="absolute inset-y-0 w-[1px] bg-zinc-200" />
              {OBSERVATION_UNITS.map((unit, idx) => {
                const Icon = unit.icon
                const angle = idx * 90
                const radius = 96
                const rad = (angle - 90) * Math.PI / 180
                const selected = activeUnit === idx
                return <button type="button" key={unit.title} onClick={(event) => { event.stopPropagation(); setActiveUnit(idx) }} className="absolute z-20 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center" style={{ transform: `translate(${Math.cos(rad) * radius}px, ${Math.sin(rad) * radius}px)` }}>{selected ? <span className="absolute w-12 h-12 bg-zinc-900/10 rounded-full blur-md animate-ping" /> : null}<span className={`p-3 rounded-full border transition-all duration-300 ${selected ? 'bg-zinc-900 border-zinc-900 text-white scale-110 shadow-md' : 'bg-white border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:border-zinc-300 hover:scale-105 shadow-xs'}`}><Icon size={16} aria-hidden="true" /></span><small className={`text-[8px] font-mono mt-1.5 ${selected ? 'text-zinc-900 font-bold' : 'text-zinc-400'}`}>0{idx + 1}</small></button>
              })}
              <div className="absolute w-10 h-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center z-10 shadow-xs"><Compass size={14} className="text-zinc-800 animate-spin" style={{ animationDuration: '20s' }} /></div>
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6 lg:pl-8 lg:border-l border-zinc-200 py-4 min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait"><motion.div key={activeUnit} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }} className="space-y-4"><div className="flex items-center justify-between border-b border-zinc-200 pb-2"><span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">MUSEUM UNIT 0{activeUnit + 1}</span><span className="text-[10px] text-zinc-500 font-mono uppercase">{active.english}</span></div><h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 leading-tight tracking-normal">{active.title}</h3><p className="text-sm text-zinc-600 font-light leading-relaxed max-w-xl">{active.description}</p><div className="pt-2 flex flex-wrap gap-2">{active.badges.map((badge) => <span key={badge} className="text-[10px] font-mono text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1 rounded-full">{badge}</span>)}</div></motion.div></AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
