import { useRef, useState, useCallback } from 'react'

/**
 * ImageTilt
 * ─────────
 * Wraps any image in a 3D perspective tilt container.
 * On mouse move: rotates the image in 3D toward the cursor.
 * On mouse leave: smoothly resets to flat.
 *
 * @param {string}  src         - Image source path
 * @param {string}  alt         - Alt text
 * @param {string}  className   - Extra classes for the <img>
 * @param {object}  tiltOptions - Override default tilt settings
 * @param {string}  containerClass - Extra classes for the wrapper div
 */
export const ImageTilt = ({
  src,
  alt = '',
  className = '',
  containerClass = '',
  tiltOptions = {},
}) => {
  const cardRef = useRef(null)
  const [transform, setTransform] = useState('')

  // Default tilt configuration
  const defaults = {
    max: 15,           // Maximum rotation angle in degrees
    perspective: 1000, // CSS perspective depth (px) — lower = more dramatic
    scale: 1.05,       // Slight zoom on hover for depth feel
    speed: 400,        // Transition speed in ms
  }

  const { max, perspective, scale, speed } = { ...defaults, ...tiltOptions }

  // ── Mouse move: calculate 3D rotation from cursor position ──
  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()

      // Distance from card center (−1 to +1 range)
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = e.clientX - centerX
      const mouseY = e.clientY - centerY

      // Map to rotation degrees (clamped by max)
      const rotateX = ((mouseY / rect.height) * max).toFixed(2)
      const rotateY = ((mouseX / rect.width) * max).toFixed(2)

      setTransform(
        `perspective(${perspective}px) ` +
        `scale3d(${scale},${scale},${scale}) ` +
        `rotateX(${rotateX}deg) ` +
        `rotateY(${rotateY}deg)`
      )
    },
    [max, perspective, scale]
  )

  // ── Mouse leave: reset to flat ──────────────────────────────
  const handleMouseLeave = useCallback(() => {
    setTransform(
      `perspective(${perspective}px) scale3d(1,1,1) rotateX(0deg) rotateY(0deg)`
    )
  }, [perspective])

  return (
    <div
      ref={cardRef}
      className={`relative w-full h-full ${containerClass}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        transition: `transform ${speed}ms cubic-bezier(0.03, 0, 0.98, 0.9)`,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`w-full h-full object-cover ${className}`}
        style={{
          transform: 'translateZ(20px)', // Float above the card plane
          willChange: 'transform',
        }}
      />
    </div>
  )
}

export default ImageTilt
