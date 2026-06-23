import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Process from './pages/Process'
import RealWeddings from './pages/RealWeddings'
import WeddingDetail from './pages/WeddingDetail'
import FAQ from './pages/FAQ'
import AdminLogin from './pages/AdminLogin'
import AdminRealWeddings from './pages/AdminRealWeddings'
import { AdminAbout, AdminServices, AdminProcess, AdminFAQ, AdminHome } from './pages/AdminPages'



function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F2]">
      <div className="text-center p-8">
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:'2rem' }}>Contact page coming soon</h1>
        <p className="mt-3 text-[#564b43]">For inquiries, email us at hello@madzshots.com</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
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
      </AuthProvider>
    </BrowserRouter>
  )
}
