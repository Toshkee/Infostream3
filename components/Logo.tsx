/* Original Infostream logo file (unmodified) on a clean white plate
   so it reads correctly on both light and dark backgrounds. */
export function Logo({ height = 22 }: { height?: number }) {
  const padY = Math.round(height * 0.3);
  const padX = Math.round(height * 0.52);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: "#ffffff",
        borderRadius: 9,
        padding: `${padY}px ${padX}px`,
        boxShadow: "0 1px 4px rgba(20,22,30,.12)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.webp" alt="Infostream" height={height} style={{ height, width: "auto", display: "block" }} />
    </span>
  );
}
