import { SectionHeading } from "@/components/section-heading"
import { ProjectsListContainer } from "./list/projects-list-container"

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <SectionHeading
        index="03"
        title="Selected projects"
        subtitle="A few things I've designed, built, and shipped end to end."
      />
      <ProjectsListContainer />
    </section>
  )
}
