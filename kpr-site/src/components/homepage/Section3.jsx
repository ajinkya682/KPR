import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const DATA_ROWS = [
  { label: 'LOCATION',    value: '48°52\'N — 002°21\'E',          hasVideo: true  },
  { label: 'SECTOR',      value: 'ALPHA-7 / THRESHOLD BOUNDARY',  hasImage: true  },
  { label: 'STATUS',      value: 'ACTIVE — KEEPER PROTOCOL ENGAGED' },
  { label: 'SIGIL CLASS', value: 'PRIME / UNRESTRICTED ACCESS'    },
]

export default function Section3() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // ── Main s3-image: scale from 0 → 1.1 as section scrolls up ───
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-three',
          start: 'top 30%',
          end:   'top -30%',
          scrub: true,
        },
      }).fromTo(
        '.s3-image',
        {
          scale: 0,
          y: isMobile ? -150 : 0,
          transformOrigin: 'center center',
          opacity: 0,
        },
        {
          scale:   1.05,
          y:       0,
          opacity: 1,
          ease:    'power3.inOut',
        }
      )

      // ── Data rows: stagger fade in ─────────────────────────────────
      gsap.from('.s3-row', {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.s3-data-grid',
          start:   'top 80%',
          end:     'top 40%',
          scrub: true,
        },
      })

      // ── Handoff: scale image back to 0 when Section4 enters ───────
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section-four',
          start: 'top 20%',
          end:   'center center',
          scrub: true,
        },
      }).to('.s3-image', {
        scale:   0,
        opacity: 0,
        ease:    'power3.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="world"
      ref={sectionRef}
      className="section-three relative z-10 min-h-screen bg-[#0a0a0a] text-white
                 flex flex-col items-center justify-center px-6 md:px-12 py-20 gap-16"
    >
      {/* ── Section label ─────────────────────────────────────────── */}
      <div className="self-start flex items-center gap-4">
        <span className="text-[10px] font-mono text-white/30 tracking-[0.4em]">03 / 07</span>
        <div className="w-8 h-px bg-white/20" />
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">Scene Reveal</span>
      </div>

      {/* ── Hero scene image (scale from 0 on scroll) ─────────────── */}
      <div className="s3-image w-full max-w-5xl aspect-video rounded-xl overflow-hidden
                      border border-white/10 shadow-2xl"
        style={{ transformOrigin: 'center center' }}
      >
        <img
          src="/images/section3-bg.jpg"
          alt="The KPR World — ancient mystical ruins"
          draggable={false}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* ── Data coordinate grid ──────────────────────────────────── */}
      <div className="s3-data-grid w-full max-w-5xl border-t border-white/10">
        {DATA_ROWS.map((row, index) => (
          <div
            key={index}
            className="s3-row flex items-center justify-between gap-6
                       py-4 border-b border-white/5 flex-wrap"
          >
            {/* Label */}
            <span className="text-[10px] font-mono text-white/30 tracking-[0.3em] w-28 shrink-0">
              {row.label}
            </span>

            {/* Value */}
            <span className="text-xs font-mono text-white/70 flex-1">
              {row.value}
            </span>

            {/* Optional media element */}
            {row.hasVideo && (
              <div className="w-32 h-20 rounded overflow-hidden border border-white/10 shrink-0">
                <img
                  src="/images/trailer-site-media.webp"
                  alt="KPR clip"
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            )}
            {row.hasImage && (
              <div className="w-24 h-16 rounded overflow-hidden border border-white/10 shrink-0">
                <img
                  src="/images/section3-image.png"
                  alt="Arcane artifact"
                  className="w-full h-full object-cover opacity-70"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
