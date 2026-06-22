import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class RequestPasswordPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async requestPasswordPageValidation() {
    const Forgotpassword = this.page.locator('nb-card nb-auth-block')
    expect(Forgotpassword.locator('#title', { hasText: 'Forgot Password' })).toBeVisible()
    await expect(Forgotpassword.getByText(/send a link to reset your password/)).toBeVisible();
    expect(Forgotpassword.getByText('Enter your email address:')).toBeVisible()
    expect(Forgotpassword.getByPlaceholder('Email address')).toBeVisible()
    expect(Forgotpassword.getByRole('button', { name: ' Request password ' })).toBeVisible()
    expect(Forgotpassword.getByRole('button', { name: ' Request password ' })).toBeDisabled()
    const BacktoLogin = Forgotpassword.locator('.sign-in-or-up').getByText('Back to Log In')
    await expect(BacktoLogin).toBeVisible()
    await expect(BacktoLogin).toHaveAttribute('class', 'text-link')
    const Register = Forgotpassword.locator('.sign-in-or-up').getByText('Register')
    await expect(Register).toBeVisible()
    await expect(Register).toHaveAttribute('class', 'text-link')
  }

  async requestpasswordpageErrorMessageValidation(Email: string) {
    const Forgotpassword = this.page.locator('nb-card nb-auth-block')
    await Forgotpassword.getByPlaceholder('Email address').click()
    await this.page.click('body')
    await expect(Forgotpassword.getByText(' Email is required! ')).toBeVisible()
    await Forgotpassword.getByPlaceholder('Email address').fill(Email)
    await expect(Forgotpassword.getByText(' Email should be the real one! ')).toBeVisible()
  }

  async requestpassword(Email: string) {
    const Forgotpassword = this.page.locator('nb-card nb-auth-block')
    await Forgotpassword.getByPlaceholder('Email address').fill(Email)
    await Forgotpassword.getByRole('button', { name: ' Request password ' }).click()
    await expect(this.page).toHaveURL(/.*iot-dashboard/);
  }

  async loginFromRequestPasswordpage() {
    const link = this.page.locator('a[href="/auth/login"]');
    await expect(link).toBeVisible();
    await link.evaluate((el: HTMLElement) => el.click());
    await expect(this.page).toHaveURL(/.*auth\/login/);
  }

  async registerFromRequestPasswordPage() {
    const link = this.page.locator('a[href="/auth/register"]');
    await expect(link).toBeVisible();
    await link.evaluate((el: HTMLElement) => el.click())
    await expect(this.page).toHaveURL('/auth/register')
  }
}