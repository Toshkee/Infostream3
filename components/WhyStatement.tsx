"use client";

import { Fragment } from "react";
import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Reveal } from "./Reveal";

export function WhyStatement() {
  const { lang } = useUI();
  const full = STR.why.statement[lang];
  const [first, ...rest] = full.split(/(?<=\.)\s/);
  return (
    <section style={{ paddingTop: 10 }}>
      <div className="wrap">
        <Reveal>
          <div className="statement">
            <div className="big">
              <span className="em">{first}</span> {rest.join(" ")}
            </div>
          </div>
        </Reveal>
        <div className="why">
          {STR.why.cols.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08} className="col">
              <div className="n">{c.n}</div>
              <h3>{c.h[lang]}</h3>
              <p>{c.p[lang]}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="arch">
            {STR.arch.map((n, i) => (
              <Fragment key={n}>
                <span className={`node${i === 3 ? " acc" : ""}`}>{n}</span>
                {i < STR.arch.length - 1 && <span className="arrow">→</span>}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
