"use client";

import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Reveal } from "./Reveal";
import { StreamLayer } from "./StreamLayer";

export function CTA() {
  const { lang } = useUI();
  return (
    <section id="contact" className="cta-band">
      <StreamLayer />
      <div className="wrap">
        <Reveal>
          <h2>{STR.cta.title[lang]}</h2>
          <p>{STR.cta.lead[lang]}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn btn-primary" href={`mailto:${STR.cta.email}`}>
              {STR.cta.email}
            </a>
            <a className="btn btn-ghost" href={`tel:${STR.cta.phone.replace(/\s/g, "")}`}>
              {STR.cta.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
