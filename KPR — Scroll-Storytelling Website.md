# KPR — Scroll-Storytelling Website
## Detailed Implementation Plan

> **Philosophy:** No code in this document. Every section explains *what* to build, *why* it works that way, and *where* every file lives. Read this top-to-bottom before touching any code.

---

## 📁 FIRST THING — Where to Save All Generated Images

Before you generate a single image, create this exact folder structure inside your project.
Every image has **one exact home**. Putting images in the wrong place will break the site.

```
KPR/                          ← Your project root
└── public/
    ├── images/               ← ALL images go here (not in src/)
    │   ├── arrow-bg.png
    │   ├── about-image.png
    │   ├── trailer-site-media.webp
    │   ├── section3-bg.jpg
    │   ├── section3-image.png
    │   ├── section4-image.png
    │   ├── face-trades.webp
    │   ├── left-1.webp
    │   ├── left-2.webp
    │   ├── left-3.webp
    │   ├── left-4.webp
    │   ├── left-5.webp
    │   ├── left-6.webp
    │   ├── right-1.webp
    │   ├── right-2.webp
    │   ├── right-3.webp
    │   ├── right-4.webp
    │   ├── right-5.webp
    │   ├── right-6.webp
    │   └── section7-image.png
    └── audio/
        └── bg.mp3            ← Background ambient music
```

> **Why `public/` and not `src/assets/`?**
> Images in `public/` are served as-is and referenced with simple paths like `/images/arrow-bg.png`.
> Images in `src/assets/` require JavaScript imports and go through Vite's bundler — unnecessary overhead for large images.

---

## 🖼️ Image Reference Table — What Goes Where

| Image File | Dimensions | Format | Used In Section | Visual Purpose |
|------------|------------|--------|-----------------|----------------|
| `arrow-bg.png` | 3000×2000px | PNG | HomePage (global) | The full-page parallax background — a barely visible geometric sigil/blueprint pattern on black. This zooms dramatically as you scroll the hero. |
| `about-image.png` | 1200×1800px | PNG | AboutSection — right column | A tall portrait of a dark armor-clad guardian. This is the main ImageTilt card on the right side of the About section. |
| `trailer-site-media.webp` | 1920×1080px | WEBP | AboutSection — left column bottom | A small cinematic landscape thumbnail — ancient ruins in atmospheric mist. Lives in the bottom-left of the left column. |
| `section3-bg.jpg` | 3840×2160px | JPG | Section3 — center | The large scene-reveal image. Starts at scale:0 and grows to full size as you scroll. Epic aerial view of mystical ruins. |
| `section3-image.png` | 800×600px | PNG | Section3 — data grid | A small thumbnail of a glowing arcane artifact (disc with runes). Lives inside the data grid row on the right side. |
| `section4-image.png` | 1200×1800px | PNG | Section4 — center | The central Keeper figure on pure black background. Floats above the expanding purple circles. Transparent/black bg is critical. |
| `face-trades.webp` | 750×1050px | WEBP | Section4 — cards area | A masked guardian face — card portrait art used in the purple circles section. |
| `left-1.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Warden" — armored figure in stone corridor. Card art for left stack position 1. |
| `left-2.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Archivist" — scholar with floating books. Card art for left stack position 2. |
| `left-3.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Sentinel" — silhouette at cliff edge with aurora. Card art position 3. |
| `left-4.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Sigil" — glowing sacred geometry on black. Card art position 4. |
| `left-5.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Threshold" — glowing stone archway with silhouette. Card art position 5. |
| `left-6.webp` | 750×1050px | WEBP | CardGallery — left fan | "The Storm" — lightning-lit ancient ruins landscape. Card art position 6. |
| `right-1.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Keeper's Eye" — extreme close-up of purple glowing eye. Card art right position 1. |
| `right-2.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Crystal Chamber" — underground purple crystal cave. Card art right position 2. |
| `right-3.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Void Walker" — figure in infinite dark space. Card art right position 3. |
| `right-4.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Oath" — two armored hands with rune tattoos. Card art right position 4. |
| `right-5.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Summoning" — overhead view of glowing magic circle. Card art right position 5. |
| `right-6.webp` | 750×1050px | WEBP | CardGallery — right fan | "The Chronicle" — ancient illuminated tome with world map. Card art right position 6. |
| `section7-image.png` | 1400×2100px | PNG | Section7 + Sidebar | "The Prime Keeper" — the most detailed hero portrait. Used both in the Section7 closing act AND in the sidebar overlay. |
| `bg.mp3` | — | MP3 | MusicBarIcon (global) | Ambient atmospheric background audio. Looping. Triggered by the equalizer icon. |

---

## 🗺️ Overall Site Map — 7 Acts + UI Shell

Think of the website as a **film** divided into 7 acts that you scroll through:

```
┌─────────────────────────────────────────────────────┐
│  UI SHELL (always visible)                          │
│  Navbar — fixed top, scroll-reactive colors         │
│  Sidebar — fullscreen overlay, slides from left     │
└─────────────────────────────────────────────────────┘
          ↓ scroll through these in order ↓
┌─────────────────────────────────────────────────────┐
│  ACT 1 — HeroSection                               │
│  The opening frame. Giant typography. Dark mystery. │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 2 — AboutSection                              │
│  White background (!). Story introduction.          │
│  Two-column layout with 3D tilt portrait.           │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 3 — Section3 (Scene Reveal)                   │
│  Back to black. A world opens from the center.      │
│  Data grid below like a mission brief.              │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 4 — Section4 (Expanding Circles)              │
│  Deep purple. Three concentric circles bloom.       │
│  The Keeper portrait emerges from within.           │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 5 — Section5 (Card Gallery)                   │
│  The collection is revealed. Two fans of cards      │
│  rotate in 3D perspective automatically.            │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 6 — Section6 (Pinned Storytelling) ⭐          │
│  THE SIGNATURE SECTION. Pins to viewport.           │
│  Three story acts play out as you keep scrolling.   │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  ACT 7 — Section7 (Keepers CTA)                   │
│  The closing call-to-action. "Become a Keeper."     │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  PREFOOTER — Transitional nav links (shuffle text)  │
│  FOOTER — Giant "KPR" wordmark + legal links        │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Step-by-Step Implementation Plan

---

## STEP 1 — Project Initialization & Tooling Setup

### What happens here
You create a brand new Vite + React project from scratch, install all required libraries, and configure the build system so all tools work together before writing a single line of UI code.

### Why Vite
Vite gives you near-instant dev server startup, hot module replacement (HMR), and optimized production builds. It's the industry standard for modern React projects.

### Libraries and why each one is needed

**GSAP (GreenSock Animation Platform)**
The animation engine that powers literally everything — scroll-driven animations, scale effects, opacity fades, color transitions. The most powerful web animation library available. Nothing else comes close for this level of control.

**ScrollTrigger (GSAP Plugin)**
The plugin that ties GSAP animations to the user's scroll position. Without this, you can't make animations that are driven by where the user has scrolled to on the page.

**Lenis**
A smooth-scroll library that intercepts native browser scroll events and replaces them with a buttery-smooth eased version. It integrates directly with GSAP's ticker so both systems stay perfectly in sync.

**React Router DOM**
Provides client-side navigation routing. Even though this is mostly a single-page experience, routing lets you add pages later (like a `/mint` page or `/about` page) without rebuilding anything.

**Tailwind CSS v4**
Utility-first CSS framework. v4 installs via a Vite plugin (not a PostCSS config), making setup much simpler. Lets you style everything directly in JSX without writing separate CSS files.

### Configuration decisions

**Vite config** needs one addition: the `@tailwindcss/vite` plugin must be registered so Tailwind's styles get processed.

**index.css** needs two things:
1. The Tailwind import directive so all utility classes work
2. The HexaFrame custom font declaration so the large display headings render correctly

### After this step is done
Your browser shows the default Vite + React boilerplate at `localhost:5173`. No visual changes yet — just the foundation is ready.

---

## STEP 2 — Global App Shell (Lenis + GSAP Wiring)

### What happens here
You replace the default `App.jsx` content with the global animation infrastructure. This is the single most critical setup step — getting Lenis and GSAP perfectly synced.

### Why this must happen at the App level
Lenis smooth scroll needs to be initialized **once**, at the very top of the component tree, before any section or component renders. If you initialize it inside a section component, it won't apply to the whole page and will cause scroll glitches.

### How Lenis + GSAP talk to each other
There's a precise three-way handshake:
1. Lenis starts listening to native scroll events
2. Every time Lenis processes a scroll tick, it notifies `ScrollTrigger.update()` so GSAP knows the exact scroll position
3. Lenis's animation loop (`raf`) is added to GSAP's internal ticker so both run on the exact same frame cadence — no drift, no lag

### The `time * 800` detail
GSAP's ticker counts in seconds. Lenis's RAF expects milliseconds. The multiplier bridges this conversion. The value 800 (slightly less than 1000) introduces a subtle ease into the smooth scroll feeling — making it feel more organic than a raw 1000ms conversion.

### React Router setup
Even with one route currently, Router wraps everything so navigation works from day one.

### After this step is done
The page still looks like the default boilerplate, but now scroll is smooth and GSAP + Lenis are perfectly synced. You can verify this by opening the console — no errors should appear.

---

## STEP 3 — Folder & File Structure Creation

### What happens here
You create all the empty files and folders before writing any content. This prevents the mental overhead of "where should I put this?" during the actual build.

### The src/ folder organization

**`src/pages/`** — Contains only top-level page files. Right now that's just `HomePage.jsx`. Pages are the orchestrators — they import and arrange all the section components.

**`src/components/homepage/`** — Every section of the homepage lives here as its own file. This separation means you can work on Section4 without touching Section6, and bugs are easy to locate.

**`src/components/common/`** — Reusable UI pieces that appear across multiple contexts: Navbar (visible on every section), Sidebar (overlaid on top of everything), Footer. "Common" means "not specific to one section."

**`src/effects/`** — The three custom interactive effect components. These are pure behavior utilities — they don't care what section they're in. They work the same whether used in the AboutSection or the Sidebar.

**`src/assets/images/`** — If you ever need to import images directly into JavaScript (rare), they go here. NOT for the main site images — those go in `public/images/`.

### The public/ folder organization

**`public/images/`** — Every image the website displays. Vite serves this folder statically. Images here are referenced as `/images/filename.ext` — no import, no bundling.

**`public/audio/`** — The single ambient audio file `bg.mp3`.

### After this step is done
You have a complete empty skeleton. All files exist but are empty or have placeholder content. The folder structure matches the architecture diagram exactly.

---

## STEP 4 — The Three Effect Components (Core Utilities)

### Why build these before the sections
All seven sections use at least one of these effects. If you build HeroSection first and then try to add ShuffleText, you'll have to go back and refactor. Build the tools first, then use them freely everywhere.

---

### 4A — ImageTilt Effect

### What it does
When a user moves their mouse over an image, the image rotates in genuine 3D space — tilting toward the direction of the mouse cursor. When the mouse leaves, it smoothly resets to flat. The effect feels like picking up a physical photograph and examining it.

### How it works conceptually
The component constantly tracks the mouse position. It calculates how far the mouse is from the exact center of the image (both horizontally and vertically). It converts that distance into rotation angles and applies a CSS 3D transform. The further from center the mouse is, the more tilt you see.

### The `preserve-3d` detail
CSS has a concept called "3D rendering context." For 3D transforms to look correct (not flat/squished), the parent element must declare that its children should be rendered in 3D space. The `transformStyle: preserve-3d` property does this. Without it, the 3D tilt looks broken.

### The `translateZ(20px)` detail
The image itself is pushed 20px forward in 3D space (toward the viewer). This creates a subtle "floating above the card" effect that enhances the 3D illusion.

### Performance consideration
The mouse move handler fires extremely rapidly (60+ times per second as the mouse moves). Wrapping it in `useCallback` ensures the function reference doesn't get recreated on every React re-render, preventing unnecessary performance waste.

### Customizable options
`max` — how extreme the tilt angle gets (default 15°)
`perspective` — how strong the 3D depth effect feels (default 1000px)
`scale` — slight zoom-in when hovering (default 1.05)
`speed` — how fast the transition animates (default 400ms)

---

### 4B — ShuffleText Effect

### What it does
When a user hovers over a text element, every character instantly becomes a random symbol (letters, numbers, punctuation). Then, one by one from left to right, the real characters "resolve" back — like a decryption or data-loading animation. The final character resolves, and the text is back to normal.

### How it works conceptually
An interval timer fires repeatedly (every `speed` milliseconds). Each tick, it goes through every character in the text. Characters to the left of the current "resolved cursor" show their real value. Characters to the right are randomly picked from a pool of symbols. The cursor advances slightly each tick (by 1/3rd of a character position, for smoothness). When the cursor passes the last character, everything is resolved and the timer stops.

### Why 1/3rd advancement
Advancing the cursor by exactly 1 character per tick would make the scramble too mechanical — you'd visibly see one character snap into place per tick. Advancing by 1/3 creates three frames of scrambling per character resolve, making it feel more analog and organic.

### The LETTERS pool
The character pool deliberately includes a mix of uppercase, lowercase, numbers, and symbols (`@#$%^&*+{}:,./;=`). The variety creates the "hacker terminal" aesthetic that matches the site's dark tech-mystery theme.

### Where ShuffleText is used
Everywhere — navbar menu items, sidebar navigation links, the PreFooter header text "ACTIVATE CONSOLE FOR ACCESS", all legal footer links. It's the site's signature interaction.

---

### 4C — MusicBarIcon Effect

### What it does
Renders five small vertical bars arranged side by side, like an audio equalizer display. Clicking them toggles ambient background music on and off. When music plays, the bars animate up and down randomly like a real equalizer reacting to audio. When paused, bars return to flat neutral position.

### How the audio works
The audio object is created lazily — only on the first click. This is important because modern browsers block audio from auto-playing. By waiting for a user interaction (the click) before creating the Audio object, you comply with browser autoplay policies.

### How the bar animation works
An interval fires every 200ms (5 times per second). Each tick, every bar gets assigned a random new scale value between 0.4 and 1.2. The direction (positive/negative) is also randomized, which makes bars appear to bounce above and below their center line — mimicking a real equalizer.

### The `loop: true` detail
The bg.mp3 audio file is set to loop continuously. Without this, the music would stop after one playthrough. Combined with a seamlessly-looped audio file, the music plays indefinitely without any audible seam.

### Color prop
The component accepts a `color` prop so the bars can be white (on dark sections) or black (on the white AboutSection) — making it reusable across contexts.

---

## STEP 5 — HomePage.jsx (The Orchestration Layer)

### What happens here
`HomePage.jsx` is not a visual section — it's the **conductor**. It holds the state that governs the whole page, sets up the global background parallax animation, and renders all sections in the correct order.

### The borderColor state
As the user scrolls from the dark HeroSection into the white AboutSection, the navbar's border and button colors need to flip from white to black (for readability against the white background). This flip is driven by a state variable `borderColor` in HomePage, which gets passed down to Navbar as a prop. ScrollTrigger watches the AboutSection and updates this state at the right scroll moment.

### The isSidebarOpen state
The hamburger menu button in the Navbar and the close button in the Sidebar both need to control whether the sidebar is visible. State lives in HomePage (the common ancestor of both Navbar and Sidebar), and both components receive it as props — classic React "lifting state up."

### The background parallax — the most dramatic effect
The entire `<main>` container (which holds the arrow-bg.png image) is animated by GSAP on scroll. As the hero section scrolls away:
- On desktop: the container scales up to 10× and shifts 14% right, 22% down
- On mobile: scales to 5× and shifts minimally

This creates the illusion that the background sigil/arrow is zooming toward you at massive scale — like the camera is rapidly pushing into the image. The effect is the single most cinematic moment of the entire scroll experience.

### Why the image transitions from `cover` to `contain`
At scroll start, the background image uses `object-fit: cover` so it fills the entire screen with no empty space. As the animation progresses (reaching 75-80% completion), it transitions to `object-fit: contain` — this allows the full arrow/sigil graphic to be visible without cropping when it's zoomed in large. The transition point is calculated from scroll progress so it feels seamless.

### Layout order matters
The sections render top to bottom in JSX order. Navbar and Sidebar come last in the JSX (even though they appear fixed at the top visually) — this ensures they render on top of all section content via their z-index stacking.

---

## STEP 6 — HeroSection (Act 1)

### Visual goal
The hero should feel like a cinema title card. Mostly empty black space. Two enormous words dominate the screen. Minimal but breathtaking.

### The typography system
The custom `HexaFrame` font is used exclusively for the display headings (`KEEP` and `REIMAGINE`). At `13vw` size, on a 1920px wide screen, each letter is approximately 250px tall. On mobile at 375px, it's still about 49px per letter — readable but dramatic.

`vw` (viewport width) units are used instead of fixed `px` or `rem` sizes because they scale perfectly with any screen size — maintaining the same visual proportion on both mobile and 8K displays.

### The two-heading layout trick
`KEEP` is left-aligned (default). `REIMAGINE` uses `self-end` (flexbox) to push it to the right edge of its column. This creates an asymmetric diagonal reading line that feels dynamic rather than static.

### The descriptor paragraph
A small paragraph of 2-3 lines sits in the top-left, separated by a thin border line. It serves as the film-style opening card — setting context without being distracting. Font is monospace at small size with reduced opacity (0.7) so it doesn't compete with the headings.

### The section counter
`01 / 07` in the bottom-left tells the user there are 7 acts ahead. Micro detail but it sets expectations and feels editorial.

### The entrance animation
When the hero first appears (or scrolls into view), the headings, descriptor, and counter all fade in from 50px below their final position, staggered 0.2s apart. The stagger creates a cascading reveal that feels cinematic rather than all-at-once jarring.

---

## STEP 7 — AboutSection (Act 2)

### Visual goal
Deliberately shocking contrast — after the all-black hero, the About section is **white**. This color flip serves two purposes: it gives the eyes rest after the dark hero, and it signals "here's the story explanation" as a clean editorial environment.

### The layout structure
Two columns side by side:
- **Left (62% width):** The text story side. Contains a section badge, label list, body paragraph, and a small image thumbnail.
- **Right (38% width):** The full portrait image, interactive with ImageTilt.

The proportion asymmetry (62/38) is intentional — it's the golden-ratio-adjacent split that feels more dynamic than 50/50.

### The numbered badge
A small outlined box containing `"01"` sits at the top-left, next to a vertical list of three labels: `"The Project"`, `"The World"`, `"The Keepers"`. This navigation summary tells users where they are in the story and what's coming.

### The ImageTilt usage
The right column's portrait image is wrapped in `ImageTilt` with slightly reduced max tilt (`12°` instead of the default `15°`) and a deeper perspective (`1200px` instead of `1000px`). This makes the tilt feel more subtle and refined — matching the "serious editorial" energy of the white section.

The small thumbnail in the bottom-left of the left column is also wrapped in `ImageTilt` — but at default settings. It's a small video thumbnail (the cinematic ruins landscape) that acts as a "teaser" for the world being described.

### The color switch logic
This section's ScrollTrigger sends `borderColor = 'black'` to the navbar as soon as the section enters view from below. The navbar's border, logo text, and button all flip to dark colors for readability against the white background.

### Mobile behavior
On screens narrower than 768px, the two columns stack vertically. As the user scrolls past this section on mobile, the left column and the small thumbnail fade to opacity:0 via a ScrollTrigger — leaving only the portrait visible briefly before the next section enters.

---

## STEP 8 — Section3 (Act 3 — Scene Reveal)

### Visual goal
The atmosphere dramatically shifts back to black. A large image starts at nothing (invisible, scale 0) and grows outward from the center of the screen — the "world reveals itself" moment. The sensation is like a portal opening.

### The scale-from-zero animation detail
The image starts at `scale: 0` and animates to `scale: 1.1` (slightly overshooting full size for visual drama). The `transformOrigin: 'center'` ensures it grows from the exact center point of the image, like a window opening outward equally in all directions.

### The `start: 'top 30%'` trigger point
The animation doesn't start the moment Section3 enters the viewport (which would be `top 100%`). It waits until the top of Section3 reaches 30% down from the top of the viewport. This means the user has already scrolled significantly into the section before the reveal begins — creating a sense of anticipation.

### The data grid below the image
Below the expanding image, a grid of rows styled like a coordinate system or classified mission brief adds narrative texture. Each row has a label in small monospace font, a coordinate-style value, and optionally a small media element (video on row 1, image thumbnail on row 2). This creates the feeling of a "world database" or intelligence briefing.

### The horizontal rule dividers
Thin 1px white/20% opacity lines separate each row. These subtle separators give structure without visually competing with the dramatic image above.

### The handoff to Section4
When Section4 enters view, a second ScrollTrigger fires and scales the Section3 image back to `scale: 0`. This creates a sense that the image "closes" as the next portal "opens" — maintaining the continuous scroll narrative.

---

## STEP 9 — Section4 (Act 4 — Expanding Circles)

### Visual goal
Deep dark purple environment. Three large rounded squares/circles in purple tones bloom outward from the center in sequence. Behind them all, a portrait of The Keeper emerges — as if the circles are the energy emanating from this figure.

### The three circles and why three
Three circles at different purple tones (light purple/lavender, medium purple, deep purple) give the bloom a sense of depth and layering. They animate to slightly different final scales (1.1, 1.2, 1.3) so they don't perfectly overlap — creating visible ring spacing.

Each circle is 1300×1300px but positioned absolutely at center. They overlap each other by z-order: the first circle renders behind the second, the second behind the third, and the portrait image is in front of all three.

### The purple palette choice
The site's primary accent color is purple because it sits between the warmth of magic/royalty and the coldness of technology/mystery. It's the color most associated with arcane, fantastical, and premium aesthetics.

### The fixed-image (portrait) animation
The Keeper portrait starts at `scale: 0.3` and `opacity: 0` — invisible and tiny. As the circles bloom outward, the portrait scales up and fades in simultaneously. The effect feels like the circles are "revealing" the figure by parting like curtains.

The portrait image (`section4-image.png`) must have a pure black or transparent background for this effect to work. If the image had a grey or colored background, the compositing over the purple circles would look wrong.

### The vertical text strip
A text string (like `"KEEPERS — GUARDIANS OF THE THRESHOLD"`) is rotated 270 degrees and positioned along the left edge of the section. This is a pure typographic design element — it frames the visual and adds editorial sophistication without taking up horizontal space.

### Mobile adjustments
On mobile, the circles would start from 200px above their center position (the `y: -200` initial value). This compensates for the smaller viewport — on mobile the circles entering from slightly above center looks more dramatic than entering from exactly center.

---

## STEP 10 — Section5 + CardGallery (Act 5 — The Collection)

### Visual goal
A two-part layout: left side has text context, right side shows an auto-rotating 3D card gallery. The cards are arranged in two fans (left and right) that continuously rotate through their stack positions — like shuffling a deck in slow motion.

### The CardGallery 3D logic
There are 6 cards on the left fan and 6 cards on the right fan. Each card exists at an absolute center position initially. A CSS 3D `translate3D(x, 0, z)` transform is applied to each card to offset it from center — creating the fan spread effect.

The `x` value moves cards horizontally (left fan goes negative x, right fan goes positive x). The `z` value moves cards into the depth axis — cards further from center go deeper into the screen (more negative z), creating perspective.

### The auto-rotation mechanism
Every 1 second, each card's counter advances by 1 (looping from 6 back to 1). The counter determines which position in the perspective array that card currently occupies. As the counter changes, the CSS transform updates, and the `transition-transform duration-700` CSS makes it smoothly glide to the new position. The effect looks like cards continuously cycling through the stack.

### The `perspective: 1000px` context
The gallery container has a CSS `perspective: 1000px` applied. This is the "camera lens" for the 3D effect. It determines how extreme the perspective distortion appears — closer to the viewer (smaller value) means more dramatic perspective, further away means subtler. 1000px is a balanced choice for this card size.

### ScrollTrigger integration
The entire Section5 (both text and gallery) fades in from opacity 0 and scales in from scale 0 as it scrolls into view. The text comes in slightly before the gallery for a staggered reveal.

---

## STEP 11 — Section6 (Act 6 — Pinned Storytelling) ⭐

### Visual goal
This is the most technically complex and visually spectacular section. It doesn't scroll past like the others — it **locks** to the top of the viewport. As the user continues scrolling (through three viewport-heights worth of scroll distance), three story acts play out in sequence through animation, while the section itself stays completely still.

### What "pinning" means
GSAP's `pin: true` tells ScrollTrigger to apply a CSS `position: fixed` equivalent to the section, holding it in place while the page's scroll position continues advancing below it. `pinSpacing: true` adds a corresponding empty block of space below the section so the total scrollable height of the page is preserved.

### The three acts structure
Left side: Three text blocks stacked vertically, all starting at `opacity: 0`.
Right side: Three images stacked absolutely on top of each other, all starting invisible.

As scroll progresses:
- **Act I:** The first text block fades in. The first image scales up from 80% to 125%.
- **Act II:** The second text block fades in. The second image does a **clip-path wipe reveal** — it's revealed from left to right as if a curtain is pulling back.
- **Act III:** The third text block fades in. The third image scales up dramatically to 150%.

### The clip-path wipe reveal detail
The second image starts with `clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)` — effectively hidden (zero width). As scroll progresses, the first polygon point moves from `0% 0%` to `100% 0%`, and the last point from `0% 100%` to `100% 100%`. This gradually expands a visible window from left to right across the image. The result looks like a horizontal wipe effect, as if someone is pulling a shade off the image.

### Why this section uses `duration: 0.4` on each step
In a pinned GSAP timeline, `duration` doesn't mean seconds — it means "proportion of the total scroll distance." Each act gets about 1/6th of the total scroll journey (0.4 out of ~2.4 total duration units). This distributes the storytelling evenly across the three viewport-heights of scroll space.

### The `scrub: true` behavior
Because `scrub: true` is set, the animation is tied directly to scroll position — not time. If the user scrolls slowly, the acts reveal slowly. If they scroll quickly, the acts reveal quickly. If they scroll backward, the animation reverses. This gives the user full control over the pacing of the story — they literally "wind through" the narrative with their scroll.

---

## STEP 12 — Section7 (Act 7 — Keepers CTA)

### Visual goal
The closing act. Returns to dark. A giant "KEEPERS" heading. The best portrait (section7-image.png) in the most prominent placement. A clear CTA box inviting the user to "Become a Keeper."

### The heading + vertical strip composition
The massive "KEEPERS" heading sits at the top. On the far left edge, a 270°-rotated text strip adds a border to the composition without taking horizontal space. The portrait image occupies the center-right. The CTA box sits bottom-left.

This diagonal composition (heading top-left → portrait center-right → CTA bottom-left) creates a Z-pattern reading flow — the most natural eye path for western readers.

### The CTA box design
A rectangular box with a very thin white border (1px, low opacity) and an almost-invisible dark glass background. Inside: a title "Become a Keeper", 2 lines of description text, and a pill-shaped "Join Now →" button. The glassmorphism styling matches the dark luxury aesthetic without being distracting.

### The scale-up animation
Both the heading and the portrait image start at `scale: 0` and scale up as the section scrolls into view. The CTA box and description text fade in with a `y: 150px` upward slide. The combination of scaling elements + sliding elements creates layered dynamism.

---

## STEP 13 — Navbar

### What makes this navbar special

**Scroll progress bar:** A thin 3px bar sits at the very top edge of the navbar, filling from left to right as the user scrolls down the page. Its width is calculated as `(scrollY / totalScrollHeight) × 100%` — giving real-time visual feedback of how far through the experience the user is.

**Dynamic color system:** The navbar starts white (text/border/button) over the dark hero. When the user scrolls into the white AboutSection, everything flips to black for readability. When they scroll back to dark sections, it flips back. This is driven by GSAP ScrollTrigger watching the AboutSection's scroll position.

**ShuffleText on menu items:** Each nav link uses the ShuffleText effect on hover — reinforcing the site's signature interaction pattern even in the most utilitarian UI element.

**`pointer-events: none` on the nav container:** The overall nav has pointer events disabled. Individual interactive elements (the logo, the menu links, the button) re-enable pointer events on themselves. This allows scroll clicks to "pass through" the navbar to the content beneath it — common in overlay navbars.

### The hamburger/sidebar trigger
On mobile, the nav items collapse and a hamburger icon or menu button appears. Clicking it sets `isSidebarOpen = true`, which causes the Sidebar to slide in from the left.

---

## STEP 14 — Sidebar

### What it is
A fullscreen overlay that slides in from the left edge of the screen when the menu is opened. It covers most of the page with a dark black panel.

### Two-column interior layout
The sidebar itself has two internal columns:
- **Left column (500px):** The actual navigation content. Top half: the "Discover" ShuffleText label + large nav links. Bottom half: social links + copyright.
- **Right column (remaining width):** Decorative and functional extras. Close button (×) at top-right, the MusicBarIcon equalizer, and the section7-image.png portrait displayed via ImageTilt.

The right column is hidden on mobile — on small screens, only the left column's navigation content matters.

### The open/close animation
The sidebar's `left` CSS property transitions between `-100%` (hidden off-screen to the left) and `0` (fully visible). This is a pure CSS transition (500ms ease-in-out) — no GSAP needed for this simple slide.

### ShuffleText on sidebar links
The large 64px navigation links in the sidebar also use ShuffleText — clicking them closes the sidebar (sets `isSidebarOpen = false`) and navigates to the section. The scramble-then-resolve animation on these large links is especially dramatic.

---

## STEP 15 — PreFooter

### What it is
A transitional section between Section7 and the Footer. It serves as a navigation "table of contents" at the end of the experience — allowing users who just finished scrolling to easily jump to any section.

### The "ACTIVATE CONSOLE FOR ACCESS" header
This terminal-style prompt appears inside a bordered box with monospace font and extended letter-spacing. The ShuffleText effect runs on it with `speed: 1` — extremely fast scrambling that looks like instant decryption. It's a purely atmospheric UI element that reinforces the site's "secret access system" identity.

### The large nav links
The nav items render at `4xl` (36px) size in monospace font — much larger than a typical footer nav. On hover, each item slides 16px to the right via a `padding-left` transition, giving tactile depth to the hover state. Each link also uses ShuffleText.

---

## STEP 16 — Footer

### The giant KPR wordmark
A 600px-tall "KPR" in HexaFrame font sits absolutely positioned at the very bottom of the footer section. It's rendered at only 15% opacity (`text-white/15`) so it appears as a watermark/texture rather than a primary element. The scale of it — filling the entire viewport width — makes it architecturally impressive even at low opacity.

### Layout structure
Three visual bands:
1. **Top band:** Connect label (ShuffleText) + OpenSea marketplace link + "Buy On" CTA
2. **Middle:** The massive KPR wordmark (absolutely positioned, doesn't affect flow)
3. **Bottom band:** Legal links (Privacy Policy, Terms, Legal, License) + copyright

### The ShuffleText on all footer links
Even the legal links use ShuffleText. This maintains the interaction consistency — hover any text element on the site and it scrambles. This kind of detail is what separates a "good" website from a "great" one.

---

## STEP 17 — Full Animation Pass

### What this step is
After all sections are built and rendering correctly, you do a dedicated pass through every GSAP ScrollTrigger to verify:

1. **Timing** — Does each animation start at the right scroll position? Adjust `start` and `end` values.
2. **Scrub smoothness** — Does `scrub: true` feel buttery or jerky? Adjust the scrub value (can be a number like `scrub: 2` for slower catch-up).
3. **Stagger** — Do multiple elements animate in a pleasing sequence or all at once?
4. **Mobile** — Do all conditional `window.innerWidth` checks produce the right mobile vs desktop behaviors?
5. **Section6 pacing** — Is the pinned section's three acts distributed evenly? Does each act feel like it has enough scroll distance?

### The `gsap.context()` pattern review
Every component's `useEffect` should wrap all GSAP code in `gsap.context()` and return `() => ctx.revert()` as cleanup. This prevents animation memory leaks when React re-renders or unmounts components.

---

## STEP 18 — Mobile Responsive Pass

### Test at exactly these three widths
- **375px** — iPhone SE / smallest common phone
- **768px** — Tablet / iPad portrait
- **1024px** — Small laptop

### Key things to verify

**HeroSection:** At 375px, the `13vw` headings become ~49px each. Still readable. The `pl-28` padding on desktop collapses to `px-2` on mobile so headings don't overflow.

**AboutSection:** Two columns must collapse to single column below 768px. The right portrait image should take full width on mobile.

**Section4 circles:** The `w-[1300px]` circles are larger than any mobile viewport. They should be allowed to overflow (the section has `overflow-hidden`) — the result is the purple color fills the screen dramatically.

**Section6 pinned section:** This section must be tested most carefully on mobile. The pinning behavior can feel different at different scroll speeds on mobile. Test with both fast and slow scrolling.

**Sidebar:** On mobile, the sidebar must be full-width (`max-sm:w-full` on the left column) and the right column must be hidden (`max-sm:hidden`).

**Footer KPR wordmark:** At 375px viewport, `600px` text overflows. This is intentional — only part of the letters are visible, which looks editorial. But verify the overflow is hidden properly.

---

## STEP 19 — Performance Audit

### Things to verify in Chrome DevTools

**No console errors or warnings** — Especially watch for GSAP "Cannot tween a null target" warnings which indicate ScrollTrigger refs aren't finding their elements.

**Scroll FPS** — Open Performance tab, record a scroll through the page. Target 60fps throughout. If it drops below 30fps, identify which animation is causing the drop.

**`will-change` is applied** — In the Elements panel, verify that animated elements have `will-change: transform` or `will-change: opacity` in their computed styles. This signals to the GPU to pre-composite these layers.

**Images are loading** — Network tab should show all images loading from `/images/`. If any show 404, the filename or path is wrong.

**GSAP context cleanup** — Navigate to a route and back (if you add routing). No duplicate animations should start — the `ctx.revert()` cleanup prevents double-firing.

### Image optimization recommendations
- `arrow-bg.png` should be compressed (it's the largest — 3000×2000px). Aim under 800KB.
- All 12 card images should be WebP format at 750×1050px — WebP at quality 80 should be under 100KB each.
- `section3-bg.jpg` is the second largest. JPG at quality 85 for a 4K image should be around 1-2MB — acceptable for a hero reveal image.

---

## Summary — Build Order with Time Estimates

| Step | What | Estimated Time |
|------|------|----------------|
| 1 | Project init + dependencies + config | 15 minutes |
| 2 | App.jsx Lenis + GSAP wiring | 10 minutes |
| 3 | Create all empty files/folders | 5 minutes |
| 4A | ImageTilt.jsx | 20 minutes |
| 4B | ShuffleText.jsx | 15 minutes |
| 4C | MusicBarIcon.jsx | 15 minutes |
| 5 | HomePage.jsx (state + parallax) | 30 minutes |
| 6 | HeroSection.jsx | 20 minutes |
| 7 | AboutSection.jsx | 30 minutes |
| 8 | Navbar.jsx | 30 minutes |
| 9 | Sidebar.jsx | 25 minutes |
| 10 | Section3.jsx | 25 minutes |
| 11 | Section4.jsx | 30 minutes |
| 12 | CardGallery.jsx + Section5.jsx | 35 minutes |
| 13 | Section6.jsx (pinned) | 45 minutes |
| 14 | Section7.jsx | 20 minutes |
| 15 | PreFooter.jsx | 15 minutes |
| 16 | Footer.jsx | 15 minutes |
| 17 | Full animation pass | 45 minutes |
| 18 | Mobile responsive pass | 30 minutes |
| 19 | Performance audit | 20 minutes |
| **TOTAL** | | **~7.5 hours** |

---

## 🔑 Key Decisions Summary

| Decision | Reason |
|----------|--------|
| Vite over Create React App | 10-50× faster dev server startup, native ESM, better HMR |
| Tailwind v4 over v3 | Cleaner install (Vite plugin), no separate config file needed |
| GSAP over Framer Motion | ScrollTrigger has no equivalent in Framer Motion. GSAP is the industry standard for complex scroll animations. |
| Lenis over native scroll | Native scroll on macOS trackpads is fine, but Lenis gives cross-platform consistency and the GSAP ticker integration |
| `public/images/` over `src/assets/` | Avoids Vite bundling overhead for large images; cleaner path references |
| `useCallback` on event handlers | Prevents unnecessary re-renders on components that re-render frequently (like during scroll animations) |
| `gsap.context()` pattern | React StrictMode renders components twice in development — context cleanup prevents double-animations |
| Section6 built last | It's the most complex and depends on understanding all other patterns first |
