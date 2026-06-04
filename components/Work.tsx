"use client";

import { useState } from "react";
import { useUI } from "@/app/providers";
import { SECTIONS, FLAGSHIPS, WORK_GROUPS } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Work() {
  const { lang } = useUI();
  const [active, setActive] = useState(0);
  const group = WORK_GROUPS[active];

  return (
    <section id="work">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <h2>{SECTIONS.work.title[lang]}</h2>
            <p>{SECTIONS.work.lead[lang]}</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="flaggrid">
            {FLAGSHIPS.map((f, i) => (
              <div className="flagitem" key={f.name.en}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <div className="fmeta">
                  <div className="fc">{f.client[lang]}</div>
                  <h3>{f.name[lang]}</h3>
                  <p>{f.blurb[lang]}</p>
                  <div className="tags">
                    {f.tags.map((tg) => (
                      <span className="tag" key={tg}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="worktabs" role="tablist">
          {WORK_GROUPS.map((g, i) => (
            <button
              key={g.title.en}
              className="worktab"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
            >
              {g.title[lang]}
            </button>
          ))}
        </div>

        <Reveal key={active}>
          <div className="worklist2">
            {group.projects.map((p) => (
              <div className="wrow" key={p.name.en}>
                <div>
                  <div className="wn">{p.name[lang]}</div>
                  <div className="wc">{p.client[lang]}</div>
                </div>
                <div className="wt">
                  {p.tags.map((tg) => (
                    <span className="tag" key={tg}>
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
