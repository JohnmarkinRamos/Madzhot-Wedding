import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { Reveal, RevealGroup } from '../components/Reveal'
import { itemVariants } from '../lib/motion'
import { Tilt } from '../components/Tilt'
import { BlurImage } from '../components/BlurImage'
import { supabase } from '../lib/supabase'

const C = {
  ivory:'#FBF7F2', blush:'#F7E9E4', rose:'#C98A93', roseDeep:'#9C5560',
  wine:'#6E2A35', gold:'#B79257', ink:'#2B2420', muted:'#6b5a52', faint:'#9c8d83',
}
const display = "'Cormorant Garamond', serif"

// Same sample data as RealWeddings (fallback)
const SAMPLE_PHOTOS = [
  {
    id: 's1', couple: 'Sofia & Rafael', subtitle: 'Full Wedding · Garden Ceremony', category: 'full', size: 'wide',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    story: "Sofia and Rafael's wedding unfolded with effortless grace beneath a canopy of garden blooms. Every detail was intentional, every glance sincere. From the quiet morning preparations to the joy of the evening celebration, the day carried a timeless elegance that felt uniquely theirs.",
    gallery: [
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
      'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    ],
  },
  {
    id: 's2', couple: 'Isabella & Marco', subtitle: 'Full Wedding · Ballroom', category: 'full',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    story: 'Isabella and Marco chose the grand ballroom as the backdrop for their love story. Candlelight and florals set the tone for an evening of warmth, laughter, and celebration with everyone they hold dear.',
    gallery: [
      'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    ],
  },
  {
    id: 's3', couple: 'Camille & James', subtitle: 'Prenup Wedding · Beach', category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    story: "Waves, golden light, and the sound of laughter — Camille and James's beach prenup was everything they dreamed of. Natural, free, and deeply them.",
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    ],
  },
  {
    id: 's4', couple: 'Elena & Lucas', subtitle: 'Full Wedding · Vineyard', category: 'full',
    image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    story: 'Among rolling vines and warm autumn hues, Elena and Lucas exchanged vows in a ceremony as rich and layered as the wines they love. A day of pure, unhurried joy.',
    gallery: [
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
      'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80',
      'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80',
    ],
  },
  {
    id: 's5', couple: 'Mia & Daniel', subtitle: 'Prenup Wedding · Rustic Barn', category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
    story: "Mia and Daniel's rustic barn prenup was filled with wildflowers, fairy lights, and an ease that comes when two people are simply, completely themselves together.",
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    ],
  },
  {
    id: 's6', couple: 'Natalie & Ethan', subtitle: 'Full Wedding · Chapel', category: 'full', size: 'wide',
    image_url: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=1200&q=80',
    story: "Natalie and Ethan's chapel wedding was a study in quiet reverence and deep love. Every moment — from the first look to the last dance — was held gently, and with great care.",
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
      'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80',
    ],
  },
  {
    id: 's7', couple: 'Andrea & Julian', subtitle: 'Prenup Wedding · Rooftop', category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    story: 'High above the city, Andrea and Julian shared a rooftop prenup session as the skyline glowed behind them. Urban, intimate, and entirely their own.',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    ],
  },
  {
    id: 's8', couple: 'Clara & Sebastian', subtitle: 'Full Wedding · Botanical Garden', category: 'full',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
    story: 'Clara and Sebastian chose a lush botanical garden as the setting for their wedding — surrounded by every flower imaginable, and every person they love.',
    gallery: [
      'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80',
    ],
  },
]

export default function WeddingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [wedding, setWedding] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('real_weddings').select('*').eq('id', id).single()
      if (!error && data) {
        const sample = SAMPLE_PHOTOS.find(s => s.id === id)
        setWedding({ story: sample?.story ?? 'A beautiful celebration, lovingly documented.', gallery: data.gallery ?? sample?.gallery ?? [], ...data })
      } else {
        setWedding(SAMPLE_PHOTOS.find(s => s.id === id) ?? null)
      }
      setLoading(false)
    }
    load()
  }, [id])

  const gallery = wedding?.gallery ?? []

  // lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + gallery.length) % gallery.length)
      else if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, gallery.length])

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:'5rem', minHeight:'80vh', background:C.ivory, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span style={{ color:C.faint, fontSize:'1rem' }}>Loading…</span>
        </main>
        <Footer />
      </>
    )
  }

  if (!wedding) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop:'5rem', minHeight:'80vh', background:C.ivory, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'1.75rem' }}>
          <span style={{ fontFamily:display, fontSize:'2rem', color:C.ink }}>Wedding not found.</span>
          <button onClick={() => navigate('/real-weddings')} className="btn btn-primary">← Back to Gallery</button>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <style>{`
        .wd-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; }
        @media (max-width:760px) { .wd-grid { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:440px) { .wd-grid { grid-template-columns:1fr; } }
      `}</style>

      <Navbar />

      <main style={{ background:C.ivory }}>

        {/* Full-bleed cinematic hero */}
        <div style={{ position:'relative', width:'100%', height:'clamp(380px, 70vh, 680px)', overflow:'hidden' }}>
          <motion.div
            initial={{ scale:1.12 }} animate={{ scale:1 }} transition={{ duration:1.4, ease:[0.22,1,0.36,1] }}
            style={{ position:'absolute', inset:0, backgroundImage:`url(${wedding.image_url})`, backgroundSize:'cover', backgroundPosition:'center' }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(42,26,34,0.25) 0%, rgba(42,26,34,0.15) 45%, rgba(42,26,34,0.78) 100%)' }} />
          <div className="container" style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', justifyContent:'flex-end', paddingBottom:'3rem' }}>
            <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8, delay:0.3, ease:[0.22,1,0.36,1] }}>
              <span className="eyebrow on-dark">Stories, Told in Trust</span>
              <h1 style={{ marginTop:'0.75rem', fontFamily:display, fontWeight:600, fontStyle:'italic', fontSize:'clamp(3rem,7.4vw,5.8rem)', color:C.ivory, lineHeight:1.0, textShadow:'0 2px 24px rgba(42,26,34,0.5)' }}>{wedding.couple}</h1>
              <p style={{ fontSize:'0.9rem', color:'rgba(251,247,242,0.85)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'0.5rem' }}>{wedding.subtitle}</p>
            </motion.div>
          </div>
        </div>

        {/* Story */}
        <section className="section wash-blush paper" style={{ paddingTop:'4rem', paddingBottom:'4rem' }}>
          <div className="container" style={{ maxWidth:'760px', textAlign:'center', position:'relative', zIndex:1 }}>
            <Reveal>
              <button onClick={() => navigate('/real-weddings')}
                style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'none', border:'none', cursor:'pointer', fontSize:'0.78rem', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:C.wine, marginBottom:'2.5rem' }}>
                ← Back to Gallery
              </button>
              <p style={{ fontFamily:display, fontSize:'clamp(1.4rem,3vw,1.9rem)', fontStyle:'italic', color:C.roseDeep, marginBottom:'2rem' }}>“Every detail held with care.”</p>
              <p style={{ fontSize:'1.1rem', color:'#5C504A', lineHeight:1.9, maxWidth:'640px', margin:'0 auto' }}>{wedding.story}</p>
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        {gallery.length > 0 && (
          <section className="section" style={{ paddingTop:'4.5rem' }}>
            <div className="container">
              <Reveal>
                <p className="eyebrow" style={{ marginBottom:'2rem' }}>Through Our Lens</p>
              </Reveal>
              <RevealGroup className="wd-grid" stagger={0.06}>
                {gallery.map((src, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <Tilt className="media frame" style={{ aspectRatio:'4/3', cursor:'pointer', boxShadow:'var(--shadow-sm)' }}
                      onClick={() => setLightbox(i)}>
                      <div className="media-img"><BlurImage src={src} alt={`${wedding.couple} — photo ${i + 1}`} /></div>
                    </Tilt>
                  </motion.div>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
            style={{ position:'fixed', inset:0, background:'rgba(42,26,34,0.94)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }}>
            <button onClick={() => setLightbox(null)} aria-label="Close"
              style={{ position:'absolute', top:'1.25rem', right:'1.5rem', background:'none', border:'none', color:'#fff', fontSize:'2rem', cursor:'pointer', lineHeight:1, opacity:0.85 }}>×</button>
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length) }} aria-label="Previous" style={lbArrow('left')}>‹</button>
            <motion.img
              key={lightbox}
              initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.3 }}
              src={gallery[lightbox]} alt={`${wedding.couple} — photo ${lightbox + 1}`}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth:'90vw', maxHeight:'88vh', objectFit:'contain', borderRadius:'8px' }} />
            <button onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length) }} aria-label="Next" style={lbArrow('right')}>›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function lbArrow(side) {
  return {
    position:'absolute', top:'50%', [side]:'1.5rem', transform:'translateY(-50%)',
    background:'rgba(255,255,255,0.12)', border:'none', color:'#fff', fontSize:'1.6rem',
    width:'3rem', height:'3rem', borderRadius:'50%', cursor:'pointer',
    display:'flex', alignItems:'center', justifyContent:'center',
  }
}
