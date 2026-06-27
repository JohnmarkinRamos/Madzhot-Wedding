import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal, RevealGroup } from '../components/Reveal'
import { itemVariants } from '../lib/motion'
import { Magnetic } from '../components/Magnetic'
import { CountUp } from '../components/CountUp'
import { Ribbon } from '../components/Ribbon'
import { Petals } from '../components/Petals'
import { Tilt } from '../components/Tilt'
import { BlurImage } from '../components/BlurImage'
import { WordReveal } from '../components/WordReveal'
import { TestimonialSlider } from '../components/TestimonialSlider'
import { MaskWords } from '../components/MaskWords'

const C = {
  ivory:'#FBF7F2', blush:'#F7E9E4', blushDeep:'#EFD9D2',
  rose:'#C98A93', roseDeep:'#9C5560',
  wine:'#6E2A35', gold:'#B79257', goldSoft:'#D9B26A', sage:'#8A9A7E',
  aubergine:'#3E2230', deepwine:'#4A1F2B', espresso:'#2A1A22',
  ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83',
}
const display = "'Cormorant Garamond', serif"
const serif   = "'Fraunces', serif"

const heroImgs = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1900&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1900&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1900&q=80',
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
  { img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', name:'Florals & Detail', sub:'Table Design' },
  { img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', name:'Mika & Joaquin', sub:'Beachfront Vows' },
  { img:'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80', name:'First Look', sub:'Quiet Moments' },
  { img:'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80', name:'Trisha & Noel', sub:'Full Coordination' },
  { img:'https://images.unsplash.com/photo-1519183071298-a2962be90b53?auto=format&fit=crop&w=900&q=80', name:'The Reception', sub:'Evening Celebration' },
  { img:'https://images.unsplash.com/photo-1525791864203-1e1d0f6bfc13?auto=format&fit=crop&w=900&q=80', name:'Nica & Paolo', sub:'Day-of Coordination' },
]

const services = [
  { num:'01', title:'Full Wedding Planning', desc:'From budget and venue to vendors and timeline, we manage the entire journey from "yes" to "I do," so nothing falls through the cracks.' },
  { num:'02', title:'Day-of Coordination', desc:"You've planned it all — we make sure it runs without a hitch. Our team handles the timeline, vendors, and any surprises on the big day itself." },
  { num:'03', title:'Styling & Design', desc:'Florals, palette, table styling, and ambiance — we design a look and feel that reflects who you are as a couple, down to the last detail.' },
]

const steps = [
  { step:'Step One',   title:'Inquiry & Discovery', desc:'We get to know your story, your budget, and your vision over a relaxed consultation.' },
  { step:'Step Two',   title:'Design & Sourcing',   desc:'We build your concept, lock your venue, and curate vendors who match your style.' },
  { step:'Step Three', title:'Logistics & Timeline',desc:'Every detail gets mapped to the minute, so the day flows without a single worry.' },
  { step:'Step Four',  title:'The Wedding Day',      desc:"We're on-site managing everything, so you can simply be present and celebrate." },
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

function Eyebrow({ children, dark }) {
  return <span className={`eyebrow${dark ? ' on-dark' : ''}`}>{children}</span>
}

export default function Home({ admin = false }) {
  const [avIdx, setAvIdx] = useState(0)
  const [avFade, setAvFade] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % heroImgs.length), 5000)
    return () => clearInterval(id)
  }, [])

  // hero parallax
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])

  function avShow(idx) {
    setAvFade(true)
    setTimeout(() => {
      setAvIdx((idx + avImages.length) % avImages.length)
      setAvFade(false)
    }, 220)
  }
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i)

  return (
    <>
      <style>{`
        @keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.12); } }
        .kenburns { animation: kenburns 7s ease-out forwards; }
        .media .swap { opacity: 0; transition: opacity 0.7s ease; }
        .media:hover .swap { opacity: 1; }
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 460px) {
          .vm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Navbar admin={admin} />

      <main>

        {/* ── HERO — full-bleed cinematic ── */}
        <section ref={heroRef} style={{ position:'relative', minHeight:'94vh', overflow:'hidden', display:'flex', alignItems:'flex-end', paddingTop:'7.5rem' }}>
          {/* crossfading slideshow with ken-burns + scroll parallax */}
          <motion.div aria-hidden style={{ position:'absolute', inset:'-2%', y: heroY, scale: heroScale }}>
            <AnimatePresence>
              <motion.div
                key={slide}
                className="kenburns"
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                transition={{ duration:1.5, ease:'easeInOut' }}
                style={{ position:'absolute', inset:0, backgroundImage:`url(${heroImgs[slide]})`, backgroundSize:'cover', backgroundPosition:'center' }}
              />
            </AnimatePresence>
          </motion.div>
          {/* warm plum legibility wash */}
          <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg, rgba(42,26,34,0.30) 0%, rgba(42,26,34,0.05) 35%, rgba(62,34,48,0.55) 78%, rgba(42,26,34,0.85) 100%)` }} />
          <div style={{ position:'absolute', inset:0, background:`linear-gradient(90deg, rgba(42,26,34,0.58), rgba(42,26,34,0) 60%)` }} />
          <Petals count={6} />

          <div className="container" style={{ position:'relative', zIndex:2, paddingBottom:'5.5rem', width:'100%' }}>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}>
              <Eyebrow dark>Tarlac, Philippines · Full-Service Wedding Studio</Eyebrow>
            </motion.div>
            <h1 style={{ fontFamily:display, fontWeight:700, color:C.ivory, fontSize:'clamp(3.2rem, 8vw, 6.6rem)', lineHeight:1.05, marginTop:'1.5rem', maxWidth:'15ch', letterSpacing:'0.3px', textShadow:'0 2px 24px rgba(42,26,34,0.45)' }}>
              <MaskWords delay={0.25} words={[
                { text:'Your' }, { text:'story,' },
                { text:'beautifully', className:'shimmer-gold', style:{ fontStyle:'italic' } },
                { text:'tied' }, { text:'together.' },
              ]} />
            </h1>
            <motion.p
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.25, ease:[0.22,1,0.36,1] }}
              style={{ marginTop:'1.75rem', maxWidth:'34rem', fontSize:'1.14rem', color:'rgba(251,247,242,0.88)', lineHeight:1.7 }}
            >
              We plan, design, and coordinate weddings that feel unmistakably yours — from the first toast to the last dance, every detail held with care.
            </motion.p>
            <motion.div
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.4, ease:[0.22,1,0.36,1] }}
              style={{ marginTop:'2.5rem', display:'flex', gap:'1rem', flexWrap:'wrap' }}
            >
              <Magnetic><a href="#contact" className="btn btn-light">Start Planning</a></Magnetic>
              <a href="#services" className="btn" style={{ color:C.ivory, border:`1px solid rgba(251,247,242,0.55)` }}
                onMouseEnter={e => { e.currentTarget.style.background=C.ivory; e.currentTarget.style.color=C.wine }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=C.ivory }}
              >See Our Services</a>
            </motion.div>
          </div>
        </section>

        <section className="wash-blush paper" style={{ padding:'2.4rem 0' }}>
          <RevealGroup className="container" style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'3.5rem', position:'relative', zIndex:1 }}>
            {[['150+','Weddings planned'],['8 yrs','In the industry'],['40+','Vendor partners'],['Tarlac','Based in PH']].map(([n,l]) => (
              <motion.div key={l} variants={itemVariants} style={{ textAlign:'center' }}>
                <CountUp value={n} style={{ fontFamily:display, fontWeight:600, fontSize:'2.4rem', color:C.wine, lineHeight:1, display:'block' }} />
                <div style={{ fontSize:'0.82rem', color:C.muted, marginTop:'0.4rem', letterSpacing:'0.04em' }}>{l}</div>
              </motion.div>
            ))}
          </RevealGroup>
        </section>

        {/* ── ABOUT ── */}
        <section className="section wash-blush paper" id="about">
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <div style={{ display:'grid', gap:'4.5rem', alignItems:'center', gridTemplateColumns:'minmax(220px, 420px) 1fr' }} className="about-grid">
              {/* arch-framed carousel */}
              <Reveal>
                <div className="frame-arch media" style={{ aspectRatio:'4/5', boxShadow:'var(--shadow-md)' }}>
                  <div className="media-img" style={{ backgroundImage:`url(${avImages[avIdx]})`, opacity: avFade ? 0 : 1, transition:'opacity 0.25s ease, transform 0.9s var(--ease-soft)' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(62,34,48,0.05) 40%, rgba(62,34,48,0.7) 100%)' }} />
                  <button onClick={() => avShow(avIdx - 1)} aria-label="Previous" style={navBtn('left')}>‹</button>
                  <button onClick={() => avShow(avIdx + 1)} aria-label="Next" style={navBtn('right')}>›</button>
                  <span style={{ position:'absolute', bottom:'2rem', left:'1.5rem', right:'1.5rem', color:C.ivory, fontFamily:serif, fontStyle:'italic', fontSize:'1.3rem', lineHeight:1.35 }}>
                    "Every wedding has a rhythm. Our job is to help you hear it."
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <Eyebrow>About Us</Eyebrow>
                <h2 style={{ marginTop:'1.25rem', marginBottom:'1.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}><WordReveal text="Planning rooted in heart, executed with precision." /></h2>
                <p style={{ color:C.muted, marginBottom:'1rem', maxWidth:'38rem' }}>Madzshots Weddings & Events began with a simple belief: a wedding day should feel like the couple, not like a checklist. We bring together logistics and storytelling, so every detail — the seating chart, the first look, the reception flow — speaks in your voice.</p>
                <p style={{ color:C.muted, maxWidth:'38rem' }}>From quiet garden ceremonies to full-scale celebrations, our team handles the moving parts so you can stay present for the moments that matter.</p>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginTop:'2.5rem' }} className="vm-grid">
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
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="section" id="services" style={{ background:C.ivory }}>
          <div className="container">
            <Reveal>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:'2rem', marginBottom:'3.5rem', flexWrap:'wrap' }}>
                <div>
                  <Eyebrow>What We Offer</Eyebrow>
                  <h2 style={{ marginTop:'1.25rem', fontSize:'clamp(2.1rem,3.6vw,3rem)', maxWidth:'26rem' }}><WordReveal text="How we support your day" /></h2>
                </div>
                <p style={{ maxWidth:'22rem', color:C.muted }}>Three ways to work with us, depending on how much of the journey you'd like guided.</p>
              </div>
            </Reveal>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1.5rem' }}>
              {services.map(({ num, title, desc }) => (
                <motion.div key={num} variants={itemVariants}>
                  <Tilt className="card paper" style={{ padding:'2.5rem 2rem' }}>
                    <span style={{ fontFamily:display, fontStyle:'italic', fontWeight:600, color:C.gold, fontSize:'2rem', position:'relative', zIndex:1 }}>{num}</span>
                    <h3 style={{ margin:'1rem 0', fontSize:'1.5rem', position:'relative', zIndex:1 }}>{title}</h3>
                    <p style={{ color:C.muted, fontSize:'0.98rem', marginBottom:'1.5rem', position:'relative', zIndex:1 }}>{desc}</p>
                    <a href="#contact" style={{ fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', color:C.wine, borderBottom:`1px solid ${C.gold}`, paddingBottom:'0.15rem', position:'relative', zIndex:1, fontWeight:500 }}>Inquire about this →</a>
                  </Tilt>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── PROCESS — cinematic plum ── */}
        <section className="section wash-plum paper" id="process">
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <Eyebrow dark>Our Process</Eyebrow>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'3.5rem', color:C.ivory, fontSize:'clamp(2.1rem,3.6vw,3rem)' }}>From inquiry to <em style={{ fontStyle:'italic', color:C.goldSoft, fontFamily:display }}>"I do."</em></h2>
            </Reveal>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'2.5rem', position:'relative' }}>
              {steps.map(({ step, title, desc }) => (
                <motion.div key={step} variants={itemVariants} style={{ paddingRight:'1rem' }}>
                  <div style={{ width:'14px', height:'14px', borderRadius:'50%', marginBottom:'1.5rem', background:C.goldSoft, boxShadow:`0 0 0 6px rgba(217,178,106,0.18)` }} />
                  <small style={{ display:'block', color:C.goldSoft, fontSize:'0.76rem', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.5rem' }}>{step}</small>
                  <h4 style={{ color:C.ivory, marginBottom:'0.6rem', fontSize:'1.3rem' }}>{title}</h4>
                  <p style={{ fontSize:'0.94rem', color:'rgba(251,247,242,0.7)' }}>{desc}</p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── GALLERY — mixed arch + rounded ── */}
        <section className="section" id="gallery" style={{ background:C.ivory }}>
          <div className="container">
            <Reveal>
              <Eyebrow>Portfolio</Eyebrow>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'3.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}><WordReveal text="Real weddings, real couples" /></h2>
            </Reveal>
            <RevealGroup style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'1.4rem' }} stagger={0.08}>
              {galleryCards.map(({ img, name, sub }, i) => {
                const hoverImg = galleryCards[(i + 1) % galleryCards.length].img
                return (
                  <motion.div key={name + sub} variants={itemVariants}>
                    <Tilt className={`media ${i % 4 === 0 || i % 4 === 3 ? 'frame-arch' : 'frame'}`}
                      style={{ aspectRatio:'4/5', boxShadow:'var(--shadow-sm)', cursor:'pointer', height:'100%' }}>
                      <div className="media-img"><BlurImage src={img} alt={name} /></div>
                      <div className="media-img swap"><BlurImage src={hoverImg} alt="" /></div>
                      <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(42,26,34,0) 42%, rgba(42,26,34,0.72))' }} />
                      <div style={{ position:'absolute', left:'1.1rem', right:'1.1rem', bottom:'1.1rem', color:C.ivory, zIndex:1 }}>
                        <div style={{ fontFamily:display, fontWeight:600, fontSize:'1.35rem', lineHeight:1.1 }}>{name}</div>
                        <div style={{ fontSize:'0.8rem', letterSpacing:'0.04em', color:'rgba(251,247,242,0.82)', marginTop:'0.15rem' }}>{sub}</div>
                      </div>
                    </Tilt>
                  </motion.div>
                )
              })}
            </RevealGroup>
          </div>
        </section>

        <Ribbon />

        {/* ── TESTIMONIALS ── */}
        <section className="section wash-blush paper">
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <Eyebrow>Kind Words</Eyebrow>
              <h2 style={{ marginTop:'1.25rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}><WordReveal text="From couples we've planned for" /></h2>
            </Reveal>
            <TestimonialSlider items={testimonials} />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" id="faq" style={{ background:C.ivory }}>
          <div className="container" style={{ maxWidth:'880px' }}>
            <Reveal>
              <Eyebrow>Good to Know</Eyebrow>
              <h2 style={{ marginTop:'1.25rem', marginBottom:'2.5rem', fontSize:'clamp(2.1rem,3.6vw,3rem)' }}><WordReveal text="Frequently asked questions" /></h2>
            </Reveal>
            <div style={{ borderTop:'1px solid rgba(43,36,32,0.12)' }}>
              {faqs.map(({ q, a }, i) => (
                <Reveal key={q} y={12}>
                  <div onClick={() => toggleFaq(i)} style={{ padding:'1.6rem 0', borderBottom:'1px solid rgba(43,36,32,0.12)', cursor:'pointer' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem' }}>
                      <h4 style={{ fontSize:'1.15rem', fontWeight:500 }}>{q}</h4>
                      <span style={{ fontSize:'1.5rem', color:C.wine, fontFamily:serif, transition:'transform 0.25s var(--ease-soft)', transform: openFaq === i ? 'rotate(45deg)' : 'none', flexShrink:0 }}>+</span>
                    </div>
                    <div className={`faq-answer ${openFaq === i ? 'open' : ''}`}>
                      <p style={{ paddingTop:'1rem', color:C.muted, fontSize:'1rem', maxWidth:'46rem' }}>{a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA / MAP ── */}
        <section id="contact" className="paper" style={{ padding:'6.5rem 0', textAlign:'center', background:`linear-gradient(150deg, ${C.rose} 0%, ${C.wine} 70%, ${C.deepwine} 100%)`, color:C.ivory }}>
          <Petals count={5} />
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <Eyebrow dark>Let's Talk</Eyebrow>
              <h2 style={{ marginTop:'1.25rem', color:C.ivory, fontFamily:display, fontWeight:500, fontSize:'clamp(2.6rem,5vw,4rem)', maxWidth:'18ch', marginInline:'auto', lineHeight:1.05 }}>
                Let's start planning your <em style={{ fontStyle:'italic', color:C.goldSoft }}>"I do."</em>
              </h2>
              <p style={{ color:'rgba(251,247,242,0.82)', maxWidth:'32rem', margin:'1.25rem auto 2.25rem' }}>
                Book a free discovery call and tell us about your date, your venue, and your vision.
              </p>
              {/* TODO: contact page */}
              <Magnetic style={{ marginBottom:'3rem' }}><a href="#" className="btn btn-light">Book a Discovery Call</a></Magnetic>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ maxWidth:'820px', margin:'0 auto', borderRadius:'var(--r-md)', overflow:'hidden', boxShadow:'var(--shadow-lg)', border:'1px solid rgba(251,247,242,0.2)' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.987996104505!2d120.65641289999999!3d15.3228875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396e9005ab0c10d%3A0x7b07b469e90ff3c8!2sMadzhots%20Studios!5e0!3m2!1sen!2sph!4v1781956867404!5m2!1sen!2sph"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
                  title="Madzshots Weddings location"
                  style={{ width:'100%', display:'block', border:0, height:'340px' }}
                />
              </div>
            </Reveal>
          </div>
        </section>

      </main>

      <Footer admin={admin} />
    </>
  )
}

function navBtn(side) {
  return {
    position:'absolute', top:'50%', [side]:'1rem', transform:'translateY(-50%)',
    width:'42px', height:'42px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
    fontSize:'1.4rem', cursor:'pointer', zIndex:2, border:'none',
    background:'rgba(251,247,242,0.9)', color:'#3E2230', fontFamily:"'Fraunces', serif",
  }
}
