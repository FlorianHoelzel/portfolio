# Florian’s portfolio

A responsive developer portfolio built with React, TypeScript, Vite, and Lucide icons. Four project showcases combine actual screenshots or source excerpts with functional descriptions and short technical notes. Smaller repositories appear in a simple list.

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
  data/showcases.ts     Showcase copy, technical notes, and screenshot metadata
  features/hero/        ASCII cloud, name entrance, renderers, and hero styles
  features/work/        Interactive project selection and workbench styling
  hooks/                Shared browser preference hooks
  sections/             Hero, work, about, and contact sections
  styles/               Design tokens, layouts, and responsive styling
  types/                Shared TypeScript models
  App.tsx               Page composition
  main.tsx              Application entry point
scripts/                Maintenance utilities
```

## Customize

Edit `src/data/portfolio.ts` to change the displayed name, profile, and repository links. Edit `src/data/showcases.ts` to change showcase order, copy, technical notes, and image captions. The four selected projects share an interactive workbench; other projects stay in the compact index. Update the about and contact copy in their section files. `src/styles/global.css` imports shared styling from `base.css`, dialog styling from `projects.css`, and feature styling from `src/features/hero/hero.css` and `src/features/work/workbench.css`.

Choose a project to switch its preview, then use “What it does” or “How it works” for functional and technical details. Both sets of tabs support keyboard navigation. Share a project using its `#project-{slug}` URL. Screenshot inspection keeps Escape, focus return, and mobile scrolling; reduced motion disables the preview transition.

“Corrupt view” briefly fractures the preview into shifted strips and ASCII fragments, then repairs it automatically. Reduced-motion users get a static ASCII view and a restore action. `src/features/work/CorruptionPlayground.tsx` manages its lifecycle; `corruptPreview.ts` renders the effect from the actual local image or source excerpt. Original content is preserved.

Screenshots are local assets under `public/images/projects/`, with source URLs documented there and provenance embedded in each JPEG. Click a screenshot to inspect it full size; Escape closes the viewer and returns focus. On small screens, the full-size image can be scrolled horizontally. The project websites are not loaded in iframes, so portfolio visitors do not trigger their APIs.

The introduction's magnetic ASCII cloud is a React-managed canvas, with rendering logic in `src/features/hero/cloudRenderer.ts`. Its projected particles roll, tilt toward the cursor, and swirl with a gentle ripple and spring return. Cached glyph sprites support a 60fps target without React rerenders or added dependencies. It pauses offscreen or in hidden tabs, disables both autoplay and pointer motion for reduced-motion users. Mobile gives the cloud its own space above the introduction and leaves touch scrolling intact.

The heading entrance lives in `src/features/hero/HeroEntrance.tsx` and `src/features/hero/nameScramble.ts`. A standalone ASCII scramble resolves into “Florian Hölzel” in 1.6 seconds on every page load, including returning visits. Reduced-motion users see the finished name immediately. Previous local-storage entrance and pause flags are ignored; the cloud hint and pause control are removed.

Yoshi Leaderboards is explicitly presented as a browser-only prototype. Sum of Best's screenshot uses the public demo archive. MONOLITH shows a source excerpt instead of a fabricated dashboard screenshot.

The project collection is a curated snapshot of FlorianHoelzel’s public GitHub repositories, retrieved October 13, 2026. The displayed collection excludes vbb-rest, zahlenraten, and LiveSplit.Leaderboard by request; the metadata snapshot may still contain them. The GitHub profile README repository is accessible through the profile link. No personal email address or employment history is assumed.

## Refresh repository metadata

Run `npm run sync:github` to save fresh public metadata in `src/data/github-repositories.json`. This supports pagination and requires no token. Review new descriptions and add projects to `portfolio.ts`; the curated project data stays separate so refreshing does not overwrite your copy or visual choices.

## Deploy

Run `npm run build` and upload `dist/` to any static host. The site has no backend, runtime secrets, or client-side API dependency. `.openai/hosting.json` contains the Sites deployment configuration.
