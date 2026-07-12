# Shared UI And Styles Context

> Generated from the current repository. Treat every file path and implementation below as real project context. Do not replace data flows with mock data.

## File: src/index.css

````css
:root {
  --bg: oklch(1 0 0);
  --surface: oklch(0.965 0.006 210);
  --ink: oklch(0.19 0.025 230);
  --muted: oklch(0.47 0.025 225);
  --primary: oklch(0.72 0.15 80);
  --primary-dark: oklch(0.52 0.13 76);
  --accent: oklch(0.55 0.1 205);
  --line: oklch(0.82 0.012 220);
  --night: oklch(0.1 0.025 230);
  --danger: oklch(0.49 0.16 32);
  --display: 'Songti SC', STSong, 'SimSun', serif;
  --sans: 'Hiragino Sans GB', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: var(--ink);
  background: var(--bg);
  font-family: var(--sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
  background: var(--bg);
}

button,
input,
textarea,
select {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
}

img {
  display: block;
  max-width: 100%;
}

:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 4px;
}

::selection {
  color: var(--night);
  background: oklch(0.86 0.12 82);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
````

## File: src/App.css

````css
#root {
  min-height: 100vh;
}

.museum-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  padding: 0 4vw;
  color: var(--ink);
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.museum-header.is-overlay {
  position: absolute;
  inset: 0 0 auto;
  color: white;
  background: oklch(0.08 0.02 230 / 0.34);
  border-color: oklch(1 0 0 / 0.24);
  backdrop-filter: blur(12px);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  font-family: var(--display);
  font-size: 22px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  color: var(--night);
  background: var(--primary);
  border: 1px solid oklch(0.84 0.12 80);
  border-radius: 50%;
}

.museum-header nav {
  display: flex;
  align-items: center;
  gap: 36px;
}

.museum-header nav a {
  position: relative;
  padding: 24px 0 20px;
  color: inherit;
  font-size: 14px;
  text-decoration: none;
}

.museum-header nav a::after {
  position: absolute;
  right: 0;
  bottom: 14px;
  left: 0;
  height: 2px;
  content: '';
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease-out;
}

.museum-header nav a:hover::after,
.museum-header nav a.active::after {
  transform: scaleX(1);
}

.menu-button {
  display: none;
  width: 44px;
  height: 44px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  place-items: center;
}

.home-hero {
  position: relative;
  min-height: 88svh;
  overflow: hidden;
  color: white;
  background-color: var(--night);
  background-image: url('/content/assets/placeholders/water-section-concept.webp');
  background-position: center;
  background-size: cover;
}

.home-hero::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  content: '';
  background: oklch(0.05 0.015 230 / 0.24);
  pointer-events: none;
}

.home-hero::before {
  position: absolute;
  z-index: 1;
  top: 20%;
  right: -5%;
  width: 72%;
  height: 1px;
  content: '';
  background: oklch(0.84 0.13 80 / 0.78);
  transform: rotate(12deg);
  transform-origin: right;
  animation: line-drift 7s ease-in-out infinite alternate;
}

@keyframes line-drift {
  from { transform: rotate(11deg) translateY(-2px); }
  to { transform: rotate(13deg) translateY(5px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 760px;
  min-height: 88svh;
  padding: 22vh 6vw 10vh;
  justify-content: center;
}

.hero-content h1 {
  max-width: 7em;
  margin: 0 0 30px;
  font-family: var(--display);
  font-size: 72px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0;
  text-wrap: balance;
  text-shadow: 0 2px 24px oklch(0.05 0.01 230 / 0.62);
}

.hero-copy {
  max-width: 620px;
  padding: 18px 0 4px;
  border-top: 1px solid oklch(1 0 0 / 0.34);
}

.hero-copy p {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 1.85;
  text-wrap: pretty;
  text-shadow: 0 1px 12px oklch(0.04 0.01 230 / 0.82);
}

.primary-entry {
  display: inline-flex;
  align-items: center;
  gap: 42px;
  min-height: 52px;
  margin-top: 30px;
  color: var(--primary);
  font-family: var(--display);
  font-size: 25px;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 2px solid currentColor;
  transition: gap 200ms ease-out, color 200ms ease-out;
}

.primary-entry:hover {
  gap: 58px;
  color: oklch(0.84 0.13 80);
}

.scroll-cue {
  position: absolute;
  z-index: 2;
  right: 5vw;
  bottom: 36px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-size: 13px;
  text-decoration: none;
  writing-mode: vertical-rl;
}

.route-overview,
.featured-collection {
  padding: 96px 6vw;
}

.section-heading {
  display: grid;
  grid-template-columns: minmax(300px, 0.9fr) minmax(320px, 1.1fr);
  gap: 7vw;
  align-items: start;
  max-width: 1360px;
  margin: 0 auto 70px;
}

.section-heading h2 {
  margin: 0;
  font-family: var(--display);
  font-size: 42px;
  line-height: 1.28;
  letter-spacing: 0;
}

.section-heading p {
  max-width: 62ch;
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.9;
}

.section-heading.compact {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 36px;
}

.section-heading.compact a {
  color: var(--primary-dark);
  text-underline-offset: 6px;
}

.gallery-list {
  max-width: 1360px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--ink);
}

.gallery-list li {
  border-bottom: 1px solid var(--line);
}

.gallery-list a {
  display: grid;
  grid-template-columns: 72px minmax(220px, 0.7fr) minmax(320px, 1.3fr) 32px;
  gap: 22px;
  align-items: center;
  min-height: 112px;
  color: var(--ink);
  text-decoration: none;
  transition: color 180ms ease-out, padding 180ms ease-out;
}

.gallery-list a:hover {
  padding: 0 16px;
  color: var(--primary-dark);
}

.gallery-list a > span {
  color: var(--primary-dark);
  font-size: 14px;
}

.gallery-list strong {
  font-family: var(--display);
  font-size: 25px;
}

.gallery-list p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.featured-collection {
  background: var(--surface);
}

.featured-grid,
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1360px;
  margin: 0 auto;
}

.collection-card {
  position: relative;
  display: grid;
  grid-template-columns: 104px 1fr 24px;
  gap: 18px;
  align-items: center;
  min-height: 136px;
  padding: 16px;
  color: var(--ink);
  text-decoration: none;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 4px;
  transition: border-color 180ms ease-out, transform 180ms ease-out;
}

.collection-card:hover {
  border-color: var(--primary-dark);
  transform: translateY(-3px);
}

.collection-image {
  display: grid;
  width: 104px;
  height: 104px;
  overflow: hidden;
  color: var(--muted);
  background: var(--surface);
  place-items: center;
}

.collection-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.collection-card h2,
.collection-card h3 {
  margin: 0 0 8px;
  font-family: var(--display);
  font-size: 22px;
  letter-spacing: 0;
}

.collection-card p {
  margin: 0;
  overflow-wrap: anywhere;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}

.route-progress {
  position: sticky;
  z-index: 15;
  top: 0;
  overflow-x: auto;
  color: var(--ink);
  background: oklch(1 0 0 / 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(12px);
  scrollbar-width: none;
}

.route-progress ol {
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, minmax(76px, 1fr));
  width: min(100%, 980px);
  min-width: 760px;
  min-height: 64px;
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.route-progress ol::before {
  position: absolute;
  top: 23px;
  right: 5.5%;
  left: 5.5%;
  height: 1px;
  content: '';
  background: var(--line);
}

.route-progress a {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 17px 8px 8px;
  color: var(--muted);
  font-size: 12px;
  text-decoration: none;
}

.route-dot {
  z-index: 1;
  width: 10px;
  height: 10px;
  background: var(--bg);
  border: 2px solid var(--muted);
  border-radius: 50%;
}

.route-progress .is-current a {
  color: var(--ink);
  font-weight: 700;
}

.route-progress .is-current .route-dot {
  width: 16px;
  height: 16px;
  margin-top: -3px;
  background: var(--primary);
  border: 3px solid var(--bg);
  box-shadow: 0 0 0 1px var(--primary-dark);
}

.gallery-banner {
  position: relative;
  display: flex;
  min-height: 360px;
  align-items: end;
  overflow: hidden;
  color: white;
  background-color: var(--night);
  background-image: url('/content/assets/placeholders/water-section-concept.webp');
  background-position: center 46%;
  background-size: cover;
}

.gallery-banner::after {
  position: absolute;
  inset: 0;
  content: '';
  background: oklch(0.05 0.02 230 / 0.34);
}

.banner-copy {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 58px 6vw 46px;
}

.banner-copy > span {
  display: block;
  margin-bottom: 14px;
  color: var(--primary);
  font-size: 14px;
}

.banner-copy h1 {
  margin: 0 0 16px;
  font-family: var(--display);
  font-size: 58px;
  line-height: 1.15;
  letter-spacing: 0;
  text-wrap: balance;
}

.banner-copy p {
  max-width: 56ch;
  margin: 0;
  font-size: 16px;
  line-height: 1.8;
  text-wrap: pretty;
}

.reading-layout {
  display: grid;
  grid-template-columns: minmax(0, 760px) minmax(280px, 360px);
  gap: 8vw;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 76px 6vw 96px;
}

.prose {
  max-width: 72ch;
  color: var(--ink);
  font-size: 17px;
  line-height: 1.95;
}

.prose > h1:first-child {
  display: none;
}

.prose h2 {
  margin: 64px 0 20px;
  font-family: var(--display);
  font-size: 30px;
  line-height: 1.4;
  letter-spacing: 0;
  text-wrap: balance;
}

.prose h3 {
  margin: 42px 0 16px;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: 0;
}

.prose p {
  margin: 0 0 24px;
  text-wrap: pretty;
}

.prose ul,
.prose ol {
  margin: 0 0 28px;
  padding-left: 1.4em;
}

.prose li {
  margin: 8px 0;
}

.prose blockquote {
  margin: 38px 0;
  padding: 22px 24px;
  color: var(--ink);
  background: var(--surface);
  border: 1px solid var(--line);
}

.prose img {
  width: 100%;
  max-height: 560px;
  margin: 36px 0 14px;
  object-fit: contain;
  background: var(--surface);
}

.prose strong {
  font-weight: 700;
}

.evidence-rail {
  padding-left: 30px;
  border-left: 1px solid var(--line);
}

.evidence-rail section {
  margin-top: 38px;
}

.evidence-rail h2,
.detail-sources h2 {
  margin: 0 0 18px;
  font-size: 14px;
}

.preview-notice {
  display: flex;
  gap: 12px;
  padding-bottom: 22px;
  color: var(--danger);
  border-bottom: 1px solid var(--line);
}

.preview-notice div {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.preview-notice span,
.evidence-rail figcaption span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.evidence-rail figure {
  margin: 0 0 30px;
}

.evidence-rail figure img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: var(--surface);
}

.evidence-rail figcaption {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 12px 0;
  border-bottom: 1px solid var(--line);
}

.evidence-rail figcaption strong {
  font-size: 13px;
  line-height: 1.6;
}

.missing-visual,
.missing-object-image {
  display: grid;
  min-height: 180px;
  padding: 30px;
  color: var(--muted);
  background: var(--surface);
  place-items: center;
  text-align: center;
}

.missing-visual p,
.missing-object-image p {
  max-width: 22ch;
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.7;
}

.source-list ol {
  margin: 0;
  padding: 0;
  list-style: none;
}

.source-list li {
  display: grid;
  grid-template-columns: 66px 1fr;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
}

.source-list a {
  color: var(--primary-dark);
  font-size: 12px;
}

.source-list span {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.55;
}

.route-pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 150px;
  border-top: 1px solid var(--line);
}

.pager-item {
  display: flex;
  gap: 24px;
  align-items: center;
  min-width: 0;
  padding: 34px 6vw;
  color: var(--ink);
  text-decoration: none;
  transition: background 180ms ease-out;
}

.pager-item:hover {
  background: var(--surface);
}

.pager-item.next {
  justify-content: flex-end;
  text-align: right;
  border-left: 1px solid var(--line);
}

.pager-item span {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}

.pager-item small {
  color: var(--muted);
}

.pager-item strong {
  overflow: hidden;
  font-family: var(--display);
  font-size: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.collection-header,
.sources-page main > header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  max-width: 1360px;
  margin: 0 auto;
  padding: 72px 6vw 42px;
}

.collection-header h1,
.sources-page h1 {
  margin: 0 0 14px;
  font-family: var(--display);
  font-size: 52px;
  letter-spacing: 0;
}

.collection-header p,
.sources-page header p {
  max-width: 56ch;
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
}

.collection-header > strong {
  color: var(--primary-dark);
  font-size: 14px;
}

.collection-tabs {
  display: flex;
  gap: 34px;
  max-width: 1360px;
  margin: 0 auto 34px;
  padding: 0 6vw 16px;
  overflow-x: auto;
  border-bottom: 1px solid var(--line);
}

.collection-tabs a {
  color: var(--muted);
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.collection-tabs a.active {
  color: var(--ink);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: var(--primary);
  text-decoration-thickness: 2px;
  text-underline-offset: 18px;
}

.collection-grid {
  padding: 0 6vw 96px;
}

.collection-detail {
  max-width: 1360px;
  margin: 0 auto;
  padding: 54px 6vw 100px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 56px;
  color: var(--muted);
  font-size: 14px;
  text-decoration: none;
}

.collection-detail > header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 36px;
  padding-bottom: 34px;
  border-bottom: 1px solid var(--ink);
}

.collection-detail header span {
  color: var(--primary-dark);
  font-size: 13px;
}

.collection-detail h1 {
  margin: 12px 0;
  font-family: var(--display);
  font-size: 56px;
  letter-spacing: 0;
}

.collection-detail header p {
  margin: 0;
  color: var(--muted);
  font-style: italic;
}

.status-line {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--danger);
  font-size: 13px;
}

.collection-detail-layout {
  display: grid;
  grid-template-columns: minmax(280px, 420px) minmax(0, 720px);
  gap: 8vw;
  justify-content: center;
  padding-top: 58px;
}

.collection-object-view {
  min-width: 0;
}

.collection-object-view figure {
  margin: 0;
}

.collection-object-view figure img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: var(--surface);
}

.collection-object-view figcaption {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 0;
  color: var(--muted);
  font-size: 12px;
  border-bottom: 1px solid var(--line);
}

.detail-sources {
  margin-top: 42px;
}

.detail-sources a {
  display: grid;
  grid-template-columns: 68px 1fr;
  gap: 12px;
  padding: 12px 0;
  color: var(--ink);
  font-size: 12px;
  text-decoration: none;
  border-top: 1px solid var(--line);
}

.detail-sources strong {
  color: var(--primary-dark);
}

.sources-page main,
.source-register {
  max-width: 1360px;
  margin: 0 auto;
}

.source-register {
  padding: 0 6vw 100px;
  border-top: 1px solid var(--ink);
}

.source-register article {
  display: grid;
  grid-template-columns: minmax(150px, 0.4fr) minmax(300px, 1.4fr) minmax(150px, 0.5fr);
  gap: 30px;
  align-items: start;
  padding: 26px 0;
  border-bottom: 1px solid var(--line);
}

.source-register article > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;
}

.source-register h2 {
  margin: 0;
  font-size: 16px;
  line-height: 1.6;
}

.source-register article > a,
.source-register article > span {
  color: var(--primary-dark);
  font-size: 12px;
}

.load-state,
.not-found main {
  display: grid;
  min-height: 70vh;
  padding: 40px;
  place-content: center;
  text-align: center;
}

.load-state h1,
.not-found h1 {
  margin: 0 0 14px;
  font-family: var(--display);
  font-size: 40px;
  letter-spacing: 0;
}

.load-state p,
.not-found p {
  color: var(--muted);
}

.load-state button,
.not-found a {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
  padding: 0 22px;
  color: white;
  background: var(--primary-dark);
  border: 0;
  border-radius: 3px;
  text-decoration: none;
}

.loading-line {
  display: block;
  width: 180px;
  height: 2px;
  overflow: hidden;
  background: var(--line);
}

.loading-line::after {
  display: block;
  width: 45%;
  height: 100%;
  content: '';
  background: var(--primary);
  animation: loading 1.4s ease-in-out infinite alternate;
}

@keyframes loading {
  from { transform: translateX(0); }
  to { transform: translateX(120%); }
}

@media (max-width: 1024px) {
  .hero-content h1 { font-size: 58px; }
  .banner-copy h1 { font-size: 46px; }
  .reading-layout { grid-template-columns: minmax(0, 1fr) 290px; gap: 5vw; }
  .gallery-list a { grid-template-columns: 54px minmax(190px, 0.75fr) minmax(260px, 1.25fr) 28px; }
  .collection-detail-layout { gap: 5vw; }
}

@media (max-width: 767px) {
  .museum-header {
    min-height: 62px;
    padding: 0 20px;
  }

  .brand { font-size: 18px; }
  .brand-mark { width: 34px; height: 34px; }
  .menu-button { display: grid; }

  .museum-header nav {
    position: absolute;
    top: 62px;
    right: 0;
    left: 0;
    display: none;
    flex-direction: column;
    gap: 0;
    align-items: stretch;
    padding: 8px 20px 18px;
    color: var(--ink);
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }

  .museum-header nav.is-open { display: flex; }
  .museum-header nav a { padding: 14px 0; }
  .museum-header nav a::after { bottom: 8px; }

  .home-hero,
  .hero-content { min-height: 86svh; }
  .home-hero { background-position: 58% center; }
  .home-hero::before { top: 28%; width: 105%; right: -30%; }
  .hero-content { padding: 18vh 24px 80px; justify-content: flex-end; }
  .hero-content h1 { max-width: 6em; margin-bottom: 20px; font-size: 46px; }
  .hero-copy { padding-top: 14px; }
  .hero-copy p { font-size: 15px; line-height: 1.75; }
  .primary-entry { gap: 26px; margin-top: 20px; font-size: 22px; }
  .scroll-cue { display: none; }

  .route-overview,
  .featured-collection { padding: 64px 20px; }
  .section-heading { display: block; margin-bottom: 42px; }
  .section-heading h2 { font-size: 34px; }
  .section-heading p { margin-top: 18px; }
  .section-heading.compact { display: flex; align-items: center; }
  .section-heading.compact h2 { font-size: 30px; }

  .gallery-list a {
    grid-template-columns: 42px minmax(0, 1fr) 24px;
    gap: 12px;
    min-height: 96px;
  }
  .gallery-list p { display: none; }
  .gallery-list strong { font-size: 20px; }
  .gallery-list a:hover { padding: 0; }

  .featured-grid,
  .collection-grid { grid-template-columns: 1fr; }
  .collection-card { grid-template-columns: 86px 1fr 22px; min-height: 116px; }
  .collection-image { width: 86px; height: 86px; }

  .route-progress { top: 0; }
  .route-progress ol { margin: 0; }
  .gallery-banner { min-height: 310px; background-position: center; }
  .banner-copy { padding: 54px 24px 32px; }
  .banner-copy h1 { font-size: 42px; }
  .banner-copy p { font-size: 14px; }

  .reading-layout { display: block; padding: 54px 24px 72px; }
  .prose { font-size: 16px; line-height: 1.9; }
  .prose h2 { margin-top: 52px; font-size: 26px; }
  .prose h3 { font-size: 19px; }
  .evidence-rail { margin-top: 64px; padding: 30px 0 0; border-top: 1px solid var(--ink); border-left: 0; }

  .route-pager { min-height: 132px; }
  .pager-item { gap: 10px; padding: 26px 18px; }
  .pager-item strong { font-size: 16px; white-space: normal; }
  .pager-item svg { width: 20px; flex: 0 0 auto; }

  .collection-header,
  .sources-page main > header { display: block; padding: 54px 20px 30px; }
  .collection-header h1,
  .sources-page h1 { font-size: 42px; }
  .collection-header > strong { display: block; margin-top: 24px; }
  .collection-tabs { gap: 26px; padding: 0 20px 16px; }
  .collection-grid { padding: 0 20px 72px; }

  .collection-detail { padding: 38px 20px 72px; }
  .back-link { margin-bottom: 40px; }
  .collection-detail > header { display: block; }
  .collection-detail h1 { font-size: 44px; }
  .status-line { margin-top: 24px; }
  .collection-detail-layout { display: flex; flex-direction: column; padding-top: 40px; }
  .collection-object-view { order: 0; }
  .collection-detail-layout > article { order: 1; }

  .source-register { padding: 0 20px 72px; }
  .source-register article { grid-template-columns: 88px 1fr; gap: 18px; }
  .source-register article > a,
  .source-register article > span { grid-column: 2; }
}

/* Exhibition scenes */
.exhibition-scene { min-height: 72vh; }
.scene-intro {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px 8vw;
  align-items: end;
  padding: 84px 6vw 70px;
  color: white;
  background: var(--night);
}
.scene-intro > span { grid-column: 1; color: var(--primary); font-size: 13px; font-weight: 700; }
.scene-intro h1 { grid-column: 1; margin: 0; font-family: var(--display); font-size: 58px; line-height: 1.15; letter-spacing: 0; }
.scene-intro > p { grid-column: 1; max-width: 700px; margin: 0; color: oklch(0.86 0.01 220); font-size: 16px; line-height: 1.8; }
.scene-stat, .scene-stats { grid-row: 1 / span 3; grid-column: 2; display: flex; gap: 34px; align-items: flex-end; }
.scene-stat, .scene-stats > div { display: flex; flex-direction: column; min-width: 110px; padding-left: 18px; border-left: 1px solid oklch(0.72 0.15 80 / .65); }
.scene-stat strong, .scene-stats strong { font-family: var(--display); font-size: 42px; line-height: 1; }
.scene-stat span, .scene-stats span { margin-top: 8px; color: oklch(0.77 0.02 220); font-size: 12px; }

.prologue-scene, .epilogue-scene {
  display: grid;
  min-height: calc(100svh - 128px);
  padding: 80px 8vw;
  color: white;
  background-color: var(--night);
  background-image: url('/content/assets/placeholders/water-section-concept.webp');
  background-position: center;
  background-size: cover;
  place-items: center start;
}
.prologue-scene::before, .epilogue-scene::before { position: absolute; inset: 0; content: ''; pointer-events: none; }
.prologue-copy, .epilogue-scene > div { max-width: 720px; padding: 42px 0; }
.prologue-copy > span, .epilogue-scene span { color: var(--primary); font-size: 13px; font-weight: 700; }
.prologue-copy h1, .epilogue-scene h1 { margin: 10px 0 28px; font-family: var(--display); font-size: 64px; letter-spacing: 0; }
.prologue-copy p, .epilogue-scene p { max-width: 650px; margin: 0 0 18px; font-size: 18px; line-height: 2; text-shadow: 0 2px 14px var(--night); }
.prologue-copy > svg { margin-top: 28px; color: var(--primary); }
.epilogue-scene a { display: inline-flex; align-items: center; gap: 10px; margin-top: 24px; padding-bottom: 8px; color: var(--primary); text-decoration: none; border-bottom: 1px solid currentColor; }

.history-intro { background: oklch(0.18 0.035 225); }
.timeline-section { position: relative; max-width: 1120px; margin: 0 auto; padding: 90px 6vw 120px; }
.timeline-spine { position: absolute; top: 0; bottom: 0; left: calc(6vw + 84px); width: 1px; background: var(--primary); }
.timeline-event { position: relative; display: grid; grid-template-columns: 84px minmax(0, 1fr); }
.timeline-index { position: relative; z-index: 1; width: 42px; height: 42px; margin-top: 34px; color: var(--night); background: var(--primary); border: 8px solid var(--bg); border-radius: 50%; font-size: 10px; line-height: 26px; text-align: center; }
.timeline-event > button { position: relative; display: grid; width: 100%; grid-template-columns: minmax(130px, .35fr) minmax(220px, .65fr) 28px; gap: 10px 28px; align-items: start; padding: 34px 0; color: var(--ink); text-align: left; background: transparent; border: 0; border-bottom: 1px solid var(--line); cursor: pointer; }
.timeline-period { grid-row: 1 / span 2; color: var(--primary-dark); font-size: 13px; line-height: 1.6; }
.timeline-event h2 { margin: 0; font-family: var(--display); font-size: 28px; letter-spacing: 0; }
.timeline-event button p { grid-column: 2; margin: 0; color: var(--muted); line-height: 1.7; }
.timeline-event button svg { grid-column: 3; grid-row: 1 / span 2; transition: transform 180ms ease-out; }
.timeline-event.is-open button svg { transform: rotate(180deg); }
.timeline-detail { grid-column: 2; padding: 26px 0 46px; border-bottom: 1px solid var(--ink); }
.timeline-detail figure { display: grid; grid-template-columns: minmax(220px, 420px) 1fr; gap: 18px; align-items: end; margin: 0 0 28px; }
.timeline-detail figure img { width: 100%; max-height: 320px; object-fit: contain; background: var(--surface); }
.timeline-detail figcaption { color: var(--muted); font-size: 12px; }
.timeline-detail dl { display: flex; gap: 34px; margin: 0 0 22px; }
.timeline-detail dl div { display: flex; gap: 8px; }
.timeline-detail dt { color: var(--muted); }
.timeline-detail dd { margin: 0; color: var(--primary-dark); }
.timeline-detail > p { max-width: 780px; margin: 0; font-size: 17px; line-height: 2; }
.timeline-detail small { display: block; margin-top: 18px; color: var(--muted); }

.fish-intro { background: oklch(0.17 0.055 210); }
.fish-observatory { padding: 54px 6vw 110px; background: var(--surface); }
.fish-controls { display: grid; grid-template-columns: minmax(260px, 1.5fr) repeat(3, minmax(150px, .5fr)); gap: 12px; max-width: 1380px; margin: 0 auto; }
.fish-controls label { display: flex; min-height: 52px; align-items: center; gap: 10px; padding: 0 14px; color: var(--muted); background: var(--bg); border: 1px solid var(--line); }
.fish-controls label span { flex: 0 0 auto; font-size: 12px; }
.fish-controls input, .fish-controls select { width: 100%; min-width: 0; color: var(--ink); background: transparent; border: 0; outline: 0; }
.result-line { display: flex; max-width: 1380px; align-items: center; gap: 10px; margin: 28px auto 18px; color: var(--muted); font-size: 13px; }
.fish-specimen-grid { display: grid; max-width: 1380px; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; margin: 0 auto; background: var(--line); border: 1px solid var(--line); }
.fish-specimen { min-width: 0; padding: 0; color: var(--ink); text-align: left; background: var(--bg); border: 0; cursor: pointer; }
.specimen-image { display: grid; aspect-ratio: 4 / 3; overflow: hidden; background: oklch(0.95 0.012 205); place-items: center; }
.specimen-image img { width: 100%; height: 100%; object-fit: contain; transition: transform 220ms ease-out; }
.fish-specimen:hover img { transform: scale(1.04); }
.specimen-image span { color: var(--muted); font-size: 12px; }
.fish-specimen > div:last-child { min-height: 126px; padding: 18px; }
.fish-specimen small { color: var(--primary-dark); }
.fish-specimen h2 { margin: 7px 0 4px; font-family: var(--display); font-size: 24px; letter-spacing: 0; }
.fish-specimen p { min-height: 20px; margin: 0; overflow: hidden; color: var(--muted); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.load-more { display: flex; min-height: 52px; align-items: center; justify-content: center; gap: 10px; margin: 34px auto 0; padding: 0 28px; color: var(--ink); background: transparent; border: 1px solid var(--ink); cursor: pointer; }

.drawer-layer { position: fixed; z-index: 100; inset: 0; display: flex; justify-content: flex-end; background: oklch(0.08 0.02 230 / .58); }
.object-drawer { position: relative; width: min(620px, 94vw); height: 100%; overflow-y: auto; padding: 64px 48px 70px; background: var(--bg); box-shadow: -20px 0 50px oklch(0.05 0.01 230 / .2); }
.drawer-close { position: absolute; top: 18px; right: 18px; display: grid; width: 44px; height: 44px; padding: 0; background: transparent; border: 1px solid var(--line); place-items: center; cursor: pointer; }
.drawer-object-image { margin: 0 0 28px; background: var(--surface); }
.drawer-object-image img, .object-detail > img { width: 100%; max-height: 360px; object-fit: contain; background: var(--surface); }
.fish-detail > span, .object-detail > span, .culture-detail > span { color: var(--primary-dark); font-size: 12px; }
.fish-detail h2, .object-detail h2, .culture-detail h2 { margin: 7px 0; font-family: var(--display); font-size: 42px; letter-spacing: 0; }
.scientific-name { margin: 0 0 26px; color: var(--muted); }
.drawer-lead, .object-detail p, .culture-detail p { font-size: 16px; line-height: 1.9; }
.fish-facts { margin: 30px 0; border-top: 1px solid var(--line); }
.fish-facts div { display: grid; grid-template-columns: 92px 1fr; gap: 18px; padding: 14px 0; border-bottom: 1px solid var(--line); }
.fish-facts dt { color: var(--muted); }
.fish-facts dd { margin: 0; line-height: 1.7; }
.fish-detail section { margin-top: 34px; }
.fish-detail section h3 { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
.tag-list, .method-strip { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-list span, .method-strip span { padding: 7px 10px; font-size: 12px; background: var(--surface); border: 1px solid var(--line); }

.tackle-intro { background: oklch(0.22 0.045 75); }
.tackle-workbench { padding: 0 6vw 100px; }
.system-switcher, .technique-modes { display: grid; max-width: 1380px; grid-template-columns: repeat(7, 1fr); margin: 0 auto; border-right: 1px solid var(--line); }
.system-switcher button, .technique-modes button { display: flex; min-height: 86px; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--muted); background: var(--bg); border: 0; border-left: 1px solid var(--line); border-bottom: 1px solid var(--line); cursor: pointer; }
.system-switcher button.is-active, .technique-modes button.is-active { color: var(--night); background: var(--primary); }
.tackle-stage { display: grid; max-width: 1380px; grid-template-columns: minmax(300px, .8fr) minmax(460px, 1.2fr); min-height: 620px; margin: 56px auto 30px; }
.tackle-schematic { position: relative; overflow: hidden; background: var(--night); }
.rod-line { position: absolute; top: 14%; left: 20%; width: 2px; height: 72%; background: var(--primary); transform: rotate(20deg); }
.reel-disc { position: absolute; top: 51%; left: 37%; width: 108px; aspect-ratio: 1; border: 2px solid var(--primary); border-radius: 50%; }
.float-pin { position: absolute; top: 19%; right: 22%; width: 8px; height: 150px; background: var(--accent); border-radius: 8px; }
.hook-mark { position: absolute; right: 16%; bottom: 14%; color: var(--primary); font-family: var(--display); font-size: 130px; transform: rotate(22deg); }
.tackle-records { min-width: 0; padding: 20px 0 20px 52px; }
.module-heading { margin-bottom: 30px; }
.module-heading > span { color: var(--primary-dark); font-size: 12px; font-weight: 700; }
.module-heading h2 { margin: 8px 0 10px; font-family: var(--display); font-size: 34px; letter-spacing: 0; }
.module-heading p { margin: 0; color: var(--muted); }
.object-list { border-top: 1px solid var(--ink); }
.object-list button { display: grid; width: 100%; grid-template-columns: 86px minmax(150px, .4fr) minmax(220px, .6fr); gap: 18px; padding: 20px 0; color: var(--ink); text-align: left; background: transparent; border: 0; border-bottom: 1px solid var(--line); cursor: pointer; }
.object-list button span { color: var(--primary-dark); font-size: 11px; }
.object-list button strong { font-family: var(--display); font-size: 20px; }
.object-list button p { margin: 0; overflow: hidden; color: var(--muted); line-height: 1.6; text-overflow: ellipsis; white-space: nowrap; }
.method-strip { max-width: 1380px; margin: 0 auto; }
.object-detail > img { margin-bottom: 28px; }

.technique-intro { background: oklch(0.18 0.045 170); }
.technique-lab { padding: 0 6vw 100px; }
.technique-modes { grid-template-columns: repeat(4, 1fr); }
.technique-display { display: grid; max-width: 1260px; grid-template-columns: minmax(300px, .8fr) minmax(420px, 1.2fr); gap: 6vw; margin: 70px auto 0; }
.signal-visual { position: sticky; top: 140px; height: 560px; overflow: hidden; background: var(--night); }
.water-line { position: absolute; top: 30%; right: 0; left: 0; height: 1px; background: var(--accent); }
.float-body { position: absolute; top: 18%; left: 50%; width: 12px; height: 190px; background: var(--primary); border-radius: 12px; transform: translateX(-50%); }
.signal-ring { position: absolute; top: 30%; left: 50%; border: 1px solid var(--accent); border-radius: 50%; transform: translate(-50%, -50%); }
.signal-ring.one { width: 170px; height: 46px; }
.signal-ring.two { width: 330px; height: 92px; opacity: .5; }
.technique-sequence > span { color: var(--primary-dark); font-size: 13px; }
.technique-sequence > h2 { margin: 8px 0 36px; font-family: var(--display); font-size: 34px; line-height: 1.45; letter-spacing: 0; }
.technique-records { border-top: 1px solid var(--ink); }
.technique-records details { border-bottom: 1px solid var(--line); }
.technique-records summary { display: grid; grid-template-columns: 50px 1fr; gap: 18px; padding: 24px 0; cursor: pointer; list-style: none; }
.technique-records summary::-webkit-details-marker { display: none; }
.technique-records summary > span { color: var(--primary-dark); }
.technique-sequence h3 { margin: 0 0 8px; font-family: var(--display); font-size: 22px; letter-spacing: 0; }
.technique-sequence summary p { margin: 0; color: var(--muted); line-height: 1.7; }
.technique-detail { padding: 4px 0 30px 68px; }
.technique-detail dl { margin: 0; }
.technique-detail dl div { display: grid; grid-template-columns: 82px 1fr; gap: 14px; padding: 12px 0; border-top: 1px solid var(--line); }
.technique-detail dt { color: var(--primary-dark); font-size: 12px; }
.technique-detail dd { margin: 0; line-height: 1.75; }
.technique-detail h4 { margin: 26px 0 10px; font-family: var(--display); font-size: 18px; }
.technique-detail ol { margin: 0; padding-left: 22px; border: 0; }
.technique-detail li { display: list-item; padding: 5px 0; color: var(--muted); line-height: 1.7; border: 0; }

.anglers-intro { background: oklch(0.22 0.04 40); }
.portrait-wall { padding: 50px 6vw 110px; }
.portrait-wall > nav, .culture-cabinet > nav { display: flex; max-width: 1380px; flex-wrap: wrap; gap: 6px; margin: 0 auto 34px; }
.identity-intro { display: grid; max-width: 1380px; grid-template-columns: minmax(150px, .35fr) minmax(280px, .65fr); gap: 30px; margin: 0 auto 30px; padding: 22px 0; border-top: 1px solid var(--ink); border-bottom: 1px solid var(--line); }
.identity-intro span { color: var(--primary-dark); font-family: var(--display); font-size: 24px; }
.identity-intro p { margin: 0; color: var(--muted); line-height: 1.8; }
.portrait-wall nav button, .culture-cabinet nav button { display: inline-flex; min-height: 44px; align-items: center; gap: 8px; padding: 0 16px; color: var(--muted); background: var(--bg); border: 1px solid var(--line); cursor: pointer; }
.portrait-wall nav button.is-active, .culture-cabinet nav button.is-active { color: white; background: var(--ink); border-color: var(--ink); }
.portrait-grid { display: grid; max-width: 1380px; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 0 auto; background: var(--line); border: 1px solid var(--line); }
.portrait-grid > button { min-width: 0; min-height: 330px; padding: 28px; color: var(--ink); text-align: left; background: var(--bg); border: 0; cursor: pointer; }
.portrait-grid img, .portrait-silhouette { width: 100%; height: 160px; margin-bottom: 22px; object-fit: cover; background: var(--surface); }
.portrait-silhouette { background: var(--surface); border-bottom: 4px solid var(--primary); }
.portrait-number, .portrait-grid small { color: var(--primary-dark); font-size: 11px; }
.portrait-grid h2 { margin: 8px 0; font-family: var(--display); font-size: 24px; letter-spacing: 0; }
.portrait-grid p { display: -webkit-box; margin: 0; overflow: hidden; color: var(--muted); line-height: 1.7; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }

.culture-intro { background: oklch(0.2 0.06 320); }
.culture-cabinet { padding: 50px 6vw 110px; background: var(--surface); }
.culture-display { display: grid; max-width: 1380px; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin: 0 auto; }
.culture-display button { min-height: 300px; padding: 28px; color: var(--ink); text-align: left; background: var(--bg); border: 1px solid var(--line); cursor: pointer; }
.culture-display button > span { color: var(--primary-dark); }
.culture-display h2 { margin: 30px 0 14px; font-family: var(--display); font-size: 25px; letter-spacing: 0; }
.culture-display p { display: -webkit-box; overflow: hidden; color: var(--muted); line-height: 1.8; -webkit-box-orient: vertical; -webkit-line-clamp: 5; }

.ethics-intro { background: oklch(0.18 0.055 135); }
.law-history, .jurisdiction-room { padding: 80px 6vw; }
.law-history > *, .jurisdiction-room > * { max-width: 1320px; margin-right: auto; margin-left: auto; }
.law-timeline { display: grid; grid-template-columns: repeat(5, 1fr); border-top: 1px solid var(--ink); }
.law-timeline article { position: relative; padding: 36px 28px 30px 0; border-right: 1px solid var(--line); }
.law-timeline article::before { position: absolute; top: -6px; left: 0; width: 11px; height: 11px; content: ''; background: var(--primary); border-radius: 50%; }
.law-timeline span { color: var(--primary-dark); font-size: 12px; }
.law-timeline h3, .jurisdiction-grid h3, .responsibility-grid h3 { font-family: var(--display); font-size: 22px; letter-spacing: 0; }
.law-timeline p, .jurisdiction-grid p, .responsibility-grid p { color: var(--muted); line-height: 1.8; }
.jurisdiction-room { background: var(--surface); }
.jurisdiction-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); }
.jurisdiction-grid article { min-width: 0; padding: 26px; background: var(--bg); }
.jurisdiction-grid h3 { margin-top: 0; }
.jurisdiction-grid ol { margin: 22px 0 0; padding-left: 20px; }
.jurisdiction-grid li { padding: 9px 0; font-size: 12px; border-top: 1px solid var(--line); }
.ethics-decisions { max-width: 1320px; margin: 0 auto; padding: 80px 6vw 110px; }
.ethics-section-list { border-top: 1px solid var(--ink); }
.ethics-section-list article { display: grid; grid-template-columns: 100px 1fr; gap: 24px; padding: 30px 0; border-bottom: 1px solid var(--line); }
.ethics-section-list article > div:first-child { display: flex; align-items: flex-start; gap: 12px; color: var(--primary-dark); }
.ethics-section-list h3 { margin: 0 0 8px; font-family: var(--display); font-size: 25px; }
.ethics-section-list strong { display: block; margin-bottom: 10px; font-weight: 500; }
.ethics-section-list p { max-width: 850px; margin: 0; color: var(--muted); line-height: 1.85; }
.responsibility-grid { display: grid; max-width: 1320px; grid-template-columns: repeat(4, 1fr); margin: 0 auto; padding: 80px 6vw 110px; }
.responsibility-grid article { padding: 0 28px; border-left: 1px solid var(--line); }
.responsibility-grid svg { color: var(--primary-dark); }

@media (max-width: 1024px) {
  .fish-specimen-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .culture-display { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .jurisdiction-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 767px) {
  .scene-intro { display: block; padding: 52px 22px 44px; }
  .scene-intro h1 { margin: 8px 0 14px; font-size: 40px; }
  .scene-stats, .scene-stat { display: flex; margin-top: 34px; }
  .scene-stats > div, .scene-stat { min-width: 0; }
  .scene-stat strong, .scene-stats strong { font-size: 30px; }
  .prologue-scene, .epilogue-scene { min-height: 78svh; padding: 60px 24px; }
  .prologue-copy h1, .epilogue-scene h1 { font-size: 48px; }
  .prologue-copy p, .epilogue-scene p { font-size: 16px; line-height: 1.9; }
  .timeline-section { padding: 48px 20px 80px; }
  .timeline-spine { left: 40px; }
  .timeline-event { grid-template-columns: 48px minmax(0, 1fr); }
  .timeline-index { width: 34px; height: 34px; margin-top: 27px; border-width: 6px; line-height: 22px; }
  .timeline-event > button { display: block; padding: 26px 30px 26px 0; }
  .timeline-event h2 { margin: 6px 0 10px; font-size: 23px; }
  .timeline-event button svg { position: absolute; top: 27px; right: 0; }
  .timeline-detail { padding: 22px 0 38px; }
  .timeline-detail dl { display: block; }
  .timeline-detail dl div { margin-bottom: 8px; }
  .timeline-detail > p { font-size: 15px; line-height: 1.9; }
  .timeline-detail figure { display: block; }
  .timeline-detail figcaption { margin-top: 10px; }
  .fish-observatory { padding: 28px 14px 70px; }
  .fish-controls { grid-template-columns: 1fr 1fr; }
  .search-control { grid-column: 1 / -1; }
  .fish-controls label:nth-child(4) { grid-column: 1 / -1; }
  .fish-specimen-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .fish-specimen > div:last-child { min-height: 112px; padding: 13px; }
  .fish-specimen h2 { font-size: 20px; }
  .object-drawer { width: 100vw; padding: 62px 22px 60px; }
  .fish-detail h2, .object-detail h2, .culture-detail h2 { font-size: 36px; }
  .system-switcher { grid-template-columns: repeat(4, 1fr); overflow-x: auto; }
  .system-switcher button { min-height: 74px; }
  .tackle-workbench, .technique-lab { padding: 0 18px 70px; }
  .tackle-stage, .technique-display { display: block; min-height: 0; margin-top: 30px; }
  .tackle-schematic, .signal-visual { position: relative; top: auto; height: 320px; }
  .tackle-records { padding: 34px 0 0; }
  .object-list button { grid-template-columns: 72px minmax(0, 1fr); }
  .object-list button p { display: none; }
  .technique-modes { grid-template-columns: repeat(4, minmax(82px, 1fr)); overflow-x: auto; }
  .technique-sequence { padding-top: 38px; }
  .technique-detail { padding-left: 0; }
  .technique-detail dl div { grid-template-columns: 76px 1fr; }
  .portrait-wall, .culture-cabinet { padding: 34px 18px 70px; }
  .portrait-wall > nav, .culture-cabinet > nav { flex-wrap: nowrap; overflow-x: auto; }
  .portrait-wall nav button, .culture-cabinet nav button { flex: 0 0 auto; }
  .portrait-grid, .culture-display { grid-template-columns: 1fr; }
  .identity-intro { display: block; }
  .identity-intro p { margin-top: 10px; }
  .portrait-grid > button { min-height: 280px; }
  .law-history, .jurisdiction-room { padding: 58px 20px; }
  .law-timeline, .jurisdiction-grid, .responsibility-grid { grid-template-columns: 1fr; }
  .law-timeline article { padding-left: 22px; border-right: 0; border-left: 1px solid var(--line); }
  .responsibility-grid { padding: 58px 20px 80px; }
  .responsibility-grid article { padding: 24px 0; border-bottom: 1px solid var(--line); border-left: 0; }
  .ethics-decisions { padding: 58px 20px 80px; }
  .ethics-section-list article { grid-template-columns: 54px 1fr; gap: 12px; }
}
````

## File: src/editorial.css

````css
/* Editorial museum layer: paper, ink, water and a single continuous line. */
:root {
  --bg: oklch(0.985 0 0);
  --surface: oklch(0.95 0.006 220);
  --ink: oklch(0.19 0.012 240);
  --muted: oklch(0.48 0.012 230);
  --primary: oklch(0.58 0.19 34);
  --primary-dark: oklch(0.47 0.17 33);
  --accent: oklch(0.58 0.035 220);
  --line: oklch(0.8 0.008 230);
  --night: oklch(0.15 0.012 240);
  --danger: oklch(0.52 0.19 32);
  --ease-water: cubic-bezier(0.25, 1, 0.5, 1);
  --display: 'Songti SC', 'STSong', 'Noto Serif SC', 'SimSun', serif;
  --sans: 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', Arial, sans-serif;
}

body {
  background-color: var(--bg);
}

button,
a,
input,
select,
summary {
  transition-timing-function: var(--ease-water) !important;
}

/* Museum frame */
.museum-header {
  min-height: 64px;
  padding: 0 5vw;
  background: var(--bg);
  border-color: var(--ink);
}

.museum-header.is-overlay {
  color: white;
  background: transparent;
  border-color: oklch(1 0 0 / 0.4);
  backdrop-filter: none;
}

.brand {
  gap: 10px;
  font-size: 19px;
  font-weight: 500;
}

.brand-mark {
  width: 30px;
  height: 30px;
  color: var(--primary);
  background: transparent;
  border: 1px solid currentColor;
}

.museum-header nav {
  gap: 30px;
}

.museum-header nav a {
  padding: 21px 0 18px;
  font-size: 12px;
}

.museum-header nav a::after {
  bottom: 12px;
  height: 1px;
  background: var(--primary);
}

.route-progress {
  color: var(--ink);
  background: var(--bg);
  border-color: var(--line);
  backdrop-filter: none;
}

.route-progress ol::before {
  background: var(--line);
}

.route-progress .route-dot {
  width: 7px;
  height: 7px;
  background: var(--bg);
  border: 1px solid var(--muted);
}

.route-progress .is-current .route-dot {
  width: 11px;
  height: 11px;
  margin-top: -2px;
  background: var(--primary);
  border: 2px solid var(--bg);
  box-shadow: 0 0 0 1px var(--primary);
}

/* Hall openings are editorial title pages, not dashboard banners. */
.scene-intro,
.history-intro,
.fish-intro,
.tackle-intro,
.technique-intro,
.anglers-intro,
.culture-intro,
.ethics-intro {
  min-height: 440px;
  padding: 102px max(7vw, calc((100vw - 1380px) / 2)) 72px;
  color: var(--ink);
  background: var(--bg);
  border-bottom: 1px solid var(--ink);
}

.scene-intro::after {
  position: absolute;
  right: 7vw;
  bottom: 0;
  left: 42%;
  height: 1px;
  content: '';
  background: var(--primary);
  transform: rotate(-2deg);
  transform-origin: right;
  animation: line-breathe 8s var(--ease-water) infinite alternate;
}

.scene-intro > span {
  color: var(--primary-dark);
  font-weight: 500;
}

.scene-intro h1 {
  max-width: 10em;
  font-size: clamp(48px, 5.2vw, 78px);
  font-weight: 400;
  line-height: 1.12;
}

.scene-intro > p {
  max-width: 670px;
  color: var(--muted);
  font-size: 16px;
  line-height: 2;
}

.scene-stat,
.scene-stats {
  gap: 26px;
}

.scene-stat,
.scene-stats > div {
  min-width: 96px;
  padding-left: 13px;
  border-left: 1px solid var(--primary);
}

.scene-stat strong,
.scene-stats strong {
  color: var(--ink);
  font-size: 30px;
  font-weight: 400;
}

.scene-stat span,
.scene-stats span {
  color: var(--muted);
}

/* Entrance, prologue and epilogue */
.home-hero {
  min-height: 86svh;
  background-position: center 58%;
  filter: saturate(0.72);
}

.home-hero::after {
  background: oklch(0.08 0.01 235 / 0.38);
}

.home-hero::before {
  right: -8%;
  width: 78%;
  background: oklch(0.74 0.15 35 / 0.88);
  animation: line-drift 9s var(--ease-water) infinite alternate;
}

.hero-content {
  min-height: 86svh;
  max-width: 860px;
  padding: 19vh 7vw 9vh;
}

.hero-content h1 {
  max-width: 8em;
  margin-bottom: 40px;
  font-size: clamp(54px, 6.6vw, 94px);
  font-weight: 400;
}

.primary-entry {
  color: oklch(0.78 0.16 36);
  font-size: 21px;
  font-weight: 500;
  border-width: 1px;
  transition-duration: 520ms;
}

.route-overview,
.featured-collection {
  padding: 110px 7vw;
}

.featured-collection {
  background: var(--surface);
}

.gallery-list a {
  min-height: 124px;
  transition-duration: 500ms;
}

.gallery-list a:hover {
  padding: 0 22px;
}

.collection-card {
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--line);
}

.prologue-scene,
.epilogue-scene {
  position: relative;
  min-height: calc(100svh - 128px);
  color: var(--ink);
  background-color: var(--bg);
  background-image: url('/content/assets/placeholders/water-section-concept.webp');
  background-position: center;
  background-size: cover;
}

.prologue-scene::before,
.epilogue-scene::before {
  background: oklch(0.985 0 0 / 0.7);
}

.prologue-copy,
.epilogue-scene > div {
  position: relative;
  max-width: 680px;
  padding: 56px 0;
  animation: paper-arrive 1.1s var(--ease-water) both;
}

.prologue-copy > span,
.epilogue-scene span,
.epilogue-scene a {
  color: var(--primary-dark);
}

.prologue-copy h1,
.epilogue-scene h1 {
  font-size: clamp(52px, 6vw, 84px);
  font-weight: 400;
}

.prologue-copy p,
.epilogue-scene p {
  color: var(--ink);
  text-shadow: none;
}

/* History: one fishing line, knots and opened documentary leaves. */
.timeline-section {
  max-width: 1220px;
  padding-top: 120px;
}

.timeline-spine {
  left: calc(6vw + 85px);
  background: var(--primary);
  animation: line-breathe 7s var(--ease-water) infinite alternate;
}

.timeline-event {
  grid-template-columns: 86px minmax(0, 1fr);
}

.timeline-index {
  width: 18px;
  height: 18px;
  margin-top: 42px;
  margin-left: 33px;
  overflow: visible;
  color: transparent;
  background: var(--bg);
  border: 2px solid var(--primary);
  line-height: 14px;
}

.timeline-index::after {
  position: absolute;
  top: 50%;
  left: 22px;
  width: 26px;
  height: 1px;
  content: '';
  background: var(--primary);
}

.timeline-event > button {
  grid-template-columns: minmax(130px, 0.3fr) minmax(260px, 0.7fr) 28px;
  padding: 38px 0;
  transition: transform 550ms var(--ease-water);
}

.timeline-event > button:hover {
  transform: translateX(10px);
}

.timeline-event h2 {
  font-size: 30px;
  font-weight: 400;
}

.timeline-detail {
  padding: 34px 0 70px;
  animation: paper-arrive 680ms var(--ease-water) both;
}

.timeline-detail figure img {
  max-height: 440px;
  filter: grayscale(0.8) contrast(0.9);
  transition: filter 800ms var(--ease-water), transform 800ms var(--ease-water);
}

.timeline-detail figure:hover img {
  filter: grayscale(0) contrast(1);
  transform: translateY(-4px);
}

/* Fish: an open specimen field, with no enclosing dashboard grid. */
.fish-observatory {
  padding: 70px 7vw 130px;
  background: var(--bg);
}

.fish-controls {
  grid-template-columns: minmax(260px, 1.5fr) repeat(3, minmax(140px, 0.5fr));
  gap: 0 32px;
}

.fish-controls label {
  min-height: 50px;
  padding: 0;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--ink);
}

.result-line {
  margin: 42px auto 30px;
}

.fish-specimen-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 68px 38px;
  background: transparent;
  border: 0;
}

.fish-specimen {
  position: relative;
  background: transparent;
}

.fish-specimen::after {
  display: block;
  width: 0;
  height: 1px;
  content: '';
  background: var(--primary);
  transition: width 650ms var(--ease-water);
}

.fish-specimen:hover::after,
.fish-specimen:focus-visible::after {
  width: 100%;
}

.specimen-image {
  aspect-ratio: 4 / 3;
  background: var(--surface);
}

.fish-specimen:nth-child(7n + 2) .specimen-image,
.fish-specimen:nth-child(7n + 6) .specimen-image {
  aspect-ratio: 3 / 4;
}

.fish-specimen:nth-child(7n + 4) {
  margin-top: 44px;
}

.specimen-image img {
  filter: grayscale(0.82) saturate(0.55) contrast(0.92);
  transform: scale(0.96);
  transition: filter 850ms var(--ease-water), transform 850ms var(--ease-water);
}

.fish-specimen:hover img,
.fish-specimen:focus-visible img {
  filter: grayscale(0) saturate(1) contrast(1);
  transform: scale(1.025);
}

.fish-specimen > div:last-child {
  min-height: 0;
  padding: 16px 0 13px;
}

.fish-specimen small {
  color: var(--muted);
}

.fish-specimen h2 {
  font-size: 25px;
  font-weight: 400;
}

.fish-specimen p {
  white-space: normal;
}

.load-more {
  margin-top: 68px;
  border: 0;
  border-bottom: 1px solid var(--ink);
}

.drawer-layer {
  background: oklch(0.14 0.01 230 / 0.48);
  animation: veil-in 300ms ease-out both;
}

.object-drawer {
  width: min(600px, 94vw);
  padding: 76px 54px 80px;
  background: var(--bg);
  border-left: 1px solid var(--ink);
  box-shadow: none;
  animation: drawer-in 700ms var(--ease-water) both;
}

.drawer-close {
  border: 0;
  border-bottom: 1px solid var(--ink);
}

.drawer-object-image img,
.object-detail > img {
  filter: grayscale(0.35);
}

/* Tackle: a quiet exploded instrument table. */
.tackle-workbench,
.technique-lab {
  padding-top: 0;
}

.system-switcher,
.technique-modes {
  border-right: 0;
  border-bottom: 1px solid var(--ink);
}

.system-switcher button,
.technique-modes button {
  min-height: 78px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
}

.system-switcher button.is-active,
.technique-modes button.is-active {
  color: var(--primary-dark);
  background: transparent;
  border-bottom-color: var(--primary);
}

.tackle-stage {
  grid-template-columns: minmax(360px, 0.9fr) minmax(460px, 1.1fr);
  gap: 6vw;
}

.tackle-schematic {
  min-height: 620px;
  background: var(--surface);
  border: 1px solid var(--ink);
}

.tackle-schematic::after {
  position: absolute;
  inset: 8%;
  content: '';
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  animation: water-shift 8s var(--ease-water) infinite alternate;
}

.rod-line,
.reel-disc {
  background: transparent;
  border-color: var(--primary);
}

.rod-line {
  width: 1px;
  background: var(--primary);
}

.float-pin {
  width: 5px;
  background: var(--primary);
}

.hook-mark {
  color: var(--ink);
  font-weight: 400;
}

.tackle-records {
  padding-left: 0;
}

.object-list button {
  transition: padding 520ms var(--ease-water), color 520ms var(--ease-water);
}

.object-list button:hover {
  padding-left: 14px;
  color: var(--primary-dark);
}

.method-strip span,
.tag-list span {
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--line);
}

/* Techniques: a vertical storyboard beside a responsive float signal. */
.technique-display {
  max-width: 1320px;
  grid-template-columns: minmax(320px, 0.75fr) minmax(460px, 1.25fr);
}

.signal-visual {
  background: var(--surface);
  border: 1px solid var(--ink);
}

.signal-visual::after {
  position: absolute;
  right: 0;
  bottom: 12%;
  left: 0;
  height: 1px;
  content: '';
  background: var(--line);
  animation: water-shift 6s var(--ease-water) infinite alternate;
}

.water-line,
.signal-ring {
  border-color: var(--accent);
  background: var(--accent);
}

.signal-ring {
  background: transparent;
}

.float-body {
  background: var(--primary);
  animation: float-wait 4.8s var(--ease-water) infinite;
}

.technique-records details[open] {
  border-bottom-color: var(--ink);
}

.technique-records summary {
  transition: padding 520ms var(--ease-water);
}

.technique-records summary:hover {
  padding-left: 12px;
}

.technique-detail dl div:nth-child(2) dt,
.technique-detail dl div:nth-child(2) dd {
  color: var(--primary-dark);
}

/* People: six identities become editorial portraits, not equal tiles. */
.portrait-wall {
  padding-top: 72px;
}

.portrait-wall > nav,
.culture-cabinet > nav {
  gap: 24px;
  border-bottom: 1px solid var(--ink);
}

.portrait-wall nav button,
.culture-cabinet nav button {
  padding: 0 0 12px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
}

.portrait-wall nav button.is-active,
.culture-cabinet nav button.is-active {
  color: var(--primary-dark);
  background: transparent;
  border-bottom-color: var(--primary);
}

.identity-intro {
  margin-top: 52px;
  padding: 28px 0;
  border-top: 0;
}

.portrait-grid {
  grid-template-columns: repeat(12, 1fr);
  gap: 72px 34px;
  background: transparent;
  border: 0;
}

.portrait-grid > button {
  grid-column: span 4;
  min-height: 0;
  padding: 0 0 22px;
  background: transparent;
  border-bottom: 1px solid var(--line);
}

.portrait-grid > button:nth-child(5n + 1),
.portrait-grid > button:nth-child(5n + 4) {
  grid-column: span 6;
}

.portrait-grid img,
.portrait-silhouette {
  height: 260px;
  filter: grayscale(0.8);
  transition: filter 800ms var(--ease-water), transform 800ms var(--ease-water);
}

.portrait-grid button:hover img {
  filter: grayscale(0);
  transform: translateY(-4px);
}

.portrait-silhouette {
  position: relative;
  border-bottom: 1px solid var(--primary);
}

.portrait-silhouette::after {
  position: absolute;
  inset: 35% 20%;
  content: '';
  border: 1px solid var(--line);
  border-radius: 50% 50% 8% 8%;
}

/* Culture: each cabinet has its own reading rhythm. */
.culture-cabinet {
  padding-top: 72px;
  background: var(--bg);
}

.culture-display {
  gap: 0;
  border-top: 1px solid var(--ink);
}

.culture-display button {
  min-height: 340px;
  padding: 34px 28px;
  background: transparent;
  border: 0;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background-color 600ms var(--ease-water), transform 600ms var(--ease-water);
}

.culture-display button:hover {
  background: var(--surface);
  transform: translateY(-5px);
}

.culture-display.view-language {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.culture-display.view-language button {
  min-height: 220px;
}

.culture-display.view-belief button:nth-child(3n + 2) {
  margin-top: 44px;
}

/* Ethics: legal history, jurisdiction comparison and decisions read differently. */
.law-history,
.jurisdiction-room,
.ethics-decisions {
  border-bottom: 1px solid var(--ink);
}

.law-timeline {
  gap: 0;
  border-top: 1px solid var(--ink);
}

.law-timeline article {
  background: transparent;
  border-right: 1px solid var(--line);
}

.jurisdiction-room {
  background: var(--surface);
}

.jurisdiction-grid {
  gap: 0;
  border-top: 1px solid var(--ink);
  border-left: 1px solid var(--line);
}

.jurisdiction-grid article {
  background: transparent;
  border: 0;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.ethics-section-list article {
  grid-template-columns: 120px minmax(0, 1fr);
  padding: 44px 0;
}

.ethics-section-list article:nth-child(even) > div:last-child {
  margin-left: 8vw;
}

.route-pager {
  background: var(--bg);
  border-top: 1px solid var(--ink);
}

.pager-item {
  transition: background-color 600ms var(--ease-water), padding 600ms var(--ease-water);
}

@keyframes paper-arrive {
  from { filter: blur(6px); transform: translateY(18px); }
  to { filter: blur(0); transform: translateY(0); }
}

@keyframes line-breathe {
  from { transform: rotate(-2deg) translateY(-2px); }
  to { transform: rotate(1deg) translateY(5px); }
}

@keyframes water-shift {
  from { transform: translateY(-5px) rotate(-0.35deg); }
  to { transform: translateY(8px) rotate(0.35deg); }
}

@keyframes float-wait {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 9px); }
}

@keyframes drawer-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes veil-in {
  from { background-color: transparent; }
}

@media (min-width: 1100px) {
  .hall-page {
    padding-left: 68px;
  }

  .hall-page .museum-header {
    margin-left: -68px;
    padding-left: calc(5vw + 68px);
  }

  .hall-page .route-progress {
    position: fixed;
    z-index: 40;
    top: 64px;
    bottom: 0;
    left: 0;
    width: 68px;
    overflow: hidden;
    border-right: 1px solid var(--ink);
    border-bottom: 0;
  }

  .hall-page .route-progress ol {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 18px;
  }

  .hall-page .route-progress ol::before {
    top: 9%;
    right: auto;
    bottom: 9%;
    left: 50%;
    width: 1px;
    height: auto;
  }

  .hall-page .route-progress li {
    z-index: 1;
    background: var(--bg);
  }

  .hall-page .route-progress a {
    min-width: 38px;
    gap: 4px;
    padding: 4px;
    font-size: 10px;
  }
}

@media (max-width: 1099px) {
  .scene-intro {
    min-height: 400px;
  }

  .fish-specimen-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  body {
    background-image: none;
  }

  .museum-header {
    min-height: 60px;
    padding: 0 18px;
  }

  .museum-header nav.is-open {
    background: var(--bg);
    border-bottom: 1px solid var(--ink);
  }

  .route-progress ol {
    min-height: 56px;
  }

  .scene-intro,
  .history-intro,
  .fish-intro,
  .tackle-intro,
  .technique-intro,
  .anglers-intro,
  .culture-intro,
  .ethics-intro {
    display: block;
    min-height: 0;
    padding: 64px 20px 52px;
  }

  .scene-intro::after {
    right: 20px;
    left: 38%;
  }

  .scene-intro h1 {
    margin: 10px 0 20px;
    font-size: 44px;
  }

  .scene-stat,
  .scene-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-top: 34px;
  }

  .scene-stat {
    display: flex;
  }

  .scene-stat,
  .scene-stats > div {
    min-width: 0;
  }

  .scene-stat strong,
  .scene-stats strong {
    font-size: 25px;
  }

  .home-hero,
  .hero-content {
    min-height: 82svh;
  }

  .hero-content {
    padding: 19vh 22px 8vh;
  }

  .hero-content h1 {
    font-size: 52px;
  }

  .route-overview,
  .featured-collection {
    padding: 76px 20px;
  }

  .prologue-scene,
  .epilogue-scene {
    min-height: calc(100svh - 116px);
    padding: 58px 22px;
    background-image: url('/content/assets/placeholders/water-section-concept.webp');
    background-position: 62% center;
  }

  .prologue-copy h1,
  .epilogue-scene h1 {
    font-size: 52px;
  }

  .timeline-section {
    padding: 70px 20px 90px;
  }

  .timeline-spine {
    left: 28px;
  }

  .timeline-event {
    grid-template-columns: 28px minmax(0, 1fr);
  }

  .timeline-index {
    width: 13px;
    height: 13px;
    margin-top: 39px;
    margin-left: 2px;
    border-width: 1px;
  }

  .timeline-index::after {
    left: 14px;
    width: 11px;
  }

  .timeline-event > button {
    display: grid;
    grid-template-columns: 1fr 24px;
    gap: 8px;
    padding: 30px 0 30px 14px;
  }

  .timeline-period {
    grid-row: auto;
    grid-column: 1;
  }

  .timeline-event h2,
  .timeline-event button p {
    grid-column: 1;
  }

  .timeline-event button svg {
    grid-column: 2;
    grid-row: 1 / span 3;
  }

  .timeline-detail {
    grid-column: 2;
    padding-left: 14px;
  }

  .timeline-detail figure {
    display: block;
  }

  .fish-observatory {
    padding: 44px 18px 88px;
  }

  .fish-controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 16px;
  }

  .fish-controls .search-control {
    grid-column: 1 / -1;
  }

  .fish-specimen-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 44px 14px;
  }

  .fish-specimen:nth-child(7n + 4) {
    margin-top: 22px;
  }

  .fish-specimen > div:last-child {
    padding: 12px 0 10px;
  }

  .fish-specimen h2 {
    font-size: 20px;
  }

  .object-drawer {
    width: 100vw;
    padding: 68px 22px 64px;
  }

  .system-switcher,
  .technique-modes {
    overflow-x: auto;
  }

  .system-switcher button,
  .technique-modes button {
    min-width: 86px;
    min-height: 68px;
  }

  .tackle-stage,
  .technique-display {
    display: block;
  }

  .tackle-schematic,
  .signal-visual {
    height: 340px;
    min-height: 0;
  }

  .portrait-grid {
    display: block;
  }

  .portrait-grid > button {
    width: 100%;
    margin-bottom: 54px;
  }

  .portrait-grid img,
  .portrait-silhouette {
    height: 230px;
  }

  .culture-display,
  .culture-display.view-language {
    grid-template-columns: 1fr;
  }

  .culture-display button,
  .culture-display.view-language button {
    min-height: 0;
    padding: 30px 0;
    border-right: 0;
  }

  .culture-display.view-belief button:nth-child(3n + 2) {
    margin-top: 0;
  }

  .ethics-section-list article {
    grid-template-columns: 56px minmax(0, 1fr);
  }

  .ethics-section-list article:nth-child(even) > div:last-child {
    margin-left: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scene-intro::after,
  .timeline-spine,
  .tackle-schematic::after,
  .signal-visual::after,
  .float-body,
  .prologue-copy,
  .epilogue-scene > div {
    animation: none !important;
  }
}
````

## File: src/components/MuseumHeader.jsx

````jsx
import { FishSymbol, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function MuseumHeader({ overlay = false }) {
  const [open, setOpen] = useState(false)
  return (
    <header className={`museum-header ${overlay ? 'is-overlay' : ''}`}>
      <Link className="brand" to="/" aria-label="钓鱼佬博物馆首页">
        <span className="brand-mark" aria-hidden="true">
          <FishSymbol size={21} strokeWidth={1.6} />
        </span>
        <span>钓鱼佬博物馆</span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-label={open ? '关闭导航' : '打开导航'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'is-open' : ''} aria-label="全站导航">
        <NavLink to="/visit/prologue" onClick={() => setOpen(false)}>
          参观路线
        </NavLink>
        <NavLink to="/visit/fish" onClick={() => setOpen(false)}>
          鱼类标本
        </NavLink>
        <NavLink to="/visit/tackle" onClick={() => setOpen(false)}>
          钓具陈列
        </NavLink>
      </nav>
    </header>
  )
}
````

## File: src/components/RouteProgress.jsx

````jsx
import { Link } from 'react-router-dom'
import { HALLS } from '../data/halls.js'

export default function RouteProgress({ currentStage }) {
  return (
    <nav className="route-progress" aria-label="常设展参观进度">
      <ol>
        {HALLS.map((stage) => {
          const current = stage.stage === currentStage
          return (
            <li key={stage.id} className={current ? 'is-current' : ''}>
              <Link
                to={stage.url}
                aria-current={current ? 'step' : undefined}
                title={stage.title}
              >
                <span className="route-dot" aria-hidden="true" />
                <span>{stage.stage}</span>
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
````

## File: src/components/RoutePager.jsx

````jsx
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function RoutePager({ previous, next }) {
  return (
    <nav className="route-pager" aria-label="参观路线前后页">
      {previous ? (
        <Link className="pager-item previous" to={previous.url}>
          <ArrowLeft aria-hidden="true" />
          <span>
            <small>上一厅</small>
            <strong>{previous.title}</strong>
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link className="pager-item next" to={next.url}>
          <span>
            <small>下一厅</small>
            <strong>{next.title}</strong>
          </span>
          <ArrowRight aria-hidden="true" />
        </Link>
      ) : null}
    </nav>
  )
}
````

## File: src/components/ObjectDrawer.jsx

````jsx
import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function ObjectDrawer({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return undefined
    const close = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', close)
    return () => document.removeEventListener('keydown', close)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="drawer-layer" role="presentation" onMouseDown={onClose}>
      <aside
        className="object-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" type="button" onClick={onClose} aria-label="关闭详情">
          <X aria-hidden="true" />
        </button>
        {children}
      </aside>
    </div>
  )
}
````

## File: src/pages/HomePage.jsx

````jsx
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MuseumHeader from '../components/MuseumHeader.jsx'
import { HALLS } from '../data/halls.js'
import { cleanInlineText, firstHeading, imageUrl, introParagraphs } from '../lib/content.js'

const FEATURED_SPECIES = [
  'species-crucian-carp',
  'species-common-carp',
  'species-grass-carp',
]

export default function HomePage({ page, collections, images }) {
  const galleries = HALLS.slice(1, 8)
  const imageMap = new Map(images.map((image) => [image.id, image]))
  const collectionMap = new Map(collections.map((item) => [item.id, item]))
  const featured = FEATURED_SPECIES.map((id) => collectionMap.get(id)).filter(Boolean)
  const paragraphs = introParagraphs(page.body_markdown, 2)

  return (
    <div className="home-page">
      <section className="home-hero">
        <MuseumHeader overlay />
        <div className="hero-content">
          <h1>{firstHeading(page.body_markdown) || '水面之上，水面之下'}</h1>
          <div className="hero-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link className="primary-entry" to="/visit/prologue">
            进入博物馆 <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <a className="scroll-cue" href="#route-overview" aria-label="查看展览概览">
          <span>向下探索</span>
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="route-overview" id="route-overview">
        <div className="section-heading">
          <h2>一根线牵起万千故事</h2>
          <p>沿唯一参观路线，从钓的历史走到水边责任。每一厅都由真实材料、图像和仍然存在的问题构成。</p>
        </div>
        <ol className="gallery-list">
          {galleries.map((gallery, index) => (
            <li key={gallery.id}>
              <Link to={gallery.url}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{gallery.title}</strong>
                <p>{gallery.summary}</p>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="featured-collection">
        <div className="section-heading compact">
          <h2>开放馆藏</h2>
          <Link to="/visit/fish">查看806种鱼类标本</Link>
        </div>
        <div className="featured-grid">
          {featured.map((item) => {
            const image = imageMap.get(item.image_ids[0])
            return (
              <Link className="collection-card" to="/visit/fish" key={item.id}>
                <div className="collection-image">
                  {image ? (
                    <img src={imageUrl(image)} alt={cleanInlineText(image.title)} />
                  ) : null}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.metadata.scientific_name}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
````

## File: src/pages/HallPage.jsx

````jsx
import MuseumHeader from '../components/MuseumHeader.jsx'
import RoutePager from '../components/RoutePager.jsx'
import RouteProgress from '../components/RouteProgress.jsx'
import { adjacentHalls, hallById } from '../data/halls.js'
import AnglersHall from '../halls/AnglersHall.jsx'
import CultureHall from '../halls/CultureHall.jsx'
import EpilogueHall from '../halls/EpilogueHall.jsx'
import EthicsHall from '../halls/EthicsHall.jsx'
import FishHall from '../halls/FishHall.jsx'
import HistoryHall from '../halls/HistoryHall.jsx'
import PrologueHall from '../halls/PrologueHall.jsx'
import TackleHall from '../halls/TackleHall.jsx'
import TechniquesHall from '../halls/TechniquesHall.jsx'

const SCENES = {
  prologue: PrologueHall,
  history: HistoryHall,
  fish: FishHall,
  tackle: TackleHall,
  techniques: TechniquesHall,
  anglers: AnglersHall,
  culture: CultureHall,
  ethics: EthicsHall,
  epilogue: EpilogueHall,
}

export default function HallPage({ hallId, data }) {
  const hall = hallById(hallId)
  const Scene = SCENES[hallId]
  const { previous, next } = adjacentHalls(hallId)
  return (
    <div className={`hall-page hall-${hallId}`}>
      <MuseumHeader />
      <RouteProgress currentStage={hall.stage} />
      <Scene hall={hall} data={data} />
      <RoutePager previous={previous} next={next} />
    </div>
  )
}
````

## File: src/pages/NotFound.jsx

````jsx
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import MuseumHeader from '../components/MuseumHeader.jsx'

export default function NotFound() {
  return (
    <div className="not-found">
      <MuseumHeader />
      <main>
        <h1>这段水路还没有开放</h1>
        <p>当前地址没有对应的展厅或馆藏记录。</p>
        <Link to="/">
          <ArrowLeft aria-hidden="true" /> 回到博物馆首页
        </Link>
      </main>
    </div>
  )
}
````
