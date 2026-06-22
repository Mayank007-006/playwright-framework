import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async fillInlineForm(Name: string, Email: string, Remeberme: boolean) {
    const InlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
    await InlineForm.getByPlaceholder('Jane Doe').fill(Name)
    await InlineForm.getByPlaceholder('Email').fill(Email)
    if (Remeberme)
      await InlineForm.getByRole('checkbox').check({ force: true })
    await InlineForm.getByRole('button', { name: 'Submit' }).click()
  }

  async fillUsingTheGridForm(Email: string, Password: string, Option: string) {
    const UsingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
    await UsingTheGridForm.getByPlaceholder('Email').fill(Email)
    await UsingTheGridForm.getByPlaceholder('Password').fill(Password)
    if (Option == 'Option 1') {
      await UsingTheGridForm.getByText('Option 1').click()
    }
    else if (Option == 'Option 2') {
      await UsingTheGridForm.getByText('Option 2').click()
    }
    await UsingTheGridForm.getByRole('button', { name: 'Sign in' }).click()
  }

  async fillBasicForm(Email: string, password: string) {
    const BasicForm = this.page.locator('nb-card', { hasText: 'Basic Form' })
    await BasicForm.getByPlaceholder('Email').fill(Email)
    await BasicForm.getByPlaceholder('Password').fill(password)
    await BasicForm.getByRole('checkbox', { name: 'Check me out' }).check({ force: true })
    await BasicForm.getByRole('button').click();
  }

  async fillFormWithoutLabels(Name: string, Subject: string, Message: string) {
    const FormWithoutLabel = this.page.locator('nb-card', { hasText: 'Form without labels' })
    await FormWithoutLabel.getByPlaceholder('Recipients').fill(Name);
    await FormWithoutLabel.getByPlaceholder('Subject').fill(Subject);
    await FormWithoutLabel.getByPlaceholder('Message').fill(Message);
    await FormWithoutLabel.getByRole('button', { name: 'Send' }).click()
  }

  async fillBlockForm(Firstname: string, lastName: string, Email: string, Website: string) {
    const BlockForm = this.page.locator('nb-card', { hasText: 'Block form' })
    await BlockForm.getByPlaceholder('First Name').fill(Firstname)
    await BlockForm.getByPlaceholder('Last Name').fill(lastName)
    await BlockForm.getByPlaceholder('Email').fill(Email)
    await BlockForm.getByPlaceholder('Website').fill(Website)
    await BlockForm.getByRole('button', { name: 'Submit' }).click()
  }

  async fillHorizontalForm(Email: string, Password: string, Remeberme: Boolean) {
    const HorizontalForm = this.page.locator('nb-card', { hasText: 'Horizontal form' })
    await HorizontalForm.getByPlaceholder('Email').fill(Email)
    await HorizontalForm.getByPlaceholder('Password').fill(Password)
    if (Remeberme == true) {
      await HorizontalForm.getByRole('checkbox').check({ force: true })
    }
    await HorizontalForm.getByRole('button', { name: 'Sign in' }).click()
  }
}