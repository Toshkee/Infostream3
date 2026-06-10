"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Scroll reveal: hidden -> shown when in view, with a hard failsafe so
   content is NEVER stuck hidden (covers reduced-motion + headless + slow JS).
   No-JS fallback lives in layout via <noscript>. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    let failsafe = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    // Failsafe ONLY for content at/near the top on load, so a slow IO can't strand
    // above-the-fold content. Genuinely below-fold sections wait for a real scroll
    // intersection — otherwise the mount timer fires before the user scrolls and the
    // whole reveal choreography is dead (it never plays).
    if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
      failsafe = window.setTimeout(() => setShown(true), 1200);
    }
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${className ? className + " " : ""}reveal${shown ? " in" : ""}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
