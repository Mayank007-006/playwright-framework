import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Register Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().RegisterpageNavigation();
        await page.screenshot({ path: 'Screenshots/RegisterPage.png' })
    })

    test('Register Page Validation', async() => {
        await pm.RegsiterpageFunction().registerPageValidation()
    })

    test('Register Page Error Message Validation', async () => {
        const Name = faker.word.verb(3)
        await pm.RegsiterpageFunction().registerPageErrorMessageValidation(Name)
    })  

    test('Register An User', async () => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
        await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
    })  

})