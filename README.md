<div align="center">

# 🌌 KPR — Scroll-Storytelling Website

### A premium, award-winning scroll-driven narrative experience

[![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth%20Scroll-FF6B6B?style=for-the-badge)](https://lenis.darkroom.engineering/)

> **Inspired by [kprwords.com](https://kprwords.com)** — A cinematic, dark-aesthetic scroll-storytelling React website featuring parallax backgrounds, pinned sections, 3D image tilt effects, character-scramble text animations, expanding circles, card gallery carousels, and immersive ambient audio — all driven by GSAP ScrollTrigger + Lenis smooth scrolling.

</div>

---

## 📖 Table of Contents

1. [Project Overview](#-project-overview)
2. [Tech Stack](#-tech-stack)
3. [Project Architecture](#-project-architecture)
4. [Folder Structure](#-folder-structure)
5. [Phase-by-Phase Build Guide](#-phase-by-phase-build-guide)
6. [Assets & Image AI Prompts](#-assets--image-ai-generation-prompts)
7. [Responsive Strategy](#-responsive-breakpoints-strategy)
8. [Performance Checklist](#-performance-checklist)
9. [Build Order](#-recommended-build-order)

---

## 🌟 Project Overview

**KPR** is a cinematic, scroll-storytelling website built with modern React tools. It delivers an immersive narrative experience through:

| Feature | Description |
|---------|-------------|
| 🎬 **Cinematic Scroll** | GSAP ScrollTrigger pins sections, driving story beats with scroll position |
| 🌀 **Smooth Scroll** | Lenis provides buttery 60fps native smooth-scroll feeling |
| 🖼️ **3D Image Tilt** | Custom `ImageTilt` component rotates images in full 3D on mouse movement |
| 🔡 **Scramble Text** | `ShuffleText` randomly scrambles characters on hover before resolving |
| 🎵 **Ambient Audio** | `MusicBarIcon` toggles background music with animated equalizer bars |
| 🟣 **Expanding Circles** | Section4 features layered purple circles that scale from zero on scroll |
| 🃏 **3D Card Gallery** | Auto-rotating 3D perspective card gallery in Section5 |
| 📌 **Pinned Storytelling** | Section6 pins to viewport while 3 text+image sequences animate |
| 🌑 **Parallax Background** | The entire background zooms + shifts on scroll for immersive depth |
| 🎨 **Dark Aesthetic** | Full dark theme with dynamic color transitions as you scroll |
| 📱 **Responsive** | Works from 375px mobile up to 4K desktop |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 5+ | Lightning-fast build tool, HMR dev server |
| **React** | 18+ | UI component framework |
| **JSX** | — | Component syntax |
| **Tailwind CSS** | v4 | Utility-first styling via `@tailwindcss/vite` plugin |
| **GSAP** | 3+ | Industry-standard animation engine |
| **ScrollTrigger** | (GSAP plugin) | Scroll-driven animation orchestration |
| **Lenis** | latest | Native smooth scroll with GSAP ticker integration |
| **React Router DOM** | v6+ | Client-side routing |
| **HexaFrame Font** | custom | Display font for large headings |

---

## 🏛️ Project Architecture

```
┌────────────────────────────────────────────────────────┐
│                   KPR Web Application                  │
├────────────────────────────────────────────────────────┤
│  Entry: main.jsx → App.jsx                             │
│    ├── Lenis smooth scroll (App-level, global)         │
│    ├── GSAP + ScrollTrigger registration               │
│    └── React Router                                    │
│                                                        │
│  Pages: HomePage.jsx                                   │
│    ├── Background parallax container (GSAP)            │
│    ├── Border color state (scroll-reactive)            │
│    └── All section orchestration                       │
│                                                        │
│  Components/                                           │
│    ├── homepage/                                       │
│    │   ├── HeroSection      (act 1)                   │
│    │   ├── AboutSection     (act 2)                   │
│    │   ├── Section3         (scene reveal)             │
│    │   ├── Section4         (expanding circles)        │
│    │   ├── Section5         (card gallery)             │
│    │   ├── Section6         (pinned storytelling)      │
│    │   ├── Section7         (keepers CTA)              │
│    │   └── CardGallery      (3D card deck)             │
│    └── common/                                         │
│        ├── Navbar           (scroll-reactive nav)      │
│        ├── Sidebar          (fullscreen overlay)       │
│        ├── MiniSidebar                                 │
│        ├── PreFooter        (shuffle nav links)        │
│        └── Footer           (large KPR wordmark)       │
│                                                        │
│  Effects/                                              │
│    ├── ImageTilt.jsx        (3D mouse tilt)            │
│    ├── ShuffleText.jsx      (char scramble)            │
│    └── MusicBarIcon.jsx     (audio + equalizer)        │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
my-app/
├── public/
│   ├── images/
│   │   ├── arrow-bg.png          ← Hero parallax background
│   │   ├── trailer-site-media.webp
│   │   ├── about-image.png
│   │   ├── section3-image.png
│   │   ├── section3-bg.jpg
│   │   ├── section4-image.png
│   │   ├── face-trades.webp
│   │   ├── left-1.webp through left-6.webp
│   │   ├── right-1.webp through right-6.webp
│   │   └── section7-image.png
│   └── audio/
│       └── bg.mp3                ← Ambient background music
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   │   └── HomePage.jsx
│   ├── components/
│   │   ├── homepage/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── Section3.jsx
│   │   │   ├── Section4.jsx
│   │   │   ├── Section5.jsx
│   │   │   ├── Section6.jsx
│   │   │   ├── Section7.jsx
│   │   │   └── CardGallery.jsx
│   │   └── common/
│   │       ├── Navbar.jsx
│   │       ├── Sidebar.jsx
│   │       ├── MiniSidebar.jsx
│   │       ├── PreFooter.jsx
│   │       └── Footer.jsx
│   ├── effects/
│   │   ├── ImageTilt.jsx
│   │   ├── ShuffleText.jsx
│   │   └── MusicBarIcon.jsx
│   └── assets/images/
├── vite.config.js
├── package.json
└── README.md
```

---

## 🚀 Phase-by-Phase Build Guide

---

### Phase 1 — Project Setup

#### 1.1 Initialize the Project

```bash
npm create vite@latest my-app
cd my-app
code .
npm run dev
```

#### 1.2 Install All Dependencies

```bash
npm install gsap lenis react-router-dom
npm install tailwindcss @tailwindcss/vite
```

#### 1.3 Vite Config — Add Tailwind Plugin

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

#### 1.4 index.css — Global Styles

```css
@import "tailwindcss";

@font-face {
  font-family: 'HexaFrame';
  src: url('/fonts/HexaFrame.woff2') format('woff2');
  font-display: swap;
}

html { scroll-behavior: auto; }

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #0a0a0a;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}
```

---

### Phase 2 — App-Level Setup (App.jsx)

```jsx
// src/App.jsx
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

> **Why `time * 800`?** GSAP ticker provides time in seconds. Lenis `raf()` expects milliseconds. Multiplying by 800 creates a subtle easing effect.

---

### Phase 3 — Folder Structure

All static assets live in `/public/images/` so they can be referenced as `/images/filename.ext` without import statements.

---

### Phase 4 — HomePage.jsx

#### 4.1 State & Refs

```jsx
const [borderColor, setBorderColor] = useState('#fff3')
const [isSidebarOpen, setIsSidebarOpen] = useState(false)
const imageRef = useRef(null)
const backgroundContainerRef = useRef(null)
```

#### 4.2 Menu Items Array

```jsx
const menuItems = [
  { text: 'Project',     link: '#project' },
  { text: 'The Keepers', link: '#keepers' },
  { text: 'The World',   link: '#world'   },
]
```

#### 4.3 Root JSX Layout

```jsx
return (
  <main className="relative w-full px-2 inset-0 w-full h-full z-0 overflow-hidden"
    ref={backgroundContainerRef}>
    <img src="/images/arrow-bg.png" ref={imageRef}
      className="h-full w-full object-cover scale-[1.2] transition-transform duration-300"
      draggable={false} />
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
)
```

#### 4.4 Background Parallax Animation

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
    onUpdate: function () {
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
    },
  })
}, [])
```

#### 4.5 ScrollTrigger Border Color Updates

```jsx
ScrollTrigger.create({
  trigger: '.about-section',
  start: 'top bottom',
  end: 'bottom top',
  scrub: true,
  onUpdate: (self) => {
    setBorderColor(self.progress > 0 ? 'black' : 'white')
  },
})
```

---

### Phase 5 — Effects Library

#### 5.1 ImageTilt.jsx — 3D Mouse Tilt Effect

On mouse hover, the image rotates in full 3D space based on exact mouse cursor position relative to the card center.

```jsx
// src/effects/ImageTilt.jsx
import { useRef, useState, useCallback } from 'react'

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
    const rotateX = ((mouseY / rect.height) * max).toFixed(2)
    const rotateY = ((mouseX / rect.width) * max).toFixed(2)
    setTransform(
      `perspective(${perspective}px) scale3D(${scale},${scale},${scale}) ` +
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    )
  }, [max, perspective, scale])

  const handleMouseLeave = useCallback(() => {
    setTransform(
      `perspective(${perspective}px) scale3D(1,1,1) rotateX(0deg) rotateY(0deg)`
    )
  }, [perspective])

  return (
    <div ref={cardRef} className="tilt-container relative w-full h-full"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: `transform ${speed}ms cubic-bezier(0.03,0,0.98,0.9)`,
      }}>
      <img src={src} alt={alt}
        className={`w-full h-full object-cover rounded-lg ${className}`}
        style={{ transform: 'translateZ(20px)', willChange: 'transform' }}
        draggable={false} />
    </div>
  )
}
```

#### 5.2 ShuffleText.jsx — Character Scramble

On mouse enter, characters scramble randomly before resolving left-to-right to the real text.

```jsx
// src/effects/ShuffleText.jsx
import { useState, useRef, useCallback } from 'react'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@#$%^&*+{}:,./;='

export const ShuffleText = ({ text, className, speed = 40 }) => {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef(null)

  const handleMouseEnter = useCallback(() => {
    clearInterval(intervalRef.current)
    let iterations = 0

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
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

#### 5.3 MusicBarIcon.jsx — Animated Equalizer Audio Player

```jsx
// src/effects/MusicBarIcon.jsx
import { useState, useRef } from 'react'

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
        setBarHeights((prev) => prev.map(() => {
          const scale = 0.4 + Math.random() * 0.8
          return Math.random() > 0.5 ? scale : -scale
        }))
      }, 200)
    }
    setIsPlaying((prev) => !prev)
  }

  return (
    <button onClick={togglePlay}
      className="flex items-center h-5 w-5 p-1 bg-transparent cursor-pointer"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}>
      {barHeights.map((scale, index) => (
        <div key={index} className="mx-px w-[2px] rounded transition-transform duration-200"
          style={{ height: '10px', backgroundColor: color, transform: `scaleY(${scale})` }} />
      ))}
    </button>
  )
}
```

---

### Phase 6 — Component-by-Component Build

---

#### 6.1 HeroSection.jsx

**Visual:** Full-screen hero with two large text headings — `"KEEP"` top-left and `"REIMAGINE"` bottom-right offset — in HexaFrame font at 13vw.

```jsx
// src/components/homepage/HeroSection.jsx
export default function HeroSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-heading, .hero-descriptor, .hero-counter', {
        y: 50, opacity: 0, stagger: 0.2, duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 5%' },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef}
      className="hero-section relative h-screen z-20 pt-24 px-8 pl-28
                 md:pt-16 md:px-2 flex flex-col justify-between gap-8 pb-8 text-white">
      <div className="hero-descriptor max-w-[280px] border-t border-white/20 pt-3">
        <p className="text-sm font-mono opacity-70 leading-relaxed">
          An immersive scroll experience into the world of the Keepers.
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="hero-heading text-[13vw] font-[HexaFrame] leading-none tracking-tighter">
          KEEP
        </h1>
        <h1 className="hero-heading text-[13vw] font-[HexaFrame] leading-none tracking-tighter self-end">
          REIMAGINE
        </h1>
      </div>
      <div className="hero-counter text-xs font-mono opacity-50">01 / 07</div>
    </section>
  )
}
```

---

#### 6.2 AboutSection.jsx

**Visual:** Two-column layout. Left (62%): numbered labels + body text + small thumbnail. Right (38%): full-height ImageTilt portrait.

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.about-section', {
      opacity: 0, y: 50,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 5%', scrub: true },
    })
    gsap.from('.image-tilt', {
      scale: 0,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 5%', scrub: true },
    })
    if (window.innerWidth < 768) {
      gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: '0%', scrub: true } })
        .to('.left-side', { opacity: 0 })
        .to('.image-tilt', { opacity: 0 })
    }
  })
  return () => ctx.revert()
}, [])
```

---

#### 6.3 Section3.jsx — Scene Reveal

**Visual:** A large background image that scales from 0→1 as user scrolls ("world opens" effect). Below it: coordinate-style data grid rows with inline video.

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const scaleUpAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-three',
        start: 'top 30%', end: 'top -30%', scrub: true,
      },
    })
    scaleUpAnimation.fromTo('.s3-image',
      { scale: 0, y: window.innerWidth < 768 ? -200 : 0, transformOrigin: 'center' },
      { scale: 1.1, y: 0, ease: 'power3.inOut' }
    )
    gsap.timeline({
      scrollTrigger: { trigger: '.section-four', start: 'top 20%', end: 'center center', scrub: true },
    }).to('.image', { scale: 0, ease: 'power3.inOut' })
  })
  return () => ctx.revert()
}, [])
```

---

#### 6.4 Section4.jsx — Expanding Circles

**Visual:** Three layered purple circles (bg-purple-400/500/600) that expand from `scale:0`. Portrait ImageTilt emerges from center. Vertical "KEEPERS" text on left edge.

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const cfg = {
      scrollTrigger: { trigger: '.section-four', start: 'top 20%', end: 'center center', scrub: 1 }
    }
    gsap.fromTo('.bg-block-1',
      { scale: 0, y: window.innerWidth < 768 ? -200 : 0, transformOrigin: 'center' },
      { scale: 1.1, y: 0, ease: 'power3.inOut', ...cfg }
    )
    gsap.fromTo('.bg-block-2',
      { scale: 0, y: window.innerWidth < 768 ? -200 : 0, transformOrigin: 'center' },
      { scale: 1.2, y: 0, ease: 'power3.inOut', ...cfg }
    )
    gsap.fromTo('.bg-block-3',
      { scale: 0, y: window.innerWidth < 768 ? -200 : 0, transformOrigin: 'center' },
      { scale: 1.3, y: 0, ease: 'power3.inOut', ...cfg }
    )
    gsap.fromTo('.fixed-image',
      { display: 'block', scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power3.inOut', ...cfg }
    )
  })
  return () => ctx.revert()
}, [])
```

JSX key elements:
```jsx
<div className="bg-block-1 absolute w-[1300px] h-[1300px] scale-0 bg-purple-400 rounded-xl" />
<div className="bg-block-2 absolute w-[1300px] h-[1300px] scale-0 bg-purple-600 rounded-xl" />
<div className="bg-block-3 absolute w-[1300px] h-[1300px] scale-0 bg-purple-500 rounded-xl" />
```

---

#### 6.5 Section5.jsx + CardGallery.jsx — 3D Card Gallery

**CardGallery.jsx — The 3D Perspective Logic:**

```jsx
// src/components/homepage/CardGallery.jsx
const leftPerspectives = [
  { x: -10, z: -4 }, { x: -20, z: -8 }, { x: -30, z: -12 },
  { x: -40, z: -16 }, { x: -50, z: -20 }, { x: -60, z: -24 },
]
const rightPerspectives = [
  { x: 10, z: -4 }, { x: 20, z: -8 }, { x: 30, z: -12 },
  { x: 40, z: -16 }, { x: 50, z: -20 }, { x: 60, z: -24 },
]

export default function CardGallery() {
  const [leftCounter, setLeftCounter]   = useState([1, 2, 3, 4, 5, 6])
  const [rightCounter, setRightCounter] = useState([1, 2, 3, 4, 5, 6])

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCounter( (prev) => prev.map((c) => (c >= 6 ? 1 : c + 1)))
      setRightCounter((prev) => prev.map((c) => (c >= 6 ? 1 : c + 1)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getLeftTransform  = (i) => {
    const p = leftPerspectives[rightCounter[i] - 1]
    return `translate3D(${p.x}rem, 0, ${p.z}rem)`
  }
  const getRightTransform = (i) => {
    const p = rightPerspectives[leftCounter[i] - 1]
    return `translate3D(${p.x}rem, 0, ${p.z}rem)`
  }

  return (
    <div className="gallery relative flex items-center justify-center"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
      {[1,2,3,4,5,6].map((n, i) => (
        <div key={`l-${n}`} className="absolute w-32 h-48 rounded-xl overflow-hidden transition-transform duration-700"
          style={{ transform: getLeftTransform(i) }}>
          <img src={`/images/left-${n}.webp`} alt={`Card left ${n}`} className="w-full h-full object-cover" draggable={false} />
        </div>
      ))}
      {[1,2,3,4,5,6].map((n, i) => (
        <div key={`r-${n}`} className="absolute w-32 h-48 rounded-xl overflow-hidden transition-transform duration-700"
          style={{ transform: getRightTransform(i) }}>
          <img src={`/images/right-${n}.webp`} alt={`Card right ${n}`} className="w-full h-full object-cover" draggable={false} />
        </div>
      ))}
    </div>
  )
}
```

---

#### 6.6 Section6.jsx — Pinned Scroll Storytelling ⭐

> **The most complex section — the cinematic pinnacle.**

**Pin Setup:** Section locks to viewport. User scrolls through 3× viewport height to progress through 3 story acts.

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    const totalHeight = window.innerHeight * 3

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-six',
        start: 'top top',
        end: `+=${totalHeight}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
      },
    })

    // ACT I — fade in text + scale up image
    tl.to('.text-one',  { opacity: 1, ease: 'none', duration: 0.4 })
    tl.to('.image-one', { scale: 1.25, ease: 'none', duration: 0.4 })

    // ACT II — text + clip-path polygon wipe reveal on image
    tl.to('.text-two',  { opacity: 1, ease: 'none', duration: 0.4 })
    tl.to('.image-two', {
      ease: 'none', duration: 0.4,
      onUpdate: function () {
        const progress = this.progress()
        gsap.set('.image-two', {
          clipPath: `polygon(${progress * 100}% 0%, 100% 0%, 100% 100%, 0% 100%)`,
        })
      },
    })

    // ACT III — final scale up
    tl.to('.text-three',  { opacity: 1 })
    tl.to('.image-three', { scale: 1.5 })
  })
  return () => ctx.revert()
}, [])
```

---

#### 6.7 Section7.jsx — Keepers Hero + CTA

**Visual:** Giant "KEEPERS" heading, vertical text strip, ImageTilt portrait, CTA box with "Become a Keeper" button.

```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.scale-up', {
      scale: 0, ease: 'power3.out',
      scrollTrigger: { trigger: '.section-seven', start: 'top 50%', end: 'top 0%', scrub: true },
    })
    gsap.from('.fade-up', {
      opacity: 0.5, y: 150, ease: 'power3.out',
      scrollTrigger: { trigger: '.section-seven', start: 'top 50%', end: 'top 0%', scrub: true },
    })
  })
  return () => ctx.revert()
}, [])
```

---

### Phase 7 — Navbar.jsx

**Props:** `borderColor`, `navBorderColor`, `btaColor`, `iconColor`, `menuColor`, `isSidebarOpen`, `setIsSidebarOpen`, `menuItems`

**Scroll Progress Bar:**
```jsx
const [progressWidth, setProgressWidth] = useState('0%')

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

**GSAP Color Transition (white ↔ black on scroll):**
```jsx
gsap.timeline({
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top bottom', end: 'bottom top', scrub: true,
    onUpdate: (self) => {
      gsap.to(navRef.current, { color: self.progress > 0 ? 'black' : 'white', duration: 0.1 })
      gsap.to(loginBtnRef.current, {
        backgroundColor: self.progress > 0 ? 'black' : 'white',
        color: self.progress > 0 ? 'white' : 'black',
        duration: 0.1,
      })
    },
  },
})
```

**Structure:**
```jsx
<nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex items-center justify-between px-8 py-4">
  <div className="absolute top-0 left-0 h-[3px] bg-white" style={{ width: progressWidth }} />
  <h2 className="font-[HexaFrame] text-2xl pointer-events-auto max-sm:hidden">KPR</h2>
  <ul className="flex gap-8 pointer-events-auto">
    {menuItems.map((item) => (
      <li key={item.text}>
        <a href={item.link}><ShuffleText text={item.text} className="text-sm font-mono" /></a>
      </li>
    ))}
  </ul>
  <button ref={loginBtnRef} className="pointer-events-auto bg-white text-black text-sm font-medium px-5 py-2 rounded-full">
    Sign In
  </button>
</nav>
```

---

### Phase 8 — Sidebar.jsx

**Open/close transition:** `style={{ left: isSidebarOpen ? '0' : '-100%' }}` with `transition: all 500ms ease-in-out`

**Structure (two-column):**
- **Left (500px):** "Discover" ShuffleText + large nav links list + social links + copyright
- **Right (hidden on mobile):** Close (×) button + MusicBarIcon + ImageTilt portrait

```jsx
<main className="fixed inset-0 z-[100] transition-all duration-500"
  style={{ left: isSidebarOpen ? '0' : '-100%' }}>
  <section className="flex h-full bg-black rounded-r-2xl max-w-[90vw]">
    <div className="w-[500px] max-sm:w-full flex flex-col justify-between p-12">
      <div>
        <p className="text-xs font-mono opacity-40 mb-8">
          <ShuffleText text="Discover" speed={20} />
        </p>
        <ul className="flex flex-col">
          {menuItems.map((item, i) => (
            <li key={i} className="text-white text-6xl font-bold border-b border-white/10 py-4"
              onClick={() => setIsSidebarOpen(false)}>
              <ShuffleText text={item.text} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-6 text-sm font-mono opacity-60">
          <a href="#">Twitter</a>
          <a href="#">Discord</a>
        </div>
        <p className="text-xs font-mono opacity-30">© 2025 KPR. All rights reserved.</p>
      </div>
    </div>
    <div className="flex-1 max-sm:hidden flex flex-col items-end p-8 gap-8">
      <button onClick={() => setIsSidebarOpen(false)} className="text-white text-4xl font-thin hover:rotate-90 transition-transform">×</button>
      <MusicBarIcon color="white" />
      <div className="flex-1 w-full max-w-xs">
        <ImageTilt src="/images/section7-image.png" alt="KPR Guardian" />
      </div>
    </div>
  </section>
</main>
```

---

### Phase 9 — PreFooter.jsx

```jsx
const navItems = [
  { text: 'Project',     path: '#project' },
  { text: 'The Keepers', path: '#keepers' },
  { text: 'The World',   path: '#world'   },
  { text: 'Sign In',     path: '#signin'  },
]

export default function PreFooter() {
  return (
    <section className="prefooter min-h-[50vh] bg-black text-white px-8 py-16 flex flex-col gap-12">
      <div className="border border-white/20 rounded-lg px-6 py-4 max-w-max">
        <ShuffleText text="ACTIVATE CONSOLE FOR ACCESS"
          className="text-sm font-mono tracking-[0.3em] opacity-80" speed={1} />
      </div>
      <ul className="flex flex-col gap-2 font-mono">
        {navItems.map((item, index) => (
          <li key={index} className="text-4xl border-b border-white/10 py-4 hover:pl-4 transition-all duration-300 cursor-pointer">
            <a href={item.path}><ShuffleText text={item.text} speed={30} /></a>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

---

### Phase 10 — Footer.jsx

```jsx
const legalLinks = [
  { text: 'Privacy Policy', path: '#privacy' },
  { text: 'Terms of Service', path: '#terms' },
  { text: 'Legal', path: '#legal' },
  { text: 'License', path: '#license' },
]

export default function Footer() {
  return (
    <section className="footer min-h-screen bg-black text-white flex flex-col justify-between px-8 py-16 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <ShuffleText text="Connect" className="text-sm font-mono tracking-widest" speed={25} />
        <a href="https://opensea.io" className="text-sm font-mono flex items-center gap-2 hover:opacity-60">🌊 OpenSea</a>
        <a href="#buy" className="text-sm font-mono hover:opacity-60">Buy On →</a>
      </div>
      <h1 className="font-[HexaFrame] text-[600px] leading-none text-white/15 text-center select-none pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2">
        KPR
      </h1>
      <div className="flex items-center justify-between relative z-10">
        <ul className="flex gap-6">
          {legalLinks.map((item, i) => (
            <li key={i}>
              <a href={item.path}>
                <ShuffleText text={item.text} className="text-xs font-mono opacity-50 hover:opacity-100" speed={20} />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs font-mono opacity-30">© 2025 KPR. All rights reserved.</p>
      </div>
    </section>
  )
}
```

---

## 🖼️ Assets & Image AI Generation Prompts

All images go in `/public/images/`. Use any AI image generator (Midjourney, DALL-E 3, Firefly, Ideogram, etc.) with the prompts below.

---

### 1. `arrow-bg.png` — Hero Background Sigil

> **Used in:** `HomePage.jsx` — Global parallax background that zooms dramatically as hero scrolls

**AI PROMPT:**
```
Generate a large, seamless dark background image for a premium website hero section.

The image is predominantly very dark — near-black (#050505 to #0a0a0a).
The central visual element is a large, intricate geometric sigil or architectural 
blueprint-style design — like a stylized abstract arrow or compass rose combined 
with esoteric sacred geometry.

The design is NOT photorealistic — it should feel like an etching or technical 
drawing, with very thin white/silver lines (1-2px line weight) on the dark background.
The pattern fills about 60-70% of the image area, centered.

The lines glow very faintly (about 8-12% white opacity) — barely visible but 
creates rich texture on close inspection.

Style: architectural blueprint + sacred geometry + brutalist editorial
Color: monochrome — pure black background, extremely faint white/silver line art
No photography, no gradients, no color.
Format: landscape 3000×2000px minimum, seamless tiling preferred.
Quality: ultra HD, sharp crisp linework.
```

---

### 2. `about-image.png` — About Section Right Portrait

> **Used in:** `AboutSection.jsx` — Large right-column tiltable portrait

**AI PROMPT:**
```
Generate a dramatic cinematic portrait image for a dark fantasy website.

Subject: A tall imposing guardian/warrior figure — wearing elaborate dark armor 
with glowing arcane runes embedded in the chest plate. The armor is deep matte 
black with subtle midnight blue metallic highlights.

The figure stands in a frontal or 3/4 pose, looking slightly upward or off-camera.
Facial features are partially obscured by a dark hood that falls forward.

Lighting: Single dramatic upward light source (like looking up from a flame below),
casting strong shadows under the brow and chin. The glowing runes on the armor 
emit a soft purple/blue bioluminescent light.

Background: Pure black, completely dark — the figure emerges from nothing.

Style: Dark fantasy oil painting + digital art hybrid. High contrast.
Painterly brush texture visible but photorealistic in detail.
Not anime, not cartoon — serious, cinematic, gallery-quality dark art.

Color palette: Black armor, midnight blue highlights, purple rune glow.
Aspect ratio: portrait, 2:3 — e.g. 1200×1800px
Resolution: Ultra HD.
NO white background. Pure black background.
```

---

### 3. `trailer-site-media.webp` — About Section Small Thumbnail

> **Used in:** `AboutSection.jsx` — Small thumbnail in bottom-left of left column

**AI PROMPT:**
```
Generate a horizontal cinematic thumbnail image, widescreen 16:9.

Content: A dramatic landscape establishing shot — ancient stone ruins on a vast 
dark plateau, viewed from a low angle. The ruins are carved stone columns and 
archways covered in glowing arcane inscriptions. Mist or low fog rolls across 
the ground.

Lighting: Twilight or pre-dawn — deep indigo sky with a sliver of deep orange-red 
at the very horizon. Stars barely visible above.

In the far distance: a massive impossibly tall structure or tower, silhouetted.

The foreground has a single hooded figure (very small, showing scale) standing 
at the edge of the ruins looking toward the tower.

Style: Epic dark fantasy concept art. Atmospheric perspective. 
Muted color palette: deep blues, purples, blacks with warm orange on the horizon.

Aspect: 16:9, 1920×1080px minimum. Cinematic widescreen.
Very atmospheric, heavy mood, painterly.
```

---

### 4. `section3-bg.jpg` — Section 3 Scene Reveal Background

> **Used in:** `Section3.jsx` — Main large image that scales from 0 on scroll (the "world opens" effect)

**AI PROMPT:**
```
Generate a breathtaking wide-angle aerial photograph or digital art of an 
ancient mystical site in a remote dramatic landscape.

The scene:
  - A large circular stone formation (like Stonehenge but more elaborate, with 
    tall carved pillars and concentric rings of stones)
  - Set on a high plateau with sheer drop cliffs on multiple sides
  - Surrounded by thick atmospheric mist/clouds below (making it appear to float 
    above the clouds)
  - A dramatic overcast sky with a single break in the clouds directly overhead, 
    allowing one shaft of golden-purple light to illuminate the center

Scale: Vast — the stones are massive. We view from high enough to see the full 
formation.

Time: Golden hour or just after sunset. The light shaft is the only warm light; 
everything else is cool blue-grey.

Color palette: Deep grey stone, white mist, cool blue sky, single warm gold-purple 
light shaft, purple atmospheric haze on horizon.

Style: Hyper-realistic digital matte painting. Cinematic. Epic scale.
The image should feel like a film opening establishing shot.

Aspect: 16:9, 3840×2160px (4K). Ultra HD.
```

---

### 5. `section3-image.png` — Section 3 Small Grid Thumbnail

> **Used in:** `Section3.jsx` — Small image inside data grid row 2

**AI PROMPT:**
```
Generate a small dark portrait image of an arcane artifact or relic.

Subject: A single glowing artifact — a dark metal disc or seal covered in etched 
sacred geometry patterns and runes. The disc is held in aged weathered hands 
(just the hands, no arms, filling the frame).

The disc emits a soft cold blue-white glow from within the engraved patterns.

Background: Almost completely black, very shallow depth of field, disc in sharp focus.

Style: Product photography meets dark fantasy. High contrast. Very sharp, very detailed.

Color: Dark metal, electric blue glow, aged skin tones.
Aspect: 4:3 — 800×600px.
```

---

### 6. `section4-image.png` — Section 4 Central Portrait

> **Used in:** `Section4.jsx` — Central figure that emerges from behind the expanding purple circles

**AI PROMPT:**
```
Generate a powerful isolated character portrait for a dark fantasy website's hero section.

Subject: A full-body or 3/4 figure of "The Keeper" — a towering guardian entity 
wearing ceremonial black plate armor with intricate purple crystalline inlays. 
They hold a long dark staff topped with a pulsing purple orb.

The figure is centered, facing the viewer directly, with a slight upward tilt 
to the head (looking slightly downward at viewer — authority pose).

A dark hood shadows the upper half of the face, but two piercing purple-white 
glowing eyes are visible.

CRITICAL: The background must be PURE BLACK or TRANSPARENT. 
No background scene, no environment — just the figure on black.
This image will be composited over colorful backgrounds.

Lighting: Dramatic bottom-up purple lighting from the staff orb, plus a rim 
light on the shoulders (cold blue-white).

Style: Dark fantasy game character concept art meets oil painting. 
Extremely detailed, museum-quality dark illustration.

Color: Black armor, purple crystals, purple glowing eyes, cold blue rim.
Aspect: Portrait, 2:3 — 1200×1800px. PNG with transparency if possible.
```

---

### 7. `face-trades.webp` — Section 4 Card Image

> **Used in:** `Section4.jsx` — One of the card face images

**AI PROMPT:**
```
Generate a dark fantasy trading card face image — portrait orientation, 
2.5:3.5 card ratio.

The image fills the entire card face (no card border/frame — just the art):

Subject: A close-up portrait of a masked guardian figure. The mask is ornate — 
dark carved metal with tribal geometric patterns. The figure wears a dark hood 
and armor visible at the shoulders.

Expression: Unreadable (masked), but posture conveys absolute authority. 
The eyes behind the mask glow faintly purple.

Background: Deep atmospheric — dark purple/black gradient with very faint glowing 
sigil patterns barely visible behind.

Style: Dark fantasy card game art. Rich oil painting texture, high detail.

Color: Black, dark purple, faint gold metallic on mask edge.
Aspect: Portrait card face, 750×1050px.
Ultra HD, extremely detailed.
```

---

### 8. `left-1.webp` through `left-6.webp` — Card Gallery Left Stack

> **Used in:** `CardGallery.jsx` — The 6 cards on the left fan of the 3D gallery

**AI PROMPT (generate all 6 individually, same style):**
```
Generate 6 dark fantasy trading card art images, each unique but unified in style.
Portrait orientation, 750×1050px each. NO text, no card borders, no frames.
All on dark/black backgrounds. Dark fantasy oil painting style throughout.

left-1.webp — "The Warden": 
A heavily armored figure in black plate, standing in a torch-lit stone corridor. 
Dramatic side lighting. The armor has angular geometric patterns. Purple torch glow.

left-2.webp — "The Archivist": 
A robed scholar figure surrounded by floating glowing books and scrolls in a dark 
library. Soft blue magical glow. Books float in spiral patterns around the figure.

left-3.webp — "The Sentinel": 
A silhouetted figure standing at the edge of a massive cliff. Dark sky with purple 
aurora above. Back-lit, dramatic. The figure is a pure silhouette against the aurora.

left-4.webp — "The Sigil": 
NOT a character — a large intricate glowing magical sigil/symbol centered on near-black 
background. The sigil glows electric purple-white. Highly detailed sacred geometry.

left-5.webp — "The Threshold": 
An ancient stone doorway/archway glowing from within with intense white-purple light. 
A silhouette stands in the doorway. Stone texture is extremely detailed.

left-6.webp — "The Storm": 
An atmospheric landscape — dark roiling storm clouds above ancient battlefield or 
ruins, lit by lightning. Epic scale. Lightning strikes illuminate the scene in blue-white.

UNIFIED STYLE: Dark fantasy oil painting, rich black backgrounds, purple and cold blue 
accent lights, cinematic quality, 750×1050px each, ultra HD.
```

---

### 9. `right-1.webp` through `right-6.webp` — Card Gallery Right Stack

> **Used in:** `CardGallery.jsx` — The 6 cards on the right fan of the 3D gallery

**AI PROMPT (generate all 6 individually, same style as left series):**
```
Generate 6 more dark fantasy trading card art images matching the left-1 through 
left-6 series style. Portrait, 750×1050px. NO text, no card borders, no frames.
Same dark fantasy oil painting style.

right-1.webp — "The Keeper's Eye": 
Extreme close-up of a single glowing purple eye filling most of the frame. 
The pupil contains a miniature universe or galaxy swirl. Very dramatic macro shot.

right-2.webp — "The Crystal Chamber": 
An underground crystalline cave full of enormous deep purple amethyst crystals. 
One figure stands dwarfed by them. Cold purple light fills the space.

right-3.webp — "The Void Walker": 
A figure walking on an invisible surface surrounded by infinite deep space/void. 
Stars below and above. Very eerie. Weightless feeling.

right-4.webp — "The Oath": 
Two armored hands clasping in the foreground, wrists bearing matching glowing 
rune tattoos. Dark stone background. Close-up, dramatic.

right-5.webp — "The Summoning": 
A magic circle drawn on stone floor, glowing intensely purple-white. Multiple 
robed figures kneel at the perimeter. Top-down overhead view.

right-6.webp — "The Chronicle": 
An ancient open tome/book with illuminated pages glowing softly. Pages show a 
map of an unknown mystical world. Dark library background. Rich book texture.

Same style: dark fantasy oil painting, rich black backgrounds, purple cold blue 
accents, 750×1050px each, ultra HD.
```

---

### 10. `section7-image.png` — Section 7 + Sidebar Portrait

> **Used in:** `Section7.jsx` (closing hero) AND `Sidebar.jsx` — The definitive Keeper portrait

**AI PROMPT:**
```
Generate the DEFINITIVE "Keeper" character portrait — the most important, most 
detailed image in the entire project. This is the cover art quality hero image.

Subject: "The Prime Keeper" — the ultimate guardian figure.
  - Full figure, centered, facing viewer with absolute authority
  - Wearing the most elaborate dark ceremonial armor in the series
  - Armor has intricate purple crystalline inlays that pulse with light
  - A dramatic dark cloak billows behind them as if in strong wind
  - They hold both hands slightly extended, palms up, with two glowing 
    purple-white orbs of energy floating above each palm
  - A crown-like dark metal headpiece, ornate, with a central purple gem
  - The face IS VISIBLE this time — strong ageless features, glowing 
    purple-tinted eyes, absolute calm and power in the expression

Background: PURE BLACK or TRANSPARENT — crucial requirement.
No environment, no background — the figure appears to float in void.

Lighting (critical):
  - Primary: The orbs in hands cast purple-white upward glow on the figure
  - Secondary: Dramatic rim light from behind (cold blue-white) separates 
    figure from the black void
  - The figure IS the only light source in the composition

Style: The absolute pinnacle of dark fantasy oil painting.
Museum-quality illustration. Every detail of the armor is individually rendered.
Painterly texture but photorealistic detail level.
This should feel like the cover art of the most premium dark fantasy game ever made — 
a true collector's piece artwork.

Color: Black armor, purple crystals, glowing purple orbs, cold blue rim light.
Aspect: Tall portrait, 2:3 — 1400×2100px.
Format: PNG. Absolutely maximum ultra HD detail.
Resolution: 300 DPI minimum equivalent.
```

---

### Audio: `bg.mp3` — Ambient Background Music

> **Used in:** `MusicBarIcon.jsx` — Ambient background music toggle

**AI Music Prompt (for Suno, Udio, or similar):**
```
Generate a 2-minute seamlessly looping ambient atmospheric music track.

Mood: Dark, cinematic, otherworldly, contemplative. 
Like walking through a mystical ancient space — reverent and slightly eerie 
but not scary or aggressive.

Instruments/sounds:
  - Deep, slow evolving drone (synthesizer or bowed metal)
  - Very subtle distant choral voices (wordless, reverb-heavy)
  - Occasional low-frequency pulse (like a heartbeat, very slow ~40 BPM)
  - High frequency shimmer/sparkle (like crystal singing bowls)
  - NO drums, NO rhythm, NO melody — purely textural and atmospheric

Production: Heavy reverb on all elements, very spacious stereo mix.
Format: MP3, 192kbps minimum, perfectly seamless loop point.
Duration: 2 minutes exactly, loops seamlessly.
Volume: Moderate — this is background audio, subtle, not distracting.
```

---

## 📱 Responsive Breakpoints Strategy

| Breakpoint | Condition | Behavior |
|------------|-----------|----------|
| **Mobile** | Default (< 640px) | Single column, reduced padding, hidden decorative elements |
| **`max-sm`** | < 640px | Sidebar full-width, nav collapses to hamburger |
| **`max-md`** | < 768px | Two columns collapse to one, mobile GSAP animation paths |
| **`md`** | 768px+ | Tablet layout with adjusted spacing |
| **`lg`+** | 1024px+ | Full desktop layout as designed |

**Key Tailwind patterns:**
```css
/* Responsive hiding */
max-sm:hidden    max-md:hidden

/* Responsive columns */
max-md:flex-col  max-sm:flex-col

/* Responsive widths */
max-md:w-full    max-sm:w-full

/* Responsive padding */
max-md:pl-0      max-sm:px-4

/* Responsive text */
max-sm:text-[10vw]
```

**GSAP responsive branching:**
```jsx
const isMobile = window.innerWidth < 768

gsap.fromTo('.element',
  { y: isMobile ? -200 : 0, scale: isMobile ? 0.5 : 0 },
  { y: 0, scale: 1, ... }
)
```

---

## ⚡ Performance Checklist

| Item | Details |
|------|---------|
| ✅ `useCallback` on mouse handlers | Applied in `ImageTilt` + `ShuffleText` |
| ✅ `gsap.context()` + `.revert()` | Every single `useEffect` with GSAP |
| ✅ `will-change: transform` | All animated elements (images, cards) |
| ✅ `pointer-events: none` | Decorative overlays, nav when inactive |
| ✅ Lazy load below-fold images | All images except hero section |
| ✅ `draggable={false}` | All `<img>` elements across the site |
| ✅ `scrub: true` on scroll animations | Smooth, GPU-accelerated scroll-linked anims |
| ✅ WebP format | Use `.webp` for all card images |
| ✅ `font-display: swap` | Applied to HexaFrame font declaration |
| ✅ GSAP ticker lag smoothing disabled | `gsap.ticker.lagSmoothing(0)` with Lenis |

---

## 🏗️ Recommended Build Order

```
Step  1  ✅  Project setup → Vite + React + Tailwind v4 + Lenis/GSAP wiring
Step  2  ✅  Effects library: ImageTilt → ShuffleText → MusicBarIcon
Step  3  ✅  HeroSection (static layout first, then add GSAP animations)
Step  4  ✅  AboutSection
Step  5  ✅  Navbar + scroll progress bar
Step  6  ✅  Sidebar + open/close transition
Step  7  ✅  Section3 + Section4 (circle reveals)
Step  8  ✅  CardGallery + Section5
Step  9  ✅  Section6 (pinned — most complex — build last among sections)
Step 10  ✅  Section7
Step 11  ✅  PreFooter + Footer
Step 12  ✅  Full animation pass (wire all ScrollTriggers, test timing)
Step 13  ✅  Mobile responsive pass (test at 375px, 768px, 1024px)
Step 14  ✅  Performance audit (DevTools Lighthouse, optimize)
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open** a Pull Request

---

<div align="center">

**Built with 🖤 by the KPR team**

*A scroll-storytelling experience for those who seek to reimagine.*

[![kprwords.com](https://img.shields.io/badge/Inspired%20By-kprwords.com-purple?style=for-the-badge)](https://kprwords.com)

</div>
