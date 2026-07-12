import { FishSymbol, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function MuseumHeader({ overlay = false }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`museum-header ${overlay ? 'is-overlay' : ''}`}>
      <Link className="brand" to="/" aria-label="钓鱼佬博物馆首页">
        <span className="brand-mark" aria-hidden="true">
          <FishSymbol size={21} strokeWidth={1.6} />
        </span>
        <span>钓鱼佬博物馆</span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? '关闭导航' : '打开导航'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="全站导航">
        <NavLink to="/visit/prologue" onClick={() => setOpen(false)}>
          参观路线
        </NavLink>
        <NavLink to="/visit/fish" onClick={() => setOpen(false)}>
          鱼类标本
        </NavLink>
        <NavLink to="/visit/tackle" onClick={() => setOpen(false)}>
          钓具陈列
        </NavLink>
      </nav>
    </header>
  )
}
