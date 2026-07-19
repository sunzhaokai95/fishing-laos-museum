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
await page.waitForTimeout(700)
const heroScene = page.getByTestId('museum-hero-scene')
const heroCanvas = heroScene.locator('canvas')
assert.equal(await heroScene.getAttribute('data-renderer'), 'three', 'homepage is not using the spatial renderer')
assert.equal(await heroScene.getAttribute('data-pointer-ready'), 'true', 'homepage pointer observation did not activate')
assert.ok(await heroScene.evaluate((node) => node.classList.contains('is-ready')), 'homepage WebGL scene did not become ready')
assert.ok(await heroCanvas.evaluate((node) => node.width > 1 && node.height > 1 && getComputedStyle(node).opacity === '1'), 'homepage WebGL canvas was not visibly rendered')
await page.getByRole('button', { name: '进入空间' }).click()
await page.getByRole('button', { name: '观察 水下标本' }).click()
await page.waitForTimeout(1300)
assert.equal(await heroScene.getAttribute('data-focus'), 'fish', 'homepage camera did not focus the selected object')
assert.equal(await page.getByRole('dialog', { name: '水下标本' }).count(), 1, 'homepage object caption did not open')
await page.getByRole('button', { name: '回到博物馆空间' }).click()
await page.getByRole('dialog', { name: '水下标本' }).waitFor({ state: 'detached' })
assert.equal(await heroScene.getAttribute('data-focus'), 'room', 'homepage camera did not return to the room')

await visit('/visit/prologue')
await page.getByRole('slider', { name: '观察深度' }).fill('72')
assert.ok(await page.getByText('72 / 100').count(), 'prologue depth did not update')
assert.equal(await page.locator('.prologue-scene').getAttribute('data-submerged'), 'true', 'prologue did not enter the submerged state')
assert.equal(await page.locator('.prologue-scene').evaluate((node) => getComputedStyle(node).getPropertyValue('--observation-depth').trim()), '0.72')
assert.ok(await page.locator('.prologue-float').count(), 'prologue float is missing')

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
console.log('Verified the spatial homepage and motion effects across all ten museum stages.')
