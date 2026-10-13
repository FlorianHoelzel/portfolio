---
version: 1
slug: "src-sections-work-tsx"
primary_target: "src/sections/Work.tsx"
related_targets: ["src/components/ProjectShowcase.tsx", "src/features/work/ProjectCarousel.tsx"]
---

# Portfolio project showcases

Mode: Experience. Extend the existing portfolio for visitors exploring Florian's projects and code. The user approved MONOLITH, TransitRadar, Yoshi Leaderboards, and sumof.best, with both functional explanations and short technical notes. Keep four smaller repositories in a compact simple list.

## Direction contract

THESIS: Explore the work in a single wide carousel: choose a project, inspect its real screenshot or source excerpt, and switch between functional and technical details. Preserve the surrounding portfolio identity.

OWN-WORLD: Inherit charcoal #141414, pale text #e6e6e6, subtle rules #303030, and blue links #b9cdf0. Screenshots bring their own project colors; no invented UI or decorative framing.

STORY: Visitors see TransitRadar's map, learn what MONOLITH connects, inspect Yoshi's prototype, and understand PB history in sumof.best. Every showcase leads directly to its repository or available live site.

FIRST VIEWPORT: The existing introduction leads into a selected-project heading, previous/next controls, and a wide TransitRadar capture. A compact project picker sits below the slide. Mobile preserves vertical scrolling, horizontal swipes, and full-size screenshot inspection.

FORM: User-selected wide carousel inside the established visual system. A single large stage uses previous/next arrows, a compact picker below, keyboard navigation, and touch swipes. Project hashes, reduced motion, and screenshot inspection remain supported. Four smaller projects remain below.

CORRUPTION: Each navigation corrupts the outgoing capture and repairs into the incoming project. Fresh seeded patterns vary uneven strips, torn patches, and ASCII clusters. Reduced motion switches immediately. Browser checks passed for both phases, repair, repeated random patterns, rapid-input guard, wraparound, picker and keyboard controls, hash reloads, swipes without accidental inspection, detail views, and eight responsive widths.

FINISH: Desktop, randomized corruption, source, and mobile captures were reviewed. Final checks passed for outgoing/incoming phases, automatic repair, fresh corruption seeds, guarded rapid input, wraparound, project picker, keyboard navigation, shared hashes, reduced motion, detail views, screenshot inspection, swipes, and eight widths. No material issues remain from that review. DESIGN.md records the carousel; shipping rasters retain provenance.

Evidence: project READMEs and dependencies fetched from public GitHub; public-site screenshots captured October 13, 2026. Yoshi is a static prototype. sumof.best's captured archive is explicitly demo data. MONOLITH has no supplied screenshot and will show its actual device configuration excerpt instead of a fabricated dashboard.
