import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

const steps = [
  { num:'01', label:'Step One · Weeks 1–2', title:'Inquiry & Discovery', desc:"We start with a free discovery call — no obligation, just a conversation. We'll ask about your date, your venue (if you have one), your guest count, and what matters most to you as a couple. From there, we'll recommend which service tier fits, and send over a proposal with clear pricing.", img:'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80' },
  { num:'02', label:'Step Two · Months 1–6', title:'Design & Sourcing', desc:"This is where your wedding starts taking shape. We build out a mood board and design direction together, lock your venue if it isn't booked yet, and start curating a vendor shortlist — photographers, caterers, florists — matched to your taste and budget. You approve every vendor before we book.", img:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
  { num:'03', label:'Step Three · 4–6 Weeks Out', title:'Logistics & Timeline', desc:"The behind-the-scenes work ramps up. We build your minute-by-minute run-of-show, confirm every vendor's arrival time, finalize seating and floor plans, and walk the venue with you one more time. By the final two weeks, you shouldn't need to think about logistics at all — that's our job now.", img:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80' },
  { num:'04', label:'Step Four · The Big Day', title:'The Wedding Day', desc:"We arrive before anyone else and leave after everyone's gone. Our team manages vendor arrivals, styling setup, the ceremony, the reception flow, and any surprises that come up — quietly, so you never feel them. You get to actually be a guest at your own wedding.", img:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
]

export default function Process({ admin = false }) {
  return (
    <>
      <Navbar admin={admin} />
      <main style={{ paddingTop: '5rem' }}>
        {/* Hero */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>Our Process</Eyebrow>
              <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>From inquiry to "I do."</h1>
            </div>
            <p style={{ maxWidth: '30rem', color: '#564b43' }}>A clear, four-step path so you always know what's happening next — and what we need from you.</p>
          </div>
        </section>

        {/* Timeline dots */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: '#2B2420' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 relative" style={{ rowGap: '2.5rem' }}>
              <div className="absolute left-0 right-0 hidden md:block" style={{ top: '14px', height: '1px', background: 'rgba(251,247,242,0.25)' }} />
              {steps.map(({ num, label, title, desc }) => (
                <div key={num} className="relative" style={{ paddingRight: '1.5rem' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '9999px', marginBottom: '1.5rem', background: '#FBF7F2', border: '3px solid #2B2420', boxShadow: '0 0 0 1px rgba(251,247,242,0.5)' }} />
                  <small style={{ display: 'block', color: '#B79257', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{label.split(' · ')[0]}</small>
                  <h4 style={{ color: '#FBF7F2', marginBottom: '0.5rem', fontFamily: "'Fraunces',serif", fontWeight: 450, fontSize: '1.15rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.88rem', maxWidth: '15rem', color: 'rgba(251,247,242,0.65)' }}>{desc.split('.')[0]}.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Detail sections */}
        {steps.map(({ num, label, title, desc, img }, i) => (
          <div key={num} style={{ paddingTop: '5rem', paddingBottom: '5rem', background: i % 2 === 0 ? '#FBF7F2' : '#F4ECE3' }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontStyle: 'italic', color: 'rgba(43,36,32,0.1)', fontWeight: 600, fontSize: '4rem', lineHeight: 1 }}>{num}</div>
                <div style={{ borderRadius: '2px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '4/3' }} />
                <div>
                  <small style={{ display: 'block', color: '#B79257', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{label}</small>
                  <h3 style={{ marginBottom: '1rem', fontFamily: "'Fraunces',serif", fontSize: 'clamp(1.6rem,2.8vw,2.2rem)' }}>{title}</h3>
                  <p style={{ color: '#564b43' }}>{desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '6vw', paddingRight: '6vw', textAlign: 'center', background: 'linear-gradient(135deg,#6E2A35,rgba(219,92,92,0))' }}>
          <h2 style={{ color: '#FBF7F2', fontSize: 'clamp(2.1rem,4vw,3.2rem)', maxWidth: '32rem', margin: '0 auto 1.6rem' }}>Ready to start the first step?</h2>
          <p style={{ color: 'rgba(251,247,242,0.75)', maxWidth: '30rem', margin: '0 auto 2.2rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
          <Link to="/contact" className="inline-block transition-colors hover:bg-[#B79257] hover:text-[#2B2420]" style={{ background: '#FBF7F2', color: '#6E2A35', padding: '1rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Book a Discovery Call</Link>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}