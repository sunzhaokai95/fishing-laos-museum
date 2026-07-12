import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import MuseumHeader from '../components/MuseumHeader.jsx'

export default function NotFound() {
  return (
    <div className="not-found">
      <MuseumHeader />
      <main>
        <h1>这段水路还没有开放</h1>
        <p>当前地址没有对应的展厅或馆藏记录。</p>
        <Link to="/">
          <ArrowLeft aria-hidden="true" /> 回到博物馆首页
        </Link>
      </main>
    </div>
  )
}
