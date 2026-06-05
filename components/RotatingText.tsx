"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/providers";
import { HERO_ROTATE } from "@/lib/content";

export function RotatingText() {
  const { lang } = useUI();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((v) => (v + 1) % HERO_ROTATE.length), 2600);
    return () => clearInterval(id);
  }, []);

  const phrase = HERO_ROTATE[i][lang];
  const dot = phrase.endsWith(".");
  const body = dot ? phrase.slice(0, -1) : phrase;

  return (
    <span className="rotate-wrap">
      <span key={i} className="rotate-word">
        {body}
        {dot && <span className="rd">.</span>}
      </span>
    </span>
  );
}
