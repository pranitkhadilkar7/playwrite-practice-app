import test from '@playwright/test'
import { NavigationPage } from '../page-object/navigationPage'
import { FormLayoutsPage } from '../page-object/formLayoutsPage'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test('Navigate to form page', async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  await navigateTo.formLayoutPage()
  await navigateTo.datepickerPage()
  await navigateTo.smartTablePage()
  await navigateTo.toastrPage()
  await navigateTo.tooltipPage()
})

test('parameterized method', async ({ page }) => {
  const navigateTo = new NavigationPage(page)
  const onFormLayoutPage = new FormLayoutsPage(page)

  await navigateTo.formLayoutPage()
  await onFormLayoutPage.submitUsingTheGridForm(
    'test@test.com',
    'password',
    'Option 1'
  )
  await onFormLayoutPage.submitInlineForm('test', 'test@test.com', true)
})
