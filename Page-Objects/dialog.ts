import { expect, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DialogPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async openDialogCheck() {
    const OpenDialog = this.page.locator('nb-card', { hasText: 'Open Dialog' })
    await OpenDialog.getByRole('button', { name: 'Open Dialog with component' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('This is a title passed to the dialog component')
      await expect(dialog.locator('nb-card-body')).toContainText('Lorem ipsum dolor sit amet')
      await dialog.getByRole('button', { name: 'Dismiss Dialog' }).click()
    }
  }

  async verifyingAllDialogueBoxesOneByOne() {
    const OpenDialog = this.page.locator('nb-card', { hasText: 'Open Dialog' })
    await OpenDialog.getByRole('button', { name: 'Open Dialog with component' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('This is a title passed to the dialog component')
      await expect(dialog.locator('nb-card-body')).toContainText('Lorem ipsum dolor sit amet')
      await dialog.getByRole('button', { name: 'Dismiss Dialog' }).click()
    }
    await OpenDialog.getByRole('button', { name: 'Open Dialog with template' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('Template Dialog')
      await expect(dialog.locator('nb-card-body')).toContainText('this is some additional data passed to dialog')
      await dialog.getByRole('button', { name: 'Close Dialog' }).click()
    }
    const OpenWithoutBackdrop = this.page.locator('nb-card', { hasText: 'Open Without Backdrop' })
    await OpenWithoutBackdrop.getByRole('button', { name: 'Open Dialog with backdrop' }).first().click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('This is a title passed to the dialog component')
      await expect(dialog.locator('nb-card-body')).toContainText('Lorem ipsum dolor sit amet')
      await dialog.getByRole('button', { name: 'Dismiss Dialog' }).click()
    }
    await OpenWithoutBackdrop.getByRole('button', { name: 'Open Dialog without backdrop' }).first().click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('Template Dialog')
      await expect(dialog.locator('nb-card-body')).toContainText('this is some additional data passed to dialog')
      await dialog.getByRole('button', { name: 'Close Dialog' }).click()
    }
    const OpenWithoutEscClose = this.page.locator('nb-card', { hasText: 'Open Without Esc Close' })
    await OpenWithoutEscClose.getByRole('button', { name: 'Open Dialog with esc close' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('This is a title passed to the dialog component')
      await expect(dialog.locator('nb-card-body')).toContainText('Lorem ipsum dolor sit amet')
      await dialog.getByRole('button', { name: 'Dismiss Dialog' }).click()
    }
    await OpenWithoutEscClose.getByRole('button', { name: 'Open Dialog without esc close' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('Template Dialog')
      await expect(dialog.locator('nb-card-body')).toContainText('this is some additional data passed to dialog')
      await dialog.getByRole('button', { name: 'Close Dialog' }).click()
    }
    const OpenWithoutBackdropClick = this.page.locator('nb-card', { hasText: 'Open Without Backdrop Click' })
    await OpenWithoutBackdropClick.getByRole('button', { name: 'Open Dialog with backdrop click' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('This is a title passed to the dialog component')
      await expect(dialog.locator('nb-card-body')).toContainText('Lorem ipsum dolor sit amet')
      await dialog.getByRole('button', { name: 'Dismiss Dialog' }).click()
    }
    await OpenWithoutBackdropClick.getByRole('button', { name: 'Open without backdrop click' }).click()
    {
      const dialog = this.page.locator('nb-dialog-container').last()
      await expect(dialog.locator('nb-card-header')).toHaveText('Template Dialog')
      await expect(dialog.locator('nb-card-body')).toContainText('this is some additional data passed to dialog')
      await dialog.getByRole('button', { name: 'Close Dialog' }).click()
    }
  }

  async resultReturnFromDialog(fullName: string) {
    const ResultReturnFromDialog = this.page.locator('nb-card', { hasText: 'Return Result From Dialog' })
    await ResultReturnFromDialog.getByRole('button', { name: 'Enter Name' }).click()
    const ResultReturnFromDialogNameForm = this.page.locator('nb-card', { hasText: 'Enter your name' })
    await ResultReturnFromDialogNameForm.getByPlaceholder('Name').fill(fullName)
    await ResultReturnFromDialogNameForm.getByRole('button', { name: 'Submit' }).click();
    await expect(ResultReturnFromDialog.locator('ul').locator('li')).toHaveText(fullName)
  }
}