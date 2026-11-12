import { cn } from "@/lib/utils"

/** A shared framing motif: offset planes, an open corner, and a joining line. */
export function DesignGeometry({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 480 560" fill="none" className={cn("design-geometry", className)}>
      <path d="M96 24H456V392L312 536H24V168L96 96V24Z" fill="currentColor" fillOpacity=".035" />
      <path d="M96 96V24H456V392L312 536H24V168L96 96Z" stroke="currentColor" strokeOpacity=".25" />
      <path className="geometry-join" d="M24 168H312V536M312 168L456 24M312 392H456" stroke="currentColor" strokeOpacity=".18" />
      <path d="M72 200V144H128M344 448H400V392" stroke="currentColor" strokeWidth="2" />
      <path d="M84 24H108M96 12V36M300 536H324M312 524V548" stroke="currentColor" strokeOpacity=".55" />
    </svg>
  )
}
