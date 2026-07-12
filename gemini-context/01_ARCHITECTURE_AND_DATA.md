# Architecture And Data Context

> Generated from the current repository. Treat every file path and implementation below as real project context. Do not replace data flows with mock data.

## File: GEMINI_DESIGN_BRIEF.md

````markdown
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
````

## File: package.json

````json
{
  "name": "fishing-laos-3.0-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "sync:content": "node scripts/sync-content.mjs",
    "predev": "pnpm sync:content",
    "dev": "vite",
    "prebuild": "pnpm sync:content",
    "build": "vite build",
    "lint": "oxlint",
    "test": "vitest run",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^1.24.0",
    "marked": "^18.0.6",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "jsdom": "^29.1.1",
    "oxlint": "^1.71.0",
    "playwright": "^1.61.1",
    "vite": "^8.1.1",
    "vitest": "^4.1.10"
  }
}
````

## File: DESIGN.md

````markdown
# Design System

## Direction

这是一座沿唯一参观路线展开的线上博物馆。视觉从数据看板转向编辑式数字叙事：中性纸白承载内容，墨色建立阅读秩序，朱红只标记钓线、节点、当前状态和需要注意的判断。水的存在不依靠蓝色面板，而由缓慢位移、浮漂等待、图像显色和细线张力表达。

## Palette

```css
--color-bg: oklch(0.985 0 0);
--color-surface: oklch(0.95 0.006 220);
--color-ink: oklch(0.19 0.012 240);
--color-muted: oklch(0.48 0.012 230);
--color-vermilion: oklch(0.58 0.19 34);
--color-vermilion-dark: oklch(0.47 0.17 33);
--color-water: oklch(0.58 0.035 220);
--color-line: oklch(0.8 0.008 230);
```

纸白保持中性，不使用米黄主题。朱红不承担大面积背景；水灰只用于材料底面、涟漪和次级信息。

## Typography

- 展厅题名、对象名和叙事标题使用宋体系统，常规字重与正常字距。
- 正文和控件使用 Helvetica Neue、苹方或系统黑体。
- 大标题只出现在首页、序厅、尾厅和展厅开场；器物、卡片、筛选器内保持紧凑尺度。
- 正文行高 1.75–2，内容完整显示；不以省略号替代关键展览文本。

## Museum Frame

- 首页只有一个“进入博物馆”入口。
- 1100px 以上，唯一参观路线固定在左侧，以一根细线串联序厅、01–07 和尾厅。
- 移动端路线横向滚动，结构和顺序不变，不引入参观时长或分支路线。
- 顶栏保持轻薄，展厅开场使用纸白、留白和边界线，不使用深色数据面板。
- 上一厅／下一厅、旧链接兼容、搜索、筛选、抽屉和 Escape 关闭逻辑保持不变。

## Hall Languages

- 序厅／尾厅：短文置于水边图像与纸白遮罩之间，以轻微失焦归位进入。
- 第一展厅：31 个节点沿纵向钓线展开；节点像线结，图像由灰度缓慢恢复原色。
- 第二展厅：806 种鱼形成无外框标本场；图片高低错落，悬停显色，详情在厅内侧抽屉打开。
- 第三展厅：器物以拆解台和线性清单呈现；漂、线、轮和钩的示意使用材料灰底。
- 第四展厅：饵技、竿技、漂技、鱼技以分镜式阅读展开；浮漂装置承担等待和信号演示。
- 第五展厅：六类身份使用不等宽编辑排版和人物图像，不做等尺寸人物卡片墙。
- 第六展厅：诗画典故、语言和玄学各自采用不同密度的文化柜阅读节奏。
- 第七展厅：规则历史、地区管理模型和钓获后的五项判断分成三种文献布局。

## Motion

- 动效曲线统一为 `cubic-bezier(0.25, 1, 0.5, 1)`，模拟水体滞后感。
- 动效只用于线的呼吸、浮漂等待、节点展开、图像显色和抽屉进入。
- 动画不控制内容是否可见；`prefers-reduced-motion: reduce` 下全部关闭。

## Responsive And Accessibility

- 验收视口：1440×900 与 390×844。
- 390px 下鱼类两列，筛选器按搜索、双列选项、单列选项换行；无横向溢出。
- 交互元素保留语义化按钮、导航、详情和对话框；焦点样式、键盘操作、Escape 关闭抽屉继续有效。
- 所有标题与按钮文字允许自然换行，不使用负字距，不让动态内容改变稳定布局尺寸。
````

## File: PRODUCT.md

````markdown
# Product

## Register

brand

## Platform

web

## Users

主要观众是希望理解钓鱼历史、鱼类生态、器物、技法与文化的中文公众和钓鱼爱好者，也包括家庭观众与需要查阅来源的研究型读者。用户进入后沿一条连续路线参观，不需要先选择路线或估算时间。

## Product Purpose

钓鱼佬博物馆是一座持续生长的线上博物馆。它用完整策展叙事、开放馆藏和可追溯来源，把钓鱼从“技巧与鱼获”扩展为人与鱼、水域、器物、历史、语言和责任共同构成的文化现场。成功意味着观众能顺畅完成连续参观，并随时理解一项判断的来源和不确定性。

## Positioning

从一根穿过水面的钓线出发，看见钓鱼背后的整个世界。

## Conversion & proof

- 主要操作：进入博物馆并开始唯一参观路线。
- 次要入口：开放馆藏、研究与来源。
- 十秒记忆：水面之上，水面之下。
- 信任依据：121 个正式内容页面、来源总账、图片权利状态、逐页发布审计与明确保留的未决问题。

## Brand Personality

沉静、敏锐、有依据。界面应让人感到临近真实水面，同时保持博物馆展签的清楚与克制；不卖弄知识，不把不确定性包装成答案。

## Anti-references

不做钓具商城、百科卡片墙、游戏任务界面、海洋馆幻想、户外旅游落地页或仿古卷轴。拒绝路线选择、参观时长、积分、QTE、奖章和“爆护”式成功叙事。

## Design Principles

1. 唯一参观路线始终可见，前后移动稳定明确。
2. 真实内容先于装饰；图片、图注、来源和权利状态共同出现。
3. 长文保持适宜阅读宽度，摘要不覆盖完整正文。
4. 水线是贯穿全站的空间结构，不是重复装饰。
5. 失败、缺图和待考状态保持可见。

## Accessibility & Inclusion

键盘可完成全部导航；正文、图注和控件保持可读对比；不依赖颜色表达路线或审核状态；动效支持减少动态；移动端不缩小长文，而是重组证据侧栏和导航。
````

## File: src/App.jsx

````jsx
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import useMuseumData from './hooks/useMuseumData.js'
import { legacyHallUrl } from './lib/exhibition.js'
import HallPage from './pages/HallPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'
import './editorial.css'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function LegacyResolver() {
  const { pathname } = useLocation()
  const destination = legacyHallUrl(pathname)
  return destination && destination !== pathname ? <Navigate to={destination} replace /> : <NotFound />
}

export default function App() {
  const { data, error } = useMuseumData()

  if (error) {
    return (
      <main className="load-state" role="alert">
        <h1>内容没有加载完成</h1>
        <p>{error.message}</p>
        <button type="button" onClick={() => window.location.reload()}>
          重新加载
        </button>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="load-state" aria-live="polite">
        <span className="loading-line" aria-hidden="true" />
        <p>正在打开博物馆</p>
      </main>
    )
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage page={data['route-pages'][0]} collections={data['collection-items']} images={data.images} />} />
        <Route path="/visit/prologue" element={<HallPage hallId="prologue" data={data} />} />
        <Route path="/visit/history" element={<HallPage hallId="history" data={data} />} />
        <Route path="/visit/fish" element={<HallPage hallId="fish" data={data} />} />
        <Route path="/visit/tackle" element={<HallPage hallId="tackle" data={data} />} />
        <Route path="/visit/techniques" element={<HallPage hallId="techniques" data={data} />} />
        <Route path="/visit/anglers" element={<HallPage hallId="anglers" data={data} />} />
        <Route path="/visit/culture" element={<HallPage hallId="culture" data={data} />} />
        <Route path="/visit/ethics" element={<HallPage hallId="ethics" data={data} />} />
        <Route path="/visit/epilogue" element={<HallPage hallId="epilogue" data={data} />} />
        <Route path="/collection/species/*" element={<Navigate to="/visit/fish" replace />} />
        <Route path="/collection/objects/*" element={<Navigate to="/visit/tackle" replace />} />
        <Route path="/collection/techniques/*" element={<Navigate to="/visit/techniques" replace />} />
        <Route path="/collection/people/*" element={<Navigate to="/visit/anglers" replace />} />
        <Route path="/collection/works/*" element={<Navigate to="/visit/culture" replace />} />
        <Route path="/collection/folklore/*" element={<Navigate to="/visit/culture" replace />} />
        <Route path="*" element={<LegacyResolver />} />
      </Routes>
    </>
  )
}
````

## File: src/main.jsx

````jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
````

## File: src/hooks/useMuseumData.js

````jsx
import { useEffect, useState } from 'react'

const DATA_FILES = [
  'route-pages',
  'collection-items',
  'images',
  'fish-library',
  'baike-library',
  'history-timeline',
]

export default function useMuseumData() {
  const [state, setState] = useState({ data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()
    Promise.all(
      DATA_FILES.map(async (name) => {
        const response = await fetch(`/content/data/${name}.json`, {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error(`无法读取 ${name}.json`)
        return [name, await response.json()]
      }),
    )
      .then((entries) => {
        setState({ data: Object.fromEntries(entries), error: null })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error })
      })
    return () => controller.abort()
  }, [])

  return state
}
````

## File: src/data/halls.js

````jsx
export const HALLS = [
  { id: 'prologue', stage: '序厅', url: '/visit/prologue', title: '水面之下', summary: '从一片看似平静的水面开始。' },
  { id: 'history', stage: '01', url: '/visit/history', title: '从生存到垂钓', summary: '沿中国钓鱼史的时间河流，看工具、身份和意义如何变化。' },
  { id: 'fish', stage: '02', url: '/visit/fish', title: '鱼各有其水', summary: '806种鱼进入不同水层、食物关系和生活环境。' },
  { id: 'tackle', stage: '03', url: '/visit/tackle', title: '手中的水下仪器', summary: '钩、线、竿、轮、漂、坠与饵共同组成感知系统。' },
  { id: 'techniques', stage: '04', url: '/visit/techniques', title: '读懂看不见的鱼', summary: '饵技、竿技、漂技和鱼技，是动作与判断的组合。' },
  { id: 'anglers', stage: '05', url: '/visit/anglers', title: '谁坐在水边', summary: '同一根竿背后，是不同身份、处境与生活。' },
  { id: 'culture', stage: '06', url: '/visit/culture', title: '鱼不只活在水里', summary: '鱼进入诗画、隐喻、行话、吉祥想象与民间信念。' },
  { id: 'ethics', stage: '07', url: '/visit/ethics', title: '钓获之后', summary: '规则、鱼的处境与水域环境，从鱼离水的那一刻同时开始。' },
  { id: 'epilogue', stage: '尾厅', url: '/visit/epilogue', title: '回到水边', summary: '带着新的观察方式，重新看一片水。' },
]

export function hallById(id) {
  return HALLS.find((hall) => hall.id === id)
}

export function hallByUrl(url) {
  return HALLS.find((hall) => hall.url === url)
}

export function adjacentHalls(id) {
  const index = HALLS.findIndex((hall) => hall.id === id)
  return { previous: HALLS[index - 1], next: HALLS[index + 1] }
}
````

## File: src/lib/content.js

````jsx
const STAGE_MAP = new Map([
  ['home', '首页'],
  ['prologue', '序厅'],
  ['01-prologue', '序厅'],
  ['02-origins', '01'],
  ['03-fish-and-waters', '02'],
  ['04-tackle', '03'],
  ['05-techniques', '04'],
  ['06-anglers', '05'],
  ['07-imaginations', '06'],
  ['08-ethics', '07'],
  ['09-epilogue', '尾厅'],
])

const CHINESE_STAGE = new Map([
  ['01', '第一展厅'],
  ['02', '第二展厅'],
  ['03', '第三展厅'],
  ['04', '第四展厅'],
  ['05', '第五展厅'],
  ['06', '第六展厅'],
  ['07', '第七展厅'],
])

const PUBLICATION_LABELS = {
  research_candidate: '公开权待核',
  rights_pending: '发布许可待确认',
  generated_reference: '项目示意图',
  licensed: '已授权',
  public_domain: '公版',
}

function normalizeUrl(url) {
  if (!url || url === '/') return '/'
  return url.replace(/\/+$/, '')
}

export function findRouteByUrl(routes, url) {
  const target = normalizeUrl(url)
  return routes.find((route) => normalizeUrl(route.url) === target)
}

export function findCollectionByUrl(items, url) {
  const target = normalizeUrl(url)
  return items.find((item) => normalizeUrl(item.url) === target)
}

export function galleryStage(page) {
  return STAGE_MAP.get(page?.gallery) ?? ''
}

export function galleryKicker(page) {
  const stage = galleryStage(page)
  return CHINESE_STAGE.get(stage) ?? stage
}

export function rewriteAssetPaths(markdown, sourceFile) {
  const base = new URL(`/content/${sourceFile}`, 'https://museum.local')
  return markdown.replace(/(!\[[^\]]*\]\()([^)]+)(\))/g, (match, open, path, close) => {
    if (/^(?:https?:|data:)/.test(path)) return match
    return `${open}${new URL(path, base).pathname}${close}`
  })
}

export function firstHeading(markdown, level = 2) {
  const marker = '#'.repeat(level)
  const match = markdown.match(new RegExp(`^${marker}\\s+(.+)$`, 'm'))
  return match?.[1]?.replace(/\*+/g, '') ?? ''
}

export function introParagraphs(markdown, limit = 2) {
  return markdown
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(
      (block) =>
        block &&
        !block.startsWith('#') &&
        !block.startsWith('![') &&
        !block.startsWith('- ') &&
        !block.startsWith('**'),
    )
    .slice(0, limit)
    .map((block) => block.replace(/\*\*/g, ''))
}

export function imageUrl(image) {
  return image?.local_path ? `/content/${image.local_path}` : null
}

export function cleanInlineText(text = '') {
  return text.replace(/[*_`]+/g, '').trim()
}

export function publicationLabel(status) {
  return PUBLICATION_LABELS[status] ?? status
}

export function rewriteEditorialTerms(markdown = '') {
  return Object.entries(PUBLICATION_LABELS).reduce(
    (content, [status, label]) => content.replaceAll(status, label),
    markdown,
  )
}
````

## File: src/lib/exhibition.js

````jsx
const LEGACY_HALLS = [
  ['/visit/origins', '/visit/history'],
  ['/visit/fish-and-waters', '/visit/fish'],
  ['/visit/tackle', '/visit/tackle'],
  ['/visit/techniques', '/visit/techniques'],
  ['/visit/anglers', '/visit/anglers'],
  ['/visit/imaginations', '/visit/culture'],
  ['/visit/ethics', '/visit/ethics'],
]

export function filterFish(fish, filters) {
  const query = filters.query.trim().toLocaleLowerCase('zh-CN')
  return fish.filter((item) => {
    const searchable = [item.name, item.scientific_name, item.aliases]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('zh-CN')
    return (
      (!query || searchable.includes(query)) &&
      (!filters.family || item.fields?.科 === filters.family) &&
      (!filters.layer || item.fields?.水层?.includes(filters.layer)) &&
      (!filters.diet || item.fields?.食性?.includes(filters.diet))
    )
  })
}

export function legacyHallUrl(pathname) {
  return LEGACY_HALLS.find(([prefix]) => pathname.startsWith(prefix))?.[1] ?? null
}

export function normalizeCategory(category) {
  if (category === '渔具配件') return '钓具'
  if (category === '饵料鱼饵') return '饵料'
  if (category === '钓鱼达人') return '人物'
  if (category === '常说词汇') return '术语'
  if (category === '看图识鱼') return '鱼类'
  return category
}

export function uniqueValues(items, accessor) {
  return [...new Set(items.map(accessor).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'zh-CN'),
  )
}
````
