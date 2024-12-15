import test, { expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://uitestingplayground.com/ajax')
  await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async ({ page }) => {
  const successButton = page.locator('.bg-success')

  // await successButton.click()

  // const text = await successButton.textContent()
  // expect(text).toContain('Data loaded with AJAX get request.')

  // await successButton.waitFor({ state: 'attached' }) // waitFor method waits for the element to be attached
  // const allText = await successButton.allTextContents() // allTextContents method does not wait for the element to be attached
  // expect(allText).toContain('Data loaded with AJAX get request.')

  await expect(successButton).toContainText(
    'Data loaded with AJAX get request.',
    { timeout: 20000 }
  )
})

test('alternative waits', async ({ page }) => {
  const successButton = page.locator('.bg-success')

  // wait for element
  // await page.waitForSelector('.bg-success')

  // wait for perticular response
  // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

  // wait for all netwrok requests to be completed (NOT RECOMMENDED)
  await page.waitForLoadState('networkidle')

  const allText = await successButton.allTextContents()
  expect(allText).toContain('Data loaded with AJAX get request.')
})
