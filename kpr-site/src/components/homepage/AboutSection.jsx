import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ImageTilt } from '../../effects/ImageTilt'

const LABELS = ['The Project', 'The World', 'The Keepers']

export default function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // ── Fade + slide up the left column content ──────────────────
      gsap.from('.about-left-content', {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      })

      // ── Scale in the right column portrait ────────────────────────
      gsap.from('.about-image-tilt', {
        scale: 0.85,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          scrub: 1.5,
        },
      })

      // ── Mobile: fade out left side as section exits ───────────────
      if (isMobile) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '70%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        })
          .to('.about-left-content', { opacity: 0, y: -30 })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="project"
      ref={sectionRef}
      className="about-section relative z-10 min-h-screen bg-white text-black
                 flex flex-col md:flex-row"
    >
      {/* ═════════════════════════════════════════════════════════════
          LEFT COLUMN — 62%
      ═════════════════════════════════════════════════════════════ */}
      <div className="about-left-content w-full md:w-[62%] flex flex-col
                      justify-between px-8 md:px-14 py-16 md:py-20 gap-12">

        {/* Section badge + label list */}
        <div className="flex items-start gap-6">
          <div className="border border-black/20 px-3 py-1.5 text-[11px] font-mono shrink-0">
            02
          </div>
          <ul className="flex flex-col gap-2">
            {LABELS.map((label) => (
              <li key={label} className="text-[12px] font-mono text-black/50 tracking-widest uppercase">
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Body copy */}
        <div className="max-w-[520px]">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 tracking-tight">
            A universe built for those who dare to reimagine.
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-black/60 font-light">
            KPR is a narrative universe existing at the intersection of
            mythology, technology, and mystery. The Keepers are its guardians —
            ancient figures who stand at the threshold between what is known
            and what lies beyond. Their sigil marks every boundary crossed,
            every world reimagined.
          </p>
        </div>

        {/* Small trailer thumbnail (ImageTilt) */}
        <div className="w-48 md:w-56 h-32 md:h-36 rounded-lg overflow-hidden border border-black/10">
          <ImageTilt
            src="/images/trailer-site-media.webp"
            alt="KPR World — cinematic preview"
            tiltOptions={{ max: 12, perspective: 1200 }}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════
          RIGHT COLUMN — 38%
      ═════════════════════════════════════════════════════════════ */}
      <div className="about-image-tilt w-full md:w-[38%] min-h-[60vw] md:min-h-0
                      relative overflow-hidden">
        <ImageTilt
          src="/images/about-image.png"
          alt="Guardian of KPR — The Keeper"
          containerClass="h-full"
          tiltOptions={{ max: 12, perspective: 1200, speed: 500 }}
        />

        {/* Section number watermark */}
        <span className="absolute bottom-6 right-6 text-[10px] font-mono
                         text-black/20 tracking-[0.4em]">
          02 / 07
        </span>
      </div>
    </section>
  )
}
