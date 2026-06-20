import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { LogoIcon } from './LogoIcon'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/process', label: 'Process' },
  { to: '/real-weddings', label: 'Real Weddings' },
  { to: '/faq', label: 'FAQ' },
]

export function Navbar({ admin = false }) {
  const location = useLocation()
  const { session, signOut } = useAuth()
  const [open, setOpen] = useState(false)

  const prefix = admin ? '/admin' : ''
  const links = admin
    ? navLinks.map(l => ({ ...l, to: `/admin${l.to}` }))
    : navLinks

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{ background: 'rgba(251,247,242,0.88)', backdropFilter: 'blur(10px)', borderColor: 'rgba(43,36,32,0.14)' }}
    >
      <nav className="max-w-[1180px] mx-auto px-[6vw] py-[1.1rem] flex items-center justify-between">
        <Link
          to={admin ? '/admin' : '/'}
          className="flex items-center gap-[0.55rem]"
          style={{ fontFamily: "'Fraunces', serif", fontSize: '1.35rem', fontWeight: 600 }}
        >
          <LogoIcon className="w-[26px] h-[26px]" />
          Madzshots Weddings
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-[2.4rem]" style={{ fontSize: '0.86rem', letterSpacing: '0.03em' }}>
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="relative pb-1 transition-colors hover:text-[#6E2A35]"
              style={{ color: location.pathname === to ? '#6E2A35' : '#2B2420' }}
            >
              {label}
              <span
                className="absolute left-0 bottom-0 h-px bg-[#6E2A35] transition-all duration-[250ms]"
                style={{ width: location.pathname === to ? '100%' : '0' }}
              />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {admin && session ? (
            <button
              onClick={signOut}
              className="text-[0.78rem] tracking-[0.1em] uppercase border border-[#2B2420] px-[1.3rem] py-[0.6rem] transition-all hover:bg-[#6E2A35] hover:border-[#6E2A35] hover:text-[#FBF7F2]"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/contact"
              className="text-[0.78rem] tracking-[0.1em] uppercase border border-[#2B2420] px-[1.3rem] py-[0.6rem] transition-all hover:bg-[#6E2A35] hover:border-[#6E2A35] hover:text-[#FBF7F2]"
            >
              Inquire
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#2B2420] transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2B2420] transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#2B2420] transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FBF7F2] border-t px-[6vw] py-4 flex flex-col gap-4" style={{ borderColor: 'rgba(43,36,32,0.14)' }}>
          {links.map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="text-sm font-medium text-[#2B2420]">
              {label}
            </Link>
          ))}
          {admin && session ? (
            <button onClick={() => { signOut(); setOpen(false) }} className="text-sm text-left text-[#6E2A35]">Logout</button>
          ) : (
            <Link to="/contact" onClick={() => setOpen(false)} className="text-sm font-medium text-[#6E2A35]">Inquire</Link>
          )}
        </div>
      )}
    </header>
  )
}
