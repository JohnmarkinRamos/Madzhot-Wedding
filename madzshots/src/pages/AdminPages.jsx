// Admin page wrappers — same content as public pages but with Admin navbar
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import About from './About'
import Services from './Services'
import Process from './Process'
import FAQ from './FAQ'
import Home from './Home'

// We'll just swap the Navbar to admin=true by cloning the page with admin nav override
// Since each page already imports Navbar, we'll create explicit admin pages

export function AdminAbout() {
  // Render the same content but we override Navbar with admin version
  // Easiest approach: render About page — the Navbar inside checks admin prop
  // So we need to pass it. Let's just re-export with a note that the pages
  // accept an isAdmin prop.
  return <About admin />
}

export function AdminServices() { return <Services admin /> }
export function AdminProcess() { return <Process admin /> }
export function AdminFAQ() { return <FAQ admin /> }
export function AdminHome() { return <Home admin /> }
