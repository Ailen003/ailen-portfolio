<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Browser and design verification

- For UI, styling, responsive layout, or interaction changes, follow `docs/playwright.md` and verify the affected screens in a real browser before finishing. Read screenshots, not just the accessibility tree. Report any browser verification you could not complete.
- Use the agent's existing Playwright MCP connection and its configured browser. This workflow does not require a Playwright dependency, test suite, or browser download in this repository. Do not add them for design review unless the user explicitly requests them.
- Start `pnpm dev` from this checkout or reuse its running dev server. Use the actual URL printed by Next.js and confirm the page belongs to `ai-portfolio`, not `nairad-portfolio` or another example. Avoid starting two dev servers in the same checkout because they share `.next/dev` and its lock.
- Navigate with MCP, take an accessibility snapshot for locators, interact with observed elements, resize, and take screenshots. Open and visually inspect the screenshots; also inspect console errors and failed network requests.
- Review the affected screens at desktop (1440x900) and mobile (393x851). Check `/en`, `/es`, light/dark themes, menus, dialogs, and keyboard interactions as relevant to the change. Wait for hydration, fonts, and images; scroll through the page before a full-page capture to load deferred content.
- Keep screenshots and MCP logs in the ignored `.playwright-mcp/` directory, with descriptive names. Resolve artifact paths against this checkout's root, even when the agent was launched from a parent workspace. Do not submit the contact form or send chatbot messages as part of layout review.
- Finish by stating the routes, viewports, themes and interactions actually reviewed, plus any remaining visual or console/network issues. If MCP is unavailable, report that browser review could not be completed; do not install project tooling as a substitute.
