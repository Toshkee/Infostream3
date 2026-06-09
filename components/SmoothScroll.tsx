"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const NAV_OFFSET = 90; // clear the fixed glass nav when jumping to a section

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Smooth in-page anchor navigation (works with or without Lenis).
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      const lenis = window.__lenis;
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -NAV_OFFSET });
      } else {
        const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
        window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
      }
      history.pushState(null, "", hash);
    };
    document.addEventListener("click", onClick);

    if (reduced) {
      return () => document.removeEventListener("click", onClick);
    }

    const lenis = new Lenis({ duration: 0.8, smoothWheel: true });
    window.__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
  return null;
}
