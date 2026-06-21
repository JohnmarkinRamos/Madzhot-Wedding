import { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

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
      <Navbar admin={admin} />
      <main style={{ paddingTop: '5rem' }}>
        {/* Hero */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>Frequently Asked</Eyebrow>
              <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>Answers for couples planning with us.</h1>
            </div>
            <p style={{ maxWidth: '30rem', color: '#564b43' }}>Get clear guidance on timing, services, budgets, and the support you'll receive from day one to your wedding day.</p>
          </div>
        </section>

        {/* FAQ list */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>FAQ</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '2.5rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Quick answers for your planning questions.</h2>
            <div style={{ borderTop: '1px solid rgba(43,36,32,0.14)' }}>
              {faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  style={{ paddingTop: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(43,36,32,0.14)', cursor: 'pointer' }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 450 }}>{q}</h4>
                    <span
                      className="flex-shrink-0 transition-transform duration-[250ms]"
                      style={{ fontSize: '1.3rem', color: '#6E2A35', fontFamily: "'Fraunces',serif", transform: open === i ? 'rotate(45deg)' : 'none' }}
                    >+</span>
                  </div>
                  <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                    <p style={{ paddingTop: '1rem', color: '#564b43', fontSize: '0.94rem' }}>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', background: '#F4ECE3', borderTop: '1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: '1.5rem' }}>Still have questions?</h3>
              <p style={{ marginTop: '0.5rem', color: '#564b43' }}>We're happy to answer anything about planning your wedding.</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7a6f66', marginBottom: '0.25rem' }}>Email</h4>
                <p style={{ fontSize: '0.9rem' }}>hello@madzshots.com</p>
              </div>
              <div>
                <h4 style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7a6f66', marginBottom: '0.25rem' }}>Phone</h4>
                <p style={{ fontSize: '0.9rem' }}>+63 917 123 4567</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}