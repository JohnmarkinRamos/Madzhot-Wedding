import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'

export function Footer({ admin = false }) {
  const prefix = admin ? '/admin' : ''

  return (
    <footer style={{ background: '#2B2420', color: '#FBF7F2', paddingTop: '5rem', paddingBottom: '2.5rem' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 6vw' }}>

        {/* Top — brand + tagline spanning full width */}
        <div style={{ borderBottom: '1px solid rgba(251,247,242,0.1)', paddingBottom: '3.5rem', marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <Link
              to={admin ? '/admin' : '/'}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Fraunces', serif", fontSize: '1.35rem', fontWeight: 600, color: '#FBF7F2', textDecoration: 'none', marginBottom: '0.75rem' }}
            >
              <LogoIcon className="w-7 h-7" />
              Madzshots Weddings
            </Link>
            <p style={{ fontSize: '0.9rem', color: 'rgba(251,247,242,0.55)', maxWidth: '22rem', lineHeight: 1.65, marginTop: '0.5rem' }}>
              A full-service wedding planning &amp; styling studio based in Tarlac, Philippines.
            </p>
          </div>

          {/* Italic pull quote */}
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem,2vw,1.4rem)', color: 'rgba(251,247,242,0.35)', maxWidth: '26rem', textAlign: 'right', lineHeight: 1.4 }}>
            "Every detail held with care,<br />from the first toast to the last dance."
          </p>
        </div>

        {/* Middle grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(251,247,242,0.1)', marginBottom: '2.5rem' }}>

          {/* Studio links */}
          <div>
            <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(251,247,242,0.4)', marginBottom: '1.25rem' }}>Studio</h5>
            {[['About','about'],['Services','services'],['Our Process','process'],['Real Weddings','real-weddings'],['FAQ','faq']].map(([label, slug]) => (
              <Link
                key={slug}
                to={`${prefix}/${slug}`}
                style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.65rem', color: 'rgba(251,247,242,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E8833A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(251,247,242,0.7)'}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(251,247,242,0.4)', marginBottom: '1.25rem' }}>Contact</h5>
            <p style={{ fontSize: '0.9rem', color: 'rgba(251,247,242,0.7)', lineHeight: 1.8 }}>
              #1 M. Suarez Bldg.<br />
              Plaridel St., San Jose<br />
              Concepcion, Tarlac
            </p>
            <a
              href="mailto:hello@madzshots.com"
              style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.88rem', color: '#E8833A', textDecoration: 'none' }}
            >hello@madzshots.com</a>
          </div>

          {/* Follow */}
          <div>
            <h5 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(251,247,242,0.4)', marginBottom: '1.25rem' }}>Follow</h5>
            {[['Facebook','#'],['Instagram','#'],['TikTok','#']].map(([s, href]) => (
              <a
                key={s}
                href={href}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '0.65rem', color: 'rgba(251,247,242,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#E8833A'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(251,247,242,0.7)'}
              >
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E8833A', flexShrink: 0, display: 'inline-block' }} />
                {s}
              </a>
            ))}
          </div>

          {/* Book CTA card */}
          <div style={{ background: '#E8833A', borderRadius: '4px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', color: '#FFF8F0', lineHeight: 1.4, marginBottom: '1.25rem' }}>
              Ready to start planning your day?
            </p>
            <a
              href="#contact"
              style={{ display: 'inline-block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFF8F0', border: '1px solid rgba(255,248,240,0.6)', padding: '0.6rem 1rem', textDecoration: 'none', borderRadius: '2px', transition: 'all 0.2s', alignSelf: 'flex-start' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FFF8F0'; e.currentTarget.style.color = '#E8833A' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FFF8F0' }}
            >
              Book a Call →
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.76rem', color: 'rgba(251,247,242,0.3)' }}>© 2026 Madzshots Weddings & Events. All rights reserved.</span>
          <span style={{ fontSize: '0.76rem', color: 'rgba(251,247,242,0.3)', fontFamily: "'Fraunces', serif", fontStyle: 'italic' }}>Designed with care, for couples telling their own story.</span>
        </div>

      </div>
    </footer>
  )
}