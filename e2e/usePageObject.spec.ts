import test from '@playwright/test'
import { NavigationPage } from '../page-object/navigationPage'
import { FormLayoutsPage } from '../page-object/formLayoutsPage'
import { PageManager } from '../page-object/pageManager'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test('Navigate to form page', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutPage()
  await pm.navigateTo().datepickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()
})

test('parameterized method', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutPage()
  await pm
    .onFormLayoutPage()
    .submitUsingTheGridForm('test@test.com', 'password', 'Option 1')
  await pm.onFormLayoutPage().submitInlineForm('test', 'test@test.com', true)
})
