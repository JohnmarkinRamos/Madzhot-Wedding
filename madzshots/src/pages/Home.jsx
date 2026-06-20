import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const heroImages = [
  'https://images.unsplash.com/photo-1519183071298-a2962be90b53?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80',
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
  { q:'Amara made our wedding feel effortless. We were able to actually enjoy our own day instead of running it — that\'s the best gift a planner can give.', name:'Aiza Fernandez', service:'Full Wedding Planning' },
  { q:'So organized and calm under pressure. When it started raining an hour before the ceremony, they had a backup plan ready before we even panicked.', name:'Bea & Carlo Santos', service:'Day-of Coordination' },
  { q:'The styling was beyond what we imagined. Every table, every flower felt like us. Guests are still talking about it months later.', name:'Mika Lopez', service:'Styling & Design' },
]

const faqs = [
  { q:'What wedding planning services do you offer?', a:'We offer full wedding planning, day-of coordination, and styling & design — and we can also build a custom package that blends elements of all three.' },
  { q:'Where is Madzshots Weddings located?', a:'Our studio is based in Concepcion, Tarlac, but we plan and coordinate weddings across Central Luzon and at destination venues upon request.' },
  { q:'Do you handle destination weddings?', a:'Yes! We regularly travel for destination weddings and can coordinate with local vendors at your chosen location.' },
  { q:'How do I book your team?', a:'Reach out through our contact form or social media to schedule a free discovery call — we\'ll talk through your date, vision, and the right package for you.' },
  { q:'What makes Madzshots different from other planners?', a:'We pair meticulous logistics with genuine storytelling — your wedding is planned like an event, but designed like a story only you could tell.' },
]

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

export default function Home({ admin = false }) {
  const [heroIdx, setHeroIdx] = useState(0)
  const [avIdx, setAvIdx] = useState(0)
  const [avFade, setAvFade] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  // Hero slideshow
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000)
    return () => clearInterval(t)
  }, [])

  // About carousel
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
      <Navbar admin={admin} />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ paddingTop: '11rem', paddingBottom: '5rem' }}>
          <div className="absolute inset-0 z-0" style={{ filter: 'brightness(0.82)' }}>
            {heroImages.map((src, i) => (
              <div
                key={src}
                className={`hero-slide ${i === heroIdx ? 'visible' : ''}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
          <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(circle at top left, rgba(255,255,255,0.15), transparent 28%)' }} />
          <div className="max-w-[1180px] mx-auto px-[6vw] relative z-10">
            <div>
              <Eyebrow>Tarlac, Philippines · Full-Service Wedding Studio</Eyebrow>
              <h1 className="mt-5" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', lineHeight: 1.04, color: '#FBF7F2' }}>
                Your story, <em style={{ fontStyle: 'italic', color: '#C98A93' }}>beautifully</em> tied together.
              </h1>
              <p className="mt-6 max-w-[30rem] text-[1.06rem]" style={{ color: 'rgba(251,247,242,0.85)' }}>
                We plan, design, and coordinate weddings that feel unmistakably yours — from the first toast to the last dance, every detail held with care.
              </p>
              <div className="mt-8 flex gap-4 flex-wrap">
                <a href="#contact" className="bg-[#6E2A35] text-[#FBF7F2] px-8 py-4 text-[0.82rem] tracking-[0.1em] uppercase transition-colors hover:bg-[#2B2420]">
                  Start Planning
                </a>
                <a href="#services" className="border border-[#FBF7F2] text-[#FBF7F2] px-8 py-4 text-[0.82rem] tracking-[0.1em] uppercase transition-all hover:bg-[#FBF7F2] hover:text-[#2B2420]">
                  See Our Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-[#F4ECE3] py-[7.5rem]" id="about">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <div className="grid gap-[4.5rem] items-start" style={{ gridTemplateColumns: 'clamp(200px, 0.85fr, 400px) 1fr' }}>
              {/* Carousel */}
              <div className="relative overflow-hidden rounded-[2px]" style={{ aspectRatio: '4/5', background: 'linear-gradient(165deg,#6E2A35,#4a1b22)' }}>
                <div
                  className="av-bg"
                  style={{ backgroundImage: `url(${avImages[avIdx]})`, opacity: avFade ? 0 : 1 }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(43,36,32,0.05) 35%, rgba(43,36,32,0.65) 100%)', zIndex: 1 }} />
                <button
                  onClick={() => avShow(avIdx - 1)}
                  className="absolute top-1/2 left-4 -translate-y-1/2 w-[42px] h-[42px] rounded-full flex items-center justify-center text-[1.4rem] cursor-pointer z-10 transition-all"
                  style={{ background: 'rgba(251,247,242,0.85)', fontFamily: "'Fraunces', serif", color: '#2B2420', border: 'none' }}
                  aria-label="Previous"
                >‹</button>
                <button
                  onClick={() => avShow(avIdx + 1)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 w-[42px] h-[42px] rounded-full flex items-center justify-center text-[1.4rem] cursor-pointer z-10 transition-all"
                  style={{ background: 'rgba(251,247,242,0.85)', fontFamily: "'Fraunces', serif", color: '#2B2420', border: 'none' }}
                  aria-label="Next"
                >›</button>
                <span className="absolute bottom-8 left-6 right-6 z-10 text-[#FBF7F2]" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.3 }}>
                  "Every wedding has a rhythm. Our job is to help you hear it."
                </span>
              </div>

              <div>
                <Eyebrow>About Us</Eyebrow>
                <h2 className="mt-5 mb-6" style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Planning rooted in heart, executed with precision.</h2>
                <p className="text-[#564b43] mb-4 max-w-[38rem]">Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p className="text-[#564b43] max-w-[38rem]">From quiet garden ceremonies to full-scale celebrations, our team handles the moving parts so you can stay present for the moments that matter.</p>
                <div className="grid grid-cols-2 gap-8 mt-10">
                  {[
                    { title: 'Our Vision', text: 'To be the studio couples trust to turn one of life\'s biggest days into a calm, joyful, unforgettable experience.' },
                    { title: 'Our Mission', text: 'To plan and coordinate weddings with honesty, organization, and warmth — so every couple feels held, not handled.' },
                  ].map(({ title, text }) => (
                    <div key={title}>
                      <h4 className="text-[0.95rem] uppercase tracking-[0.08em] mb-2 text-[#6E2A35]">{title}</h4>
                      <p className="text-[0.92rem] text-[#564b43]">{text}</p>
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
          className="py-[7.5rem] relative"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: 'cover', backgroundPosition: 'center 70%', backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(250,218,218,0.28), rgb(255,255,255))' }} />
          <div className="max-w-[1180px] mx-auto px-[6vw] relative z-10">
            <div className="flex justify-between items-end gap-8 mb-14 flex-wrap">
              <h2 style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)', maxWidth: '26rem' }}>How we support your day</h2>
              <p className="max-w-[22rem] text-[#564b43] text-[0.96rem]">Three ways to work with us, depending on how much of the journey you'd like guided.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ borderTop: '1px solid rgba(43,36,32,0.14)' }}>
              {[
                { num: '01', title: 'Full Wedding Planning', desc: 'From budget and venue to vendors and timeline, we manage the entire journey from "yes" to "I do," so nothing falls through the cracks.' },
                { num: '02', title: 'Day-of Coordination', desc: 'You\'ve planned it all — we make sure it runs without a hitch. Our team handles the timeline, vendors, and any surprises on the big day itself.' },
                { num: '03', title: 'Styling & Design', desc: 'Florals, palette, table styling, and ambiance — we design a look and feel that reflects who you are as a couple, down to the last detail.' },
              ].map(({ num, title, desc }, i) => (
                <div
                  key={num}
                  className="py-[2.6rem]"
                  style={{
                    paddingLeft: i > 0 ? '2.4rem' : '0',
                    paddingRight: i < 2 ? '2.4rem' : '0',
                    borderBottom: '1px solid rgba(43,36,32,0.14)',
                    borderRight: i < 2 ? '1px solid rgba(43,36,32,0.14)' : 'none',
                  }}
                >
                  <span className="block mb-6" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', color: '#B79257', fontSize: '1rem' }}>{num}</span>
                  <h3 className="mb-4" style={{ fontSize: '1.35rem' }}>{title}</h3>
                  <p className="text-[#564b43] text-[0.94rem] mb-6">{desc}</p>
                  <a href="#contact" className="text-[0.78rem] tracking-[0.08em] uppercase text-[#6E2A35] border-b border-[#6E2A35] pb-0.5">Inquire about this →</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS TIMELINE */}
        <section className="py-[7.5rem] bg-[#2B2420]" id="process">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow><span className="text-[#B79257]">Our Process</span></Eyebrow>
            <h2 className="mt-5 mb-14 text-[#FBF7F2]" style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>From inquiry to "I do."</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 relative">
              <div className="absolute left-0 right-0 top-[14px] h-px hidden md:block" style={{ background: 'rgba(251,247,242,0.25)' }} />
              {[
                { step: 'Step One', title: 'Inquiry & Discovery', desc: 'We get to know your story, your budget, and your vision over a relaxed consultation.' },
                { step: 'Step Two', title: 'Design & Sourcing', desc: 'We build your concept, lock your venue, and curate vendors who match your style.' },
                { step: 'Step Three', title: 'Logistics & Timeline', desc: 'Every detail gets mapped to the minute, so the day flows without a single worry.' },
                { step: 'Step Four', title: 'The Wedding Day', desc: 'We\'re on-site managing everything, so you can simply be present and celebrate.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="relative pr-6">
                  <div className="w-[14px] h-[14px] rounded-full mb-6" style={{ background: '#FBF7F2', border: '3px solid #2B2420', boxShadow: '0 0 0 1px rgba(251,247,242,0.5)' }} />
                  <small className="block text-[#B79257] text-[0.72rem] tracking-[0.1em] uppercase mb-2">{step}</small>
                  <h4 className="text-[#FBF7F2] mb-2" style={{ fontFamily: "'Fraunces', serif", fontWeight: 450, fontSize: '1.15rem' }}>{title}</h4>
                  <p className="text-[0.88rem] max-w-[15rem]" style={{ color: 'rgba(251,247,242,0.65)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-[7.5rem]" id="gallery">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="mt-5 mb-14" style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Real weddings, real couples</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[0.9rem]">
              {galleryCards.map(({ img, name, sub }) => (
                <div
                  key={name + sub}
                  className="rounded-[2px] relative overflow-hidden flex flex-col justify-end p-4 text-[#FBF7F2]"
                  style={{ aspectRatio: '4/5', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55))' }} />
                  <strong className="relative z-10 block" style={{ fontFamily: "'Fraunces', serif", fontWeight: 450, fontSize: '1.05rem' }}>{name}</strong>
                  <span className="relative z-10 text-[0.78rem] tracking-[0.04em]">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-[7.5rem] bg-[#F4ECE3]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>Kind Words</Eyebrow>
            <h2 className="mt-5" style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>From couples we've planned for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5rem] mt-14">
              {testimonials.map(({ q, name, service }) => (
                <div key={name} className="bg-[#FBF7F2] p-[2.4rem_2rem] relative" style={{ border: '1px solid rgba(43,36,32,0.14)' }}>
                  <div className="mb-4" style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '1.55rem', color: '#C98A93', lineHeight: 1 }}>"</div>
                  <p className="text-[0.96rem] text-[#4a3f38] mb-6">{q}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-full flex-shrink-0" style={{ background: '#8A9A7E' }} />
                    <div>
                      <h5 style={{ fontSize: '0.92rem', fontFamily: "'Fraunces', serif", fontWeight: 600 }}>{name}</h5>
                      <small className="text-[0.74rem] text-[#7a6f66]">{service}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-[7.5rem]" id="faq">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className="mt-5 mb-8" style={{ fontSize: 'clamp(2rem,3.4vw,2.8rem)' }}>Frequently asked questions</h2>
            <div style={{ borderTop: '1px solid rgba(43,36,32,0.14)' }}>
              {faqs.map(({ q, a }, i) => (
                <div
                  key={q}
                  className="cursor-pointer py-7"
                  style={{ borderBottom: '1px solid rgba(43,36,32,0.14)' }}
                  onClick={() => toggleFaq(i)}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 450 }}>{q}</h4>
                    <span
                      className="flex-shrink-0 text-[1.3rem] text-[#6E2A35] transition-transform duration-[250ms]"
                      style={{ fontFamily: "'Fraunces', serif", transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                    >+</span>
                  </div>
                  <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                    <p className="pt-4 text-[#564b43] text-[0.94rem] max-w-[42rem]">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / MAP */}
        <section
          id="contact"
          className="py-[6rem] px-[6vw] text-center text-[#FBF7F2]"
          style={{ background: 'linear-gradient(135deg,#6E2A35,rgba(219,92,92,0))' }}
        >
          <div className="max-w-[780px] mx-auto mt-8 rounded-[2px] overflow-hidden" style={{ border: '1px solid rgba(251,247,242,0.25)', boxShadow: '0 18px 40px -16px rgba(0,0,0,0.4)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.987996104505!2d120.65641289999999!3d15.3228875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396e9005ab0c10d%3A0x7b07b469e90ff3c8!2sMadzhots%20Studios!5e0!3m2!1sen!2sph!4v1781956867404!5m2!1sen!2sph"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Madzshots Weddings location"
              className="w-full block border-0"
              style={{ height: '340px' }}
            />
          </div>
        </section>
      </main>

      <Footer admin={admin} />
    </>
  )
}
