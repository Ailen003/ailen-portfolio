"use client"

import { useEffect } from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { SKILL_LEVEL_META, type Skill } from "../lib/types/skills.types"

const LEVEL_CONFIG = {
  expert:       { size: 64, iconSize: "h-7 w-7", glow: 32 },
  intermediate: { size: 52, iconSize: "h-6 w-6", glow: 22 },
  basic:        { size: 42, iconSize: "h-5 w-5", glow: 14 },
} as const

interface SkillNodeProps {
  skill: Skill & { group: string }
  xPct: number
  yPct: number
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  containerWidth: number
  containerHeight: number
  isDimmed: boolean
  isHovered: boolean
  isAnyHovered: boolean
  prefersReduced: boolean
  onHover: () => void
  onHoverEnd: () => void
  onSelect: () => void
}

export function SkillNode({
  skill,
  xPct,
  yPct,
  index,
  mouseX,
  mouseY,
  containerWidth,
  containerHeight,
  isDimmed,
  isHovered,
  isAnyHovered,
  prefersReduced,
  onHover,
  onHoverEnd,
  onSelect,
}: SkillNodeProps) {
  const { name, Icon, color, level } = skill
  const cfg = LEVEL_CONFIG[level]

  // ─── Drift ──────────────────────────────────────────────────────────────────
  const driftX = useMotionValue(0)
  const driftY = useMotionValue(0)

  useEffect(() => {
    if (prefersReduced || containerWidth === 0) return
    let frameId: number
    let tick = index * 47
    const speed = 0.00040 + (index % 7) * 0.00010
    const phase = (index * 137.508 * Math.PI) / 180
    const amp = 3 + (index % 4) * 2

    const loop = () => {
      tick++
      driftX.set(Math.sin(tick * speed + phase) * amp)
      driftY.set(Math.cos(tick * speed * 0.71 + phase + 1.1) * amp)
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [driftX, driftY, index, prefersReduced, containerWidth])

  // ─── Gravity ─────────────────────────────────────────────────────────────────
  const rawGX = useMotionValue(0)
  const rawGY = useMotionValue(0)
  const gX = useSpring(rawGX, { stiffness: 52, damping: 22, mass: 0.55 })
  const gY = useSpring(rawGY, { stiffness: 52, damping: 22, mass: 0.55 })

  useEffect(() => {
    if (containerWidth === 0) return
    const unsub = mouseX.on("change", (mx) => {
      if (!isFinite(mx) || mx > containerWidth * 2) {
        rawGX.set(0)
        rawGY.set(0)
        return
      }
      const nx = xPct * containerWidth
      const ny = yPct * containerHeight
      const my = mouseY.get()
      const dx = mx - nx
      const dy = my - ny
      const dist = Math.sqrt(dx * dx + dy * dy)
      const RADIUS = 190
      const STRENGTH = 0.20

      if (dist < RADIUS && dist > 2) {
        const factor = ((RADIUS - dist) / RADIUS) * STRENGTH
        rawGX.set(dx * factor)
        rawGY.set(dy * factor)
      } else {
        rawGX.set(0)
        rawGY.set(0)
      }
    })
    return unsub
  }, [xPct, yPct, containerWidth, containerHeight, mouseX, mouseY, rawGX, rawGY])

  // ─── Combine drift + gravity ──────────────────────────────────────────────────
  const combinedX = useTransform(
    [driftX, gX] as MotionValue<number>[],
    ([d, g]: number[]) => d + g
  )
  const combinedY = useTransform(
    [driftY, gY] as MotionValue<number>[],
    ([d, g]: number[]) => d + g
  )

  const targetOpacity = isDimmed
    ? 0.17
    : isAnyHovered && !isHovered
    ? 0.5
    : 1

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: `${xPct * 100}%`,
        top: `${yPct * 100}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isHovered ? 30 : 1,
      }}
    >
      {/* Drift + gravity layer */}
      <motion.div
        className="pointer-events-auto"
        style={{ x: combinedX, y: combinedY }}
      >
        {/* Ambient glow bloom — expands on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.6 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle, ${color}28 0%, transparent 70%)`,
            filter: "blur(10px)",
          }}
        />

        <motion.button
          type="button"
          aria-label={`${name} · ${SKILL_LEVEL_META[level].label} · ${skill.group}`}
          onClick={onSelect}
          onHoverStart={onHover}
          onHoverEnd={onHoverEnd}
          onFocus={onHover}
          onBlur={onHoverEnd}
          animate={{
            scale: isHovered ? 1.22 : 1,
            opacity: targetOpacity,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative flex items-center justify-center rounded-2xl border border-border bg-secondary/80 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
          style={{
            width: cfg.size,
            height: cfg.size,
            boxShadow: isHovered
              ? `0 0 ${cfg.glow}px ${color}80, 0 0 ${cfg.glow * 2}px ${color}25`
              : `0 0 ${cfg.glow / 3}px ${color}35`,
          }}
        >
          <Icon
            className={cfg.iconSize}
            style={{ color }}
            aria-hidden
          />
        </motion.button>
      </motion.div>
    </div>
  )
}
