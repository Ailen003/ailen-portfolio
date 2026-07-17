import type { ExperienceRole, ExperienceData } from "../types/experience.types"

export const experienceRoles: ExperienceRole[] = [
  {
    period: "2022 — Present",
    role: "Senior Software Engineer",
    company: "ETI",
    logo: "/images/experiences/eti-logo.jpg",
    summary:
      "Leading developer of all types of systems.",
    achievements: [
      "Development and implementation of GestionVC, a solution to videoconferencing problems.",
      "Commercial development system.",
      "Infrastructure deployment.",
    ],
    tags: ["Next.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2019 — 2022",
    role: "Software Engineer",
    company: "Lumen Studio",
    logo: "/placeholder-logo.png",
    summary:
      "Built client products end to end — from marketing sites to complex dashboards — across a fast-moving product agency.",
    achievements: [
      "Shipped 20+ production apps for startups and enterprise clients.",
      "Established the company's reusable component toolkit and CI pipeline.",
      "Collaborated directly with designers to deliver pixel-perfect, accessible UIs.",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    period: "2017 — 2019",
    role: "Frontend Developer",
    company: "Cobalt Interactive",
    logo: "/placeholder-logo.png",
    summary:
      "Joined as the second engineer and helped grow the product from prototype to its first thousand users.",
    achievements: [
      "Implemented the initial component library and styling conventions.",
      "Owned the public-facing web app and improved Lighthouse scores across the board.",
    ],
    tags: ["JavaScript", "Vue", "SCSS"],
  },
]

export const experienceDataMap: Record<string, ExperienceData> = {
  en: {
    title: "Experience",
    subtitle: "Where I've worked and the impact I've made along the way.",
    roles: [
      {
        period: "2022 \u2014 Present",
        role: "Senior Software Engineer",
        company: "Northwind Labs",
        logo: "/images/experiences/eti-logo.jpg",
        summary:
          "Lead frontend engineer for the core platform used by 40k+ customers. Own architecture decisions and mentor a team of five.",
        achievements: [
          "Rebuilt the design system, reducing UI bugs by 35% and accelerating feature delivery.",
          "Cut Largest Contentful Paint by 60% through streaming and edge rendering.",
          "Introduced end-to-end testing that brought production regressions near zero.",
        ],
        tags: ["Next.js", "TypeScript", "GraphQL"],
      },
      {
        period: "2019 \u2014 2022",
        role: "Software Engineer",
        company: "Lumen Studio",
        logo: "/placeholder-logo.png",
        summary:
          "Built client products end to end \u2014 from marketing sites to complex dashboards \u2014 across a fast-moving product agency.",
        achievements: [
          "Shipped 20+ production apps for startups and enterprise clients.",
          "Established the company\u2019s reusable component toolkit and CI pipeline.",
          "Collaborated directly with designers to deliver pixel-perfect, accessible UIs.",
        ],
        tags: ["React", "Node.js", "PostgreSQL"],
      },
      {
        period: "2017 \u2014 2019",
        role: "Frontend Developer",
        company: "Cobalt Interactive",
        logo: "/placeholder-logo.png",
        summary:
          "Joined as the second engineer and helped grow the product from prototype to its first thousand users.",
        achievements: [
          "Implemented the initial component library and styling conventions.",
          "Owned the public-facing web app and improved Lighthouse scores across the board.",
        ],
        tags: ["JavaScript", "Vue", "SCSS"],
      },
    ],
  },
  es: {
    title: "Experiencia",
    subtitle: "D\u00f3nde he trabajado y el impacto que he generado a lo largo del camino.",
    roles: [
      {
        period: "2022 \u2014 Present",
        role: "Ingenier\u00eda de Software Senior",
        company: "Northwind Labs",
        logo: "/images/experiences/eti-logo.jpg",
        summary:
          "Ingenier\u00eda frontend principal para la plataforma central usada por 40k+ clientes. Responsable de las decisiones de arquitectura y mentora de un equipo de cinco personas.",
        achievements: [
          "Reconstru\u00ed el sistema de dise\u00f1o, reduciendo los bugs de UI en un 35% y acelerando la entrega de funcionalidades.",
          "Reduje el Largest Contentful Paint en un 60% mediante streaming y renderizado en el edge.",
          "Introduje tests end-to-end que llevaron las regresiones en producci\u00f3n pr\u00e1cticamente a cero.",
        ],
        tags: ["Next.js", "TypeScript", "GraphQL"],
      },
      {
        period: "2019 \u2014 2022",
        role: "Ingenier\u00eda de Software",
        company: "Lumen Studio",
        logo: "/placeholder-logo.png",
        summary:
          "Constru\u00ed productos para clientes de principio a fin \u2014 desde sitios de marketing hasta dashboards complejos \u2014 en una agencia de producto de ritmo r\u00e1pido.",
        achievements: [
          "Lanc\u00e9 20+ aplicaciones en producci\u00f3n para startups y clientes enterprise.",
          "Establec\u00ed el toolkit de componentes reutilizables y el pipeline de CI de la empresa.",
          "Colabor\u00e9 directamente con dise\u00f1adores para entregar UIs pixel-perfect y accesibles.",
        ],
        tags: ["React", "Node.js", "PostgreSQL"],
      },
      {
        period: "2017 \u2014 2019",
        role: "Desarrolladora Frontend",
        company: "Cobalt Interactive",
        logo: "/placeholder-logo.png",
        summary:
          "Me un\u00ed como la segunda ingeniera y ayud\u00e9 a hacer crecer el producto desde el prototipo hasta sus primeros mil usuarios.",
        achievements: [
          "Implement\u00e9 la librer\u00eda inicial de componentes y las convenciones de estilos.",
          "Fui responsable de la app web p\u00fablica y mejor\u00e9 las puntuaciones de Lighthouse en todos los aspectos.",
        ],
        tags: ["JavaScript", "Vue", "SCSS"],
      },
    ],
  },
}
