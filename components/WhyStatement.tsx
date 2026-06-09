"use client";

import { CSSProperties, Fragment } from "react";
import { useUI } from "@/app/providers";
import { STR, UI } from "@/lib/content";
import { Reveal } from "./Reveal";

export function WhyStatement() {
  const { lang } = useUI();
  const full = STR.why.statement[lang];
  const [first, ...rest] = full.split(/(?<=\.)\s/);
  const enforced = UI.enforced;

  return (
    <section style={{ paddingTop: 10 }}>
      <div className="wrap">
        <Reveal>
          <div className="statement">
            <div className="kick">{`// ${STR.why.kicker[lang]}`}</div>
            <h2 className="big">
              <span className="em">{first}</span> {rest.join(" ")}
            </h2>
          </div>
        </Reveal>

        <div className="manifest">
          <div className="man-bar">
            <span className="reg-dots" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            <span className="reg-path">infostream://principles</span>
            <span className="reg-live">
              <span className="pls" />
              {STR.why.cols.length} · {enforced[lang]}
            </span>
          </div>
          {STR.why.cols.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.07} className="man-row">
              <span className="man-n">{c.n}</span>
              <div className="man-body">
                <h3>
                  {c.h[lang]}
                  <span className="man-ok">
                    <span className="pls" />
                    {enforced[lang]}
                  </span>
                </h3>
                <p>{c.p[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="pipe">
            <div className="pipe-head">
              <span className="pls" />
              <span className="pipe-label">{UI.requestLifecycle[lang]}</span>
              <span className="pipe-meta">{UI.endToEnd[lang]}</span>
            </div>
            <div className="pipe-flow">
              {STR.arch.map((n, i) => (
                <Fragment key={n}>
                  <span className={`pipe-node${i === 3 ? " acc" : ""}`}>
                    <span className="pipe-i">{String(i + 1).padStart(2, "0")}</span>
                    {n}
                  </span>
                  {i < STR.arch.length - 1 && (
                    <span
                      className="pipe-link"
                      aria-hidden
                      style={{ ["--fd"]: `${i * 0.45}s` } as CSSProperties}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
