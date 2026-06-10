"use client";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/app/providers";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { Logo } from "./Logo";
import { STR, UI } from "@/lib/content";

const SECTION_IDS = ["platform", "approach", "security"] as const;

function AiIcon() {
  return (
    <svg className="ai-ic" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4L12 3z" fill="currentColor" />
      <path d="M18.4 13.5l.8 2.3 2.3.8-2.3.8-.8 2.3-.8-2.3-2.3-.8 2.3-.8.8-2.3z" fill="currentColor" opacity=".6" />
    </svg>
  );
}

// SVG sun/moon to match the all-stroke icon language (replaces ☀/☾ text glyphs)
function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export function Nav() {
  const { lang, setLang, theme, toggleTheme } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const sheetRef = useRef<HTMLElement>(null);

  // Keep keyboard focus inside the open mobile menu; restore it to the toggle.
  useFocusTrap(sheetRef, menuOpen);

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
    { href: "#platform", id: "platform", label: STR.nav.platform[lang] },
    { href: "#approach", id: "approach", label: lang === "en" ? "Approach" : "Pristup" },
    { href: "#security", id: "security", label: STR.nav.security[lang] },
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        {UI.skipToContent[lang]}
      </a>
      <header className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="bar">
        <a className="brand" href="#top" aria-label="Infostream — home">
          <Logo height={22} />
        </a>
        <nav className="navlinks" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.id ? "active" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        {/* live operational posture — leads the right cluster; static text, not a live region */}
        <div className="nav-status">
          <span className="pls" aria-hidden />
          <span className="ns-text">{STR.nav.status[lang]}</span>
        </div>
        <div className="navright">
          <span className="seg" role="group" aria-label="Language">
            <button aria-pressed={lang === "me"} onClick={() => setLang("me")}>
              MNE
            </button>
            <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
              ENG
            </button>
          </span>
          <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle light / dark theme">
            <ThemeIcon dark={theme === "dark"} />
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
        <nav className="sheet" id="mobile-nav" aria-label={UI.menu[lang]} ref={sheetRef}>
          <div className="mm-status">
            <span className="pls" aria-hidden />
            {STR.nav.status[lang]}
          </div>
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
                ENG
              </button>
            </span>
            <button className="iconbtn" onClick={toggleTheme} aria-label="Toggle light / dark theme">
              <ThemeIcon dark={theme === "dark"} />
            </button>
            <button className="askbtn" onClick={openAssistant} aria-label="Ask Infostream">
              <AiIcon />
              {lang === "en" ? "Ask AI" : "Pitaj AI"}
            </button>
            <a className="btn btn-cta" href="#contact" onClick={() => setMenuOpen(false)}>
              {STR.nav.talk[lang]}
            </a>
          </div>
        </nav>
      </div>
      </header>
    </>
  );
}
