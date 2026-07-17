import { Compass, Code2, Users, Sparkles } from "lucide-react"
import type { AboutValue, AboutFact, AboutData } from "../types/about.types"

export const aboutValues: AboutValue[] = [
  {
    icon: Compass,
    title: "Product-minded",
    description: "I think beyond tickets — about the user, the business, and the long-term health of the codebase.",
  },
  {
    icon: Code2,
    title: "Craft & quality",
    description: "Clean architecture, strong typing, and tests. The details are where good products are made.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "I work closely with design and product, mentor engineers, and document decisions clearly.",
  },
  {
    icon: Sparkles,
    title: "Always learning",
    description: "From distributed systems to design systems — I stay curious and share what I learn.",
  },
]

export const aboutFacts: AboutFact[] = [
  { label: "Based in", value: "Barcelona, ES" },
  { label: "Experience", value: "8+ years" },
  { label: "Focus", value: "Full-stack web" },
  { label: "Languages", value: "EN · ES · CA" },
]

export const aboutDataMap: Record<string, AboutData> = {
  en: {
    title: "About me",
    p1: "I'm a senior software engineer who enjoys turning complex problems into simple, reliable products. My favourite work lives at the intersection of design and engineering — interfaces that feel natural and are built to scale.",
    p2: "Over the last eight years I've worked at startups and product studios, leading frontend architecture, building design systems, and shipping features used by millions. I believe the best engineering is invisible: fast, accessible, and dependable.",
    p3: "When I'm not coding, you'll find me sketching UI ideas, contributing to open-source projects, or running along the coast with a good podcast.",
    values: {
      productMinded: {
        title: "Product-minded",
        description: "I think beyond tickets — about the user, the business, and the long-term health of the codebase.",
      },
      craftQuality: {
        title: "Craft & quality",
        description: "Clean architecture, strong typing, and tests. The details are where good products are made.",
      },
      collaborative: {
        title: "Collaborative",
        description: "I work closely with design and product, mentor engineers, and document decisions clearly.",
      },
      alwaysLearning: {
        title: "Always learning",
        description: "From distributed systems to design systems — I stay curious and share what I learn.",
      },
    },
    facts: {
      basedIn: { label: "Based in", value: "Barcelona, ES" },
      experience: { label: "Experience", value: "8+ years" },
      focus: { label: "Focus", value: "Full-stack web" },
      languages: { label: "Languages", value: "EN · ES · CA" },
    },
  },
  es: {
    title: "Sobre mí",
    p1: "Soy una ingenier\u00eda de software senior que disfruta convirtiendo problemas complejos en productos simples y fiables. Mi trabajo favorito vive en la intersecci\u00f3n entre dise\u00f1o e ingenier\u00eda — interfaces que se sienten naturales y est\u00e1n construidas para escalar.",
    p2: "Durante los \u00faltimos ocho a\u00f1os he trabajado en startups y estudios de producto, liderando la arquitectura frontend, construyendo sistemas de dise\u00f1o y lanzando funcionalidades usadas por millones de personas. Creo que la mejor ingenier\u00eda es invisible: r\u00e1pida, accesible y confiable.",
    p3: "Cuando no estoy programando, me encontrar\u00e1s esbozando ideas de UI, contribuyendo a proyectos de c\u00f3digo abierto o corriendo por la costa con un buen podcast.",
    values: {
      productMinded: {
        title: "Mentalidad de producto",
        description: "Pienso m\u00e1s all\u00e1 de los tickets — en el usuario, el negocio y la salud a largo plazo del c\u00f3digo.",
      },
      craftQuality: {
        title: "Artesan\u00eda y calidad",
        description: "Arquitectura limpia, tipado fuerte y tests. Los detalles son donde se construyen los buenos productos.",
      },
      collaborative: {
        title: "Colaborativa",
        description: "Trabajo estrechamente con dise\u00f1o y producto, mentorizo ingenieros y documento las decisiones con claridad.",
      },
      alwaysLearning: {
        title: "Siempre aprendiendo",
        description: "De sistemas distribuidos a sistemas de dise\u00f1o — me mantengo curiosa y comparto lo que aprendo.",
      },
    },
    facts: {
      basedIn: { label: "Ubicaci\u00f3n", value: "Barcelona, ES" },
      experience: { label: "Experiencia", value: "8+ a\u00f1os" },
      focus: { label: "Especialidad", value: "Full-stack web" },
      languages: { label: "Idiomas", value: "EN \u00b7 ES \u00b7 CA" },
    },
  },
}
