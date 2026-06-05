"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/providers";
import { Logo } from "./Logo";
import { STR, PRODUCT_LINES, UI } from "@/lib/content";

const SECTION_IDS = ["products", "systems", "approach", "work"] as const;

export function Nav() {
  const { lang, setLang, theme, toggleTheme } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active-section highlight ("you are here") on the long single page
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // lock scroll + close on Escape / desktop resize while the menu is open
  useEffect(() => {
    if (!menuOpen) return;
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 1080 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const openAssistant = () => {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("open-assistant"));
  };

  const links = [
    { href: "#products", id: "products", label: lang === "en" ? "Products" : "Proizvodi" },
    { href: "#systems", id: "systems", label: STR.nav.systems[lang] },
    { href: "#approach", id: "approach", label: lang === "en" ? "Approach" : "Pristup" },
    { href: "#work", id: "work", label: lang === "en" ? "Work" : "Projekti" },
  ];

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="bar">
        <a className="brand" href="#top" aria-label="Infostream — home">
          <Logo height={22} />
        </a>
        <nav className="navlinks" aria-label="Primary">
          <div className="navitem">
            <a href="#products" className={active === "products" ? "active" : undefined}>
              {lang === "en" ? "Products" : "Proizvodi"}
            </a>
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
          <a href="#systems" className={active === "systems" ? "active" : undefined}>
            {STR.nav.systems[lang]}
          </a>
          <a href="#approach" className={active === "approach" ? "active" : undefined}>
            {lang === "en" ? "Approach" : "Pristup"}
          </a>
          <a href="#work" className={active === "work" ? "active" : undefined}>
            {lang === "en" ? "Work" : "Projekti"}
          </a>
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
        <button
          className="menubtn"
          aria-label={menuOpen ? UI.closeMenu[lang] : UI.openMenu[lang]}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="ham" aria-hidden>
            <i />
            <i />
            <i />
          </span>
        </button>
      </div>

      <div className={`mobilemenu${menuOpen ? " open" : ""}`}>
        <div className="scrim" onClick={() => setMenuOpen(false)} aria-hidden />
        <nav className="sheet" id="mobile-nav" aria-label={UI.menu[lang]}>
          {links.map((l) => (
            <a
              key={l.href}
              className="mm-link"
              href={l.href}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
              <span className="mm-i" aria-hidden>
                {l.id}
              </span>
            </a>
          ))}
          <div className="mm-sep" />
          <div className="mm-foot">
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
            <a className="btn btn-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              {STR.nav.talk[lang]}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
