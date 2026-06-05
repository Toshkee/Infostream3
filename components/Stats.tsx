"use client";

import { useUI } from "@/app/providers";
import { STATS } from "@/lib/content";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { StreamLayer } from "./StreamLayer";

export function Stats() {
  const { lang } = useUI();
  const locale = lang === "me" ? "de-DE" : "en-US";
  return (
    <section style={{ paddingTop: 10 }} id="metrics">
      <StreamLayer />
      <div className="wrap">
        <Reveal>
          <div className="statsband">
            <div className="stats">
              {STATS.map((s) => (
                <div className="stat" key={s.l.en}>
                  <div className="v">
                    {s.count != null ? (
                      <CountUp to={s.count} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} locale={locale} />
                    ) : (
                      s.v
                    )}
                  </div>
                  <div className="l">{s.l[lang]}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
