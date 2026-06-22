import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class RegisterPage extends HelperBase {
  constructor(page: Page) {
    super(page)
  }

  async registerPageValidation() {
    const Login = this.page.locator('nb-card').locator('nb-auth-block')
    await expect(Login.locator('#title')).toHaveText('Register')
    await expect(Login.locator('form').getByText('Full name:')).toBeVisible()
    await expect(Login.locator('form').getByText('Email address:')).toBeVisible()
    await expect(Login.locator('form').getByText('Repeat password:')).toBeVisible()
    await expect(Login.locator('form').getByText('Password:').first()).toBeVisible()
    await expect(Login.getByPlaceholder('Full name')).toBeVisible()
    await expect(Login.getByPlaceholder('Email address')).toBeVisible()
    await expect(Login.getByPlaceholder('Password').last()).toBeVisible()
    await expect(Login.locator('nb-checkbox', { hasText: ' Agree to ' })).toBeVisible()
    const LoginBTN = Login.getByRole('button', { name: ' Register ' })
    await expect(LoginBTN).toBeVisible()
    await expect(LoginBTN).toBeDisabled()
  }

  async registerAnUser(Name: string, Email: string, Password: string) {
    const Login = this.page.locator('nb-card').locator('nb-auth-block')
    await expect(Login.locator('#title')).toHaveText('Register')
    await Login.getByPlaceholder('Full name').fill(Name)
    await Login.getByPlaceholder('Email address').fill(Email)
    await Login.getByPlaceholder('Password').first().fill(Password)
    await Login.getByPlaceholder('Password').last().fill(Password)
    await Login.locator('.custom-checkbox').check()
    const LoginBTN = Login.getByRole('button', { name: ' Register ' })
    await LoginBTN.click()
    await this.page.waitForTimeout(5000)
    await expect(this.page).toHaveURL(/.*iot-dashboard/);
  }

  async registerPageErrorMessageValidation(Name: string) {
    const Login = this.page.locator('nb-card').locator('nb-auth-block')
    await Login.getByPlaceholder('Full name').fill(Name)
    await this.page.click('body');
    await expect(Login.locator('form', { hasText: ' Full name should contains from 4 to 50 characters ' })).toBeVisible()
    await Login.getByPlaceholder('Email address').click()
    await Login.locator('#title').click()
    await expect(Login.locator('form', { hasText: ' Email is required! ' })).toBeVisible()
    await Login.getByPlaceholder('Email address').fill(Name)
    await expect(Login.locator('form', { hasText: ' Email should be the real one! ' })).toBeVisible()
    await Login.getByPlaceholder('Password').first().click()
    await this.page.click('body');
    await expect(Login.locator('form', { hasText: ' Password is required! ' })).toBeVisible()
    await Login.getByPlaceholder('Password').first().fill(Name)
    await expect(Login.locator('form', { hasText: ' Password should contain from 4 to 50 characters ' })).toBeVisible();
    await Login.getByPlaceholder('Password').last().click()
    await this.page.click('body');
    await expect(Login.locator('form', { hasText: ' Password confirmation is required! ' })).toBeVisible();
  }
}