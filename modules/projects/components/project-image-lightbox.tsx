"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface ProjectImageLightboxProps {
  images: string[]
  projectTitle: string
}

export function ProjectImageLightbox({ images, projectTitle }: ProjectImageLightboxProps) {
  const t = useTranslations("projects.gallery")
  const [index, setIndex] = useState<number | null>(null)
  const trigger = useRef<HTMLButtonElement | null>(null)
  const move = (step: number) => setIndex((current) =>
    current === null ? null : (current + step + images.length) % images.length,
  )

  if (images.length === 0) return null

  return (
    <>
      <div className={`grid gap-2 ${images.length === 1 ? "grid-cols-1" : images.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
        {images.map((src, imageIndex) => (
          <button
            key={`${src}-${imageIndex}`}
            type="button"
            aria-label={t("open", { title: projectTitle, number: imageIndex + 1 })}
            aria-haspopup="dialog"
            onClick={(event) => {
              trigger.current = event.currentTarget
              setIndex(imageIndex)
            }}
            className="group relative aspect-video overflow-hidden rounded-lg border border-border bg-secondary transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Image src={src || "/placeholder.svg"} alt={t("image", { title: projectTitle, number: imageIndex + 1 })} fill sizes="(min-width: 640px) 200px, 45vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
          </button>
        ))}
      </div>

      <Dialog open={index !== null} onOpenChange={(open) => { if (!open) setIndex(null) }}>
        <DialogContent
          showCloseButton={false}
          aria-describedby={undefined}
          className="flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] flex-col gap-3 overflow-hidden p-3 sm:max-w-6xl sm:p-5"
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            trigger.current?.focus()
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              move(event.key === "ArrowLeft" ? -1 : 1)
            }
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <DialogTitle className="min-w-0 text-sm font-medium">{projectTitle}</DialogTitle>
            <DialogClose asChild>
              <button type="button" aria-label={t("close")} className="icon-button"><X className="size-4" /></button>
            </DialogClose>
          </div>
          {index !== null && (
            <div className="relative h-[min(65dvh,44rem)] min-h-40 w-full overflow-hidden rounded-lg bg-secondary">
              <Image src={images[index] || "/placeholder.svg"} alt={t("image", { title: projectTitle, number: index + 1 })} fill sizes="(min-width: 1152px) 1100px, 90vw" className="object-contain" />
            </div>
          )}
          <div className="flex items-center justify-center gap-5">
            {images.length > 1 && <button type="button" aria-label={t("previous")} onClick={() => move(-1)} className="icon-button"><ChevronLeft className="size-4" /></button>}
            <p aria-live="polite" className="text-xs tabular-nums text-muted-foreground">{(index ?? 0) + 1} / {images.length}</p>
            {images.length > 1 && <button type="button" aria-label={t("next")} onClick={() => move(1)} className="icon-button"><ChevronRight className="size-4" /></button>}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
