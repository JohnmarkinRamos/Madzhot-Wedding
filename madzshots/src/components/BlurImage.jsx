import { useState } from 'react'

// Image that fades from a soft blur to sharp once loaded. Place it inside a
// `.media-img` wrapper (which handles the hover-zoom) so the two transforms
// never fight each other.
export function BlurImage({ src, alt = '', className = '', style }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={className}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        filter: loaded ? 'blur(0)' : 'blur(16px)',
        transform: loaded ? 'scale(1)' : 'scale(1.05)',
        transition: 'filter 0.7s ease, transform 0.9s var(--ease-soft)',
        ...style,
      }}
    />
  )
}
