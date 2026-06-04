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
            <h2>{TECHNOLOGIES.title[lang]}</h2>
            <p>{TECHNOLOGIES.lead[lang]}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="stack">
            {TECHNOLOGIES.layers.map((l, i) => (
              <div className="layer" key={i}>
                <span className="lname">{l.name[lang]}</span>
                <div className="lchips">
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
