import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { Magnetic } from '../components/Magnetic'

const C = { ivory:'#FBF7F2', blush:'#F7E9E4', rose:'#C98A93', roseDeep:'#9C5560', wine:'#6E2A35', gold:'#B79257', goldSoft:'#D9B26A', ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83' }
const display = "'Cormorant Garamond', serif"

const services = [
  {
    num:'01', title:'Full Wedding Planning',
    desc:'From budget and venue to vendors and timeline, we manage the entire journey from "yes" to "I do," so nothing falls through the cracks. This is the option for couples who want a true partner from day one — someone thinking about the wedding as often as you are.',
    items:['Budget planning & vendor negotiation','Venue sourcing & site visits','Full vendor team curation','Design direction & styling oversight','Monthly planning check-ins','Full timeline & day-of coordination included'],
    best:'Couples planning 9–18 months out who want one team handling everything, start to finish.',
    img:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    num:'02', title:'Day-of Coordination',
    desc:"You've planned it all — we make sure it runs without a hitch. Our team handles the timeline, vendors, and any surprises on the big day itself, so you and your families can simply be present.",
    items:['Final vendor confirmations (2 weeks out)','Detailed run-of-show timeline','On-site lead + assistant coordinator','Ceremony & reception management','Setup & teardown supervision','On-call problem solving, start to finish'],
    best:"Couples who've done their own planning and want a steady hand running the actual day.",
    img:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
  },
  {
    num:'03', title:'Styling & Design',
    desc:'Florals, palette, table styling, and ambiance — we design a look and feel that reflects who you are as a couple, down to the last detail. Whether you want soft and romantic or bold and modern, we build the visual world for your day.',
    items:['Mood boards & palette development','Floral design & sourcing','Table & ceremony styling','Rentals, linens & signage curation','On-site styling setup','Pairs well with either planning tier above'],
    best:"Couples with a clear venue and vendors already, who want a designer's eye on the visuals.",
    img:'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Services({ admin = false }) {
  return (
    <>
      <style>{`
        .svc-row{ display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; }
        @media (max-width:820px){ .svc-row{ grid-template-columns:1fr !important; gap:2rem; } .svc-img{ order:-1; } }
      `}</style>
      <Navbar admin={admin} />
      <main style={{ paddingTop:'5rem' }}>

        {/* Hero */}
        <section className="wash-blush paper" style={{ paddingTop:'5rem', paddingBottom:'4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
            <Reveal>
              <span className="eyebrow">Services</span>
              <h1 style={{ marginTop:'1.25rem', fontFamily:display, fontWeight:700, fontSize:'clamp(3rem,6.4vw,5.2rem)', lineHeight:1.0 }}>How we support <em className="grad-rose" style={{ fontStyle:'italic' }}>your day.</em></h1>
            </Reveal>
            <Reveal delay={0.1}><p style={{ maxWidth:'30rem', color:C.muted, fontSize:'1.05rem' }}>Three ways to work with us, depending on how much of the journey you'd like guided.</p></Reveal>
          </div>
        </section>

        {/* Service rows */}
        <div className="container">
          {services.map(({ num, title, desc, items, best, img }, idx) => (
            <section key={num} style={{ paddingTop:'5rem', paddingBottom:'5rem', borderBottom:'1px solid rgba(43,36,32,0.1)' }}>
              <Reveal>
                <div className="svc-row">
                  <div>
                    <span style={{ display:'block', marginBottom:'1rem', fontFamily:display, fontStyle:'italic', fontWeight:600, color:C.gold, fontSize:'2.6rem', lineHeight:1 }}>{num}</span>
                    <h2 style={{ marginBottom:'1rem', fontSize:'clamp(1.9rem,3.2vw,2.6rem)' }}>{title}</h2>
                    <p style={{ color:C.muted, marginBottom:'1.5rem' }}>{desc}</p>
                    <ul style={{ marginBottom:'1.5rem', listStyle:'none' }}>
                      {items.map(item => (
                        <li key={item} style={{ display:'flex', alignItems:'flex-start', gap:'0.75rem', fontSize:'0.98rem', color:C.muted, marginBottom:'0.55rem' }}>
                          <span style={{ width:'6px', height:'6px', borderRadius:'50%', flexShrink:0, background:C.rose, marginTop:'9px' }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p style={{ fontSize:'0.92rem', color:C.faint, marginBottom:'1.5rem' }}><strong style={{ color:C.wine }}>Best for:</strong> {best}</p>
                    {/* TODO: contact page */}
                    <Link to="/" style={{ fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', color:C.wine, borderBottom:`1px solid ${C.gold}`, paddingBottom:'0.15rem', fontWeight:500 }}>Inquire about this →</Link>
                  </div>
                  <div className={`svc-img media ${idx % 2 === 0 ? 'frame-arch' : 'frame'}`} style={{ aspectRatio:'4/5', boxShadow:'var(--shadow-md)' }}>
                    <div className="media-img" style={{ backgroundImage:`url(${img})` }} />
                  </div>
                </div>
              </Reveal>
            </section>
          ))}
        </div>

        {/* Mix & match */}
        <section className="section wash-blush paper">
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <span className="eyebrow">Not Sure Which Fits?</span>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'1rem', fontSize:'clamp(2.1rem,3.6vw,3rem)', maxWidth:'30rem' }}>Most couples mix and match</h2>
              <p style={{ maxWidth:'40rem', color:C.muted, fontSize:'1.05rem' }}>A lot of our couples combine Day-of Coordination with Styling & Design, or add Styling on top of Full Planning closer to the date. On your discovery call, we'll walk through your timeline and budget and recommend the right combination — no pressure to book more than you need.</p>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="paper" style={{ padding:'6rem 0', textAlign:'center', color:C.ivory, background:`linear-gradient(150deg, ${C.rose} 0%, ${C.wine} 75%, #4A1F2B 100%)` }}>
          <Reveal>
            <div className="container" style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ color:C.ivory, fontFamily:display, fontWeight:500, fontSize:'clamp(2.4rem,5vw,3.8rem)', maxWidth:'18ch', margin:'0 auto 1.25rem', lineHeight:1.05 }}>Let's find the <em style={{ fontStyle:'italic', color:C.goldSoft }}>right fit</em> for you.</h2>
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
