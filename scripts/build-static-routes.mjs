import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUTPUT = new URL('../dist/', import.meta.url)
const outputPath = fileURLToPath(OUTPUT)
const template = await readFile(new URL('index.html', OUTPUT), 'utf8')

const routes = [
  ['', '钓鱼佬博物馆', '从一根钓线进入人与鱼、水域、器物和文化共同构成的世界。'],
  ['visit/prologue', '水面之下｜钓鱼佬博物馆', '从一片看似平静的水面开始线上博物馆的唯一参观路线。'],
  ['visit/history', '从生存到垂钓｜钓鱼佬博物馆', '沿三十一个节点阅读中国钓鱼史中的器物、图像、身份与观念。'],
  ['visit/fish', '鱼各有其水｜钓鱼佬博物馆', '检索八百零六种鱼的科属、水层、食性、栖息环境与钓获难度。'],
  ['visit/tackle', '手中的水下仪器｜钓鱼佬博物馆', '观察钩、线、竿、轮、漂、坠和饵构成的感知与受力系统。'],
  ['visit/techniques', '读懂看不见的鱼｜钓鱼佬博物馆', '以饵技、竿技、漂技和鱼技理解垂钓中的动作、条件与误判。'],
  ['visit/anglers', '谁坐在水边｜钓鱼佬博物馆', '从六类身份观察不同的人为何来到水边。'],
  ['visit/culture', '鱼不只活在水里｜钓鱼佬博物馆', '阅读鱼在诗画、语言、隐喻与民间信念中的文化生命。'],
  ['visit/ethics', '钓获之后｜钓鱼佬博物馆', '比较规则、鱼体处置、钓具遗留与水域环境中的责任。'],
  ['visit/epilogue', '回到水边｜钓鱼佬博物馆', '带着新的观察方式，重新看一片水。'],
]

const legacyRoutes = [
  'visit/origins',
  'visit/origins/prehistoric-fishing',
  'visit/fish-and-waters',
  'visit/imaginations',
  'collection/species',
  'collection/objects',
  'collection/techniques',
  'collection/people',
  'collection/works',
  'collection/folklore',
]

function pageHtml(title, description) {
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
}

for (const [route, title, description] of routes) {
  if (!route) continue
  const directory = join(outputPath, route)
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), pageHtml(title, description))
}

for (const route of legacyRoutes) {
  const directory = join(outputPath, route)
  await mkdir(directory, { recursive: true })
  await copyFile(new URL('index.html', OUTPUT), join(directory, 'index.html'))
}

await copyFile(new URL('index.html', OUTPUT), new URL('404.html', OUTPUT))
await writeFile(new URL('legacy-entry.html', OUTPUT), `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=/museums/fishing-laos/" />
    <meta name="robots" content="noindex" />
    <title>正在进入钓鱼佬博物馆</title>
    <script>location.replace('/museums/fishing-laos/' + location.search + location.hash)</script>
  </head>
  <body><a href="/museums/fishing-laos/">进入钓鱼佬博物馆</a></body>
</html>
`)
console.log(`Generated ${routes.length - 1} museum pages and ${legacyRoutes.length} legacy entries.`)
