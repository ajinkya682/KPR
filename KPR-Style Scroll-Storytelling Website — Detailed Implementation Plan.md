# KPR-Style Scroll-Storytelling Website — Detailed Implementation Plan

## Project Overview

A premium, award-winning scroll-storytelling React website using **GSAP + ScrollTrigger + Lenis** for smooth scroll animations, inspired by the KPR Words site (kprwords.com). Fully responsive with a dark aesthetic.

---

## Tech Stack

- **Vite + React (JSX)**
- **Tailwind CSS v4**
- **GSAP + ScrollTrigger**
- **Lenis** (smooth scrolling)
- **React Router DOM**

---

## Phase 1: Project Setup

### 1.1 Initialize Project
```bash
npm create vite@latest my-app
cd my-app
code .
npm run dev
```

### 1.2 Install Dependencies
```bash
npm install gsap lenis react-router-dom
npm install tailwindcss @tailwindcss/vite
```

### 1.3 Vite Config — Add Tailwind Plugin
```js
// vite.config.js
import tailwindcss from '@tailwindcss/vite'
export default { plugins: [tailwindcss()] }
```

### 1.4 index.css — Add Tailwind Directive + Custom Fonts
```css
@import "tailwindcss";
/* Add your HexaFrame / custom font imports here */
```

---

## Phase 2: App-Level Setup (App.jsx)

### 2.1 Lenis Smooth Scroll + GSAP Integration
```jsx
// App.jsx
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import HomePage from './pages/HomePage'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ smoothing: 0 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 800)
    })
    return () => lenis.destroy()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}
```

---

## Phase 3: Folder Structure

```
src/
├── pages/
│   └── HomePage.jsx
├── components/
│   ├── homepage/
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── Section3.jsx
│   │   ├── Section4.jsx
│   │   ├── Section5.jsx
│   │   ├── Section6.jsx
│   │   ├── Section7.jsx
│   │   └── CardGallery.jsx
│   └── common/
│       ├── Navbar.jsx
│       ├── Sidebar.jsx
│       ├── MiniSidebar.jsx
│       ├── PreFooter.jsx
│       └── Footer.jsx
├── effects/
│   ├── ImageTilt.jsx
│   ├── ShuffleText.jsx
│   └── MusicBarIcon.jsx
└── assets/
    └── images/   (all PNG/WEBP/JPG assets)
```

---

## Phase 4: HomePage.jsx

### 4.1 State & Refs
```jsx
const [borderColor, setBorderColor] = useState('#fff3')
const [isSidebarOpen, setIsSidebarOpen] = useState(false)
const imageRef = useRef(null)
const backgroundContainerRef = useRef(null)
```

### 4.2 Menu Items Array
```jsx
const menuItems = [
  { text: 'Project', link: '#project' },
  { text: 'The Keepers', link: '#keepers' },
  { text: 'The World', link: '#world' },
]
```

### 4.3 Root Layout
```jsx
<main className="relative w-full px-2 inset-0 w-full h-full z-0 overflow-hidden"
  ref={backgroundContainerRef}>
  <img src="/images/arrow-bg.png" ref={imageRef}
    className="h-full w-full object-cover scale-[1.2] transition-transform duration-300" />
  <HeroSection />
  <AboutSection />
  <Section3 />
  <Section4 />
  <Section5 />
  <Section6 />
  <Section7 />
  <PreFooter />
  <Footer />
  <Navbar borderColor={borderColor} isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen} menuItems={menuItems} />
  <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}
    menuItems={menuItems} />
</main>
```

### 4.4 HomePage Background Parallax Animation (useEffect)
```jsx
useEffect(() => {
  gsap.to(backgroundContainerRef.current, {
    keyframes: {
      scale: [window.innerWidth > 768 ? 10 : 5],
      x: window.innerWidth > 768 ? '14%' : '0%',
      y: window.innerWidth > 768 ? '22%' : '2%',
    },
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  gsap.to(imageRef.current, {
    scale: 1.2,
    width: '36rem',
    height: '36rem',
    objectFit: 'contain',
    ease: 'power2.out',
    onUpdate: function() {
      const progress = this.progress()
      if (imageRef.current) {
        imageRef.current.style.objectFit =
          progress < 0.8 ? 'cover' :
          progress < 1 ? (progress > 0.75 ? 'contain' : 'cover') : 'contain'
      }
    },
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom center',
      scrub: true,
    }
  })
}, [])
```

### 4.5 ScrollTrigger Border Color Updates
```jsx
// Create one ScrollTrigger per major section transition
ScrollTrigger.create({
  trigger: '.about-section',
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    const progress = self.progress
    setBorderColor(progress > 0 ? 'black' : 'white')
  }
})
// Repeat pattern for section-3, section-4
```

---

## Phase 5: Effects

### 5.1 ImageTilt.jsx
**What it does:** On mouse hover, the image rotates in 3D space based on mouse position.

```jsx
export const ImageTilt = ({ src, alt, className, tiltOptions }) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  const defaultOptions = {
    max: 15,
    perspective: 1000,
    scale: 1.05,
    speed: 400,
  }
  const { max, perspective, scale, speed } = { ...defaultOptions, ...tiltOptions }

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    const rotateX = (mouseY / rect.height * max).toFixed(2)
    const rotateY = (mouseX / rect.width * max).toFixed(2)
    setTransform(`perspective(${perspective}px) scale3D(${scale},${scale},${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
  }, [max, perspective, scale])

  const handleMouseLeave = useCallback(() => {
    setTransform(`perspective(${perspective}px) scale3D(1,1,1) rotateX(0deg) rotateY(0deg)`)
  }, [perspective])

  return (
    <div ref={cardRef}
      className={`tilt-container relative w-full h-full transition-transform duration-[${speed}ms]`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: `transform ${speed}ms cubic-bezier(0.03,0,0.98,0.9)`,
      }}>
      <img src={src} alt={alt}
        className={`w-full h-full object-cover rounded-lg ${className}`}
        style={{ transform: 'translateZ(20px)', willChange: 'transform', draggable: false }} />
    </div>
  )
}
```

### 5.2 ShuffleText.jsx
**What it does:** On hover, characters scramble randomly before resolving to the real word.

```jsx
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@#$%^&*+{}:,./;='

export const ShuffleText = ({ text, className, speed = 40 }) => {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    clearInterval(intervalRef.current)
    let iterations = 0

    intervalRef.current = setInterval(() => {
      setDisplayText(prev =>
        prev.split('').map((char, index) => {
          if (index < iterations) return text[index]
          return LETTERS[Math.floor(Math.random() * LETTERS.length)]
        }).join('')
      )
      iterations += 1 / 3
      if (iterations >= text.length) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, speed)
  }, [text, speed])

  return (
    <span className={className} onMouseEnter={handleMouseEnter}>
      {displayText}
    </span>
  )
}
```

### 5.3 MusicBarIcon.jsx
**What it does:** Animated equalizer bars; clicking plays/pauses ambient audio.

```jsx
export default function MusicBarIcon({ color = 'white' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [barHeights, setBarHeights] = useState([0.5, 0.5, 0.5, 0.5, 0.5])
  const audioRef = useRef(null)
  const animationRef = useRef(null)

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/bg.mp3')
      audioRef.current.loop = true
    }
    if (isPlaying) {
      audioRef.current.pause()
      clearInterval(animationRef.current)
      setBarHeights([0.5, 0.5, 0.5, 0.5, 0.5])
    } else {
      audioRef.current.play()
      animationRef.current = setInterval(() => {
        setBarHeights(prev => prev.map(() => {
          const scale = 0.4 + Math.random() * 0.8
          return Math.random() > 0.5 ? scale : -scale
        }))
      }, 200)
    }
    setIsPlaying(prev => !prev)
  }

  return (
    <button onClick={togglePlay}
      className="flex items-center h-5 w-5 p-1 bg-transparent cursor-pointer">
      {barHeights.map((scale, index) => (
        <div key={index}
          className="mx-px w-[2px] rounded transition-transform duration-200"
          style={{
            height: '10px',
            backgroundColor: color,
            transform: `scaleY(${scale})`,
          }} />
      ))}
    </button>
  )
}
```

---

## Phase 6: Component-by-Component Build

### 6.1 HeroSection.jsx

**Visual:** Full-screen hero with two large text headings ("KEEP" / "REIMAGINE"), a top-left descriptor paragraph, and bottom-left numbering.

**Key classes:**
- Section: `relative h-screen z-20 pt-24 px-8 pl-28 md:pt-16 md:px-2 flex flex-col justify-between gap-8 pb-8 text-white`
- H1 headings: `text-[13vw] font-[HexaFrame]` — two of them, staggered left/right

**Animation (GSAP):**
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.about-section, .section-title', {
      y: 50, opacity: 0, stagger: 0.2, duration: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 5%',
      }
    })
  })
  return () => ctx.revert()
}, [])
```

---

### 6.2 AboutSection.jsx

**Visual:** Two-column layout. Left: numbered section labels + large description paragraph. Right: tiltable image (ImageTilt). On mobile, stacks vertically.

**Key layout:**
```
[Left 62% wide, 86vh tall]
  - Top: section number badge + label list (mapped array)
  - Bottom: image thumbnail (ImageTilt, small)
[Right 37% wide, 86vh tall]
  - Full ImageTilt image
```

**Animation (GSAP ScrollTrigger):**
```jsx
gsap.from('.about-section', {
  opacity: 0, y: 50,
  scrollTrigger: { trigger: sectionRef.current, start: 'top 5%', scrub: true }
})
gsap.from('.image-tilt', {
  scale: 0,
  scrollTrigger: { trigger: sectionRef.current, start: 'top 5%', scrub: true }
})
```

**Mobile animation (width < 768):**
```jsx
if (window.innerWidth < 768) {
  gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: '0%', scrub: true,
    }
  })
  .to('.left-side', { opacity: 0 })
  .to('.image-tilt', { opacity: 0 })
}
```

---

### 6.3 Section3.jsx (Scroll Scene Reveal)

**Visual:** A large image (section3-bg.png) that scales up from 0 as you scroll — the "scene opens" effect. Below it, a grid of data rows (coordinate-style text) with a small video embed.

**Key layout:**
```
[Fixed background image — scales from 0→1 on scroll]
[Content rows]
  Row 1: text columns + small inline video
  Row 2: text columns + image
  Row 3: more text columns
```

**Animation:**
```jsx
const scaleUpAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '.section-three',
    start: 'top 30%',
    end: 'top -30%',
    scrub: true,
  }
})
scaleUpAnimation.fromTo('.s3-image', {
  scale: 0,
  y: window.innerWidth < 768 ? -200 : 0,
  transformOrigin: 'center',
}, {
  scale: 1.1,
  y: 0,
  ease: 'power3.inOut',
})
```

**Section 4 image reveal:**
```jsx
gsap.timeline({
  scrollTrigger: {
    trigger: '.section-four',
    start: 'top 20%',
    end: 'center center',
    scrub: true,
  }
}).to('.image', { scale: 0, ease: 'power3.inOut' })
```

---

### 6.4 Section4.jsx (Expanding Circles)

**Visual:** Three colored circles (purple tones, different sizes) expand from scale 0 as user scrolls. Behind a portrait image. Vertical text rotated 270° on the side.

**Key elements:**
- 3x `<div>` circles: `absolute w-[1300px] h-[1300px] scale-0 rounded-xl`
- Colors: `bg-purple-400`, `bg-purple-600`, `bg-purple-500`
- Vertical text strip: `rotate-[270deg]`
- Portrait image: `ImageTilt` component

**Animation:**
```jsx
// Circle 1
gsap.fromTo('.bg-block-1', {
  scale: 0,
  y: window.innerWidth < 768 ? -200 : 0,
  transformOrigin: 'center',
}, {
  scale: 1.1, y: 0, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.section-four', start: 'top 20%', end: 'center center', scrub: 1 }
})
// Circle 2 — same but scale: 1.2
// Circle 3 — same but scale: 1.3
```

**Fixed image overlay:**
```jsx
gsap.fromTo('.fixed-image', {
  display: 'block', scale: 0.3, opacity: 0,
}, {
  scale: 1, opacity: 1, duration: 1, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.section-four', start: 'top 20%', end: 'center center', scrub: 1 }
})
```

---

### 6.5 Section5.jsx (Card Gallery)

**Visual:** Left: text description with numbered badge. Right: the `CardGallery` component showing 3D perspective card rotation.

**CardGallery.jsx logic:**
```jsx
// Left/Right perspective arrays define how much each card rotates on X and Z
const leftPerspectives = [
  { x: -10, z: -4 }, { x: -20, z: -8 }, /* ... 6 entries */
]
const rightPerspectives = [
  { x: 10, z: -4 }, { x: 20, z: -8 }, /* ... 6 entries (positive X) */
]

// Auto-advance counter every 1 second
useEffect(() => {
  const interval = setInterval(() => {
    setLeftCounter(prev => prev.map(c => c >= 6 ? 1 : c + 1))
    setRightCounter(prev => prev.map(c => c >= 6 ? 1 : c + 1))
  }, 1000)
  return () => clearInterval(interval)
}, [])

// Compute transform per card
const getLeftTransform = (index) => {
  const perspective = leftPerspectives[rightCounter[index] - 1]
  return `translate3D(${perspective.x}rem, 0, ${perspective.z}rem)`
}
```

**Gallery renders 6 left images + 6 right images** from `left-N.webp` and `right-N.webp` assets.

**ScrollTrigger animation:**
```jsx
gsap.from('.section-five .text', {
  opacity: 0, y: 50, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.section-five', start: 'top 40%', end: 'top bottom', scrub: 1 }
})
gsap.from('.gallery', {
  opacity: 0, scale: 0, ease: 'power3.inOut',
  scrollTrigger: { trigger: '.section-five', start: 'top 40%', end: 'top bottom', scrub: 1 }
})
```

---

### 6.6 Section6.jsx (Pinned Scroll Storytelling)

**Visual:** This is the hero scroll-pinning section. The section **pins in place** while you scroll through 3 text+image pairs that animate in sequence.

**Pin setup:**
```jsx
const totalHeight = window.innerHeight * 3

gsap.timeline({
  scrollTrigger: {
    trigger: '.section-six',
    start: 'top top',
    end: `+=${totalHeight}`,
    scrub: true,
    pin: true,
    pinSpacing: true,
  }
})
.to('.text-one', { opacity: 1, ease: 'none', duration: -0.4 })
.to('.image-one', { scale: 1.25, ease: 'none', duration: -0.4 })
.to('.text-two', { opacity: 1, ease: 'none', duration: -0.4 })
.to('.image-two', {
  clipPath: 'polygon(...)',  // Polygon reveal shape
  ease: 'none', duration: -0.4,
  onUpdate: function() {
    const progress = this.progress()
    gsap.set('.image-two', {
      clipPath: `polygon(${progress * 100}% 0%, 100% 0%, 100% 100%, 0% 100%)`
    })
  }
})
.to('.text-three', { opacity: 1 })
.to('.image-three', { scale: 1.5 })
```

**Layout:** 3 rows inside a pinned container:
- Each row: `[text block] + [image]`
- Images have `fixed` position overlay, `opacity: 0, scale: 0` initially

---

### 6.7 Section7.jsx (Keepers Hero + CTA)

**Visual:** Large H1 "KEEPERS", vertical text strip rotated, a portrait `ImageTilt`, a CTA box with "Become a Keeper" button, and descriptive text.

**Animation:**
```jsx
gsap.from('.scale-up', {
  scale: 0, ease: 'power3.out',
  scrollTrigger: { trigger: '.section-seven', start: 'top 50%', end: 'top 0%', scrub: true }
})
gsap.from('.fade-up', {
  opacity: 0.5, y: 150, ease: 'power3.out',
  scrollTrigger: { trigger: '.section-seven', start: 'top 50%', end: 'top 0%', scrub: true }
})
```

---

## Phase 7: Navbar.jsx

### Props received:
`borderColor, navBorderColor, btaColor, iconColor, menuColor, isSidebarOpen, setIsSidebarOpen, menuItems`

### Structure:
```
<nav fixed z-50 pointer-events-none>
  ├── [Progress bar] — absolute, width driven by scroll %
  ├── H2 "KPR" logo — hidden on mobile, font-[HexaFrame]
  ├── <ul> menu items — mapped, each wrapped in ShuffleText
  └── [Sign In button] — bg-white text-black rounded pill
</nav>
```

### Scroll Progress Bar:
```jsx
useEffect(() => {
  const updateProgress = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight
    const scrollProgress = (window.scrollY / totalHeight) * 100
    setProgressWidth(`${scrollProgress}%`)
  }
  window.addEventListener('scroll', updateProgress)
  window.addEventListener('resize', updateProgress)
  return () => {
    window.removeEventListener('scroll', updateProgress)
    window.removeEventListener('resize', updateProgress)
  }
}, [])
```

### Color transition (GSAP ScrollTrigger):
```jsx
gsap.timeline({
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress
      // Change nav text, border, button colors
      gsap.to(navRef.current, {
        color: progress > 0 ? 'black' : 'white',
      })
      // Update login button background
      gsap.to(loginBtn, {
        backgroundColor: progress > 0 ? 'black' : 'white',
        color: progress > 0 ? 'white' : 'black',
      })
    }
  }
})
```

---

## Phase 8: Sidebar.jsx

### Structure:
```
<main fixed fullscreen left-0 transition-all duration-500>
  <section flex bg-black rounded-lg>
    ├── [Left side 500px]
    │   ├── Top: "Discover" ShuffleText + nav links list
    │   └── Bottom: Twitter/Discord links + copyright
    └── [Right side — hidden on mobile]
        ├── Top: Close (×) button
        └── MusicBarIcon + ImageTilt portrait
</main>
```

### Open/close transition:
```jsx
// When isSidebarOpen:
style={{ left: isSidebarOpen ? '0' : '-100%' }}
// Plus CSS: transition: all 500ms ease-in-out
```

---

## Phase 9: PreFooter.jsx

### Visual:
A section before the main footer featuring ShuffleText for nav links, hover effects on each item.

```jsx
<section className="prefooter min-h-[50vh] bg-black text-white">
  <div className="border border-[#fff3] ...">
    <ShuffleText text="ACTIVATE CONSOLE FOR ACCESS" className="..." speed={1} />
  </div>
  <ul className="flex flex-col gap-2 font-mono">
    {navItems.map((item, index) => (
      <li key={index}>
        <a href={item.path}>
          <span><ShuffleText text={item.text} /></span>
        </a>
      </li>
    ))}
  </ul>
</section>
```

---

## Phase 10: Footer.jsx

### Structure:
```
<section min-h-screen bg-black text-white>
  ├── H1 "KPR" — large 600px text, font-[HexaFrame]
  ├── <ul> — Privacy Policy, Terms of Service, Legal, License (mapped)
  │         Each uses ShuffleText
  └── Bottom strip:
      ├── Left: "Connect" ShuffleText
      ├── Center: OpenSea link + icon
      └── Right: "Buy On" link
      └── Copyright © 2025
</section>
```

---

## Phase 11: Assets Required

Organize all in `/public/images/`:

| File | Used In |
|------|---------|
| `arrow-bg.png` | HomePage background |
| `trailer-site-media.webp` | AboutSection |
| `about-image.png` | AboutSection right |
| `section3-image.png` | Section3 scene |
| `section3-bg.jpg` | Section3 fixed bg |
| `section4-image.png` | Section4 portrait |
| `face-trades.webp` | Section4 card |
| `left-1.webp` … `left-6.webp` | CardGallery left |
| `right-1.webp` … `right-6.webp` | CardGallery right |
| `section7-image.png` | Section7 portrait |

Audio: `/public/audio/bg.mp3`

---

## Phase 12: Responsive Breakpoints Strategy

| Breakpoint | Behavior |
|-----------|---------|
| Default (mobile) | Single column, reduced padding, hidden decorative elements |
| `max-sm` | Sidebar full-width, nav collapses to hamburger |
| `max-md` | Two columns collapse to one, padding reductions |
| Desktop | Full layout as designed |

Key Tailwind responsive patterns used throughout:
```
max-sm:w-full  max-sm:hidden  max-sm:flex-col
max-md:flex-col  max-md:pl-0  max-md:w-full
```

---

## Phase 13: Performance Checklist

- Use `useCallback` on all mouse event handlers (ImageTilt, ShuffleText)
- `gsap.context()` + `.revert()` in every `useEffect` cleanup
- `will-change: transform` on animated elements
- `pointer-events: none` on decorative overlays
- Lazy load section images below the fold
- `draggable={false}` on all images

---

## Build Order (Recommended)

1. ✅ Project setup + Lenis/GSAP wiring
2. ✅ Effects: `ImageTilt` → `ShuffleText` → `MusicBarIcon`
3. ✅ `HeroSection` (static first, animate after)
4. ✅ `AboutSection`
5. ✅ `Navbar` + scroll progress
6. ✅ `Sidebar` + open/close
7. ✅ `Section3` + `Section4` (circle reveals)
8. ✅ `CardGallery` + `Section5`
9. ✅ `Section6` (pinned — most complex)
10. ✅ `Section7`
11. ✅ `PreFooter` + `Footer`
12. ✅ Full animation pass (wire all ScrollTriggers)
13. ✅ Mobile responsive pass
14. ✅ Performance audit