import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Login Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().LoginpageNavigation();
        await page.screenshot({ path: 'Screenshots/LoginPage.png' })
    })

    test('Login Pagee Validation', async () => {
        await pm.LoginPageFunction().loginPageValidation()
    })

    test('Login Page Error Message Validation', async () => {
        const FakeEmail = faker.word.verb(6)
        const FakePassword = faker.word.verb(3)
        await pm.LoginPageFunction().errorMessageValidation(FakeEmail, FakePassword)
    })

    test('Login Page Loggin In', async () => {
        const randomFullName = faker.person.fullName()
        const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
        await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
    })

    

})