import test, { expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test.describe('Form Layouts', async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  test('input field', async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator('nb-card', { hasText: 'Using the Grid' })
      .getByRole('textbox', { name: 'email' })

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test@test.com', {
      delay: 300,
    })

    const emailValue = await usingTheGridEmailInput.inputValue()

    expect(emailValue).toEqual('test@test.com')
    await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
  })

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', {
      hasText: 'Using the Grid',
    })
    // const radioButton1 = usingTheGridForm.getByLabel('Option 1')
    const radioButton1 = usingTheGridForm.getByRole('radio', {
      name: 'Option 1',
    })
    const radioButton2 = usingTheGridForm.getByRole('radio', {
      name: 'Option 2',
    })

    await radioButton1.check({ force: true }) // using force true as the radio button is not visible ie hidden

    await expect(radioButton1).toBeChecked()
    expect(await radioButton1.isChecked()).toBeTruthy()

    await radioButton2.check({ force: true })
    await expect(radioButton2).toBeChecked()
    await expect(radioButton1).not.toBeChecked()
    expect(await radioButton1.isChecked()).toBeFalsy()
  })
})

test.describe('Modal & Overlays --> Toastr', async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
  })

  test('checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: 'Hide on click' })

    await checkbox.check({ force: true })

    await expect(checkbox).toBeChecked()

    const allCheckboxes = page.getByRole('checkbox')

    for (let checkbox of await allCheckboxes.all()) {
      await checkbox.check({ force: true })
      await expect(checkbox).toBeChecked()

      await checkbox.uncheck({ force: true })
      await expect(checkbox).not.toBeChecked()
    }
  })
})
