import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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

const CATEGORY_OPTIONS = [
  { key:'all',    label:'All Weddings' },
  { key:'full',   label:'Full Wedding' },
  { key:'prenup', label:'Prenup Wedding' },
]
const MEDIA_OPTIONS = [
  { key:'photo', label:'Photo' },
  { key:'video', label:'Video' },
]

const SAMPLE_PHOTOS = [
  { id:'s1', couple:'Sofia & Rafael', subtitle:'Full Wedding · Garden Ceremony', category:'full', size:'wide', image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80' },
  { id:'s2', couple:'Isabella & Marco', subtitle:'Full Wedding · Ballroom', category:'full', image_url:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' },
  { id:'s3', couple:'Camille & James', subtitle:'Prenup Wedding · Beach', category:'prenup', image_url:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
  { id:'s4', couple:'Elena & Lucas', subtitle:'Full Wedding · Vineyard', category:'full', image_url:'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80' },
  { id:'s5', couple:'Mia & Daniel', subtitle:'Prenup Wedding · Rustic Barn', category:'prenup', image_url:'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80' },
  { id:'s6', couple:'Natalie & Ethan', subtitle:'Full Wedding · Chapel', category:'full', size:'wide', image_url:'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=1200&q=80' },
  { id:'s7', couple:'Andrea & Julian', subtitle:'Prenup Wedding · Rooftop', category:'prenup', image_url:'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80' },
  { id:'s8', couple:'Clara & Sebastian', subtitle:'Full Wedding · Botanical Garden', category:'full', image_url:'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
]

const SAMPLE_VIDEOS = [
  { id:'v1', couple:'Sofia & Rafael', subtitle:'Full Wedding · Garden Ceremony', category:'full', size:'wide', youtube_id:'nJ6Q6OEKPaA' },
  { id:'v2', couple:'Camille & James', subtitle:'Prenup Wedding · Beach', category:'prenup', youtube_id:'Hy9-xIqFYsU' },
  { id:'v3', couple:'Elena & Lucas', subtitle:'Full Wedding · Vineyard', category:'full', youtube_id:'HJBpJIjDDJU' },
  { id:'v4', couple:'Mia & Daniel', subtitle:'Prenup Wedding · Rustic Barn', category:'prenup', youtube_id:'_9VUPq3SxOc' },
]

function StyledSelect({ value, onChange, options, label }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
      <label style={{ fontSize:'0.72rem', fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', color:C.wine }}>{label}</label>
      <div style={{ position:'relative', display:'inline-flex', alignItems:'center' }}>
        <select value={value} onChange={e => onChange(e.target.value)}
          style={{ appearance:'none', WebkitAppearance:'none', padding:'0.7rem 2.4rem 0.7rem 1.1rem', fontSize:'0.92rem', fontWeight:500, color:C.ink, background:'#fff', border:'1px solid rgba(43,36,32,0.16)', borderRadius:'999px', cursor:'pointer', minWidth:'180px', outline:'none', transition:'border-color 0.2s', fontFamily:'var(--font-sans)' }}
          onFocus={e => e.target.style.borderColor = C.roseDeep}
          onBlur={e => e.target.style.borderColor = 'rgba(43,36,32,0.16)'}>
          {options.map(opt => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
        </select>
        <span style={{ position:'absolute', right:'1rem', pointerEvents:'none' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 5L7 9L11 5" stroke={C.wine} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  )
}

export default function RealWeddings() {
  const navigate = useNavigate()
  const [tiles, setTiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [media, setMedia] = useState('photo')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('real_weddings').select('*').order('created_at', { ascending: false })
      if (!error) setTiles(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('public_rw')
      .on('postgres_changes', { event:'*', schema:'public', table:'real_weddings' }, payload => {
        if (payload.eventType === 'INSERT') setTiles(prev => [payload.new, ...prev])
        else if (payload.eventType === 'UPDATE') setTiles(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
        else if (payload.eventType === 'DELETE') setTiles(prev => prev.filter(t => t.id !== payload.old.id))
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const allPhotos = tiles.length > 0 ? tiles : SAMPLE_PHOTOS
  const visiblePhotos = category === 'all' ? allPhotos : allPhotos.filter(t => t.category === category)
  const visibleVideos = category === 'all' ? SAMPLE_VIDEOS : SAMPLE_VIDEOS.filter(v => v.category === category)

  const empty = (text) => (
    <div style={{ textAlign:'center', padding:'6rem 0', color:C.faint, fontSize:'1rem' }}>{text}</div>
  )

  return (
    <>
      <style>{`
        .rw-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.25rem; }
        .rw-grid .wide { grid-column:span 2; }
        @media (max-width:600px) {
          .rw-grid { grid-template-columns:1fr; }
          .rw-grid .wide { grid-column:span 1; }
        }
        .rw-filters { display:flex; align-items:flex-end; gap:1.25rem; flex-wrap:wrap; }
      `}</style>

      <Navbar />

      <main style={{ paddingTop:'5rem', background:C.ivory }}>

        {/* Hero */}
        <section className="wash-blush paper" style={{ padding:'6.5rem 0 4.5rem' }}>
          <div className="container" style={{ position:'relative', zIndex:1 }}>
            <Reveal>
              <span className="eyebrow">Real Weddings</span>
              <h1 style={{ marginTop:'1.25rem', fontFamily:display, fontWeight:700, fontSize:'clamp(2.8rem,6.4vw,5rem)', lineHeight:1.0, color:C.ink, maxWidth:'18ch' }}>
                Love stories we've had the <em className="grad-rose" style={{ fontStyle:'italic' }}>privilege to help tell.</em>
              </h1>
              <p style={{ marginTop:'1.5rem', fontSize:'1.1rem', color:C.muted, maxWidth:'34rem', lineHeight:1.7 }}>
                Each wedding is unique. Here's a look at the real couples, real moments, and real memories we've been part of.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Gallery */}
        <section className="section" style={{ paddingTop:'3.5rem' }}>
          <div className="container">

            <Reveal>
              <div className="rw-filters" style={{ marginBottom:'3rem', paddingBottom:'1.75rem', borderBottom:'1px solid rgba(43,36,32,0.12)' }}>
                <StyledSelect label="Wedding Type" value={category} onChange={setCategory} options={CATEGORY_OPTIONS} />
                <StyledSelect label="Media Type" value={media} onChange={setMedia} options={MEDIA_OPTIONS} />
              </div>
            </Reveal>

            {/* PHOTOS */}
            {media === 'photo' && (
              loading ? empty('Loading gallery…')
              : visiblePhotos.length === 0 ? empty('No photos in this category yet.')
              : (
                <RevealGroup className="rw-grid" stagger={0.08}>
                  {visiblePhotos.map((tile, i) => {
                    const wide = tile.size === 'wide'
                    return (
                      <motion.div key={tile.id} variants={itemVariants} className={wide ? 'wide' : ''}>
                        <Tilt
                          className={`media ${wide ? 'frame' : (i % 3 === 0 ? 'frame-arch' : 'frame')}`}
                          style={{ aspectRatio: wide ? '16/7' : '4/5', cursor:'pointer', boxShadow:'var(--shadow-sm)' }}
                          onClick={() => navigate(`/real-weddings/${tile.id}`)}
                          role="button" tabIndex={0}
                          onKeyDown={e => e.key === 'Enter' && navigate(`/real-weddings/${tile.id}`)}
                          aria-label={`View ${tile.couple} wedding`}>
                          <div className="media-img"><BlurImage src={tile.image_url} alt={tile.couple} /></div>
                          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(42,26,34,0) 45%, rgba(42,26,34,0.74))' }} />
                          <div style={{ position:'absolute', left:'1.3rem', right:'1.3rem', bottom:'1.3rem', color:C.ivory, zIndex:1 }}>
                            <div style={{ fontFamily:display, fontWeight:600, fontSize:'1.5rem', lineHeight:1.1 }}>{tile.couple}</div>
                            <div style={{ fontSize:'0.78rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(251,247,242,0.82)', marginTop:'0.25rem' }}>{tile.subtitle}</div>
                          </div>
                        </Tilt>
                      </motion.div>
                    )
                  })}
                </RevealGroup>
              )
            )}

            {/* VIDEOS */}
            {media === 'video' && (
              visibleVideos.length === 0 ? empty('No videos in this category yet.')
              : (
                <RevealGroup className="rw-grid" stagger={0.08}>
                  {visibleVideos.map(video => (
                    <motion.div key={video.id} variants={itemVariants}
                      className={video.size === 'wide' ? 'wide' : ''}
                      style={{ borderRadius:'var(--r-md)', overflow:'hidden', background:'#3E2230', boxShadow:'var(--shadow-sm)' }}>
                      <iframe src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0&modestbranding=1`} title={video.couple}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        style={{ width:'100%', aspectRatio:'16/9', border:'none', display:'block' }} />
                      <div style={{ padding:'1rem 1.2rem 1.2rem' }}>
                        <div style={{ fontFamily:display, fontWeight:600, fontSize:'1.25rem', color:C.ivory, lineHeight:1.1 }}>{video.couple}</div>
                        <div style={{ fontSize:'0.74rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(251,247,242,0.6)', marginTop:'0.2rem' }}>{video.subtitle}</div>
                      </div>
                    </motion.div>
                  ))}
                </RevealGroup>
              )
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
