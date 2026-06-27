import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Counts a numeric value up from zero when scrolled into view.
// Preserves any prefix/suffix (e.g. "150+", "8 yrs", "98%"). Non-numeric
// values (e.g. "Tarlac") render as-is.
export function CountUp({ value, duration = 1.6, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const parts = String(value).match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  const [display, setDisplay] = useState(parts ? `${parts[1]}0${parts[3]}` : value)

  useEffect(() => {
    if (!parts || !inView) return
    const target = parseFloat(parts[2])
    const start = performance.now()
    let raf
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(`${parts[1]}${Math.round(target * eased)}${parts[3]}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return <span ref={ref} style={style}>{parts ? display : value}</span>
}
