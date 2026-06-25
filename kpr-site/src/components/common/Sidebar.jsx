import { ImageTilt }    from '../../effects/ImageTilt'
import { ShuffleText }  from '../../effects/ShuffleText'
import MusicBarIcon     from '../../effects/MusicBarIcon'

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, menuItems = [] }) {
  return (
    <>
      {/* ── Backdrop overlay ─────────────────────────────────────────── */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm transition-all duration-500"
        style={{
          opacity:        isSidebarOpen ? 1  : 0,
          pointerEvents:  isSidebarOpen ? 'auto' : 'none',
        }}
      />

      {/* ── Sidebar panel ────────────────────────────────────────────── */}
      <aside
        className="fixed top-0 left-0 h-full z-[100] flex transition-transform duration-500 ease-in-out"
        style={{
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          willChange: 'transform',
        }}
      >
        {/* ── Inner container ──────────────────────────────────────── */}
        <div className="flex h-full bg-[#0a0a0a] rounded-r-2xl overflow-hidden
                        border-r border-white/10 shadow-2xl"
          style={{ minWidth: 'min(90vw, 820px)' }}>

          {/* ═══════════════════════════════════════════════════════════
              LEFT COLUMN — Navigation
          ═══════════════════════════════════════════════════════════ */}
          <div className="flex flex-col justify-between p-10 md:p-14 w-full md:w-[480px]">

            {/* Top: Discover label + nav links */}
            <div>
              <p className="text-[10px] font-mono tracking-[0.4em] text-white/30 mb-10 uppercase">
                <ShuffleText text="Discover" speed={15} />
              </p>

              <nav>
                <ul className="flex flex-col">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="border-b border-white/10 last:border-0"
                    >
                      <a
                        href={item.link}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between py-5 text-white
                                   text-4xl md:text-5xl font-bold leading-tight
                                   hover:text-purple-300 transition-colors duration-200
                                   group"
                      >
                        <ShuffleText
                          text={item.text}
                          speed={25}
                          className="group-hover:tracking-wider transition-all duration-300"
                        />
                        <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 transform duration-200">
                          →
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Bottom: Social links + copyright */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-xs font-mono text-white/40 hover:text-white
                             transition-colors tracking-widest uppercase"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-xs font-mono text-white/40 hover:text-white
                             transition-colors tracking-widest uppercase"
                >
                  Discord
                </a>
                <a
                  href="#"
                  className="text-xs font-mono text-white/40 hover:text-white
                             transition-colors tracking-widest uppercase"
                >
                  OpenSea
                </a>
              </div>
              <p className="text-[10px] font-mono text-white/20">
                © 2025 KPR. All rights reserved.
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT COLUMN — Portrait + Audio (hidden on mobile)
          ═══════════════════════════════════════════════════════════ */}
          <div className="hidden md:flex flex-col items-end justify-between
                          flex-1 p-10 border-l border-white/5">

            {/* Top: Close button + MusicBarIcon */}
            <div className="flex items-center gap-6 self-end">
              <MusicBarIcon color="white" />
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white/40 hover:text-white text-3xl font-thin
                           transition-all duration-300 hover:rotate-90 leading-none"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Center: Portrait image (ImageTilt) */}
            <div className="flex-1 flex items-center justify-center w-full max-w-[240px] mx-auto">
              <div className="w-full aspect-[2/3] rounded-xl overflow-hidden">
                <ImageTilt
                  src="/images/section7-image.png"
                  alt="The Prime Keeper"
                  tiltOptions={{ max: 10, perspective: 1200, speed: 500 }}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Bottom: decorative mono text */}
            <p className="text-[9px] font-mono text-white/15 tracking-[0.5em] uppercase self-start">
              KPR — 2025
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
