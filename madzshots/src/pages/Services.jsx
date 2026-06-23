import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

const services = [
  {
    num: '01', title: 'Full Wedding Planning',
    desc: 'From budget and venue to vendors and timeline, we manage the entire journey from "yes" to "I do," so nothing falls through the cracks. This is the option for couples who want a true partner from day one — someone thinking about the wedding as often as you are.',
    items: ['Budget planning & vendor negotiation','Venue sourcing & site visits','Full vendor team curation','Design direction & styling oversight','Monthly planning check-ins','Full timeline & day-of coordination included'],
    best: 'Couples planning 9–18 months out who want one team handling everything, start to finish.',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '02', title: 'Day-of Coordination',
    desc: "You've planned it all — we make sure it runs without a hitch. Our team handles the timeline, vendors, and any surprises on the big day itself, so you and your families can simply be present.",
    items: ['Final vendor confirmations (2 weeks out)','Detailed run-of-show timeline','On-site lead + assistant coordinator','Ceremony & reception management','Setup & teardown supervision','On-call problem solving, start to finish'],
    best: "Couples who've done their own planning and want a steady hand running the actual day.",
    img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
  },
  {
    num: '03', title: 'Styling & Design',
    desc: 'Florals, palette, table styling, and ambiance — we design a look and feel that reflects who you are as a couple, down to the last detail. Whether you want soft and romantic or bold and modern, we build the visual world for your day.',
    items: ['Mood boards & palette development','Floral design & sourcing','Table & ceremony styling','Rentals, linens & signage curation','On-site styling setup','Pairs well with either planning tier above'],
    best: 'Couples with a clear venue and vendors already, who want a designer\'s eye on the visuals.',
    img: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&w=900&q=80',
  },
]

export default function Services({ admin = false }) {
  return (
    <>
      <Navbar admin={admin} />
      <main style={{ paddingTop: '5rem' }}>
        {/* Hero */}
        <section style={{ paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <Eyebrow>Services</Eyebrow>
              <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>How we support your day</h1>
            </div>
            <p style={{ maxWidth: '30rem', color: '#564b43' }}>Three ways to work with us, depending on how much of the journey you'd like guided.</p>
          </div>
        </section>

        {/* Service list */}
        <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
          {services.map(({ num, title, desc, items, best, img }) => (
            <div key={num} style={{ paddingTop: '5rem', paddingBottom: '5rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>
                <div>
                  <span style={{ display: 'block', marginBottom: '1rem', fontFamily: "'Fraunces',serif", fontStyle: 'italic', color: '#F0A868', fontSize: '2.4rem', lineHeight: 1 }}>{num}</span>
                  <h2 style={{ marginBottom: '1rem', fontSize: 'clamp(1.8rem,3vw,2.4rem)' }}>{title}</h2>
                  <p style={{ color: '#564b43', marginBottom: '1.5rem' }}>{desc}</p>
                  <ul style={{ marginBottom: '1.5rem' }}>
                    {items.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.94rem', color: '#564b43', marginBottom: '0.5rem' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '9999px', flexShrink: 0, background: '#F0A868', marginTop: '8px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p style={{ fontSize: '0.88rem', color: '#7a6f66', marginBottom: '1.5rem' }}><strong style={{ color: '#3A2415' }}>Best for:</strong> {best}</p>
                  <Link to="/contact" style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E8833A', borderBottom: '1px solid #E8833A', paddingBottom: '0.125rem' }}>Inquire about this →</Link>
                </div>
                <div style={{ borderRadius: '2px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', aspectRatio: '4/3' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Mix & match */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem', background: '#FCEEDD' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>Not Sure Which Fits?</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '1rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)', maxWidth: '30rem' }}>Most couples mix and match</h2>
            <p style={{ maxWidth: '36rem', color: '#564b43' }}>A lot of our couples combine Day-of Coordination with Styling & Design, or add Styling on top of Full Planning closer to the date. On your discovery call, we'll walk through your timeline and budget and recommend the right combination — no pressure to book more than you need.</p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '6vw', paddingRight: '6vw', textAlign: 'center', background: 'linear-gradient(135deg,#E8833A,rgba(232,131,58,0))' }}>
          <h2 style={{ color: '#FFF8F0', fontSize: 'clamp(2.1rem,4vw,3.2rem)', maxWidth: '32rem', margin: '0 auto 1.6rem' }}>Let's find the right fit for you.</h2>
          <p style={{ color: 'rgba(255,248,240,0.75)', maxWidth: '30rem', margin: '0 auto 2.2rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
          <Link to="/contact" className="inline-block transition-colors hover:bg-[#F0A868] hover:text-[#3A2415]" style={{ background: '#FFF8F0', color: '#E8833A', padding: '1rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Book a Discovery Call</Link>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}