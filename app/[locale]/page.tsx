import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/modules/hero/hero-content"
import { About } from "@/modules/about/about-content"
import { Skills } from "@/modules/skills/skills-content"
import { Projects } from "@/modules/projects/projects-content"
import { Experience } from "@/modules/experience/experience-content"
import { Education } from "@/modules/education/education-content"
import { Contact } from "@/modules/contact/contact-content"

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
