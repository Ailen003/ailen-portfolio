This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

Copy `.env.example` to `.env` and set the canonical site origin:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

`NEXT_PUBLIC_SITE_URL` drives all SEO absolute URLs: `metadataBase`, canonical
tags, hreflang alternates, `sitemap.xml`, `robots.txt`, and Open Graph image
URLs. If unset, it falls back to `http://localhost:3000` for local development.

## SEO

SEO is fully data-driven and localized (`en`/`es` via next-intl):

- Per-locale metadata (title, description, keywords, OpenGraph, Twitter,
  canonical + hreflang) in `app/[locale]/layout.tsx`.
- JSON-LD structured data (`Person`, `WebSite`, `ProfilePage`, projects
  `ItemList`) generated from the module data in `lib/seo/structured-data.ts`.
- Dynamic Open Graph / Twitter images via `next/og`
  (`app/[locale]/opengraph-image.tsx`).
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.

Everything is sourced from the existing module data and `messages/*.json`, so
updating your content keeps the SEO metadata in sync automatically.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Portfolio organization

The visual system uses burnt orange, warm ivory and sand, with restrained honey accents
and flowing contour geometry. The dark theme pairs deep coffee surfaces with apricot accents.
Geist body text and Sora headings retain the hierarchy
of the Nairad reference. Light and dark theme tokens live in `app/globals.css`. End-to-end cards
use Tata's single-column composition and link to localized case-study pages. Skills retain their category
tile grid; the orbital view has been removed.

- `modules/portfolio/lib/data/identity.data.ts`: shared name, initials, portrait,
  contact details and headline statistics. The current Elena identity is retained.
- `messages/en.json` and `messages/es.json`: localized interface and project copy,
  service descriptions and skill experience. Existing portfolio content is retained.
- `modules/<section>/components` and `lib/{data,types,services,actions}`: section
  presentation and data access. `components` contains shared navigation, headings,
  reveal behavior, geometry and UI primitives.
- `modules/projects/lib/data/projects.data.ts`: base project metadata and localized
  collections. FinFlow and Atlas UI use the existing ETI logo; Pulse and contributions
  demonstrate freelance work. These attributions are provisional and marked with
  `isExample` in cards and detail views. Update `company` and `engagement`, then
  clear `isExample` when real information is supplied. Technical scope belongs to
  `categories` independently of employment/freelance status.

End-to-end details use `app/[locale]/projects/[slug]/page.tsx` and the shared
`modules/projects/detail/project-detail.tsx` template from the Nairad reference.
Assign each project a permanent `slug` in the base data; translations share that
identifier. The template derives its metadata, contents index, gallery and technical
sections from the project data. Optional sections are omitted when empty. Example
projects remain navigable but use `noindex` and are excluded from the sitemap.
Contribution and research details retain their dialogs.

The reference projects are read-only examples excluded from TypeScript and ESLint.
Next.js uses `next.config.ts` and the current `proxy.ts` locale routing convention.
Production builds enforce TypeScript checks.

Validation: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
Contact and assistant API contracts are unchanged. The contact CTA remains available
while no CV file is configured. No project detail routes or hosting changes are added.
