"use client";

import { useEffect, useState } from "react";
import { useUI } from "@/app/providers";
import { UI } from "@/lib/content";

export function BackToTop() {
  const { lang } = useUI();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={`totop${show ? " show" : ""}`} onClick={toTop} aria-label={UI.backToTop[lang]}>
      <span className="ar" aria-hidden>
        ↑
      </span>
      {UI.backToTop[lang]}
    </button>
  );
}
