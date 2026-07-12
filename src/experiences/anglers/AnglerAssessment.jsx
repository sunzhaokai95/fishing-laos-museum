import { motion } from 'motion/react'
import { RefreshCcw } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ANGLER_QUESTIONS, ANGLER_RESULTS } from '../../data/anglerInteractives.js'

const EMPTY = { observer: 0, analyst: 0, searcher: 0, keeper: 0 }
const DIMENSIONS = { observer: '观察', analyst: '校准', searcher: '搜索', keeper: '守候' }

export default function AnglerAssessment() {
  const [phase, setPhase] = useState('intro')
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState(EMPTY)
  useEffect(() => {
    if (phase !== 'analysing') return undefined
    const timer = window.setTimeout(() => setPhase('result'), 600)
    return () => window.clearTimeout(timer)
  }, [phase])
  const resultKey = useMemo(() => Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0], [scores])
  const answer = (type) => {
    setScores((current) => ({ ...current, [type]: current[type] + 1 }))
    if (step === ANGLER_QUESTIONS.length - 1) setPhase('analysing')
    else setStep((value) => value + 1)
  }
  const reset = () => { setPhase('intro'); setStep(0); setScores(EMPTY) }
  if (phase === 'intro') return <section className="angler-tool-stage text-center"><small>BEHAVIOR REFLECTION / 行为反思</small><h2>你如何在水边作出判断</h2><p>四个问题只整理你的选择倾向，不定义人格，也不判断钓技高低。</p><button type="button" aria-label="开始水边自测" onClick={() => setPhase('questions')} className="angler-primary-action">开始自测</button></section>
  if (phase === 'analysing') return <section className="angler-tool-stage text-center" aria-live="polite"><motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.3, ease: 'linear' }} className="mx-auto block h-12 w-12 rounded-full border border-stone-300 border-t-zinc-900" /><h2>正在整理四次选择</h2><p>把答案放回观察、校准、搜索和守候四个维度。</p></section>
  if (phase === 'result') { const result = ANGLER_RESULTS[resultKey]; return <section className="angler-tool-stage"><small>YOUR WATERSIDE TENDENCY / 水边倾向</small><h2>{result.title}</h2><p>{result.text}</p><div className="mt-7 grid gap-3">{Object.entries(DIMENSIONS).map(([key, label]) => { const value = scores[key] * 25; return <div key={key} className="grid grid-cols-[52px_1fr_34px] items-center gap-3 text-xs"><span>{label}</span><span role="progressbar" aria-label={`${label}维度`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={value} className="h-1.5 bg-stone-200"><motion.i initial={{ width: 0 }} animate={{ width: `${value}%` }} className="block h-full bg-zinc-800" /></span><span className="font-mono text-[9px] text-zinc-500">{value}</span></div> })}</div><button type="button" onClick={reset} aria-label="重新测试" className="angler-primary-action"><RefreshCcw size={13} aria-hidden="true" />重新测试</button></section> }
  const question = ANGLER_QUESTIONS[step]
  return <section className="angler-tool-stage"><div className="flex justify-between font-mono text-[9px] text-zinc-400"><span>QUESTION {step + 1} / {ANGLER_QUESTIONS.length}</span><span>{Math.round(step / ANGLER_QUESTIONS.length * 100)}%</span></div><h2>{question.question}</h2><div className="mt-7 grid gap-px bg-stone-200">{question.options.map((option) => <button type="button" key={option.text} onClick={() => answer(option.type)} className="min-h-14 bg-white px-4 py-3 text-left text-sm leading-6 text-zinc-700 hover:bg-stone-50">{option.text}</button>)}</div></section>
}
