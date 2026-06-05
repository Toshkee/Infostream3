"use client";

import { useUI } from "@/app/providers";
import { STR } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Security() {
  const { lang } = useUI();
  return (
    <section id="security" style={{ paddingTop: 10 }}>
      <div className="wrap">
        <Reveal>
          <div
            className="secband"
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              background: "var(--surface)",
              padding: 30,
              display: "flex",
              gap: 26,
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "26ch" }}>
              <div className="kick">{STR.security.kicker[lang]}</div>
              <h2 style={{ fontSize: 24 }}>{STR.security.title[lang]}</h2>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="badge">
                <b>ISO 27001</b> · {lang === "en" ? "Information security" : "Bezbjednost informacija"}
              </span>
              <span className="badge">
                <b>ISO 9001</b> · {lang === "en" ? "Quality" : "Kvalitet"}
              </span>
              <span className="badge">
                <b>Bitdefender</b> Enterprise
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
