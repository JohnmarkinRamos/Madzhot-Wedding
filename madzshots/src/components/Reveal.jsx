import { motion } from 'framer-motion'

// Scroll-reveal wrapper. Fades + lifts children in once on view.
// Shared variants live in ../lib/motion (keeps fast-refresh happy).
export function Reveal({ children, delay = 0, y = 22, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Staggered container — children animate in sequence.
export function RevealGroup({ children, className, style, stagger = 0.1 }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

