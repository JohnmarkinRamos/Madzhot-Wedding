import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Wrap a button/link so it gently drifts toward the cursor, then springs back.
export function Magnetic({ children, strength = 0.35, style }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 })

  function handleMove(e) {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  function reset() { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ display: 'inline-block', x, y, ...style }}
    >
      {children}
    </motion.div>
  )
}
