"use client";

import { useUI } from "@/app/providers";
import { STR, HERO_PREFIX } from "@/lib/content";
import { Reveal } from "./Reveal";
import { VideoFrame } from "./VideoFrame";
import { StreamLayer } from "./StreamLayer";
import { RotatingText } from "./RotatingText";

export function Hero() {
  const { lang } = useUI();
  return (
    <section className="hero" id="top">
      <StreamLayer />
      <div className="wrap grid">
        <div>
          <Reveal>
            <h1 className="hero-h1">
              {HERO_PREFIX[lang]}
              <br />
              <RotatingText />
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lead">{STR.hero.lead[lang]}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="cta">
              <a className="btn btn-primary" href="#systems">
                {STR.hero.cta1[lang]}
              </a>
              <a className="btn btn-ghost" href="#contact">
                {STR.hero.cta2[lang]}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="micro">
              <span>
                <b>99.99%</b> {lang === "en" ? "uptime" : "raspoloživost"}
              </span>
              <span>
                <b>20+</b> {lang === "en" ? "years in production" : "godina u radu"}
              </span>
              <span>
                <b>ISO 27001 / 9001</b>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <VideoFrame
            src="/media/main.mp4"
            poster="/media/main.jpg"
            addr="infostream.me / legal-information-system"
            tabs={["Regulations", "Tasks", "Gazette"]}
          />
        </Reveal>
      </div>
    </section>
  );
}
