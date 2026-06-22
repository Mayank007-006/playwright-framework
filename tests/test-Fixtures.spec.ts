import { test } from '../test-options'
import { faker } from '@faker-js/faker';

test("Filling Form Layouts Page", async ({ pageManager }) => {
  const randomFullName = faker.person.fullName()
  const randomFirstName = faker.person.firstName()
  const randomlastname = faker.person.lastName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pageManager.FillFormLayout().fillInlineForm(randomFullName, randomEmail, true)
  await pageManager.FillFormLayout().fillUsingTheGridForm(randomFullName, randomEmail, 'Option 2')
  await pageManager.FillFormLayout().fillBasicForm(randomEmail, randompassword)
  await pageManager.FillFormLayout().fillFormWithoutLabels(randomFullName, 'Regarding Important Matter', 'Rondom Word');
  await pageManager.FillFormLayout().fillBlockForm(randomFirstName, randomlastname, randomEmail, 'www.ProffesionalMarketer.com')
  await pageManager.FillFormLayout().fillHorizontalForm(randomEmail, randompassword, true)
})