import { test as base } from '@playwright/test';
import { PageManager } from './Page-Objects/pageManager';

export type testoptions = {
  globalsQAURL: string;
  FormlayoutsPage: string;
  pageManager: PageManager;
}

export const test = base.extend<testoptions>({
  globalsQAURL: ['', { option: true }],

  FormlayoutsPage: async ({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await use('')
    console.log('Tear down')
  },

  pageManager: async ({ page }, use) => {
    const pm = new PageManager(page)
    await use(pm)
  }
})