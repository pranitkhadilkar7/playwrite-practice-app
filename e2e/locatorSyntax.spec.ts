import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
  // by Tag name
  await page.locator('input').first().click()

  // by ID
  page.locator('#inputEmail1')

  // by Class value
  page.locator('.shape-rectangle')

  // by class full value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  )

  // by multiple attributes
  page.locator('[nbinput][placeholder="Email"]')

  // by exact text match
  page.locator(':text-is("Using the Grid")')
})

// These are the locators that are used by the user
test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click()

  await page.getByRole('button', { name: 'Sign in' }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').click()

  await page.getByText('Using the Grid').click()

  await page.getByTitle('IoT Dashboard').click()

  // await page.getByTestId('SignIn').click()
})

test('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text("Option 1")').click()

  await page
    .locator('nb-card')
    .locator('nb-radio')
    .locator(':text("Option 2")')
    .click()

  await page
    .locator('nb-card')
    .getByRole('button', { name: 'Sign in' })
    .first()
    .click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('locating parent elements', async ({ page }) => {
  await page
    .locator('nb-card', { hasText: 'Using the Grid' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card', { has: page.locator('#inputEmail1') })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card')
    .filter({ hasText: 'Basic form' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('.status-danger') })
    .getByRole('textbox', { name: 'password' }) // name is case insensitive
    .click()

  await page
    .locator('nb-card')
    .filter({ has: page.locator('nb-checkbox') })
    .filter({ hasText: 'Sign in' })
    .getByRole('textbox', { name: 'Email' })
    .click()

  await page
    .locator(':text-is("Using the Grid")')
    .locator('..')
    .getByRole('textbox', { name: 'Email' })
    .click()
})

test('reusing the locators', async ({ page }) => {
  const basicForm = page.locator('nb-card', { hasText: 'Basic form' })

  await basicForm.getByRole('textbox', { name: 'Email' }).fill('test@test.com')
  await basicForm.getByRole('textbox', { name: 'password' }).fill('password')
  await basicForm.locator('nb-checkbox', { hasText: 'Check me out' }).click()
  await basicForm.getByRole('button', { name: 'Submit' }).click()
})
