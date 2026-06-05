"use client";

import { useState } from "react";
import { useUI } from "@/app/providers";
import { SECTIONS, FLAGSHIPS, WORK_GROUPS, UI } from "@/lib/content";
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
          <div className="registry">
            <div className="reg-bar">
              <span className="reg-dots" aria-hidden>
                <i />
                <i />
                <i />
              </span>
              <span className="reg-path">infostream://registry · production</span>
              <span className="reg-live">
                <span className="pls" />
                {FLAGSHIPS.length} {UI.flagshipSystems[lang]} · {UI.live[lang]}
              </span>
            </div>

            <div className="reg-th" aria-hidden>
              <span>{UI.colId[lang]}</span>
              <span>{UI.colSystem[lang]}</span>
              <span>{UI.colAuthority[lang]}</span>
              <span>{UI.colStatus[lang]}</span>
            </div>

            {FLAGSHIPS.map((f, i) => (
              <div className="reg-row" key={f.name.en}>
                <span className="rid">{String(i + 1).padStart(2, "0")}</span>
                <div className="rsys">
                  <div className="rname">{f.name[lang]}</div>
                  <p className="rblurb">{f.blurb[lang]}</p>
                  <div className="tags">
                    {f.tags.map((tg) => (
                      <span className="tag" key={tg}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="rclient">{f.client[lang]}</span>
                <span className="rstat">
                  <span className="pls" />
                  {UI.live[lang].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="reg-query">
          <span className="reg-prompt">query --category</span>
          <div className="reg-tabs" role="tablist">
            {WORK_GROUPS.map((g, i) => (
              <button
                key={g.title.en}
                className="reg-tab"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
              >
                {g.title[lang]}
              </button>
            ))}
          </div>
        </div>

        <div className="reg-results" key={active}>
          <div className="resbar">
            <span>{group.title[lang]}</span>
            <span className="rescount">
              {String(group.projects.length).padStart(2, "0")} {UI.records[lang]}
            </span>
          </div>
          {group.projects.map((p, i) => (
            <div
              className="res-row"
              key={p.name.en}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="res-idx">{String(i + 1).padStart(2, "0")}</span>
              <div className="res-main">
                <div className="res-name">{p.name[lang]}</div>
                <div className="res-client">{p.client[lang]}</div>
              </div>
              <div className="res-tags">
                {p.tags.map((tg) => (
                  <span className="tag" key={tg}>
                    {tg}
                  </span>
                ))}
              </div>
              <span className="res-stat">
                <span className="pls" />
                {UI.live[lang].toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
