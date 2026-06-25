import { useState, useRef, useCallback } from 'react'

// Full character pool used during scramble animation
const LETTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-@#$%^&*+{}:,./;='

/**
 * ShuffleText
 * ───────────
 * On mouse enter: scrambles characters randomly, then resolves
 * them one-by-one left-to-right back to the real text.
 * On mouse leave: nothing (text remains real).
 *
 * @param {string}  text      - The real text to display / scramble
 * @param {string}  className - CSS classes for the <span>
 * @param {number}  speed     - Interval speed in ms (lower = faster scramble)
 * @param {boolean} autoPlay  - If true, plays the scramble animation on mount
 */
export const ShuffleText = ({
  text,
  className = '',
  speed = 40,
  autoPlay = false,
}) => {
  const [displayText, setDisplayText] = useState(text)
  const intervalRef = useRef(null)
  const hasPlayedRef = useRef(false)

  const scramble = useCallback(() => {
    clearInterval(intervalRef.current)
    let iterations = 0

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((_, index) => {
            // Characters left of cursor → resolved to real char
            if (index < iterations) return text[index]
            // Characters right of cursor → random scramble
            return LETTERS[Math.floor(Math.random() * LETTERS.length)]
          })
          .join('')
      )

      // Advance cursor by 1/3 per tick — three scramble frames per character
      iterations += 1 / 3

      if (iterations >= text.length) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
      }
    }, speed)
  }, [text, speed])

  // Auto-play once on mount if requested
  const refCallback = useCallback(
    (node) => {
      if (node && autoPlay && !hasPlayedRef.current) {
        hasPlayedRef.current = true
        setTimeout(scramble, 300)
      }
    },
    [autoPlay, scramble]
  )

  return (
    <span
      ref={refCallback}
      className={className}
      onMouseEnter={scramble}
      style={{ cursor: 'default', fontVariantNumeric: 'tabular-nums' }}
    >
      {displayText}
    </span>
  )
}

export default ShuffleText
