import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const [workspaceRoot, destination] = process.argv.slice(2)
if (!workspaceRoot || !destination) {
  throw new Error('Usage: build-exhibition-data.mjs <workspace-root> <destination>')
}

const libraryRoot = resolve(workspaceRoot, 'fishing_museum_reference_library_2026-07-11')
const fishRoot = resolve(libraryRoot, '01_fish_species_fishweather')
const baikeRoot = resolve(libraryRoot, '02_fishing_baike_iq3344')
const contentRoot = resolve(workspaceRoot, 'content', 'fishing-laos-3.0')
const dataDestination = resolve(destination, 'data')
const referenceDestination = resolve(destination, 'reference')

mkdirSync(dataDestination, { recursive: true })
mkdirSync(referenceDestination, { recursive: true })

const fish = JSON.parse(readFileSync(resolve(fishRoot, 'index.json'), 'utf8')).map((item) => ({
  ...item,
  image_url: item.local_images?.fish?.[0]
    ? `/content/reference/fish/${item.local_images.fish[0]}`
    : null,
}))

const baike = JSON.parse(readFileSync(resolve(baikeRoot, 'index.json'), 'utf8')).map((item) => {
  const articlePath = resolve(baikeRoot, item.local_dir, 'article.md')
  const article = readFileSync(articlePath, 'utf8').replace(/^---[\s\S]*?---\s*/, '')
  return {
    ...item,
    body_markdown: article,
    image_urls_local: (item.local_images ?? []).map(
      (path) => `/content/reference/baike/${path}`,
    ),
  }
})

const timelineMarkdown = readFileSync(
  resolve(contentRoot, 'route', '02-origins', '07-timeline-node-copy.md'),
  'utf8',
)
const timelineHeadings = [...timelineMarkdown.matchAll(/^## (TL-\d+)｜(.+)$/gm)]
const timeline = timelineHeadings.map(
  (heading, index) => {
    const [, id, title] = heading
    const start = heading.index + heading[0].length
    const end = timelineHeadings[index + 1]?.index ?? timelineMarkdown.length
    const block = timelineMarkdown.slice(start, end)
    const field = (label) => block.match(new RegExp(`^- ${label}：(.+)$`, 'm'))?.[1]?.trim() ?? ''
    return {
      id,
      title: title.trim(),
      period: field('时段'),
      theme: field('主题'),
      status: field('事实身份'),
      summary: field('展示摘要'),
      detail: field('完整文案'),
      image: field('图片'),
    }
  },
)

writeFileSync(resolve(dataDestination, 'fish-library.json'), JSON.stringify(fish))
writeFileSync(resolve(dataDestination, 'baike-library.json'), JSON.stringify(baike))
writeFileSync(resolve(dataDestination, 'history-timeline.json'), JSON.stringify(timeline, null, 2))

cpSync(resolve(fishRoot, 'by_family'), resolve(referenceDestination, 'fish', 'by_family'), {
  recursive: true,
})
cpSync(resolve(baikeRoot, 'by_category'), resolve(referenceDestination, 'baike', 'by_category'), {
  recursive: true,
})

console.log(`Added ${fish.length} fish, ${baike.length} encyclopedia records and ${timeline.length} timeline nodes.`)
