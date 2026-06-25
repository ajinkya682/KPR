import { useState, useEffect } from 'react'

// Perspective arrays: each entry defines x (horizontal) and z (depth) translation
// for each of the 6 positions in the fan
const LEFT_PERSPECTIVES = [
  { x: -4,  z: -1  },
  { x: -8,  z: -3  },
  { x: -12, z: -6  },
  { x: -16, z: -10 },
  { x: -20, z: -14 },
  { x: -24, z: -18 },
]

const RIGHT_PERSPECTIVES = [
  { x:  4,  z: -1  },
  { x:  8,  z: -3  },
  { x:  12, z: -6  },
  { x:  16, z: -10 },
  { x:  20, z: -14 },
  { x:  24, z: -18 },
]

const TOTAL_CARDS = 6

export default function CardGallery() {
  // Each counter value (1-6) maps to a position in the perspective array
  const [leftCounters,  setLeftCounters]  = useState([1, 2, 3, 4, 5, 6])
  const [rightCounters, setRightCounters] = useState([1, 2, 3, 4, 5, 6])

  // Auto-advance every 1 second to rotate the deck
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCounters( (prev) => prev.map((c) => (c >= TOTAL_CARDS ? 1 : c + 1)))
      setRightCounters((prev) => prev.map((c) => (c >= TOTAL_CARDS ? 1 : c + 1)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const getLeftTransform = (index) => {
    const p = LEFT_PERSPECTIVES[rightCounters[index] - 1]
    return `translate3d(${p.x}rem, 0, ${p.z}rem)`
  }

  const getRightTransform = (index) => {
    const p = RIGHT_PERSPECTIVES[leftCounters[index] - 1]
    return `translate3d(${p.x}rem, 0, ${p.z}rem)`
  }

  return (
    <div
      className="gallery relative flex items-center justify-center w-full h-[420px] md:h-[500px]"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {/* ── Left fan — 6 cards fanning to the left ────────────────── */}
      {Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1).map((n, index) => (
        <div
          key={`left-${n}`}
          className="absolute w-28 md:w-36 rounded-xl overflow-hidden
                     border border-white/10 shadow-xl"
          style={{
            aspectRatio: '2/3',
            transform: getLeftTransform(index),
            transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
            zIndex: TOTAL_CARDS - index,
          }}
        >
          <img
            src={`/images/left-${n}.webp`}
            alt={`KPR card left ${n}`}
            draggable={false}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* ── Right fan — 6 cards fanning to the right ──────────────── */}
      {Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1).map((n, index) => (
        <div
          key={`right-${n}`}
          className="absolute w-28 md:w-36 rounded-xl overflow-hidden
                     border border-white/10 shadow-xl"
          style={{
            aspectRatio: '2/3',
            transform: getRightTransform(index),
            transition: 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
            zIndex: TOTAL_CARDS - index,
          }}
        >
          <img
            src={`/images/right-${n}.webp`}
            alt={`KPR card right ${n}`}
            draggable={false}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
