import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useAuth } from '../context/AuthContext'

// ─── Replace these three values with your EmailJS credentials ───────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // e.g. 'aBcDeFgHiJkLmNoP'
// ────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { to: '/about',         label: 'About' },
  { to: '/services',      label: 'Services' },
  { to: '/real-weddings', label: 'Portfolio' },
  { to: '/faq',           label: 'FAQ' },
]

// warm-romantic palette
const INK = '#2B2420', IVORY = '#FBF7F2', WINE = '#6E2A35',
      ROSE_DEEP = '#9C5560', GOLD = '#B79257', MUTED = '#6b5a52'
const GLASS = 'rgba(251,247,242,0.85)'
const DIVIDER = 'rgba(110,42,53,0.14)'

const BOOKING_STAGES = [
  'Just Exploring',
  'Seriously Considering',
  'Ready to Book',
  'Already Have a Date',
]

function BookingModal({ onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', eventDate: '', phone: '',
    package: '', stage: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:       form.name,
          email:      form.email,
          phone:      form.phone,
          event_date: form.eventDate,
          package:    form.package,
          stage:      form.stage,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem',
    fontSize: '0.95rem',
    fontFamily: "'Work Sans', sans-serif",
    color: INK,
    background: '#FDFAF6',
    border: '1px solid rgba(43,36,32,0.16)',
    borderRadius: '10px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }
  const labelStyle = {
    fontSize: '0.78rem',
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: WINE,
    display: 'block',
    marginBottom: '0.4rem',
  }
  const focusOn = (e) => { e.target.style.borderColor = ROSE_DEEP }
  const focusOff = (e) => { e.target.style.borderColor = 'rgba(43,36,32,0.16)' }

  return (
    <motion.div
      onClick={onClose}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1100,
        background: 'rgba(42,26,34,0.6)',
        backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: '#FFFDF9', borderRadius: '24px', width: '100%', maxWidth: '720px',
          maxHeight: '90vh', overflowY: 'auto', padding: 'clamp(1.5rem, 4vw, 2.8rem)',
          position: 'relative', boxShadow: '0 28px 70px rgba(42,26,34,0.3)',
        }}
      >
        <button onClick={onClose} aria-label="Close"
          style={{ position: 'absolute', top: '1.2rem', right: '1.4rem', background: 'none',
            border: 'none', cursor: 'pointer', color: '#9E8A78', fontSize: '1.5rem', lineHeight: 1 }}>
          ×
        </button>

        <div style={{ marginBottom: '1.8rem' }}>
          <span style={{ fontSize: '0.78rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: WINE, fontFamily: "'Work Sans', sans-serif", fontWeight: 600 }}>
            — Book a Call
          </span>
          <p style={{ marginTop: '0.75rem', fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 500, lineHeight: 1.35, color: INK }}>
            Every love story is unique, and we can't wait to hear yours — tell us a little about
            your day and we'll be in touch.
          </p>
        </div>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.7rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
              Your message is on its way!
            </p>
            <p style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '0.95rem', color: MUTED }}>
              We'll get back to you within 24–48 hours.
            </p>
            <button onClick={onClose} className="btn btn-primary" style={{ marginTop: '1.8rem' }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bm-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Name <span style={{ color: ROSE_DEEP }}>*</span></label>
                <input required value={form.name} onChange={set('name')} placeholder="Enter your name" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
              </div>
              <div>
                <label style={labelStyle}>Event Date</label>
                <input type="date" value={form.eventDate} onChange={set('eventDate')} style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
              </div>
            </div>

            <div className="bm-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Email Address <span style={{ color: ROSE_DEEP }}>*</span></label>
                <input required type="email" value={form.email} onChange={set('email')} placeholder="Email Address" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input type="tel" value={form.phone} onChange={set('phone')} placeholder="Example: 09123456789" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
              </div>
            </div>

            <div className="bm-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 1.5rem', marginBottom: '1rem' }}>
              <div>
                <label style={labelStyle}>Selected Package</label>
                <input value={form.package} onChange={set('package')} placeholder="e.g. Harmony, Eternity…" style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
              </div>
              <div>
                <label style={labelStyle}>Where are you in your booking process? <span style={{ color: ROSE_DEEP }}>*</span></label>
                <select required value={form.stage} onChange={set('stage')}
                  style={{ ...inputStyle, appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }} onFocus={focusOn} onBlur={focusOff}>
                  <option value="">— Select —</option>
                  {BOOKING_STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.8rem' }}>
              <label style={labelStyle}>Message</label>
              <textarea value={form.message} onChange={set('message')} rows={4} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusOn} onBlur={focusOff} />
            </div>

            <button type="submit" disabled={status === 'sending'} className="btn btn-primary"
              style={{ opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'default' : 'pointer' }}>
              {status === 'sending' ? 'Sending…' : 'Submit Form'}
            </button>

            {status === 'error' && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#B33333', fontFamily: "'Work Sans', sans-serif" }}>
                Something went wrong. Please try again or email us directly at{' '}
                <a href="mailto:hello@madzshots.com" style={{ color: WINE }}>hello@madzshots.com</a>
              </p>
            )}
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}

export function Navbar({ admin = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  async function handleSignOut() {
    setMenuOpen(false)
    await signOut()
    navigate('/admin/login')
  }
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

  // lock scroll for modal or mobile menu
  useEffect(() => {
    document.body.style.overflow = (modalOpen || menuOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen, menuOpen])

  const transparentMode = isHome && atTop && !menuOpen
  const textColor = transparentMode ? IVORY : INK
  const subtleColor = transparentMode ? 'rgba(251,247,242,0.8)' : MUTED

  return (
    <>
      <style>{`
        .nav-burger { display: none; }
        @media (max-width: 880px) {
          .nav-desktop { display: none !important; }
          .nav-microbar { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (max-width: 560px) {
          .bm-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          background: transparentMode ? 'transparent' : GLASS,
          boxShadow: !transparentMode ? '0 1px 0 ' + DIVIDER : 'none',
          backdropFilter: transparentMode ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: transparentMode ? 'none' : 'blur(20px)',
        }}
      >
        {/* Top micro-bar */}
        <div className="nav-microbar"
          style={{
            borderBottom: '1px solid ' + DIVIDER, display: 'flex', alignItems: 'center',
            justifyContent: 'flex-end', gap: '2rem', width: '100%', paddingLeft: '6vw', paddingRight: '6vw',
            height: '2.2rem', opacity: !transparentMode ? 1 : 0, transition: 'opacity 0.3s ease',
            pointerEvents: transparentMode ? 'none' : 'auto',
          }}
        >
          <a href="tel:+639171234567" style={{ fontSize: '0.74rem', letterSpacing: '0.06em', color: MUTED, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z" /></svg>
            +63 917 123 4567
          </a>
          <a href="mailto:hello@madzshots.com" style={{ fontSize: '0.74rem', letterSpacing: '0.06em', color: MUTED, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            hello@madzshots.com
          </a>
        </div>

        {/* Main nav row */}
        <div style={{ width: '100%', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '3.8rem' : '4.6rem', transition: 'height 0.35s ease' }}>
          {/* Logo */}
          <Link to={admin ? '/admin' : '/'} style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(1.5rem, 2.4vw, 1.8rem)', color: textColor, letterSpacing: '0.01em', transition: 'color 0.35s ease' }}>
              Madzshots
            </span>
            <span style={{ fontFamily: "'Work Sans', sans-serif", fontSize: '0.62rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: transparentMode ? 'rgba(251,247,242,0.7)' : GOLD, marginTop: '2px', transition: 'color 0.35s ease' }}>
              Weddings &amp; Events
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
            {navLinks.map(({ to, label }) => {
              const target = admin ? `/admin${to}` : to
              const active = location.pathname === target
              return (
                <Link key={to} to={target}
                  style={{ position: 'relative', padding: '0.4rem 1rem', fontSize: '0.8rem', letterSpacing: '0.07em', textTransform: 'uppercase',
                    color: active ? (transparentMode ? IVORY : WINE) : subtleColor, fontWeight: active ? 600 : 400, transition: 'color 0.2s ease' }}>
                  {label}
                  {active && <span style={{ position: 'absolute', bottom: '-2px', left: '1rem', right: '1rem', height: '1.5px', background: transparentMode ? IVORY : GOLD, borderRadius: '1px' }} />}
                </Link>
              )
            })}

            <span style={{ display: 'block', width: '1px', height: '1.1rem', background: transparentMode ? 'rgba(251,247,242,0.3)' : DIVIDER, margin: '0 0.85rem' }} />

            <button onClick={() => setModalOpen(true)} className="btn"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.74rem',
                background: transparentMode ? 'rgba(251,247,242,0.14)' : WINE, color: IVORY,
                border: '1px solid ' + (transparentMode ? 'rgba(251,247,242,0.5)' : WINE) }}
              onMouseEnter={(e) => { e.currentTarget.style.background = transparentMode ? 'rgba(251,247,242,0.28)' : ROSE_DEEP; e.currentTarget.style.borderColor = transparentMode ? 'rgba(251,247,242,0.7)' : ROSE_DEEP }}
              onMouseLeave={(e) => { e.currentTarget.style.background = transparentMode ? 'rgba(251,247,242,0.14)' : WINE; e.currentTarget.style.borderColor = transparentMode ? 'rgba(251,247,242,0.5)' : WINE }}>
              Book a Call
            </button>

            {admin && (
              <>
                <Link to="/admin" className="btn" style={{ marginLeft: '0.5rem', padding: '0.6rem 1.1rem', fontSize: '0.72rem', color: subtleColor, border: '1px solid ' + (transparentMode ? 'rgba(251,247,242,0.25)' : DIVIDER) }}>Admin</Link>
                <button onClick={handleSignOut} className="btn" style={{ marginLeft: '0.4rem', padding: '0.6rem 1.1rem', fontSize: '0.72rem', background: 'none', color: subtleColor, border: '1px solid ' + (transparentMode ? 'rgba(251,247,242,0.25)' : DIVIDER) }}>Sign Out</button>
              </>
            )}
          </nav>

          {/* Mobile burger */}
          <button className="nav-burger" aria-label="Menu" onClick={() => setMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '34px', height: '28px', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: textColor, top: menuOpen ? '13px' : '7px', transform: menuOpen ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: textColor, top: '13px', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.2s ease' }} />
            <span style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: textColor, top: menuOpen ? '13px' : '19px', transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s ease' }} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="paper"
            style={{ position: 'fixed', inset: 0, zIndex: 990, background: 'linear-gradient(160deg, #FBF7F2, #F7E9E4)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6vw' }}
          >
            <motion.nav
              initial="hidden" animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}
            >
              {navLinks.map(({ to, label }) => {
                const target = admin ? `/admin${to}` : to
                return (
                  <motion.div key={to} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                    <Link to={target} onClick={() => setMenuOpen(false)}
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.4rem', fontWeight: 500, color: location.pathname === target ? WINE : INK }}>
                      {label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <button onClick={() => { setMenuOpen(false); setModalOpen(true) }} className="btn btn-primary">Book a Call</button>
                {admin && (
                  <>
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="btn btn-ghost">Admin</Link>
                    <button onClick={handleSignOut} className="btn btn-ghost">Sign Out</button>
                  </>
                )}
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} style={{ marginTop: '2.5rem', borderTop: '1px solid ' + DIVIDER, paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="tel:+639171234567" style={{ fontSize: '0.9rem', color: MUTED }}>+63 917 123 4567</a>
                <a href="mailto:hello@madzshots.com" style={{ fontSize: '0.9rem', color: MUTED }}>hello@madzshots.com</a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
