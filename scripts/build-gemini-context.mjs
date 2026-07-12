import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const outputDir = path.join(root, 'gemini-context')

const groups = [
  {
    output: '01_ARCHITECTURE_AND_DATA.md',
    title: 'Architecture And Data Context',
    files: [
      'GEMINI_DESIGN_BRIEF.md',
      'package.json',
      'DESIGN.md',
      'PRODUCT.md',
      'src/App.jsx',
      'src/main.jsx',
      'src/hooks/useMuseumData.js',
      'src/data/halls.js',
      'src/lib/content.js',
      'src/lib/exhibition.js',
    ],
  },
  {
    output: '02_SHARED_UI_AND_STYLES.md',
    title: 'Shared UI And Styles Context',
    files: [
      'src/index.css',
      'src/App.css',
      'src/editorial.css',
      'src/components/MuseumHeader.jsx',
      'src/components/RouteProgress.jsx',
      'src/components/RoutePager.jsx',
      'src/components/ObjectDrawer.jsx',
      'src/pages/HomePage.jsx',
      'src/pages/HallPage.jsx',
      'src/pages/NotFound.jsx',
    ],
  },
  {
    output: '03_HALLS_AND_CURATED_DATA.md',
    title: 'Hall Components And Curated Data Context',
    files: [
      'src/halls/PrologueHall.jsx',
      'src/halls/HistoryHall.jsx',
      'src/halls/FishHall.jsx',
      'src/halls/TackleHall.jsx',
      'src/halls/TechniquesHall.jsx',
      'src/halls/AnglersHall.jsx',
      'src/halls/CultureHall.jsx',
      'src/halls/EthicsHall.jsx',
      'src/halls/EpilogueHall.jsx',
      'src/data/history.js',
      'src/data/techniques.js',
      'src/data/people.js',
      'src/data/ethics.js',
    ],
  },
]

const languageFor = (file) => {
  if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.mjs')) return 'jsx'
  if (file.endsWith('.css')) return 'css'
  if (file.endsWith('.json')) return 'json'
  return 'markdown'
}

await mkdir(outputDir, { recursive: true })

for (const group of groups) {
  const sections = []
  for (const file of group.files) {
    const content = await readFile(path.join(root, file), 'utf8')
    const fence = '````'
    sections.push(`## File: ${file}\n\n${fence}${languageFor(file)}\n${content.trimEnd()}\n${fence}\n`)
  }

  const document = [
    `# ${group.title}`,
    '',
    '> Generated from the current repository. Treat every file path and implementation below as real project context. Do not replace data flows with mock data.',
    '',
    ...sections,
  ].join('\n')

  await writeFile(path.join(outputDir, group.output), document, 'utf8')
}

console.log(`Generated ${groups.length} Gemini context files in ${outputDir}`)
