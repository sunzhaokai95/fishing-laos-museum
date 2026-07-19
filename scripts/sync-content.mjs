import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const mainProjectRoot = resolveMainProjectRoot()
const workspaceRoot = resolve(process.env.FISHING_MUSEUM_WORKSPACE_ROOT || mainProjectRoot, '..')
const contentRoot = process.env.FISHING_MUSEUM_CONTENT_ROOT
  ? resolve(process.env.FISHING_MUSEUM_CONTENT_ROOT)
  : resolve(workspaceRoot, 'content', 'fishing-laos-3.0')
const destination = resolve(projectRoot, 'public', 'content')

function resolveMainProjectRoot() {
  try {
    const commonGitDir = execFileSync('git', ['rev-parse', '--path-format=absolute', '--git-common-dir'], {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return dirname(commonGitDir)
  } catch {
    return projectRoot
  }
}

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
