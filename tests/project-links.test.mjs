import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"
import ts from "typescript"

const source = await readFile(new URL("../modules/projects/lib/utils/project-links.ts", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } })
const { getProjectExternalLinks } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`)

test("external links omit missing, relative and unsafe destinations", () => {
  assert.deepEqual(getProjectExternalLinks({ demo: "javascript:alert(1)", source: "/screenshot.png", company: { url: "mailto:test@example.com" } }), [])
  assert.deepEqual(getProjectExternalLinks({}), [])
})

test("the same destination appears only once across project and company links", () => {
  const links = getProjectExternalLinks({ demo: "https://www.example.com/", source: "https://example.com", company: { url: "https://example.com/" } })
  assert.equal(links.length, 1)
  assert.equal(links[0].label, "liveDemo")
})

test("repository and reference destinations have distinct labels", () => {
  assert.equal(getProjectExternalLinks({ source: "https://github.com/team/project" })[0].label, "viewRepository")
  assert.equal(getProjectExternalLinks({ source: "https://example.com/case" })[0].label, "reference")
  assert.equal(getProjectExternalLinks({ source: "https://github.com.example.com/project" })[0].label, "reference")
})

test("distinct live, company and source links retain their order", () => {
  const links = getProjectExternalLinks({ demo: "https://demo.example.com", company: { url: "https://company.example.com" }, source: "https://gitlab.com/team/project" })
  assert.deepEqual(links.map(link => link.label), ["liveDemo", "companyWebsite", "viewRepository"])
})
