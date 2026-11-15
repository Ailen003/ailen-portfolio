import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import { test } from "node:test"
import ts from "typescript"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"

const requireTs = createRequire(import.meta.url)
const projectRoot = fileURLToPath(new URL("../", import.meta.url))

// Load the real data, navigation and schema builders with the installed compiler.
const loadTypeScript = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  })
  const compiled = outputText.replace(/require\(["']@\/([^"']+)["']\)/g, (_, target) => `require(${JSON.stringify(path.join(projectRoot, target))})`)
  module._compile(compiled, filename)
}
requireTs.extensions[".ts"] = loadTypeScript
requireTs.extensions[".tsx"] = loadTypeScript

const { getProjectsData, getEndToEndProjectBySlug } = requireTs("../modules/projects/lib/services/projects.service.ts")
const { buildProjectSchema, buildProjectsItemList } = requireTs("../lib/seo/structured-data.ts")
const { CaseStudyNavigation } = requireTs("../modules/projects/components/case-study-navigation.tsx")
const sitemap = requireTs("../app/sitemap.ts").default

test("project translations remain attached to identifiers after reordering", () => {
  const { localizeProjects, getProjectCopy } = requireTs("../modules/projects/lib/data/projects.data.ts")
  for (const locale of ["en", "es"]) {
    const copy = requireTs(`../messages/${locale}.json`).projects
    const reordered = { ...copy }
    for (const group of ["endToEnd", "contributions", "research"]) {
      reordered[group] = Object.fromEntries(Object.entries(copy[group]).reverse())
    }
    assert.deepEqual(localizeProjects(reordered), getProjectsData(locale))
    for (const project of getProjectsData(locale).endToEnd) {
      assert.equal(project.description, copy.endToEnd[project.slug].description)
    }
  }
  assert.throws(() => getProjectCopy({}, "missing-project"), /Missing project translation/)
  assert.throws(() => getProjectCopy({}, "__proto__"), /Missing project translation/)
})

test("services expose complete localized data and safe locale fallback", () => {
  const { getServicesData } = requireTs("../modules/services/lib/services/services.service.ts")
  for (const locale of ["en", "es"]) {
    const data = getServicesData(locale)
    const copy = requireTs(`../messages/${locale}.json`).services
    assert.equal(data.services.length, Object.keys(copy.items).length)
    for (const service of data.services) {
      assert.equal(service.title, copy.items[service.key].title)
      assert.ok(service.bullets.length)
    }
    assert.deepEqual(data.processSteps.map(({ label }) => label), copy.process.map(({ label }) => label))
  }
  for (const locale of ["unknown", "__proto__", "constructor"]) {
    assert.equal(getServicesData(locale), getServicesData("en"))
  }
})

test("chatbot renders translated interface and the portfolio identity in both languages", () => {
  const { NextIntlClientProvider } = requireTs("next-intl")
  const { ChatEmpty } = requireTs("../modules/chatbot/components/chat-empty.tsx")
  const { ChatInput } = requireTs("../modules/chatbot/components/chat-input.tsx")
  const { ChatFab } = requireTs("../modules/chatbot/components/chat-fab.tsx")
  const { portfolioIdentity } = requireTs("../modules/portfolio/lib/data/identity.data.ts")
  for (const locale of ["en", "es"]) {
    const messages = requireTs(`../messages/${locale}.json`)
    const render = (component, props) => renderToStaticMarkup(createElement(NextIntlClientProvider, {
      locale, messages, timeZone: "UTC",
    }, createElement(component, props)))
    const empty = render(ChatEmpty, { onSuggest() {} })
    assert.ok(empty.includes(portfolioIdentity.firstName))
    assert.ok(!empty.includes("Adrian"))
    for (const suggestion of messages.chatbot.suggestions) assert.ok(empty.includes(suggestion))
    const input = render(ChatInput, { onSend() {}, onStop() {}, isStreaming: false })
    assert.ok(input.includes(`aria-label="${messages.chatbot.messageInput}"`))
    assert.ok(input.includes(messages.chatbot.inputHint))
    const fab = render(ChatFab, { isOpen: false, onClick() {} })
    assert.ok(fab.includes(`aria-label="${messages.chatbot.openAssistant}"`))
  }
})

test("permanent project URLs resolve in both languages", () => {
  const expectedProjects = {
    "fleet-control": { year: 2026, image: "/elena-portrait.png" },
    gestionvc: { year: 2025, image: "/placeholder.svg" },
    sicom: { year: 2025, image: "/placeholder.svg" },
  }
  const en = getProjectsData("en").endToEnd
  const es = getProjectsData("es").endToEnd
  assert.deepEqual(en.map(({ slug }) => slug), Object.keys(expectedProjects))
  assert.deepEqual(en.map(({ slug }) => slug), es.map(({ slug }) => slug))
  assert.equal(new Set(en.map(({ slug }) => slug)).size, en.length)
  for (const project of en) {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    for (const locale of ["en", "es"]) {
      const localized = getEndToEndProjectBySlug(locale, project.slug)
      assert.equal(localized?.slug, project.slug)
      assert.equal(localized.company.name, "ETI")
      assert.equal(localized.engagement, "employee")
      assert.equal(localized.status, "supporting")
      assert.equal(localized.year, expectedProjects[project.slug].year)
      assert.equal(localized.featured, true)
      assert.equal(localized.isExample, false)
      assert.equal(localized.demo, "")
      assert.equal(localized.source, "")
      assert.equal(localized.image, expectedProjects[project.slug].image)
      assert.deepEqual(localized.images, [])
    }
    assert.notEqual(getEndToEndProjectBySlug("en", project.slug).description, getEndToEndProjectBySlug("es", project.slug).description)
    assert.notEqual(getEndToEndProjectBySlug("en", project.slug).technicalNotes, getEndToEndProjectBySlug("es", project.slug).technicalNotes)
  }
})

test("unknown slugs never resolve and unknown locale keys safely fall back", () => {
  for (const slug of ["missing", "__proto__", "constructor", "vercel-ai-sdk", "finflow", "pulse", "atlas-ui"]) {
    assert.equal(getEndToEndProjectBySlug("es", slug), undefined)
  }
  for (const locale of ["unknown", "__proto__", "constructor"]) {
    assert.equal(getProjectsData(locale), getProjectsData("en"))
  }
})

test("detail metadata labels exist for every project's context and status", () => {
  for (const locale of ["en", "es"]) {
    const copy = requireTs(`../messages/${locale}.json`).projects
    for (const project of getProjectsData(locale).endToEnd) {
      if (project.engagement) assert.equal(typeof copy.engagementLabels[project.engagement], "string")
      if (project.status) assert.equal(typeof copy.statusLabels[project.status], "string")
    }
  }
})

test("structured data points at the localized case study instead of its demo", () => {
  for (const locale of ["en", "es"]) {
    for (const project of getProjectsData(locale).endToEnd) {
      const schema = buildProjectSchema(project, locale)
      assert.equal(new URL(schema.url).pathname, `/${locale}/projects/${project.slug}`)
      assert.equal(schema.inLanguage, locale)
      assert.equal(schema.dateCreated, String(project.year))
      assert.equal(schema.codeRepository, undefined)
    }
    for (const entry of buildProjectsItemList({ locale }).itemListElement) {
      assert.match(new URL(entry.item.url).pathname, new RegExp(`^/${locale}/projects/`))
    }
  }
})

test("sitemap excludes examples and includes published projects with language alternates", () => {
  const entries = sitemap()
  for (const locale of ["en", "es"]) {
    for (const project of getProjectsData(locale).endToEnd) {
      const listed = entries.some(({ url }) => new URL(url).pathname === `/${locale}/projects/${project.slug}`)
      assert.equal(listed, !project.isExample)
    }
  }
  const project = getEndToEndProjectBySlug("en", "fleet-control")
  const wasExample = project.isExample
  try {
    project.isExample = true
    assert.ok(!sitemap().some(({ url }) => new URL(url).pathname === "/en/projects/fleet-control"))
    project.isExample = false
    const entry = sitemap().find(({ url }) => new URL(url).pathname === "/en/projects/fleet-control")
    assert.ok(entry)
    assert.equal(new URL(entry.alternates.languages.es).pathname, "/es/projects/fleet-control")
    assert.equal(new URL(entry.alternates.languages["x-default"]).pathname, "/en/projects/fleet-control")
  } finally {
    project.isExample = wasExample
  }
})

test("the responsive contents index only links to supplied sections", () => {
  assert.equal(renderToStaticMarkup(createElement(CaseStudyNavigation, { label: "Contents", sections: [{ id: "overview", title: "Overview" }] })), "")
  const html = renderToStaticMarkup(createElement(CaseStudyNavigation, {
    label: "Contents", sections: [{ id: "overview", title: "Overview" }, { id: "notes", title: "Notes" }],
  }))
  assert.ok(html.includes('href="#overview"'))
  assert.ok(html.includes('href="#notes"'))
  assert.ok(html.includes("<details"))
  assert.ok(!html.includes('href="#gallery"'))
})
