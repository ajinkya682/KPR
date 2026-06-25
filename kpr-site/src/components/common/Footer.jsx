import { ShuffleText } from '../../effects/ShuffleText'

const LEGAL_LINKS = [
  { text: 'Privacy Policy', path: '#privacy' },
  { text: 'Terms of Service', path: '#terms' },
  { text: 'Legal',    path: '#legal'   },
  { text: 'License',  path: '#license' },
]

export default function Footer() {
  return (
    <footer className="footer relative z-10 min-h-screen bg-[#000000] text-white
                       flex flex-col justify-between px-6 md:px-14 py-16 overflow-hidden">

      {/* ── Top strip: Connect + marketplace links ────────────────── */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-[11px] font-mono text-white/40 tracking-[0.4em] uppercase">
          <ShuffleText text="Connect" speed={25} />
        </span>
        <div className="flex items-center gap-8">
          <a
            href="https://opensea.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-white/40 hover:text-white
                       transition-colors tracking-widest uppercase"
          >
            <ShuffleText text="OpenSea ↗" speed={20} />
          </a>
          <a
            href="#"
            className="text-[11px] font-mono text-white/40 hover:text-white
                       transition-colors tracking-widest uppercase"
          >
            <ShuffleText text="Buy On →" speed={20} />
          </a>
        </div>
      </div>

      {/* ── Giant KPR wordmark — watermark behind everything ─────── */}
      <div
        className="absolute bottom-0 left-1/2 pointer-events-none select-none"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <h1
          className="font-['HexaFrame'] text-white leading-none"
          style={{
            fontSize: 'clamp(200px, 40vw, 600px)',
            opacity: 0.07,
            letterSpacing: '-0.02em',
          }}
        >
          KPR
        </h1>
      </div>

      {/* ── Bottom strip: legal links + copyright ─────────────────── */}
      <div className="flex flex-col md:flex-row items-start md:items-center
                      justify-between gap-4 relative z-10">
        <ul className="flex flex-wrap gap-4 md:gap-8">
          {LEGAL_LINKS.map((item, i) => (
            <li key={i}>
              <a href={item.path}>
                <ShuffleText
                  text={item.text}
                  className="text-[10px] font-mono text-white/25 hover:text-white/60
                             transition-colors tracking-widest uppercase"
                  speed={20}
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[10px] font-mono text-white/15 tracking-wider">
          © 2025 KPR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
