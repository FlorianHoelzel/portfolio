---
target: main project showcase and descriptions
total_score: 16
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\Student\\Desktop\\Eigene Projekte\\portfolio\\src\\components\\ProjectShowcase.tsx"
target_fingerprint: "sha256:d25c0f77a93d3c1a904df034dad89cfa739fd6cba79ea96bda0a0c8e4d9098b9"
target_path: "C:\\Users\\Student\\Desktop\\Eigene Projekte\\portfolio\\src\\components\\ProjectShowcase.tsx"
timestamp: 2026-10-14T16-46-08Z
slug: src-components-projectshowcase-tsx
closed: true
---
Method: dual-agent (A: /root/showcase_design_review · B: /root/showcase_evidence_review)

The showcase feels specific to Florian's work: real screenshots, repository code, exact About introductions, and restrained ASCII interaction. Its main problem is hierarchy. Each project grows into a technical article before the visitor reaches the named choices for the next project.

## Design health: 16/24

Health scores run from 0 (poor) to 4 (excellent).

| Heuristic | Score | Main finding |
|---|---:|---|
| System status | 3 | Selection, count, and active states are clear. |
| Match with audience | 3 | Technical language fits developers. |
| Control and freedom | 3 | Preview and screenshot controls are reversible. |
| Consistency | 3 | Mobile visual and keyboard order diverge. |
| Error prevention | n/a | No submission or destructive workflow. |
| Recognition | 2 | Named project choices appear too late. |
| Efficiency | n/a | Excluded for this portfolio surface. |
| Minimalist design | 2 | Repetition and full inventories stretch the reading path. |
| Error recovery | n/a | No recovery workflow assessed. |
| Help/documentation | n/a | Excluded for this portfolio surface. |

## Strengths

The About text establishes purpose. The narratives connect real implementation steps, particularly TransitRadar's aggregation pipeline and sumof.best's PB reconstruction. Prototype/demo boundaries are honest, and steady-state description text has strong measured contrast.

## Priority issues

1. P1 — Named navigation is buried. The picker follows showcase stages 1,219–1,437px tall on desktop and 2,126–2,706px on mobile. Move the four named tabs beside the initial arrows/count. Suggested command: impeccable layout. Source: src/features/work/ProjectCarousel.tsx, carousel-picker after carousel-stage.
2. P2 — Descriptions are coherent but difficult to scan. Two uninterrupted paragraphs combine architecture, algorithms, and scope. Add short headings such as City adapters and Departure pipeline; distinguish prototype limitations. Keep exact About introductions and technical detail. Suggested command: impeccable clarify. Sources: src/components/ProjectShowcase.tsx showcase-story; src/data/showcases.ts narrative arrays.
3. P2 — MONOLITH repeats the same evidence. Its main preview and implementation section show the identical washer object. Present that code once with its explanation, or use a different verified excerpt for the second insight. Suggested command: impeccable distill. Sources: src/data/showcases.ts MONOLITH source/implementation; src/components/ImplementationNote.tsx.
4. P2 — Stack inventories need a secondary level. MONOLITH's 41 technologies occupy about 840px mobile; sumof.best's 35 occupy about 803px. Keep every entry available, but emphasize runtime/integrations and disclose supporting build/deployment tools. Suggested command: impeccable layout. Sources: src/components/StackTrace.tsx; src/data/project-stacks.ts.
5. P2 — Mobile keyboard order contradicts the layout. The stack appears after the description visually, but remains before it in the DOM. Keyboard navigation reaches technology buttons before implementation controls. Align source and visual order. Suggested command: impeccable adapt. Sources: src/components/ProjectShowcase.tsx; src/features/work/carousel.css mobile grid-row rules.

## Cognitive load and emotional journey

Moderate load: three checklist failures (chunking, choice density, progressive disclosure). Initial artifact/title combination is the peak; the long route to the next named project is the valley. Four project tabs and three-step flows are appropriate. Preserve all audited technology entries; change hierarchy rather than coverage.

## Persona red flags

Jordan: prototype scope appears late in dense technical prose.
Casey: interrupted mobile browsing requires several screens of scrolling to choose the next project by name.
Riley: MONOLITH duplicates evidence; optional stack entries require inspection to learn their optional status.

## Minor observations

Some stack labels and provenance text are 10px. Stack trace suggests an execution trace rather than a technology map. Browser Back does not retrace carousel selections. Mobile code overflow is contained and keyboard-scrollable.

## Detector and browser synthesis

Primary component CLI: zero findings. Supporting styles: 26 advisories (17 design-system-font-size, 9 design-system-color), all in carousel.css and stack-trace.css. Palette findings include prose-documented gray/code-green treatments; type findings indicate documentation drift rather than proof of illegibility. Browser inspection found six stable undersized-text findings in the active TransitRadar showcase. No steady-state description contrast failure or page-level horizontal overflow. Narrative contrast 9.08:1; intro 14.76:1; code 10.86:1. Page-wide overlay findings include off-target compact-project text and transient title-animation false positives. No currently visible user overlay.

## Questions to consider

- Can the opening view let visitors choose among the four projects before committing to a technical article?
- What additional insight should MONOLITH's second evidence block contribute?
- Can a complete technology inventory read as explorable architecture rather than a long manifest?
