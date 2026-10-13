# Florian’s portfolio

A responsive developer portfolio built with React, TypeScript, Vite, and Lucide icons. Neutral charcoal, system typography, and a filterable project index with direct repository and live-site links.

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
  sections/             Hero, work, about, and contact sections
  styles/               Design tokens, layouts, and responsive styling
  types/                Shared TypeScript models
  App.tsx               Page composition
  main.tsx              Application entry point
scripts/                Maintenance utilities
```

## Customize

Edit `src/data/portfolio.ts` to change the profile and add or reorder projects. Featured projects use larger entries in the index. Update the about and contact copy in their section files. Colors, spacing, and typography are defined in `src/styles/global.css`.

The project collection is a curated snapshot of FlorianHoelzel’s public GitHub repositories, retrieved October 13, 2026. All project repositories are included; the GitHub profile README repository is accessible through the profile link. The VBB fork is labeled. No personal email address or employment history is assumed.

## Refresh repository metadata

Run `npm run sync:github` to save fresh public metadata in `src/data/github-repositories.json`. This supports pagination and requires no token. Review new descriptions and add projects to `portfolio.ts`; the curated project data stays separate so refreshing does not overwrite your copy or visual choices.

## Deploy

Run `npm run build` and upload `dist/` to any static host. The site has no backend, runtime secrets, or client-side API dependency. `.openai/hosting.json` contains the Sites deployment configuration.
