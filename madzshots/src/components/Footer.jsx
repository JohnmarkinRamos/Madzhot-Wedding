import { Link } from 'react-router-dom'
import { LogoIcon } from './LogoIcon'

export function Footer({ admin = false }) {
  const prefix = admin ? '/admin' : ''
  return (
    <footer className="pt-[4.5rem] pb-8">
      <div className="max-w-[1180px] mx-auto px-[6vw]">
        <div
          className="grid gap-[2.5rem] pb-12 mb-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            borderBottom: '1px solid rgba(43,36,32,0.14)',
          }}
        >
          <div>
            <Link to={admin ? '/admin' : '/'} className="flex items-center gap-2 mb-4" style={{ fontFamily: "'Fraunces', serif", fontSize: '1.1rem', fontWeight: 600 }}>
              <LogoIcon className="w-6 h-6" />
              Madzshots Weddings
            </Link>
            <p className="text-sm text-[#564b43] max-w-[18rem]">A full-service wedding planning & styling studio based in Tarlac, Philippines.</p>
          </div>
          <div>
            <h5 className="text-[0.78rem] uppercase tracking-[0.08em] mb-4 text-[#7a6f66]">Studio</h5>
            {[['About','about'],['Services','services'],['Our Process','process'],['Real Weddings','real-weddings']].map(([label, slug]) => (
              <Link key={slug} to={`${prefix}/${slug}`} className="block text-[0.9rem] mb-2 text-[#4a3f38] hover:text-[#6E2A35] transition-colors">{label}</Link>
            ))}
          </div>
          <div>
            <h5 className="text-[0.78rem] uppercase tracking-[0.08em] mb-4 text-[#7a6f66]">Contact</h5>
            <p className="text-[0.9rem] text-[#4a3f38]">#1 M. Suarez Bldg.<br />Plaridel St., San Jose<br />Concepcion, Tarlac</p>
          </div>
          <div>
            <h5 className="text-[0.78rem] uppercase tracking-[0.08em] mb-4 text-[#7a6f66]">Follow</h5>
            {['Facebook','Instagram','TikTok'].map(s => (
              <a key={s} href="#" className="block text-[0.9rem] mb-2 text-[#4a3f38] hover:text-[#6E2A35] transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-[0.78rem] text-[#7a6f66] flex-wrap gap-4">
          <span>© 2026 Madzshots Weddings & Events. All rights reserved.</span>
          <span>Designed with care, for couples telling their own story.</span>
        </div>
      </div>
    </footer>
  )
}
