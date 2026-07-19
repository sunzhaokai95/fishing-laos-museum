# Fullscreen Collection Theatre Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the complete fishing museum as a fullscreen collection theatre while preserving every approved content record, route and interaction.

**Architecture:** Introduce a small shared stage grammar for edge chrome, layered objects and scene transitions, then give each hall a dedicated composition. Existing data adapters and domain interactions remain the source of truth; React components change presentation without duplicating data.

**Tech Stack:** React 19, React Router, Motion, Three.js, Lucide React, Vite, plain CSS, Vitest, Playwright.

---

### Task 1: Lock the new stage contracts in tests

**Files:**
- Modify: `src/pages/EntrancePages.test.jsx`
- Modify: `src/halls/HallPalette.test.jsx`
- Create: `src/components/CollectionStage.test.jsx`

- [ ] Write failing tests requiring one homepage carousel, four layered objects, one formal route entry, keyboard navigation and hall-specific stage roles.
- [ ] Run `pnpm test src/pages/EntrancePages.test.jsx src/halls/HallPalette.test.jsx src/components/CollectionStage.test.jsx` and confirm failures identify missing theatre structures.
- [ ] Keep all existing content-contract assertions for fish counts, timeline nodes, techniques and interactions.

### Task 2: Build the shared collection-stage grammar

**Files:**
- Create: `src/components/CollectionStage.jsx`
- Create: `src/components/EdgeLabel.jsx`
- Create: `src/components/StageArrows.jsx`
- Create: `src/hooks/useStageCarousel.js`
- Create: `src/collection-theatre.css`
- Modify: `src/App.jsx`

- [ ] Implement `useStageCarousel(length, duration)` with animation locking, wrapping indices and ArrowLeft/ArrowRight keyboard support.
- [ ] Implement `CollectionStage` with grain layer, giant background label, centered object layer and edge content slots.
- [ ] Add reduced-motion behavior that removes blur and animated travel while preserving state changes.
- [ ] Import the theatre stylesheet last so the new system replaces prior presentation without deleting data styles prematurely.
- [ ] Run focused tests and commit the shared grammar.

### Task 3: Rebuild the homepage from zero

**Files:**
- Modify: `src/pages/HomePage.jsx`
- Replace: `src/components/MuseumHeroScene.jsx`
- Modify: `src/immersive.css`
- Test: `src/pages/EntrancePages.test.jsx`

- [ ] Add a failing test asserting four real museum objects, previous/next controls, synchronized title changes and one `开始参观` link.
- [ ] Build a four-object carousel from approved local fish, tackle, history and culture imagery; omit any object without a real asset.
- [ ] Use giant Chinese background characters and per-object solid colors; move scale, blur, opacity and horizontal position together over 650ms.
- [ ] Retain a subtle Three.js water/refraction plane behind objects and pointer parallax on desktop.
- [ ] Verify at `1440×900` and `390×844`, then commit.

### Task 4: Replace global museum chrome

**Files:**
- Modify: `src/components/MuseumChrome.jsx`
- Modify: `src/components/MuseumHeader.jsx`
- Modify: `src/components/RouteProgress.jsx`
- Modify: `src/components/RoutePager.jsx`
- Modify: `src/museum-shell.css`
- Test: `src/components/MuseumChrome.test.jsx`
- Test: `src/components/RouteProgress.test.jsx`

- [ ] Add failing tests for minimal top edge chrome, linear full-screen route menu and persistent previous/next controls.
- [ ] Remove dashboard-like header blocks and present route progress as an edge index.
- [ ] Keep old-link compatibility and every route destination unchanged.
- [ ] Test keyboard focus, menu close and mobile layout, then commit.

### Task 5: Rebuild the prologue and history hall

**Files:**
- Modify: `src/halls/PrologueHall.jsx`
- Modify: `src/halls/HistoryHall.jsx`
- Modify: `src/experiences/history/HistoryEraFilter.jsx`
- Modify: `src/experiences/history/HistoryImageViewer.jsx`
- Create: `src/history-theatre.css`
- Test: `src/halls/HistoryHall.test.jsx`

- [ ] Add failing tests for the waterline scene and all 31 timeline records in a vertical theatre.
- [ ] Make depth change the waterline, copy position, float, line and fish silhouette continuously.
- [ ] Recompose timeline nodes as near-viewport scenes with giant periods, central images when available and edge captions.
- [ ] Preserve expansion, filtering and image viewing; verify no historical object appears in the tackle hall.
- [ ] Run focused tests and commit.

### Task 6: Rebuild the 806-fish specimen theatre

**Files:**
- Modify: `src/halls/FishHall.jsx`
- Modify: `src/experiences/fish/FishOrbitCanopy.jsx`
- Modify: `src/experiences/fish/FishStats.jsx`
- Modify: `src/components/ObjectDrawer.jsx`
- Create: `src/fish-theatre.css`
- Test: `src/halls/FishHall.test.jsx`

- [ ] Add failing tests requiring all fish to remain searchable/filterable and image-less fish to omit media containers.
- [ ] Build a representative fish stage with center/left/right/back roles and synchronized water-layer text.
- [ ] Replace ecommerce cards with image-led specimen plates and a compact text index while retaining pagination and five-level difficulty.
- [ ] Keep search, family, layer, diet, difficulty, reset and drawer behavior unchanged.
- [ ] Test 806 records, 215 families, image loading and mobile overflow, then commit.

### Task 7: Rebuild tackle and technique theatres

**Files:**
- Modify: `src/halls/TackleHall.jsx`
- Modify: `src/experiences/tackle/TackleStressLab.jsx`
- Modify: `src/halls/TechniquesHall.jsx`
- Modify: `src/experiences/techniques/BaitDispersionLab.jsx`
- Modify: `src/experiences/techniques/RodAngleLab.jsx`
- Modify: `src/experiences/techniques/FloatSignalLab.jsx`
- Modify: `src/experiences/techniques/FishControlLab.jsx`
- Create: `src/tackle-technique-theatre.css`
- Test: `src/halls/TackleHall.test.jsx`
- Test: `src/halls/TechniquesHall.test.jsx`

- [ ] Add failing tests for complete object records, eight systems, four modes and 21 techniques.
- [ ] Turn tackle into a central rotating workbench with the stress path integrated into the floor control.
- [ ] Turn each technique mode into a distinct full-screen simulator with a vertical record rail.
- [ ] Display purpose, conditions, steps and misread text in full, with no truncation.
- [ ] Run focused tests and commit.

### Task 8: Rebuild people and culture theatres

**Files:**
- Modify: `src/halls/AnglersHall.jsx`
- Modify: `src/experiences/anglers/AnglerIdentityStage.jsx`
- Modify: `src/experiences/anglers/AnglerAssessment.jsx`
- Modify: `src/experiences/anglers/WaterFortuneDraw.jsx`
- Modify: `src/halls/CultureHall.jsx`
- Modify: `src/experiences/culture/PoetryFolios.jsx`
- Modify: `src/experiences/culture/LanguageIndex.jsx`
- Modify: `src/experiences/culture/MetaphysicsCabinet.jsx`
- Create: `src/people-culture-theatre.css`
- Test: `src/halls/AnglersHall.test.jsx`
- Test: `src/halls/CultureHall.test.jsx`

- [ ] Add failing tests for six identity groups, assessment, fortune draw and all three culture views.
- [ ] Build layered portrait rows; use typographic portraits when images are absent.
- [ ] Separate identities from reflective interactions as two full-screen acts.
- [ ] Give works, language and belief independent page-turn, ticker and drawer motion.
- [ ] Run focused tests and commit.

### Task 9: Rebuild ethics and epilogue theatres

**Files:**
- Modify: `src/halls/EthicsHall.jsx`
- Modify: `src/experiences/ethics/CatchDecisionLab.jsx`
- Modify: `src/experiences/ethics/WatersidePledge.jsx`
- Modify: `src/halls/EpilogueHall.jsx`
- Create: `src/ethics-epilogue-theatre.css`
- Test: `src/halls/EthicsHall.test.jsx`
- Test: `src/pages/EntrancePages.test.jsx`

- [ ] Add failing tests for rule history, five management models, four consequence fields, decision state and pledge state.
- [ ] Build the evidence runway and central comparison stage.
- [ ] Place the pledge after the full judgment sequence without rewards or unlocking.
- [ ] Rebuild the epilogue as a quiet single-screen water surface with the approved full text.
- [ ] Run focused tests and commit.

### Task 10: Remove old visual rules and verify production

**Files:**
- Modify: `src/App.css`
- Modify: `src/editorial.css`
- Modify: `src/museum-redesign.css`
- Modify: `scripts/verify-interaction-parity.mjs`
- Modify: `scripts/verify-motion-effects.mjs`

- [ ] Delete or neutralize selectors that recreate old title banners, SaaS cards and generic grids.
- [ ] Extend automated interaction checks to each new stage transition and reduced-motion behavior.
- [ ] Run `pnpm test`, `pnpm lint`, `pnpm verify:effects`, `pnpm verify:parity` and `pnpm build`.
- [ ] Inspect screenshots at `1440×900`, `768×1024` and `390×844`; reject horizontal overflow, clipping, overlaps and blank canvases.
- [ ] Deploy atomically, probe all ten routes, test the public homepage and at least one high-density hall, then push `main`.
