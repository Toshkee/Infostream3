"use client";

/* A clean browser-chrome frame wrapping looping, muted product footage. */
export function VideoFrame({
  src,
  poster,
  addr,
  tabs,
}: {
  src: string;
  poster?: string;
  addr?: string;
  tabs?: string[];
}) {
  return (
    <div className="product">
      <div className="pbar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        {addr && <span className="addr">{addr}</span>}
        {tabs && (
          <span className="ptabs">
            {tabs.map((t, i) => (
              <span key={t} className={i === 0 ? "on" : undefined}>
                {t}
              </span>
            ))}
          </span>
        )}
      </div>
      <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" />
    </div>
  );
}
