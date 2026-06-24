import {test} from '@playwright/test';
import {PageManager} from '../Page-Objects/pageManager';
import {faker} from '@faker-js/faker';

test.describe('Web Tables Tab', () => {
    let pm : PageManager;

    test.beforeEach('Pre conditions', async({page}) => {
        await page.goto('/');
        pm = new PageManager(page);
        await pm.Navigateto().smarttablepage();
        await page.screenshot({ path: 'Screenshots/WebTablesPage.png' })
    })

    test('Web Tables Page Validation', async () => {
      await pm.WebTablesFunction().webTablePageValidation();
    })

    test('Verify All Email Contains @', async () => {
      await pm.WebTablesFunction().verifyAllEmailContainsAttheRate()
    })

    test('Verify All Age Contains Numeric Values', async () => {
      await pm.WebTablesFunction().verifyAllAgeContainsNumericValues()
    }) 
    
    test('Add New Record', async() => {
      const ID = faker.number.int({min : 1, max : 1000});
      const Firstname = faker.person.firstName();
      const lastName = faker.person.lastName();
      const UserName = faker.person.fullName()
      const Email = faker.internet.email();
      const Age = faker.number.int({min : 15, max : 70});
      await pm.WebTablesFunction().addNewRecord(ID,Firstname,lastName,UserName,Email, Age)
    })

    test('Update Existing Record', async() =>{
      const Email = faker.internet.email()
      const UpdatedEmail = faker.internet.email()
      await pm.WebTablesFunction().editingAnExistingRecord(Email, UpdatedEmail)
    })

    test('Delete Popup Validation', async() =>{
      await pm.WebTablesFunction().deletePopupValidation()
    })

    test('Cancelling Delete Record', async() =>{
      const ID = faker.number.int({min : 1, max : 1000});
      const Firstname = faker.person.firstName();
      const lastName = faker.person.lastName();
      const UserName = faker.person.fullName()
      const Email = faker.internet.email();
      const Age = faker.number.int({min : 15, max : 70});
      await pm.WebTablesFunction().cancellingDeleteRecordinPopup(ID,Firstname,lastName,UserName,Email, Age)
    })

    test('Filter By First Name', async() =>{
      const Firstname = faker.person.firstName();
      await pm.WebTablesFunction().filterByFirstName(Firstname)
    })

    test('Filter By Age', async() =>{
      const Age = faker.number.int({min : 15, max : 70});
      await pm.WebTablesFunction().filterByAge(Age.toString())
    })

    test('No Search Result Validation', async() =>{
      const Age = faker.number.int({min : 15, max : 70});
      await pm.WebTablesFunction().noSearchResultValidation(Age.toString())
    })  

    test('Page Navigation Validation', async() =>{
      const PageNumber = faker.number.int({min : 1, max : 5});
      await pm.WebTablesFunction().pageNavigationValidation(PageNumber.toString())
    })

    test('Verify all Email Contains @', async() =>{
      await pm.WebTablesFunction().verifyAllEmailContainsAttheRate()
    })

    test('Verify all Age Contains Numeric Values', async() =>{
      await pm.WebTablesFunction().verifyAllAgeContainsNumericValues()
    })  




})