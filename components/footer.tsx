import { getTranslations } from "next-intl/server"
import styles from "./portfolio-continuity.module.css"
import { ArrowUp } from "lucide-react"
import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"

export async function Footer() {
  const t = await getTranslations("footer")

  return (
    <footer className={`relative isolate overflow-hidden border-t border-border ${styles.footer}`}>

      <div className="site-container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {portfolioIdentity.name}.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          {t("backToTop")}
          <span className={`icon-button ${styles.backToTop}`}>
            <ArrowUp className="h-4 w-4" />
          </span>
        </a>
      </div>
    </footer>
  )
}
