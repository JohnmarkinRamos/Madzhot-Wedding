import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'

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

const ORANGE_GLASS   = 'rgba(255,195,140,0.55)'
const ORANGE_HERO    = 'rgba(200,100,40,0.15)'
const ORANGE_ACCENT  = '#C2611A'
const ORANGE_ACCENT2 = '#A84E12'
const ORANGE_SUBTLE  = '#8B5020'
const ORANGE_DIVIDER = 'rgba(160,70,20,0.14)'

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
    padding: '0.7rem 0.9rem',
    fontSize: '0.88rem',
    fontFamily: "'Work Sans', sans-serif",
    color: '#2B2420',
    background: '#FDFAF6',
    border: '1px solid rgba(43,36,32,0.18)',
    borderRadius: '3px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  const labelStyle = {
    fontSize: '0.72rem',
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: '600',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#8B5020',
    display: 'block',
    marginBottom: '0.35rem',
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(30,15,5,0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFDF9',
          borderRadius: '6px',
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(1.5rem, 4vw, 2.8rem)',
          position: 'relative',
          boxShadow: '0 24px 64px rgba(30,15,5,0.22)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.4rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#9E8A78',
            fontSize: '1.4rem',
            lineHeight: 1,
            padding: '0.2rem',
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Header */}
        <div style={{ marginBottom: '1.8rem' }}>
          <span style={{
            fontSize: '0.68rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: ORANGE_ACCENT,
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: '600',
          }}>
            — Book a Call
          </span>
          <p style={{
            marginTop: '0.75rem',
            fontFamily: "'Fraunces', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            fontWeight: '300',
            lineHeight: 1.5,
            color: '#2B2420',
          }}>
            Every love story is unique, and we can't wait to hear yours. Whether you're
            planning an intimate gathering or a grand celebration, we're here to capture
            every emotion and detail with elegance and heart.
          </p>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
            <p style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.3rem',
              fontWeight: '300',
              color: '#2B2420',
              marginBottom: '0.5rem',
            }}>
              Your message is on its way!
            </p>
            <p style={{
              fontFamily: "'Work Sans', sans-serif",
              fontSize: '0.88rem',
              color: '#9E8A78',
            }}>
              We'll get back to you within 24–48 hours.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: '1.8rem',
                padding: '0.65rem 2rem',
                background: ORANGE_ACCENT,
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: "'Work Sans', sans-serif",
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* Row 1: Name + Event Date */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem 1.5rem',
              marginBottom: '1rem',
            }}>
              <div>
                <label style={labelStyle}>
                  Name <span style={{ color: ORANGE_ACCENT }}>*</span>
                </label>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  placeholder="Enter your name"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Event Date</label>
                <input
                  type="date"
                  value={form.eventDate}
                  onChange={set('eventDate')}
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                />
              </div>
            </div>

            {/* Row 2: Email + Phone */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem 1.5rem',
              marginBottom: '1rem',
            }}>
              <div>
                <label style={labelStyle}>
                  Email Address <span style={{ color: ORANGE_ACCENT }}>*</span>
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  placeholder="Email Address"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="Example: 09123456789"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                />
              </div>
            </div>

            {/* Row 3: Package + Booking Stage */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem 1.5rem',
              marginBottom: '1rem',
            }}>
              <div>
                <label style={labelStyle}>Selected Package</label>
                <input
                  value={form.package}
                  onChange={set('package')}
                  placeholder="e.g. Harmony, Eternity…"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                />
              </div>
              <div>
                <label style={labelStyle}>
                  Where are you in your booking process?{' '}
                  <span style={{ color: ORANGE_ACCENT }}>*</span>
                </label>
                <select
                  required
                  value={form.stage}
                  onChange={set('stage')}
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
                >
                  <option value="">— Select —</option>
                  {BOOKING_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.8rem' }}>
              <label style={labelStyle}>Message</label>
              <textarea
                value={form.message}
                onChange={set('message')}
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => { e.target.style.borderColor = ORANGE_ACCENT }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(43,36,32,0.18)' }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                padding: '0.75rem 2.2rem',
                background: status === 'sending' ? '#C2906A' : ORANGE_ACCENT,
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: '600',
                cursor: status === 'sending' ? 'default' : 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (status !== 'sending') e.currentTarget.style.background = ORANGE_ACCENT2
              }}
              onMouseLeave={(e) => {
                if (status !== 'sending') e.currentTarget.style.background = ORANGE_ACCENT
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Submit Form'}
            </button>

            {/* Error message */}
            {status === 'error' && (
              <p style={{
                marginTop: '0.75rem',
                fontSize: '0.82rem',
                color: '#B33333',
                fontFamily: "'Work Sans', sans-serif",
              }}>
                Something went wrong. Please try again or email us directly at{' '}
                <a href="mailto:hello@madzshots.com" style={{ color: ORANGE_ACCENT }}>
                  hello@madzshots.com
                </a>
              </p>
            )}

          </form>
        )}
      </div>
    </div>
  )
}

export function Navbar({ admin = false }) {
  const [scrolled,  setScrolled]  = useState(false)
  const [atTop,     setAtTop]     = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
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

  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const transparentMode = isHome && atTop

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: 'background 0.35s ease, box-shadow 0.35s ease',
          background: transparentMode ? ORANGE_HERO : ORANGE_GLASS,
          boxShadow: !transparentMode ? '0 1px 0 ' + ORANGE_DIVIDER : 'none',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Top micro-bar */}
        <div
          style={{
            borderBottom: '1px solid ' + ORANGE_DIVIDER,
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
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z" />
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            hello@madzshots.com
          </a>
        </div>

        {/* Main nav row */}
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
          {/* Logo */}
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
              // In admin mode, keep the user inside the /admin/* routes
              const target = admin ? `/admin${to}` : to
              const active = location.pathname === target
              return (
                <Link
                  key={to}
                  to={target}
                  style={{
                    position: 'relative',
                    padding: '0.4rem 1rem',
                    fontSize: '0.78rem',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: transparentMode
                      ? (active ? '#FBF7F2' : 'rgba(251,247,242,0.78)')
                      : (active ? ORANGE_ACCENT : ORANGE_SUBTLE),
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

            {/* Book a Call */}
            <button
              onClick={() => setModalOpen(true)}
              style={{
                padding: '0.58rem 1.5rem',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                background: transparentMode ? 'rgba(251,247,242,0.15)' : ORANGE_ACCENT,
                color: '#FBF7F2',
                border: '1px solid ' + (transparentMode ? 'rgba(251,247,242,0.5)' : ORANGE_ACCENT),
                transition: 'background 0.25s ease, border-color 0.25s ease',
                borderRadius: '1px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                fontFamily: "'Work Sans', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ORANGE_ACCENT2
                e.currentTarget.style.borderColor = ORANGE_ACCENT2
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = transparentMode ? 'rgba(251,247,242,0.15)' : ORANGE_ACCENT
                e.currentTarget.style.borderColor = transparentMode ? 'rgba(251,247,242,0.5)' : ORANGE_ACCENT
              }}
            >
              Book a Call
            </button>

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
                  border: '1px solid ' + (transparentMode ? 'rgba(251,247,242,0.25)' : ORANGE_DIVIDER),
                  borderRadius: '1px',
                }}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
      </header>

      {modalOpen && <BookingModal onClose={() => setModalOpen(false)} />}
    </>
  )
}