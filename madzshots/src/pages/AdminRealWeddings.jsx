import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'

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

function uid() { return 't' + Date.now() + Math.random().toString(36).slice(2,6) }

export default function AdminRealWeddings() {
  const [tiles, setTiles] = useState(() => {
    try { const s = localStorage.getItem('madzshots_rw_tiles'); return s ? JSON.parse(s) : DEFAULT_TILES } catch { return DEFAULT_TILES }
  })
  const [filter, setFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [form, setForm] = useState({ couple:'', subtitle:'', category:'planning', size:'normal', imageUrl:'' })

  useEffect(() => {
    try { localStorage.setItem('madzshots_rw_tiles', JSON.stringify(tiles)) } catch {}
  }, [tiles])

  const visible = filter === 'all' ? tiles : tiles.filter(t => t.category === filter)

  function deleteTile(id) {
    setTiles(prev => prev.filter(t => t.id !== id))
    setConfirmId(null)
  }

  function addTile() {
    if (!form.imageUrl || !form.couple) return
    const newTile = { id: uid(), type:'image', category: form.category, size: form.size, image: form.imageUrl, couple: form.couple, subtitle: form.subtitle }
    setTiles(prev => [newTile, ...prev])
    setForm({ couple:'', subtitle:'', category:'planning', size:'normal', imageUrl:'' })
    setShowModal(false)
  }

  return (
    <>
      <Navbar admin />
      <main style={{ paddingTop:'5rem' }}>
        <section className="py-[4rem]" style={{ borderBottom:'1px solid rgba(43,36,32,0.14)' }}>
          <div className="max-w-[1180px] mx-auto px-[6vw] flex items-center justify-between gap-6 flex-wrap">
            <div>
              <Eyebrow>Admin · Portfolio</Eyebrow>
              <h1 className="mt-3" style={{ fontSize:'clamp(2rem,3.4vw,2.8rem)' }}>Manage Real Weddings</h1>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 text-[0.82rem] tracking-[0.08em] uppercase text-[#FBF7F2] bg-[#6E2A35] cursor-pointer border-0 transition-colors hover:bg-[#2B2420]"
              style={{ borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
            >
              + Add Photo
            </button>
          </div>
        </section>

        <section className="py-[4rem]">
          <div className="max-w-[1180px] mx-auto px-[6vw]">
            {/* Filters */}
            <div className="flex gap-2 flex-wrap mb-8">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className="border rounded-full px-[1.1rem] py-[0.4rem] text-[0.82rem] font-medium cursor-pointer transition-all"
                  style={{ fontFamily:"'Work Sans',sans-serif", background: filter === key ? '#2B2420' : 'none', borderColor: filter === key ? '#2B2420' : '#EDE8DF', color: filter === key ? '#FBF7F2' : '#7C6F67' }}
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
                </div>
              ) : visible.map(tile => (
                <div
                  key={tile.id}
                  className={`rw-tile${tile.size === 'wide' ? ' wide' : ''} group`}
                  style={{ backgroundImage:`url(${tile.image})` }}
                >
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(43,36,32,0.85) 0%,transparent 100%)', pointerEvents:'none' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none">
                    <strong className="block text-[#FBF7F2]" style={{ fontFamily:"'Fraunces',serif", fontSize:'1rem' }}>{tile.couple}</strong>
                    <span className="text-[0.78rem]" style={{ color:'rgba(255,255,255,0.72)' }}>{tile.subtitle}</span>
                  </div>
                  {/* Delete button */}
                  <button
                    onClick={() => setConfirmId(tile.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-[rgba(43,36,32,0.7)] text-[#FBF7F2] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-0"
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center" style={{ background:'rgba(43,36,32,0.7)' }}>
          <div className="bg-[#FBF7F2] rounded-[4px] p-8 w-full max-w-[440px] relative" style={{ boxShadow:'0 24px 60px -12px rgba(0,0,0,0.4)' }}>
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-lg text-[#7a6f66] bg-transparent border-0 cursor-pointer">✕</button>
            <h3 className="mb-6" style={{ fontFamily:"'Fraunces',serif", fontSize:'1.4rem' }}>Add New Photo</h3>

            {[
              { label:'Couple / Title', key:'couple', type:'text', placeholder:'e.g. Aiza & Ramon' },
              { label:'Subtitle', key:'subtitle', type:'text', placeholder:'e.g. Garden Ceremony — Tarlac' },
              { label:'Image URL', key:'imageUrl', type:'url', placeholder:'https://...' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key} className="mb-4">
                <label className="block text-[0.78rem] tracking-[0.05em] uppercase text-[#564b43] mb-2">{label}</label>
                <input
                  type={type}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-4 py-[0.85rem] bg-transparent text-[0.95rem] text-[#2B2420] outline-none"
                  style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[0.78rem] tracking-[0.05em] uppercase text-[#564b43] mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-[0.85rem] bg-transparent text-[0.95rem] text-[#2B2420] outline-none cursor-pointer"
                  style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
                >
                  <option value="planning">Full Planning</option>
                  <option value="coordination">Day-of Coordination</option>
                  <option value="styling">Styling & Design</option>
                </select>
              </div>
              <div>
                <label className="block text-[0.78rem] tracking-[0.05em] uppercase text-[#564b43] mb-2">Size</label>
                <select
                  value={form.size}
                  onChange={e => setForm(f => ({ ...f, size: e.target.value }))}
                  className="w-full px-4 py-[0.85rem] bg-transparent text-[0.95rem] text-[#2B2420] outline-none cursor-pointer"
                  style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
                >
                  <option value="normal">Normal</option>
                  <option value="wide">Wide (2 columns)</option>
                </select>
              </div>
            </div>

            {form.imageUrl && (
              <div className="mb-6 rounded-[2px] overflow-hidden" style={{ aspectRatio:'16/7', backgroundImage:`url(${form.imageUrl})`, backgroundSize:'cover', backgroundPosition:'center' }} />
            )}

            <button
              onClick={addTile}
              disabled={!form.imageUrl || !form.couple}
              className="w-full py-[0.95rem] text-[0.82rem] tracking-[0.1em] uppercase text-[#FBF7F2] cursor-pointer border-0 transition-colors"
              style={{ background: (!form.imageUrl || !form.couple) ? '#a89c92' : '#6E2A35', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
            >
              Add to Gallery
            </button>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      {confirmId && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center" style={{ background:'rgba(43,36,32,0.7)' }}>
          <div className="bg-[#FBF7F2] rounded-[4px] p-8 w-full max-w-[360px] text-center" style={{ boxShadow:'0 24px 60px -12px rgba(0,0,0,0.4)' }}>
            <h3 className="mb-3" style={{ fontFamily:"'Fraunces',serif", fontSize:'1.3rem' }}>Remove this photo?</h3>
            <p className="text-[0.92rem] text-[#564b43] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setConfirmId(null)} className="px-6 py-3 text-[0.82rem] tracking-[0.08em] uppercase cursor-pointer bg-transparent" style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}>Cancel</button>
              <button onClick={() => deleteTile(confirmId)} className="px-6 py-3 text-[0.82rem] tracking-[0.08em] uppercase text-[#FBF7F2] cursor-pointer border-0" style={{ background:'#6E2A35', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}>Remove</button>
            </div>
          </div>
        </div>
      )}

      <Footer admin />
    </>
  )
}
