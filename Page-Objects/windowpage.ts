import { Page, expect } from '@playwright/test';
import { HelperBase } from './helperBase';

export class WindowPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async windowForm() {
    const WindowForm = this.page.locator('nb-card', { hasText: 'Window Form' })
    await expect(WindowForm.getByRole('button', { name: 'Open window form' })).toHaveText('Open window form')
    await expect(WindowForm.getByRole('button', { name: 'Open window with template' })).toHaveText('Open window with template')
  }

  async fillingOpenWindowForm(Subject: string, Text: string) {
    const WindowForm = this.page.locator('nb-card', { hasText: 'Window Form' })
    await WindowForm.getByRole('button', { name: 'Open window form' }).click()
    const FormFilling = this.page.locator('nb-window nb-card', { hasText: 'Window' })
    await FormFilling.locator('#subject').fill(Subject)
    await expect(FormFilling.locator('#subject')).toHaveValue(Subject)
    await FormFilling.locator('#text').fill(Text)
    await expect(FormFilling.locator('#text')).toHaveValue(Text)
    await FormFilling.getByRole('button').nth(2).click()
  }

  async openWindowWithTemplate() {
    const WindowForm = this.page.locator('nb-card', { hasText: 'Window Form' })
    await WindowForm.getByRole('button', { name: 'Open window with template' }).click()
    const WindowContentFromTemplate = this.page.locator('nb-window nb-card', { hasText: 'Window content from template' })
    await expect(WindowContentFromTemplate.locator('nb-card-header')).toHaveText('Window content from template')
    await expect(WindowContentFromTemplate.locator('nb-card-body', { hasText: 'Here is the text provided via config: "some text to pass into template"' })).toHaveText('Here is the text provided via config: "some text to pass into template"')
    await WindowContentFromTemplate.getByRole('button').nth(2).click()
  }

  async windowWithoutBackdrop() {
    const WindowWithoutBackdrop = this.page.locator('nb-card', { hasText: 'Window Without Backdrop' })
    await expect(WindowWithoutBackdrop.getByRole('button', { name: 'Open window with backdrop' })).toHaveText('Open window with backdrop')
    await expect(WindowWithoutBackdrop.getByRole('button', { name: 'Open window without backdrop' })).toHaveText('Open window without backdrop')
  }

  async openWindowWithbackdrop() {
    const WindowWithoutBackdrop = this.page.locator('nb-card', { hasText: 'Window Without Backdrop' })
    await WindowWithoutBackdrop.getByRole('button', { name: 'Open window with backdrop' }).click()
    const WindowContentFromTemplate = this.page.locator('nb-window nb-card', { hasText: 'Window content from template' })
    await expect(WindowContentFromTemplate.locator('nb-card-header')).toHaveText('Window content from template')
    await expect(WindowContentFromTemplate.locator('nb-card-body', { hasText: 'Here is the text provided via config: "some text to pass into template"' })).toHaveText('Here is the text provided via config: "some text to pass into template"')
    await this.page.keyboard.press('Escape')
  }

  async openWindowWithoutBackdrop() {
    const WindowWithoutBackdrop = this.page.locator('nb-card', { hasText: 'Window Without Backdrop' })
    await WindowWithoutBackdrop.getByRole('button', { name: 'Open window without backdrop' }).click()
    const WindowContentFromTemplate = this.page.locator('nb-window nb-card', { hasText: 'Window without backdrop' })
    await expect(WindowContentFromTemplate.locator('nb-card-header')).toHaveText('Window without backdrop')
    await expect(WindowContentFromTemplate.locator('nb-card-body', { hasText: ' Disabled close on escape click.' })).toHaveText('Disabled close on escape click.')
    await WindowContentFromTemplate.getByRole('button').nth(2).click()
  }
}