import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/about',         label: 'About' },
  { to: '/services',      label: 'Services' },
  { to: '/process',       label: 'Process' },
  { to: '/real-weddings', label: 'Portfolio' },
  { to: '/faq',           label: 'FAQ' },
]

// Light orange theme tokens
const ORANGE_GLASS    = 'rgba(255,195,140,0.55)'  // frosted orange when scrolled
const ORANGE_HERO     = 'rgba(200,100,40,0.15)'   // subtle tint over hero
const ORANGE_ACCENT   = '#C2611A'                  // deep warm orange — active/CTA
const ORANGE_ACCENT2  = '#A84E12'                  // darker hover
const ORANGE_SUBTLE   = '#8B5020'                  // muted brown-orange for secondary text
const ORANGE_DIVIDER  = 'rgba(160,70,20,0.14)'    // hairline

export function Navbar({ admin = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop]       = useState(true)
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === ''

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setAtTop(y < 10)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const transparentMode = isHome && atTop

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 900,
        transition: 'background 0.35s ease, box-shadow 0.35s ease',
        background: transparentMode ? ORANGE_HERO : ORANGE_GLASS,
        boxShadow: !transparentMode ? `0 1px 0 ${ORANGE_DIVIDER}` : 'none',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Top micro-bar */}
      <div
        style={{
          borderBottom: `1px solid ${ORANGE_DIVIDER}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '2rem',
          width: '100%',
          paddingLeft: '6vw',
          paddingRight: '6vw',
          height: '2.2rem',
          opacity: !transparentMode ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: transparentMode ? 'none' : 'auto',
        }}
      >
        <a
          href="tel:+639171234567"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: ORANGE_SUBTLE,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/>
          </svg>
          +63 917 123 4567
        </a>
        <a
          href="mailto:hello@madzshots.com"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: ORANGE_SUBTLE,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          hello@madzshots.com
        </a>
      </div>

      {/* Main nav row — full width with generous side padding */}
      <div
        style={{
          width: '100%',
          paddingLeft: '6vw',
          paddingRight: '6vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '3.8rem' : '4.6rem',
          transition: 'height 0.35s ease',
        }}
      >
        {/* Logo / wordmark */}
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
              color: transparentMode ? '#FBF7F2' : '#3B1A08',
              letterSpacing: '-0.01em',
              transition: 'color 0.35s ease',
            }}
          >
            Madzshots
          </span>
          <span
            style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: transparentMode ? 'rgba(251,247,242,0.65)' : ORANGE_ACCENT,
              marginTop: '2px',
              transition: 'color 0.35s ease',
            }}
          >
            Weddings &amp; Events
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
          {navLinks.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                style={{
                  position: 'relative',
                  padding: '0.4rem 1rem',
                  fontSize: '0.78rem',
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: transparentMode
                    ? active ? '#FBF7F2' : 'rgba(251,247,242,0.78)'
                    : active ? ORANGE_ACCENT : ORANGE_SUBTLE,
                  fontWeight: active ? 600 : 400,
                  transition: 'color 0.2s ease',
                }}
              >
                {label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '1rem',
                      right: '1rem',
                      height: '1.5px',
                      background: transparentMode ? '#FBF7F2' : ORANGE_ACCENT,
                      borderRadius: '1px',
                    }}
                  />
                )}
              </Link>
            )
          })}

          {/* Divider */}
          <span
            style={{
              display: 'block',
              width: '1px',
              height: '1.1rem',
              background: transparentMode ? 'rgba(251,247,242,0.3)' : ORANGE_DIVIDER,
              margin: '0 0.75rem',
            }}
          />

          {/* CTA button */}
          <Link
            to="/contact"
            style={{
              padding: '0.58rem 1.5rem',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              background: transparentMode ? 'rgba(251,247,242,0.15)' : ORANGE_ACCENT,
              color: '#FBF7F2',
              border: `1px solid ${transparentMode ? 'rgba(251,247,242,0.5)' : ORANGE_ACCENT}`,
              transition: 'background 0.25s ease, border-color 0.25s ease',
              borderRadius: '1px',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = ORANGE_ACCENT2
              e.currentTarget.style.borderColor = ORANGE_ACCENT2
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = transparentMode ? 'rgba(251,247,242,0.15)' : ORANGE_ACCENT
              e.currentTarget.style.borderColor = transparentMode ? 'rgba(251,247,242,0.5)' : ORANGE_ACCENT
            }}
          >
            Book a Call
          </Link>

          {/* Admin link */}
          {admin && (
            <Link
              to="/admin"
              style={{
                marginLeft: '0.5rem',
                padding: '0.58rem 1rem',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: transparentMode ? 'rgba(251,247,242,0.6)' : ORANGE_SUBTLE,
                border: `1px solid ${transparentMode ? 'rgba(251,247,242,0.25)' : ORANGE_DIVIDER}`,
                borderRadius: '1px',
              }}
            >
              Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}