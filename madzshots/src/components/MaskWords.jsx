import { motion } from 'framer-motion'

// Cinematic headline reveal: each word rises up from behind a mask, staggered.
// `words` is an array of { text, className?, style? } so individual words can
// carry an accent (e.g. a shimmer gradient).
export function MaskWords({ words, delay = 0.2, stagger = 0.09, onLoad = true }) {
  const trigger = onLoad
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }

  return (
    <motion.span
      style={{ display: 'inline' }}
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.14em', marginBottom: '-0.14em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '118%' }, show: { y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } } }}
          >
            <span className={w.className} style={w.style}>{w.text}</span>{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}
