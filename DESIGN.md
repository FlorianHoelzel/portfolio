---
name: Florian Hoelzel portfolio
description: The implemented visual system for Florian's project portfolio.
colors:
  accent: "#b9cdf0"
  background: "#141414"
  text: "#e6e6e6"
  muted: "#a0a0a0"
  line: "#303030"
  inset: "#1c1c1c"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(42px, 6vw, 66px)"
    fontWeight: 550
    lineHeight: 1.15
    letterSpacing: "-.035em"
  headline:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "28px"
    fontWeight: 550
    letterSpacing: "-.025em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 550
    letterSpacing: "-.025em"
  story:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "14px"
    lineHeight: 1.8
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "12px"
  mono:
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
    fontSize: "10px"
rounded:
  square: "0px"
spacing:
  small: "14px"
  standard: "20px"
  text: "22px"
  media: "28px"
  mobile-section: "36px"
components:
  image-expand:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.square}"
    padding: "10px 13px"
  source-panel:
    backgroundColor: "{colors.inset}"
    rounded: "{rounded.square}"
    padding: "22px 25px"
  screenshot-dialog:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.square}"
    padding: "0"
    width: "min(1500px, calc(100% - 48px))"
---

# Design System: Florian Hoelzel portfolio

## Overview

**Creative North Star: "Existing portfolio"**

This document records the code-defined portfolio after the project showcase extension. The existing charcoal palette, system typography, text links, and horizontal rules remain its visual authority. The owner rejected generic promotional language and invented project previews; project imagery represents actual captures and retains the project's own colors.

The interface places project names, descriptions, technical notes, and repository links alongside screenshots or source excerpts. Larger showcases and compact rows share the same typography and neutral surfaces. This record does not establish a new visual identity.

**Key Characteristics:**
- Charcoal background, pale text, muted supporting text, and blue links.
- System typography with monospace metadata and source code.
- Horizontal rules and spacing separate content without card shadows.
- Actual screenshots can be inspected in a modal dialog.

## Colors

The root custom properties in `src/styles/base.css` own the palette; their values are recorded in the frontmatter.

### Primary
- **Blue accent:** repository and live-site links, visible keyboard focus, and text selection.

### Neutral
- **Charcoal background:** the page, screenshot controls, and dialog.
- **Pale text:** headings and primary text.
- **Muted text:** captions, technical explanations, metadata, and navigation.
- **Divider:** section and project boundaries; also the screenshot control's hover background.
- **Inset surface:** source excerpts and the expanded mobile menu.

The incumbent implementation contains additional gray text values for individual roles. Screenshot colors and the source excerpt's green text are local content treatments, not additional brand accents.

**The Root Palette Rule.** Reuse the existing root colors for portfolio chrome; preserve screenshot colors as captured.

## Typography

**Display and Body Font:** the existing platform system stack.
**Metadata Font:** SFMono-Regular, Consolas, Liberation Mono, monospace. Source excerpts omit Liberation Mono; the wordmark uses Consolas.

### Hierarchy
- **Display:** the owner name uses the frontmatter display role; at the narrowest breakpoint it becomes (40px).
- **Headline:** showcase names use the headline role; on mobile they become (25px).
- **Title:** section headings use the title role. Compact project names also use (18px), with weight (500) and tighter letter spacing (-.04em).
- **Story:** functional showcase headlines use the story role and become (22px) on mobile.
- **Body:** showcase summaries use the body role and become (13px) on mobile. About copy uses (14px) with line height (1.85); compact project copy uses (13px) with line height (1.75).
- **Label:** navigation, links, and captions range from (10px) to (13px). Project indices, compact tags, and counts use monospace; showcase tags use the body family.

The display font is an explicitly preserved incumbent choice for this extension. It is not a recommendation to introduce system display typography into unrelated new visual identities.

## Layout

The final page container is centered, capped at (1120px), with (40px) side clearance on desktop. At (700px) and below it uses (20px) side clearance. The body supports widths from (320px).

The selected projects use a repository explorer. A 190px repository rail sits beside the selected article with a 36px gap; it becomes 170px with a 28px gap below 1100px. The rail is sticky and includes language metadata, selection status, arrows, and four named project tabs. Below 900px it becomes a sticky compact picker above the article, using two columns below 600px. The selected article starts with its title (up to 68px), source/live actions, and exact About introduction. A wide real screenshot leads into System topology, a unified project story, and Stack sections. The story has one functional heading followed by purpose and implementation paragraphs in 1.2fr / 1fr columns with a 36px gap; below 600px the paragraphs stack with a 20px gap. Mobile source and visual reading order agree.

Compact project rows use columns (37px / 1fr / 130px) and gaps (20px). Mobile rows use (24px / 1fr), place links below the content, and keep descriptive text and tags together. About and contact sections switch from two columns to one at (700px).

Navigation changes to a menu toggle at (480px). Screenshot dialogs use viewport-constrained dimensions; on mobile the image remains (1100px) wide within a scrollable inspection area.

## Elevation & Depth

The implementation uses no box shadows. Depth comes from background differences, horizontal dividers, and a dark modal backdrop. Source excerpts use the inset surface; screenshot frames use a near-black background. The screenshot dialog has a thin gray border and a translucent black backdrop.

The dialog enters over (0.2s) with opacity and an (8px) vertical translation only when reduced motion is not requested. Reduced motion also disables smooth scrolling. These behaviors are recorded in the sidecar.

## Shapes

Showcase media, source panels, dialog frames, and project rows have square corners. Dividers and dialog outlines are thin (1px) lines. Filters are text buttons with no filled pill shape; tags are plain inline metadata.

## Components

### ASCII cloud

The introduction includes a decorative React canvas cloud made from projected ASCII particles on a merged three-dimensional surface. It is the page's single continuous motion accent; the project content remains still. Blue-to-pale shading communicates depth, and a horizontal mask keeps its denser characters away from the desktop introduction. On mobile the cloud occupies a dedicated region above the name so it stays visible without covering the copy.

The magnetic treatment uses rolling lobes, a brief settling entrance, eased cursor-driven tilt, and a gentle local swirl and ripple with damped spring return. A Gaussian falloff keeps the hovered region populated instead of pushing particles out into an empty circle. Glyph sprites are cached rather than rasterized each frame; rendering targets 60 frames per second, caps backing resolution at 1.5×, and stops when offscreen or when the tab is hidden. Pointer tracking belongs to the hero, allowing normal links and text selection. Touch input does not capture gestures or require hover. Reduced-motion users receive a still composition without autoplay, pointer motion, or a motion toggle. The decorative canvas is hidden from assistive technology. The cursor hint and pause control are removed.

Its implementation lives in `src/features/hero/AsciiCloud.tsx` and `src/features/hero/cloudRenderer.ts`. Preserve the approved portfolio layout when extending this treatment.

### Name entrance

The hero heading reads “Florian Hölzel.” On every visit, a (1.6s) jumble of ASCII symbols scrambles locally in the heading, settles into its letter positions, and locks into the name in a staggered order. Small stray symbols dissipate as it settles. The final lettering crossfades into the real selectable heading. This effect is visually independent of the cloud and uses the heading's actual font metrics and bounding box. The real heading remains in the accessibility tree throughout, and other content remains usable.

`HeroEntrance.tsx` owns the temporary decorative canvas and its lifecycle; `nameScramble.ts` owns glyph scrambling and letter targets. `useReducedMotion.ts` shares the reduced-motion preference between both effects. The entrance pauses offscreen and in hidden tabs. It removes its canvas and restores full heading opacity when complete. The sequence replays on every page load, including returning visitors. Prior local-storage flags are ignored. Reduced-motion visitors see the finished heading immediately.

### Links and navigation
Links retain the body family and use inline SVG icons where appropriate. Primary project links use the accent; hover changes them to primary text and, for showcase links, adds an underline. The shared keyboard treatment is a (2px) accent outline offset by (5px). Mobile navigation opens as a full-width inset panel under the header.

### Project tags
Compact project tags are monospace text separated by centered dots. Showcase tags are unboxed text with wrapping gaps.

### Project rows
Rows use an index, title, descriptive copy, tags, and repository or live-site links. Horizontal rules establish their boundaries. There is no enclosing filled card, rounded shell, or elevation shadow.

### Project showcases
`src/features/work/ProjectCarousel.tsx` owns project selection; `ProjectShowcase.tsx` renders the selected preview and details, with feature styles in `carousel.css`. Navigation supports previous/next arrows, a roving-focus project picker, Left/Right, Home/End, and horizontal touch swipes. Swipes preserve vertical scrolling and do not open screenshot inspection accidentally. Navigation wraps between the first and last projects. Selection updates `#project-{slug}` without jumping the viewport, and shared project hashes restore the selected view.

One project occupies the explorer at a time. No code excerpts are displayed. All four featured projects use screenshots, screenshot inspection, and cursor corruption. MONOLITH shows its complete main overview with only the two names in the upper-right presence panel redacted; device controls, presence states, and the activity feed remain visible. Every featured project includes a compact System topology section between its screenshot and project story. It preserves the original MONOLITH treatment: three icon-led layers, module or runtime labels, concise implementation details, and one summary. Layers stack below 600px. Content lives in src/data/project-topologies.ts and uses the shared ServiceTopology component. No subtitles appear beneath project screenshots. Provenance stays in metadata and the asset README. Screenshot viewers have no header bar; a close button overlays the image. The separator below each screenshot is removed. Its About introduction and project story remain factual. Project story content lives in src/data/project-stories.ts. The accepted story design replaces the Architecture label, separate narrative subheadings, and small pipeline with one heading and coherent purpose / implementation copy. Selecting another repository while reading deep in an article returns the new introduction into view without scrolling on initial selection.

Each technology trace is one native disclosure, collapsed by default for both featured and compact projects. Its summary shows Stack trace, the complete technology count, and a chevron. Opening it reveals every layer, including runtime, integrations, dependencies, build tools, and deployment, plus the role inspector. Every audited item retains role inspection by hover, focus, or tap and a repository evidence link. Closing the disclosure clears hidden inspection state. Feature styling lives in `stack-trace.css`; inventory data lives in `src/data/project-stacks.ts`.

Only the active project is mounted. Local showcase captures are preloaded for prompt project changes. No embedded project sites, new packages, polling, autorotation, or continuous showcase animation are added.

Project selection decodes the oversized name from ASCII over (700ms) and reconstructs the actual preview through character cells over about (750ms). Reconstruction follows the navigation direction. Cursor movement creates a dense damaged-data core on a roughly (10px × 13px) character grid, surrounded by uneven rectangular islands, inverted cells, and broken rows. Symbols mutate at staggered (10–14Hz) rates while their positions and inverted patches stay fixed. Cells repair at different thresholds, clearing the trail within about (870ms). Reduced motion freezes the symbol choices. There is no empty cursor hole or whole-frame random tearing. Original screenshot/source content remains untouched under the decorative canvas. Carousel navigation remains interruptible, with no blocked controls.

`CursorPreview.tsx` owns canvas sizing, image readiness, pointer input, and frame lifecycle; `cursorCorruption.ts` snapshots the actual local image once per size and renders the cell treatment. `ScrambleTitle.tsx` handles the bounded title decode while preserving the real name for accessibility. All live in `src/features/work/`. Rendering stops when idle, offscreen, or in a hidden tab. The full-preview toggle is removed. Reduced motion disables cursor motion and reconstruction; touch receives the unchanged screenshot. Resize refreshes the snapshot. DPR is capped at 1.5x. The hero ASCII effects remain independent. No dependencies or sound are added.

### Screenshot inspection
A native dialog opens from the image button. It supplies an accessible name, focuses the close control, supports Escape and backdrop dismissal, and returns focus through native dialog behavior. Page scrolling is locked while a dialog is open. The mobile inspection image scrolls within the dialog rather than shrinking all detail to the viewport.

## Do's and Don'ts

### Do:
- **Do** preserve the root palette and the incumbent type stack for extensions to this portfolio.
- **Do** use actual captures or identifiable source excerpts as project evidence.
- **Do** preserve visible keyboard focus, native dialog behavior, and reduced-motion support.
- **Do** use separators and spacing to group project content.

### Don't:
- **Don't** invent project interfaces, promotional claims, or a replacement identity without authorization.
- **Don't** add rounded tag pills or shadowed cards to these established text and media patterns.
- **Don't** promote screenshot colors or local code highlighting into portfolio-wide accent tokens.

Styles are organized into shared base styling, project showcase styling, and hero feature styling. Obsolete eyebrow, topic, and hidden category rules and overridden container/header/hero definitions have been removed. The incumbent system display font is preserved by the approved scope.

The cursor-corruption cells remain at fixed coordinates. Glyph substitution updates at staggered rates of 8-11 changes per second while energized, then resolves back to the sampled character as the trail fades. Pixel blocks no longer sway or oscillate. Reduced-motion output uses a fixed substitution frame.
