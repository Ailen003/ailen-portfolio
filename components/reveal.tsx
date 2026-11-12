"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "section" | "span"
}

export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node || !window.IntersectionObserver || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // Leave server-rendered and already visible content alone. Only arm elements
    // below the viewport, so hydration never makes visible content disappear.
    if (node.getBoundingClientRect().top < window.innerHeight) return
    node.dataset.revealState = "pending"

    const show = () => {
      node.dataset.revealState = "visible"
      observer.unobserve(node)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      { threshold: 0, rootMargin: "0px 0px -32px 0px" },
    )

    observer.observe(node)
    // Keyboard navigation must never land on an invisible interactive element.
    node.addEventListener("focusin", show)
    return () => {
      observer.disconnect()
      node.removeEventListener("focusin", show)
      delete node.dataset.revealState
    }
  }, [])

  const Tag = as as "div"

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
