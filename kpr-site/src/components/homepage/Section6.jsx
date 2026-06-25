import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const ACTS = [
  {
    label: 'ACT I',
    heading: 'The Threshold Was Always There.',
    body:
      'In the beginning, there was the Threshold. Not a door, not a wall — a frequency. The Keepers were born not to guard it from the world, but to hold it open for those who were ready.',
    image: '/images/section3-bg.jpg',
    imgClass: 'image-one',
    textClass: 'text-one',
  },
  {
    label: 'ACT II',
    heading: 'The Sigil Chooses Its Bearer.',
    body:
      'As the age turned, the Keepers discovered the sigil — a mark that appeared only to those who had crossed a threshold of their own making. Not earned. Revealed.',
    image: '/images/about-image.png',
    imgClass: 'image-two',
    textClass: 'text-two',
  },
  {
    label: 'ACT III',
    heading: 'Now You Stand Here.',
    body:
      'You have scrolled this far. That is not accident. The question is no longer whether you are ready. The question is: will you reimagine? Become a Keeper.',
    image: '/images/section4-image.png',
    imgClass: 'image-three',
    textClass: 'text-three',
  },
]

export default function Section6() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Total pin scroll distance = 3 viewport heights
      const totalHeight = window.innerHeight * 3

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.section-six',
          start:      'top top',
          end:        `+=${totalHeight}`,
          scrub:      true,
          pin:        true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      })

      // ── ACT I ──────────────────────────────────────────────────────
      tl.to('.text-one', {
        opacity:  1,
        y:        0,
        ease:     'none',
        duration: 0.5,
      })
      tl.to('.image-one', {
        scale:    1.15,
        opacity:  1,
        ease:     'none',
        duration: 0.5,
      }, '<0.1')

      // Pause between acts
      tl.to({}, { duration: 0.2 })

      // ── ACT II ─────────────────────────────────────────────────────
      tl.to('.text-two', {
        opacity:  1,
        y:        0,
        ease:     'none',
        duration: 0.5,
      })
      // Clip-path wipe reveal on image-two
      tl.to('.image-two', {
        opacity: 1,
        ease:    'none',
        duration: 0.5,
        onUpdate: function () {
          const progress = this.progress()
          const el = document.querySelector('.image-two')
          if (el) {
            const pct = Math.min(progress * 100 * 2, 100)
            el.style.clipPath = `polygon(0% 0%, ${pct}% 0%, ${pct}% 100%, 0% 100%)`
          }
        },
      }, '<0.1')

      tl.to({}, { duration: 0.2 })

      // ── ACT III ────────────────────────────────────────────────────
      tl.to('.text-three', {
        opacity:  1,
        y:        0,
        ease:     'none',
        duration: 0.5,
      })
      tl.to('.image-three', {
        scale:    1.4,
        opacity:  1,
        ease:     'none',
        duration: 0.5,
      }, '<0.1')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-six relative z-10 h-screen bg-[#050505] text-white
                 flex flex-col md:flex-row overflow-hidden"
    >
      {/* ═════════════════════════════════════════════════════════════
          LEFT — Three text act blocks (stacked, all initially invisible)
      ═════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center
                      px-8 md:px-16 gap-16 relative z-10">

        {ACTS.map((act, i) => (
          <div
            key={i}
            className={`${act.textClass} flex flex-col gap-4`}
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            <span className="text-[9px] font-mono text-purple-400/80 tracking-[0.5em] uppercase">
              {act.label}
            </span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight max-w-sm">
              {act.heading}
            </h3>
            <p className="text-sm leading-relaxed text-white/50 max-w-[360px] font-light">
              {act.body}
            </p>
          </div>
        ))}
      </div>

      {/* ═════════════════════════════════════════════════════════════
          RIGHT — Three images stacked absolutely (all initially invisible)
      ═════════════════════════════════════════════════════════════ */}
      <div className="w-full md:w-1/2 h-full relative overflow-hidden">

        {/* Image 1 — scale up */}
        <img
          className="image-one absolute inset-0 w-full h-full object-cover"
          src={ACTS[0].image}
          alt={ACTS[0].heading}
          draggable={false}
          loading="lazy"
          style={{ opacity: 0, scale: '0.9', transformOrigin: 'center' }}
        />

        {/* Image 2 — clip-path wipe reveal */}
        <img
          className="image-two absolute inset-0 w-full h-full object-cover"
          src={ACTS[1].image}
          alt={ACTS[1].heading}
          draggable={false}
          loading="lazy"
          style={{
            opacity: 0,
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          }}
        />

        {/* Image 3 — dramatic scale up */}
        <img
          className="image-three absolute inset-0 w-full h-full object-cover"
          src={ACTS[2].image}
          alt={ACTS[2].heading}
          draggable={false}
          loading="lazy"
          style={{ opacity: 0, scale: '0.85', transformOrigin: 'center' }}
        />

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none" />

        {/* Section number */}
        <div className="absolute bottom-6 right-6 pointer-events-none">
          <p className="text-[9px] font-mono text-white/20 tracking-[0.4em]">06 / 07</p>
        </div>
      </div>
    </section>
  )
}
