import test from '@playwright/test'
import { NavigationPage } from '../page-object/navigationPage'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test('Navigate to form page', async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayoutPage()
})
