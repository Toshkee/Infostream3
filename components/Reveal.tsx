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
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    const failsafe = window.setTimeout(() => setShown(true), 1200);
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
