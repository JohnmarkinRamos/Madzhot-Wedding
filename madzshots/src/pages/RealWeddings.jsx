import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

const DEFAULT_TILES = [
  { id:'t1', type:'image', category:'planning', size:'wide', image:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', couple:'Aiza & Ramon', subtitle:'Garden Ceremony — Tarlac' },
  { id:'t2', type:'image', category:'planning', size:'normal', image:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80', couple:'Aiza & Ramon', subtitle:'Full Wedding Planning' },
  { id:'t3', type:'image', category:'styling', size:'normal', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80', couple:'Bea & Carlo', subtitle:'Reception Styling' },
  { id:'t4', type:'image', category:'styling', size:'normal', image:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', couple:'Detail Story', subtitle:'Florals & Table Design' },
  { id:'t5', type:'image', category:'planning', size:'normal', image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', couple:'Mika & Joaquin', subtitle:'Beachfront Vows' },
  { id:'t6', type:'image', category:'coordination', size:'normal', image:'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80', couple:'First Look', subtitle:'Quiet Moments' },
  { id:'t7', type:'image', category:'coordination', size:'wide', image:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80', couple:'Trisha & Noel', subtitle:'Full Coordination Highlights' },
  { id:'t8', type:'image', category:'coordination', size:'normal', image:'https://images.unsplash.com/photo-1519183071298-a2962be90b53?auto=format&fit=crop&w=900&q=80', couple:'The Reception', subtitle:'Evening Celebration' },
  { id:'t9', type:'image', category:'coordination', size:'normal', image:'https://images.unsplash.com/photo-1525791864203-1e1d0f6bfc13?auto=format&fit=crop&w=900&q=80', couple:'Nica & Paolo', subtitle:'Day-of Coordination' },
  { id:'t10', type:'image', category:'planning', size:'normal', image:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80', couple:'Lia & Marco', subtitle:'Intimate Ceremony' },
  { id:'t11', type:'image', category:'styling', size:'normal', image:'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80', couple:'Styling Detail', subtitle:'Table & Florals' },
  { id:'t12', type:'image', category:'styling', size:'normal', image:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80', couple:'Nica & Paolo', subtitle:'Reception Styling' },
]

const filters = [
  { key:'all', label:'All' },
  { key:'planning', label:'Full Planning' },
  { key:'coordination', label:'Day-of Coordination' },
  { key:'styling', label:'Styling & Design' },
]

export default function RealWeddings() {
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState(null)

  const visible = filter === 'all' ? DEFAULT_TILES : DEFAULT_TILES.filter(t => t.category === filter)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '5rem' }}>
        <section className="py-[5rem]" style={{ borderBottom:'1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-end justify-between gap-8 flex-wrap">
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <h1 className="mt-4" style={{ fontSize:'clamp(2.6rem,5vw,4.4rem)', lineHeight:1.04 }}>Real weddings, real couples</h1>
            </div>
            <p className="max-w-[30rem] text-[#564b43]">Photos from days we've planned, coordinated, and styled across Tarlac and beyond.</p>
          </div>
        </section>

        <section className="py-[5rem]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-8">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="border rounded-full px-[1.1rem] py-[0.4rem] text-[0.82rem] font-medium cursor-pointer transition-all"
                  style={{
                    fontFamily:"'Work Sans',sans-serif",
                    background: filter === key ? '#2B2420' : 'none',
                    borderColor: filter === key ? '#2B2420' : '#EDE8DF',
                    color: filter === key ? '#FBF7F2' : '#7C6F67',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid gap-4 mb-12" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
              {visible.length === 0 ? (
                <div className="col-span-3 text-center py-20 text-[#7a6f66] border-2 border-dashed rounded-lg" style={{ borderColor:'#EDE8DF' }}>
                  <p className="text-lg mb-2">No tiles in this category</p>
                  <p className="text-sm">Switch to "All" to see everything.</p>
                </div>
              ) : visible.map(tile => (
                <div
                  key={tile.id}
                  className={`rw-tile${tile.size === 'wide' ? ' wide' : ''}`}
                  style={{ backgroundImage:`url(${tile.image})` }}
                  onClick={() => setLightbox(tile)}
                >
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(43,36,32,0.85) 0%,transparent 100%)', pointerEvents:'none' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                    <strong className="block text-[#FBF7F2]" style={{ fontFamily:"'Fraunces',serif", fontSize:'1rem' }}>{tile.couple}</strong>
                    <span className="text-[0.78rem]" style={{ color:'rgba(255,255,255,0.72)' }}>{tile.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-6 flex-wrap pt-8" style={{ borderTop:'1px solid rgba(43,36,32,0.14)' }}>
              <p className="text-[0.9rem] text-[#564b43] max-w-[30rem]">Planning your own day and want a similar look and feel? Tell us your style and we'll put a moodboard together.</p>
              <Link to="/contact" className="inline-block bg-[#6E2A35] text-[#FBF7F2] px-6 py-3 text-[0.88rem] font-semibold rounded transition-opacity hover:opacity-90">Book a Discovery Call</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          style={{ background:'rgba(43,36,32,0.92)' }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-[#FBF7F2] text-sm tracking-[0.05em] bg-transparent border-0 cursor-pointer"
            >Close ✕</button>
            <img src={lightbox.image} alt={lightbox.couple} className="max-w-[90vw] max-h-[80vh] rounded-md" />
            <p className="text-center mt-3 text-[0.82rem]" style={{ color:'rgba(255,255,255,0.7)' }}>{lightbox.couple} · {lightbox.subtitle}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
