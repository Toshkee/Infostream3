"use client";

import { useUI } from "@/app/providers";
import { SECTIONS, PRODUCT_LINES, RND_NOTE } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Products() {
  const { lang } = useUI();
  return (
    <section id="products" style={{ paddingTop: 10 }}>
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{SECTIONS.products.kicker[lang]}</div>
            <h2>{SECTIONS.products.title[lang]}</h2>
            <p>{SECTIONS.products.lead[lang]}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="prodgrid">
            {PRODUCT_LINES.map((p) => (
              <div className="prod" key={p.name} style={{ "--pc": p.color } as React.CSSProperties}>
                <div className="pn">
                  <span className="dot" />
                  {p.name}
                </div>
                <div className="pt">{p.tagline[lang]}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="rndnote">{RND_NOTE[lang]}</p>
        </Reveal>
      </div>
    </section>
  );
}
