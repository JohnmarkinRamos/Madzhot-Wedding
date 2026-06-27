// Editorial marquee band — infinite-scrolling words between sections.
const DEFAULT_ITEMS = ['Weddings', 'Events', 'Styling', 'Coordination', 'Florals', 'Celebrations']

export function Ribbon({ items = DEFAULT_ITEMS, dark = false }) {
  const bg = dark ? '#3E2230' : '#6E2A35'
  const text = dark ? '#F7E9E4' : '#FBF7F2'
  const dot = '#D9B26A'
  // duplicate the list so the loop is seamless
  const loop = [...items, ...items]

  return (
    <div className="ribbon" style={{ background: bg, padding: '1.1rem 0' }}>
      <div className="ribbon-track">
        {loop.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span className="ribbon-item" style={{ color: text }}>{item}</span>
            <span className="ribbon-dot" style={{ background: dot }} />
          </span>
        ))}
      </div>
    </div>
  )
}
