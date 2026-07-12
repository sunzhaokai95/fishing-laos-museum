import { AnimatePresence, motion } from 'motion/react'
import { Sparkles, Waves } from 'lucide-react'
import { useState } from 'react'

export default function PrologueHall() {
  const [submerged, setSubmerged] = useState(false)

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 flex flex-col justify-center items-center px-6 py-16 overflow-hidden font-sans ${submerged ? 'bg-[#e2edf6] text-zinc-900' : 'bg-[#f5f5f7] text-zinc-800'}`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          {submerged ? (
            <motion.div key="underwater" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
              <div className="absolute top-[20%] left-[15%] w-[60%] h-[60%] rounded-full bg-blue-200/30 blur-[130px] animate-pulse" />
              <div className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] rounded-full bg-zinc-200/40 blur-[120px]" />
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden"><span className="bubble x1" /><span className="bubble x2" /><span className="bubble x3" /><span className="bubble x4" /><span className="bubble x5" /></div>
            </motion.div>
          ) : (
            <motion.div key="surface" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0">
              <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] rounded-full bg-zinc-200/50 blur-[140px]" />
              <div className="absolute bottom-[5%] left-[5%] w-[45%] h-[45%] rounded-full bg-zinc-300/30 blur-[120px]" />
              <div className="absolute left-1/2 top-[25%] -translate-x-1/2 opacity-45 flex flex-col items-center">
                <span className="w-2.5 h-16 bg-zinc-900 rounded-full animate-float relative"><i className="absolute top-1/3 left-0 right-0 h-4 bg-zinc-400" /><i className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full border border-zinc-200" /></span>
                <span className="w-12 h-2.5 rounded-full border border-zinc-400/20 animate-ripple-expand mt-1" /><span className="w-20 h-4 rounded-full border border-zinc-400/10 animate-ripple-expand mt-0.5 [animation-delay:1s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-10">
        <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-[10px] font-mono tracking-normal uppercase transition-all duration-1000 ${submerged ? 'bg-white/60 backdrop-blur-md border-zinc-300/40 text-zinc-800' : 'bg-white/80 backdrop-blur-md border-zinc-200 text-zinc-600'}`}><Sparkles size={12} aria-hidden="true" /><span>PROLOGUE / 序厅</span></div>
        <article className="space-y-6 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-normal leading-none text-zinc-900">水面之下</h1>
          <div className={`relative py-8 border-y transition-colors duration-500 ${submerged ? 'border-zinc-300' : 'border-zinc-200/80'}`}>
            <p className={`text-sm font-light leading-loose tracking-normal text-left md:text-center ${submerged ? 'text-zinc-800' : 'text-zinc-600'}`}>一根钓线穿过水面以后，人能看见的东西很少。浮漂停在明处，鱼钩和饵沉入暗处。鱼在什么位置，水下有没有流动，温度、溶氧和食物如何变化，都藏在反光之下。钓者借助竿、线、轮、漂和自己的身体，接收那些不完整的信号。参观从这片水面开始。</p>
          </div>
        </article>
        <div className="flex flex-col items-center gap-4 pt-4 max-w-md mx-auto w-full">
          <div className="w-full space-y-3">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400 uppercase px-1"><span>OBSERVATION PERSPECTIVE / 观察视角</span><strong className="text-zinc-900">{submerged ? 'DEPTH: BELOW' : 'DEPTH: SURFACE'}</strong></div>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button type="button" onClick={() => setSubmerged(false)} className={`py-3.5 px-4 rounded-xl border text-xs transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 shadow-xs ${!submerged ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white/80 backdrop-blur-md border-zinc-200/80 text-zinc-600 hover:text-zinc-900'}`}><strong className="text-[13px]">水面视角</strong><small className="text-[9px] font-mono opacity-60">SURFACE</small></button>
              <button type="button" onClick={() => setSubmerged(true)} className={`py-3.5 px-4 rounded-xl border text-xs transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 shadow-xs ${submerged ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white/80 backdrop-blur-md border-zinc-200/80 text-zinc-600 hover:text-zinc-900'}`}><strong className="text-[13px]">水下视角</strong><small className="text-[9px] font-mono opacity-60">UNDERWATER</small></button>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono text-zinc-500 flex items-center gap-2"><Waves size={12} className="text-zinc-800 animate-pulse" aria-hidden="true" />{submerged ? '当前：水下视角' : '当前：水面视角'}</span>
        </div>
      </div>
    </div>
  )
}
