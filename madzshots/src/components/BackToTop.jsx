import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Floating pill that appears after scrolling and returns to the top.
export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toTop() {
    if (window.lenis) window.lenis.scrollTo(0, { duration: 1 })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed', bottom: '1.6rem', right: '1.6rem', zIndex: 1500,
            width: '48px', height: '48px', borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: '#6E2A35', color: '#FBF7F2', boxShadow: '0 10px 26px rgba(62,34,48,0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
          }}
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
