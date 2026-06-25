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
      lerp: 0.08, // Adjust for smoothness
    })

    // ── 2. Keep GSAP ScrollTrigger in sync with Lenis ──────────
    lenis.on('scroll', ScrollTrigger.update)

    // ── 3. Add Lenis RAF to GSAP ticker ───────────────────────
    // time is in seconds (GSAP) → lenis.raf expects milliseconds
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    
    gsap.ticker.add(updateLenis)

    // Disable GSAP's built-in lag smoothing so Lenis stays in control
    gsap.ticker.lagSmoothing(0)

    // ── 4. Cleanup on unmount ──────────────────────────────────
    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
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
