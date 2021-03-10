const { chromium } = require('playwright')
let browser
beforeAll(async () => {
  browser = await chromium.launch()
})

afterAll(async () => {
  await browser.close()
})

let page
beforeEach(async () => {
  page = await browser.newPage()
})

afterEach(async () => {
  await page.close()
})

it('should show title', async () => {
  await page.goto('http://localhost:3003')
  expect(await page.title()).toBe('minesweeper')
})

it('should not loss when first click on mine', async () => {
  await page.goto('http://localhost:3003')
  await page.click('.board-cell.-has-mines')
  await expect(page).not.toHaveText('X')
})

it('should loss when click on mine except first reveal', async () => {
  await page.goto('http://localhost:3003')
  await page.click('.board-cell')
  await page.click('.board-cell.-has-mines')
  await expect(page).toHaveText('Game Over')
})

it('should win after click all unrevealed-and-no-mines-cells', async () => {
  await page.goto('http://localhost:3003')

  const unrevealedNoMinesCellSelector = '.board-cell:not(.-has-mines):not(.-revealed)'
  while (await page.$(unrevealedNoMinesCellSelector)) {
    await page.click(unrevealedNoMinesCellSelector)
  }

  await expect(page).toHaveText('Win')
})
