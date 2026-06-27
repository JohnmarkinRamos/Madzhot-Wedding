import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const display = "'Cormorant Garamond', serif"
const serif = "'Fraunces', serif"
const WINE = '#6E2A35', ROSE = '#C98A93', FAINT = '#9c8d83'

const arrowStyle = {
  width: '42px', height: '42px', borderRadius: '50%', border: '1px solid rgba(110,42,53,0.25)',
  background: 'transparent', color: WINE, cursor: 'pointer', fontSize: '1.3rem', lineHeight: 1,
  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}

// Auto-rotating single testimonial with dots + arrows.
export function TestimonialSlider({ items, interval = 6500 }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [items.length, interval])

  const go = (n) => setI((n + items.length) % items.length)
  const t = items[i]

  return (
    <div style={{ maxWidth: '780px', margin: '3.5rem auto 0', textAlign: 'center', position: 'relative' }}>
      <div style={{ minHeight: '230px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ fontFamily: display, fontStyle: 'italic', fontSize: '3rem', color: ROSE, lineHeight: 0.4 }}>“</div>
            <p style={{ fontFamily: display, fontWeight: 500, fontSize: 'clamp(1.45rem, 2.8vw, 2.1rem)', lineHeight: 1.45, color: '#4a3f38', margin: '1.5rem 0' }}>{t.q}</p>
            <div style={{ fontFamily: serif, fontWeight: 500, fontSize: '1.05rem', color: '#2B2420' }}>{t.name}</div>
            <div style={{ fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: FAINT, marginTop: '0.2rem' }}>{t.service}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginTop: '2rem' }}>
        <button onClick={() => go(i - 1)} aria-label="Previous testimonial" style={arrowStyle}>‹</button>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {items.map((_, d) => (
            <button key={d} onClick={() => setI(d)} aria-label={`Go to testimonial ${d + 1}`}
              style={{ width: d === i ? '22px' : '8px', height: '8px', borderRadius: '999px', border: 'none', cursor: 'pointer', background: d === i ? WINE : 'rgba(110,42,53,0.25)', transition: 'all 0.3s ease', padding: 0 }} />
          ))}
        </div>
        <button onClick={() => go(i + 1)} aria-label="Next testimonial" style={arrowStyle}>›</button>
      </div>
    </div>
  )
}
