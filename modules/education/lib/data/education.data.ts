import type { EducationEntry, Certification, EducationData } from "../types/education.types"

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

export const educationDataMap: Record<string, EducationData> = {
  en: {
    title: "Education & certifications",
    subtitle: "Formal training and the credentials I\u2019ve earned to keep my craft sharp.",
    sectionEducation: "Education",
    sectionCertifications: "Certifications",
    entries: [
      {
        period: "2013 \u2014 2017",
        title: "B.Sc. in Computer Science",
        org: "Polytechnic University of Catalonia",
        detail: "Graduated with honors. Focus on distributed systems and human\u2013computer interaction.",
      },
      {
        period: "2016",
        title: "Exchange Semester \u2014 Web Systems",
        org: "TU Delft, Netherlands",
        detail: "Research project on real-time collaborative editing and CRDTs.",
      },
    ],
    certifications: [
      { title: "AWS Certified Solutions Architect", org: "Amazon Web Services", year: "2023" },
      { title: "Professional Scrum Developer", org: "Scrum.org", year: "2022" },
      { title: "Advanced React & Performance", org: "Frontend Masters", year: "2021" },
      { title: "Accessibility Specialist (CPACC)", org: "IAAP", year: "2020" },
    ],
  },
  es: {
    title: "Educaci\u00f3n y certificaciones",
    subtitle: "Formaci\u00f3n acad\u00e9mica y las credenciales que he obtenido para mantener mi oficio afilado.",
    sectionEducation: "Educaci\u00f3n",
    sectionCertifications: "Certificaciones",
    entries: [
      {
        period: "2013 \u2014 2017",
        title: "Grado en Ingenier\u00eda Inform\u00e1tica",
        org: "Polytechnic University of Catalonia",
        detail: "Graduada con honores. Especializaci\u00f3n en sistemas distribuidos e interacci\u00f3n humano-computadora.",
      },
      {
        period: "2016",
        title: "Semestre de Intercambio \u2014 Sistemas Web",
        org: "TU Delft, Pa\u00edses Bajos",
        detail: "Proyecto de investigaci\u00f3n sobre edici\u00f3n colaborativa en tiempo real y CRDTs.",
      },
    ],
    certifications: [
      { title: "AWS Certified Solutions Architect", org: "Amazon Web Services", year: "2023" },
      { title: "Professional Scrum Developer", org: "Scrum.org", year: "2022" },
      { title: "Advanced React & Performance", org: "Frontend Masters", year: "2021" },
      { title: "Accessibility Specialist (CPACC)", org: "IAAP", year: "2020" },
    ],
  },
}
