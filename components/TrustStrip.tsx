"use client";

import { useUI } from "@/app/providers";
import { STR, INSTITUTIONS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function TrustStrip() {
  const { lang } = useUI();
  const loop = [...INSTITUTIONS, ...INSTITUTIONS];
  return (
    <div className="wrap">
      <Reveal>
        <div className="trust">
          <div className="lbl">{STR.trust.label[lang]}</div>
          <div className="marwrap">
            <div className="marquee">
              {loop.map((i, idx) => (
                <span className="iname" key={idx}>
                  {i.name[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
