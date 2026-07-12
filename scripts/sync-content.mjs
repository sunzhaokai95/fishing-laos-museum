import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspaceRoot = resolve(projectRoot, '..')
const contentRoot = resolve(projectRoot, '..', 'content', 'fishing-laos-3.0')
const destination = resolve(projectRoot, 'public', 'content')

execFileSync(
  'python3',
  [resolve(contentRoot, 'tools', 'build_content_data.py'), '--content-root', contentRoot],
  { stdio: 'inherit' },
)

rmSync(destination, { recursive: true, force: true })
mkdirSync(destination, { recursive: true })
cpSync(resolve(contentRoot, 'data', 'generated'), resolve(destination, 'data'), {
  recursive: true,
})
cpSync(resolve(contentRoot, 'assets'), resolve(destination, 'assets'), {
  recursive: true,
})

execFileSync(
  process.execPath,
  [resolve(projectRoot, 'scripts', 'build-exhibition-data.mjs'), workspaceRoot, destination],
  { stdio: 'inherit' },
)

console.log('Synced museum data and assets to public/content.')
