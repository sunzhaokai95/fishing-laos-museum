# 发送给 Gemini 的代码任务提示词

我现在给你提供的不是 ZIP，也不是需要你抓取的 GitHub 页面，而是10个可以直接解析的UTF-8纯文本文件。

代码与任务上下文：

1. `01_ARCHITECTURE_AND_DATA.md`
2. `02_SHARED_UI_AND_STYLES.md`
3. `03_HALLS_AND_CURATED_DATA.md`

完整生产数据：

4. `route-pages.json`
5. `collection-items.json`
6. `history-timeline.json`
7. `baike-library.json`
8. `fish-library.json`
9. `images.json`

第10个文件是本提示词 `00_SEND_THIS_PROMPT.md`。

3个Markdown文件已经按真实路径嵌入当前 React、CSS、公共组件、九个展厅组件和策展数据代码。6个JSON文件是当前网站实际加载的完整前台数据，其中包括806种鱼、百科、馆藏、31个历史节点、路线文案和图片索引。请先完整读取全部10个文件，再开始工作。

这些JSON是不可改写的内容契约。你负责修改组件、布局和CSS，使页面正确呈现这些数据；不得重写、压缩、删减或在组件中复制这些内容。

## 你的任务

你不是只做视觉图片或设计说明。你需要基于这些真实文件，为“钓鱼佬博物馆”编写可以交给 Codex 直接整合的 React 与 CSS 页面代码。

必须遵守上下文中的 `GEMINI_DESIGN_BRIEF.md`、`DESIGN.md` 和 `PRODUCT.md`。不得改变唯一参观路线、真实数据管线、806种鱼、31个历史节点、21项技法、六类人物身份以及法规与环境内容。

## 代码要求

- 使用现有 React 19、React Router、Vite、Lucide React 和普通 CSS。
- 使用上下文中真实的组件名、属性、数据字段和文件路径。
- 保留 `useMuseumData`、搜索、筛选、渐进加载、抽屉、时间轴展开、分类切换、上一厅、下一厅和旧链接兼容。
- 不得创建 `mockFishData`，不得把真实数据复制成组件内硬编码数组。
- 不得修改6个生产JSON的内容。任何新界面都必须继续通过现有数据管线读取它们。
- 不得输出单文件 HTML。
- 不得使用随机外链图片。
- 不得加入第三方设计工作室署名。
- 不得省略代码，不得使用“其余不变”“其余同上”或 `// ...` 代替实现。
- 新增依赖前必须说明理由；优先使用现有依赖和 CSS。
- 兼容 1440×900 和 390×844，保留键盘焦点、Escape关闭抽屉和降低动态模式。

## 交付方式

整站代码不允许压缩成一次不完整回答。请按以下批次连续交付，每一批都使用真实文件路径并提供完整文件代码：

### 第一批：全局系统与公共框架

- 视觉诊断和不超过600字的视觉总方向；
- 全局设计变量、基础排版、动效语法和响应式规则；
- `src/index.css`；
- `src/editorial.css`；
- 需要修改的公共组件；
- 首页框架和唯一路线导航。

### 第二批：首页、序厅、历史厅和鱼类厅

- `src/pages/HomePage.jsx`；
- `src/halls/PrologueHall.jsx`；
- `src/halls/HistoryHall.jsx`；
- `src/halls/FishHall.jsx`；
- 对应CSS和交互说明。

### 第三批：钓具厅、技法厅和人物厅

- `src/halls/TackleHall.jsx`；
- `src/halls/TechniquesHall.jsx`；
- `src/halls/AnglersHall.jsx`；
- 对应CSS和交互说明。

### 第四批：文化厅、法规厅、尾厅和总验收

- `src/halls/CultureHall.jsx`；
- `src/halls/EthicsHall.jsx`；
- `src/halls/EpilogueHall.jsx`；
- 最终CSS补充；
- 依赖说明；
- 响应式、无障碍和Codex整合检查表。

先输出第一批。完成第一批后停止，等待我回复“继续第二批”。不要提前压缩后续代码。
