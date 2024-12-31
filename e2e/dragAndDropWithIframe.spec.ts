import test from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
})

test.describe('Drag and Drop', async () => {
  test('drag and drop', async ({ page }) => {
    const frame = page.locator('[rel-title="Photo Manager"] iframe')
    await frame
      .locator('li', { hasText: 'High Tatras 2' })
      .dragTo(frame.locator('#trash'))
  })
})
