import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async submitUsingTheGridForm(
    email: string,
    password: string,
    option: string
  ) {
    const usingTheGridFormCard = this.page.locator('nb-card', {
      hasText: 'Using the Grid',
    })
    await usingTheGridFormCard
      .getByRole('textbox', { name: 'Email' })
      .fill(email)
    await usingTheGridFormCard
      .getByRole('textbox', { name: 'Password' })
      .fill(password)
    await usingTheGridFormCard
      .getByRole('radio', { name: option })
      .check({ force: true })
    await usingTheGridFormCard.getByRole('button').click()
  }

  async submitInlineForm(name: string, email: string, rememberMe: boolean) {
    const inlineFormCard = this.page.locator('nb-card', {
      hasText: 'Inline form',
    })
    await inlineFormCard.getByRole('textbox', { name: 'Jane Doe' }).fill(name)
    await inlineFormCard.getByRole('textbox', { name: 'Email' }).fill(email)
    await inlineFormCard
      .getByRole('checkbox', { name: 'Remember me' })
      .check({ force: true })
    await inlineFormCard.getByRole('button').click()
  }
}
