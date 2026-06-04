"use client";

import { useUI } from "@/app/providers";
import { STR, SYSTEMS } from "@/lib/content";
import { Reveal } from "./Reveal";

const ADDR: Record<string, string> = {
  legal: "infostream.me / legal-information-system",
  ngo: "ngo.gov.me / portal",
};

export function Systems() {
  const { lang } = useUI();
  const showcase = SYSTEMS.filter((s) => s.id === "legal" || s.id === "ngo");

  return (
    <section id="systems">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <h2>{STR.systems.title[lang]}</h2>
            <p>{STR.systems.lead[lang]}</p>
          </Reveal>
        </div>

        <div className="showcase">
          {showcase.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08} className="show-card">
              <div className="show-media">
                <div className="chrome">
                  <i />
                  <i />
                  <i />
                  <span className="addr">{ADDR[s.id]}</span>
                </div>
                <video src={s.video} poster={s.poster} autoPlay muted loop playsInline preload="auto" />
              </div>
              <div className="show-body">
                <div className="ci">{s.owner[lang]}</div>
                <h3>{s.name[lang]}</h3>
                <p>{s.desc[lang]}</p>
                <div className="tags">
                  {s.tags.map((tg) => (
                    <span className="tag" key={tg}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
