import {
  Layout,
  Server,
  Database,
  Wrench,
  Accessibility,
  Webhook,
  Zap,
  Component,
  Activity,
  Drama,
  Cloud,
} from "lucide-react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiGo,
  SiGraphql,
  SiTrpc,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiGit,
  SiGithubactions,
  SiVitest,
} from "react-icons/si"
import { SkillCategory } from "../types/skills.types";


export const skillCategories: SkillCategory[] = [
  {
    icon: Layout,
    color: "#3B82F6",
    title: "Frontend",
    tagline: "Interfaces that feel fast and effortless.",
    skills: [
      {
        name: "React",
        Icon: SiReact,
        color: "#61DAFB",
        level: "expert",
        description: `## React

My primary technology for several years. I work with React daily building medium and large-scale production applications.

### What I master
- **Advanced hooks**: \`useReducer\`, \`useContext\`, \`useTransition\`, \`useDeferredValue\`, and complex custom hooks.
- **Composition patterns**: render props, compound components, controlled/uncontrolled components.
- **Performance optimization**: \`React.memo\`, \`useMemo\`, \`useCallback\`, code splitting with \`Suspense\` and \`lazy\`.
- **Server Components** (React 19) and the new concurrent rendering model.

### Featured projects
I've built real-time analytical dashboards, complete design systems, and e-commerce applications with millions of users, all on React.`,
        categories: ["framework", "library"],
      },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        color: "#111111",
        level: "expert",
        description: `## Next.js

Framework of choice for any serious web project. I've been using Next.js since version 12 and have migrated projects through each major version.

### Areas of expertise
- **App Router**: nested layouts, route groups, Server vs Client Components.
- **Rendering strategies**: SSG, SSR, ISR and Partial Pre-rendering (PPR).
- **Built-in optimizations**: \`next/image\`, \`next/font\`, metadata API.
- **Middleware** and Edge Runtime for authentication and A/B testing.

### Real experience
From ultra-fast landing pages with 100/100 Lighthouse scores to complex SaaS platforms with authentication, multi-tenancy, and real-time data dashboards.`,
        categories: ["framework"],
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        level: "expert",
        description: `## TypeScript

I can't imagine starting a new project without TypeScript. I use it in all my projects, both frontend and backend.

### What I bring
- **Advanced typing**: generics, conditional types, mapped types, template literal types.
- **Type inference** that reduces boilerplate without losing safety.
- **Integration** with Zod, tRPC and Prisma for frictionless end-to-end type-safety.
- Strict \`tsconfig\` configuration tailored to each project.

### Why I value it
TypeScript has saved me countless hours of debugging. Errors appear in the editor, not in production at 3am.`,
        categories: ["language"],
      },
      {
        name: "Tailwind CSS",
        Icon: SiTailwindcss,
        color: "#38BDF8",
        level: "expert",
        description: `## Tailwind CSS

My preferred styling tool. From Tailwind v2 to v4, I've seen the framework evolve and adopted its improvements in each iteration.

### How I use it
- **Custom design tokens** integrated with the project's design system.
- **Variants** with \`cva\` (class-variance-authority) for polymorphic components.
- **Animations** with \`tw-animate-css\` and native CSS transitions.
- Automatic bundle optimization: only used classes in production.

### Key advantage
Placing styles alongside markup eliminates context switching and makes code more readable and maintainable.`,
        categories: ["library", "design"],
      },
      {
        name: "Framer Motion",
        Icon: SiFramer,
        color: "#0099FF",
        level: "intermediate",
        description: `## Framer Motion

Library I use to add quality animations to my interfaces without sacrificing performance or accessibility.

### Frequent use cases
- **Smooth page transitions** with layout animations.
- **Micro-interactions**: hover states, press feedback, animated loading skeletons.
- **Scroll-driven animations** with \`useScroll\` and \`useTransform\`.
- **Gesture handling** for mobile interfaces (drag, swipe).

### Philosophy
I use animations with intention: they should communicate something, not just decorate. I always respect \`prefers-reduced-motion\`.`,
        categories: ["library"],
      },
      {
        name: "Accessibility",
        Icon: Accessibility,
        color: "#34D399",
        level: "intermediate",
        description: `## Web Accessibility

Accessibility is not an additional feature, it's part of doing the job right. I have it integrated as part of my development workflow.

### Practices I apply
- **HTML semantics**: I use the correct elements (\`button\`, \`nav\`, \`main\`, \`dialog\`, etc.).
- **Keyboard**: all interactions are operable without a mouse, with visible focus and logical order.
- **ARIA**: attributes \`aria-label\`, \`aria-expanded\`, \`aria-live\` where semantic HTML is not sufficient.
- **Contrast**: I verify WCAG AA/AAA ratios for text and interactive icons.

### Tools
I use \`axe-core\`, Lighthouse and screen reader testing (VoiceOver, NVDA) to validate.`,
        categories: ["practice", "design"],
      },
    ],
  },
  {
    icon: Server,
    color: "#10B981",
    title: "Backend",
    tagline: "APIs and services built to scale.",
    skills: [
      {
        name: "Node.js",
        Icon: SiNodedotjs,
        color: "#5FA04E",
        level: "expert",
        description: `## Node.js

My main server runtime. I've built everything from simple automation scripts to high-traffic APIs processing thousands of requests per second.

### Typical stack
- **Frameworks**: Express, Fastify, Hono (Edge-compatible).
- **Streaming**: Node.js Streams for file and large data processing.
- **Workers**: \`worker_threads\` for CPU-intensive tasks without blocking the event loop.
- **Monitoring**: integration with OpenTelemetry for distributed tracing.

### Best practices
I design my services with structured error handling, logging with \`pino\`, and input validation at each layer.`,
        categories: ["framework"],
      },
      {
        name: "Go",
        Icon: SiGo,
        color: "#00ADD8",
        level: "basic",
        description: `## Go

Language I've explored for high-performance microservices where Node.js wasn't sufficient. I fell in love with its simplicity and goroutines.

### What I've built
- Image processing microservice with parallel concurrency via goroutines.
- Internal CLI tools for deployment automation.
- REST APIs with \`net/http\` + \`chi\` router.

### Learning in progress
I continue to deepen my understanding of Go concurrency patterns (channels, select, context cancellation) and the native testing ecosystem.`,
        categories: ["language"],
      },
      {
        name: "GraphQL",
        Icon: SiGraphql,
        color: "#E10098",
        level: "intermediate",
        description: `## GraphQL

I've worked with GraphQL both on the server and client side, in projects where query flexibility was a requirement.

### Server experience
- Schemas with resolvers in Node.js using Apollo Server and graphql-yoga.
- **DataLoader** to efficiently solve the N+1 problem.
- Authentication with custom directives (\`@auth\`, \`@hasRole\`).

### Client experience
- Apollo Client with normalized cache and optimistic updates.
- Code generation with \`graphql-codegen\` for automatic TypeScript types.

### When I choose it
GraphQL shines when multiple clients (web, mobile) need different data from the same backend.`,
        categories: ["tool", "practice"],
      },
      {
        name: "REST APIs",
        Icon: Webhook,
        color: "#F59E0B",
        level: "expert",
        description: `## REST APIs

REST API design is something I pay special attention to: making them intuitive, predictable, and well-documented.

### Principles I follow
- **Well-named resources** and HTTP verbs used correctly.
- **API versioning** (\`/v1/\`, \`/v2/\`) to avoid breaking existing clients.
- **Structured errors**: I always return a body with \`code\`, \`message\` and optionally \`details\`.
- **Pagination**: cursor-based for large lists, page-based for dashboards.

### Documentation
I use OpenAPI/Swagger to document API contracts, with automatic request validation via Zod.`,
        categories: ["practice"],
      },
      {
        name: "tRPC",
        Icon: SiTrpc,
        color: "#398CCB",
        level: "intermediate",
        description: `## tRPC

One of my favorite technologies in recent years. It eliminates friction between frontend and backend with real end-to-end type-safety.

### How I use it
- **Monorepos** with Next.js: the tRPC router lives in the App Router with Route Handlers.
- **Middleware** for authentication and context injection (session, database).
- **Subscriptions** with SSE for real-time feeds.
- Input validation with Zod in each procedure.

### Why I recommend it
With tRPC, a signature change in the backend produces a TypeScript error in the frontend instantly. No more broken contracts at runtime.`,
        categories: ["library", "tool"],
      },
      {
        name: "Edge Functions",
        Icon: Zap,
        color: "#FACC15",
        level: "intermediate",
        description: `## Edge Functions

Distributed compute that runs close to the user. I use it to reduce latency in features that don't need to access a central database.

### Use cases I've implemented
- **Authentication middleware** on Vercel Edge: JWT verification without cold start.
- **A/B testing**: variant redirection without the user seeing a flash.
- **Geo-routing**: serving different content based on user region.
- **Lightweight rate limiting** with counters in Upstash Redis.

### Limitations to keep in mind
The Edge Runtime has a subset of Node.js APIs. Not everything that works in Node.js works on Edge.`,
        categories: ["cloud", "practice"],
      },
    ],
  },
  {
    icon: Database,
    color: "#F59E0B",
    title: "Data & Infra",
    tagline: "Reliable storage and deployment.",
    skills: [
      {
        name: "PostgreSQL",
        Icon: SiPostgresql,
        color: "#4169E1",
        level: "intermediate",
        description: `## PostgreSQL

My reference relational database. I choose Postgres almost always for its reliability, powerful query planner, and extensions.

### What I handle with ease
- **Schema design**: normalization, relationships, constraints, and strategic indexes.
- **Advanced queries**: CTEs, window functions, JSON aggregation, full-text search.
- **Migrations**: management with Prisma Migrate or Flyway in legacy projects.
- **Connection pooling** with PgBouncer or Neon's built-in pooler.

### Favorite extensions
\`pgvector\` for semantic search, \`PostGIS\` for geospatial data, \`pg_cron\` for scheduled tasks.`,
        categories: ["database"],
      },
      {
        name: "Redis",
        Icon: SiRedis,
        color: "#FF4438",
        level: "intermediate",
        description: `## Redis

I use it as a cache layer and message broker in architectures where latency matters.

### Applied use cases
- **API response cache**: reducing database load with dynamic TTL.
- **Session store**: storing user sessions with automatic expiration.
- **Rate limiting**: counters per IP/user with \`INCR\` + \`EXPIRE\`.
- **Job queues**: with BullMQ to process background tasks (emails, webhooks).

### Services used
Upstash Redis (serverless), Redis Cloud and local Redis via Docker in development.`,
        categories: ["database", "tool"],
      },
      {
        name: "Prisma",
        Icon: SiPrisma,
        color: "#4FD1C5",
        level: "expert",
        description: `## Prisma

ORM that has transformed how I work with databases. The combination of declarative schema + automatically generated types is unbeatable.

### Workflow
1. I define the schema in \`schema.prisma\` with models and relationships.
2. \`prisma migrate dev\` generates and applies the SQL migration.
3. The generated client has 100% correct types, no need to write them manually.

### Advanced features
- **Interactive transactions** with \`prisma.$transaction\`.
- **Prisma middleware** for logging, soft-deletes and auditing.
- **Raw queries** with \`$queryRawUnsafe\` when the query planner needs a hint.
- Integration with Zod via \`zod-prisma-types\` for automatic validation.`,
        categories: ["library", "tool"],
      },
      {
        name: "Docker",
        Icon: SiDocker,
        color: "#2496ED",
        level: "intermediate",
        description: `## Docker

Indispensable tool for having reproducible development environments and packaging applications consistently.

### Daily use
- **docker-compose** to spin up local stacks: Postgres, Redis, custom services.
- **Multi-stage builds** for small and secure production images.
- **.dockerignore** and optimized layers for fast CI builds.

### In production
I've deployed containers on ECS (Fargate), Railway and Fly.io. The consistency between environments that Docker offers is its greatest value.`,
        categories: ["tool", "cloud"],
      },
      {
        name: "AWS",
        Icon: Cloud,
        color: "#FF9900",
        level: "basic",
        description: `## AWS

I've worked with the most common AWS services in medium-scale projects, without being a dedicated cloud architect.

### Services I've used
- **S3**: asset storage, user uploads and backups.
- **CloudFront**: CDN in front of S3 and custom origins.
- **ECS / Fargate**: container deployment without managing servers.
- **SES**: sending transactional emails at scale.
- **Lambda**: serverless functions for webhooks and async processing.

### Tools
AWS CDK for infrastructure as code, and AWS Console for monitoring and troubleshooting.`,
        categories: ["cloud"],
      },
      {
        name: "Vercel",
        Icon: SiVercel,
        color: "#111111",
        level: "expert",
        description: `## Vercel

My preferred deployment platform for Next.js projects. The integration is so fluid that deployment almost feels invisible.

### What I leverage
- **Preview Deployments**: each PR has its own environment. Stakeholders can review before merging.
- **Edge Network**: assets and Edge Functions in over 100 points of presence.
- **Analytics and Speed Insights**: real metrics of Core Web Vitals.
- **Cron Jobs**: scheduled tasks without needing a dedicated server.

### Advanced configuration
I handle \`vercel.json\` for rewrites, custom cache headers and per-region function configuration.`,
        categories: ["cloud", "tool"],
      },
    ],
  },
  {
    icon: Wrench,
    color: "#8B5CF6",
    title: "Tooling & Practices",
    tagline: "The craft behind shipping with confidence.",
    skills: [
      {
        name: "Git",
        Icon: SiGit,
        color: "#F05032",
        level: "expert",
        description: `## Git

Beyond \`commit\`, \`push\` and \`pull\`. Git is a communication and collaboration tool when used well.

### Practices I apply
- **Conventional Commits**: structured messages that enable automatic changelogs.
- **Feature branches** with small, focused PRs that are easy to review.
- **Interactive rebase**: clean and linear history before merging.
- **Git hooks** with Husky: automatic lint and tests on pre-commit and pre-push.

### Workflows
I've worked with GitHub Flow (continuous deployments) and variants of Gitflow (versioned releases) depending on project context.`,
        categories: ["tool", "practice"],
      },
      {
        name: "CI/CD",
        Icon: SiGithubactions,
        color: "#2088FF",
        level: "intermediate",
        description: `## CI/CD

Continuous integration and deployment pipelines that ensure code reaching production always passes necessary checks.

### What I configure in my pipelines
- **Lint + type check** on each PR to block code with errors.
- **Test suite** (unit + integration) with coverage report.
- **Build + deploy** automatic to staging on each merge to \`main\`.
- **Automatic release** to production with manual or automatic approval.

### Platforms
Primarily **GitHub Actions**, I've also used GitLab CI and CircleCI. I know security best practices: secrets in vault, minimum permissions on tokens.`,
        categories: ["tool", "practice"],
      },
      {
        name: "Vitest",
        Icon: SiVitest,
        color: "#FCC72B",
        level: "intermediate",
        description: `## Vitest

My testing framework for modern projects with Vite/Next.js. Extremely fast thanks to HMR and native ESM compatibility.

### How I structure tests
- **Unit tests**: pure functions, hooks and utilities with high coverage.
- **Component tests**: with \`@testing-library/react\` to validate UI behavior.
- **Mocking**: \`vi.mock\` to isolate external dependencies (APIs, system modules).

### Testing philosophy
I don't blindly pursue 100% coverage. I focus on testing observable behavior, not internal implementation.`,
        categories: ["testing", "tool"],
      },
      {
        name: "Playwright",
        Icon: Drama,
        color: "#2EAD33",
        level: "basic",
        description: `## Playwright

End-to-end testing framework I use to validate critical user flows before each release.

### Tests I implement with Playwright
- **Authentication flows**: signup, login, password recovery.
- **Critical business flows**: checkout, resource creation, data export.
- **Cross-browser**: Chrome, Firefox and WebKit in the same test suite.

### CI integration
Playwright tests run in GitHub Actions in parallel, with screenshot and video artifacts when they fail to facilitate debugging.`,
        categories: ["testing", "tool"],
      },
      {
        name: "Design Systems",
        Icon: Component,
        color: "#F472B6",
        level: "intermediate",
        description: `## Design Systems

I've built and maintained design systems from scratch, as well as integrated existing systems (shadcn/ui, Radix, Material) in real projects.

### What it means to me
- **Design tokens**: colors, typography, spacing and radii as CSS variables or Tailwind config.
- **Polymorphic components**: \`Button\`, \`Input\`, \`Dialog\` that adapt to any context.
- **Documentation**: stories in Storybook + MDX so designers and devs speak the same language.
- **Versioning**: publishing internal packages with semantic versioning.

### Real value
A good design system multiplies team speed and guarantees visual consistency without extra effort.`,
        categories: ["design", "practice"],
      },
      {
        name: "Observability",
        Icon: Activity,
        color: "#34D399",
        level: "basic",
        description: `## Observability

La diferencia entre saber que algo está roto cuando el usuario llama, y saberlo antes de que afecte a alguien.

### The three pillars
- **Logs**: structured JSON logging with \`pino\`, centralized in Datadog or Loki.
- **Metrics**: API latency, error rate and saturation. Dashboards in Grafana.
- **Traces**: distributed tracing with OpenTelemetry to understand flow between services.

### Alerts
I configure alerts with sensible thresholds (not too noisy, not too quiet) for the service's most critical SLOs.`,
        categories: ["practice", "tool"],
      },
    ],
  },
]

export function getAllSkills(): (typeof skillCategories[number]["skills"][number] & { group: string })[] {
  return skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, group: cat.title }))
  )
}

export const marqueeSkills: { name: string; Icon: SkillCategory["skills"][number]["Icon"]; color: string }[] = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#111111" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Go", Icon: SiGo, color: "#00ADD8" },
  { name: "AWS", Icon: Cloud, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Vercel", Icon: SiVercel, color: "#111111" },
]
