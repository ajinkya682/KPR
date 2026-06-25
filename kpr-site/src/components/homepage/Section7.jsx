import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ImageTilt } from '../../effects/ImageTilt'

export default function Section7() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: '.section-seven',
        start:   'top 55%',
        end:     'top 5%',
        scrub:   true,
      }

      // Scale-up elements (heading + portrait)
      gsap.from('.s7-scale-up', {
        scale:   0,
        opacity: 0,
        ease:    'power3.out',
        scrollTrigger: st,
      })

      // Fade + slide-up elements (CTA box, description)
      gsap.from('.s7-fade-up', {
        opacity: 0,
        y:       120,
        ease:    'power3.out',
        stagger: 0.1,
        scrollTrigger: st,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="keepers-cta"
      ref={sectionRef}
      className="section-seven relative z-10 min-h-screen bg-[#07000f] text-white
                 flex flex-col justify-between px-6 md:px-14 py-16 overflow-hidden"
    >
      {/* ── Giant KEEPERS heading ──────────────────────────────────── */}
      <h2
        className="s7-scale-up font-['HexaFrame'] text-[13vw] md:text-[11vw] lg:text-[10vw]
                   leading-none tracking-tighter text-white/90 pointer-events-none select-none"
      >
        KEEPERS
      </h2>

      {/* ── Main content area: portrait + CTA ─────────────────────── */}
      <div className="flex flex-col md:flex-row items-end justify-between gap-10 flex-1 pt-10">

        {/* Left: vertical text strip + CTA ────────────────────────── */}
        <div className="flex items-end gap-8">
          {/* Vertical text strip */}
          <div className="hidden md:block">
            <p
              className="text-[9px] font-mono text-white/25 tracking-[0.5em] whitespace-nowrap uppercase"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              Join the Order — Become a Keeper
            </p>
          </div>

          {/* CTA box */}
          <div
            className="s7-fade-up border border-white/10 rounded-xl p-8 max-w-sm
                       bg-white/[0.03] backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-3 tracking-tight">Become a Keeper</h3>
            <p className="text-sm leading-relaxed text-white/50 mb-6 font-light">
              The Keeper sigil is not given — it is claimed. Step through the threshold
              and join the guardians of the boundary between worlds.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-white text-black text-sm font-semibold
                         px-6 py-3 rounded-full hover:scale-105 hover:bg-purple-100 transition-all duration-200"
            >
              Join Now
              <span className="text-base">→</span>
            </a>
          </div>
        </div>

        {/* Right: The Prime Keeper portrait ───────────────────────── */}
        <div
          className="s7-scale-up w-48 md:w-64 lg:w-80 shrink-0 self-center md:self-end"
          style={{ aspectRatio: '2/3' }}
        >
          <ImageTilt
            src="/images/section7-image.png"
            alt="The Prime Keeper"
            tiltOptions={{ max: 10, perspective: 1200, scale: 1.04 }}
          />
        </div>
      </div>

      {/* ── Bottom descriptors ────────────────────────────────────── */}
      <div className="s7-fade-up flex items-end justify-between pt-10">
        <p className="text-[9px] font-mono text-white/20 tracking-[0.4em]">07 / 07</p>
        <div className="flex gap-6">
          {['ARCANE', 'GUARDIAN', 'ETERNAL'].map((tag) => (
            <span key={tag} className="text-[8px] font-mono text-white/15 tracking-[0.4em]">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
