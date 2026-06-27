import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Branded intro loader — shows briefly on first load, then fades away.
export function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, zIndex: 3000, background: 'linear-gradient(160deg, #FBF7F2, #F7E9E4)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.1rem' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontWeight: 600, fontSize: '2.8rem', color: '#6E2A35' }}
          >
            Madzshots
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '130px', height: '2px', background: '#B79257', transformOrigin: 'left' }}
          />
          <motion.span
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontSize: '0.7rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9c8d83' }}
          >
            Weddings &amp; Events
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
