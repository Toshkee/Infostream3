"use client";

import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Reveal } from "./Reveal";

/* certification glyphs — stroked SVG, inherit currentColor (no emoji) */
function CertIcon({ kind }: { kind: "shield" | "quality" | "bolt" }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (kind === "shield")
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  if (kind === "quality")
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="5.2" />
        <path d="M9.6 9l1.7 1.7 3.1-3.2" />
        <path d="M8.4 13.4L7 21l5-2.4L17 21l-1.4-7.6" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6l7-3z" />
      <path d="M12.6 8l-3 4.2h2.4L11.4 16l3-4.2H12L12.6 8z" />
    </svg>
  );
}

export function Security() {
  const { lang } = useUI();
  const s = STR.security;
  return (
    <section id="security" className="tonal sec-tight">
      <div className="wrap">
        <div className="sec-head">
          <Reveal>
            <div className="kick">{s.kicker[lang]}</div>
            <h2>{s.title[lang]}</h2>
            <p>{s.lead[lang]}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="certgrid">
            {s.certs.map((c, i) => (
              <article className="certcard" key={c.code} style={{ ["--ci" as string]: i }}>
                <div className="cc-top">
                  <span className="cc-ic">
                    <CertIcon kind={c.icon} />
                  </span>
                  <span className="cc-tag">{c.tag[lang]}</span>
                </div>
                <h3 className="cc-code">{c.code}</h3>
                <div className="cc-name">{c.name[lang]}</div>
                <p className="cc-desc">{c.desc[lang]}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
