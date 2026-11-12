import assert from "node:assert/strict"
import fs from "node:fs"
import vm from "node:vm"
import { test } from "node:test"
import ts from "typescript"

const source = fs.readFileSync(new URL("../modules/projects/components/project-scroll-to-top.tsx", import.meta.url), "utf8")
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } })

// Isolate the browser side effects; the lifecycle invokes the real component effect.
function mount({ hash = "", reducedMotion = false, mainPresent = true } = {}) {
  let effect
  let scheduled
  const events = []
  const sandbox = {
    exports: {},
    require: (name) => {
      assert.equal(name, "react")
      return { useEffect: (callback) => { effect = callback } }
    },
    window: {
      location: { hash },
      requestAnimationFrame: (callback) => { scheduled = callback; return 1 },
      cancelAnimationFrame: () => { scheduled = undefined },
      matchMedia: () => ({ matches: reducedMotion }),
      scrollTo: (options) => events.push({ type: "scroll", ...options }),
    },
    document: {
      getElementById: (id) => {
        assert.equal(id, "main-content")
        return mainPresent ? { focus: (options) => events.push({ type: "focus", ...options }) } : null
      },
    },
  }
  vm.runInNewContext(outputText, sandbox)
  assert.equal(sandbox.exports.ProjectScrollToTop({ projectKey: "es/perfumes-del-puro" }), null)
  const cleanup = effect()
  return {
    events,
    cleanup,
    commitFrame: () => { const callback = scheduled; scheduled = undefined; callback?.() },
    readEvents: () => JSON.parse(JSON.stringify(events)),
  }
}

test("project entry focuses without scrolling, then requests a smooth scroll to the very top", () => {
  const page = mount()
  assert.deepEqual(page.events, [])
  page.commitFrame()
  assert.deepEqual(page.readEvents(), [
    { type: "focus", preventScroll: true },
    { type: "scroll", top: 0, left: 0, behavior: "smooth" },
  ])
})

test("direct section links retain their hash destination", () => {
  const page = mount({ hash: "#project-technical" })
  page.commitFrame()
  assert.deepEqual(page.events, [])
})

test("reduced-motion preference requests an instant scroll instead of animation", () => {
  const page = mount({ reducedMotion: true })
  page.commitFrame()
  assert.deepEqual(page.readEvents()[1], { type: "scroll", top: 0, left: 0, behavior: "instant" })
})

test("leaving before the destination frame cancels the pending scroll", () => {
  const page = mount()
  page.cleanup()
  page.commitFrame()
  assert.deepEqual(page.events, [])
})

test("scrolling still works if the focus target is unavailable", () => {
  const page = mount({ mainPresent: false })
  page.commitFrame()
  assert.deepEqual(page.readEvents(), [{ type: "scroll", top: 0, left: 0, behavior: "smooth" }])
})
