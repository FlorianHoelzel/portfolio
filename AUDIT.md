# Portfolio technical audit

Date: October 14, 2026. Scope: current React portfolio, source review, production build, and Codex in-app browser checks against the existing Vite server at `127.0.0.1:5173`.

Implementation integrity verdict: **Pass, with documentation drift.** The interface expresses a coherent, project-specific system: actual project captures, repository-derived architecture, restrained shared typography, and isolated decorative canvas effects. No fabricated testimonials or outcome metrics were found. This is a manual verdict; the bundled detector could not run because its engine was unavailable.

| Dimension | Score | Key finding |
| --- | --- | --- |
| Accessibility | 2/4 | Low-contrast project indices; continuous motion without a page-level stop mechanism |
| Performance | 3/4 | Lean dependencies and bounded animation lifecycles; eager preload of all screenshots |
| Theming | 3/4 | Coherent intentional dark theme; repeated literal palette values bypass tokens |
| Responsive design | 3/4 | Mobile deep links hide project actions; overflow at the 320px minimum |
| Implementation integrity | 3/4 | Product and design records diverge from shipped behavior |
| **Total** | **14/20** | **Good — address weak dimensions** |

Scores are directional audit judgments, not WCAG certification or performance benchmarks. Eight issues: **0 P0, 2 P1, 6 P2, 0 P3**. No interface fixes were made.

## Verified findings

### [P1] Project indices fail normal-text contrast

- Location: `src/styles/base.css:147–150` (`.project-index`); background token at line 3.
- Category: Accessibility.
- Evidence: rendered indices use `rgb(115,115,115)` (`#737373`) on `#141414`. Calculated sRGB contrast is **3.89:1**, below the 4.5:1 threshold for the 11px text. This finding applies to the meaningful project indices; the decorative wordmark slash sharing that color is not counted as a separate text failure.
- Impact: visitors with low vision have difficulty reading the project numbering.
- Standard: WCAG 1.4.3, Contrast (Minimum).
- Recommendation: use the existing `--muted` token or a verified accessible metadata token.
- Suggested command: `$impeccable harden`.

### [P1] Continuous hero motion has no page-level stop mechanism

- Location: `src/features/hero/AsciiCloud.tsx:40–64`; `PRODUCT.md`, Brand Commitments.
- Category: Accessibility.
- Evidence: the visible cloud autoplays continuously while on screen, alongside readable content. Reduced-motion preference gives a still rendering, but visitors using the normal preference have no page control to stop it. Offscreen and hidden-tab suspension do not let visitors stop motion while reading the hero.
- Impact: distracting motion remains active for visitors who need to read without animation but have not enabled an operating-system preference.
- Standard: [WCAG 2.2.2, Pause, Stop, Hide](https://www.w3.org/WAI/WCAG21/Understanding/pause-stop-hide.html), covering nonessential automatic movement lasting more than five seconds alongside other content.
- Recommendation: preserve the owner's explicit removal of the pause control by considering a settling animation that ends within five seconds, with later movement initiated by pointer interaction. Reintroducing a control would change a documented preference and should be a deliberate product decision.
- Suggested command: `$impeccable animate`.

### [P2] Mobile shared project links hide the heading and outbound actions

- Location: `src/features/work/carousel.css:20,74–83`; `src/features/work/ProjectCarousel.tsx:13,27–41`.
- Category: Responsive design.
- Evidence: opening `/#project-yoshi-leaderboards` at an observed 391px viewport positions the article at about **43px**, while the sticky picker covers **0–163px**. The screenshot confirms that the project heading and Visit site/Source code actions are underneath the picker. The article keeps a 24px scroll margin; the mobile 128px override applies to the panel rather than the actual hash target. The corrective effect skips initial selection.
- Impact: a visitor following a shared URL misses the project identity and the fastest route to its code or live site until scrolling upward.
- Standard: functional anchor-navigation correctness; no standalone WCAG failure asserted.
- Recommendation: apply an offset matching the actual sticky picker height to the hash target and handle initial hash navigation, including wrapped picker labels and larger text.
- Suggested command: `$impeccable adapt`.

### [P2] The declared minimum width produces page-level horizontal scrolling

- Location: `src/styles/base.css:27–30` (`body { min-width: 320px; }`).
- Category: Responsive design.
- Evidence: at an observed **320px** viewport with a conventional scrollbar, the root client width is **306px**, but its scroll width is **320px**. A horizontal page scrollbar is visible. At 391px, client and scroll widths both measure 377px, so this is a minimum-width edge case, not general mobile overflow.
- Impact: narrow-screen visitors must pan horizontally despite the site declaring support from 320px.
- Standard: reflow risk; 400% browser zoom was not tested, so this is not a claimed WCAG 1.4.10 conformance result.
- Recommendation: allow the page body to fit the available client width and verify that content remains readable at 320px and equivalent zoomed layouts.
- Suggested command: `$impeccable adapt`.

### [P2] Touch targets are repeatedly smaller than 44px

- Location: `src/styles/base.css:96–100,197–202,297–302,360–371`; `src/features/hero/hero.css:22–29`; `src/features/work/carousel.css:79`.
- Category: Responsive design.
- Evidence: narrow-screen measurements show a **36×36px** menu button, **44×36px** carousel arrows, approximately **15px-high** hero and repository links, and approximately **13px-high** footer links. Stack nodes have a mobile height floor, but short labels can still be narrower than 44px.
- Impact: selecting controls is harder for visitors using thumbs or with reduced motor precision.
- Standard: 44×44px is the skill's touch usability target and the enhanced WCAG target-size criterion. It is **not** the universal AA minimum: [WCAG 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) uses 24px with spacing and other exceptions. An AA failure is not asserted solely from these dimensions.
- Recommendation: enlarge hit areas with padding/minimum dimensions while retaining the existing visual density and sufficient separation.
- Suggested command: `$impeccable adapt`.

### [P2] Screenshot preloads bypass deferred loading

- Location: `src/features/work/ProjectCarousel.tsx:46–49`.
- Category: Performance.
- Evidence: the mount effect creates an `Image` for every showcase capture, regardless of whether the project section is visible. The current three referenced files total **416,108 bytes** before HTTP compression. The active screenshot is also explicitly eager. Only the selected article is mounted, but that does not defer these other image requests.
- Impact: visitors who only read the introduction still fetch all showcase screenshots; slow connections compete with initial-page requests.
- Standard: no measured Core Web Vitals failure asserted.
- Recommendation: start neighbor preloads when the project explorer approaches the viewport, or after initial content has loaded. Retain prompt transitions once browsing begins.
- Suggested command: `$impeccable optimize`.

### [P2] Repeated palette literals bypass the shared system

- Location: `src/styles/base.css:379`; `src/styles/projects.css:8`; `src/features/work/carousel.css:17–18`; `src/features/work/cursorCorruption.ts:71–83`.
- Category: Theming.
- Evidence: page background, inset surfaces, and canvas accent/text colors are repeated as literals even though some match root palette tokens. Several additional supporting grays are locally defined. `DESIGN.md` declares an inset token role, but `base.css` does not define that role as a custom property.
- Impact: palette changes can leave the mobile menu, dialog, picker, or decorative rendering out of sync and make contrast maintenance harder.
- Standard: internal design-system consistency.
- Recommendation: add intentional surface/text-role tokens and share the palette with canvas renderers when they initialize. Keep screenshot content colors and genuinely effect-specific shading independent.
- Suggested command: `$impeccable harden`.

### [P2] Durable context lists capabilities that the implementation does not provide

- Location: `PRODUCT.md`, Capabilities and Constraints / Evidence on Hand; `src/sections/Work.tsx:7–14`; `src/features/work/CursorPreview.tsx:64–68`; `DESIGN.md`, Project showcases.
- Category: Implementation integrity.
- Evidence: PRODUCT.md still lists category filters, but Work renders an unfiltered collection with no category control. It also describes MONOLITH as a source excerpt and mentions a full-preview toggle for touch/keyboard. The implementation and parts of DESIGN.md instead show a service topology and a screenshot-enlargement dialog; CursorPreview contains no full-preview toggle.
- Impact: later maintenance can accidentally restore removed features or evaluate the site against stale requirements.
- Standard: product/context consistency.
- Recommendation: reconcile the records with the approved final behavior. Confirm the status of category filtering before treating it as a missing feature. Do not automatically restore obsolete capabilities.
- Suggested command: `$impeccable document` for implemented design truth; update the product record to reflect confirmed requirements.

## Patterns and positive findings

The recurring gaps are small hit areas on text-first controls, fixed anchor offsets that do not account for sticky navigation, and palette roles duplicated across CSS and canvas code. Documentation drift is separate from visual quality: the underlying interface remains coherent.

Maintain these strengths:

- Keyboard tab selection supports arrows, Home, and End; browser checks confirmed Home/End selection.
- Native screenshot dialogs support Escape and return focus to their opener; both were verified.
- Mobile navigation opens and closes after choosing Work; verified in the browser.
- Decorative canvases are hidden from assistive technology; headings remain real text.
- Reduced-motion logic provides static alternatives instead of a global animation-duration hack.
- Animation lifecycles pause when offscreen or when the tab is hidden; cursor effects stop scheduling frames once settled.
- Screenshots use real local assets, explicit alternatives, and provenance captions. Prototype/demo limitations are labeled.
- System fonts avoid external font downloads, and the dependency list is small.
- The production build passes: JavaScript **282.83kB / 87.95kB gzip**, CSS **19.47kB / 4.57kB gzip**.

## Verification limits

- The first build encountered a sandbox `EPERM` during realpath resolution. The same build passed outside the sandbox; this was an environment restriction, not a source defect.
- The impeccable launcher could not find its engine or create its default cache. Context was read directly, and the bundled detector remained unavailable. No detector findings or detector pass are claimed.
- The new sandboxed server on 5174 timed out in the browser. Checks used the already running 5173 server; its observed content and behavior matched the inspected source.
- Browser checks used the Codex in-app browser at observed desktop and narrow viewport sizes. These are viewport emulations, not physical-device tests. Touch swipes, interrupted gestures, screen-reader output, reduced-motion rendering, 200% text scaling, and 400% zoom were not exercised. Touch code does preserve vertical panning and handles cancellation, but that is source evidence only.
- No Lighthouse, axe, CPU profile, or field performance data was collected. The preload finding is a verified loading policy, not a claim of measured slowness.
- A fixed dark theme is intentional; lack of a light theme is not reported as a defect. Native dialog focus management is not incorrectly reported as missing a custom focus trap. Short targets are not automatically labeled AA violations.

## Recommended actions

1. **[P1] `$impeccable harden`** — correct index contrast; consolidate palette roles in the same focused pass.
2. **[P1] `$impeccable animate`** — resolve continuous autoplay while preserving the documented preference to omit a pause button.
3. **[P2] `$impeccable adapt`** — fix initial project anchors, minimum-width overflow, and touch hit areas together.
4. **[P2] `$impeccable optimize`** — defer screenshot preloads until browsing is likely.
5. **[P2] `$impeccable document`** — reconcile implemented design behavior and flag unresolved product requirements.
6. **`$impeccable polish`** — final bounded verification after the fixes.

You can ask me to run these one at a time, all at once, or in any order you prefer. Re-run `$impeccable audit` after fixes to reassess the score.
