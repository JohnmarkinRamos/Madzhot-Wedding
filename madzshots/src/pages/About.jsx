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
        <section className="py-[5rem]" style={{ borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Eyebrow>About Us</Eyebrow>
              <h1 className="mt-4" style={{ fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>The studio behind the story.</h1>
            </div>
            <p className="max-w-[30rem] text-[#564b43]">We're a small team in Tarlac who believe a wedding day should feel like the couple, not like a checklist.</p>
          </div>
        </section>

        {/* Story */}
        <section className="py-[7.5rem] bg-[#F4ECE3]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <div className="grid gap-[4.5rem] items-start" style={{ gridTemplateColumns: 'clamp(180px,0.85fr,380px) 1fr' }}>
              <div className="relative overflow-hidden rounded-[2px] flex items-end p-8" style={{ aspectRatio:'4/5', background:'linear-gradient(165deg,#6E2A35,#4a1b22)', backgroundImage:"url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80')", backgroundSize:'cover', backgroundPosition:'center' }}>
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(43,36,32,0.05) 35%,rgba(43,36,32,0.65) 100%)' }} />
                <span className="relative z-10 text-[#FBF7F2]" style={{ fontFamily:"'Fraunces',serif", fontStyle:'italic', fontSize:'1.3rem', lineHeight:1.3 }}>
                  "Every wedding has a rhythm. Our job is to help you hear it."
                </span>
              </div>
              <div>
                <Eyebrow>Our Story</Eyebrow>
                <h2 className="mt-5 mb-5" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)' }}>Planning rooted in heart, executed with precision.</h2>
                <p className="text-[#564b43] mb-4 max-w-[38rem]">Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p className="text-[#564b43] max-w-[38rem]">From quiet garden ceremonies to full-scale celebrations, our team handles the moving parts so you can stay present for the moments that matter. What started as one planner coordinating weekend weddings around Tarlac has grown into a full studio — but the way we work hasn't changed: close, hands-on, and personal to every couple we take on.</p>
                <div className="grid grid-cols-2 gap-8 mt-10">
                  {[
                    { title:'Our Vision', text:"To be the studio couples trust to turn one of life's biggest days into a calm, joyful, unforgettable experience." },
                    { title:'Our Mission', text:"To plan and coordinate weddings with honesty, organization, and warmth — so every couple feels held, not handled." },
                  ].map(({ title, text }) => (
                    <div key={title}>
                      <h4 className="text-[0.95rem] uppercase tracking-[0.08em] mb-2 text-[#6E2A35]">{title}</h4>
                      <p className="text-[0.92rem] text-[#564b43]">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12" style={{ borderTop:'1px solid rgba(43,36,32,0.14)' }}>
              {[['120+','Weddings planned'],['8','Years in business'],['40+','Trusted vendor partners'],['98%',"Couples who'd refer us"]].map(([num,label]) => (
                <div key={label} className="text-center md:text-left">
                  <strong className="block text-[2.4rem] leading-none mb-2" style={{ fontFamily:"'Fraunces',serif", fontWeight:600 }}>{num}</strong>
                  <span className="text-[0.88rem] text-[#7a6f66]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-[7.5rem]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>What We Stand For</Eyebrow>
            <h2 className="mt-5 mb-14" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)', maxWidth:'30rem' }}>The values behind every plan we build</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map(({ title, desc }) => (
                <div key={title} className="p-8 rounded-[2px]" style={{ border:'1px solid rgba(43,36,32,0.14)' }}>
                  <h4 className="mb-3" style={{ fontFamily:"'Fraunces',serif", fontSize:'1.15rem' }}>{title}</h4>
                  <p className="text-[0.94rem] text-[#564b43]">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-[7.5rem] bg-[#F4ECE3]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>Meet the Team</Eyebrow>
            <h2 className="mt-5 mb-14" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)', maxWidth:'30rem' }}>The people planning your day</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map(({ name, role, img }) => (
                <div key={name}>
                  <div className="rounded-[2px] mb-4" style={{ backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center top', aspectRatio:'3/4' }} />
                  <h4 style={{ fontFamily:"'Fraunces',serif", fontSize:'1.15rem' }}>{name}</h4>
                  <span className="text-[0.88rem] text-[#7a6f66]">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-[6rem] px-[6vw] text-center text-[#FBF7F2]" style={{ background:'linear-gradient(135deg,#6E2A35,rgba(219,92,92,0))' }}>
          <h2 className="text-[#FBF7F2] mb-4" style={{ fontSize:'clamp(2.1rem,4vw,3.2rem)', maxWidth:'32rem', margin:'0 auto 1.6rem' }}>Let's start planning your "I do."</h2>
          <p className="mb-8" style={{ color:'rgba(251,247,242,0.75)', maxWidth:'30rem', margin:'0 auto 2.2rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
          <Link to="/contact" className="inline-block bg-[#FBF7F2] text-[#6E2A35] px-8 py-4 text-[0.82rem] tracking-[0.1em] uppercase transition-colors hover:bg-[#B79257] hover:text-[#2B2420]">Book a Discovery Call</Link>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}
