import { expect, test } from '@playwright/test';

test.beforeEach('First Test', async ({ page }) => {
  await page.goto('http://localhost:4200/pages/iot-dashboard');
  await page.getByText('Forms').click();
  await page.getByText('Form Layout').click();
})

test('Locators syntax rules', async ({ page }) => {
  await page.locator('input');
  await page.locator('#inputEmail1').click();
  await page.locator('.shape-rectangle');
  await page.locator('[placeholder="Email"]');
  await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  await page.locator('input[placeholder="Email"].shape-rectangle')
  page.locator(':text("Using")').click();
  page.locator(':text is("Using the Grid")')
})

test('Filling values in locators', async ({ page }) => {
  await page.locator('input[placeholder="Email"].shape-rectangle#inputEmail1').fill('XYZ@gmail.com')
})

test('User Facing Locators', async ({ page }) => {
  await page.getByRole('button', { name: 'SIGN IN' }).first().click()
  await page.getByRole('textbox', { name: 'Email' }).first().click()
  await page.getByLabel('Email').first().click()
  await page.getByPlaceholder('Jane Doe').click()
  await page.getByText('Using the Grid').click()
  await page.getByTestId('SIGN').click();
  await page.getByTitle('IoT Dashboard').click();
})

test('Finding Child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').first().click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
  await page.locator('nb-card').getByRole('button', { name: "Sign In" }).first().click()
  await page.locator('nb-card').nth(3).getByRole('button').click()
  await page.locator('nb-card:has-text("Form without labels") button:has-text("SEND")').click()
  await page.locator('nb-card:has-text("Form without labels")').getByRole('button', { name: "SEND" }).click();
  await page.locator('nb-card:has-text("Form without labels")').getByRole('button').click()
})

test('Finding Parent elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: "Email" })
  await page.locator('nb-card:has-text("Using the Grid")').getByRole('textbox', { name: "Email" })
  await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' })
  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole("textbox", { name: "Password" })
  await page.locator('nb-card').filter({ has: page.locator('#exampleInputPassword1') }).getByRole('textbox', { name: "Password" }).click();
  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: 'Email' }).click();
});

test('Resuing the Locators by assigning it to a const value', async ({ page }) => {
  const BasicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  await BasicForm.getByRole('textbox', { name: 'Password' }).fill("Test@123")
  await BasicForm.locator('nb-checkbox').click()
  await BasicForm.getByRole("button", { name: "Submit" }).click();
  const emailValue = BasicForm.getByRole('textbox', { name: 'Email' })
  await emailValue.fill("Test@Test.com")
})

test("Extracting Text Values", async ({ page }) => {
  const BasicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const ButtonText = await BasicForm.getByRole('button').textContent();
  expect(ButtonText).toEqual("Submit")

  const UsingtheGridForm = page.locator('nb-card').filter({ hasText: "Using the Grid" });
  const radiobuttons = await UsingtheGridForm.locator('nb-radio').allTextContents();
  expect(radiobuttons).toContain('Option 1');

  const EmailField = BasicForm.getByRole('textbox', { name: "Email" })
  await EmailField.fill("test@test.com")
  const EmailValue = await EmailField.inputValue()
  expect(EmailValue).toEqual("test@test.com")

  const Attributevalue = await EmailField.getAttribute('placeholder')
  expect(Attributevalue).toEqual('Email')
})

test('Assertion', async ({ page }) => {
  const value = 5
  expect(value).toEqual(5);

  const BasicForm = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button');
  expect(BasicForm).toHaveText("Submit");

  await expect.soft(BasicForm).toHaveText('Submit5');
  await BasicForm.click();
})