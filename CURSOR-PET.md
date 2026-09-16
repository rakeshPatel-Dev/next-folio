# Cursor Pet

A small pixel-art cat that lives on the page: it follows the cursor, can be dragged anywhere (even while sleeping), and has dual sleep modes (in-place on double-click, or walking to a designated sleep spot when idle). Built as a configurable React component for this Next.js site.

Location: `components/cursor-pet/` · Mounted in `app/(public)/layout.tsx` · Asset: `public/cursor-pet-Frames.png`

---

## What it is

A React port of the browser-extension cursor pet (original source in `cursor-pet/codes.js`,
sprite sheet in `cursor-pet/frames/Frames.png`). The cat:

- spawns at the center of the viewport and follows the cursor with smooth, linear movement,
- is draggable anywhere on the page with the left mouse button,
- **can be dragged while sleeping**: dragging never wakes or sleeps the pet; releasing leaves it in place while it continues sleeping,
- has two distinct sleep triggers:
  1. **Double-click**: immediately sleeps **in place** at the exact point clicked (no walk),
  2. **Auto-sleep** (after sitting idle for `autoSleepAfter` ms): **walks to the designated sleep spot** (`sleepX / sleepY`), then sleeps,
- **actual sleep animation**: sleeping plays the exact same breathing loop as the idle state (still → transition → breathing toggle), not a frozen single-frame pose,
- wakes itself after `sleepDuration` ms, or instantly on double-click,
- double-click wakes regardless of how it fell asleep, and also cancels the walk-to-sleep if the cat is still en route,
- the cursor is tracked **even while sleeping**, so it immediately targets the right spot the moment it wakes up,
- no hand/pointer cursor — the browser default cursor applies everywhere.

It is intentionally **linear**: no spring/physics easing. Movement is a fixed number of pixels
per frame toward the target, tunable with the `speed` config.

## What was requested & implemented

1. **Port to React & Next.js site**: Clean component structure mounted globally in `app/(public)/layout.tsx`.
2. **Draggable with left mouse button**: Dragging with the left button moves the pet; releasing drops it.
3. **Dragging never changes sleep state**:
   - Dragging never wakes a sleeping pet.
   - Dragging never puts an awake pet to sleep.
   - Dragging while asleep keeps the sleeping breathing animation active at the dragged position.
   - Dragging while the cat is en route to its sleep spot cancels the walk and allows free dragging.
4. **Dual sleep triggers**:
   - **Double-click**: Sleeps immediately **at the exact point clicked** (in-place).
   - **Auto-sleep**: Sitting idle for `autoSleepAfter` ms causes the cat to walk to the designated sleep coordinates (`sleepX / sleepY`).
5. **Designated sleep point**: Configurable `sleepX` and `sleepY` (defaults to bottom-right viewport corner if `null`).
6. **Actual sleep animation**: Uses the genuine idle breathing loop (sitting still → transition → breathing cycle) during sleep.
7. **Always-tracked cursor**: Mouse movement is tracked even during sleep, so the cat immediately knows where the cursor is upon waking.
8. **Double-click wake & cancel**: Double-clicking wakes a sleeping cat immediately, or aborts an en-route sleep walk.
9. **Frame rate tuning**: Reduced `frameRate` (default `8`) to match the original extension tempo, driving both running and idle/sleep breathing frames.
10. **Default cursor**: No custom or hand cursor; standard system cursor is retained.
11. **Separation of Logic and UI**: Hook (`useCursorPet.ts`) handles state and animation; UI component (`CursorPet.tsx`) handles rendering.
12. **Single source of truth**: `CURSOR_PET_DEFAULTS` in `useCursorPet.ts` is the single source of truth; `layout.tsx` mounts `<CursorPet />` without duplicate overrides.

## Files

| File | Role |
| --- | --- |
| `components/cursor-pet/useCursorPet.ts` | **Logic & Config.** Holds `CURSOR_PET_DEFAULTS`, config resolution, all state in `useRef`, window/element event listeners, `requestAnimationFrame` loop, sleep state machine, and DOM style updates. Renders nothing. |
| `components/cursor-pet/CursorPet.tsx` | **UI.** Two-div structure (drag hit box + sprite container) that wires the refs returned by `useCursorPet`. |
| `components/cursor-pet/index.ts` | Barrel export: re-exports `CursorPet`, `useCursorPet`, `CURSOR_PET_DEFAULTS`, `SHEET`, `CursorPetConfig`. |
| `app/(public)/layout.tsx` | Mounts `<CursorPet />` globally with default configuration. |
| `public/cursor-pet-Frames.png` | Deployed sprite sheet (256x128), copied from `cursor-pet/frames/Frames.png`. |
| `cursor-pet/codes.js` | Original browser extension source kept for reference. |

The API surface (`index.ts`) is:
```ts
export { CursorPet } from "./CursorPet";
export {
  useCursorPet,
  CURSOR_PET_DEFAULTS,
  SHEET,
  type CursorPetConfig,
} from "./useCursorPet";
```

## Behavior / State Machine

```
                        drag anywhere (awake)
                        ┌──────────────────┐
                        ▼                  │
      follows cursor ─► idle ─────────────┼───────────────┐
      (linear speed)    │                 │               │
           ▲            │ idle            │               │ double-click
           │ chases     │ autoSleepAfter  │               │ (sleeps in place)
           └────────────┘                 │               │
           distance <= reachThreshold     ▼               │
                                    goingToSleep          │
                                          │               │
                               arrived at │               ▼
                               sleep spot └─────────► sleeping ◄──┐
                                                        │         │
                                              auto-wake │         │ drag while
                                           (or dblclick)│         │ sleeping
                                                        ▼         │ (stays asleep)
                                                   awake/follow ──┘
```

- **Chasing**: When mouse moves > `reachThreshold` px away, the cat moves `speed` px/frame toward it, displaying the running animation in one of 8 directions.
- **Idle**: Within `reachThreshold` of the cursor (or left still after dragging): plays still `(96,96)` → transition `(96,63)` → breathing loop `(64,0)/(64,32)`. Auto-sleeps after `autoSleepAfter` ms idle.
- **GoingToSleep**: Triggered by auto-sleep. Cat walks toward `sleepX / sleepY` at normal speed with running animation. If double-clicked or dragged en route, the walk is cancelled.
- **Sleeping**:
  - If triggered by **double-click**: stays right where it was clicked and enters sleep immediately.
  - If triggered by **auto-sleep**: arrives at `sleepTarget` and enters sleep.
  - Plays the **full idle breathing animation** (still → transition → breathing loop).
  - Can be **dragged anywhere while asleep** without waking up.
  - Wakes after `sleepDuration` ms or instantly on double-click.
- **Dragging**: Pointer-capture drag with a 4px threshold (`event.detail >= 2` reserved for double-click). Dragging never triggers sleep or wake.

## Configuration

Configuration values are defined in `CURSOR_PET_DEFAULTS` ([`components/cursor-pet/useCursorPet.ts`](file:///home/patel/Projects/next-folio/components/cursor-pet/useCursorPet.ts#L51-L70)). All properties can also be optionally overridden via props on `<CursorPet {...props} />`.

| Prop | Default | Meaning |
| --- | --- | --- |
| `sprite` | `"/cursor-pet-Frames.png"` | Sprite sheet image path. |
| `scale` | `1.25` | Render scale multiplier of the sprite. |
| `speed` | `1` | Movement speed, px per animation frame (linear). |
| `reachThreshold` | `10` | Distance in px to stop chasing the cursor or sleep target. |
| `frameRate` | `8` | Sprite animation FPS. Drives run frames and idle/sleep breathing loop. |
| `idleStillMs` | `2000` | Idle & sleep phase 1: duration of sitting still pose. |
| `idleTransitionMs` | `200` | Idle & sleep phase 2: duration of transition pose. |
| `idleLoopIntervalMs` | `0` | Idle & sleep phase 3: breathing toggle interval (`0` derives from `frameRate`). |
| `autoSleepAfter` | `10000` | ms of sitting idle before walking to sleep. |
| `sleepDuration` | `10000` | ms spent sleeping before auto-waking. |
| `sleepOpacity` | `1` | Opacity while sleeping. |
| `sleepScale` | `1` | Scale multiplier while sleeping. |
| `hitSize` | `80` | Size of the drag hit-box in px (invisible area). |
| `sleepX` | `null` | X coordinate (px from left) for auto-sleep target. `null` → `window.innerWidth - hitSize`. |
| `sleepY` | `null` | Y coordinate (px from top) for auto-sleep target. `null` → `window.innerHeight - hitSize`. |

## Sprite Sheet

- **Dimensions**: 256x128 px, rendered via negative `background-position`.
- **8 Run Directions**: Left, Right, UP, Down, TopLeft, TopRight, BottomLeft, BottomRight (2 frames each).
- **Idle / Sleep Poses**: Sitting `(96,96)` → Transition `(96,63)` → Breathing loop `(64,0)` / `(64,32)`.

## Edge Cases & Guards

- **Accessibility**: When `prefers-reduced-motion: reduce` matches, or on coarse pointer/non-hover devices (touch-only mobile), animation loops and mouse tracking do not initialize.
- **Pointer Capture**: Uses standard `PointerEvent` APIs with `touch-action: none` for smooth dragging across elements.
- **Double-Click Discrimination**: `onPointerDown` ignores clicks where `e.detail >= 2` so the second click of a double-click fires `dblclick` without starting an accidental drag.
- **Always-Fresh Mouse Position**: Mouse movements update `mouseX` and `mouseY` continuously even during sleep, preventing stale target jumps upon waking.

## Verification

- `npx tsc --noEmit` — passes with zero errors.
- `npx next lint` — clean, no warnings or errors from cursor-pet.