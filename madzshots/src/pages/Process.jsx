import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal, RevealGroup } from '../components/Reveal'
import { itemVariants } from '../lib/motion'
import { Magnetic } from '../components/Magnetic'

const C = { ivory:'#FBF7F2', blush:'#F7E9E4', rose:'#C98A93', roseDeep:'#9C5560', wine:'#6E2A35', gold:'#B79257', goldSoft:'#D9B26A', ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83' }
const display = "'Cormorant Garamond', serif"

const steps = [
  { num:'01', label:'Step One · Weeks 1–2', title:'Inquiry & Discovery', desc:"We start with a free discovery call — no obligation, just a conversation. We'll ask about your date, your venue (if you have one), your guest count, and what matters most to you as a couple. From there, we'll recommend which service tier fits, and send over a proposal with clear pricing.", img:'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80' },
  { num:'02', label:'Step Two · Months 1–6', title:'Design & Sourcing', desc:"This is where your wedding starts taking shape. We build out a mood board and design direction together, lock your venue if it isn't booked yet, and start curating a vendor shortlist — photographers, caterers, florists — matched to your taste and budget. You approve every vendor before we book.", img:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
  { num:'03', label:'Step Three · 4–6 Weeks Out', title:'Logistics & Timeline', desc:"The behind-the-scenes work ramps up. We build your minute-by-minute run-of-show, confirm every vendor's arrival time, finalize seating and floor plans, and walk the venue with you one more time. By the final two weeks, you shouldn't need to think about logistics at all — that's our job now.", img:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80' },
  { num:'04', label:'Step Four · The Big Day', title:'The Wedding Day', desc:"We arrive before anyone else and leave after everyone's gone. Our team manages vendor arrivals, styling setup, the ceremony, the reception flow, and any surprises that come up — quietly, so you never feel them. You get to actually be a guest at your own wedding.", img:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
]

export default function Process({ admin = false }) {
  return (
    <>
      <style>{`
        .pr-row{ display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
        @media (max-width:820px){ .pr-row{ grid-template-columns:1fr !important; gap:2rem; } .pr-img{ order:-1; } }
      `}</style>
      <Navbar admin={admin} />
      <main style={{ paddingTop:'5rem' }}>

        {/* Hero */}
        <section className="wash-blush paper" style={{ paddingTop:'5rem', paddingBottom:'4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
            <Reveal>
              <span className="eyebrow">Our Process</span>
              <h1 style={{ marginTop:'1.25rem', fontFamily:display, fontWeight:700, fontSize:'clamp(3rem,6.4vw,5.2rem)', lineHeight:1.0 }}>From inquiry to <em className="grad-rose" style={{ fontStyle:'italic' }}>"I do."</em></h1>
            </Reveal>
            <Reveal delay={0.1}><p style={{ maxWidth:'30rem', color:C.muted, fontSize:'1.05rem' }}>A clear, four-step path so you always know what's happening next — and what we need from you.</p></Reveal>
          </div>
        </section>

        {/* Timeline overview — cinematic plum */}
        <section className="section wash-plum paper" style={{ paddingTop:'5rem', paddingBottom:'5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'2.5rem' }}>
              {steps.map(({ num, label, title, desc }) => (
                <motion.div key={num} variants={itemVariants}>
                  <div style={{ width:'14px', height:'14px', borderRadius:'50%', marginBottom:'1.5rem', background:C.goldSoft, boxShadow:'0 0 0 6px rgba(217,178,106,0.18)' }} />
                  <small style={{ display:'block', color:C.goldSoft, fontSize:'0.76rem', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.5rem' }}>{label.split(' · ')[0]}</small>
                  <h4 style={{ color:C.ivory, marginBottom:'0.6rem', fontSize:'1.3rem' }}>{title}</h4>
                  <p style={{ fontSize:'0.94rem', color:'rgba(251,247,242,0.7)' }}>{desc.split('.')[0]}.</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Detail sections */}
        {steps.map(({ num, label, title, desc, img }, i) => (
          <section key={num} style={{ paddingTop:'5rem', paddingBottom:'5rem', background: i % 2 === 0 ? C.ivory : C.blush }}>
            <div className="container">
              <Reveal>
                <div className="pr-row">
                  <div>
                    <span style={{ display:'block', fontFamily:display, fontStyle:'italic', color:'rgba(110,42,53,0.18)', fontWeight:600, fontSize:'5rem', lineHeight:0.9, marginBottom:'0.5rem' }}>{num}</span>
                    <small style={{ display:'block', color:C.gold, fontSize:'0.76rem', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'0.75rem', fontWeight:600 }}>{label}</small>
                    <h3 style={{ marginBottom:'1rem', fontSize:'clamp(1.7rem,2.8vw,2.4rem)' }}>{title}</h3>
                    <p style={{ color:C.muted, fontSize:'1.02rem' }}>{desc}</p>
                  </div>
                  <div className={`pr-img media ${i % 2 === 0 ? 'frame' : 'frame-arch'}`} style={{ aspectRatio:'4/3', boxShadow:'var(--shadow-md)' }}>
                    <div className="media-img" style={{ backgroundImage:`url(${img})` }} />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="paper" style={{ padding:'6rem 0', textAlign:'center', color:C.ivory, background:`linear-gradient(150deg, ${C.rose} 0%, ${C.wine} 75%, #4A1F2B 100%)` }}>
          <Reveal>
            <div className="container" style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ color:C.ivory, fontFamily:display, fontWeight:500, fontSize:'clamp(2.4rem,5vw,3.8rem)', maxWidth:'18ch', margin:'0 auto 1.25rem', lineHeight:1.05 }}>Ready to start <em style={{ fontStyle:'italic', color:C.goldSoft }}>the first step?</em></h2>
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
