import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Dialog Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().modalOverlaysDialog();
        await page.screenshot({ path: 'Screenshots/DialogPage.png' })
    })

    test('Verifying Dialog is Opened and Closed Properly', async () => {
      await pm.DialogPageFunction().openDialogCheck();
    })

    test('Verifying All Dialogue Boxes One by One', async () => {
        await pm.DialogPageFunction().verifyingAllDialogueBoxesOneByOne();
    });

    test('Verifying Result Return From Dialog', async () => {
        await pm.DialogPageFunction().resultReturnFromDialog('John');
    }); 


})