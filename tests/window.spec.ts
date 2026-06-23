import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Window Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().modalOverlaysWindow();
        await page.screenshot({ path: 'Screenshots/WindowPage.png' })
    })

    test('Window Form Validation', async () => {
      await pm.WindowPageFunction().windowForm();
      await pm.WindowPageFunction().fillingOpenWindowForm('Testing', 'Test');
    })

    test('Open Window With Template Validation', async () => {
      await pm.WindowPageFunction().openWindowWithTemplate();
    })

    test('Window Without Backdrop Validation', async () => {
      await pm.WindowPageFunction().windowWithoutBackdrop();
    })  

    test('Open Window With Backdrop Validation', async () => {
      await pm.WindowPageFunction().openWindowWithbackdrop();
    })

    test('Open Window Without Backdrop Validation', async () => {
      await pm.WindowPageFunction().openWindowWithoutBackdrop();
    })



})