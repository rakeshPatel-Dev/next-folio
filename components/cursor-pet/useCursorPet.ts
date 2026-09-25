"use client";

import { useEffect, useRef } from "react";

export const SHEET = { width: 256, height: 128 };
const DRAG_THRESHOLD = 4;

type Frame = [number, number];
type DirectionData = { size: [number, number]; frames: [Frame, Frame] };

const SPRITE_DATA: Record<string, DirectionData> = {
  Left: { size: [32, 28], frames: [[129, 64], [128, 99]] },
  Right: { size: [32, 28], frames: [[95, 0], [96, 33]] },
  UP: { size: [32, 32], frames: [[32, 64], [32, 96]] },
  Down: { size: [32, 32], frames: [[193, 96], [224, 63]] },
  TopLeft: { size: [32, 32], frames: [[34, 0], [33, 30]] },
  TopRight: { size: [32, 32], frames: [[0, 64], [0, 96]] },
  BottomLeft: { size: [32, 32], frames: [[160, 96], [128, 96]] },
  BottomRight: { size: [32, 32], frames: [[160, 33], [162, 62]] },
};

type Direction = keyof typeof SPRITE_DATA;

export type CursorPetConfig = {
  sprite: string;
  scale: number;
  speed: number;
  reachThreshold: number;
  /**
   * Radius in px around the pet. Moving the cursor inside this area does not
   * make the pet follow — it stays put until the cursor leaves the dead zone.
   */
  deadZone: number;
  frameRate: number;
  idleStillMs: number;
  idleTransitionMs: number;
  idleLoopIntervalMs: number;
  autoSleepAfter: number;
  sleepDuration: number;
  sleepOpacity: number;
  sleepScale: number;
  hitSize: number;
  /**
   * X coordinate (px from left) where the cat walks to when auto-sleeping.
   * null → computed at runtime: right edge of viewport minus one hitSize.
   * Double-click always sleeps in place, ignoring these coordinates.
   */
  sleepX: number | null;
  /**
   * Y coordinate (px from top) where the cat walks to when auto-sleeping.
   * null → computed at runtime: bottom edge of viewport minus one hitSize.
   */
  sleepY: number | null;
};

export const CURSOR_PET_DEFAULTS: CursorPetConfig = {
  sprite: "/cursor-pet-Frames.png",
  scale: 1.25,
  speed: 1.15,
  reachThreshold: 10,
  /**
   * Radius (px) around the pet where a moving cursor does not make it follow.
   * The pet only chases once the cursor leaves this area.
   */
  deadZone: 50,
  frameRate: 9,
  idleStillMs: 2000,
  idleTransitionMs: 200,
  idleLoopIntervalMs: 0,
  autoSleepAfter: 10000,
  sleepDuration: 10000,
  sleepOpacity: 1,
  sleepScale: 1,
  hitSize: 80,
  // Where the cat walks to when it auto-sleeps.
  // null → bottom-right corner of the viewport (computed at runtime).
  // Set specific pixel coords to pin the bed, e.g. sleepX: 120, sleepY: 680
  sleepX: null,
  sleepY: null,
};

export function useCursorPet(config: Partial<CursorPetConfig> = {}) {
  const cfg = { ...CURSOR_PET_DEFAULTS, ...config };

  const outerRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const pet = useRef({
    mouseX: 0,
    mouseY: 0,
    catX: 0,
    catY: 0,
    isDragging: false,
    /** Cat is fully asleep (plays idle animation faded/scaled). */
    isSleeping: false,
    /** Cat is walking toward the sleep target before going to sleep. */
    isGoingToSleep: false,
    sleepTargetX: 0,
    sleepTargetY: 0,
    /** performance.now() timestamp when sleeping state was entered. */
    sleepStartTime: 0,
    dragStartX: 0,
    dragStartY: 0,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragConfirmed: false,
    direction: "Right" as Direction,
    frameIndex: 0,
    lastTick: 0,
    renderW: 32,
    renderH: 32,
    isIdle: false,
    reachTime: 0,
  });

  const {
    sprite,
    scale,
    speed,
    reachThreshold,
    deadZone,
    frameRate,
    idleStillMs,
    idleTransitionMs,
    idleLoopIntervalMs,
    autoSleepAfter,
    sleepDuration,
    sleepOpacity,
    sleepScale,
    hitSize,
    sleepX,
    sleepY,
  } = cfg;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const outer = outerRef.current;
    const spriteEl = spriteRef.current;
    if (!outer || !spriteEl) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const s = pet.current;
    s.mouseX = window.innerWidth / 2;
    s.mouseY = window.innerHeight / 2;
    s.catX = s.mouseX;
    s.catY = s.mouseY;

    spriteEl.style.backgroundImage = `url("${sprite}")`;
    const frameTick = 1000 / frameRate;
    const idleLoopMs = idleLoopIntervalMs > 0 ? idleLoopIntervalMs : frameTick;

    let sleepTimer: ReturnType<typeof setTimeout> | null = null;

    /** Resolve the auto-sleep walk target. Falls back to bottom-right corner. */
    const getSleepTarget = () => ({
      tx: sleepX ?? window.innerWidth - hitSize,
      ty: sleepY ?? window.innerHeight - hitSize,
    });

    /** Restore to active state, following cursor. */
    const wake = () => {
      if (!s.isSleeping && !s.isGoingToSleep) return;
      s.isSleeping = false;
      s.isGoingToSleep = false;
      if (sleepTimer) {
        clearTimeout(sleepTimer);
        sleepTimer = null;
      }
      outer.style.opacity = "1";
      outer.style.transform = "scale(1)";
      s.isIdle = false;
      s.reachTime = performance.now();
      s.frameIndex = 0;
    };

    /**
     * Transition into the sleeping state. Plays the idle breathing animation
     * (same as idle phase 3) with the outer div faded + scaled. Auto-wakes
     * after sleepDuration ms.
     */
    const startSleeping = () => {
      s.isGoingToSleep = false;
      s.isSleeping = true;
      s.isIdle = false;
      s.sleepStartTime = performance.now();
      outer.style.opacity = String(sleepOpacity);
      outer.style.transform = `scale(${sleepScale})`;
      if (sleepTimer) clearTimeout(sleepTimer);
      sleepTimer = setTimeout(wake, sleepDuration);
    };

    /**
     * Trigger sleep.
     * - inPlace = true  (double-click): sleep immediately at the current position.
     * - inPlace = false (auto-sleep):   walk to sleepX/Y then sleep.
     */
    const sleep = (inPlace = false) => {
      if (s.isSleeping || s.isGoingToSleep) return;
      if (inPlace) {
        startSleeping();
      } else {
        const { tx, ty } = getSleepTarget();
        s.sleepTargetX = tx;
        s.sleepTargetY = ty;
        s.isGoingToSleep = true;
        s.isIdle = false;
        s.frameIndex = 0;
      }
    };

    // Always track the cursor — even while sleeping — so the cat knows exactly
    // where to head the moment it wakes up.
    const onMouseMove = (e: MouseEvent) => {
      if (s.isDragging) return;
      s.mouseX = e.clientX;
      s.mouseY = e.clientY;
    };

    const onPointerDown = (e: PointerEvent) => {
      // Ignore right-click or the second tap of a double-click.
      if (e.button !== 0 || e.detail >= 2) return;

      // If the cat is walking to the sleep spot, cancel the walk silently.
      // Don't call wake() — that would restore opacity/scale prematurely.
      // The cat wasn't sleeping yet, so just abort and allow the drag.
      if (s.isGoingToSleep) {
        s.isGoingToSleep = false;
        s.isIdle = false;
      }

      // Dragging is always allowed — even when fully asleep.
      // The drag moves the cat visually without changing the sleep state.
      // Only double-click or the auto-wake timer calls wake().
      s.isDragging = true;
      s.dragConfirmed = false;
      s.dragStartX = e.clientX;
      s.dragStartY = e.clientY;
      s.dragOffsetX = e.clientX - s.catX;
      s.dragOffsetY = e.clientY - s.catY;
      outer.setPointerCapture(e.pointerId);
    };

    /**
     * Double-click: sleep in place ↔ wake.
     * Sleep always happens at the current position — no sleep-walk on dblclick.
     */
    const onDoubleClick = () => {
      if (s.isSleeping || s.isGoingToSleep) wake();
      else sleep(true); // sleep right here, skip the walk
    };

    const onDragMove = (e: PointerEvent) => {
      if (!s.isDragging) return;
      if (!s.dragConfirmed) {
        const dx = e.clientX - s.dragStartX;
        const dy = e.clientY - s.dragStartY;
        if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        s.dragConfirmed = true;
        s.dragOffsetX = e.clientX - s.catX;
        s.dragOffsetY = e.clientY - s.catY;
      }
      s.catX = e.clientX - s.dragOffsetX;
      s.catY = e.clientY - s.dragOffsetY;
      s.mouseX = s.catX;
      s.mouseY = s.catY;
    };

    const onDragEnd = () => {
      if (!s.isDragging) return;
      s.isDragging = false;
      s.dragConfirmed = false;
    };

    /** Update direction label from angle in degrees. */
    const applyDirection = (angle: number) => {
      if (angle > -22.5 && angle <= 22.5) s.direction = "Right";
      else if (angle > 22.5 && angle <= 67.5) s.direction = "BottomRight";
      else if (angle > 67.5 && angle <= 112.5) s.direction = "Down";
      else if (angle > 112.5 && angle <= 157.5) s.direction = "BottomLeft";
      else if (angle > 157.5 || angle <= -157.5) s.direction = "Left";
      else if (angle > -157.5 && angle <= -112.5) s.direction = "TopLeft";
      else if (angle > -112.5 && angle <= -67.5) s.direction = "UP";
      else if (angle > -67.5 && angle <= -22.5) s.direction = "TopRight";
    };

    outer.addEventListener("pointerdown", onPointerDown);
    outer.addEventListener("dblclick", onDoubleClick);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("pointermove", onDragMove, { passive: true });
    window.addEventListener("pointerup", onDragEnd, { passive: true });

    let raf = 0;

    const update = (timestamp: number) => {
      raf = requestAnimationFrame(update);

      // ── MOVEMENT ──────────────────────────────────────────────────────────

      if (s.isGoingToSleep && !s.isDragging) {
        // Walk toward the sleep target, ignoring the cursor.
        // Suspended automatically while dragging; onDragMove updates catX/Y.
        const dx = s.sleepTargetX - s.catX;
        const dy = s.sleepTargetY - s.catY;
        const dist = Math.hypot(dx, dy);
        if (dist <= reachThreshold) {
          startSleeping(); // arrived at bed
        } else {
          const rad = Math.atan2(dy, dx);
          s.catX += Math.cos(rad) * speed;
          s.catY += Math.sin(rad) * speed;
          applyDirection((rad * 180) / Math.PI);
        }
      } else if (!s.isDragging && !s.isSleeping && !s.isGoingToSleep) {
        // Normal cursor-following behaviour. The pet only chases once the
        // cursor leaves the dead zone around it.
        const dx = s.mouseX - s.catX;
        const dy = s.mouseY - s.catY;
        const dist = Math.hypot(dx, dy);

        if (dist > deadZone) {
          const rad = Math.atan2(dy, dx);
          s.catX += Math.cos(rad) * speed;
          s.catY += Math.sin(rad) * speed;
          applyDirection((rad * 180) / Math.PI);
          s.isIdle = false;
        } else {
          // Idle — start the idle timer if not already running.
          if (!s.isIdle) {
            s.isIdle = true;
            s.reachTime = timestamp;
            s.frameIndex = 0;
          }
          // Auto-sleep after idle for the configured duration.
          if (timestamp - s.reachTime > autoSleepAfter) {
            sleep(); // walks to sleepX/Y
          }
        }
      }
      // isSleeping (not dragging): stationary, position not updated here.
      // isSleeping + isDragging:   position updated by onDragMove; sleep state unchanged.

      // ── SPRITE ANIMATION ──────────────────────────────────────────────────

      if (timestamp - s.lastTick > frameTick) {
        s.lastTick = timestamp;
        let posX = 0;
        let posY = 0;

        if (s.isSleeping) {
          // Play the exact same idle breathing loop as when awake — faded/scaled.
          // This runs even while being dragged (outer stays faded since only
          // wake() resets it, and drag never calls wake()).
          const since = timestamp - s.sleepStartTime;
          if (since < idleStillMs) {
            posX = 96; posY = 96; // still sitting
          } else if (since - idleStillMs < idleTransitionMs) {
            posX = 96; posY = 63; // transition
          } else {
            const loop = Math.floor(
              (since - idleStillMs - idleTransitionMs) / idleLoopMs,
            ) % 2;
            posX = 64;
            posY = loop === 0 ? 0 : 32; // breathing loop
          }
          s.renderW = 32;
          s.renderH = 32;
        } else if (s.isGoingToSleep) {
          // Running animation while walking to the sleep spot.
          const data = SPRITE_DATA[s.direction];
          [posX, posY] = data.frames[s.frameIndex % 2];
          s.frameIndex++;
          s.renderW = data.size[0];
          s.renderH = data.size[1];
        } else if (!s.isDragging) {
          // Normal awake state.
          const dx = s.mouseX - s.catX;
          const dy = s.mouseY - s.catY;
          const isChasing = Math.hypot(dx, dy) > deadZone;

          if (isChasing) {
            const data = SPRITE_DATA[s.direction];
            [posX, posY] = data.frames[s.frameIndex % 2];
            s.frameIndex++;
            s.renderW = data.size[0];
            s.renderH = data.size[1];
          } else {
            const since = timestamp - s.reachTime;
            if (since < idleStillMs) {
              posX = 96; posY = 96;
            } else if (since - idleStillMs < idleTransitionMs) {
              posX = 96; posY = 63;
            } else {
              const loop = Math.floor(
                (since - idleStillMs - idleTransitionMs) / idleLoopMs,
              ) % 2;
              posX = 64;
              posY = loop === 0 ? 0 : 32;
            }
            s.renderW = 32;
            s.renderH = 32;
          }
        }
        // isDragging + awake: sprite holds its last rendered frame during the drag.

        spriteEl.style.width = `${s.renderW}px`;
        spriteEl.style.height = `${s.renderH}px`;
        spriteEl.style.backgroundPosition = `-${posX}px -${posY}px`;
      }

      spriteEl.style.transform = `scale(${scale})`;
      outer.style.left = `${s.catX - hitSize / 2}px`;
      outer.style.top = `${s.catY - hitSize / 2}px`;
    };

    raf = requestAnimationFrame(update);

    return () => {
      outer.removeEventListener("pointerdown", onPointerDown);
      outer.removeEventListener("dblclick", onDoubleClick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointermove", onDragMove);
      window.removeEventListener("pointerup", onDragEnd);
      cancelAnimationFrame(raf);
      if (sleepTimer) clearTimeout(sleepTimer);
    };
  }, [
    sprite,
    scale,
    speed,
    reachThreshold,
    deadZone,
    frameRate,
    idleStillMs,
    idleTransitionMs,
    idleLoopIntervalMs,
    autoSleepAfter,
    sleepDuration,
    sleepOpacity,
    sleepScale,
    hitSize,
    sleepX,
    sleepY,
  ]);

  return { outerRef, spriteRef, config: cfg };
}