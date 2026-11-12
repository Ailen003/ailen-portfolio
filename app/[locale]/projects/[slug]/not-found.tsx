import { getTranslations } from "next-intl/server"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default async function ProjectNotFound() {
  const t = await getTranslations("projects.detail")
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="site-container flex min-h-[80dvh] flex-col items-start justify-center gap-6 pb-16 pt-28">
        <p id="home" className="eyebrow">404</p>
        <h1 className="case-title">{t("notFoundTitle")}</h1>
        <p className="max-w-lg text-muted-foreground">{t("notFoundDescription")}</p>
        <Link href="/#projects" className="button-primary"><ArrowLeft className="size-4" aria-hidden="true" />{t("back")}</Link>
      </main>
      <Footer />
    </>
  )
}
