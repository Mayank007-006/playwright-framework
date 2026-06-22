import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ChangePasswordPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async changePasswordPageValidation() {
    const ChangePassword = this.page.locator('nb-card nb-auth-block')
    expect(ChangePassword.locator('#title', { hasText: 'Change password' })).toBeVisible()
    await expect(ChangePassword.getByText('Please set a new password')).toBeVisible();
    await expect(ChangePassword.getByText('New Password:')).toBeVisible()
    await expect(ChangePassword.getByPlaceholder('New Password')).toBeVisible()
    await expect(ChangePassword.getByText('Confirm Password:')).toBeVisible()
    await expect(ChangePassword.getByPlaceholder('Confirm Password')).toBeVisible()
    expect(ChangePassword.getByRole('button', { name: ' Change password ' })).toBeVisible()
    expect(ChangePassword.getByRole('button', { name: ' Change password ' })).toBeDisabled()
    const BacktoLogin = ChangePassword.locator('.sign-in-or-up').getByText('Back to Log In')
    await expect(BacktoLogin).toBeVisible()
    await expect(BacktoLogin).toHaveAttribute('class', 'text-link')
    const Register = ChangePassword.locator('.sign-in-or-up').getByText('Register')
    await expect(Register).toBeVisible()
    await expect(Register).toHaveAttribute('class', 'text-link')
  }

  async changePassword(Password: string) {
    const ChangePassword = this.page.locator('nb-card nb-auth-block');
    await ChangePassword.getByPlaceholder('New Password').fill(Password);
    await ChangePassword.getByPlaceholder('Confirm Password').fill(Password);
    await ChangePassword.getByRole('button', { name: ' Change password ' }).click()
    await expect(this.page).toHaveURL(/.*iot-dashboard/)
  }

  async changePasswordPageErrorMessageValidation(Invalidpassword: string, AnotherInvalidPassword: string) {
    const ChangePassword = this.page.locator('nb-card nb-auth-block');
    await ChangePassword.getByPlaceholder('New Password').click()
    await this.page.click('body')
    await expect(ChangePassword.getByText(' Password is required! ')).toBeVisible()
    await ChangePassword.getByPlaceholder('New Password').fill(Invalidpassword)
    await expect(ChangePassword.getByText(' Password should contains from 4 to 50 characters ')).toBeVisible()
    await ChangePassword.getByPlaceholder('Confirm Password').click()
    await this.page.click('body')
    await expect(ChangePassword.getByText(' Password confirmation is required! ')).toBeVisible()
    await ChangePassword.getByPlaceholder('Confirm Password').fill(AnotherInvalidPassword)
    await expect(ChangePassword.getByText(' Password does not match the confirm password. ')).toBeVisible()
  }

  async loginFromChangePasswordpage() {
    const link = this.page.locator('a[href="/auth/login"]');
    await expect(link).toBeVisible();
    await link.evaluate((el: HTMLElement) => el.click());
    await expect(this.page).toHaveURL(/.*auth\/login/);
  }

  async registerFromChangePasswordPage() {
    const link = this.page.locator('a[href="/auth/register"]');
    await expect(link).toBeVisible();
    await link.evaluate((el: HTMLElement) => el.click())
    await expect(this.page).toHaveURL('/auth/register')
  }
}