import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ShuffleText } from '../../effects/ShuffleText'

export default function Navbar({
  borderColor,
  isSidebarOpen,
  setIsSidebarOpen,
  menuItems = [],
}) {
  const [progressWidth, setProgressWidth] = useState('0%')
  const navRef     = useRef(null)
  const loginRef   = useRef(null)
  const logoRef    = useRef(null)

  // ── Scroll progress bar ──────────────────────────────────────────────
  useEffect(() => {
    const updateProgress = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      if (totalHeight <= 0) return
      const pct = (window.scrollY / totalHeight) * 100
      setProgressWidth(`${pct}%`)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  // ── GSAP color transition: white ↔ black across AboutSection ─────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.about-section',
        start:   'top 80px',         // when about-section top hits nav bottom
        end:     'bottom 80px',
        scrub:   true,
        onUpdate: (self) => {
          const inAbout = self.progress > 0

          // Nav text color
          gsap.to(navRef.current, {
            color:    inAbout ? '#000000' : '#ffffff',
            duration: 0.15,
          })
          // Login button flip
          gsap.to(loginRef.current, {
            backgroundColor: inAbout ? '#000000' : '#ffffff',
            color:           inAbout ? '#ffffff' : '#000000',
            duration: 0.15,
          })
          // Logo color
          gsap.to(logoRef.current, {
            color:    inAbout ? '#000000' : '#ffffff',
            duration: 0.15,
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 text-white"
      style={{ pointerEvents: 'none' }}
    >
      {/* ── Scroll progress bar — 3px strip at very top ─────────────── */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-purple-500 transition-all duration-100"
        style={{ width: progressWidth }}
      />

      {/* ── Nav inner layout ─────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-4"
        style={{
          borderBottom: `1px solid ${borderColor}`,
          pointerEvents: 'none',
        }}
      >
        {/* Logo */}
        <span
          ref={logoRef}
          className="font-['HexaFrame'] text-2xl tracking-tight hidden md:block text-white"
          style={{ pointerEvents: 'auto' }}
        >
          KPR
        </span>

        {/* Desktop menu items */}
        <ul
          className="hidden md:flex gap-8 items-center"
          style={{ pointerEvents: 'auto' }}
        >
          {menuItems.map((item) => (
            <li key={item.text}>
              <a
                href={item.link}
                className="text-[13px] font-mono tracking-wider opacity-70 hover:opacity-100 transition-opacity"
              >
                <ShuffleText text={item.text} speed={30} />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: login + hamburger */}
        <div className="flex items-center gap-4" style={{ pointerEvents: 'auto' }}>
          <button
            ref={loginRef}
            className="hidden md:block bg-white text-black text-[12px] font-semibold
                       px-5 py-2 rounded-full hover:scale-105 transition-transform tracking-wider"
          >
            Sign In
          </button>

          {/* Hamburger — always visible */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Open menu"
          >
            <span
              className="block w-6 h-[1.5px] bg-current transition-all duration-300"
              style={{ transform: isSidebarOpen ? 'rotate(45deg) translate(4px, 4.5px)' : 'none' }}
            />
            <span
              className="block w-6 h-[1.5px] bg-current transition-all duration-300"
              style={{ opacity: isSidebarOpen ? 0 : 1 }}
            />
            <span
              className="block w-4 h-[1.5px] bg-current transition-all duration-300"
              style={{ transform: isSidebarOpen ? 'rotate(-45deg) translate(2.5px, -3px)' : 'none' }}
            />
          </button>
        </div>
      </div>
    </nav>
  )
}
