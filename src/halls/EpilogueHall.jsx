import { RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EpilogueHall() {
  return (
    <main className="epilogue-scene">
      <div><span>尾厅</span><h1>回到水边</h1><p>水面仍然平静，但你已经知道，下面有鱼的身体、水的变化、器物传来的信号，也有人的欲望、记忆和边界。</p><p>钓鱼并不保证获得一条鱼。它更像一次持续的判断：什么时候靠近，怎样理解，带走什么，又留下什么。</p><Link to="/"><RotateCcw aria-hidden="true" /> 回到博物馆入口</Link></div>
    </main>
  )
}
