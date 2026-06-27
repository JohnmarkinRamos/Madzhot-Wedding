import { motion, useScroll, useSpring } from 'framer-motion'

// Thin gold/rose thread at the top that fills as the page scrolls.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '3px',
        background: 'linear-gradient(90deg, #B79257, #C98A93)',
        transformOrigin: 'left', scaleX, zIndex: 2000,
      }}
    />
  )
}
