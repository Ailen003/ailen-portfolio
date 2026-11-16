import { getTranslations } from "next-intl/server"
import { EditorialHeading } from "@/components/editorial-heading"
import styles from "@/components/portfolio-continuity.module.css"
import { ProjectsListContainer } from "./list/projects-list-container"
import { fetchProjectsData } from "./lib/actions/projects.action"

export async function Projects() {
  const t = await getTranslations("projects")
  const result = await fetchProjectsData()

  if (!result.ok) return null

  const { endToEnd, contributions, research } = result.data

  return (
    <section id="projects" aria-labelledby="projects-heading" className={`section-space ${styles.projects}`}>



      <div className="site-container relative">
        <EditorialHeading
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
