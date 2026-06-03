import type { EducationEntry, Certification } from "../types/education.types"

export const educationEntries: EducationEntry[] = [
  {
    period: "2013 — 2017",
    title: "B.Sc. in Computer Science",
    org: "Polytechnic University of Catalonia",
    detail: "Graduated with honors. Focus on distributed systems and human–computer interaction.",
  },
  {
    period: "2016",
    title: "Exchange Semester — Web Systems",
    org: "TU Delft, Netherlands",
    detail: "Research project on real-time collaborative editing and CRDTs.",
  },
]

export const certifications: Certification[] = [
  { title: "AWS Certified Solutions Architect", org: "Amazon Web Services", year: "2023" },
  { title: "Professional Scrum Developer", org: "Scrum.org", year: "2022" },
  { title: "Advanced React & Performance", org: "Frontend Masters", year: "2021" },
  { title: "Accessibility Specialist (CPACC)", org: "IAAP", year: "2020" },
]
