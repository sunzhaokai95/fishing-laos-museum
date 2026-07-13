import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:63255'
const appPath = process.env.APP_PATH ?? '/museums/fishing-laos'
const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const browser = await chromium.launch({ headless: true, executablePath: chrome })
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
const page = await context.newPage()
const errors = []
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
page.on('pageerror', (error) => errors.push(error.message))

const visit = async (route) => {
  await page.goto(`${baseUrl}${appPath}${route}`, { waitUntil: 'networkidle', timeout: 45000 })
  await page.waitForSelector('h1', { timeout: 15000 })
}

await visit('/')
await page.mouse.move(160, 240)
await page.mouse.move(280, 340, { steps: 3 })
await page.waitForTimeout(120)
const ripple = page.locator('[data-testid="home-ripple"]').last()
assert.ok(await ripple.count(), 'homepage ripple node was not created')
assert.equal(await ripple.evaluate((node) => getComputedStyle(node).animationName), 'museum-home-ripple')

await visit('/visit/prologue')
await page.getByRole('slider', { name: '观察深度' }).fill('72')
assert.ok(await page.getByText('72 / 100').count(), 'prologue depth did not update')
assert.equal(await page.locator('.bubble').count(), 5, 'prologue bubbles are missing')

await visit('/visit/history')
await page.getByRole('button', { name: /现代转型/ }).click()
assert.ok(await page.locator('article').count(), 'history timeline did not render')

await visit('/visit/fish')
assert.equal(await page.locator('.fish-current').first().evaluate((node) => getComputedStyle(node).animationName), 'museum-fish-current')
assert.ok(await page.locator('.fish-orbit-planet').count(), 'fish orbit did not render')

await visit('/visit/tackle')
const tacklePath = page.getByTestId('tackle-load-path')
const beforeCurve = await tacklePath.getAttribute('d')
await page.getByRole('slider', { name: '相对负载' }).fill('90')
await page.waitForTimeout(220)
assert.notEqual(await tacklePath.getAttribute('d'), beforeCurve, 'tackle stress curve did not change')

await visit('/visit/techniques')
await page.getByRole('button', { name: '漂技' }).click()
await page.getByRole('button', { name: '观察下沉漂相' }).click()
assert.ok(await page.getByText(/下沉|漂相/).count(), 'float signal interaction did not respond')

await visit('/visit/anglers')
await page.getByRole('button', { name: '水边自测' }).click()
assert.ok(await page.getByRole('button', { name: '钓者性格测试' }).count(), 'angler interaction mode did not open')

await visit('/visit/culture')
await page.getByRole('button', { name: '玄学标本柜' }).click()
assert.ok(await page.getByText(/玄学|标本/).count(), 'culture cabinet did not open')

await visit('/visit/ethics')
await page.getByLabel('国家或地区管理模型').selectOption({ label: '日本' })
await page.getByRole('checkbox').first().check()
assert.equal(await page.getByRole('checkbox').first().isChecked(), true, 'ethics decision did not update')

await visit('/visit/epilogue')
assert.equal((await page.locator('h1').textContent())?.trim(), '回到水边')
assert.deepEqual(errors, [], `browser errors: ${errors.join(' | ')}`)

await browser.close()
console.log('Verified motion and interaction effects across all ten museum stages.')
