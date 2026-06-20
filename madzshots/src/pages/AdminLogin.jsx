import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoIcon } from '../components/LogoIcon'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  async function handleLogin() {
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError('Invalid email or password')
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen grid" style={{ gridTemplateColumns:'1.1fr 0.9fr' }}>
      {/* Left brand panel */}
      <div className="relative overflow-hidden flex flex-col justify-end p-16 text-[#FBF7F2]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:"url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize:'cover', backgroundPosition:'center', filter:'brightness(0.75)',
          }}
        />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(43,36,32,0.15) 0%,rgba(43,36,32,0.25) 45%,rgba(43,36,32,0.85) 100%)' }} />
        <div className="absolute top-12 left-16 z-10 flex items-center gap-2" style={{ fontFamily:"'Fraunces',serif", fontSize:'1.2rem', fontWeight:600 }}>
          <LogoIcon className="w-[26px] h-[26px]" style={{ filter:'brightness(10)' }} />
          <span className="text-[#FBF7F2]">Madzshots Weddings</span>
        </div>
        <div className="relative z-10">
          <span className="flex items-center gap-3 mb-5 text-[0.72rem] tracking-[0.22em] uppercase text-[#B79257] font-semibold">
            <span className="inline-block w-[22px] h-px bg-[#B79257]" />
            Studio Admin
          </span>
          <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'clamp(2.2rem,3.6vw,3.2rem)', lineHeight:1.08, maxWidth:'18ch' }}>
            Your story, <em style={{ fontStyle:'italic', color:'#e3b9bf' }}>beautifully</em> managed.
          </h1>
          <p className="mt-5 max-w-[32ch] text-[0.98rem]" style={{ color:'rgba(251,247,242,0.78)' }}>
            Sign in to manage bookings, galleries, and inquiries for Madzshots Weddings & Events.
          </p>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex items-center justify-center p-12 bg-[#FBF7F2]">
        <div className="w-full max-w-[380px]">
          <span className="flex items-center gap-3 mb-4 text-[0.72rem] tracking-[0.22em] uppercase text-[#6E2A35] font-semibold">
            <span className="inline-block w-[22px] h-px bg-[#B79257]" />
            Welcome Back
          </span>
          <h2 className="mb-2" style={{ fontFamily:"'Fraunces',serif", fontSize:'2rem' }}>Admin Login</h2>
          <p className="mb-8 text-[0.92rem] text-[#7a6f66]">Enter your credentials to access the dashboard.</p>

          <label className="block text-[0.78rem] tracking-[0.05em] uppercase text-[#564b43] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-[0.85rem] bg-transparent text-[0.95rem] text-[#2B2420] outline-none transition-colors mb-5"
            style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
            onFocus={e => e.target.style.borderColor='#6E2A35'}
            onBlur={e => e.target.style.borderColor='rgba(43,36,32,0.14)'}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          <label className="block text-[0.78rem] tracking-[0.05em] uppercase text-[#564b43] mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-[0.85rem] bg-transparent text-[0.95rem] text-[#2B2420] outline-none transition-colors"
            style={{ border:'1px solid rgba(43,36,32,0.14)', borderRadius:'2px', fontFamily:"'Work Sans',sans-serif" }}
            onFocus={e => e.target.style.borderColor='#6E2A35'}
            onBlur={e => e.target.style.borderColor='rgba(43,36,32,0.14)'}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-8 py-[0.95rem] text-[0.82rem] tracking-[0.1em] uppercase transition-colors cursor-pointer border-0"
            style={{ background: loading ? '#9a4a54' : '#6E2A35', color:'#FBF7F2', fontFamily:"'Work Sans',sans-serif", borderRadius:'2px' }}
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {error && <p className="mt-4 text-[0.86rem] text-[#a83b3b]">{error}</p>}

          <p className="mt-6 text-[0.8rem] text-[#7a6f66] text-center">
            Use your Supabase admin credentials to log in.
          </p>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media(max-width:880px){
          .min-h-screen.grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
