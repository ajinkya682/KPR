import { useState, useRef } from 'react'

/**
 * MusicBarIcon
 * ────────────
 * Five animated vertical bars styled as an audio equalizer.
 * Clicking toggles ambient background music on/off.
 * Audio is created lazily (first click) to comply with browser autoplay policy.
 *
 * @param {string} color     - Bar color (CSS color value, default 'white')
 * @param {string} audioSrc  - Path to audio file (default '/audio/bg.mp3')
 */
export default function MusicBarIcon({
  color = 'white',
  audioSrc = '/audio/bg.mp3',
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [barHeights, setBarHeights] = useState([0.5, 0.5, 0.5, 0.5, 0.5])
  const audioRef = useRef(null)
  const animationRef = useRef(null)

  const togglePlay = () => {
    // Lazy init — create Audio only on first user interaction
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = 0.4
    }

    if (isPlaying) {
      // ── PAUSE ─────────────────────────────────────────────────
      audioRef.current.pause()
      clearInterval(animationRef.current)
      // Return bars to neutral flat position
      setBarHeights([0.5, 0.5, 0.5, 0.5, 0.5])
    } else {
      // ── PLAY ──────────────────────────────────────────────────
      audioRef.current.play().catch(() => {
        // Autoplay blocked — silently fail
        console.warn('Audio playback blocked by browser.')
      })

      // Animate bars randomly every 200ms (5fps feel)
      animationRef.current = setInterval(() => {
        setBarHeights((prev) =>
          prev.map(() => {
            const scale = 0.3 + Math.random() * 0.9
            // Randomly flip direction for organic equalizer feel
            return Math.random() > 0.5 ? scale : -scale
          })
        )
      }, 200)
    }

    setIsPlaying((prev) => !prev)
  }

  return (
    <button
      onClick={togglePlay}
      title={isPlaying ? 'Pause music' : 'Play ambient music'}
      aria-label={isPlaying ? 'Pause music' : 'Play ambient music'}
      className="flex items-center justify-center gap-[2px] h-5 w-6 bg-transparent border-none cursor-pointer p-0 outline-none"
    >
      {barHeights.map((scale, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '10px',
            backgroundColor: color,
            borderRadius: '1px',
            transform: `scaleY(${Math.abs(scale)})`,
            transformOrigin: 'center',
            transition: 'transform 180ms ease-in-out',
            opacity: isPlaying ? 1 : 0.5,
          }}
        />
      ))}
    </button>
  )
}
