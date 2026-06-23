import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'

// Same sample data as RealWeddings (fallback)
const SAMPLE_PHOTOS = [
  {
    id: 's1',
    couple: 'Sofia & Rafael',
    subtitle: 'Full Wedding · Garden Ceremony',
    category: 'full',
    size: 'wide',
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
    id: 's2',
    couple: 'Isabella & Marco',
    subtitle: 'Full Wedding · Ballroom',
    category: 'full',
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
    id: 's3',
    couple: 'Camille & James',
    subtitle: 'Prenup Wedding · Beach',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    story: "Waves, golden light, and the sound of laughter — Camille and James's beach prenup was everything they dreamed of. Natural, free, and deeply them.",
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
      'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
    ],
  },
  {
    id: 's4',
    couple: 'Elena & Lucas',
    subtitle: 'Full Wedding · Vineyard',
    category: 'full',
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
    id: 's5',
    couple: 'Mia & Daniel',
    subtitle: 'Prenup Wedding · Rustic Barn',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
    story: "Mia and Daniel's rustic barn prenup was filled with wildflowers, fairy lights, and an ease that comes when two people are simply, completely themselves together.",
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    ],
  },
  {
    id: 's6',
    couple: 'Natalie & Ethan',
    subtitle: 'Full Wedding · Chapel',
    category: 'full',
    size: 'wide',
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
    id: 's7',
    couple: 'Andrea & Julian',
    subtitle: 'Prenup Wedding · Rooftop',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
    story: 'High above the city, Andrea and Julian shared a rooftop prenup session as the skyline glowed behind them. Urban, intimate, and entirely their own.',
    gallery: [
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
      'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    ],
  },
  {
    id: 's8',
    couple: 'Clara & Sebastian',
    subtitle: 'Full Wedding · Botanical Garden',
    category: 'full',
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
  const [lightbox, setLightbox] = useState(null) // index of open image

  useEffect(() => {
    async function load() {
      // Try Supabase first
      const { data, error } = await supabase
        .from('real_weddings')
        .select('*')
        .eq('id', id)
        .single()

      if (!error && data) {
        // If Supabase row exists, merge with sample gallery/story if not present
        const sample = SAMPLE_PHOTOS.find(s => s.id === id)
        setWedding({
          story: sample?.story ?? 'A beautiful celebration, lovingly documented.',
          gallery: data.gallery ?? sample?.gallery ?? [],
          ...data,
        })
      } else {
        // Fall back to sample data
        const sample = SAMPLE_PHOTOS.find(s => s.id === id)
        setWedding(sample ?? null)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '5rem', minHeight: '80vh', background: '#FBF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Work Sans', sans-serif", color: '#9E9189', fontSize: '0.9rem' }}>Loading…</span>
        </main>
        <Footer />
      </>
    )
  }

  if (!wedding) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '5rem', minHeight: '80vh', background: '#FBF7F2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: '1.5rem', color: '#2B2420' }}>Wedding not found.</span>
          <button onClick={() => navigate('/real-weddings')} style={backBtnStyle}>← Back to Gallery</button>
        </main>
        <Footer />
      </>
    )
  }

  const gallery = wedding.gallery ?? []

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Work+Sans:wght@400;500;600&display=swap');

        .wd-gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        @media (max-width: 640px) {
          .wd-gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .wd-gallery-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: cover;
          border-radius: 3px;
          cursor: pointer;
          display: block;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .wd-gallery-img:hover {
          transform: scale(1.02);
          filter: brightness(0.92);
        }
        .wd-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .wd-lightbox img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 4px;
        }
        .wd-lb-close {
          position: absolute;
          top: 1.25rem; right: 1.5rem;
          background: none; border: none;
          color: #fff; font-size: 2rem;
          cursor: pointer; line-height: 1;
          opacity: 0.8;
        }
        .wd-lb-close:hover { opacity: 1; }
        .wd-lb-arrow {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.12);
          border: none; color: #fff;
          font-size: 1.5rem;
          width: 3rem; height: 3rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .wd-lb-arrow:hover { background: rgba(255,255,255,0.25); }
        .wd-lb-prev { left: 1.5rem; }
        .wd-lb-next { right: 1.5rem; }
      `}</style>

      <Navbar />

      <main style={{ paddingTop: '5rem', background: '#FBF7F2' }}>

        {/* Hero image */}
        <div style={{
          width: '100%',
          height: 'clamp(320px, 55vh, 580px)',
          backgroundImage: `url(${wedding.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.48) 100%)',
          }} />
        </div>

        {/* Story section */}
        <section style={{ padding: '5rem 0 4rem', borderBottom: '1px solid rgba(43,36,32,0.10)' }}>
          <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 6vw', textAlign: 'center' }}>

            {/* Back link */}
            <button onClick={() => navigate('/real-weddings')} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Work Sans', sans-serif", fontSize: '0.78rem',
              fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#B07D57', marginBottom: '2.5rem',
            }}>
              ← Back to Gallery
            </button>

            <p style={{
              fontSize: '0.72rem', fontFamily: "'Work Sans', sans-serif",
              fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#B07D57', marginBottom: '0.75rem',
            }}>
              Stories, Told in Trust
            </p>

            <h1 style={{
              fontFamily: "'Fraunces', serif", fontWeight: '300',
              fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15,
              color: '#2B2420', marginBottom: '0.5rem',
            }}>
              <em>{wedding.couple}</em>
            </h1>
            <p style={{
              fontFamily: "'Work Sans', sans-serif", fontSize: '0.82rem',
              color: '#B07D57', letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '2.5rem',
            }}>
              {wedding.subtitle}
            </p>

            <p style={{
              fontFamily: "'Work Sans', sans-serif", fontSize: '1rem',
              color: '#5C504A', lineHeight: 1.9, maxWidth: '620px',
              margin: '0 auto',
            }}>
              {wedding.story}
            </p>
          </div>
        </section>

        {/* Photo gallery */}
        {gallery.length > 0 && (
          <section style={{ padding: '4rem 0 6rem' }}>
            <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 6vw' }}>
              <p style={{
                fontFamily: "'Work Sans', sans-serif", fontSize: '0.72rem',
                fontWeight: '600', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: '#B07D57', marginBottom: '2rem',
              }}>
                Through Our Lens
              </p>
              <div className="wd-gallery-grid">
                {gallery.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${wedding.couple} — photo ${i + 1}`}
                    className="wd-gallery-img"
                    onClick={() => setLightbox(i)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="wd-lightbox" onClick={() => setLightbox(null)}>
          <button className="wd-lb-close" onClick={() => setLightbox(null)}>×</button>
          <button
            className="wd-lb-arrow wd-lb-prev"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length) }}
          >
            ‹
          </button>
          <img
            src={gallery[lightbox]}
            alt={`${wedding.couple} — photo ${lightbox + 1}`}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="wd-lb-arrow wd-lb-next"
            onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % gallery.length) }}
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}

const backBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: "'Work Sans', sans-serif", fontSize: '0.78rem',
  fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase',
  color: '#B07D57',
}