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

Mi tecnología principal desde hace varios años. Trabajo con React a diario construyendo aplicaciones de producción de mediana y gran escala.

### Lo que domino
- **Hooks avanzados**: \`useReducer\`, \`useContext\`, \`useTransition\`, \`useDeferredValue\`, y hooks personalizados complejos.
- **Patrones de composición**: render props, compound components, controlled/uncontrolled components.
- **Optimización de rendimiento**: \`React.memo\`, \`useMemo\`, \`useCallback\`, code splitting con \`Suspense\` y \`lazy\`.
- **Server Components** (React 19) y el nuevo modelo de renderizado concurrente.

### Proyectos destacados
He construido dashboards analíticos en tiempo real, sistemas de diseño completos y aplicaciones e-commerce con millones de usuarios, todo sobre React.`,
      },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        color: "#111111",
        level: "expert",
        description: `## Next.js

Framework de elección para cualquier proyecto web serio. Llevo usando Next.js desde la versión 12 y he migrado proyectos a través de cada versión mayor.

### Áreas de dominio
- **App Router**: layouts anidados, route groups, Server vs Client Components.
- **Rendering strategies**: SSG, SSR, ISR y Partial Pre-rendering (PPR).
- **Optimizaciones integradas**: \`next/image\`, \`next/font\`, metadata API.
- **Middleware** y Edge Runtime para autenticación y A/B testing.

### Experiencia real
Desde landing pages ultra-rápidas con 100/100 en Lighthouse hasta plataformas SaaS complejas con autenticación, multi-tenancy y dashboards de datos en tiempo real.`,
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        level: "expert",
        description: `## TypeScript

No concibo arrancar un proyecto nuevo sin TypeScript. Lo uso en todos mis proyectos, tanto en frontend como en backend.

### Lo que aporto
- **Tipado avanzado**: generics, conditional types, mapped types, template literal types.
- **Type inference** que reduce boilerplate sin perder seguridad.
- **Integración** con Zod, tRPC y Prisma para un type-safety end-to-end sin fricción.
- Configuración estricta de \`tsconfig\` adaptada a cada proyecto.

### Por qué lo valoro
TypeScript me ha salvado incontables horas de debugging. Los errores aparecen en el editor, no en producción a las 3am.`,
      },
      {
        name: "Tailwind CSS",
        Icon: SiTailwindcss,
        color: "#38BDF8",
        level: "expert",
        description: `## Tailwind CSS

Mi herramienta de estilos preferida. Desde Tailwind v2 hasta v4, he visto evolucionar el framework y he adoptado sus mejoras en cada iteración.

### Cómo lo uso
- **Design tokens** personalizados integrados con el sistema de diseño del proyecto.
- **Variantes** con \`cva\` (class-variance-authority) para componentes polimórficos.
- **Animaciones** con \`tw-animate-css\` y transiciones CSS nativas.
- Optimización automática de bundle: solo las clases usadas en producción.

### Ventaja clave
La colocación de estilos junto al markup elimina el cambio de contexto y hace que el código sea más legible y mantenible.`,
      },
      {
        name: "Framer Motion",
        Icon: SiFramer,
        color: "#0099FF",
        level: "intermediate",
        description: `## Framer Motion

Biblioteca que uso para añadir animaciones de calidad a mis interfaces sin sacrificar el rendimiento ni la accesibilidad.

### Casos de uso frecuentes
- **Page transitions** suaves con layout animations.
- **Micro-interacciones**: hover states, press feedback, loading skeletons animados.
- **Scroll-driven animations** con \`useScroll\` y \`useTransform\`.
- **Gesture handling** para interfaces móviles (drag, swipe).

### Filosofía
Uso animaciones con intención: deben comunicar algo, no solo decorar. Siempre respeto \`prefers-reduced-motion\`.`,
      },
      {
        name: "Accessibility",
        Icon: Accessibility,
        color: "#34D399",
        level: "intermediate",
        description: `## Accesibilidad Web

La accesibilidad no es una feature adicional, es parte de hacer bien el trabajo. La tengo integrada como parte de mi flujo de desarrollo.

### Prácticas que aplico
- **Semántica HTML**: uso los elementos correctos (\`button\`, \`nav\`, \`main\`, \`dialog\`, etc.).
- **Teclado**: toda interacción es operable sin ratón, con foco visible y orden lógico.
- **ARIA**: atributos \`aria-label\`, \`aria-expanded\`, \`aria-live\` donde el HTML semántico no es suficiente.
- **Contraste**: verifico ratios WCAG AA/AAA para texto e íconos interactivos.

### Herramientas
Uso \`axe-core\`, Lighthouse y pruebas con lectores de pantalla (VoiceOver, NVDA) para validar.`,
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

Mi runtime de servidor principal. He construido desde scripts de automatización simples hasta APIs de alto tráfico procesando miles de requests por segundo.

### Stack habitual
- **Frameworks**: Express, Fastify, Hono (Edge-compatible).
- **Streaming**: Node.js Streams para procesamiento de archivos y datos grandes.
- **Workers**: \`worker_threads\` para tareas CPU-intensivas sin bloquear el event loop.
- **Monitoreo**: integración con OpenTelemetry para trazas distribuidas.

### Buenas prácticas
Diseño mis servicios con manejo de errores estructurado, logging con \`pino\`, y validación de input en cada capa.`,
      },
      {
        name: "Go",
        Icon: SiGo,
        color: "#00ADD8",
        level: "basic",
        description: `## Go

Lenguaje que he explorado para microservicios de alto rendimiento donde Node.js no era suficiente. Me enamoré de su simplicidad y sus goroutines.

### Lo que he construido
- Microservicio de procesamiento de imágenes con concurrencia paralela vía goroutines.
- CLI tools internas para automatización de deployments.
- APIs REST con \`net/http\` + \`chi\` router.

### Aprendizaje en curso
Sigo profundizando en los patrones de concurrencia de Go (channels, select, context cancellation) y en el ecosistema de testing nativo.`,
      },
      {
        name: "GraphQL",
        Icon: SiGraphql,
        color: "#E10098",
        level: "intermediate",
        description: `## GraphQL

He trabajado con GraphQL tanto del lado del servidor como del cliente, en proyectos donde la flexibilidad de queries era un requisito.

### Experiencia servidor
- Schemas con resolvers en Node.js usando Apollo Server y graphql-yoga.
- **DataLoader** para resolver el problema N+1 de manera eficiente.
- Autenticación con directives personalizadas (\`@auth\`, \`@hasRole\`).

### Experiencia cliente
- Apollo Client con cache normalizado y optimistic updates.
- Code generation con \`graphql-codegen\` para types TypeScript automáticos.

### Cuándo lo elijo
GraphQL brilla cuando múltiples clientes (web, móvil) necesitan datos distintos del mismo backend.`,
      },
      {
        name: "REST APIs",
        Icon: Webhook,
        color: "#F59E0B",
        level: "expert",
        description: `## REST APIs

El diseño de APIs REST es algo en lo que pongo especial atención: que sean intuitivas, predecibles y bien documentadas.

### Principios que sigo
- **Recursos bien nombrados** y verbos HTTP usados correctamente.
- **Versionado** de API (\`/v1/\`, \`/v2/\`) para no romper clientes existentes.
- **Errores estructurados**: siempre devuelvo un body con \`code\`, \`message\` y opcionalmente \`details\`.
- **Paginación**: cursor-based para listas grandes, page-based para dashboards.

### Documentación
Uso OpenAPI/Swagger para documentar contratos de API, con validación automática de requests vía Zod.`,
      },
      {
        name: "tRPC",
        Icon: SiTrpc,
        color: "#398CCB",
        level: "intermediate",
        description: `## tRPC

Una de mis tecnologías favoritas de los últimos años. Elimina la fricción entre frontend y backend con type-safety end-to-end real.

### Cómo lo uso
- **Monorepos** con Next.js: el router de tRPC vive en el App Router con Route Handlers.
- **Middleware** para autenticación e inyección de contexto (sesión, base de datos).
- **Subscriptions** con SSE para feeds en tiempo real.
- Input validation con Zod en cada procedimiento.

### Por qué lo recomiendo
Con tRPC, un cambio de firma en el backend produce un error de TypeScript en el frontend al instante. No más contratos rotos en runtime.`,
      },
      {
        name: "Edge Functions",
        Icon: Zap,
        color: "#FACC15",
        level: "intermediate",
        description: `## Edge Functions

Compute distribuido que corre cerca del usuario. Lo uso para reducir latencia en features que no necesitan acceder a una base de datos central.

### Casos de uso que he implementado
- **Middleware de autenticación** en Vercel Edge: verificación de JWT sin cold start.
- **A/B testing**: redireccionamiento de variantes sin que el usuario vea un flash.
- **Geo-routing**: servir contenido distinto según la región del usuario.
- **Rate limiting** ligero con contadores en Upstash Redis.

### Limitaciones a tener en cuenta
El Edge Runtime tiene un subset de APIs de Node.js. No todo lo que funciona en Node.js funciona en Edge.`,
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

Mi base de datos relacional de referencia. Elijo Postgres casi siempre por su fiabilidad, su potente query planner y sus extensiones.

### Lo que manejo con soltura
- **Diseño de esquemas**: normalización, relaciones, constraints e índices estratégicos.
- **Queries avanzadas**: CTEs, window functions, JSON aggregation, full-text search.
- **Migraciones**: gestión con Prisma Migrate o Flyway en proyectos legacy.
- **Conexión pooling** con PgBouncer o Neon's built-in pooler.

### Extensiones favoritas
\`pgvector\` para búsqueda semántica, \`PostGIS\` para datos geoespaciales, \`pg_cron\` para tareas programadas.`,
      },
      {
        name: "Redis",
        Icon: SiRedis,
        color: "#FF4438",
        level: "intermediate",
        description: `## Redis

Lo uso como capa de caché y como broker de mensajes en arquitecturas donde la latencia importa.

### Casos de uso aplicados
- **Caché de API responses**: reducción de carga en la base de datos con TTL dinámico.
- **Session store**: almacenamiento de sesiones de usuario con expiración automática.
- **Rate limiting**: contadores por IP/usuario con \`INCR\` + \`EXPIRE\`.
- **Job queues**: con BullMQ para procesar tareas en background (emails, webhooks).

### Servicios usados
Upstash Redis (serverless), Redis Cloud y Redis local vía Docker en desarrollo.`,
      },
      {
        name: "Prisma",
        Icon: SiPrisma,
        color: "#4FD1C5",
        level: "expert",
        description: `## Prisma

ORM que ha transformado cómo trabajo con bases de datos. La combinación de schema declarativo + tipos generados automáticamente es imbatible.

### Flujo de trabajo
1. Defino el schema en \`schema.prisma\` con modelos y relaciones.
2. \`prisma migrate dev\` genera y aplica la migración SQL.
3. El cliente generado tiene tipos 100% correctos, sin necesidad de escribirlos a mano.

### Funcionalidades avanzadas
- **Transacciones** interactivas con \`prisma.$transaction\`.
- **Middleware** de Prisma para logging, soft-deletes y auditoría.
- **Raw queries** con \`$queryRawUnsafe\` cuando el query planner necesita una pista.
- Integración con Zod via \`zod-prisma-types\` para validación automática.`,
      },
      {
        name: "Docker",
        Icon: SiDocker,
        color: "#2496ED",
        level: "intermediate",
        description: `## Docker

Herramienta indispensable para tener entornos de desarrollo reproducibles y para empaquetar aplicaciones de forma consistente.

### Uso diario
- **docker-compose** para levantar stacks locales: Postgres, Redis, servicios propios.
- **Multi-stage builds** para imágenes de producción pequeñas y seguras.
- **.dockerignore** y capas optimizadas para builds rápidos en CI.

### En producción
He desplegado contenedores en ECS (Fargate), Railway y Fly.io. La consistencia entre entornos que ofrece Docker es su mayor valor.`,
      },
      {
        name: "AWS",
        Icon: Cloud,
        color: "#FF9900",
        level: "basic",
        description: `## AWS

He trabajado con los servicios de AWS más comunes en proyectos de mediana escala, sin ser un arquitecto cloud dedicado.

### Servicios que he usado
- **S3**: almacenamiento de assets, uploads de usuario y backups.
- **CloudFront**: CDN frente a S3 y orígenes personalizados.
- **ECS / Fargate**: despliegue de contenedores sin gestionar servidores.
- **SES**: envío de emails transaccionales a escala.
- **Lambda**: funciones serverless para webhooks y procesamiento asíncrono.

### Herramientas
AWS CDK para infraestructura como código, y AWS Console para monitoreo y troubleshooting.`,
      },
      {
        name: "Vercel",
        Icon: SiVercel,
        color: "#111111",
        level: "expert",
        description: `## Vercel

Mi plataforma de despliegue preferida para proyectos Next.js. La integración es tan fluida que el deployment casi no se siente.

### Lo que aprovecho
- **Preview Deployments**: cada PR tiene su propio ambiente. Los stakeholders pueden revisar antes de mergear.
- **Edge Network**: assets y Edge Functions en más de 100 puntos de presencia.
- **Analytics y Speed Insights**: métricas reales de Core Web Vitals.
- **Cron Jobs**: tareas programadas sin necesidad de un servidor dedicado.

### Configuración avanzada
Manejo \`vercel.json\` para rewrites, headers de caché personalizados y configuración de funciones por región.`,
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

Más allá de \`commit\`, \`push\` y \`pull\`. Git es una herramienta de comunicación y colaboración cuando se usa bien.

### Prácticas que aplico
- **Conventional Commits**: mensajes estructurados que permiten changelogs automáticos.
- **Feature branches** con PRs pequeños y enfocados, fáciles de revisar.
- **Rebase interactivo**: historial limpio y lineal antes de mergear.
- **Git hooks** con Husky: lint y tests automáticos en pre-commit y pre-push.

### Flujos de trabajo
He trabajado con GitHub Flow (deployments continuos) y variantes de Gitflow (releases versionados) según el contexto del proyecto.`,
      },
      {
        name: "CI/CD",
        Icon: SiGithubactions,
        color: "#2088FF",
        level: "intermediate",
        description: `## CI/CD

Pipelines de integración y despliegue continuo que garantizan que el código que llega a producción siempre pasa por las verificaciones necesarias.

### Lo que configuro en mis pipelines
- **Lint + type check** en cada PR para bloquear código con errores.
- **Test suite** (unit + integration) con reporte de cobertura.
- **Build + deploy** automático a staging en cada merge a \`main\`.
- **Release automático** a producción con aprobación manual o automática.

### Plataformas
Principalmente **GitHub Actions**, también he usado GitLab CI y CircleCI. Conozco las mejores prácticas de seguridad: secretos en vault, permisos mínimos en tokens.`,
      },
      {
        name: "Vitest",
        Icon: SiVitest,
        color: "#FCC72B",
        level: "intermediate",
        description: `## Vitest

Mi framework de testing para proyectos modernos con Vite/Next.js. Extremadamente rápido gracias al HMR y la compatibilidad nativa con ESM.

### Cómo estructuro los tests
- **Unit tests**: funciones puras, hooks y utilities con cobertura alta.
- **Component tests**: con \`@testing-library/react\` para validar comportamiento de UI.
- **Mocking**: \`vi.mock\` para aislar dependencias externas (APIs, módulos del sistema).

### Filosofía de testing
No persigo el 100% de cobertura ciegamente. Me enfoco en testear comportamiento observable, no implementación interna.`,
      },
      {
        name: "Playwright",
        Icon: Drama,
        color: "#2EAD33",
        level: "basic",
        description: `## Playwright

Framework de testing end-to-end que uso para validar los flujos críticos de usuario antes de cada release.

### Tests que implemento con Playwright
- **Flujos de autenticación**: signup, login, recuperación de contraseña.
- **Flujos de negocio críticos**: checkout, creación de recursos, exportación de datos.
- **Cross-browser**: Chrome, Firefox y WebKit en el mismo test suite.

### Integración en CI
Los tests de Playwright corren en GitHub Actions en paralelo, con artifacts de screenshots y videos cuando fallan para facilitar el debugging.`,
      },
      {
        name: "Design Systems",
        Icon: Component,
        color: "#F472B6",
        level: "intermediate",
        description: `## Design Systems

He construido y mantenido sistemas de diseño desde cero, así como he integrado sistemas existentes (shadcn/ui, Radix, Material) en proyectos reales.

### Lo que implica para mí
- **Tokens de diseño**: colores, tipografía, espaciado y radios como variables CSS o Tailwind config.
- **Componentes polimórficos**: \`Button\`, \`Input\`, \`Dialog\` que se adaptan a cualquier contexto.
- **Documentación**: historias en Storybook + MDX para que diseñadores y devs hablen el mismo idioma.
- **Versionado**: publicación de paquetes internos con semantic versioning.

### Valor real
Un buen design system multiplica la velocidad del equipo y garantiza consistencia visual sin esfuerzo extra.`,
      },
      {
        name: "Observability",
        Icon: Activity,
        color: "#34D399",
        level: "basic",
        description: `## Observabilidad

La diferencia entre saber que algo está roto cuando el usuario llama, y saberlo antes de que afecte a alguien.

### Las tres patas
- **Logs**: logging estructurado en JSON con \`pino\`, centralizado en Datadog o Loki.
- **Métricas**: latencia de APIs, tasa de errores y saturación. Dashboards en Grafana.
- **Trazas**: distributed tracing con OpenTelemetry para entender el flujo entre servicios.

### Alertas
Configuro alertas con umbrales sensatos (no demasiado ruidosas, no demasiado silenciosas) para los SLOs más críticos del servicio.`,
      },
    ],
  },
]

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
