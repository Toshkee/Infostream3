"use client";

import { useUI } from "@/app/providers";
import { STR, INSTITUTIONS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function TrustStrip() {
  const { lang } = useUI();
  // Static registry grid (was an infinite marquee): permanence is the message,
  // and it removes the WCAG 2.2.2 no-pause issue + the double SR announcement.
  return (
    <div className="wrap">
      <Reveal>
        <div className="trust">
          <div className="lbl">{STR.trust.label[lang]}</div>
          <div className="names">
            {INSTITUTIONS.map((i) => (
              <span key={i.name.en}>{i.name[lang]}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
