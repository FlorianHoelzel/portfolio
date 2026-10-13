# Florian’s portfolio

A responsive developer portfolio built with React, TypeScript, Vite, and Lucide icons. Four project showcases combine actual screenshots or source excerpts with functional descriptions and short technical notes. Smaller repositories appear in a filterable index.

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
  sections/             Hero, work, about, and contact sections
  styles/               Design tokens, layouts, and responsive styling
  types/                Shared TypeScript models
  App.tsx               Page composition
  main.tsx              Application entry point
scripts/                Maintenance utilities
```

## Customize

Edit `src/data/portfolio.ts` to change the profile and repository links. Edit `src/data/showcases.ts` to change showcase order, copy, technical notes, and image captions. The four selected projects have dedicated showcases; other projects stay in the compact index. Update the about and contact copy in their section files. Colors, spacing, and typography are defined in `src/styles/global.css`.

Screenshots are local assets under `public/images/projects/`, with source URLs documented there and provenance embedded in each JPEG. Click a screenshot to inspect it full size; Escape closes the viewer and returns focus. On small screens, the full-size image can be scrolled horizontally. The project websites are not loaded in iframes, so portfolio visitors do not trigger their APIs.

Yoshi Leaderboards is explicitly presented as a browser-only prototype. Sum of Best's screenshot uses the public demo archive. MONOLITH shows a source excerpt instead of a fabricated dashboard screenshot.

The project collection is a curated snapshot of FlorianHoelzel’s public GitHub repositories, retrieved October 13, 2026. All project repositories are included; the GitHub profile README repository is accessible through the profile link. The VBB fork is labeled. No personal email address or employment history is assumed.

## Refresh repository metadata

Run `npm run sync:github` to save fresh public metadata in `src/data/github-repositories.json`. This supports pagination and requires no token. Review new descriptions and add projects to `portfolio.ts`; the curated project data stays separate so refreshing does not overwrite your copy or visual choices.

## Deploy

Run `npm run build` and upload `dist/` to any static host. The site has no backend, runtime secrets, or client-side API dependency. `.openai/hosting.json` contains the Sites deployment configuration.
