"use client";

import { useUI } from "@/app/providers";
import { SECTORS } from "@/lib/content";
import { Reveal } from "./Reveal";

/* sector glyphs — stroked SVG, inherit currentColor (no emoji) */
function SectorIcon({ kind }: { kind: string }) {
  const c = { width: 21, height: 21, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (kind) {
    case "gov":
      return (
        <svg {...c}>
          <path d="M3 10l9-5 9 5" />
          <path d="M5 10v8M12 10v8M19 10v8" />
          <path d="M3 21h18" />
        </svg>
      );
    case "tax":
      return (
        <svg {...c}>
          <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
          <path d="M9 8h6M9 12h4" />
        </svg>
      );
    case "defense":
      return (
        <svg {...c}>
          <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
        </svg>
      );
    case "funds":
      return (
        <svg {...c}>
          <ellipse cx="12" cy="7" rx="6.5" ry="2.6" />
          <path d="M5.5 7v4c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6V7" />
          <path d="M5.5 11v4c0 1.4 2.9 2.6 6.5 2.6s6.5-1.2 6.5-2.6v-4" />
        </svg>
      );
    case "bank":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    default:
      return (
        <svg {...c}>
          <circle cx="12" cy="13" r="1.6" />
          <path d="M8.7 9.7a4.5 4.5 0 0 0 0 6.6M15.3 9.7a4.5 4.5 0 0 1 0 6.6" />
          <path d="M6.3 7.3a8 8 0 0 0 0 11.4M17.7 7.3a8 8 0 0 1 0 11.4" />
        </svg>
      );
  }
}

export function Sectors() {
  const { lang } = useUI();
  return (
    <section id="sectors" style={{ paddingTop: 10 }}>
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{SECTORS.kicker[lang]}</div>
            <h2>{SECTORS.title[lang]}</h2>
            <p>{SECTORS.lead[lang]}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="sectorgrid" role="list">
            {SECTORS.items.map((s, i) => (
              <div className="sectile" role="listitem" key={s.icon} style={{ ["--ci" as string]: i }}>
                <span className="st-ic">
                  <SectorIcon kind={s.icon} />
                </span>
                <div className="st-body">
                  <span className="st-name">{s.name[lang]}</span>
                  <span className="st-note">{s.note[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
