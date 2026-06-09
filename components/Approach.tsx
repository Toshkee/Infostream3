"use client";

import { useUI } from "@/app/providers";
import { APPROACH } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Approach() {
  const { lang } = useUI();
  return (
    <section id="approach">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{APPROACH.kicker[lang]}</div>
            <h2>{APPROACH.title[lang]}</h2>
            <p>{APPROACH.lead[lang]}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="approach-steps">
            {APPROACH.steps.map((s, i) => (
              <div className="astep" key={s.k} style={{ transitionDelay: `${i * 0.08}s` }}>
                <span className="anode" />
                <div className="ak">{s.k}</div>
                <h3>{s.h[lang]}</h3>
                <p>{s.p[lang]}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
