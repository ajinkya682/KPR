import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CardGallery from './CardGallery'

export default function Section5() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Text column: fade + slide up ──────────────────────────────
      gsap.from('.s5-text', {
        opacity: 0,
        y: 50,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-five',
          start: 'top 50%',
          end:   'top 20%',
          scrub: 1,
        },
      })

      // ── Gallery: fade + scale in ───────────────────────────────────
      gsap.from('.gallery', {
        opacity: 0,
        scale: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.section-five',
          start: 'top 50%',
          end:   'top 15%',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-five relative z-10 min-h-screen bg-[#0a0a0a] text-white
                 flex flex-col md:flex-row items-center px-6 md:px-12 py-20 gap-12"
    >
      {/* ── Left: Text description ────────────────────────────────── */}
      <div className="s5-text w-full md:w-[35%] flex flex-col gap-8 shrink-0">
        {/* Section label */}
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono text-white/30 tracking-[0.4em]">05 / 07</span>
          <div className="w-6 h-px bg-white/20" />
        </div>

        {/* Section badge */}
        <div className="border border-white/15 w-max px-3 py-1.5 text-[10px] font-mono tracking-widest text-white/40">
          05
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 tracking-tight">
            The Collection
          </h2>
          <p className="text-sm leading-relaxed text-white/50 font-light max-w-[360px]">
            Twelve unique Keeper cards. Each one a different guardian, a different
            threshold, a different story. The collection rotates through its
            iterations — past, present, and yet to come.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[11px] font-mono text-white/40 tracking-wider">12 UNIQUE CARDS</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            <span className="text-[11px] font-mono text-white/40 tracking-wider">3D PERSPECTIVE VIEW</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-[11px] font-mono text-white/40 tracking-wider">AUTO-ROTATING DECK</span>
          </div>
        </div>
      </div>

      {/* ── Right: 3D Card Gallery ────────────────────────────────── */}
      <div className="flex-1 w-full">
        <CardGallery />
      </div>
    </section>
  )
}
