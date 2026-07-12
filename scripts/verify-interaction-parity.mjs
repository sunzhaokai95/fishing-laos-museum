import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:63255'
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const outputDir = path.resolve('.design/gemini-parity-audit/screenshots')
const routes = [
  ['00-home', '/'], ['01-prologue', '/visit/prologue'], ['02-history', '/visit/history'],
  ['03-fish', '/visit/fish'], ['04-tackle', '/visit/tackle'], ['05-techniques', '/visit/techniques'],
  ['06-anglers', '/visit/anglers'], ['07-culture', '/visit/culture'], ['08-ethics', '/visit/ethics'],
  ['09-epilogue', '/visit/epilogue'],
]
const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['tablet', { width: 768, height: 1024 }],
  ['mobile', { width: 390, height: 844 }],
]

await mkdir(outputDir, { recursive: true })
const browser = await chromium.launch({ headless: true, executablePath: chrome })
const failures = []
const results = []

async function interact(page, route) {
  if (route === '/visit/prologue') await page.getByRole('slider', { name: '观察深度' }).fill('72')
  if (route === '/visit/history') await page.getByRole('button', { name: /现代转型/ }).click()
  if (route === '/visit/fish') { await page.getByRole('button', { name: /观察鱼种/ }).first().evaluate((element) => element.click()); await page.keyboard.press('Escape') }
  if (route === '/visit/tackle') await page.getByRole('slider', { name: '相对负载' }).fill('90')
  if (route === '/visit/techniques') { await page.getByRole('button', { name: '漂技' }).click(); await page.getByRole('button', { name: '观察下沉漂相' }).click() }
  if (route === '/visit/anglers') await page.getByRole('button', { name: '水边自测' }).click()
  if (route === '/visit/culture') await page.getByRole('button', { name: '玄学标本柜' }).click()
  if (route === '/visit/ethics') { await page.getByLabel('国家或地区管理模型').selectOption({ label: '日本' }); await page.getByRole('checkbox').first().check() }
}

for (const [viewportName, viewport] of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: viewportName === 'tablet' ? 'reduce' : 'no-preference' })
  for (const [name, route] of routes) {
    const page = await context.newPage()
    const consoleErrors = []
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
    page.on('pageerror', (error) => consoleErrors.push(error.message))
    try {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle', timeout: 45000 })
      await page.waitForSelector('h1', { timeout: 15000 })
      await page.waitForTimeout(350)
      const audit = await page.evaluate(() => ({
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelector('h1')?.textContent?.trim() || '',
        brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
      }))
      if (audit.scrollWidth > audit.width + 1) failures.push(`${viewportName} ${route}: horizontal overflow ${audit.scrollWidth - audit.width}px`)
      if (audit.brokenImages.length) failures.push(`${viewportName} ${route}: ${audit.brokenImages.length} broken images`)
      if (consoleErrors.length) failures.push(`${viewportName} ${route}: console errors: ${consoleErrors.join(' | ')}`)
      await page.screenshot({ path: path.join(outputDir, `final-${name}-${viewportName}.png`), animations: 'disabled' })
      await interact(page, route)
      await page.waitForTimeout(220)
      if (viewportName === 'desktop') await page.screenshot({ path: path.join(outputDir, `final-${name}-interactive.png`), animations: 'disabled' })
      results.push({ viewport: viewportName, route, h1: audit.h1, overflow: audit.scrollWidth - audit.width, brokenImages: audit.brokenImages.length, consoleErrors: consoleErrors.length })
    } catch (error) {
      failures.push(`${viewportName} ${route}: ${error.message}`)
    } finally {
      await page.close()
    }
  }
  await context.close()
}

await browser.close()
await writeFile(path.resolve('.design/gemini-parity-audit/parity-results.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), baseUrl, results, failures }, null, 2)}\n`)
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`Verified ${results.length} route and viewport combinations with no automated parity failures.`)
}
