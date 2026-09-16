"use client";

import {
  useCursorPet,
  SHEET,
  type CursorPetConfig,
} from "./useCursorPet";

export function CursorPet(props: Partial<CursorPetConfig>) {
  const { outerRef, spriteRef, config } = useCursorPet(props);

  return (
    <div
      ref={outerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: config.hitSize,
        height: config.hitSize,
        zIndex: 60,
        touchAction: "none",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        transformOrigin: "center center",
      }}
    >
      <div
        ref={spriteRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transformOrigin: "center center",
          imageRendering: "pixelated",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${SHEET.width}px ${SHEET.height}px`,
        }}
      />
    </div>
  );
}