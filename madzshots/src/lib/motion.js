// Shared Framer Motion variants & easing.
export const easeSoft = [0.22, 1, 0.36, 1]

export const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSoft } },
}
