import { getTranslations } from "next-intl/server"
import { SectionHeading } from "@/components/section-heading"
import { ProjectsListContainer } from "./list/projects-list-container"
import { fetchProjectsData } from "./lib/actions/projects.action"

export async function Projects() {
  const t = await getTranslations("projects")
  const result = await fetchProjectsData()

  if (!result.ok) return null

  const { endToEnd, contributions, research } = result.data

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative overflow-hidden projects-section section-space">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background/60" />


      <div className="site-container relative">
        <SectionHeading
          index="03"
          title={t("title")}
          subtitle={t("subtitle")}
          headingId="projects-heading"
        />
        <ProjectsListContainer
          endToEnd={endToEnd}
          contributions={contributions}
          research={research}
        />
      </div>
    </section>
  )
}
