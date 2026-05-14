export function Noise() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[999] opacity-[0.04]">
      <svg
        aria-hidden="true"
        className="h-full w-full"
      >
        <filter id="global-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-noise)" />
      </svg>
    </div>
  );
}
