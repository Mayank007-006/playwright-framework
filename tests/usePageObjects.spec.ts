import { test } from '@playwright/test'
import { PageManager } from '../Page-Objects/pageManager';
import { faker } from '@faker-js/faker';

let pm: PageManager;

test.beforeEach('First Test', async ({ page }) => {
  await page.goto('/');
  pm = new PageManager(page);
})

test("navigate to Forms Page", async () => {
  await pm.Navigateto().formlayoutspage()
  await pm.Navigateto().datepickerpage();
  await pm.Navigateto().modalOverlaystoastr();
})

test("Filling Form Layouts Page", async ({ page }) => {
  const randomFullName = faker.person.fullName()
  const randomFirstName = faker.person.firstName()
  const randomlastname = faker.person.lastName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().formlayoutspage();
  await pm.FillFormLayout().fillInlineForm(randomFullName, randomEmail, true)
  await page.screenshot({ path: 'Screenshots/formLayoutspage.png' })
  await pm.FillFormLayout().fillUsingTheGridForm(randomFullName, randomEmail, 'Option 2')
  await page.locator('nb-card', { hasText: 'Using the Grid' }).screenshot({ path: 'Screenshots/UsingtheGridFormPage.png' })
  const Buffer = page.screenshot()
  console.log((await Buffer).toString('base64'))
  await pm.FillFormLayout().fillBasicForm(randomEmail, randompassword)
  await pm.FillFormLayout().fillFormWithoutLabels(randomFullName, 'Regarding Important Matter', 'Die Bitch');
  await pm.FillFormLayout().fillBlockForm(randomFirstName, randomlastname, randomEmail, 'www.rockyouovertheworld.com')
  await pm.FillFormLayout().fillHorizontalForm(randomEmail, randompassword, true)
})

test("Performing Operations in Date Picker Page", async () => {
  await pm.Navigateto().datepickerpage()
  await pm.DatePickerFunction().datePickerpageValidation()
  await pm.DatePickerFunction().verifyingCalenderPopupVisibilityCommonDateicker();
  await pm.DatePickerFunction().verfyingCalendarPopupVisibilityDatepickerRange();
  await pm.DatePickerFunction().verfyingCalendarPopupVisibilityDatepickerMinMAx();
  await pm.DatePickerFunction().selectTodaysDate()
})

test('Dialog Tab', async () => {
  await pm.Navigateto().modalOverlaysDialog();
  await pm.DialogPageFunction().openDialogCheck();
  await pm.DialogPageFunction().verifyingAllDialogueBoxesOneByOne();
  await pm.DialogPageFunction().resultReturnFromDialog('John')
})

test('Window Page Validation', async () => {
  await pm.Navigateto().modalOverlaysWindow();
  await pm.WindowPageFunction().windowForm();
  await pm.WindowPageFunction().fillingOpenWindowForm('Testing', 'Test');
  await pm.WindowPageFunction().openWindowWithTemplate();
  await pm.WindowPageFunction().windowWithoutBackdrop();
  await pm.WindowPageFunction().openWindowWithbackdrop();
  await pm.WindowPageFunction().openWindowWithoutBackdrop();
})

test('Popover Page Validation', async () => {
  const Receipient = faker.person.fullName()
  const Subject = faker.word.sample()
  const Message = faker.lorem.sentence()
  await pm.Navigateto().modalOverlayspopover()
  await pm.PopoverPageFunction().verifypopverPositionField()
  await pm.PopoverPageFunction().popoverPositionFieldLeftPopover()
  await pm.PopoverPageFunction().popoverPositionFieldTopPopover()
  await pm.PopoverPageFunction().popoverPositionFieldRightPopover()
  await pm.PopoverPageFunction().simplePopoversValidation()
  await pm.PopoverPageFunction().simplePopoverOnClick()
  await pm.PopoverPageFunction().simplePopoveronHover()
  await pm.PopoverPageFunction().simplePopoveronHint()
  await pm.PopoverPageFunction().templatePopoversValidation()
  await pm.PopoverPageFunction().templatePopoverswithTabs()
  await pm.PopoverPageFunction().templatePopoverwithForm(Receipient, Subject, Message)
  await pm.PopoverPageFunction().templatePopoverwithCard()
  await pm.PopoverPageFunction().componentPopoversValidation()
  await pm.PopoverPageFunction().componentPopoverswithTabs()
  await pm.PopoverPageFunction().componentPopoverwithForm(Receipient, Subject, Message)
  await pm.PopoverPageFunction().componentPopoverwithCard()
})

test('Toaster Page Functions', async () => {
  const title = faker.word.sample()
  const Content = faker.lorem.sentence(10)
  const timeout = "2000000"
  await pm.Navigateto().modalOverlaystoastr()
  await pm.ToasterPageFunction().toasterPageValidation()
  await pm.ToasterPageFunction().toasterPosition("top-right", title, Content, "info", timeout)
  await pm.ToasterPageFunction().multipleToastScenario(timeout)
})

test('Tooltip Page Functions', async () => {
  await pm.Navigateto().modalOverlaystooltip()
  await pm.TooltipPageFunction().tooltipPageValidation()
  await pm.TooltipPageFunction().tooltipwithiconMessage()
  await pm.TooltipPageFunction().tooltipwithiconIcon()
  await pm.TooltipPageFunction().tooltiPlacementTop()
  await pm.TooltipPageFunction().tooltiPlacementRight()
  await pm.TooltipPageFunction().tooltiPlacementBottom()
  await pm.TooltipPageFunction().tooltiPlacementLeft()
  await pm.TooltipPageFunction().coloredTooltipDefault()
  await pm.TooltipPageFunction().coloredTooltipPrimary()
  await pm.TooltipPageFunction().coloredTooltipSuccess()
  await pm.TooltipPageFunction().coloredTooltipDanger()
  await pm.TooltipPageFunction().coloredTooltipInfo()
  await pm.TooltipPageFunction().coloredTooltipWarning()
})

test('Login Page Validation', async () => {
  const randomFullName = faker.person.fullName()
  const FakeEmail = faker.word.verb(6)
  const FakePassword = faker.word.verb(3)
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().LoginpageNavigation()
  await pm.LoginPageFunction().loginPageValidation()
  await pm.LoginPageFunction().errorMessageValidation(FakeEmail, FakePassword)
  await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
})

test('Register Page Validation', async () => {
  const Name = faker.word.verb(3)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().RegisterpageNavigation()
  await pm.RegsiterpageFunction().registerPageValidation()
  await pm.RegsiterpageFunction().registerPageErrorMessageValidation(Name)
  await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
})

test('Request Password Page Validation', async () => {
  const randomFullName = faker.person.fullName()
  const InvalidEmail = faker.word.verb(3)
  const ValidEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  await pm.Navigateto().RequestPassword()
  await pm.RequestPasswordFunction().requestPasswordPageValidation()
  await pm.RequestPasswordFunction().requestpasswordpageErrorMessageValidation(InvalidEmail)
  await pm.RequestPasswordFunction().requestpassword(ValidEmail)
})

test('Login From Request Password Page', async () => {
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().RequestPassword()
  await pm.RequestPasswordFunction().loginFromRequestPasswordpage()
  await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
})

test('Register from Request password Page', async () => {
  const Name = faker.word.verb(3)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().RequestPassword()
  await pm.RequestPasswordFunction().registerFromRequestPasswordPage()
  await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
})

test('Change Password Page Validation', async () => {
  const InvalidPassword = faker.word.verb(3)
  const DiffInvalidPassword = faker.word.verb(5)
  const Password = faker.word.verb(5)
  await pm.Navigateto().Changepassword();
  await pm.ChangePasswordFunction().changePasswordPageValidation();
  await pm.ChangePasswordFunction().changePasswordPageErrorMessageValidation(InvalidPassword, DiffInvalidPassword);
  await pm.ChangePasswordFunction().changePassword(Password);
})

test('Register from Change password Page', async () => {
  const Name = faker.word.verb(3)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().Changepassword()
  await pm.ChangePasswordFunction().registerFromChangePasswordPage()
  await pm.RegsiterpageFunction().registerAnUser(randomFullName, randomEmail, randompassword)
})

test('Login From Change Password Page', async () => {
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
  const randompassword = `${faker.word.verb({ length: { min: 8, max: 10 } })}@${faker.number.int(100)}`
  await pm.Navigateto().Changepassword()
  await pm.ChangePasswordFunction().loginFromChangePasswordpage()
  await pm.LoginPageFunction().logginIn(randomEmail, randompassword)
})

test('Web Tables Function', async () => {
  await pm.Navigateto().smarttablepage();
  await pm.WebTablesFunction().webTablePageValidation();
  await pm.WebTablesFunction().verifyAllEmailContainsAttheRate()
  await pm.WebTablesFunction().verifyAllAgeContainsNumericValues()
})