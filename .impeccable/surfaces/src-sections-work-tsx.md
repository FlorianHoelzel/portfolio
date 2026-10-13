---
version: 1
slug: "src-sections-work-tsx"
primary_target: "src/sections/Work.tsx"
related_targets: ["src/components/ProjectShowcase.tsx", "src/features/work/ProjectWorkbench.tsx"]
---

# Portfolio project showcases

Mode: Experience. Extend the existing portfolio for visitors exploring Florian's projects and code. The user approved MONOLITH, TransitRadar, Yoshi Leaderboards, and sumof.best, with both functional explanations and short technical notes. Keep seven smaller repositories in a compact filterable list.

## Direction contract

THESIS: Explore the work in a single interactive workbench: choose a project, inspect its real screenshot or source excerpt, and switch between functional and technical details. Preserve the surrounding portfolio identity.

OWN-WORLD: Inherit charcoal #141414, pale text #e6e6e6, subtle rules #303030, and blue links #b9cdf0. Screenshots bring their own project colors; no invented UI or decorative framing.

STORY: Visitors see TransitRadar's map, learn what MONOLITH connects, inspect Yoshi's prototype, and understand PB history in sumof.best. Every showcase leads directly to its repository or available live site.

FIRST VIEWPORT: The existing introduction leads into a selected-project heading and a project selector beside TransitRadar's preview. Mobile uses a two-column selector above the preview and keeps full-size screenshot inspection.

FORM: User-selected interactive workbench inside the established visual system; no new visual identity tournament applies. A vertical selector controls one large preview and two detail tabs. Project hashes, keyboard navigation, reduced motion, and screenshot inspection remain supported. Seven smaller projects remain below.

FINISH: Browser review confirmed desktop, source, and mobile compositions. Checks passed for four project tabs, both detail views, keyboard navigation, project hash reloads, three screenshot dialogs and focus return, all filters, eight widths, and reduced motion. No material issues remain from that review. DESIGN.md records the workbench; existing shipping rasters retain their provenance.

Evidence: project READMEs and dependencies fetched from public GitHub; public-site screenshots captured October 13, 2026. Yoshi is a static prototype. sumof.best's captured archive is explicitly demo data. MONOLITH has no supplied screenshot and will show its actual device configuration excerpt instead of a fabricated dashboard.
