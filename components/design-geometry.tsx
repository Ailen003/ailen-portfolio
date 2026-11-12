import { cn } from "@/lib/utils"

/** Flowing contours frame portraits and projects, with a small honey accent. */
export function DesignGeometry({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 480 560" fill="none" className={cn("design-geometry", className)}>
      <path d="M64 272C64 112 150 28 278 28C390 28 448 110 448 236V382C448 474 360 532 242 532H64V272Z" fill="currentColor" fillOpacity=".035" />
      <path d="M32 348V272C32 102 134 12 278 12C408 12 468 110 468 236V382C468 490 366 548 242 548H112" stroke="currentColor" strokeOpacity=".24" />
      <path d="M64 392V272C64 126 150 44 278 44C382 44 432 120 432 236V374C432 458 358 512 242 512H80" stroke="currentColor" strokeOpacity=".18" />
      <path d="M96 444V276C96 148 166 76 278 76C356 76 400 138 400 242V362C400 432 342 480 242 480H128" stroke="currentColor" strokeOpacity=".12" />
      <path className="geometry-join" d="M32 348V390C32 440 54 470 96 480M358 42C392 56 416 82 432 116" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
