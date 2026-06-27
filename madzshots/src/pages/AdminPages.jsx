// Admin page wrappers — passes admin prop so each page uses admin nav
import About from './About'
import Services from './Services'
import Process from './Process'
import FAQ from './FAQ'
import Home from './Home'

export function AdminAbout() { return <About admin /> }

export function AdminServices() { return <Services admin /> }
export function AdminProcess() { return <Process admin /> }
export function AdminFAQ() { return <FAQ admin /> }
export function AdminHome() { return <Home admin /> }
