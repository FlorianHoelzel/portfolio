# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is people exploring Florian's projects and code. They visit to understand what a project does, browse its source, and try a live site when one exists. This audience was confirmed by Florian during initialization.

Recruiting and client acquisition are not established product goals.

## Product Purpose

Florian's personal developer portfolio brings his public GitHub projects together in one website. It should help visitors find a relevant project and reach its repository or live site quickly.

## Operating Context

Visitors browse a single-page website on desktop or mobile. Projects come from the public GitHub account `FlorianHoelzel`, covering connected homes, public transport, and speedrunning, alongside smaller tools and experiments.

Florian maintains the site in a local IDE. The existing implementation uses React, TypeScript, Vite, CSS, and Lucide icons. Content lives in `src/data/portfolio.ts`; UI code is separated into reusable components and page sections. Maintaining a good file structure and an approachable development workflow is an explicit user requirement.

The application builds to static files in `dist/`. Local development uses `npm run dev` (or `npm.cmd run dev` in PowerShell). The existing Sites publication is private; do not assume authorization to change its audience.

## Capabilities and Constraints

- Showcase MONOLITH, TransitRadar, Yoshi Leaderboards, and sumof.best with functional explanations and short technical notes; the user explicitly selected these four projects.
- Show the remaining public project repositories in a compact filterable index.
- Filter projects by category: Web & data, Smart home, and Other.
- Link directly to repositories and to live sites when a real URL is available.
- Provide a short introduction, about information, and GitHub contact link.
- Preserve mobile navigation, keyboard access, visible focus, and reduced-motion support present in the implementation.
- Keep profile and project content editable separately from presentation code.
- Repository metadata is a curated snapshot, not a live feed. `scripts/sync-github.mjs` refreshes `src/data/github-repositories.json`; displayed content is reviewed and maintained separately.
- Distinguish forks from original projects. The profile README repository is represented by the GitHub profile link rather than a project entry.

## Brand Commitments

The owner is Florian; the current site identifies him as Florian Hoelzel and links to `https://github.com/FlorianHoelzel`.

Florian explicitly rejected the initial site as looking like "AI slop." Future work should avoid generic promotional slogans, invented product previews, and unsupported personal claims. Use concrete, straightforward language tied to the actual projects. The existing visual implementation is evidence for refinement; initialization does not authorize a redesign or establish a new visual world.

Florian subsequently approved the showcase structure and requested a playful, developer-driven treatment with a moving ASCII cloud implemented in React. He then selected the magnetic-cloud direction: visible rolling motion, cursor-driven tilt, and characters that scatter and spring back. Preserve the approved project structure while adding character. The ASCII cloud is decorative, with pause controls and a still reduced-motion view.

## Evidence on Hand

- `src/data/portfolio.ts`: curated project descriptions, categories, languages, repository links, and available live-site links.
- `src/data/showcases.ts`: approved showcase projects, factual descriptions, technical notes, and image captions.
- `public/images/projects/`: actual public-site captures of TransitRadar, Yoshi Leaderboards, and sumof.best, captured October 13, 2026; source URLs and evidence limitations are recorded alongside the assets.
- `src/data/github-repositories.json`: public GitHub metadata snapshot retrieved October 13, 2026.
- `src/sections/`: current introduction, project collection, about, and contact copy.
- `README.md`: local setup, source organization, content maintenance, and static deployment instructions.

No personal email address, employment history, client list, testimonials, or outcome metrics have been provided. MONOLITH has no supplied screenshot and shows an actual repository source excerpt. Yoshi is a browser-only prototype with static imported records; the sumof.best capture uses its publicly labeled demo data. Do not present invented interface illustrations as evidence of a project's actual UI.

## Product Principles

1. Help visitors understand a project and get to its code or live site.
2. Ground descriptions and personal claims in supplied or verified facts.
3. Preserve the project's identity and distinguish original work from forks.
4. Keep content updates simple and maintain a clear source structure.

## Open Decisions

No additional audience, recruiting goal, personal contact channel, or public hosting requirement has been confirmed. Resolve these only when needed for a requested change.
