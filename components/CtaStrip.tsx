"use client";

import { useUI } from "@/app/providers";
import { CTA_STRIPS } from "@/lib/content";
import { Reveal } from "./Reveal";

/* Slim mid-page conversion band. Placed at peak-conviction points so a
   convinced visitor doesn't have to scroll to the footer to act. */
export function CtaStrip({ which }: { which: keyof typeof CTA_STRIPS }) {
  const { lang } = useUI();
  const c = CTA_STRIPS[which];
  return (
    <div className="wrap ctastrip-wrap">
      <Reveal>
        <div className="ctastrip">
          <span className="cs-text">{c.text[lang]}</span>
          <a className="btn btn-cta" href="#contact">
            {c.btn[lang]}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
