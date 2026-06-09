"use client";

import { Fragment } from "react";
import { useUI } from "@/app/providers";
import { SECTORS } from "@/lib/content";
import { Reveal } from "./Reveal";

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
          <div className="sectorline">
            {SECTORS.items.map((s, i) => (
              <Fragment key={i}>
                <span className="sterm">{s[lang]}</span>
                {i < SECTORS.items.length - 1 && (
                  <span className="ssep" aria-hidden>
                    ●
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
