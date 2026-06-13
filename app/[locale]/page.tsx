import { getTranslations } from "next-intl/server"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/modules/hero/hero-content"
import { About } from "@/modules/about/about-content"
import { Skills } from "@/modules/skills/skills-content"
import { Projects } from "@/modules/projects/projects-content"
import { Experience } from "@/modules/experience/experience-content"
import { Education } from "@/modules/education/education-content"
import { GithubStats } from "@/modules/github-stats/github-stats-content"
import { Services } from "@/modules/services/services-content"
import { Contact } from "@/modules/contact/contact-content"
import { JsonLd } from "@/components/seo/json-ld"
import { buildPortfolioJsonLd } from "@/lib/seo/structured-data"

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const meta = await getTranslations({ locale, namespace: "metadata" })
  const seo = await getTranslations({ locale, namespace: "seo" })

  const jsonLd = buildPortfolioJsonLd({
    locale,
    siteName: seo("siteName"),
    jobTitle: seo("jobTitle"),
    description: meta("description"),
  })

  return (
    <>
      <JsonLd data={jsonLd} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <GithubStats />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
