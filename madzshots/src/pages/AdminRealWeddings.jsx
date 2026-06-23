import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { supabase } from '../lib/supabase'

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>
}

// ─── Supabase table: real_weddings ───────────────────────────────────────────
// CREATE TABLE real_weddings (
//   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
//   couple      text NOT NULL,
//   subtitle    text,
//   category    text NOT NULL DEFAULT 'planning',
//   size        text NOT NULL DEFAULT 'normal',
//   image_url   text NOT NULL,
//   created_at  timestamptz DEFAULT now()
// );
// ALTER TABLE real_weddings ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Public read" ON real_weddings FOR SELECT USING (true);
// CREATE POLICY "Auth write"  ON real_weddings FOR ALL USING (auth.role() = 'authenticated');
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_TILES = [
  { id:'t1', couple:'Aiza & Ramon', subtitle:'Garden Ceremony — Tarlac', category:'planning', size:'wide', image_url:'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80' },
  { id:'t2', couple:'Aiza & Ramon', subtitle:'Full Wedding Planning', category:'planning', size:'normal', image_url:'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80' },
  { id:'t3', couple:'Bea & Carlo', subtitle:'Reception Styling', category:'styling', size:'normal', image_url:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' },
  { id:'t4', couple:'Detail Story', subtitle:'Florals & Table Design', category:'styling', size:'normal', image_url:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' },
  { id:'t5', couple:'Mika & Joaquin', subtitle:'Beachfront Vows', category:'planning', size:'normal', image_url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80' },
  { id:'t6', couple:'First Look', subtitle:'Quiet Moments', category:'coordination', size:'normal', image_url:'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80' },
  { id:'t7', couple:'Trisha & Noel', subtitle:'Full Coordination Highlights', category:'coordination', size:'wide', image_url:'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80' },
  { id:'t8', couple:'The Reception', subtitle:'Evening Celebration', category:'coordination', size:'normal', image_url:'https://images.unsplash.com/photo-1519183071298-a2962be90b53?auto=format&fit=crop&w=900&q=80' },
  { id:'t9', couple:'Nica & Paolo', subtitle:'Day-of Coordination', category:'coordination', size:'normal', image_url:'https://images.unsplash.com/photo-1525791864203-1e1d0f6bfc13?auto=format&fit=crop&w=900&q=80' },
  { id:'t10', couple:'Lia & Marco', subtitle:'Intimate Ceremony', category:'planning', size:'normal', image_url:'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80' },
  { id:'t11', couple:'Styling Detail', subtitle:'Table & Florals', category:'styling', size:'normal', image_url:'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=900&q=80' },
  { id:'t12', couple:'Nica & Paolo', subtitle:'Reception Styling', category:'styling', size:'normal', image_url:'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80' },
]

const FILTERS = [
  { key:'all',          label:'All' },
  { key:'planning',     label:'Full Planning' },
  { key:'coordination', label:'Day-of Coordination' },
  { key:'styling',      label:'Styling & Design' },
]

const EMPTY_FORM = { couple:'', subtitle:'', category:'planning', size:'normal', imageUrl:'' }

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])
  const bg = type === 'error' ? '#6E2A35' : '#2B2420'
  return (
    <div
      style={{
        position:'fixed', bottom:'1.5rem', right:'1.5rem', zIndex:9999,
        background: bg, color:'#FBF7F2', padding:'0.85rem 1.4rem',
        borderRadius:'3px', fontSize:'0.87rem', fontFamily:"'Work Sans',sans-serif",
        boxShadow:'0 8px 32px rgba(0,0,0,0.22)', maxWidth:'320px',
        animation:'fadeUp 0.25s ease',
      }}
    >
      {message}
    </div>
  )
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function TileModal({ tile, onClose, onSave, saving }) {
  const [form, setForm] = useState({
    couple:   tile?.couple   ?? '',
    subtitle: tile?.subtitle ?? '',
    category: tile?.category ?? 'planning',
    size:     tile?.size     ?? 'normal',
    imageUrl: tile?.image_url ?? '',
  })
  const isNew = !tile?.id || tile.id?.startsWith('t')

  const field = (label, key, type = 'text', placeholder = '') => (
    <div className="mb-4" key={key}>
      <label style={{ display:'block', fontSize:'0.78rem', letterSpacing:'0.05em', textTransform:'uppercase', color:'#564b43', marginBottom:'0.5rem', fontFamily:"'Work Sans',sans-serif" }}>{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        style={{ width:'100%', padding:'0.85rem 1rem', background:'transparent', fontSize:'0.95rem', color:'#2B2420', outline:'none', border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif", boxSizing:'border-box' }}
      />
    </div>
  )

  const disabled = !form.imageUrl || !form.couple || saving

  return (
    <div style={{ position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(43,36,32,0.72)' }}>
      <div style={{ background:'#FBF7F2', borderRadius:'4px', padding:'2rem', width:'100%', maxWidth:'460px', position:'relative', boxShadow:'0 24px 60px -12px rgba(0,0,0,0.4)', maxHeight:'90vh', overflowY:'auto' }}>
        <button onClick={onClose} style={{ position:'absolute', top:'1rem', right:'1rem', background:'transparent', border:'none', fontSize:'1.2rem', color:'#7a6f66', cursor:'pointer' }}>✕</button>
        <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:'1.4rem', marginBottom:'1.5rem', marginTop:0 }}>{isNew ? 'Add New Photo' : 'Edit Photo'}</h3>

        {field('Couple / Title', 'couple', 'text', 'e.g. Aiza & Ramon')}
        {field('Subtitle', 'subtitle', 'text', 'e.g. Garden Ceremony — Tarlac')}
        {field('Image URL', 'imageUrl', 'url', 'https://...')}

        {/* Category + Size */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.5rem' }}>
          {[
            { label:'Category', key:'category', opts:[['planning','Full Planning'],['coordination','Day-of Coordination'],['styling','Styling & Design']] },
            { label:'Size',     key:'size',     opts:[['normal','Normal'],['wide','Wide (2 cols)']] },
          ].map(({ label, key, opts }) => (
            <div key={key}>
              <label style={{ display:'block', fontSize:'0.78rem', letterSpacing:'0.05em', textTransform:'uppercase', color:'#564b43', marginBottom:'0.5rem', fontFamily:"'Work Sans',sans-serif" }}>{label}</label>
              <select
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                style={{ width:'100%', padding:'0.85rem 1rem', background:'transparent', fontSize:'0.95rem', color:'#2B2420', outline:'none', border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif", cursor:'pointer' }}
              >
                {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Preview */}
        {form.imageUrl && (
          <div style={{ marginBottom:'1.5rem', borderRadius:'2px', overflow:'hidden', aspectRatio:'16/7', backgroundImage:`url(${form.imageUrl})`, backgroundSize:'cover', backgroundPosition:'center' }} />
        )}

        <button
          onClick={() => onSave(form)}
          disabled={disabled}
          style={{ width:'100%', padding:'0.95rem', fontSize:'0.82rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#FBF7F2', border:'none', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif", cursor: disabled ? 'not-allowed' : 'pointer', background: disabled ? '#a89c92' : '#6E2A35', transition:'background 0.2s' }}
        >
          {saving ? 'Saving…' : isNew ? 'Add to Gallery' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdminRealWeddings() {
  const [tiles,      setTiles]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [filter,     setFilter]     = useState('all')
  const [modal,      setModal]      = useState(null)   // null | 'add' | tile-object (for edit)
  const [confirmId,  setConfirmId]  = useState(null)
  const [saving,     setSaving]     = useState(false)
  const [deleting,   setDeleting]   = useState(false)
  const [toast,      setToast]      = useState(null)   // { message, type }
  const seeded = useRef(false)

  // ── helpers ────────────────────────────────────────────────────────────────
  function showToast(message, type = 'success') {
    setToast({ message, type })
  }

  // ── load from Supabase ─────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('real_weddings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Load error:', error)
        showToast('Failed to load gallery', 'error')
        setLoading(false)
        return
      }

      // Seed defaults if table is empty (first run)
      if (data.length === 0 && !seeded.current) {
        seeded.current = true
        const rows = DEFAULT_TILES.map(({ couple, subtitle, category, size, image_url }) =>
          ({ couple, subtitle, category, size, image_url })
        )
        const { data: inserted, error: seedErr } = await supabase
          .from('real_weddings')
          .insert(rows)
          .select()

        if (seedErr) {
          console.error('Seed error:', seedErr)
        } else {
          setTiles(inserted)
        }
      } else {
        setTiles(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  // ── real-time subscription ─────────────────────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel('real_weddings_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'real_weddings' }, payload => {
        if (payload.eventType === 'INSERT') {
          setTiles(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setTiles(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
        } else if (payload.eventType === 'DELETE') {
          setTiles(prev => prev.filter(t => t.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  // ── add / edit ─────────────────────────────────────────────────────────────
  async function handleSave(form) {
    setSaving(true)
    const payload = {
      couple:    form.couple,
      subtitle:  form.subtitle,
      category:  form.category,
      size:      form.size,
      image_url: form.imageUrl,
    }

    const isEditing = modal && typeof modal === 'object' && modal.id && !modal.id.startsWith('t')

    if (isEditing) {
      const { error } = await supabase
        .from('real_weddings')
        .update(payload)
        .eq('id', modal.id)

      if (error) {
        showToast('Failed to update photo', 'error')
      } else {
        // real-time will handle state update
        showToast('Photo updated successfully')
        setModal(null)
      }
    } else {
      const { error } = await supabase
        .from('real_weddings')
        .insert(payload)

      if (error) {
        showToast('Failed to add photo', 'error')
      } else {
        showToast('Photo added to gallery')
        setModal(null)
      }
    }
    setSaving(false)
  }

  // ── delete ─────────────────────────────────────────────────────────────────
  async function handleDelete(id) {
    setDeleting(true)
    const { error } = await supabase
      .from('real_weddings')
      .delete()
      .eq('id', id)

    if (error) {
      showToast('Failed to remove photo', 'error')
    } else {
      showToast('Photo removed')
      setConfirmId(null)
    }
    setDeleting(false)
  }

  // ── render ─────────────────────────────────────────────────────────────────
  const visible = filter === 'all' ? tiles : tiles.filter(t => t.category === filter)

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(8px) }
          to   { opacity:1; transform:translateY(0) }
        }
        .rw-tile {
          position:relative; background-size:cover; background-position:center;
          aspect-ratio:4/3; border-radius:3px; overflow:hidden;
        }
        .rw-tile.wide { grid-column:span 2; aspect-ratio:16/7; }
      `}</style>

      <Navbar admin />

      <main style={{ paddingTop:'5rem' }}>
        {/* Header */}
        <section style={{ padding:'4rem 0', borderBottom:'1px solid rgba(43,36,32,0.14)' }}>
          <div style={{ maxWidth:'1180px', margin:'0 auto', padding:'0 6vw', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1.5rem', flexWrap:'wrap' }}>
            <div>
              <Eyebrow>Admin · Portfolio</Eyebrow>
              <h1 style={{ marginTop:'0.75rem', fontSize:'clamp(2rem,3.4vw,2.8rem)' }}>Manage Real Weddings</h1>
            </div>
            <button
              onClick={() => setModal('add')}
              style={{ display:'flex', alignItems:'center', gap:'0.5rem', padding:'0.75rem 1.5rem', fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#FBF7F2', background:'#6E2A35', border:'none', borderRadius:'2px', cursor:'pointer', fontFamily:"'Work Sans',sans-serif", transition:'background 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background='#2B2420'}
              onMouseLeave={e => e.currentTarget.style.background='#6E2A35'}
            >
              + Add Photo
            </button>
          </div>
        </section>

        {/* Gallery */}
        <section style={{ padding:'4rem 0' }}>
          <div style={{ maxWidth:'1180px', margin:'0 auto', padding:'0 6vw' }}>
            {/* Filters */}
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'2rem' }}>
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  style={{
                    border:`1px solid ${filter === key ? '#2B2420' : '#EDE8DF'}`,
                    borderRadius:'999px', padding:'0.4rem 1.1rem', fontSize:'0.82rem',
                    fontWeight:'500', cursor:'pointer', transition:'all 0.2s',
                    fontFamily:"'Work Sans',sans-serif",
                    background: filter === key ? '#2B2420' : 'none',
                    color: filter === key ? '#FBF7F2' : '#7C6F67',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {loading ? (
              <div style={{ textAlign:'center', padding:'5rem 0', color:'#7a6f66', fontFamily:"'Work Sans',sans-serif" }}>Loading gallery…</div>
            ) : visible.length === 0 ? (
              <div style={{ gridColumn:'1/-1', textAlign:'center', padding:'5rem 0', color:'#7a6f66', border:'2px dashed #EDE8DF', borderRadius:'8px' }}>
                <p style={{ fontSize:'1.1rem', marginBottom:'0.5rem' }}>No photos in this category</p>
                <p style={{ fontSize:'0.87rem' }}>Click "+ Add Photo" to get started</p>
              </div>
            ) : (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem' }}>
                {visible.map(tile => (
                  <div
                    key={tile.id}
                    className={`rw-tile${tile.size === 'wide' ? ' wide' : ''}`}
                    style={{ backgroundImage:`url(${tile.image_url})` }}
                  >
                    {/* Gradient overlay */}
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(43,36,32,0.85) 0%,transparent 55%)', pointerEvents:'none' }} />

                    {/* Info */}
                    <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'1rem', pointerEvents:'none' }}>
                      <strong style={{ display:'block', color:'#FBF7F2', fontFamily:"'Fraunces',serif", fontSize:'1rem' }}>{tile.couple}</strong>
                      <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.72)' }}>{tile.subtitle}</span>
                    </div>

                    {/* Action buttons — visible on hover */}
                    <div
                      className="tile-actions"
                      style={{ position:'absolute', top:'0.75rem', right:'0.75rem', display:'flex', gap:'0.4rem', opacity:0, transition:'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    >
                      {/* Edit */}
                      <button
                        onClick={() => setModal(tile)}
                        title="Edit"
                        style={{ width:'2rem', height:'2rem', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(43,36,32,0.75)', color:'#FBF7F2', border:'none', cursor:'pointer' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:'0.9rem', height:'0.9rem' }}>
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setConfirmId(tile.id)}
                        title="Remove"
                        style={{ width:'2rem', height:'2rem', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(43,36,32,0.75)', color:'#FBF7F2', border:'none', cursor:'pointer' }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width:'0.9rem', height:'0.9rem' }}>
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>

                    {/* Hover reveal trigger on whole tile */}
                    <style>{`
                      .rw-tile:hover .tile-actions { opacity: 1 !important; }
                    `}</style>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Add / Edit Modal */}
      {modal && (
        <TileModal
          tile={modal === 'add' ? null : modal}
          onClose={() => !saving && setModal(null)}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {/* Confirm Delete */}
      {confirmId && (
        <div style={{ position:'fixed', inset:0, zIndex:1001, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(43,36,32,0.7)' }}>
          <div style={{ background:'#FBF7F2', borderRadius:'4px', padding:'2rem', width:'100%', maxWidth:'360px', textAlign:'center', boxShadow:'0 24px 60px -12px rgba(0,0,0,0.4)' }}>
            <h3 style={{ fontFamily:"'Fraunces',serif", fontSize:'1.3rem', marginTop:0, marginBottom:'0.75rem' }}>Remove this photo?</h3>
            <p style={{ fontSize:'0.92rem', color:'#564b43', marginBottom:'1.5rem' }}>This action cannot be undone.</p>
            <div style={{ display:'flex', gap:'0.75rem', justifyContent:'center' }}>
              <button
                onClick={() => !deleting && setConfirmId(null)}
                style={{ padding:'0.75rem 1.5rem', fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', cursor:'pointer', background:'transparent', border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
              >Cancel</button>
              <button
                onClick={() => handleDelete(confirmId)}
                disabled={deleting}
                style={{ padding:'0.75rem 1.5rem', fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase', color:'#FBF7F2', cursor: deleting ? 'not-allowed' : 'pointer', border:'none', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif", background: deleting ? '#a89c92' : '#6E2A35' }}
              >
                {deleting ? 'Removing…' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}

      <Footer admin />
    </>
  )
}