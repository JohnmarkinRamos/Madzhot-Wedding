import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'

function Eyebrow({ children }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.72rem',
      fontFamily: "'Work Sans', sans-serif",
      fontWeight: '600',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#B07D57',
    }}>
      <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: '#B07D57' }} />
      {children}
    </span>
  )
}

function ChevronDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ pointerEvents: 'none', flexShrink: 0 }}>
      <path d="M3 5L7 9L11 5" stroke="#7C6F67" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const CATEGORY_OPTIONS = [
  { key: 'all',     label: 'All Weddings' },
  { key: 'full',    label: 'Full Wedding' },
  { key: 'prenup',  label: 'Prenup Wedding' },
]

const MEDIA_OPTIONS = [
  { key: 'photo', label: 'Photo' },
  { key: 'video', label: 'Video' },
]

const SAMPLE_PHOTOS = [
  {
    id: 's1',
    couple: 'Sofia & Rafael',
    subtitle: 'Full Wedding · Garden Ceremony',
    category: 'full',
    size: 'wide',
    image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  },
  {
    id: 's2',
    couple: 'Isabella & Marco',
    subtitle: 'Full Wedding · Ballroom',
    category: 'full',
    image_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
  },
  {
    id: 's3',
    couple: 'Camille & James',
    subtitle: 'Prenup Wedding · Beach',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
  },
  {
    id: 's4',
    couple: 'Elena & Lucas',
    subtitle: 'Full Wedding · Vineyard',
    category: 'full',
    image_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',
  },
  {
    id: 's5',
    couple: 'Mia & Daniel',
    subtitle: 'Prenup Wedding · Rustic Barn',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1525772764200-be829a350797?w=800&q=80',
  },
  {
    id: 's6',
    couple: 'Natalie & Ethan',
    subtitle: 'Full Wedding · Chapel',
    category: 'full',
    size: 'wide',
    image_url: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=1200&q=80',
  },
  {
    id: 's7',
    couple: 'Andrea & Julian',
    subtitle: 'Prenup Wedding · Rooftop',
    category: 'prenup',
    image_url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80',
  },
  {
    id: 's8',
    couple: 'Clara & Sebastian',
    subtitle: 'Full Wedding · Botanical Garden',
    category: 'full',
    image_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
  },
]

const SAMPLE_VIDEOS = [
  {
    id: 'v1',
    couple: 'Sofia & Rafael',
    subtitle: 'Full Wedding · Garden Ceremony',
    category: 'full',
    size: 'wide',
    youtube_id: 'nJ6Q6OEKPaA',
  },
  {
    id: 'v2',
    couple: 'Camille & James',
    subtitle: 'Prenup Wedding · Beach',
    category: 'prenup',
    youtube_id: 'Hy9-xIqFYsU',
  },
  {
    id: 'v3',
    couple: 'Elena & Lucas',
    subtitle: 'Full Wedding · Vineyard',
    category: 'full',
    youtube_id: 'HJBpJIjDDJU',
  },
  {
    id: 'v4',
    couple: 'Mia & Daniel',
    subtitle: 'Prenup Wedding · Rustic Barn',
    category: 'prenup',
    youtube_id: '_9VUPq3SxOc',
  },
]

function StyledSelect({ value, onChange, options, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label style={{
        fontSize: '0.68rem',
        fontFamily: "'Work Sans', sans-serif",
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#B07D57',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            paddingLeft: '1rem',
            paddingRight: '2.4rem',
            paddingTop: '0.65rem',
            paddingBottom: '0.65rem',
            fontSize: '0.88rem',
            fontFamily: "'Work Sans', sans-serif",
            fontWeight: '500',
            color: '#2B2420',
            background: '#FFFFFF',
            border: '1px solid rgba(43,36,32,0.18)',
            borderRadius: '4px',
            cursor: 'pointer',
            minWidth: '180px',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#C2611A'}
          onBlur={e => e.target.style.borderColor = 'rgba(43,36,32,0.18)'}
        >
          {options.map(opt => (
            <option key={opt.key} value={opt.key}>{opt.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: '0.75rem', display: 'flex', alignItems: 'center' }}>
          <ChevronDown />
        </span>
      </div>
    </div>
  )
}

export default function RealWeddings() {
  const navigate = useNavigate()
  const [tiles,    setTiles]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [category, setCategory] = useState('all')
  const [media,    setMedia]    = useState('photo')

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('real_weddings')
        .select('*')
        .order('created_at', { ascending: false })
      if (!error) setTiles(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('public_rw')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'real_weddings' }, payload => {
        if (payload.eventType === 'INSERT') {
          setTiles(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setTiles(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
        } else if (payload.eventType === 'DELETE') {
          setTiles(prev => prev.filter(t => t.id !== payload.old.id))
        }
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const allPhotos = tiles.length > 0 ? tiles : SAMPLE_PHOTOS
  const visiblePhotos = category === 'all'
    ? allPhotos
    : allPhotos.filter(t => t.category === category)

  const visibleVideos = category === 'all'
    ? SAMPLE_VIDEOS
    : SAMPLE_VIDEOS.filter(v => v.category === category)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Work+Sans:wght@400;500;600&display=swap');

        .rw-tile {
          position: relative;
          background-size: cover;
          background-position: center;
          border-radius: 4px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
        }
        .rw-tile.wide {
          grid-column: span 2;
          aspect-ratio: 16/7;
        }
        .rw-tile-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(43,36,32,0.82) 0%, transparent 55%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .rw-tile:hover .rw-tile-overlay {
          opacity: 1;
        }
        .rw-tile-caption {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 1.25rem 1.5rem;
          transform: translateY(6px);
          opacity: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .rw-tile:hover .rw-tile-caption {
          opacity: 1;
          transform: translateY(0);
        }
        .rw-tile-arrow {
          position: absolute;
          top: 1rem; right: 1rem;
          width: 2rem; height: 2rem;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity 0.35s ease;
          backdrop-filter: blur(4px);
        }
        .rw-tile:hover .rw-tile-arrow {
          opacity: 1;
        }

        .rw-video-card {
          border-radius: 6px;
          overflow: hidden;
          background: #2B2420;
          display: flex;
          flex-direction: column;
        }
        .rw-video-card.wide {
          grid-column: span 2;
        }
        .rw-video-card iframe {
          width: 100%;
          aspect-ratio: 16/9;
          border: none;
          display: block;
        }
        .rw-video-info {
          padding: 0.9rem 1.1rem 1rem;
        }
      `}</style>

      <Navbar />

      <main style={{ paddingTop: '5rem', background: '#FBF7F2' }}>

        {/* Hero */}
        <section style={{ padding: '6rem 0 4rem', borderBottom: '1px solid rgba(43,36,32,0.10)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 6vw' }}>
            <Eyebrow>Real Weddings</Eyebrow>
            <h1 style={{
              marginTop: '1rem',
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontFamily: "'Fraunces', serif",
              fontWeight: '300',
              lineHeight: 1.15,
              color: '#2B2420',
              letterSpacing: '-0.01em',
            }}>
              Love Stories We've Had the<br />
              <em style={{ fontStyle: 'italic', fontWeight: '300' }}>Privilege to Help Tell</em>
            </h1>
            <p style={{
              marginTop: '1.25rem',
              fontSize: '1rem',
              color: '#7C6F67',
              maxWidth: '520px',
              lineHeight: 1.8,
              fontFamily: "'Work Sans', sans-serif",
            }}>
              Each wedding is unique. Here's a look at the real couples, real moments,
              and real memories we've been part of.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section style={{ padding: '4rem 0 6rem' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '0 6vw' }}>

            {/* Filter row */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '1rem',
              flexWrap: 'wrap',
              marginBottom: '3rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(43,36,32,0.12)',
            }}>
              <StyledSelect
                label="Wedding Type"
                value={category}
                onChange={setCategory}
                options={CATEGORY_OPTIONS}
              />
              <StyledSelect
                label="Media Type"
                value={media}
                onChange={setMedia}
                options={MEDIA_OPTIONS}
              />
            </div>

            {/* — PHOTO GRID — */}
            {media === 'photo' && (
              loading ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: '#9E9189', fontFamily: "'Work Sans', sans-serif", fontSize: '0.9rem' }}>
                  Loading gallery…
                </div>
              ) : visiblePhotos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: '#9E9189', fontFamily: "'Work Sans', sans-serif", fontSize: '0.9rem' }}>
                  No photos in this category yet.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
                  {visiblePhotos.map(tile => (
                    <div
                      key={tile.id}
                      className={`rw-tile${tile.size === 'wide' ? ' wide' : ''}`}
                      style={{ backgroundImage: `url(${tile.image_url})` }}
                      onClick={() => navigate(`/real-weddings/${tile.id}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => e.key === 'Enter' && navigate(`/real-weddings/${tile.id}`)}
                      aria-label={`View ${tile.couple} wedding`}
                    >
                      <div className="rw-tile-overlay" />
                      {/* Arrow hint */}
                      <div className="rw-tile-arrow">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8M7 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="rw-tile-caption">
                        <strong style={{
                          display: 'block',
                          color: '#FBF7F2',
                          fontFamily: "'Fraunces', serif",
                          fontSize: '1.1rem',
                          fontWeight: '300',
                          fontStyle: 'italic',
                        }}>
                          {tile.couple}
                        </strong>
                        <span style={{
                          color: 'rgba(251,247,242,0.7)',
                          fontFamily: "'Work Sans', sans-serif",
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          fontSize: '0.72rem',
                        }}>
                          {tile.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {/* — VIDEO GRID — */}
            {media === 'video' && (
              visibleVideos.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '6rem 0', color: '#9E9189', fontFamily: "'Work Sans', sans-serif", fontSize: '0.9rem' }}>
                  No videos in this category yet.
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                  {visibleVideos.map(video => (
                    <div
                      key={video.id}
                      className={`rw-video-card${video.size === 'wide' ? ' wide' : ''}`}
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0&modestbranding=1`}
                        title={video.couple}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div className="rw-video-info">
                        <strong style={{
                          display: 'block',
                          color: '#FBF7F2',
                          fontFamily: "'Fraunces', serif",
                          fontSize: '1rem',
                          fontWeight: '300',
                          fontStyle: 'italic',
                        }}>
                          {video.couple}
                        </strong>
                        <span style={{
                          color: 'rgba(251,247,242,0.55)',
                          fontFamily: "'Work Sans', sans-serif",
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                          fontSize: '0.7rem',
                        }}>
                          {video.subtitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}