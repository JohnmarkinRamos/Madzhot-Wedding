// Subtle, sparse falling rose petals. Decorative only — sits behind content.
// Positions are randomised once at module load (kept out of render to stay pure).
const POOL = Array.from({ length: 10 }).map(() => ({
  left: Math.random() * 100,
  size: 7 + Math.random() * 9,
  delay: Math.random() * 10,
  duration: 9 + Math.random() * 8,
}))

export function Petals({ count = 7 }) {
  const petals = POOL.slice(0, count)
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: `${p.left}%`, width: `${p.size}px`, height: `${p.size}px`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
    </div>
  )
}
