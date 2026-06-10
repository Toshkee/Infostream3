/* The logo is teal bars + a red wordmark on a transparent background — both
   colours read on light and dark, so it sits directly on the nav with no plate. */
export function Logo({ height = 22 }: { height?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.webp" alt="Infostream" height={height} style={{ height, width: "auto", display: "block" }} />
    </span>
  );
}
