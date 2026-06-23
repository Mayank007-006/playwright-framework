import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Tooltip Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().modalOverlaystooltip();
        await page.screenshot({ path: 'Screenshots/TooltipPage.png' })
    })

    test('Tooltip Page Validation', async () => {
        await pm.TooltipPageFunction().tooltipPageValidation()
    })

    test('Tooltip with Icon Message Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltipwithiconMessage()
        await page.screenshot({ path: 'Screenshots/TooltipwithIconMessage.png' })
    })

    test('Tooltip with Icon Icon Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltipwithiconIcon()
        await page.screenshot({ path: 'Screenshots/TooltipwithIconIcon.png' })
    })  

    test('Tooltip Placement Top Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltiPlacementTop()
        await page.screenshot({ path: 'Screenshots/TooltipPlacementTop.png' })
    })

    test('Tooltip Placement Right Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltiPlacementRight()
        await page.screenshot({ path: 'Screenshots/TooltipPlacementRight.png' })
    })      

    test('Tooltip Placement Bottom Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltiPlacementBottom()
        await page.screenshot({ path: 'Screenshots/TooltipPlacementBottom.png' })
    })

    test('Tooltip Placement Left Validation', async({page}) => {
        await pm.TooltipPageFunction().tooltiPlacementLeft()
        await page.screenshot({ path: 'Screenshots/TooltipPlacementLeft.png' })
    })

    test('Colored Tooltip Default Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipDefault()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipDefault.png' })
    })

    test('Colored Tooltip Primary Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipPrimary()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipPrimary.png' })
    })      

    test('Colored Tooltip Success Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipSuccess()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipSuccess.png' })
    })  

    test('Colored Tooltip Danger Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipDanger()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipDanger.png' })
    })

    test('Colored Tooltip Info Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipInfo()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipInfo.png' })
    })  

    test('Colored Tooltip Warning Validation', async({page}) => {
        await pm.TooltipPageFunction().coloredTooltipWarning()
        await page.screenshot({ path: 'Screenshots/ColoredTooltipWarning.png' })
    })



})