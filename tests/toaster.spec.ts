import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Toaster Page', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().modalOverlaystoastr();
        await page.screenshot({ path: 'Screenshots/ToasterPage.png' })
    })

    test('Toaster Page Validation', async () => {
      await pm.ToasterPageFunction().toasterPageValidation()
    })

    test('Toaster Position Validation', async () => {
      const title = faker.word.sample()
      const Content = faker.lorem.sentence(10)
      const timeout = "2000000"
      await pm.ToasterPageFunction().toasterPosition("top-right", title, Content, "info", timeout)
    })

    test('Multiple Toast Scenario Validation', async () => {
      const timeout = "2000000"
      await pm.ToasterPageFunction().multipleToastScenario(timeout)
    })  

})