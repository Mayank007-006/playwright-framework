import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class LoginPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async loginPageValidation() {
    const Login = this.page.locator('nb-card').locator('nb-login')
    await expect(Login.locator('#title')).toHaveText('Login')
    await expect(Login.locator('p')).toHaveText('Hello! Log in with your email.')
    await expect(Login.locator('form').getByText('Email address:')).toBeVisible()
    await expect(Login.locator('form').getByText('Password:')).toBeVisible()
    await expect(Login.locator('form').getByText('Forgot Password?')).toBeVisible()
    await expect(Login.getByPlaceholder('Email address')).toBeVisible()
    await expect(Login.getByPlaceholder('Password')).toBeVisible()
    await expect(Login.getByText('Forgot Password?')).toBeVisible()
    await expect(Login.locator('nb-checkbox', { hasText: 'Remember me' })).toBeVisible()
    const LoginBTN = Login.getByRole('button', { name: ' Log In ' })
    await expect(LoginBTN).toBeVisible()
    await expect(LoginBTN).toBeDisabled()
  }

  async errorMessageValidation(email: string, Password: string) {
    const Login = this.page.locator('nb-card').locator('nb-login')
    await Login.getByPlaceholder('Email address').click()
    await Login.getByPlaceholder('Password').click()
    await this.page.click('body');
    await expect(Login.locator('p', { hasText: ' Email is required! ' })).toBeVisible()
    await expect(Login.locator('p', { hasText: ' Password is required! ' })).toBeVisible()
    await Login.getByPlaceholder('Email address').fill(email)
    await expect(Login.locator('p', { hasText: ' Email should be the real one! ' })).toBeVisible()
    await Login.getByPlaceholder('Password').fill(Password)
    await expect(Login.locator('p', { hasText: ' Password should contain from 4 to 50 characters ' })).toBeVisible()
  }

  async logginIn(email: string, Password: string) {
    const Login = this.page.locator('nb-card').locator('nb-login')
    await Login.getByPlaceholder('Email address').fill(email)
    await Login.getByPlaceholder('Password').fill(Password)
    await Login.getByText('Remember me').click();
    await expect(Login.getByRole('checkbox', { name: 'Remember me' })).toBeChecked();
    await Login.getByRole('button', { name: ' Log In ' }).click()
    await this.page.waitForTimeout(5000)
    await expect(this.page).toHaveURL(/.*iot-dashboard/);
  }
}