import { useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ScrollProgress } from './components/ScrollProgress'
import { Loader } from './components/Loader'
import { BackToTop } from './components/BackToTop'

// Code-split: each route loads on demand.
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Process = lazy(() => import('./pages/Process'))
const RealWeddings = lazy(() => import('./pages/RealWeddings'))
const WeddingDetail = lazy(() => import('./pages/WeddingDetail'))
const FAQ = lazy(() => import('./pages/FAQ'))
const AdminLogin = lazy(() => import('./pages/AdminLogin'))
const AdminRealWeddings = lazy(() => import('./pages/AdminRealWeddings'))
const AdminHome = lazy(() => import('./pages/AdminPages').then(m => ({ default: m.AdminHome })))
const AdminAbout = lazy(() => import('./pages/AdminPages').then(m => ({ default: m.AdminAbout })))
const AdminServices = lazy(() => import('./pages/AdminPages').then(m => ({ default: m.AdminServices })))
const AdminProcess = lazy(() => import('./pages/AdminPages').then(m => ({ default: m.AdminProcess })))
const AdminFAQ = lazy(() => import('./pages/AdminPages').then(m => ({ default: m.AdminFAQ })))

function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F2]">
      <div className="text-center p-8">
        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'2.4rem' }}>Contact page coming soon</h1>
        <p className="mt-3 text-[#564b43]">For inquiries, email us at hello@madzshots.com</p>
      </div>
    </div>
  )
}

function RouteFallback() {
  return <div style={{ minHeight: '70vh', background: '#FBF7F2' }} />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/real-weddings" element={<RealWeddings />} />
            <Route path="/real-weddings/:id" element={<WeddingDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
            <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/process" element={<ProtectedRoute><AdminProcess /></ProtectedRoute>} />
            <Route path="/admin/real-weddings" element={<ProtectedRoute><AdminRealWeddings /></ProtectedRoute>} />
            <Route path="/admin/faq" element={<ProtectedRoute><AdminFAQ /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

function Shell() {
  const location = useLocation()
  const lenisRef = useRef(null)

  // smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis
    window.lenis = lenis
    let raf
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy(); delete window.lenis }
  }, [])

  // reset scroll on navigation
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true })
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <ScrollProgress />
      <AnimatedRoutes />
      <BackToTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Loader />
        <Shell />
      </AuthProvider>
    </BrowserRouter>
  )
}
