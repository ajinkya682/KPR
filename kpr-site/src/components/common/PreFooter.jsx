import { ShuffleText } from '../../effects/ShuffleText'

const NAV_ITEMS = [
  { text: 'Project',     path: '#project'     },
  { text: 'The Keepers', path: '#keepers'     },
  { text: 'The World',   path: '#world'       },
  { text: 'Sign In',     path: '#signin'      },
]

export default function PreFooter() {
  return (
    <section className="prefooter relative z-10 min-h-[60vh] bg-[#0a0a0a] text-white
                        px-6 md:px-14 py-20 flex flex-col justify-between gap-14">

      {/* ── Terminal-style header prompt ──────────────────────────── */}
      <div className="border border-white/10 rounded-lg px-6 py-4 w-max max-w-full
                      bg-white/[0.02]">
        <p className="text-[11px] font-mono tracking-[0.4em] text-white/50 uppercase">
          <ShuffleText
            text="ACTIVATE CONSOLE FOR ACCESS"
            speed={1}
            autoPlay={true}
          />
        </p>
      </div>

      {/* ── Large navigation links ────────────────────────────────── */}
      <nav>
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={index}
              className="border-b border-white/5 last:border-0 group"
            >
              <a
                href={item.path}
                className="flex items-center justify-between py-5 md:py-6
                           text-3xl md:text-4xl font-bold text-white/80
                           hover:text-white hover:pl-4 transition-all duration-300"
              >
                <ShuffleText text={item.text} speed={30} />
                <span className="text-xl opacity-0 group-hover:opacity-100
                                 transition-opacity duration-200 text-purple-400">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Bottom strip ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono text-white/20 tracking-[0.3em]">
          KPR — SCROLL COMPLETE
        </p>
        <div className="w-8 h-px bg-white/10" />
      </div>
    </section>
  )
}
