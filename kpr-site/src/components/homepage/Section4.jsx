import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ImageTilt } from '../../effects/ImageTilt'

export default function Section4() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768
      const startY   = isMobile ? -180 : 0

      const circleTrigger = {
        trigger: sectionRef.current,
        start:   'top 25%',
        end:     'center center',
        scrub:   1,
      }

      // ── Circle 1 — outermost lavender ─────────────────────────────
      gsap.fromTo(
        '.s4-circle-1',
        { scale: 0, y: startY, transformOrigin: 'center center' },
        { scale: 1.1, y: 0, ease: 'power3.inOut', scrollTrigger: circleTrigger }
      )

      // ── Circle 2 — deep purple ────────────────────────────────────
      gsap.fromTo(
        '.s4-circle-2',
        { scale: 0, y: startY, transformOrigin: 'center center' },
        { scale: 1.2, y: 0, ease: 'power3.inOut', scrollTrigger: circleTrigger }
      )

      // ── Circle 3 — medium purple (frontmost) ──────────────────────
      gsap.fromTo(
        '.s4-circle-3',
        { scale: 0, y: startY, transformOrigin: 'center center' },
        { scale: 1.3, y: 0, ease: 'power3.inOut', scrollTrigger: circleTrigger }
      )

      // ── Portrait image: emerges from the blooming circles ─────────
      gsap.fromTo(
        '.s4-portrait',
        { scale: 0.25, opacity: 0 },
        {
          scale:   1,
          opacity: 1,
          ease:    'power3.inOut',
          scrollTrigger: circleTrigger,
        }
      )

      // ── Vertical text strip slide in from left ────────────────────
      gsap.from('.s4-vertical-text', {
        x: -40,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="keepers"
      ref={sectionRef}
      className="section-four relative z-10 min-h-screen bg-[#07000f] text-white
                 flex items-center justify-center overflow-hidden"
    >
      {/* ── Three expanding purple circles ────────────────────────── */}
      {/* Outermost: lavender bg-purple-400 */}
      <div
        className="s4-circle-1 absolute rounded-[48px] bg-purple-400"
        style={{ width: 1300, height: 1300, scale: 0 }}
      />
      {/* Middle: deep bg-purple-700 */}
      <div
        className="s4-circle-2 absolute rounded-[48px] bg-purple-700"
        style={{ width: 1300, height: 1300, scale: 0 }}
      />
      {/* Front: medium bg-purple-500 */}
      <div
        className="s4-circle-3 absolute rounded-[48px] bg-purple-500"
        style={{ width: 1300, height: 1300, scale: 0 }}
      />

      {/* ── Central portrait (The Keeper) ─────────────────────────── */}
      <div
        className="s4-portrait relative z-20 w-48 md:w-64 lg:w-72"
        style={{ aspectRatio: '2/3', opacity: 0 }}
      >
        <ImageTilt
          src="/images/section4-image.png"
          alt="The Keeper — guardian of the threshold"
          tiltOptions={{ max: 10, perspective: 1000, scale: 1.03 }}
        />
      </div>

      {/* ── Left edge: vertical rotated text ─────────────────────── */}
      <div className="s4-vertical-text absolute left-4 md:left-8 top-1/2
                      -translate-y-1/2 pointer-events-none">
        <p
          className="text-[9px] font-mono text-white/30 tracking-[0.5em] whitespace-nowrap uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Keepers — Guardians of the Threshold
        </p>
      </div>

      {/* ── Right edge: section number ────────────────────────────── */}
      <div className="absolute right-6 bottom-8 pointer-events-none">
        <p className="text-[9px] font-mono text-white/20 tracking-[0.4em]">
          04 / 07
        </p>
      </div>

      {/* ── Top right: descriptor labels ─────────────────────────── */}
      <div className="absolute top-10 right-8 flex flex-col gap-2 pointer-events-none">
        {['ARCANE', 'GUARDIAN', 'THRESHOLD'].map((label) => (
          <span
            key={label}
            className="text-[9px] font-mono text-white/25 tracking-[0.4em] text-right"
          >
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
