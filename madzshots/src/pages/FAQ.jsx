import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal } from '../components/Reveal'

const C = { ivory:'#FBF7F2', blush:'#F7E9E4', rose:'#C98A93', roseDeep:'#9C5560', wine:'#6E2A35', gold:'#B79257', ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83' }
const display = "'Cormorant Garamond', serif"

const faqs = [
  { q:'How far in advance should we book?', a:'We recommend securing your planner 9–12 months before your wedding to ensure availability and enough planning time.' },
  { q:'Can you help with vendor selection?', a:'Yes. We recommend trusted venues, florists, caterers, and stationery partners that align with your style and budget.' },
  { q:'What does day-of coordination include?', a:'On the wedding day we handle setup, vendor communication, timeline execution, and any last-minute adjustments so you can be fully present.' },
  { q:'Do you offer custom packages?', a:'Absolutely. We tailor packages based on your guest count, wedding style, and level of planning support needed.' },
  { q:'Do you handle destination weddings?', a:'Yes! We regularly travel for destination weddings and can coordinate with local vendors at your chosen location.' },
  { q:'What is your payment structure?', a:'We typically require a 30% retainer to secure your date, with the balance split across milestones leading up to the wedding day.' },
  { q:"What if we don't have a venue yet?", a:"No problem — venue sourcing is actually one of our specialties. We'll help you find and book the right space for your vision and guest count." },
]

export default function FAQ({ admin = false }) {
  const [open, setOpen] = useState(null)

  return (
    <>
      <style>{`
        .faq-contact{ display:flex; align-items:center; justify-content:space-between; gap:2rem; flex-wrap:wrap; }
      `}</style>
      <Navbar admin={admin} />
      <main style={{ paddingTop:'5rem' }}>

        {/* Hero */}
        <section className="wash-blush paper" style={{ paddingTop:'5rem', paddingBottom:'4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'2rem', flexWrap:'wrap' }}>
            <Reveal>
              <span className="eyebrow">Frequently Asked</span>
              <h1 style={{ marginTop:'1.25rem', fontFamily:display, fontWeight:700, fontSize:'clamp(3rem,6.4vw,5.2rem)', lineHeight:1.0, maxWidth:'16ch' }}>Answers for couples <em className="grad-rose" style={{ fontStyle:'italic' }}>planning with us.</em></h1>
            </Reveal>
            <Reveal delay={0.1}><p style={{ maxWidth:'30rem', color:C.muted, fontSize:'1.05rem' }}>Clear guidance on timing, services, budgets, and the support you'll receive from day one to your wedding day.</p></Reveal>
          </div>
        </section>

        {/* FAQ list */}
        <section className="section" style={{ background:C.ivory }}>
          <div className="container" style={{ maxWidth:'860px' }}>
            <Reveal>
              <span className="eyebrow">FAQ</span>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'2.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}>Quick answers for your planning questions.</h2>
            </Reveal>
            <div style={{ borderTop:'1px solid rgba(43,36,32,0.12)' }}>
              {faqs.map(({ q, a }, i) => (
                <Reveal key={q} y={12}>
                  <div onClick={() => setOpen(open === i ? null : i)} style={{ padding:'1.6rem 0', borderBottom:'1px solid rgba(43,36,32,0.12)', cursor:'pointer' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem' }}>
                      <h4 style={{ fontSize:'1.15rem', fontWeight:500 }}>{q}</h4>
                      <span style={{ fontSize:'1.5rem', color:C.wine, fontFamily:"'Fraunces',serif", transition:'transform 0.25s var(--ease-soft)', transform: open === i ? 'rotate(45deg)' : 'none', flexShrink:0 }}>+</span>
                    </div>
                    <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                      <p style={{ paddingTop:'1rem', color:C.muted, fontSize:'1rem', maxWidth:'46rem' }}>{a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="wash-blush paper" style={{ paddingTop:'4.5rem', paddingBottom:'4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <div className="faq-contact">
                <div>
                  <h3 style={{ fontFamily:display, fontWeight:600, fontSize:'2rem' }}>Still have questions?</h3>
                  <p style={{ marginTop:'0.5rem', color:C.muted }}>We're happy to answer anything about planning your wedding.</p>
                </div>
                <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
                  <div>
                    <h4 style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.gold, marginBottom:'0.3rem', fontWeight:600 }}>Email</h4>
                    <a href="mailto:hello@madzshots.com" style={{ fontSize:'0.98rem', color:C.ink }}>hello@madzshots.com</a>
                  </div>
                  <div>
                    <h4 style={{ fontSize:'0.78rem', textTransform:'uppercase', letterSpacing:'0.08em', color:C.gold, marginBottom:'0.3rem', fontWeight:600 }}>Phone</h4>
                    <a href="tel:+639171234567" style={{ fontSize:'0.98rem', color:C.ink }}>+63 917 123 4567</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}
