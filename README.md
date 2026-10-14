# Florian’s portfolio

A responsive developer portfolio built with React, TypeScript, Vite, and Lucide icons. Four project showcases combine actual screenshots where available with repository introductions, connected project descriptions, and technical descriptions. Smaller repositories appear in a simple list.

## Run locally

Use Node.js 22+ (24 recommended):

```sh
npm install
npm run dev
```

Open the URL printed by Vite. `npm run check` validates TypeScript, `npm run build` produces a static site in `dist/`, and `npm run preview` serves the production build locally.

## File structure

```text
public/                 Static assets such as the favicon
src/
  components/           Reusable navigation, links, and project entries
  data/portfolio.ts     Profile, project descriptions, categories, and links
  data/showcases.ts     Project narratives, data flows, source configuration, and images
  data/project-about.json  Verbatim GitHub About introductions and repository URLs
  data/project-stacks.ts  Audited technology inventories and per-technology roles
  features/hero/        ASCII cloud, name entrance, renderers, and hero styles
  features/work/        Editorial project spotlight, navigation, and styling
  hooks/                Shared browser preference hooks
  sections/             Hero, work, about, and contact sections
  styles/               Design tokens, layouts, and responsive styling
  types/                Shared TypeScript models
  App.tsx               Page composition
  main.tsx              Application entry point
scripts/                Maintenance utilities
```

## Customize

Each featured description starts with the verbatim GitHub About text in src/data/project-about.json. The repository explorer has a sticky selection rail on desktop and a compact sticky picker on mobile. Titles and About intros lead into wide real screenshots, organized Architecture narratives, and a complete technology trace. MONOLITH leads with a labeled repository-backed service-topology diagram. No code excerpts are displayed. Keyboard navigation supports arrows, Home, and End; shared hashes restore the selected project. Selecting from deep in an article brings the next introduction into view.

Technology stacks live in `src/data/project-stacks.ts`. The connected trace groups runtime, integrations, and tooling; hovering, focusing, or tapping a name reveals its role and repository evidence. The audit includes direct package dependencies, browser-loaded libraries, and used platform/deployment tools; transitive packages and every standard-library import are excluded. Optional integrations are labeled in their roles. RoboVac’s `requests` and `cryptography` imports are included even though its requirements file is empty. Source links point to the files checked on October 14, 2026. Update this curated inventory when project dependencies change.

Edit `src/data/portfolio.ts` to change the displayed name, profile, and repository links. Edit `src/data/showcases.ts` to change showcase order, narratives, and image captions. The four selected projects share an editorial spotlight; other projects stay in the compact index. Update the about and contact copy in their section files. `src/styles/global.css` imports shared styling from `base.css`, dialog styling from `projects.css`, and feature styling from `src/features/hero/hero.css` and `src/features/work/carousel.css`.

Use previous/next arrows, the project picker, keyboard controls, or horizontal touch swipes to move through the four editorial spotlights. Oversized project names lead into real screenshots or source excerpts, with repository About introductions, project narratives, and technical descriptions alongside. The carousel wraps at either end. Share a project using its `#project-{slug}` URL. Screenshot inspection keeps Escape, focus return, and mobile scrolling.

The showcase previews respond to mouse movement with fixed pixel cells whose ASCII characters mutate and settle. Project selection decodes the title and reconstructs the screenshot. There is no full-preview ASCII toggle. Touch and reduced-motion users see the original screenshots without cursor effects. CursorPreview.tsx, cursorCorruption.ts, and ScrambleTitle.tsx own these behaviors.

Screenshots are local assets under `public/images/projects/`, with source URLs documented there and provenance embedded in each JPEG. Click a screenshot to inspect it full size; Escape closes the viewer and returns focus. On small screens, the full-size image can be scrolled horizontally. The project websites are not loaded in iframes, so portfolio visitors do not trigger their APIs.

The introduction's magnetic ASCII cloud is a React-managed canvas, with rendering logic in `src/features/hero/cloudRenderer.ts`. Its projected particles roll, tilt toward the cursor, and swirl with a gentle ripple and spring return. Cached glyph sprites support a 60fps target without React rerenders or added dependencies. It pauses offscreen or in hidden tabs, disables both autoplay and pointer motion for reduced-motion users. Mobile gives the cloud its own space above the introduction and leaves touch scrolling intact.

The heading entrance lives in `src/features/hero/HeroEntrance.tsx` and `src/features/hero/nameScramble.ts`. A standalone ASCII scramble resolves into “Florian Hölzel” in 1.6 seconds on every page load, including returning visits. Reduced-motion users see the finished name immediately. Previous local-storage entrance and pause flags are ignored; the cloud hint and pause control are removed.

Yoshi Leaderboards is explicitly presented as a browser-only prototype. Sum of Best's screenshot uses the public demo archive. MONOLITH has no screenshot and presents a labeled service-topology diagram.

The project collection is a curated snapshot of FlorianHoelzel’s public GitHub repositories, retrieved October 13, 2026. The displayed collection excludes vbb-rest, zahlenraten, and LiveSplit.Leaderboard by request; the metadata snapshot may still contain them. The GitHub profile README repository is accessible through the profile link. No personal email address or employment history is assumed.

## Refresh repository metadata

Featured stack traces initially show runtime and integration layers. “More dependencies & tooling” reveals all supporting libraries, type packages, build tools, and deployment entries; the full audited inventory remains available. Compact project stacks retain their existing expanded presentation.

Run `npm run sync:github` to save fresh public metadata in `src/data/github-repositories.json`. This supports pagination and requires no token. Review new descriptions and add projects to `portfolio.ts`; the curated project data stays separate so refreshing does not overwrite your copy or visual choices.

## Deploy

GitHub Pages is deployed by `.github/workflows/pages.yml` on every push to `main`. In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source. The workflow builds and publishes `dist/`, using the Pages base path so scripts, screenshots, and the favicon work at https://florianhoelzel.github.io/portfolio/. You can also run the workflow manually from the Actions tab.

To check the Pages build locally in PowerShell, run `$env:VITE_BASE_PATH = '/portfolio/'; npm run build`, then `npm run preview` and open `/portfolio/`. Remove the environment variable afterward with `Remove-Item Env:VITE_BASE_PATH` to return to the default root path.

Run `npm run build` and upload `dist/` to any static host. The site has no backend, runtime secrets, or client-side API dependency. `.openai/hosting.json` contains the Sites deployment configuration.

Cursor corruption changes characters within fixed cells; it does not sway or jiggle the preview. Reduced motion keeps the character treatment static.
