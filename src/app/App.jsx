import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowRight, Leaf, Menu, X } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const HomePage = lazy(() => import('../pages/HomePage.jsx'))
const EducationPage = lazy(() => import('../pages/EducationPage.jsx'))
const CalculatorPage = lazy(() => import('../pages/CalculatorPage.jsx'))
const QuizPage = lazy(() => import('../pages/QuizPage.jsx'))
const ArticlesPage = lazy(() => import('../pages/ArticlesPage.jsx'))
const ArticleDetailPage = lazy(() => import('../pages/ArticlesPage.jsx').then((module) => ({ default: module.ArticleDetailPage })))

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  ['/', 'Beranda'],
  ['/belajar', 'Jelajahi'],
  ['/kalkulator', 'Jejak karbon'],
  ['/kuis', 'Kuis'],
  ['/artikel', 'Artikel'],
]

function Navigation() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="PahamIklim — beranda">
          <span className="brand-mark"><Leaf size={18} strokeWidth={2.4} /></span>
          <span>paham<span className="brand-light">iklim</span></span>
        </Link>
        <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Navigasi utama">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>
          ))}
          <Link className="nav-cta" to="/kalkulator">Mulai eksplorasi <ArrowRight size={15} /></Link>
        </nav>
        <button className="mobile-menu" aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link to="/" className="brand"><span className="brand-mark"><Leaf size={18} /></span><span>paham<span className="brand-light">iklim</span></span></Link>
        <p>Memahami Bumi adalah langkah pertama untuk menjaganya.</p>
        <Link to="/belajar" className="footer-link">Mulai belajar <ArrowRight size={15} /></Link>
      </div>
      <div className="footer-bottom"><span>© 2026 PahamIklim · Proyek edukasi independen</span><span>Konten edukasi · Tanpa akun · Tanpa backend</span></div>
    </footer>
  )
}

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

function RouteFallback() {
  return <div className="route-loading" role="status">Menyiapkan cerita iklim...</div>
}

export default function App() {
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    if (reducedMotion) return undefined
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.15 })
    let frame
    const tick = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)
    return () => {
      cancelAnimationFrame(frame)
      if (typeof lenis.destroy === 'function') lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <>
      <ScrollReset />
      <Navigation />
      <main>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/belajar" element={<EducationPage />} />
            <Route path="/kalkulator" element={<CalculatorPage />} />
            <Route path="/kuis" element={<QuizPage />} />
            <Route path="/artikel" element={<ArticlesPage />} />
            <Route path="/artikel/:id" element={<ArticleDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
