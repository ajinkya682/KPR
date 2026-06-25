import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import HomePage from './pages/HomePage'
import './index.css'

// Register GSAP plugin once at module level (before any component mounts)
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    // ── 1. Initialize Lenis smooth scroll ──────────────────────
    const lenis = new Lenis({
      smoothing: 0,
      lerp: 0.1,
    })

    // ── 2. Keep GSAP ScrollTrigger in sync with Lenis ──────────
    lenis.on('scroll', ScrollTrigger.update)

    // ── 3. Add Lenis RAF to GSAP ticker ───────────────────────
    // time is in seconds (GSAP) → lenis.raf expects milliseconds
    // multiplying by 800 instead of 1000 adds a subtle organic ease
    gsap.ticker.add((time) => {
      lenis.raf(time * 800)
    })

    // Disable GSAP's built-in lag smoothing so Lenis stays in control
    gsap.ticker.lagSmoothing(0)

    // ── 4. Cleanup on unmount ──────────────────────────────────
    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}
