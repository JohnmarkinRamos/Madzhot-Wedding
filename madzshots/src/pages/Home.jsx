import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const heroCards = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
]

const avImages = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
]

const galleryCards = [
  { img:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80', name:'Aiza & Ramon', sub:'Garden Ceremony — Tarlac' },
  { img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', name:'Bea & Carlo', sub:'Reception Styling' },
  { img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', name:'Detail Story', sub:'Florals & Table Design' },
  { img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', name:'Mika & Joaquin', sub:'Beachfront Vows' },
  { img:'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80', name:'First Look', sub:'Quiet Moments' },
  { img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80', name:'Trisha & Noel', sub:'Full Coordination' },
  { img:'https://images.unsplash.com/photo-1519183071298-a2962be90b53?auto=format&fit=crop&w=900&q=80', name:'The Reception', sub:'Evening Celebration' },
  { img:'https://images.unsplash.com/photo-1525791864203-1e1d0f6bfc13?auto=format&fit=crop&w=900&q=80', name:'Nica & Paolo', sub:'Day-of Coordination' },
]

const testimonials = [
  { q:"Amara made our wedding feel effortless. We were able to actually enjoy our own day instead of running it — that's the best gift a planner can give.", name:'Aiza Fernandez', service:'Full Wedding Planning' },
  { q:"So organized and calm under pressure. When it started raining an hour before the ceremony, they had a backup plan ready before we even panicked.", name:'Bea & Carlo Santos', service:'Day-of Coordination' },
  { q:"The styling was beyond what we imagined. Every table, every flower felt like us. Guests are still talking about it months later.", name:'Mika Lopez', service:'Styling & Design' },
]

const faqs = [
  { q:'What wedding planning services do you offer?', a:'We offer full wedding planning, day-of coordination, and styling & design — and we can also build a custom package that blends elements of all three.' },
  { q:'Where is Madzshots Weddings located?', a:'Our studio is based in Concepcion, Tarlac, but we plan and coordinate weddings across Central Luzon and at destination venues upon request.' },
  { q:'Do you handle destination weddings?', a:'Yes! We regularly travel for destination weddings and can coordinate with local vendors at your chosen location.' },
  { q:'How do I book your team?', a:"Reach out through our contact form or social media to schedule a free discovery call — we'll talk through your date, vision, and the right package for you." },
  { q:'What makes Madzshots different from other planners?', a:'We pair meticulous logistics with genuine storytelling — your wedding is planned like an event, but designed like a story only you could tell.' },
]

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

export default function Home({ admin = false }) {
  const [avIdx, setAvIdx] = useState(0)
  const [avFade, setAvFade] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  function avShow(idx) {
    setAvFade(true)
    setTimeout(() => {
      setAvIdx((idx + avImages.length) % avImages.length)
      setAvFade(false)
    }, 220)
  }

  function toggleFaq(i) {
    setOpenFaq(openFaq === i ? null : i)
  }

  return (
    <>
      <style>{`
        .hero-card {
          border-radius: 6px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          box-shadow: 0 8px 32px rgba(43,36,32,0.13);
        }
      `}</style>

      <Navbar admin={admin} />

      <main>

        {/* ── HERO ── plain background, text left, cards right */}
        <section
          style={{
            background: '#FBF7F2',
            paddingTop: '9rem',
            paddingBottom: '6rem',
            paddingLeft: '6vw',
            paddingRight: '6vw',
          }}
        >
          <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

            {/* LEFT — text */}
            <div>
              <Eyebrow>Tarlac, Philippines · Full-Service Wedding Studio</Eyebrow>
              <h1 style={{ marginTop: '1.25rem', fontSize: 'clamp(2.6rem,4.5vw,4rem)', lineHeight: 1.06, color: '#2B2420' }}>
                Your story,{' '}
                <em style={{ fontStyle: 'italic', color: '#E8833A' }}>beautifully</em>{' '}
                tied together.
              </h1>
              <p style={{ marginTop: '1.5rem', maxWidth: '30rem', fontSize: '1.06rem', color: '#564b43', lineHeight: 1.7 }}>
                We plan, design, and coordinate weddings that feel unmistakably yours — from the first toast to the last dance, every detail held with care.
              </p>
              <div style={{ marginTop: '2.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="#contact"
                  style={{ background: '#E8833A', color: '#FFF8F0', padding: '1rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#3A2415'}
                  onMouseLeave={e => e.currentTarget.style.background='#E8833A'}
                >
                  Start Planning
                </a>
                <a
                  href="#services"
                  style={{ border: '1px solid #2B2420', color: '#2B2420', padding: '1rem 2rem', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='#2B2420'; e.currentTarget.style.color='#FBF7F2' }}
                  onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#2B2420' }}
                >
                  See Our Services
                </a>
              </div>

              {/* subtle stat row */}
              <div style={{ marginTop: '3rem', display: 'flex', gap: '2.5rem', borderTop: '1px solid rgba(43,36,32,0.12)', paddingTop: '2rem' }}>
                {[['150+', 'Weddings planned'], ['8 yrs', 'In the industry'], ['Tarlac', 'Based in PH']].map(([n, l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', color: '#2B2420', lineHeight: 1 }}>{n}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7a6f66', marginTop: '0.3rem', letterSpacing: '0.04em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — stacked photo cards */}
            <div style={{ position: 'relative', height: '520px' }}>
              {/* Card 1 — back left */}
              <div
                className="hero-card"
                style={{
                  position: 'absolute',
                  top: '40px',
                  left: '0',
                  width: '58%',
                  height: '340px',
                  backgroundImage: `url(${heroCards[2]})`,
                  transform: 'rotate(-3deg)',
                  zIndex: 1,
                }}
              />
              {/* Card 2 — back right */}
              <div
                className="hero-card"
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '0',
                  width: '55%',
                  height: '300px',
                  backgroundImage: `url(${heroCards[1]})`,
                  transform: 'rotate(2.5deg)',
                  zIndex: 2,
                }}
              />
              {/* Card 3 — front center */}
              <div
                className="hero-card"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '65%',
                  height: '360px',
                  backgroundImage: `url(${heroCards[0]})`,
                  zIndex: 3,
                  boxShadow: '0 20px 60px rgba(43,36,32,0.22)',
                }}
              />
              {/* floating label on front card */}
              <div style={{
                position: 'absolute',
                bottom: '28px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 4,
                background: 'rgba(43,36,32,0.82)',
                backdropFilter: 'blur(6px)',
                color: '#FBF7F2',
                padding: '0.55rem 1.1rem',
                borderRadius: '4px',
                whiteSpace: 'nowrap',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                fontFamily: "'Work Sans', sans-serif",
              }}>
                ✦ Real weddings, real stories
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-[#FCEEDD]" id="about" style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <div style={{ display: 'grid', gap: '4.5rem', alignItems: 'start', gridTemplateColumns: 'minmax(200px, 400px) 1fr' }}>
              {/* Carousel */}
              <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: '4/5', background: 'linear-gradient(165deg,#E8833A,#9C4A1A)' }}>
                <div
                  className="av-bg"
                  style={{ backgroundImage: `url(${avImages[avIdx]})`, opacity: avFade ? 0 : 1 }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,36,32,0.05) 35%, rgba(43,36,32,0.65) 100%)', zIndex: 1 }} />
                <button
                  onClick={() => avShow(avIdx - 1)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-[42px] h-[42px] rounded-full flex items-center justify-center text-[1.4rem] cursor-pointer z-10 transition-all"
                  style={{ background: 'rgba(255,248,240,0.85)', fontFamily: "'Fraunces', serif", color: '#3A2415', border: 'none' }}
                  aria-label="Previous"
                >‹</button>
                <button
                  onClick={() => avShow(avIdx + 1)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-[42px] h-[42px] rounded-full flex items-center justify-center text-[1.4rem] cursor-pointer z-10 transition-all"
                  style={{ background: 'rgba(255,248,240,0.85)', fontFamily: "'Fraunces', serif", color: '#3A2415', border: 'none' }}
                  aria-label="Next"
                >›</button>
                <span className="absolute bottom-8 left-6 right-6 z-10 text-[#FFF8F0]" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.3 }}>
                  "Every wedding has a rhythm. Our job is to help you hear it."
                </span>
              </div>

              <div>
                <Eyebrow>About Us</Eyebrow>
                <h2 style={{ marginTop: '1.25rem', marginBottom: '1.5rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Planning rooted in heart, executed with precision.</h2>
                <p style={{ color: '#564b43', marginBottom: '1rem', maxWidth: '38rem' }}>Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p style={{ color: '#564b43', maxWidth: '38rem' }}>From quiet garden ceremonies to full-scale celebrations, our team handles the moving parts so you can stay present for the moments that matter.</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem' }}>
                  {[
                    { title: 'Our Vision', text: "To be the studio couples trust to turn one of life's biggest days into a calm, joyful, unforgettable experience." },
                    { title: 'Our Mission', text: 'To plan and coordinate weddings with honesty, organization, and warmth — so every couple feels held, not handled.' },
                  ].map(({ title, text }) => (
                    <div key={title}>
                      <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', color: '#E8833A' }}>{title}</h4>
                      <p style={{ fontSize: '0.92rem', color: '#564b43' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="relative"
          style={{
            paddingTop: '7.5rem', paddingBottom: '7.5rem',
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover', backgroundPosition: 'center 70%', backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(252,222,184,0.32), rgb(255,255,255))' }} />
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw', position: 'relative', zIndex: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)', maxWidth: '26rem' }}>How we support your day</h2>
              <p style={{ maxWidth: '22rem', color: '#564b43', fontSize: '0.96rem' }}>Three ways to work with us, depending on how much of the journey you'd like guided.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(43,36,32,0.14)' }}>
              {[
                { num: '01', title: 'Full Wedding Planning', desc: 'From budget and venue to vendors and timeline, we manage the entire journey from "yes" to "I do," so nothing falls through the cracks.' },
                { num: '02', title: 'Day-of Coordination', desc: "You've planned it all — we make sure it runs without a hitch. Our team handles the timeline, vendors, and any surprises on the big day itself." },
                { num: '03', title: 'Styling & Design', desc: 'Florals, palette, table styling, and ambiance — we design a look and feel that reflects who you are as a couple, down to the last detail.' },
              ].map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  style={{
                    paddingTop: '2.6rem', paddingBottom: '2.6rem',
                    paddingLeft: i > 0 ? '2.4rem' : '0',
                    paddingRight: i < 2 ? '2.4rem' : '0',
                    borderBottom: '1px solid rgba(43,36,32,0.14)',
                    borderRight: i < 2 ? '1px solid rgba(43,36,32,0.14)' : 'none',
                  }}
                >
                  <span style={{ display: 'block', marginBottom: '1.5rem', fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#F0A868', fontSize: '1rem' }}>{num}</span>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.35rem' }}>{title}</h3>
                  <p style={{ color: '#564b43', fontSize: '0.94rem', marginBottom: '1.5rem' }}>{desc}</p>
                  <a href="#contact" style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#E8833A', borderBottom: '1px solid #E8833A', paddingBottom: '0.125rem' }}>Inquire about this →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem', background: '#3A2415' }} id="process">
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow><span style={{ color: '#F0A868' }}>Our Process</span></Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '3.5rem', color: '#FFF8F0', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>From inquiry to "I do."</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 relative" style={{ rowGap: '2.5rem' }}>
              <div className="absolute left-0 right-0 top-[14px] h-px hidden md:block" style={{ background: 'rgba(255,248,240,0.25)' }} />
              {[
                { step: 'Step One', title: 'Inquiry & Discovery', desc: 'We get to know your story, your budget, and your vision over a relaxed consultation.' },
                { step: 'Step Two', title: 'Design & Sourcing', desc: 'We build your concept, lock your venue, and curate vendors who match your style.' },
                { step: 'Step Three', title: 'Logistics & Timeline', desc: 'Every detail gets mapped to the minute, so the day flows without a single worry.' },
                { step: 'Step Four', title: 'The Wedding Day', desc: "We're on-site managing everything, so you can simply be present and celebrate." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="relative" style={{ paddingRight: '1.5rem' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '9999px', marginBottom: '1.5rem', background: '#FFF8F0', border: '3px solid #3A2415', boxShadow: '0 0 0 1px rgba(255,248,240,0.5)' }} />
                  <small style={{ display: 'block', color: '#F0A868', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{step}</small>
                  <h4 style={{ color: '#FFF8F0', marginBottom: '0.5rem', fontFamily: "'Fraunces', serif", fontWeight: 450, fontSize: '1.15rem' }}>{title}</h4>
                  <p style={{ fontSize: '0.88rem', maxWidth: '15rem', color: 'rgba(255,248,240,0.65)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }} id="gallery">
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>Portfolio</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '3.5rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Real weddings, real couples</h2>
            <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: '0.9rem' }}>
              {galleryCards.map(({ img, name, sub }) => (
                <div
                  key={name + sub}
                  className="relative overflow-hidden flex flex-col justify-end"
                  style={{ borderRadius: '2px', padding: '1rem', color: '#FFF8F0', aspectRatio: '4/5', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55))' }} />
                  <strong className="relative z-10 block" style={{ fontFamily: "'Fraunces', serif", fontWeight: 450, fontSize: '1.05rem' }}>{name}</strong>
                  <span className="relative z-10" style={{ fontSize: '0.78rem', letterSpacing: '0.04em' }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem', background: '#FCEEDD' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>Kind Words</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>From couples we've planned for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '2.5rem', marginTop: '3.5rem' }}>
              {testimonials.map(({ q, name, service }) => (
                <div key={name} className="relative" style={{ background: '#FFF8F0', padding: '2.4rem 2rem', border: '1px solid rgba(43,36,32,0.14)' }}>
                  <div style={{ marginBottom: '1rem', fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '1.55rem', color: '#F4A95C', lineHeight: 1 }}>"</div>
                  <p style={{ fontSize: '0.96rem', color: '#4a3f38', marginBottom: '1.5rem' }}>{q}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '9999px', flexShrink: 0, background: '#F0A868' }} />
                    <div>
                      <h5 style={{ fontSize: '0.92rem', fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{name}</h5>
                      <small style={{ fontSize: '0.74rem', color: '#7a6f66' }}>{service}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ paddingTop: '7.5rem', paddingBottom: '7.5rem' }} id="faq">
          <div style={{ maxWidth: '1180px', margin: '0 auto', paddingLeft: '6vw', paddingRight: '6vw' }}>
            <Eyebrow>Good to Know</Eyebrow>
            <h2 style={{ marginTop: '1.25rem', marginBottom: '2rem', fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Frequently asked questions</h2>
            <div style={{ borderTop: '1px solid rgba(43,36,32,0.14)' }}>
              {faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  className="cursor-pointer"
                  style={{ paddingTop: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid rgba(43,36,32,0.14)' }}
                  onClick={() => toggleFaq(i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 450 }}>{q}</h4>
                    <span
                      className="flex-shrink-0 transition-transform duration-[250ms]"
                      style={{ fontSize: '1.3rem', color: '#E8833A', fontFamily: "'Fraunces', serif", transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                    >+</span>
                  </div>
                  <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                    <p style={{ paddingTop: '1rem', color: '#564b43', fontSize: '0.94rem', maxWidth: '42rem' }}>{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / MAP */}
        <section
          id="contact"
          className="text-center"
          style={{ paddingTop: '6rem', paddingBottom: '6rem', paddingLeft: '6vw', paddingRight: '6vw', color: '#FFF8F0', background: 'linear-gradient(135deg,#E8833A,rgba(232,131,58,0))' }}
        >
          <div style={{ maxWidth: '780px', margin: '2rem auto 0', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,248,240,0.25)', boxShadow: '0 18px 40px -16px rgba(0,0,0,0.4)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.987996104505!2d120.65641289999999!3d15.3228875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396e9005ab0c10d%3A0x7b07b469e90ff3c8!2sMadzhots%20Studios!5e0!3m2!1sen!2sph!4v1781956867404!5m2!1sen!2sph"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Madzshots Weddings location"
              style={{ width: '100%', display: 'block', border: 0, height: '340px' }}
            />
          </div>
        </section>

      </main>

      <Footer admin={admin} />
    </>
  )
}