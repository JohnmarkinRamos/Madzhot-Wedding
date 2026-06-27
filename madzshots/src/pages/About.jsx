import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal, RevealGroup } from '../components/Reveal'
import { itemVariants } from '../lib/motion'
import { Magnetic } from '../components/Magnetic'
import { CountUp } from '../components/CountUp'

const C = { ivory:'#FBF7F2', blush:'#F7E9E4', rose:'#C98A93', roseDeep:'#9C5560', wine:'#6E2A35', gold:'#B79257', goldSoft:'#D9B26A', ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83' }
const display = "'Cormorant Garamond', serif"

const team = [
  { name:'Amara Cruz', role:'Founder & Lead Planner', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80' },
  { name:'Joaquin Reyes', role:'Day-of Coordination Lead', img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80' },
  { name:'Lia Fernandez', role:'Styling & Design Lead', img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80' },
]
const values = [
  { title:'Honesty first', desc:"Clear budgets, realistic timelines, and straight answers — even when it's not what you want to hear. You'll never be surprised by a vendor invoice or a missed detail." },
  { title:'Calm under pressure', desc:"Weather changes, vendors run late, plans shift — we've seen it all. Our job is to absorb the chaos quietly so you never feel it on your day." },
  { title:'Designed, not default', desc:"We don't reuse the same layout for every couple. Your colors, your traditions, your taste — every plan starts from a blank page." },
]

export default function About({ admin = false }) {
  return (
    <>
      <style>{`
        @media (max-width:820px){ .ab-story{ grid-template-columns:1fr !important; } }
        @media (max-width:460px){ .ab-vm{ grid-template-columns:1fr !important; } }
      `}</style>
      <Navbar admin={admin} />
      <main style={{ paddingTop:'5rem' }}>

        {/* Hero */}
        <section className="wash-blush paper" style={{ paddingTop:'5rem', paddingBottom:'4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
            <Reveal>
              <span className="eyebrow">About Us</span>
              <h1 style={{ marginTop:'1.25rem', fontFamily:display, fontWeight:700, fontSize:'clamp(3rem,6.4vw,5.2rem)', lineHeight:1.0 }}>The studio behind <em className="grad-rose" style={{ fontStyle:'italic' }}>the story.</em></h1>
            </Reveal>
            <Reveal delay={0.1}><p style={{ maxWidth:'30rem', color:C.muted, fontSize:'1.05rem' }}>We're a small team in Tarlac who believe a wedding day should feel like the couple, not like a checklist.</p></Reveal>
          </div>
        </section>

        {/* Story */}
        <section className="section" style={{ background:C.ivory }}>
          <div className="container" style={{ maxWidth:'1340px' }}>
            <div className="ab-story" style={{ display:'grid', gap:'4.5rem', alignItems:'center', gridTemplateColumns:'1.15fr 1fr' }}>
              <Reveal>
                <div className="frame-arch media" style={{ aspectRatio:'4/5', display:'flex', alignItems:'flex-end', padding:'2rem', boxShadow:'var(--shadow-md)' }}>
                  <div className="media-img" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80')" }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,rgba(62,34,48,0.05) 40%,rgba(62,34,48,0.7) 100%)' }} />
                  <span style={{ position:'relative', zIndex:1, color:C.ivory, fontFamily:display, fontStyle:'italic', fontSize:'1.5rem', lineHeight:1.3 }}>"Every wedding has a rhythm. Our job is to help you hear it."</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="eyebrow">Our Story</span>
                <h2 style={{ marginTop:'1.25rem', marginBottom:'1.25rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}>Planning rooted in heart, executed with precision.</h2>
                <p style={{ color:C.muted, marginBottom:'1rem', maxWidth:'38rem' }}>Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p style={{ color:C.muted, maxWidth:'38rem' }}>What started as one planner coordinating weekend weddings around Tarlac has grown into a full studio — but the way we work hasn't changed: close, hands-on, and personal to every couple we take on.</p>
                <div className="ab-vm" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginTop:'2.5rem' }}>
                  {[
                    { title:'Our Vision', text:"To be the studio couples trust to turn one of life's biggest days into a calm, joyful, unforgettable experience." },
                    { title:'Our Mission', text:'To plan and coordinate weddings with honesty, organization, and warmth — so every couple feels held, not handled.' },
                  ].map(({ title, text }) => (
                    <div key={title}>
                      <h4 style={{ fontSize:'0.95rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.5rem', color:C.wine, fontFamily:'var(--font-sans)', fontWeight:600 }}>{title}</h4>
                      <p style={{ fontSize:'0.96rem', color:C.muted }}>{text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Stats */}
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'2rem', marginTop:'5rem', paddingTop:'3rem', borderTop:'1px solid rgba(43,36,32,0.12)' }}>
              {[['150+','Weddings planned'],['8','Years in business'],['40+','Trusted vendor partners'],['98%',"Couples who'd refer us"]].map(([num,label]) => (
                <motion.div key={label} variants={itemVariants}>
                  <CountUp value={num} style={{ display:'block', fontFamily:display, fontWeight:600, fontSize:'2.6rem', lineHeight:1, marginBottom:'0.4rem', color:C.wine }} />
                  <span style={{ fontSize:'0.9rem', color:C.muted }}>{label}</span>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Values */}
        <section className="section wash-blush paper">
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <span className="eyebrow">What We Stand For</span>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'3.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)', maxWidth:'30rem' }}>The values behind every plan we build</h2>
            </Reveal>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'1.75rem' }}>
              {values.map(({ title, desc }) => (
                <motion.div key={title} variants={itemVariants} className="card" style={{ padding:'2.25rem 2rem' }}>
                  <h4 style={{ marginBottom:'0.75rem', fontSize:'1.4rem' }}>{title}</h4>
                  <p style={{ fontSize:'0.98rem', color:C.muted }}>{desc}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Team */}
        <section className="section" style={{ background:C.ivory }}>
          <div className="container">
            <Reveal>
              <span className="eyebrow">Meet the Team</span>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'3.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)', maxWidth:'30rem' }}>The people planning your day</h2>
            </Reveal>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'2rem' }}>
              {team.map(({ name, role, img }) => (
                <motion.div key={name} variants={itemVariants}>
                  <div className="frame-arch media" style={{ aspectRatio:'3/4', marginBottom:'1rem', boxShadow:'var(--shadow-sm)' }}>
                    <div className="media-img" style={{ backgroundImage:`url(${img})`, backgroundPosition:'center top' }} />
                  </div>
                  <h4 style={{ fontFamily:display, fontWeight:600, fontSize:'1.4rem' }}>{name}</h4>
                  <span style={{ fontSize:'0.9rem', color:C.faint }}>{role}</span>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* CTA */}
        <section className="paper" style={{ padding:'6rem 0', textAlign:'center', color:C.ivory, background:`linear-gradient(150deg, ${C.rose} 0%, ${C.wine} 75%, #4A1F2B 100%)` }}>
          <Reveal>
            <div className="container" style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ color:C.ivory, fontFamily:display, fontWeight:500, fontSize:'clamp(2.4rem,5vw,3.8rem)', maxWidth:'18ch', margin:'0 auto 1.25rem', lineHeight:1.05 }}>Let's start planning your <em style={{ fontStyle:'italic', color:C.goldSoft }}>"I do."</em></h2>
              <p style={{ color:'rgba(251,247,242,0.82)', maxWidth:'30rem', margin:'0 auto 2.25rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
              {/* TODO: contact page */}
              <Magnetic><Link to="/" className="btn btn-light">Book a Discovery Call</Link></Magnetic>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}
