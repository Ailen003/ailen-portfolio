import { ArrowUp } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Elena Vargas. Designed & built with care.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Back to top
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border transition-all group-hover:-translate-y-0.5 group-hover:border-primary">
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
    </footer>
  )
}
