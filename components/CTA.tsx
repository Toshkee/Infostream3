"use client";

import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Reveal } from "./Reveal";

export function CTA() {
  const { lang } = useUI();
  return (
    <section id="contact" className="cta-band">
      <div className="wrap">
        <Reveal>
          <div className="kick">{STR.cta.kicker[lang]}</div>
          <h2>{STR.cta.title[lang]}</h2>
          <p>{STR.cta.lead[lang]}</p>
          <div className="cta-actions">
            <a className="btn btn-cta" href={`mailto:${STR.cta.email}`}>
              {STR.cta.button[lang]}
            </a>
            <a className="cta-mail" href={`mailto:${STR.cta.email}`}>
              {STR.cta.email}
            </a>
          </div>
          <div className="cta-ops">
            <span className="pls" aria-hidden />
            <span className="cta-ops-l">{STR.cta.ops[lang]}</span>
            <a className="cta-ops-num" href={`tel:${STR.cta.phone.replace(/\s/g, "")}`}>
              {STR.cta.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
