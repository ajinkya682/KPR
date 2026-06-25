import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation — cascade in from below on page load
      gsap.from(
        [
          '.hero-descriptor',
          '.hero-heading-keep',
          '.hero-heading-reimagine',
          '.hero-counter',
        ],
        {
          y:        60,
          opacity:  0,
          stagger:  0.15,
          duration: 1.2,
          ease:     'power3.out',
          delay:    0.3,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative z-20 h-screen flex flex-col justify-between
                 pt-28 pb-10 px-8 md:px-12 lg:pl-20 text-white overflow-hidden"
    >
      {/* ── Top: Descriptor paragraph ─────────────────────────────── */}
      <div className="hero-descriptor max-w-[300px]">
        <div className="w-10 h-px bg-white/30 mb-4" />
        <p className="text-xs font-mono leading-relaxed text-white/60 tracking-wide">
          An immersive scroll experience into the world of the&nbsp;Keepers.
          Explore the project, the universe, and the lore behind the sigil.
        </p>
      </div>

      {/* ── Center / Main: Giant typographic headings ─────────────── */}
      <div className="flex flex-col gap-0 leading-none">
        <h1
          className="hero-heading-keep font-['HexaFrame'] text-[13vw] leading-[0.9]
                     tracking-tighter text-white text-left"
        >
          KEEP
        </h1>
        <h1
          className="hero-heading-reimagine font-['HexaFrame'] text-[13vw] leading-[0.9]
                     tracking-tighter text-white text-right self-stretch"
        >
          REIMAGINE
        </h1>
      </div>

      {/* ── Bottom: Section counter ───────────────────────────────── */}
      <div className="hero-counter flex items-center gap-4">
        <span className="text-[10px] font-mono text-white/40 tracking-[0.3em]">
          01 / 07
        </span>
        <div className="flex-1 h-px bg-white/10 max-w-[120px]" />
        <span className="text-[10px] font-mono text-white/30 tracking-widest">
          SCROLL
        </span>
      </div>
    </section>
  )
}
