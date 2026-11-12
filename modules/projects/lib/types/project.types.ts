export type ProjectCategory =
  | "frontend"
  | "backend"
  | "fullstack"
  | "ai"
  | "devtools"
  | "mobile"
  | "ux"

export interface ProjectCategoryMeta {
  label: string
  color: string
}

export const PROJECT_CATEGORY_META: Record<ProjectCategory, ProjectCategoryMeta> = {
  frontend:  { label: "Frontend",   color: "#3B82F6" },
  backend:   { label: "Backend",    color: "#10B981" },
  fullstack: { label: "Full-Stack", color: "#8B5CF6" },
  ai:        { label: "AI / ML",    color: "#F59E0B" },
  devtools:  { label: "Dev Tools",  color: "#06B6D4" },
  mobile:    { label: "Mobile",     color: "#EC4899" },
  ux:        { label: "UX / Design",color: "#F97316" },
}

export type ResearchType = "POC" | "Study" | "Deep Dive" | "Concept"

export type ProjectStatus = "live" | "completed" | "wip" | "supporting" | "archived"

export interface PrLink {
  label: string
  url: string
}

export interface ProjectReference {
  label: string
  url: string
}

export interface EndToEndProject {
  company?: ProjectCompany
  engagement?: ProjectEngagement
  isExample?: boolean
  title: string
  tagline: string
  description: string
  image: string
  tags: string[]
  categories: ProjectCategory[]
  demo: string
  source: string
  featured?: boolean
  /** Detail view fields */
  images?: string[]
  highlights?: string[]
  technicalNotes?: string
  status?: ProjectStatus
  year?: number
  teamSize?: string
}

export interface ContributionProject {
  tagline?: string
  images?: string[]
  highlights?: string[]
  status?: ProjectStatus
  year?: number
  teamSize?: string
  company?: ProjectCompany
  engagement?: ProjectEngagement
  isExample?: boolean
  featured?: boolean
  title: string
  description: string
  image?: string
  role: string
  tags: string[]
  categories: ProjectCategory[]
  demo?: string
  source: string
  /** Detail view fields */
  technicalNotes?: string
  impact?: string
  prLinks?: PrLink[]
}

export interface ResearchProject {
  isExample?: boolean
  title: string
  description: string
  researchType: ResearchType
  tags: string[]
  categories: ProjectCategory[]
  link?: string
  /** Detail view fields */
  technicalNotes?: string
  findings?: string[]
  references?: ProjectReference[]
  year?: number
  completionStatus?: "ongoing" | "completed"
}

export interface ProjectCompany { name: string; logo: string; url?: string; logoScale?: number; darkLogoPadding?: boolean }
export type ProjectEngagement = "employee" | "freelance" | "personal" | "academic"
