"use client";

import { useEffect, useRef, useState } from "react";

/* Build a smooth periodic wave path (q + smooth-t pairs = one period each). */
function wavePath(baseline: number, amp: number, period: number, width = 2400) {
  let d = `M0 ${baseline}`;
  for (let x = 0; x < width; x += period) {
    d += ` q ${period / 4} ${-amp} ${period / 2} 0 t ${period / 2} 0`;
  }
  return d;
}

const WAVES = [
  { baseline: 70, amp: 30, period: 460, dur: 13, color: "url(#streamG)", op: 0.42, sw: 3 },
  { baseline: 128, amp: 40, period: 520, dur: 17, color: "url(#streamG)", op: 0.34, sw: 2.5 },
  { baseline: 196, amp: 26, period: 400, dur: 11, color: "var(--accent)", op: 0.32, sw: 2.5 },
  { baseline: 258, amp: 34, period: 560, dur: 19, color: "var(--coral)", op: 0.28, sw: 2.5 },
];

export function StreamLayer({ flip = false }: { flip?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const svg = ref.current;
    if (!svg) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) svg.unpauseAnimations?.();
        else svg.pauseAnimations?.();
      },
      { threshold: 0 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, []);

  return (
    <div className="stream-layer" aria-hidden style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <svg ref={ref} viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="streamG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--coral)" />
          </linearGradient>
        </defs>
        {WAVES.map((w, i) => (
          <g key={i}>
            <path
              d={wavePath(w.baseline, w.amp, w.period)}
              fill="none"
              stroke={w.color}
              strokeWidth={w.sw}
              strokeOpacity={w.op}
            />
            {!reduced && (
              <animateTransform
                attributeName="transform"
                type="translate"
                from="0 0"
                to={`-${w.period} 0`}
                dur={`${w.dur}s`}
                repeatCount="indefinite"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
