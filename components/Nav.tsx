"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/providers";
import { Logo } from "./Logo";
import { STR, PRODUCT_LINES } from "@/lib/content";

export function Nav() {
  const { lang, setLang, theme, toggleTheme } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openAssistant = () => window.dispatchEvent(new CustomEvent("open-assistant"));

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="bar">
        <a className="brand" href="#top" aria-label="Infostream — home">
          <Logo height={22} />
        </a>
        <nav className="navlinks">
          <div className="navitem">
            <a href="#products">{lang === "en" ? "Products" : "Proizvodi"}</a>
            <div className="dropdown">
              {PRODUCT_LINES.map((p) => (
                <a className="dropitem" href="#products" key={p.name}>
                  <span className="dot" style={{ background: p.color }} />
                  <span>
                    <span className="dn">{p.name}</span>
                    <span className="dt">{p.tagline[lang]}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <a href="#systems">{STR.nav.systems[lang]}</a>
          <a href="#approach">{lang === "en" ? "Approach" : "Pristup"}</a>
          <a href="#work">{lang === "en" ? "Work" : "Projekti"}</a>
        </nav>
        <div className="navright">
          <span className="seg" role="group" aria-label="Language">
            <button aria-pressed={lang === "me"} onClick={() => setLang("me")}>
              MNE
            </button>
            <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              EN
            </button>
          </span>
          <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle light / dark theme">
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button className="askbtn" onClick={openAssistant} aria-label="Ask Infostream">
            <span className="wf" aria-hidden>
              <i />
              <i />
              <i />
            </span>
            {lang === "en" ? "Ask AI" : "Pitaj AI"}
          </button>
          <a className="btn btn-cta" href="#contact">
            {STR.nav.talk[lang]}
          </a>
        </div>
      </div>
    </header>
  );
}
