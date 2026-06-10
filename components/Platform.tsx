"use client";

import { useState } from "react";
import { useUI } from "@/app/providers";
import {
  STR,
  PORTFOLIO,
  PRODUCT_LINES,
  SECTOR_FILTERS,
  SECTOR_LABELS,
  RND_NOTE,
} from "@/lib/content";
import { Reveal } from "./Reveal";

type FilterKey = (typeof SECTOR_FILTERS)[number]["key"];

export function Platform() {
  const { lang } = useUI();
  const [filter, setFilter] = useState<FilterKey>("all");

  const isProducts = filter === "products";
  const items = isProducts ? [] : PORTFOLIO.filter((p) => filter === "all" || p.sector === filter);

  return (
    <section id="platform">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <div className="kick">{STR.systems.kicker[lang]}</div>
            <h2>{STR.systems.title[lang]}</h2>
            <p>{STR.systems.lead[lang]}</p>
          </Reveal>
        </div>

        {/* filter bar */}
        <Reveal>
          <div className="pfilter" role="group" aria-label={lang === "en" ? "Filter work" : "Filter projekata"}>
            {SECTOR_FILTERS.map((f) => (
              <button
                key={f.key}
                className="pfbtn"
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label[lang]}
              </button>
            ))}
          </div>
        </Reveal>

        {/* card grid — re-keyed by filter so the set re-staggers in */}
        <div className="pgrid" key={filter}>
          {isProducts
            ? PRODUCT_LINES.map((p, i) => {
                const deployments = PORTFOLIO.filter((d) => d.product === p.name);
                return (
                  <Reveal key={p.name} delay={Math.min(i * 0.04, 0.3)}>
                    <article className="pcard pcard-prod" style={{ ["--pc" as string]: p.color }}>
                      <div className="pc-top">
                        <span className="pc-sector">{lang === "en" ? "Product line" : "Linija proizvoda"}</span>
                        <span className="pc-dot" aria-hidden />
                      </div>
                      <h3 className="pc-name">{p.name}</h3>
                      <div className="pc-client">{p.tagline[lang]}</div>
                      <div className="tags">
                        {deployments.map((d) => (
                          <span className="tag" key={d.id}>
                            {d.name[lang].split(" — ")[0]}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })
            : items.map((c, i) => (
                <Reveal key={c.id} delay={Math.min(i * 0.03, 0.4)}>
                  <article className="pcard" data-featured={c.featured ? "" : undefined}>
                    <div className="pc-top">
                      <span className="pc-sector">
                        {SECTOR_LABELS[c.sector][lang]}
                        {c.featured && <span className="pc-flag"> · {lang === "en" ? "flagship" : "ključni"}</span>}
                      </span>
                      <span className="pc-dot" aria-hidden />
                    </div>
                    <h3 className="pc-name">{c.name[lang]}</h3>
                    <div className="pc-client">{c.client[lang]}</div>
                    <div className="tags">
                      {c.tags.map((tg) => (
                        <span className="tag" key={tg}>
                          {tg}
                        </span>
                      ))}
                      {c.product && <span className="tag tag-prod">{c.product}</span>}
                    </div>
                  </article>
                </Reveal>
              ))}
        </div>

        <Reveal>
          <p className="rndnote">{RND_NOTE[lang]}</p>
        </Reveal>
      </div>
    </section>
  );
}
