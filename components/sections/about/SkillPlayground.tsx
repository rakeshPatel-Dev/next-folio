"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { motion, useAnimationControls, useReducedMotion } from "motion/react"
import { BrandIcon } from "@/components/ui/brand-icon"
import IconRenderer from "@/components/ui/IconRenderer"
import { getIconColors } from "@/lib/icon-map"
import { cn } from "@/lib/utils"

export type PlaygroundSkill = {
  name: string
  Icon: string
  color?: string
}

type SkillPlaygroundProps = {
  skills: readonly PlaygroundSkill[]
  className?: string
}

/** Drag is a fine-pointer affordance — on touch it would hijack page scroll. */
function useFinePointer() {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    const sync = () => setFine(mq.matches)
    sync()
    mq.addEventListener("change", sync)
    return () => mq.removeEventListener("change", sync)
  }, [])

  return fine
}

/**
 * Brand-colored skill chips you can actually throw around.
 * Pills live in normal flex flow, so dragging never breaks the layout —
 * `transform` reserves no space. Bounded to the wrapper, they bounce off the
 * edges and stay where you drop them until you hit "settle".
 */
export default function SkillPlayground({ skills, className }: SkillPlaygroundProps) {
  const boundsRef = useRef<HTMLDivElement>(null)
  const [resetToken, setResetToken] = useState(0)
  const [scattered, setScattered] = useState(false)
  const finePointer = useFinePointer()
  const reduceMotion = useReducedMotion()

  const canDrag = finePointer && !reduceMotion

  const settle = useCallback(() => setResetToken((t) => t + 1), [])
  const markScattered = useCallback(() => setScattered(true), [])

  return (
    <div className={cn("relative", className)}>
      <div
        ref={boundsRef}
        role="list"
        aria-label="Tech stack"
        className="relative flex flex-wrap gap-2.5 pt-1 pb-5"
      >
        {skills.map((skill, i) => (
          <SkillChip
            key={skill.name}
            skill={skill}
            index={i}
            bounds={boundsRef}
            canDrag={canDrag}
            float={!reduceMotion}
            resetToken={resetToken}
            onFirstDrag={markScattered}
          />
        ))}
      </div>

      {/* Fixed-height row so the hint appearing never nudges the card */}
      <div className="flex h-5 items-center gap-4">
        {canDrag && (
          <>
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/60 uppercase">
              {scattered ? "drop them anywhere" : "drag to play"}
            </span>
            <button
              type="button"
              onClick={settle}
              className={cn(
                "font-mono text-[10px] tracking-[0.18em] uppercase transition-colors duration-200",
                scattered
                  ? "cursor-pointer text-foreground/60 hover:text-foreground"
                  : "pointer-events-none text-muted-foreground/25",
              )}
            >
              settle
            </button>
          </>
        )}
      </div>
    </div>
  )
}

type SkillChipProps = {
  skill: PlaygroundSkill
  index: number
  bounds: React.RefObject<HTMLDivElement | null>
  canDrag: boolean
  float: boolean
  resetToken: number
  onFirstDrag: () => void
}

function SkillChip({
  skill,
  index,
  bounds,
  canDrag,
  float,
  resetToken,
  onFirstDrag,
}: SkillChipProps) {
  const controls = useAnimationControls()
  const [dragging, setDragging] = useState(false)

  const tuned = getIconColors(skill.Icon)
  const brand = skill.color ?? tuned.color
  const brandDark = tuned.colorDark ?? brand

  // "settle" — spring every chip back to its slot
  useEffect(() => {
    if (!resetToken) return
    controls.start({
      x: 0,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 26, mass: 0.85 },
    })
  }, [resetToken, controls])

  return (
    <div
      role="listitem"
      className="animate-in fade-in-0 zoom-in-95"
      style={{ animationDelay: `${180 + index * 45}ms` }}
    >
      <motion.div
        drag={canDrag}
        dragConstraints={bounds}
        dragElastic={0.16}
        dragMomentum
        dragTransition={{ bounceStiffness: 340, bounceDamping: 24 }}
        animate={controls}
        whileDrag={{ scale: 1.06, rotate: index % 2 === 0 ? -2 : 2, zIndex: 40 }}
        onDragStart={() => {
          setDragging(true)
          onFirstDrag()
        }}
        onDragEnd={() => setDragging(false)}
        data-dragging={dragging}
        className={cn(
          "skill-chip group relative flex items-center gap-2.5 rounded-full border py-1.5 pr-4 pl-1.5 select-none",
          canDrag ? "cursor-grab active:cursor-grabbing" : "cursor-default",
        )}
        style={
          {
            "--chip-brand-light": brand,
            "--chip-brand-dark": brandDark,
          } as CSSProperties
        }
      >
        {/* hover lift lives on a child so it never fights the drag transform */}
        <span className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
          <span
            className={cn("flex items-center", float && "skill-float")}
            style={{ animationDelay: `${index * -0.65}s` }}
          >
            <BrandIcon
              color={brand}
              colorDark={brandDark}
              iconColor={tuned.iconColor}
              size={30}
              iconSize={16}
              icon={<IconRenderer name={skill.Icon} />}
            />
          </span>
        </span>

        <span className="font-mono text-[12px] leading-none tracking-tight text-foreground/85 transition-colors duration-300 group-hover:text-foreground">
          {skill.name}
        </span>
      </motion.div>
    </div>
  )
}
