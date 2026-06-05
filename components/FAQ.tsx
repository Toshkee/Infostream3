"use client";

import { useUI } from "@/app/providers";
import { FAQ as FAQ_CONTENT } from "@/lib/content";
import { Reveal } from "./Reveal";

export function FAQ() {
  const { lang } = useUI();
  return (
    <section id="faq">
      <div className="wrap">
        <div className="shead2">
          <Reveal>
            <h2>{FAQ_CONTENT.title[lang]}</h2>
            <p>{FAQ_CONTENT.lead[lang]}</p>
          </Reveal>
        </div>
        <Reveal>
          <div className="faq">
            {FAQ_CONTENT.items.map((item, i) => (
              <details className="faq-item" key={i}>
                <summary className="faq-q">
                  <span>{item.q[lang]}</span>
                  <span className="faq-ic" aria-hidden />
                </summary>
                <div className="faq-a">{item.a[lang]}</div>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
