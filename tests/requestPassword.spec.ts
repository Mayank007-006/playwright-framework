import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Request Password Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().RequestPassword();
        await page.screenshot({ path: 'Screenshots/RequestPasswordPage.png' })
    })

    test('Request Password Page Validation', async () => {
        await pm.RequestPasswordFunction().requestPasswordPageValidation()
    })

    test('Request Password Page Error Message Validation', async () => {
        const InvalidEmail = faker.word.verb(3)
        await pm.RequestPasswordFunction().requestpasswordpageErrorMessageValidation(InvalidEmail)
    })

    test('Request Password', async () => {
        const randomFullName = faker.person.fullName()
        const ValidEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
        await pm.RequestPasswordFunction().requestpassword(ValidEmail)
    })  

    test('Login From Request Password Page', async () => {
      const randomFullName = faker.person.fullName()
      const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
      const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
      await pm.RequestPasswordFunction().loginFromRequestPasswordpage()
      await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
    })

    test('Register from Request password Page', async () => {
      const Name = faker.word.verb(3)
      const randomFullName = faker.person.fullName()
      const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
      const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
      await pm.RequestPasswordFunction().registerFromRequestPasswordPage()
      await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
    })



})