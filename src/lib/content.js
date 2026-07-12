import { withBasePath } from './publicPath.js'

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
    return `${open}${withBasePath(new URL(path, base).pathname)}${close}`
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
  return image?.local_path ? withBasePath(`/content/${image.local_path}`) : null
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
