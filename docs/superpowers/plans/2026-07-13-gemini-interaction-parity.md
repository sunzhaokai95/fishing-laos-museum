# Gemini Interaction Parity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore Gemini's full interaction and motion depth while keeping the museum's verified content, ten-stop route, data pipeline, responsive behavior, and accessibility contracts.

**Architecture:** Keep each hall as the data-owning composition root. Add focused `experiences/` components for Canvas, SVG, simulator, master-detail, and assessment behavior, plus pure adapters under `lib/` for data calculations. Tests assert user-visible state changes instead of implementation details.

**Tech Stack:** React 19, React Router, Motion, Canvas 2D, SVG, Lucide React, Tailwind CSS 4, Vitest, Testing Library, Playwright.

---

### Task 1: Shared interaction adapters and test harness

**Files:**
- Create: `src/lib/experienceAdapters.js`
- Create: `src/lib/experienceAdapters.test.js`
- Create: `src/test/fixtures.js`

- [ ] Write failing tests for `fishDistributionStats`, `historyEra`, `relativeLoadState`, and `decisionChecklist` using small real-shaped fixtures.
- [ ] Run `pnpm test src/lib/experienceAdapters.test.js` and confirm failures are missing exports.
- [ ] Implement pure functions without DOM or Gemini static data.
- [ ] Re-run the focused test and the full suite.
- [ ] Commit adapter and fixture changes.

Expected public signatures:

```js
export function fishDistributionStats(fish) {}
export function historyEra(item, index) {}
export function relativeLoadState(value) {}
export function decisionChecklist({ jurisdiction, confirmations }) {}
```

### Task 2: Global motion, keyboard navigation, and modal behavior

**Files:**
- Create: `src/hooks/useDialogBehavior.js`
- Create: `src/hooks/useDialogBehavior.test.jsx`
- Modify: `src/components/MuseumChrome.jsx`
- Modify: `src/components/MuseumChrome.test.jsx`
- Modify: `src/components/ObjectDrawer.jsx`

- [ ] Write failing tests for ArrowLeft/ArrowRight navigation, input-focus exclusion, Escape close, body scroll lock, and focus restoration.
- [ ] Confirm focused tests fail because keyboard navigation and shared focus management are absent.
- [ ] Implement route-aware arrow navigation and `useDialogBehavior`.
- [ ] Apply the hook to map, object drawer, and later image viewer components.
- [ ] Run focused and full tests, then commit.

### Task 3: History era filtering and image viewer

**Files:**
- Create: `src/experiences/history/HistoryEraFilter.jsx`
- Create: `src/experiences/history/HistoryImageViewer.jsx`
- Create: `src/experiences/history/HistoryExperience.test.jsx`
- Modify: `src/halls/HistoryHall.jsx`

- [ ] Write failing tests showing era selection reduces visible nodes, all eras restores 31 nodes, image buttons only exist for real images, and Escape closes the viewer.
- [ ] Implement era groups derived from timeline index and period metadata, not Gemini copy.
- [ ] Implement image viewer with Motion entry, scroll lock, Escape, and focus restoration.
- [ ] Preserve inline expansion and viewport entry motion.
- [ ] Run tests and commit.

### Task 4: Fish statistics and Canvas orbit canopy

**Files:**
- Create: `src/experiences/fish/FishStats.jsx`
- Create: `src/experiences/fish/FishOrbitCanopy.jsx`
- Create: `src/experiences/fish/FishOrbitCanopy.test.jsx`
- Modify: `src/halls/FishHall.jsx`
- Modify: `src/museum-shell.css`

- [ ] Write failing tests for real distribution totals, 12-or-fewer orbit specimens, reshuffle, orbit specimen selection, difficulty filter, filter reset, and drawer opening.
- [ ] Implement statistics from all 806 records.
- [ ] Port Gemini's DOM planet plus Canvas connection model with `requestAnimationFrame`, hover pause, automatic single-specimen replacement, and explicit cleanup.
- [ ] Implement a reduced-motion static constellation and a lighter mobile orbit strip.
- [ ] Add difficulty filtering without rendering all 806 cards at once.
- [ ] Run focused tests, full tests, lint, and commit.

### Task 5: Tackle master-detail stress laboratory

**Files:**
- Create: `src/experiences/tackle/TackleStressLab.jsx`
- Create: `src/experiences/tackle/TackleStressLab.test.jsx`
- Modify: `src/halls/TackleHall.jsx`

- [ ] Write failing tests for system selection, record selection, load slider output, SVG path change, and high-load warning.
- [ ] Build system and record selectors from the current curated object and baike records.
- [ ] Port the three-zone Gemini composition: selector, SVG load stage, and readout.
- [ ] Use relative load labels only; do not invent material strength values.
- [ ] Keep the existing details drawer and no-image behavior.
- [ ] Run tests and commit.

### Task 6: Four technique simulators

**Files:**
- Create: `src/experiences/techniques/FloatSignalLab.jsx`
- Create: `src/experiences/techniques/BaitDispersionLab.jsx`
- Create: `src/experiences/techniques/RodAngleLab.jsx`
- Create: `src/experiences/techniques/FishControlLab.jsx`
- Create: `src/experiences/techniques/TechniqueLabs.test.jsx`
- Modify: `src/halls/TechniquesHall.jsx`

- [ ] Write failing tests for four float states, dispersion slider labels, rod-angle risk bands, fish-control start/stop/progress, and automatic simulator selection from technique category.
- [ ] Port Gemini's simulator state machines with current museum terminology.
- [ ] Keep all 21 real techniques in a master-detail index with purpose, conditions, steps, and misread visible.
- [ ] Pause interval animation when stopped or unmounted and provide reduced-motion output.
- [ ] Run tests and commit.

### Task 7: Angler master-detail stage and assessment feedback

**Files:**
- Create: `src/experiences/anglers/AnglerIdentityStage.jsx`
- Create: `src/experiences/anglers/AnglerAssessment.jsx`
- Create: `src/experiences/anglers/AnglerExperience.test.jsx`
- Modify: `src/halls/AnglersHall.jsx`
- Modify: `src/data/anglerInteractives.js`

- [ ] Write failing tests for all six identity groups, master-detail switching, four-question progression, animated result dimensions, reset, folklore disclaimer, draw transition, and redraw.
- [ ] Port Gemini's persona stage without broken or substitute imagery.
- [ ] Add start, question, transition, result, and reset states to the current factual assessment.
- [ ] Add a visible generation phase and result reveal to the folklore draw without predictive claims.
- [ ] Run tests and commit.

### Task 8: Culture-specific reading modes and metaphysics cabinet

**Files:**
- Create: `src/experiences/culture/PoetryFolios.jsx`
- Create: `src/experiences/culture/LanguageIndex.jsx`
- Create: `src/experiences/culture/MetaphysicsCabinet.jsx`
- Create: `src/experiences/culture/CultureExperience.test.jsx`
- Modify: `src/halls/CultureHall.jsx`

- [ ] Write failing tests showing each tab has a distinct structure and selecting a specimen updates the analysis stage.
- [ ] Keep poetry in folio form and language in master-detail index form.
- [ ] Port Gemini's specimen shelf and analysis readout using existing folklore records.
- [ ] Do not render empty image frames or Gemini quotations.
- [ ] Run tests and commit.

### Task 9: Verified catch-decision laboratory and pledge animation

**Files:**
- Create: `src/experiences/ethics/CatchDecisionLab.jsx`
- Create: `src/experiences/ethics/CatchDecisionLab.test.jsx`
- Modify: `src/halls/EthicsHall.jsx`
- Modify: `src/data/ethics.js`

- [ ] Write failing tests for jurisdiction selection, confirmation progress, indeterminate output, manager lookup, action feedback, pledge signature, delayed stamp, and privacy notice.
- [ ] Implement a decision workflow based on location, date, species identification, local rule lookup, fish condition, and disposal choices.
- [ ] Never output a legal/illegal verdict or size threshold unless verified data explicitly supplies one.
- [ ] Port Gemini's staged feedback and stamp impact animation.
- [ ] Run tests and commit.

### Task 10: Prologue, home, and global motion calibration

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Modify: `src/halls/PrologueHall.jsx`
- Modify: `src/halls/EpilogueHall.jsx`
- Modify: `src/museum-shell.css`
- Modify: `src/pages/EntrancePages.test.jsx`

- [ ] Write failing tests for bounded ripple count and synchronized prologue depth readout.
- [ ] Match Gemini's ripple lifetime, orbit transitions, water/surface visual layers, and continuous environmental transition.
- [ ] Preserve one homepage entry, one-paragraph prologue, one-paragraph epilogue, and reduced motion.
- [ ] Run tests and commit.

### Task 11: Responsive and visual parity verification

**Files:**
- Create: `scripts/verify-interaction-parity.mjs`
- Update: `.design/gemini-parity-audit/screenshots/`
- Create: `.design/gemini-parity-audit/FINAL_REVIEW.md`

- [ ] Add Playwright checks for 1440×900, 768×1024, and 390×844 across all ten routes.
- [ ] Check overflow, broken images, console errors, footer overlap, and required interaction states.
- [ ] Capture default and interactive-state screenshots named by route and state.
- [ ] Compare screenshots against the approved Gemini reference while documenting intentional content and mobile corrections.
- [ ] Run `pnpm lint`, `pnpm test`, `pnpm exec vite build`, and the parity script.
- [ ] Commit final verification artifacts and review.
