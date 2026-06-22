import { test } from '@playwright/test'
import { PageManager } from '../Page-Objects/pageManager';
import { faker } from '@faker-js/faker';

test.describe('Forms Layouts Page', () => {
    let pm: PageManager;

    test.beforeEach('First Test', async ({ page }) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().formlayoutspage()
        await page.screenshot({ path: 'Screenshots/formLayoutspage.png' })
    })

    test("Filling Inline Form", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
        await pm.FillFormLayout().fillInlineForm(randomFullName, randomEmail, true)
        await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'Screenshots/InlineFormPage.png' })
        const Buffer = page.screenshot()
    })

    test("Filling Using The Grid Form", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        await pm.FillFormLayout().fillUsingTheGridForm(randomFullName, randomEmail, 'Option 2')
        await page.locator('nb-card', { hasText: 'Using the Grid' }).screenshot({ path: 'Screenshots/UsingtheGridFormPage.png' })
        const Buffer = page.screenshot()
    })

    test("Filling Basic Form", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`;
        await pm.FillFormLayout().fillBasicForm(randomEmail, randompassword)
        await page.locator('nb-card', { hasText: 'Basic form' }).screenshot({ path: 'Screenshots/BasicFormPage.png' })
        const Buffer = page.screenshot()
    })

    test("Filling Form Without Labels", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomWords = faker.lorem.words(5)
        const randomSentance = faker.lorem.sentence()
        await pm.FillFormLayout().fillFormWithoutLabels(randomFullName, randomWords, randomSentance);
        await page.locator('nb-card', { hasText: 'Form without labels' }).screenshot({ path: 'Screenshots/FormWithoutLabelsPage.png' })
        const Buffer = page.screenshot()
    })

    test("Filling Block Form", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomFirstName = faker.person.firstName()
        const randomlastname = faker.person.lastName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
        await pm.FillFormLayout().fillBlockForm(randomFirstName, randomlastname, randomEmail, 'www.theMadMarekter.com')
        await page.locator('nb-card', { hasText: 'Block form' }).screenshot({ path: 'Screenshots/BlockFormPage.png' })
        const Buffer = page.screenshot()
    })

    test("Horizontal Form", async ({ page }) => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
        await pm.FillFormLayout().fillHorizontalForm(randomEmail, randompassword, true)
        await page.locator('nb-card', { hasText: 'Horizontal form' }).screenshot({ path: 'Screenshots/HorizontalFormPage.png' })
        const Buffer = page.screenshot()
    })


})