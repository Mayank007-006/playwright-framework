import { expect, test } from '@playwright/test'

test.beforeEach('Loading the test site', async ({ page }) => {
  await page.goto('http://www.uitestingplayground.com/ajax');
  await page.locator('#ajaxButton').click();
})

test('Auto-wait Concept', async ({ page }) => {
  const SucccessMessage = page.locator('.bg-success')
  await expect(SucccessMessage).toHaveText('Data loaded with AJAX get request.');
  await expect(SucccessMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 });
})

test('Alternate ways to use timeout', async ({ page }) => {
  await page.waitForSelector('.bg-success')
})

test('Timeouts', async ({ page }) => {
  const SucccessMessage = page.locator('bg-success');
  await SucccessMessage.click();
})