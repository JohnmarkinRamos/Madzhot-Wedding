import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'
import { Reveal } from './Reveal'

const IVORY = '#FBF7F2', GOLD_SOFT = '#D9B26A', ROSE = '#C98A93'
const linkBase = { display: 'block', fontSize: '0.95rem', marginBottom: '0.7rem', color: 'rgba(251,247,242,0.72)', transition: 'color 0.2s ease' }

export function Footer({ admin = false }) {
  const prefix = admin ? '/admin' : ''
  const studioLinks = [['About', 'about'], ['Services', 'services'], ['Our Process', 'process'], ['Real Weddings', 'real-weddings'], ['FAQ', 'faq']]

  return (
    <footer className="paper" style={{ background: 'linear-gradient(160deg, #3E2230 0%, #2A1A22 100%)', color: IVORY, paddingTop: '5.5rem', paddingBottom: '2.5rem' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 6vw', position: 'relative', zIndex: 1 }}>

        {/* Top — brand + tagline */}
        <Reveal>
          <div style={{ borderBottom: '1px solid rgba(251,247,242,0.12)', paddingBottom: '3.5rem', marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <Link to={admin ? '/admin' : '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.9rem', fontWeight: 600, color: IVORY, marginBottom: '0.75rem' }}>
                <LogoIcon className="w-7 h-7" />
                Madzshots Weddings
              </Link>
              <p style={{ fontSize: '0.95rem', color: 'rgba(251,247,242,0.58)', maxWidth: '24rem', lineHeight: 1.65, marginTop: '0.5rem' }}>
                A full-service wedding planning &amp; styling studio based in Tarlac, Philippines.
              </p>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(1.3rem,2.4vw,1.7rem)', color: ROSE, maxWidth: '26rem', textAlign: 'right', lineHeight: 1.4 }}>
              "Every detail held with care,<br />from the first toast to the last dance."
            </p>
          </div>
        </Reveal>

        {/* Middle grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(251,247,242,0.12)', marginBottom: '2.5rem' }}>

          <div>
            <h5 style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: GOLD_SOFT, marginBottom: '1.25rem' }}>Studio</h5>
            {studioLinks.map(([label, slug]) => (
              <Link key={slug} to={`${prefix}/${slug}`} style={linkBase}
                onMouseEnter={e => e.currentTarget.style.color = GOLD_SOFT}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(251,247,242,0.72)'}>{label}</Link>
            ))}
          </div>

          <div>
            <h5 style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: GOLD_SOFT, marginBottom: '1.25rem' }}>Contact</h5>
            <p style={{ fontSize: '0.95rem', color: 'rgba(251,247,242,0.72)', lineHeight: 1.8 }}>
              #1 M. Suarez Bldg.<br />Plaridel St., San Jose<br />Concepcion, Tarlac
            </p>
            <a href="mailto:hello@madzshots.com" style={{ display: 'inline-block', marginTop: '0.75rem', fontSize: '0.92rem', color: ROSE }}>hello@madzshots.com</a>
          </div>

          <div>
            <h5 style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: GOLD_SOFT, marginBottom: '1.25rem' }}>Follow</h5>
            {/* TODO: real social links */}
            {[['Facebook', '#'], ['Instagram', '#'], ['TikTok', '#']].map(([s, href]) => (
              <a key={s} href={href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', marginBottom: '0.7rem', color: 'rgba(251,247,242,0.72)', transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = GOLD_SOFT}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(251,247,242,0.72)'}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: ROSE, flexShrink: 0, display: 'inline-block' }} />
                {s}
              </a>
            ))}
          </div>

          {/* Book CTA card */}
          <div style={{ background: 'linear-gradient(150deg, #C98A93, #6E2A35)', borderRadius: '16px', padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px', boxShadow: '0 14px 34px rgba(0,0,0,0.25)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 500, color: '#FFF8F0', lineHeight: 1.25, marginBottom: '1.25rem' }}>
              Ready to start planning your day?
            </p>
            {/* TODO: contact page */}
            <a href="#" className="btn btn-light" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.4rem', fontSize: '0.74rem' }}>Book a Call →</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(251,247,242,0.4)' }}>© 2026 Madzshots Weddings &amp; Events. All rights reserved.</span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(251,247,242,0.4)', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}>Designed with care, for couples telling their own story.</span>
        </div>

      </div>
    </footer>
  )
}
