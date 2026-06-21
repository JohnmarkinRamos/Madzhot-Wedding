import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Link } from 'react-router-dom'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

const team = [
  { name: 'Amara Cruz', role: 'Founder & Lead Planner', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80' },
  { name: 'Joaquin Reyes', role: 'Day-of Coordination Lead', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80' },
  { name: 'Lia Fernandez', role: 'Styling & Design Lead', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80' },
]

const values = [
  { title: 'Honesty first', desc: 'Clear budgets, realistic timelines, and straight answers — even when it\'s not what you want to hear. You\'ll never be surprised by a vendor invoice or a missed detail.' },
  { title: 'Calm under pressure', desc: 'Weather changes, vendors run late, plans shift — we\'ve seen it all. Our job is to absorb the chaos quietly so you never feel it on your day.' },
  { title: 'Designed, not default', desc: 'We don\'t reuse the same layout for every couple. Your colors, your traditions, your taste — every plan starts from a blank page.' },
]

export default function About({ admin = false }) {
  return (
    <>
      <Navbar admin={admin} />
      <main style={{ paddingTop: '5rem' }}>
        {/* Page Hero */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>About Us</Eyebrow>
              <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>The studio behind the story.</h1>
            </div>
            <p style={{ maxWidth: '30rem', color: '#564b43' }}>We're a small team in Tarlac who believe a wedding day should feel like the couple, not like a checklist.</p>
          </div>
        </section>

        {/* Story */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem', background: '#F4ECE3' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <div style={{ display: 'grid', gap: '4.5rem', alignItems: 'start', gridTemplateColumns: 'minmax(180px,380px) 1fr' }}>
              <div className="relative overflow-hidden" style={{ borderRadius: '2px', display: 'flex', alignItems: 'flex-end', padding: '2rem', aspectRatio: '4/5', backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(43,36,32,0.05) 35%,rgba(43,36,32,0.65) 100%)' }} />
                <span className="relative" style={{ zIndex: 10, color: '#FBF7F2', fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.3 }}>
                  "Every wedding has a rhythm. Our job is to help you hear it."
                </span>
              </div>
              <div>
                <Eyebrow>Our Story</Eyebrow>
                <h2 style={{ marginTop: '1.25rem', marginBottom: '1.25rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Planning rooted in heart, executed with precision.</h2>
                <p style={{ color: '#564b43', marginBottom: '1rem', maxWidth: '38rem' }}>Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p style={{ color: '#564b43', maxWidth: '38rem' }}>From quiet garden ceremonies to full-scale celebrations, our team handles the moving parts so you can stay present for the moments that matter. What started as one planner coordinating weekend weddings around Tarlac has grown into a full studio — but the way we work hasn't changed: close, hands-on, and personal to every couple we take on.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
                  {[
                    { title: 'Our Vision', text: "To be the studio couples trust to turn one of life's biggest days into a calm, joyful, unforgettable experience." },
                    { title: 'Our Mission', text: "To plan and coordinate weddings with honesty, organization, and warmth — so every couple feels held, not handled." },
                  ].map(({ title, text }) => (
                    <div key={title}>
                      <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', color: '#6E2A35' }}>{title}</h4>
                      <p style={{ fontSize: '0.92rem', color: '#564b43' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '2rem', marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(43,36,32,0.14)' }} className="md:grid-cols-4">
              {[['120+','Weddings planned'],['8','Years in business'],['40+','Trusted vendor partners'],['98%',"Couples who'd refer us"]].map(([num,label]) => (
                <div key={label}>
                  <strong style={{ display: 'block', fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: '2.4rem', lineHeight: 1, marginBottom: '0.5rem' }}>{num}</strong>
                  <span style={{ fontSize: '0.88rem', color: '#7a6f66' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>What We Stand For</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '3.5rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)', maxWidth: '30rem' }}>The values behind every plan we build</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem' }}>
              {values.map(({ title, desc }) => (
                <div key={title} style={{ padding: '2rem', borderRadius: '2px', border: '1px solid rgba(43,36,32,0.14)' }}>
                  <h4 style={{ marginBottom: '0.75rem', fontFamily: "'Fraunces',serif", fontSize: '1.15rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.94rem', color: '#564b43' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem', background: '#F4ECE3' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>Meet the Team</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '3.5rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)', maxWidth: '30rem' }}>The people planning your day</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '2rem' }}>
              {team.map(({ name, role, img }) => (
                <div key={name}>
                  <div style={{ borderRadius: '2px', marginBottom: '1rem', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center top', aspectRatio: '3/4' }} />
                  <h4 style={{ fontFamily: "'Fraunces',serif", fontSize: '1.15rem' }}>{name}</h4>
                  <span style={{ fontSize: '0.88rem', color: '#7a6f66' }}>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '6vw', paddingRight: '6vw', textAlign: 'center', color: '#FBF7F2', background: 'linear-gradient(135deg,#6E2A35,rgba(219,92,92,0))' }}>
          <h2 style={{ color: '#FBF7F2', fontSize: 'clamp(2.1rem,4vw,3.2rem)', maxWidth: '32rem', margin: '0 auto 1.6rem' }}>Let's start planning your "I do."</h2>
          <p style={{ color: 'rgba(251,247,242,0.75)', maxWidth: '30rem', margin: '0 auto 2.2rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
          <Link to="/contact" className="inline-block transition-colors hover:bg-[#B79257] hover:text-[#2B2420]" style={{ background: '#FBF7F2', color: '#6E2A35', padding: '1rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Book a Discovery Call</Link>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}