"use client";

import { useEffect, useRef, useState } from "react";

/* Count-up that triggers in view, with a failsafe that snaps to the final
   value so the number is never stuck at 0 (headless / reduced-motion safe). */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.4,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finish = () => {
      done.current = true;
      setVal(to);
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    let raf = 0;
    const run = () => {
      if (done.current) return;
      let start = 0;
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / (duration * 1000), 1);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(step);
        else done.current = true;
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    });
    io.observe(el);
    const failsafe = window.setTimeout(finish, 1600);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
