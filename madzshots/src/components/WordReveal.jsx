import { motion } from 'framer-motion'

// Reveals a plain-text heading one word at a time on scroll-in.
// Use inside a styled heading: <h2 style={...}><WordReveal text="..." /></h2>
export function WordReveal({ text, delay = 0 }) {
  const words = String(text).split(' ')
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
      style={{ display: 'inline' }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0, y: '0.5em' }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {w}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}
