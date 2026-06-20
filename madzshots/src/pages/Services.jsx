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
        <section className="py-[5rem]" style={{ borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Eyebrow>Services</Eyebrow>
              <h1 className="mt-4" style={{ fontSize: 'clamp(2.6rem,5vw,4.4rem)', lineHeight: 1.04 }}>How we support your day</h1>
            </div>
            <p className="max-w-[30rem] text-[#564b43]">Three ways to work with us, depending on how much of the journey you'd like guided.</p>
          </div>
        </section>

        <div className="max-w-[1180px] mx-auto px-[6vw]">
          {services.map(({ num, title, desc, items, best, img }, i) => (
            <div key={num} className="py-[5rem]" style={{ borderBottom: '1px solid rgba(43,36,32,0.14)' }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-start">
                <div>
                  <span className="block mb-4 text-[2.4rem] leading-none text-[#B79257]" style={{ fontFamily:"'Fraunces',serif", fontStyle:'italic' }}>{num}</span>
                  <h2 className="mb-4" style={{ fontSize:'clamp(1.8rem,3vw,2.4rem)' }}>{title}</h2>
                  <p className="text-[#564b43] mb-6">{desc}</p>
                  <ul className="mb-6 space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-3 text-[0.94rem] text-[#564b43]">
                        <span className="mt-1 w-[5px] h-[5px] rounded-full flex-shrink-0" style={{ background:'#B79257', marginTop:'8px' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[0.88rem] text-[#7a6f66] mb-6"><strong className="text-[#2B2420]">Best for:</strong> {best}</p>
                  <Link to="/contact" className="text-[0.78rem] tracking-[0.08em] uppercase text-[#6E2A35] border-b border-[#6E2A35] pb-0.5">Inquire about this →</Link>
                </div>
                <div className="rounded-[2px]" style={{ backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center', aspectRatio:'4/3' }} />
              </div>
            </div>
          ))}
        </div>

        <section className="py-[7.5rem] bg-[#F4ECE3]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            <Eyebrow>Not Sure Which Fits?</Eyebrow>
            <h2 className="mt-5 mb-4" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)', maxWidth:'30rem' }}>Most couples mix and match</h2>
            <p className="max-w-[36rem] text-[#564b43]">A lot of our couples combine Day-of Coordination with Styling & Design, or add Styling on top of Full Planning closer to the date. On your discovery call, we'll walk through your timeline and budget and recommend the right combination — no pressure to book more than you need.</p>
          </div>
        </section>

        <section className="py-[6rem] px-[6vw] text-center" style={{ background:'linear-gradient(135deg,#6E2A35,rgba(219,92,92,0))' }}>
          <h2 className="text-[#FBF7F2] mb-4" style={{ fontSize:'clamp(2.1rem,4vw,3.2rem)', maxWidth:'32rem', margin:'0 auto 1.6rem' }}>Let's find the right fit for you.</h2>
          <p className="mb-8" style={{ color:'rgba(251,247,242,0.75)', maxWidth:'30rem', margin:'0 auto 2.2rem' }}>Book a free discovery call and tell us about your date, your venue, and your vision.</p>
          <Link to="/contact" className="inline-block bg-[#FBF7F2] text-[#6E2A35] px-8 py-4 text-[0.82rem] tracking-[0.1em] uppercase transition-colors hover:bg-[#B79257] hover:text-[#2B2420]">Book a Discovery Call</Link>
        </section>
      </main>
      <Footer admin={admin} />
    </>
  )
}
