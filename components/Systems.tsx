"use client";

import { useUI } from "@/app/providers";
import { STR, SYSTEMS, SYSTEMS_BANNER, type SystemItem } from "@/lib/content";
import { Reveal } from "./Reveal";

/* tiny in-card product UIs for the data-only systems (no video) */
function Mini({ kind }: { kind?: SystemItem["mini"] }) {
  if (kind === "dash")
    return (
      <div className="mini mini-dash">
        <div className="row1">
          <div className="pill">
            <b>99.99%</b>
            <span>uptime</span>
          </div>
          <div className="pill">
            <b>1.7k</b>
            <span>tx / s</span>
          </div>
        </div>
        <div className="bars">
          {[42, 60, 38, 72, 54, 88, 50, 66, 100, 58, 74, 46].map((h, i) => (
            <i key={i} className={h === 100 ? "peak" : undefined} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  if (kind === "table")
    return (
      <div className="mini mini-table">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  if (kind === "form")
    return (
      <div className="mini mini-form">
        <i />
        <i />
        <i />
        <i />
      </div>
    );
  return null;
}

/* bento order: legal leads as the feature (span-2, tinted); the rest are standard cells */
const ORDER = ["legal", "ngo", "settlement", "treasury", "tax"] as const;

export function Systems() {
  const { lang } = useUI();
  const cards = ORDER.map((id) => SYSTEMS.find((s) => s.id === id)!);

  return (
    <section id="systems">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{STR.systems.kicker[lang]}</div>
            <h2>{STR.systems.title[lang]}</h2>
            <p>{STR.systems.lead[lang]}</p>
          </Reveal>
        </div>

        <div className="cards">
          {cards.map((s, i) => {
            const feature = s.id === "legal";
            const hasVideo = Boolean(s.video);
            return (
              <Reveal
                key={s.id}
                delay={i * 0.06}
                className={`card${feature ? " feature" : ""}${hasVideo ? " has-media" : ""}`}
              >
                <div className={`thumb${hasVideo ? " media" : ""}`}>
                  {hasVideo ? (
                    <video src={s.video} poster={s.poster} autoPlay muted loop playsInline preload="none" aria-hidden />
                  ) : (
                    <Mini kind={s.mini} />
                  )}
                </div>
                <div className="cbody">
                  <div className="ci">{s.owner[lang]}</div>
                  <h3>{s.name[lang]}</h3>
                  <p>{s.desc[lang]}</p>
                  <div className="tags">
                    {s.tags.map((tg) => (
                      <span className="tag" key={tg}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal className="card full" delay={0.12}>
            <div className="cbody">
              <div className="fb-l">
                <h3>{SYSTEMS_BANNER.title[lang]}</h3>
                <p>{SYSTEMS_BANNER.lead[lang]}</p>
              </div>
              <div className="fb-names">
                {SYSTEMS_BANNER.names.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
