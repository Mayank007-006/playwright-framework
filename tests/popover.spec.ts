import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Popover Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().modalOverlayspopover();
        await page.screenshot({ path: 'Screenshots/PopoverPage.png' })
    })

    test("Verify Popover Position Field", async() =>{
        await pm.PopoverPageFunction().verifypopverPositionField()
    })

    test("Verify Popover Position Field Left Popover", async() =>{
        await pm.PopoverPageFunction().popoverPositionFieldLeftPopover()
    })

    test("Verify Popover Position Field Top Popover", async() =>{
        await pm.PopoverPageFunction().popoverPositionFieldTopPopover()
    })      

    test("Verify Popover Position Field Right Popover", async() =>{
        await pm.PopoverPageFunction().popoverPositionFieldRightPopover()
    })

    test("Verify Simple Popovers Validation", async() =>{
        await pm.PopoverPageFunction().simplePopoversValidation()
    })

    test("Verify Simple Popover On Click", async() =>{
        await pm.PopoverPageFunction().simplePopoverOnClick()
    })      

    test("Verify Simple Popover on Hover", async() =>{
        await pm.PopoverPageFunction().simplePopoveronHover()
    })

    test("Verify Simple Popover on Hint", async() =>{
        await pm.PopoverPageFunction().simplePopoveronHint()
    })

    test("Verify Template Popovers Validation", async() =>{
        await pm.PopoverPageFunction().templatePopoversValidation()
    })

    test("Verify Template Popovers with Tabs", async() =>{
        await pm.PopoverPageFunction().templatePopoverswithTabs()
    })  

    test("Verify Template Popover with Form", async() =>{
        const Receipient = faker.person.fullName()
        const Subject = faker.word.sample()
        const Message = faker.lorem.sentence()
        await pm.PopoverPageFunction().templatePopoverwithForm(Receipient, Subject, Message)
    })

    test("Verify Template Popover with Card", async() =>{
        await pm.PopoverPageFunction().templatePopoverwithCard()
    })  


    test("Verify Component Popovers Validation", async() =>{
        await pm.PopoverPageFunction().componentPopoversValidation()
    })

    test("Verify Component Popovers with Tabs", async() =>{
        await pm.PopoverPageFunction().componentPopoverswithTabs()
    })

    test("Verify Component Popover with Form", async() =>{
        const Receipient = faker.person.fullName()
        const Subject = faker.word.sample()
        const Message = faker.lorem.sentence()
        await pm.PopoverPageFunction().componentPopoverwithForm(Receipient, Subject, Message)
    })      

    test("Verify Component Popover with Card", async() =>{
        await pm.PopoverPageFunction().componentPopoverwithCard()
    })

    




})    