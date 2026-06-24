import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Change Password Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().Changepassword();
        await page.screenshot({ path: 'Screenshots/ChangePasswordPage.png' })
    })

    test('Change Password Page Validation', async() =>{
        await pm.ChangePasswordFunction().changePasswordPageValidation();
    })

    test('Change Password Page Error Message Validation', async () => {
        const InvalidPassword = faker.word.verb(3)
        const DiffInvalidPassword = faker.word.verb(5)
        await pm.ChangePasswordFunction().changePasswordPageErrorMessageValidation(InvalidPassword, DiffInvalidPassword);
    })

    test('Change Password', async () => {
        const Password = faker.word.verb(5)
        await pm.ChangePasswordFunction().changePassword(Password);
    })

    test('Register from Change password Page', async () => {
      const Name = faker.word.verb(3)
      const randomFullName = faker.person.fullName()
      const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
      const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
      await pm.ChangePasswordFunction().registerFromChangePasswordPage()
      await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
    })

    test('Login From Change Password Page', async () => {
      const randomFullName = faker.person.fullName()
      const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
      const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
      await pm.ChangePasswordFunction().loginFromChangePasswordpage()
      await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
    })



})