"use client";

import { useUI } from "@/app/providers";
import { TECHNOLOGIES } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Technologies() {
  const { lang } = useUI();
  return (
    <section id="tech">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{TECHNOLOGIES.kicker[lang]}</div>
            <h2>{TECHNOLOGIES.title[lang]}</h2>
            <p>{TECHNOLOGIES.lead[lang]}</p>
          </Reveal>
        </div>

        {/* layered architecture: read top (surface) → bottom (foundation),
            bound by a continuous spine; each slab carries a "thickness" edge
            so the three layers read as one physical stack */}
        <Reveal>
          <div
            className="stack3d"
            role="list"
            aria-label={lang === "en" ? "Technology stack, top to bottom" : "Tehnološki stek, odozgo nadole"}
          >
            {TECHNOLOGIES.layers.map((l, i) => (
              <div className="slab" role="listitem" key={i} style={{ ["--si" as string]: i }}>
                <span className="slab-ix" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="slab-meta">
                  <span className="slab-name">{l.name[lang]}</span>
                  <span className="slab-role">{l.role[lang]}</span>
                </div>
                <div className="slab-tech">
                  {l.items.map((t) => (
                    <span className="techpill" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
