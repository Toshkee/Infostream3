"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/providers";
import { HERO_ROTATE } from "@/lib/content";

const BROAD = HERO_ROTATE.length - 1; // "a country's institutions." — the static fallback

export function RotatingText() {
  const { lang } = useUI();
  const [i, setI] = useState(0);

  useEffect(() => {
    // Reduced motion: don't cycle; rest on the broadest claim, not the narrowest.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setI(BROAD);
      return;
    }
    const id = setInterval(() => setI((v) => (v + 1) % HERO_ROTATE.length), 1800);
    return () => clearInterval(id);
  }, []);

  // Widest phrase reserves the box so the headline never reflows as words cycle.
  const sizer = HERO_ROTATE.reduce((a, b) => (b[lang].length > a.length ? b[lang] : a), "");
  const phrase = HERO_ROTATE[i][lang];
  const dot = phrase.endsWith(".");
  const body = dot ? phrase.slice(0, -1) : phrase;

  return (
    <span className="rotate-wrap">
      <span className="rotate-sizer" aria-hidden>
        {sizer}
      </span>
      <span key={i} className="rotate-word">
        {body}
        {dot && <span className="rd">.</span>}
      </span>
    </span>
  );
}
