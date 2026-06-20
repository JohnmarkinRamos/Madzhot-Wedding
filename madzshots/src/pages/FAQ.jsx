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
        <section className="py-[5rem]" style={{ borderBottom:'1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Eyebrow>Frequently Asked</Eyebrow>
              <h1 className="mt-4" style={{ fontSize:'clamp(2.6rem,5vw,4.4rem)', lineHeight:1.04 }}>Answers for couples planning with us.</h1>
            </div>
            <p className="max-w-[30rem] text-[#564b43]">Get clear guidance on timing, services, budgets, and the support you'll receive from day one to your wedding day.</p>
          </div>
        </section>

        <section className="py-[7.5rem]">
          <div className="max-w-[860px] mx-auto px-[6vw]">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-5 mb-10" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)' }}>Quick answers for your planning questions.</h2>
            <div style={{ borderTop:'1px solid rgba(43,36,32,0.14)' }}>
              {faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  className="cursor-pointer py-7"
                  style={{ borderBottom:'1px solid rgba(43,36,32,0.14)' }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 style={{ fontSize:'1.05rem', fontWeight:450 }}>{q}</h4>
                    <span
                      className="flex-shrink-0 text-[1.3rem] text-[#6E2A35] transition-transform duration-[250ms]"
                      style={{ fontFamily:"'Fraunces',serif", transform: open === i ? 'rotate(45deg)' : 'none' }}
                    >+</span>
                  </div>
                  <div className={`faq-answer ${open === i ? 'open' : ''}`}>
                    <p className="pt-4 text-[#564b43] text-[0.94rem]">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[5rem]" style={{ background:'#F4ECE3', borderTop:'1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-center justify-between gap-8 flex-wrap">
            <div>
              <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:'1.5rem' }}>Still have questions?</h3>
              <p className="mt-2 text-[#564b43]">We're happy to answer anything about planning your wedding.</p>
            </div>
            <div className="flex gap-8">
              <div>
                <h4 className="text-[0.78rem] uppercase tracking-[0.08em] text-[#7a6f66] mb-1">Email</h4>
                <p className="text-[0.9rem]">hello@madzshots.com</p>
              </div>
              <div>
                <h4 className="text-[0.78rem] uppercase tracking-[0.08em] text-[#7a6f66] mb-1">Phone</h4>
                <p className="text-[0.9rem]">+63 917 123 4567</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}
