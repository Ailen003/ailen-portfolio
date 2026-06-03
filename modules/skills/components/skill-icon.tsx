import { Skill } from "../lib/types/skills.types"


interface SkillIconProps {
  skill: Skill
}

export function SkillIcon({ skill }: SkillIconProps) {
  const { name, Icon, color } = skill

  return (
    <li className="group/sk relative flex items-center justify-center">
      {/* Colored glow halo on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 scale-90 rounded-2xl opacity-0 blur-xl transition-all duration-300 group-hover/sk:scale-110 group-hover/sk:opacity-40 group-focus-within/sk:scale-110 group-focus-within/sk:opacity-40"
        style={{ backgroundColor: color }}
      />

      <button
        type="button"
        aria-label={name}
        className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-secondary/40 outline-none transition-all duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-ring group-hover/sk:bg-secondary"
      >
        <Icon
          className="h-6 w-6 grayscale transition-all duration-300 group-hover/sk:scale-110 group-hover/sk:grayscale-0 group-focus-within/sk:scale-110 group-focus-within/sk:grayscale-0"
          style={{ color }}
        />
      </button>

      {/* Tooltip */}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 font-mono text-xs text-popover-foreground opacity-0 shadow-lg shadow-foreground/5 transition-all duration-200 group-hover/sk:translate-y-0 group-hover/sk:scale-100 group-hover/sk:opacity-100 group-focus-within/sk:translate-y-0 group-focus-within/sk:scale-100 group-focus-within/sk:opacity-100"
      >
        {name}
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-border bg-popover" />
      </span>
    </li>
  )
}
