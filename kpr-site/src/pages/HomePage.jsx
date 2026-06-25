import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import HeroSection   from '../components/homepage/HeroSection'
import AboutSection  from '../components/homepage/AboutSection'
import Section3      from '../components/homepage/Section3'
import Section4      from '../components/homepage/Section4'
import Section5      from '../components/homepage/Section5'
import Section6      from '../components/homepage/Section6'
import Section7      from '../components/homepage/Section7'
import PreFooter     from '../components/common/PreFooter'
import Footer        from '../components/common/Footer'
import Navbar        from '../components/common/Navbar'
import Sidebar       from '../components/common/Sidebar'

// Navigation items shared between Navbar and Sidebar
const MENU_ITEMS = [
  { text: 'Project',     link: '#project'  },
  { text: 'The Keepers', link: '#keepers'  },
  { text: 'The World',   link: '#world'    },
]

export default function HomePage() {
  // Navbar border/button color flips white↔black as sections change bg
  const [borderColor, setBorderColor] = useState('rgba(255,255,255,0.2)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Refs for the global background parallax animation
  const imageRef              = useRef(null)
  const backgroundContainerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768

      // ── 1. Scale + translate the ENTIRE background container ──────────
      // Creates the "camera zooms into the sigil" effect as hero scrolls away
      gsap.to(backgroundContainerRef.current, {
        scale: isMobile ? 5 : 10,
        x: isMobile ? '0%' : '14%',
        y: isMobile ? '2%' : '22%',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end:   'bottom top',
          scrub: true,
        },
      })

      // ── 2. Arrow background image: cover → contain transition ─────────
      // As the zoom progresses, switches from cover (fills screen) to
      // contain (shows full sigil graphic) at ~80% progress
      gsap.to(imageRef.current, {
        scale: 1.2,
        ease: 'power2.out',
        onUpdate: function () {
          const progress = this.progress()
          if (imageRef.current) {
            imageRef.current.style.objectFit =
              progress < 0.75 ? 'cover' : 'contain'
          }
        },
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end:   'bottom center',
          scrub: true,
        },
      })

      // ── 3. Border color: white → black on AboutSection entry ──────────
      ScrollTrigger.create({
        trigger: '.about-section',
        start:   'top bottom',
        end:     'bottom top',
        scrub:   true,
        onUpdate: (self) => {
          setBorderColor(
            self.progress > 0
              ? 'rgba(0,0,0,0.3)'
              : 'rgba(255,255,255,0.2)'
          )
        },
      })

      // ── 4. Border color: black → white/transparent on Section3 entry ──
      ScrollTrigger.create({
        trigger: '.section-three',
        start:   'top bottom',
        end:     'bottom top',
        scrub:   true,
        onUpdate: (self) => {
          setBorderColor(
            self.progress > 0
              ? 'rgba(255,255,255,0.2)'
              : 'rgba(0,0,0,0.3)'
          )
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── Fixed UI overlays (always rendered on top) ───────────── */}
      <Navbar
        borderColor={borderColor}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={MENU_ITEMS}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={MENU_ITEMS}
      />

      {/* ── Main scroll container with global background ──────────── */}
      <main
        ref={backgroundContainerRef}
        className="relative w-full overflow-x-hidden"
        style={{ transformOrigin: 'center center' }}
      >
        {/* Global parallax background image — arrow/sigil */}
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
          <img
            ref={imageRef}
            src="/images/arrow-bg.png"
            alt=""
            draggable={false}
            className="w-full h-full object-cover"
            style={{ willChange: 'transform, object-fit' }}
          />
        </div>

        {/* ── 7 Acts ──────────────────────────────────────────────── */}
        <HeroSection  />
        <AboutSection />
        <Section3     />
        <Section4     />
        <Section5     />
        <Section6     />
        <Section7     />

        {/* ── Footer zone ─────────────────────────────────────────── */}
        <PreFooter />
        <Footer    />
      </main>
    </>
  )
}
