# Gemini Visual Redesign Brief

## Online Source Of Truth

- Repository: `https://github.com/sunzhaokai95/fishing-laos-museum`
- Design branch: `gemini/redesign`
- Branch URL: `https://github.com/sunzhaokai95/fishing-laos-museum/tree/gemini/redesign`
- Default branch: `main`

Use the GitHub repository as the only source of truth. Do not request local filesystem paths, local ZIP packages, or `localhost` access.

## Read First

- `README.md`
- `PRODUCT.md`
- `DESIGN.md`
- `src/App.jsx`
- `src/App.css`
- `src/editorial.css`
- `src/index.css`
- `src/halls/`
- `src/components/`
- `src/data/`
- `public/content/data/`
- `design/current/`

The files in `design/current/` are screenshots of the current implementation at 1440x900 and 390x844. Diagnose the real pages shown there before proposing changes.

## Task

Continue redesigning the existing Fishing Museum React project. Improve its visual hierarchy, image strategy, spatial rhythm, hall-specific layouts, interaction feedback, and motion language without changing the approved content structure or data pipeline.

This is an online museum, not a dashboard, SaaS product, game HUD, tackle store, tourism landing page, or article website.

The current version has already moved from dark data panels to a paper-white editorial system, but it still has problems:

- hall openings repeat the same title, summary, number, and line composition;
- authentic images and objects often enter too late in the page;
- large areas of whitespace do not yet create a strong spatial or emotional experience;
- tackle and technique visualizations remain too geometric and abstract;
- people, culture, and ethics still rely heavily on text blocks;
- hall-specific motion and observation patterns need more differentiation;
- the interface needs more of the feeling of water, waiting, fishing-line tension, floating, paper, image development, material, and time.

## Content Contract

The only route is:

`Home -> Prologue -> 01 History -> 02 Fish -> 03 Tackle -> 04 Techniques -> 05 Anglers -> 06 Culture -> 07 Ethics -> Epilogue`

Keep all of the following:

1. Home with one primary museum entrance.
2. Prologue as a short text.
3. A vertical Chinese fishing history timeline with 31 expandable nodes and historical images.
4. 806 fish, 794 images, and 215 families with search, family, water-layer, and diet filters.
5. An in-hall fish detail drawer and progressive loading.
6. A tackle observation and decomposition hall; historical artifacts stay in the history hall.
7. 21 techniques divided strictly into bait, rod, float, and fish techniques, including purpose, conditions, steps, and misreadings.
8. Six angler identity groups.
9. Poetry and painting, fishing language, and superstition specimens.
10. Rule history, five jurisdiction models, catch decisions, fish welfare, abandoned tackle, and environmental observation.
11. Epilogue as a short conclusion.

Do not add multiple routes, visit-duration choices, scores, quizzes, missions, badges, or unlock mechanics. Do not expose research and source-management pages in the frontend.

## Technical Contract

- React 19, React Router, Vite, Lucide React, and plain CSS.
- Preserve current URLs and legacy redirect behavior.
- Preserve `useMuseumData` and the existing data pipeline.
- Never replace real loops with mock data or hardcoded sample cards.
- Preserve search, filters, progressive loading, drawers, previous/next hall navigation, route progress, and the mobile menu.
- Preserve semantic HTML, keyboard focus, Escape-to-close, and `prefers-reduced-motion`.
- Support 1440x900 and 390x844 without horizontal overflow, clipped text, overlapping content, or unstable layout.
- Do not use random external images or substitute Unsplash images for fish and historical records.
- Do not add Gemini, F///R Design, or third-party studio credits.
- Prefer the current dependencies. Explain every new package, its purpose, and why native CSS or React is insufficient.

## Hall-Specific Expectations

- History must remain a long vertical timeline, but image, period, material, event, and expanded interpretation should form a richer hierarchy.
- Fish should feel like an observable specimen field while remaining fast to search and filter.
- Tackle should become an object observation and decomposition space, not a shop or abstract CSS diagram.
- Techniques should use different visual signals for bait, rod, float, and fish actions rather than one repeated animation.
- Anglers should distinguish historical figures, literary images, communities, families, professionals, and contemporary groups.
- Culture should give poetry and painting, language, and superstition three different reading rhythms.
- Ethics should differentiate rule history, regional comparison, and decisions after a catch without looking like a government dashboard.

## Required Delivery

Return the work in this order:

1. A screenshot-grounded diagnosis of the current version.
2. A visual direction covering typography, color, image, material, spatial rhythm, and motion.
3. A different layout and interaction strategy for every hall.
4. A file-by-file change list using real repository paths.
5. Complete React and CSS code using the existing project structure.
6. A dependency statement.
7. A responsive and accessibility checklist.
8. Integration notes for Codex, including application order and likely conflicts.

Do not return a single-file HTML prototype, mock data, pseudo-code, screenshots without implementation, or abbreviated code such as “the rest is unchanged.” If the response is too long, deliver complete files in clearly numbered batches.

